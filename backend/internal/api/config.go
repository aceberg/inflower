package api

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/inflower/internal/conf"
)

func getConfig(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, conf.AppConfig)
}

func saveConfig(c *gin.Context) {

	conf.AppConfig.Host = c.PostForm("host")
	conf.AppConfig.Port = c.PostForm("port")
	conf.AppConfig.Theme = c.PostForm("theme")
	conf.AppConfig.Color = c.PostForm("color")
	conf.AppConfig.NodePath = c.PostForm("node")

	conf.Write(conf.AppConfig)

	c.Redirect(http.StatusFound, c.Request.Referer())
}

func saveCategories(c *gin.Context) {

	catsStr := c.PostForm("categories")
	cats := strings.SplitSeq(catsStr, ",")

	conf.AppConfig.Categories = []string{}

	for p := range cats {
		p = strings.TrimSpace(p)
		if p != "" {
			conf.AppConfig.Categories = append(conf.AppConfig.Categories, p)
		}
	}

	conf.Write(conf.AppConfig)

	c.Redirect(http.StatusFound, c.Request.Referer())
}
