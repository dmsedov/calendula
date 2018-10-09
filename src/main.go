package main

import (
	"log"
	"net/http"

	"calendula/src/api/controller"
	"github.com/gorilla/mux"
)

const (
	server = ":8888"
)

func main() {
	r := mux.NewRouter()
	//app := iris.New()

	// Handle API routes
	ctrl := controller.CreateApiController()
	api := r.PathPrefix("/api/v1").Subrouter()
	api.HandleFunc("/hello", ctrl.Hello)
	api.HandleFunc("/login", ctrl.Login).Methods("POST")

	// Serve static files
	// r.PathPrefix("/public/").Handler(http.StripPrefix("/public/", http.FileServer(http.Dir("public"))))
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("static/"))))
	r.PathPrefix("/src/client/images/").Handler(http.StripPrefix("/src/client/images/", http.FileServer(http.Dir("src/client/images/"))))

	// Serve index page on all unhandled routes
	r.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/index.html")
	})

	log.Println("Server start on", server)

	if err := http.ListenAndServe(server, api); err != nil {
		panic("start server error: " + err.Error())
	}
}
