package service

import (
	"fmt"
	"log"
	"time"

	"calendula/src/api/models"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type CalendarService struct {
	config *models.Config
}

func CreateCalendarService(config *models.Config) *CalendarService {
	db := getDb(config)
	defer db.Close()

	srv := new(CalendarService)
	srv.config = config

	return srv
}

func (srv *CalendarService) Get(filter string) *models.CalendarJSON {
	db := getDb(srv.config)
	if db == nil {
		return nil
	}
	defer db.Close()

	var err error
	// текущий год
	currentYear := time.Now().Year()

	// get year or create year if not exist
	year := new(models.Year)
	year, err = getYear(db, currentYear)
	if err != nil {
		year = createYear(db, currentYear)
	}
	fmt.Printf("YEAR %#v \n", year) // TODO

	// Определяем предыдущий, текущий и след. месяца
	previousMonthInfo, _ := srv.getMonthInfo(db, fmt.Sprintf("%v", time.Now().Month()-1))
	currentMonthInfo, _ := srv.getMonthInfo(db, fmt.Sprintf("%v", time.Now().Month()))
	nextMonthInfo, _ := srv.getMonthInfo(db, fmt.Sprintf("%v", time.Now().Month()+1))

	// get or create months
	prevMonth := new(models.Month)
	prevMonth, err = getMonth(db, year, previousMonthInfo)
	if err != nil {
		prevMonth = createMonth(db, year, previousMonthInfo)
	}

	currMonth := new(models.Month)
	currMonth, err = getMonth(db, year, currentMonthInfo)
	if err != nil {
		currMonth = createMonth(db, year, currentMonthInfo)
	}

	nextMonth := new(models.Month)
	nextMonth, err = getMonth(db, year, nextMonthInfo)
	if err != nil {
		nextMonth = createMonth(db, year, nextMonthInfo)
	}

	// Запрашиваем дни
	prevMonthDays := make([]*models.Day, 0)
	prevMonthDays = getDays(db, prevMonth)
	if prevMonthDays == nil || len(prevMonthDays) == 0 {
		prevMonthDays = createDays(db, prevMonth, year)
	}

	currMonthDays := make([]*models.Day, 0)
	currMonthDays = getDays(db, currMonth)
	if currMonthDays == nil || len(currMonthDays) == 0 {
		currMonthDays = createDays(db, currMonth, year)
	}

	nextMonthDays := make([]*models.Day, 0)
	nextMonthDays = getDays(db, nextMonth)
	if nextMonthDays == nil || len(nextMonthDays) == 0 {
		nextMonthDays = createDays(db, nextMonth, year)
	}

	// всего 42 дня
	currentMonthFirstDayWeek := models.WeekDayNumber[time.Date(year.Year, time.Month(currMonth.MonthInfoID), 1, 0, 0, 0, 0, time.UTC).Weekday()]

	prevLimit := currentMonthFirstDayWeek - 1
	nextLimit := 42 - prevLimit - len(currMonthDays)

	calendar := new(models.CalendarJSON)
	calendar.PreviousMonth = *prevMonth
	calendar.CurrentMonth = *currMonth
	calendar.NextMonth = *nextMonth

	calendar.PreviousMonthDays = getLimitDaysForPreviewMonth(prevMonthDays, prevLimit)
	calendar.CurrentMonthDays = currMonthDays
	calendar.NextMonthDays = getLimitDaysForNextMonth(nextMonthDays, nextLimit)

	return calendar
}

func (srv *CalendarService) getMonthInfo(db *gorm.DB, monthName string) (*models.MonthInfo, error) {
	monthInfo := new(models.MonthInfo)
	if err := db.Where(&models.MonthInfo{MonthNameEn: monthName}).First(monthInfo).Error; err != nil {
		log.Println("month info is not found ", err)
		return nil, err
	}

	return monthInfo, nil
}

func (srv *CalendarService) getMonthByID(db *gorm.DB, monthID uint) (*models.Month, error) {
	month := new(models.Month)
	if err := db.Where(&models.Month{ID: monthID}).First(month).Error; err != nil {
		log.Println("month is not found ", err)
		return nil, err
	}

	return month, nil
}

// *************** for Year **********************************************************************
func getYear(db *gorm.DB, year int) (*models.Year, error) {
	result := new(models.Year)

	err := db.Where(&models.Year{Year: year}).First(result).Error
	if err != nil {
		return nil, err
	}
	return result, nil
}

func createYear(db *gorm.DB, year int) *models.Year {
	item := &models.Year{Year: year, IsLeap: isYearLeap(year)}
	db.Create(item)
	return item
}

// *************** for Year **********************************************************************

// *************** for Month *********************************************************************
func getMonth(db *gorm.DB, year *models.Year, monthInfo *models.MonthInfo) (*models.Month, error) {
	month := new(models.Month)
	month.MonthInfo = *monthInfo
	month.Year = *year

	err := db.Where(&models.Month{YearID: year.ID, MonthInfoID: monthInfo.ID}).First(month).Error
	if err != nil {
		return nil, err
	}
	return month, nil
}

func createMonth(db *gorm.DB, year *models.Year, monthInfo *models.MonthInfo) *models.Month {
	month := &models.Month{Year: *year, MonthInfo: *monthInfo}
	db.Create(month)
	return month
}

// *************** for Month *********************************************************************

// *************** for Day ***********************************************************************
func getDays(db *gorm.DB, month *models.Month) []*models.Day {
	days := make([]*models.Day, 0)

	query := db.Order("number")
	if err := query.Where(&models.Day{MonthID: month.ID}).Find(&days).Error; err != nil {
		return nil
	}

	return days
}

func createDays(db *gorm.DB, month *models.Month, year *models.Year) []*models.Day {
	days := make([]*models.Day, 0)

	daysSum := getMonthDays(&month.MonthInfo, year)

	for i := 1; i <= daysSum; i++ {
		days = append(days, &models.Day{
			Number:  i,
			WeekDay: models.WeekDayNameRu[time.Date(year.Year, time.Month(month.MonthInfoID), i, 0, 0, 0, 0, time.UTC).Weekday()],
			Month:   *month,
		})
	}

	tx := db.Begin()

	if tx.Error != nil {
		return nil
	}

	for _, day := range days {
		if err := tx.Create(day).Error; err != nil {
			tx.Rollback()
			return nil
		}
	}

	tx.Commit()

	return days
}

// *************** for Day ***********************************************************************

func isYearLeap(year int) bool {
	if res := year % 4; res == 0 {
		return true
	}

	return false
}

func getMonthDays(monthInfo *models.MonthInfo, year *models.Year) int {
	leapYear := isYearLeap(year.Year)

	if leapYear {
		return monthInfo.QuantityLeap
	} else {
		return monthInfo.QuantityNonLeap
	}
}

func getLimitDaysForPreviewMonth(days []*models.Day, limit int) []*models.Day {
	result := make([]*models.Day, 0)
	//if
	for _, day := range days {
		if day.Number > len(days)-limit {
			result = append(result, day)
		}
	}

	return result
}

func getLimitDaysForNextMonth(days []*models.Day, limit int) []*models.Day {
	result := make([]*models.Day, 0)

	for _, day := range days {
		if day.Number <= limit {
			result = append(result, day)
		}
	}

	return result
}
