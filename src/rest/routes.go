package rest

import "net/http"

func InitRoutes() {
	http.HandleFunc("/test", handleTest)
}
