package api

import "github.com/kataras/iris"

func NewApp(debugMode bool) *iris.Application {
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
