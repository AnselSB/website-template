package rest

import (
	"fmt"
	"html/template"
	"net/http"
	"strings"
)

// // handlePage will be the http implementation for serving all
// // the html of each page, this should make it so that we can enter any number
// // of pages into the codebase quickly regardless of their functionality
// func handlePage(w http.ResponseWriter, r *http.Request) {
// 	// validate the method, ultimately the browser will make a get method so we should be fine to only check for that
// 	if r.Method != "GET" && r.Method != "" {
// 		w.WriteHeader(400)
// 		return
// 	}

// 	contentType := r.Header.Get("Accept")
// 	if !strings.Contains(contentType, "text/html") {
// 		w.WriteHeader(400)
// 		return
// 	}

// 	// after checking headers you now load the file based on the route, if not exist redirect to not found
// 	endpointSplit := strings.Split(strings.TrimSuffix(r.URL.Path, "/"), "/")

// 	path := fmt.Sprintf("ui/pages/%s.html", endpointSplit[len(endpointSplit)-1])

// 	if _, err := os.Stat(path); err != nil {
// 		fmt.Printf("page %s does not exist, redirecting\n", path)
// 		http.Redirect(w, r, fmt.Sprintf("%s/not-found", r.URL.Host), 303)
// 		return
// 	}

// 	file, err := os.Open(path)
// 	if err != nil {
// 		fmt.Printf("Error reading html file: %v\n", err)
// 		w.WriteHeader(500)
// 		return
// 	}
// 	defer file.Close()
// 	fileInfo, err := file.Stat()
// 	if err != nil {
// 		fmt.Printf("Error getting file stats: %v\n", err)
// 		w.WriteHeader(500)
// 		return
// 	}
// 	http.ServeContent(w, r, fileInfo.Name(), fileInfo.ModTime(), file)

// }

type Human struct {
	Name   string
	Gender string
	Age    int
}

func HandleWelcome(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" && r.Method != "" {
		w.WriteHeader(400)
		return
	}

	contentType := r.Header.Get("Accept")
	if !strings.Contains(contentType, "text/html") {
		w.WriteHeader(400)
		return
	}
	people := []Human{
		{
			Name:   "Ansel Sulejmani",
			Age:    22,
			Gender: "Male",
		},
		{
			Name:   "Leon sexy Kennedy",
			Age:    27,
			Gender: "Leon Sexy Kennedy",
		},
		{
			Name:   "Elisha",
			Age:    21,
			Gender: "Female",
		},
	}

	tmplFile := "static/templates/welcome.tmpl"
	tmpl, err := template.New("welcome.tmpl").ParseFiles(tmplFile)
	if err != nil {
		err = fmt.Errorf("failed to parse welcome template: %w", err)
		fmt.Printf("%v\n", err)
		w.WriteHeader(500)
		return
	}
	err = tmpl.Execute(w, people)
	if err != nil {
		fmt.Printf("failed to execute welcome template: %w\n", err)
		w.WriteHeader(500)
		return
	}

}
