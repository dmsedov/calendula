package main

import (
	"calendula/src/api/controller"
	"calendula/src/api/models"
	"encoding/json"
	"flag"
	"github.com/kataras/iris"
	"io/ioutil"
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

func newApp(debugMode bool) *iris.Application {
	app := iris.New()
	if debugMode {
		app.Logger().SetLevel("debug")
	}

	// Serve static files
	app.StaticWeb("/static/", "static/")
	app.StaticWeb("/src/client/images/", "src/client/images/")

	app.Get("/", func(ctx iris.Context) {
		ctx.ServeFile("static/index.html", false)
	})

	return app
}

func main() {
	app := newApp(true)

	ctrl := controller.CreateApiController(config)
	// Handle API routes
	apiRouter := app.Party("/api/v1")

	// POST: /login
	apiRouter.Post("/login", ctrl.Login)

	apiRouter.Get("/calendar", ctrl.AuthMiddleware, ctrl.GetCalendar)

	app.Run(iris.Addr(config.Address))
}
