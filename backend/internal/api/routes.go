package api

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/inflower/internal/check"
)

// Routes - start API routes
func Routes(router *gin.Engine) {

	r0 := router.Group("/api")
	{
		r0.GET("/date", getDate)

		r0.GET("/entry/*date", getEntries)
		r0.POST("/entry", addEntry)
		r0.DELETE("/entry/:id", deleteEntry)

		r0.POST("/category", saveCategories)
		r0.GET("/config", getConfig)
		r0.POST("/config", saveConfig)

		r0.GET("/wallet", getWallets)
		r0.POST("/wallet", addWallet)
		r0.DELETE("/wallet/:id", deleteWallet)
		r0.PATCH("/wallet/hide/:id", hideWallet)
	}
}

func getDate(c *gin.Context) {

	date := time.Now().Format("2006-01-02")

	c.JSON(http.StatusOK, date)
}

func paramID(c *gin.Context) (int, bool) {
	id, err := strconv.Atoi(c.Param("id"))
	if check.IfError(err) {
		return 0, false
	}
	return id, true
}
