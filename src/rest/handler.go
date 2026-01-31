package rest

import (
	"fmt"
	"net/http"
	"os"
	"strings"
)

// handlePage will be the http implementation for serving all
// the html of each page, this should make it so that we can enter any number
// of pages into the codebase quickly regardless of their functionality
func handlePage(w http.ResponseWriter, r *http.Request) {
	// validate the method, ultimately the browser will make a get method so we should be fine to only check for that
	if r.Method != "GET" && r.Method != "" {
		w.WriteHeader(400)
		return
	}

	contentType := r.Header.Get("Accept")
	if !strings.Contains(contentType, "text/html") {
		w.WriteHeader(400)
		return
	}

	// after checking headers you now load the file based on the route, if not exist redirect to not found
	endpointSplit := strings.Split(strings.TrimSuffix(r.URL.Path, "/"), "/")

	path := fmt.Sprintf("ui/pages/%s.html", endpointSplit[len(endpointSplit)-1])

	if _, err := os.Stat(path); err != nil {
		fmt.Printf("page %s does not exist, redirecting\n", path)
		http.Redirect(w, r, fmt.Sprintf("%s/not-found", r.URL.Host), 303)
		return
	}

	file, err := os.Open(path)
	if err != nil {
		fmt.Printf("Error reading html file: %v\n", err)
		w.WriteHeader(500)
		return
	}
	defer file.Close()
	fileInfo, err := file.Stat()
	if err != nil {
		fmt.Printf("Error getting file stats: %v\n", err)
		w.WriteHeader(500)
		return
	}
	http.ServeContent(w, r, fileInfo.Name(), fileInfo.ModTime(), file)

}
