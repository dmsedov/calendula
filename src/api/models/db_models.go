package models

import "time"

type User struct {
	ID        int64     `gorm:"primary_key"       json:"-"`
	UUID      string    `gorm:"column:uuid"       json:"uuid"`
	Email     string    `gorm:"column:email"      json:"email"`
	AvatarURL string    `gorm:"column:avatar_url" json:"imgUrl"`
	Name      string    `gorm:"column:name"       json:"name"`
	CreatedAt time.Time `gorm:"column:created_at" json:"-"`
	UpdatedAt time.Time `gorm:"column:updated_at" json:"-"`
}

func (User) TableName() string {
	return "users"
}

type Calendar struct {
	ID     int64 `gorm:"primary_key"    json:"id"`
	UserID int64 `gorm:"column:user_id" json:"-"`
}

func (Calendar) TableName() string {
	return "calendars"
}

type MonthInfo struct {
	ID              int64  `gorm:"primary_key"`
	MonthNameRu     string `gorm:"column:month_name_ru"`
	MonthNameEn     string `gorm:"column:month_name_en"`
	QuantityLeap    int    `gorm:"column:quantity_leap"`
	QuantityNonLeap int    `gorm:"column:quantity_non_leap"`
}

func (MonthInfo) TableName() string {
	return "month_info"
}

type Year struct {
	ID       int64  `gorm:"primary_key"`
	Year     int    `gorm:"column:year"`
	LeapYear string `gorm:"column:leap_year"`
}

func (Year) TableName() string {
	return "years"
}

type Month struct {
	ID          int64 `gorm:"primary_key"`
	Number      int   `gorm:"column:number"`
	YearID      int64 `gorm:"column:year_id"`
	MonthInfoID int64 `gorm:"column:month_info_id"`
}

func (Month) TableName() string {
	return "months"
}

type Day struct {
	ID      int64  `gorm:"primary_key"`
	Number  int    `gorm:"column:number"`
	WeekDay string `gorm:"column:week_day"`
	MonthID int64  `gorm:"column:month_id"`
}

func (Day) TableName() string {
	return "days"
}

type Event struct {
	ID        int64     `gorm:"primary_key"`
	Title     string    `gorm:"column:title"`
	Note      string    `gorm:"column:note"`
	UserID    int64     `gorm:"column:user_id"`
	DayID     int64     `gorm:"column:day_id"`
	CreatedAt time.Time `gorm:"column:created_at"`
	UpdatedAt time.Time `gorm:"column:updated_at"`
}

func (Event) TableName() string {
	return "event"
}
