package model

//type Year struct {
//	Id uint64
//
//}
//
//type Month struct {
//	Id uint64
//	Days []Day
//	Amount int
//}
//
//type Day struct {
//	Id uint64
//	MonthId int
//}

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

//type Professions struct {
//	Id          int64      `gorm:"primary_key" jsonapi:"primary,professions"`
//	JobSphereId int64      `gorm:"column:job_sphere_id" jsonapi:"attr,job_sphere_id"`
//	Name        string     `gorm:"column:name" jsonapi:"attr,name"`
//	JobSphere   *JobSphere `jsonapi:"relation,region"`
//}
//
//func (Professions) TableName() string {
//	return "professions"
//}
//
//type JobSphere struct {
//	Id   int64  `gorm:"primary_key" jsonapi:"primary,job_sphere"`
//	Name string `gorm:"column:name" jsonapi:"attr,name"`
//}
//
//func (JobSphere) TableName() string {
//	return "job_sphere"
//}
