package models

import (
	"time"
)

const (
	AuthHeader = "Authorization"
	Bearer     = "Bearer "
)

const (
	January = iota + 1
	February
	March
	April
	May
	June
	July
	August
	September
	October
	November
	December
)

const (
	Monday = iota + 1
	Tuesday
	Wednesday
	Thursday
	Friday
	Saturday
	Sunday
)

var WeekDayNumber = map[time.Weekday]int{
	time.Monday:    Monday,
	time.Tuesday:   Tuesday,
	time.Wednesday: Wednesday,
	time.Thursday:  Thursday,
	time.Friday:    Friday,
	time.Saturday:  Saturday,
	time.Sunday:    Sunday,
}

var WeekDayNameRu = map[time.Weekday]string{
	time.Monday:    "Понедельник",
	time.Tuesday:   "Вторник",
	time.Wednesday: "Среда",
	time.Thursday:  "Четверг",
	time.Friday:    "Пятница",
	time.Saturday:  "Суббота",
	time.Sunday:    "Воскресенье",
}
