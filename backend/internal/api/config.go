package api

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/inflower/internal/check"
	"github.com/aceberg/inflower/internal/conf"
)

func getConfig(c *gin.Context) {
	c.JSON(http.StatusOK, conf.AppConfig)
}

func saveConfig(c *gin.Context) {

	config := conf.AppConfig
	err := c.ShouldBind(&config)

	if !check.IfError(err) {
		conf.AppConfig = config
		conf.Write(conf.AppConfig)
	}

	c.Redirect(http.StatusFound, c.Request.Referer())
}

func saveCategories(c *gin.Context) {

	catsStr := c.PostForm("categories")
	cats := strings.SplitSeq(catsStr, ",")

	var categories []string

	for p := range cats {
		p = strings.TrimSpace(p)
		if p != "" {
			categories = append(categories, p)
		}
	}

	conf.AppConfig.Categories = categories
	conf.Write(conf.AppConfig)

	c.Redirect(http.StatusFound, c.Request.Referer())
}
