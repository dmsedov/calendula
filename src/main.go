package main

import (
	"encoding/json"
	"flag"
	"io/ioutil"

	"calendula/src/api"
	"calendula/src/api/controller"
	"calendula/src/api/models"

	"github.com/kataras/iris"
)

const (
	defaultConfigPath = "config.json"
)

var config *models.Config

func init() {
	pathPtr := flag.String("config", defaultConfigPath, "Path for configuration file")
	flag.Parse()

	bytes, err := ioutil.ReadFile(*pathPtr)

	if err != nil {
		panic("Read config file error")
	}

	config = new(models.Config)

	if err = json.Unmarshal(bytes, config); err != nil {
		panic("unmarshal config file error: " + err.Error())
	}
}

func main() {
	app := api.NewApp(config.DebugMode)

	ctrl := controller.CreateApiController(config)
	// Handle API routes
	apiRouter := app.Party("/api/v1")

	// REST api routes
	apiRouter.Post("/signup", ctrl.SignUp) // get jwt

	apiRouter.Get("/calendar", ctrl.AuthMiddleware, ctrl.GetCalendar)
	apiRouter.Get("/guest_link", ctrl.AuthMiddleware, ctrl.GenerateGuestLink)

	app.Run(iris.Addr(config.Address))
}
