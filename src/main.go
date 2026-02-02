package main

import (
	"fmt"
	"log"
	"mime"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/AnselSB/website-template/src/rest"
	"github.com/joho/godotenv"
)

const (
	SECONDS_NANO_SECONDS_CONVERSION = 1_000_000_000
)

var (
	pages = []rest.Page{
		{
			Name:         "test",
			IsAuthorized: false,
		},
		{
			Name:         "welcome",
			IsAuthorized: false,
		},
		{
			Name:         "not-found",
			IsAuthorized: false,
		},
	}
)

func main() {
	err := godotenv.Load()
	if err != nil {
		err = fmt.Errorf("Failed in loading .env: %w", err)
		log.Fatal(err)
	}

	port, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil {
		log.Fatal(err)
	}

	readTimeout, err := strconv.Atoi(os.Getenv("READ_TIMEOUT"))
	if err != nil {
		log.Fatal(err)
	}

	writeTimeout, err := strconv.Atoi(os.Getenv("WRITE_TIMEOUT"))
	if err != nil {
		log.Fatal(err)
	}

	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", port),
		ReadTimeout:  time.Duration(readTimeout * SECONDS_NANO_SECONDS_CONVERSION),
		WriteTimeout: time.Duration(writeTimeout * SECONDS_NANO_SECONDS_CONVERSION),
	}
	rest.InitPageRoutes(pages)
	// serve static contents like js and styling
	mime.AddExtensionType(".js", "application/javascript")
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	errChan := make(chan error)

	go startServer(server, errChan)

	err = <-errChan
	if err != nil {
		log.Fatal(err)
	}
}

func startServer(server *http.Server, errChan chan error) {
	fmt.Printf("Starting server on %s\n", server.Addr)
	err := server.ListenAndServe()

	errChan <- err
}
