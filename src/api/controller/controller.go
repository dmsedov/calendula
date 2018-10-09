package controller

import (
	"calendula/src/api/model"
	"encoding/json"
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"log"
	"net/http"
)

const (
	connectionString = "host=localhost port=54322 user=postgres dbname=calendula sslmode=disable password=postgres"
)

var mySigningKey = []byte("very_secret_token")

type ApiController struct {
	Db *gorm.DB
}

func CreateApiController() *ApiController {
	ctrl := new(ApiController)
	ctrl.Db = getDb()
	return ctrl
}

func (ctrl ApiController) Hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello world")
}

func (ctrl ApiController) Login(w http.ResponseWriter, r *http.Request) {
	data := r.FormValue("data")

	loginData := new(model.LoginData)
	if err := json.Unmarshal([]byte(data), loginData); err != nil {
		log.Println("invalid json ", err)

		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{
			"status": "failed",
			"errMsg":` + "ОШИБКА!!!" + "}"))

		return
	}

	// сформировать jwt
	w.Write([]byte(`{
		"status": "ok",
		"data": {
			"token": "1asdagadggasdfasdfasdfasdfasdf",
			"srcLink": "/api/v1/calendar?adassdagasg123bui32f2o3ebdu234bh2bhg2dF2j3f2f2"
		}
	}`))
}

func getDb() *gorm.DB {
	db, err := gorm.Open("postgres", connectionString)

	if err != nil {
		log.Println("open db error:", err)
		return nil
	}

	return db
}
