package service

import (
	"errors"
	"log"

	"calendula/src/api/models"

	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type CalendulaService struct {
	config *models.Config
}

func CreateCalendulaService(config *models.Config) *CalendulaService {
	db := getDb(config)
	defer db.Close()

	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Calendar{})

	srv := new(CalendulaService)
	srv.config = config

	return srv
}

func (srv *CalendulaService) Login(authData *models.User) (string, error) {
	db := getDb(srv.config)
	if db == nil {
		return "", errors.New("db failed")
	}
	defer db.Close()

	user := new(models.User)

	if err := db.Where("UUID = ?", authData.UUID).First(user).Error; err != nil {
		log.Println("get user error: ", err)

		// create new user and return self-instance
		user, err := srv.createUser(db, authData)
		if err != nil {
			log.Println("problem with create user: ", err)
		}

		// create calendar and return self-instance
		calendar, err := srv.createCalendar(db, user)
		if err != nil {
			log.Println("problem with create user: ", err)
		}

		return srv.generateToken(user, calendar)

	} else {
		calendar, err := srv.getCalendar(db, user)
		if err != nil {
			log.Println("problem with get calendar")
		}

		return srv.generateToken(user, calendar)
	}
}

func (srv *CalendulaService) generateToken(req *models.User, calendar *models.Calendar) (string, error) {
	claims := models.JWTData{
		User:     *req,
		Calendar: *calendar,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(srv.config.SecretKey))

	return tokenString, err
}

func (srv *CalendulaService) createUser(db *gorm.DB, authData *models.User) (*models.User, error) {
	// create new user
	err := db.Create(authData).Error
	if err != nil {
		return nil, err
	}

	// get user
	user := new(models.User)

	if err := db.Where("UUID = ?", authData.UUID).First(user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func (srv *CalendulaService) getCalendar(db *gorm.DB, user *models.User) (*models.Calendar, error) {
	// get calendar
	calendar := new(models.Calendar)

	if err := db.Where(&models.Calendar{UserID: user.ID}).First(calendar).Error; err != nil {
		return nil, err
	}

	return calendar, nil
}

func (srv *CalendulaService) createCalendar(db *gorm.DB, user *models.User) (*models.Calendar, error) {
	// create new calendar
	err := db.Create(&models.Calendar{UserID: user.ID}).Error
	if err != nil {
		return nil, err
	}

	// get calendar
	return srv.getCalendar(db, user)
}

func getDb(config *models.Config) *gorm.DB {
	db, err := gorm.Open("postgres", config.DB)

	if err != nil {
		log.Println("open db error:", err)
		return nil
	}

	return db
}
