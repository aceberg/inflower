package web

import (
	"embed"
	"html/template"
	"log"
	"net/http"

	"github.com/aceberg/inflower/internal/api"
	"github.com/aceberg/inflower/internal/check"
	"github.com/aceberg/inflower/internal/conf"
	"github.com/gin-gonic/gin"
)

// templFS - html templates
//
//go:embed templates/*
var templFS embed.FS

// pubFS - public folder
//
//go:embed public/*
var pubFS embed.FS

// Gui - start web server
func Gui() {
	const (
		colorCyan  = "\033[36m"
		colorReset = "\033[0m"
	)

	file, err := pubFS.ReadFile("public/version")
	check.IfError(err)
	conf.AppConfig.Version = string(file)[8:]

	address := conf.AppConfig.Host + ":" + conf.AppConfig.Port

	log.Println(colorCyan + "\n=================================== " +
		"\n  inflower Version: " + conf.AppConfig.Version +
		"\n  Config dir: " + conf.AppConfig.DirPath +
		"\n  Web GUI: http://" + address +
		"\n=================================== " + colorReset)

	gin.SetMode(gin.ReleaseMode)
	// router := gin.New()
	router := gin.Default()
	router.Use(gin.Recovery())

	templ := template.Must(template.New("").ParseFS(templFS, "templates/*"))
	router.SetHTMLTemplate(templ) // templates

	router.StaticFS("/fs/", http.FS(pubFS)) // public

	router.GET("/", indexHandler)          // index.go
	router.GET("/config", indexHandler)    // index.go
	router.GET("/history", indexHandler)   // index.go
	router.GET("/host/*any", indexHandler) // index.go

	api.Routes(router)

	err = router.Run(address)
	check.IfError(err)
}
