package service

import (
	"calendula/src/api/models"
	"fmt"
	"github.com/satori/go.uuid"

	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type GuestService struct {
	config *models.Config
}

func CreateGuestService(config *models.Config) *GuestService {
	db := getDb(config)
	defer db.Close()

	srv := new(GuestService)
	srv.config = config

	return srv
}


func (srv *GuestService) CreateGuestLink(data models.JWTData) {
	uuidLink := uuid.NewV4()

	fmt.Println(uuidLink)


}
