package rest

import (
	"fmt"
	"net/http"
)

type Page struct {
	Name         string
	IsAuthorized bool
}

func InitPageRoutes(pages []Page) {
	for _, page := range pages {
		http.HandleFunc(fmt.Sprintf("/%s", page.Name), handlePage)
	}
}
