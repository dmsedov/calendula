package controller

import (
	"encoding/json"
	"log"

	"calendula/src/api/models"
	"calendula/src/api/service"

	"github.com/kataras/iris"
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

func (ctrl ApiController) SignIn(ctx iris.Context) {
	rawJSON := ctx.FormValue("data")

	auth := new(models.User)

	if err := json.Unmarshal([]byte(rawJSON), auth); err != nil {
		log.Println("invalid json", err)

		createError(ctx, iris.StatusBadRequest, "Invalid json")
		return
	}

	if auth.UUID != "" {
		jwtString, err := ctrl.service.SigUp(auth)

		// if jwt generated correct without errors
		if err == nil {
			ctx.JSON(iris.Map{
				"status": "Ok",
				"data": iris.Map{
					"jwt": jwtString,
				},
			})
			return
		}
	}

	createError(ctx, iris.StatusInternalServerError, "Problem")
}

func (ctrl ApiController) GetCalendar(ctx iris.Context) {
	calendar := ctrl.service.Calendar.Get("")

	bytes, err := json.Marshal(calendar)
	if err != nil {
		log.Println("marshal calendar error: ", err)
	}

	ctx.Write(bytes)
}

func (ctrl ApiController) GenerateGuestLink(ctx iris.Context) {
	jwtData := ctrl.service.ParseJWT(ctrl.GetJwtString(ctx))

	ctrl.service.Guest.CreateGuestLink(*jwtData)
}

func createError(ctx iris.Context, code int, msg string) {
	ctx.StatusCode(code)
	ctx.JSON(iris.Map{
		"status": "failed",
		"code":   code,
		"errMsg": msg,
	})
}
