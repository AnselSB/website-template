package rest

import (
	"fmt"
	"net/http"
	"os"
	"strings"
)

func handleTest(w http.ResponseWriter, r *http.Request) {
	// validate the method, must be GET
	if r.Method != "GET" && r.Method != "" {
		w.WriteHeader(400)
		return
	}

	// check the content type
	contentType := r.Header.Get("Accept")
	if !strings.Contains(contentType, "text/html") {
		w.WriteHeader(400)
		return
	}

	// otherwise we're chilling, write the html into the buffer and send 200
	file, err := os.Open("ui/pages/test.html")

	if err != nil {
		fmt.Printf("Error reading html file: %w\n", err)
		w.WriteHeader(500)
		return
	}

	defer file.Close()
	fileInfo, err := file.Stat()
	if err != nil {
		fmt.Printf("Error getting file stats: %w", err)
		w.WriteHeader(500)
		return
	}

	http.ServeContent(w, r, fileInfo.Name(), fileInfo.ModTime(), file)
	return
}
