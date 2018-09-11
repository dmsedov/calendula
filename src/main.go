package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// func init() {
// 	pathPtr := flag.String("config", defaultConfigPath, "Path for configuration file")
// 	flag.Parse()

// 	if *pathPtr == "" {
// 		panic("No config path")
// 	}

// 	bytes, err := ioutil.ReadFile(*pathPtr)
// 	if err != nil {
// 		panic("Read config file error")
// 	}

// 	config = new(api.Config)

// 	if err = json.Unmarshal(bytes, config); err != nil {
// 		panic("unmarshal config file error: " + err.Error())
// 	}
// }

func main() {
	r := mux.NewRouter()

	// Handle API routes
	api := r.PathPrefix("/api/").Subrouter()
	api.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "hello from api")
	})

	// Serve static files
	// r.PathPrefix("/public/").Handler(http.StripPrefix("/public/", http.FileServer(http.Dir("public"))))
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("static/"))))
	r.PathPrefix("/src/client/images/").Handler(http.StripPrefix("/src/client/images/", http.FileServer(http.Dir("src/client/images/"))))

	// Serve index page on all unhandled routes
	r.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/index.html")
	})

	fmt.Println("http://localhost:8888")
	log.Fatal(http.ListenAndServe(":8888", r))
}

// func IndexHandler(w http.ResponseWriter, r *http.Request) {
// 	http.ServeFile(w, r, "/static/index.html")
// }

// func main() {
// 	router := mux.NewRouter()

// 	// Configuring static content to be served.
// 	router.Handle("/static/", http.FileServer(http.Dir("static/")))

// 	// Routing to the Client-Side Application.
// 	router.HandleFunc("/", IndexHandler).Methods("GET")

// 	log.Printf(fmt.Sprintf("Starting HTTP Server on Host %s:%d.", "127.0.0.1", 8888))

// 	if err := http.ListenAndServe(fmt.Sprintf("%s:%d", "127.0.0.1", 8888), router); err != nil {
// 		log.Fatal(err)
// 	}
// }
