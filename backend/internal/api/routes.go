package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Routes - start API routes
func Routes(router *gin.Engine) {

	r0 := router.Group("/api")
	{
		r0.GET("/entry", getEntries)
		r0.POST("/entry", addEntry)
		r0.DELETE("/entry/:id", deleteEntry)

		r0.GET("/category", getCategories)

		r0.GET("/wallet", getWallets)
		r0.POST("/wallet", updateWallet)
		r0.DELETE("/wallet/:id", deleteWallet)
	}
}

func getCategories(c *gin.Context) {

	cats := []string{"Food", "Cafe", "Home", "Me", "Clothes"}

	c.IndentedJSON(http.StatusOK, cats)
}
