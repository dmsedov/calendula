package models

import (
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	UUID      string `gorm:"column:uuid"       json:"uuid"`
	Email     string `gorm:"column:email"      json:"email"`
	AvatarURL string `gorm:"column:avatar_url" json:"imgUrl"`
	Name      string `gorm:"column:name"       json:"name"`
}

func (User) TableName() string {
	return "users"
}

type Calendar struct {
	ID     uint `gorm:"primary_key"    json:"id"`
	UserID uint `gorm:"column:user_id" json:"-"`

	User User `gorm:"foreignkey:UserID" json:"-"`
}

func (Calendar) TableName() string {
	return "calendars"
}

type Guest struct {
	gorm.Model
	UUIDLink   string `gorm:"uuid_link"`
	UserID     uint   `gorm:"column:user_id"`
	CalendarID uint   `gorm:"column:calendar_id"`

	User     User     `gorm:"foreignkey:UserID"`
	Calendar Calendar `gorm:"foreignkey:CalendarID"`
}

func (Guest) TableName() string {
	return "guest"
}

type Event struct {
	gorm.Model
	Title  string `gorm:"column:title"`
	Note   string `gorm:"column:note"`
	UserID uint   `gorm:"column:user_id"`
	DayID  uint   `gorm:"column:day_id"`

	User User `gorm:"foreignkey:UserID"`
	Day  Day  `gorm:"foreignkey:DayID"`
}

func (Event) TableName() string {
	return "event"
}

type MonthInfo struct {
	ID              uint   `gorm:"primary_key" json:"-"`
	MonthNameRu     string `gorm:"column:month_name_ru" json:"month_name_ru"`
	MonthNameEn     string `gorm:"column:month_name_en" json:"month_name_en"`
	QuantityLeap    int    `gorm:"column:quantity_leap" json:"-"`
	QuantityNonLeap int    `gorm:"column:quantity_non_leap" json:"-"`
}

func (MonthInfo) TableName() string {
	return "month_info"
}

type Year struct {
	ID     uint `gorm:"primary_key" json:"id"`
	Year   int  `gorm:"column:year" json:"year"`
	IsLeap bool `gorm:"column:is_leap" json:"is_leap"`
}

func (Year) TableName() string {
	return "year"
}

type Month struct {
	ID          uint `gorm:"primary_key" json:"id"`
	MonthInfoID uint `gorm:"column:month_info_id" json:"-"`
	YearID      uint `gorm:"column:year_id" json:"-"`

	Year      Year      `gorm:"foreignkey:YearID" json:"year"`
	MonthInfo MonthInfo `gorm:"foreignkey:MonthInfoID" json:"month_info"`
}

func (Month) TableName() string {
	return "month"
}

type Day struct {
	ID      uint   `gorm:"primary_key" json:"id"`
	Number  int    `gorm:"column:number" json:"number"`
	WeekDay string `gorm:"column:week_day" json:"week_day"`
	MonthID uint   `gorm:"column:month_id" json:"month_id"`

	Month Month `gorm:"foreignkey:MonthID" json:"-"`
}

func (Day) TableName() string {
	return "days"
}
