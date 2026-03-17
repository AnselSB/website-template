package rest

import (
	"fmt"
	"net/http"
)

type Page struct {
	Name            string
	IsAuthorized    bool
	HandlerFunction func(w http.ResponseWriter, r *http.Request)
}

func InitPageRoutes(pages []Page) {
	for _, page := range pages {
		http.HandleFunc(fmt.Sprintf("/%s", page.Name), page.HandlerFunction)
	}
}
