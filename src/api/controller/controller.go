package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"calendula/src/api/models"
	"calendula/src/api/service"

	"github.com/gin-gonic/gin"
)

type ApiController struct {
	config  *models.Config
	service *service.CalendulaService
}

func CreateApiController(config *models.Config) *ApiController {
	ctrl := new(ApiController)
	ctrl.config = config
	ctrl.service = service.CreateCalendulaService(config)
	return ctrl
}

func (ctrl ApiController) SignIn(c *gin.Context) {
	rawJSON := c.Query("data")
	body := c.Request.Body
	bytes, _ := ioutil.ReadAll(body)
	fmt.Println("rawJSON: ", rawJSON)
	fmt.Println("body: ", string(bytes))

	auth := new(models.User)

	if err := json.Unmarshal([]byte(rawJSON), auth); err != nil {
		log.Println("invalid json", err)

		createError(c, http.StatusBadRequest, "Invalid json")
		return
	}

	if auth.UUID != "" {
		jwtString, err := ctrl.service.SigUp(auth)

		// if jwt generated correct without errors
		if err == nil {
			c.JSON(200, gin.H{
				"status": "Ok",
				"data": gin.H{
					"jwt": jwtString,
				},
			})
			return
		}
	}

	createError(c, http.StatusInternalServerError, "Problem")
}

func (ctrl ApiController) GetCalendar(c *gin.Context) {
	calendar := ctrl.service.Calendar.Get("")

	bytes, err := json.Marshal(calendar)
	if err != nil {
		log.Println("marshal calendar error: ", err)
	}
	c.Writer.Write(bytes)
}

// func (ctrl ApiController) GenerateGuestLink(ctx iris.Context) {
// 	jwtData := ctrl.service.ParseJWT(ctrl.GetJwtString(ctx))

// 	ctrl.service.Guest.CreateGuestLink(*jwtData)
// }

func createError(c *gin.Context, code int, msg string) {
	c.Writer.WriteHeader(http.StatusUnauthorized)
	c.JSON(code, gin.H{
		"status": "failed",
		"error":  msg,
	})
}
