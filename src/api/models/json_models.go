package models

import "github.com/dgrijalva/jwt-go"

type ErrorResult struct {
	Status string
	ErrMsg string
}

type JWTData struct {
	jwt.StandardClaims
	User     User     `json:"user"`
	Calendar Calendar `json:"calendar"`
}

type Config struct {
	Address   string `json:"address"`
	DebugMode bool   `json:"debug_mode"`
	DB        string `json:"db"`
	SecretKey string `json:"secret_key"`
}

type CalendarJSON struct {
	PreviousMonth     Month  `json:"previous_month"`
	CurrentMonth      Month  `json:"current_month"`
	NextMonth         Month  `json:"next_month"`
	PreviousMonthDays []*Day `json:"previous_month_days"`
	CurrentMonthDays  []*Day `json:"current_month_days"`
	NextMonthDays     []*Day `json:"next_month_days"`
}

//type CalendarFilter struct {
//	MonthID
//}
