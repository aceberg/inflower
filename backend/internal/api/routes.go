package api

import (
	"github.com/gin-gonic/gin"
)

// Routes - start API routes
func Routes(router *gin.Engine) {

	r0 := router.Group("/api")
	{
		r0.GET("/entry", getEntries)
		r0.POST("/entry", updateEntry)
		r0.DELETE("/entry/:id", deleteEntry)

		r0.GET("/wallet", getWallets)
		r0.POST("/wallet", updateWallet)
		r0.DELETE("/wallet/:id", deleteWallet)
	}
}
