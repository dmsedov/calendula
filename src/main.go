package main

import (
	"encoding/json"
	"flag"
	"io/ioutil"

	"calendula/src/api/controller"
	"calendula/src/api/models"

	"github.com/gin-gonic/gin"
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
	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()

	// Serve static files
	router.Static("/static", "static/")
	router.Static("/src/client/images", "src/client/images/")

	// Serve frontend static files
	router.StaticFile("/", "static/index.html")

	ctrl := controller.CreateApiController(config)

	// Setup route group for the API
	api := router.Group("/api")
	{
		api.POST("/sigin", ctrl.SignIn)

		api.Use(ctrl.AuthMiddleware())
		api.GET("/calendar", ctrl.GetCalendar)
		// apiRouter.Get("/access_link", ctrl.AuthMiddleware, ctrl.GenerateGuestLink)
	}

	router.Run(config.Address)
}
