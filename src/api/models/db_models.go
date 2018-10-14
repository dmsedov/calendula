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
	return "calendar"
}

type MonthDay struct {
	Id              uint64 `gorm:"primary_key"`
	MonthNameRu     string `gorm:"column:month_name_ru"`
	MonthNameEn     string `gorm:"column:month_name_en"`
	QuantityLeap    int    `gorm:"column:quantity_leap"`
	QuantityNonLeap int    `gorm:"column:quantity_non_leap"`
}

func (MonthDay) TableName() string {
	return "month_days"
}
