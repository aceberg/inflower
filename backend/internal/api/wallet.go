package api

import (
	"net/http"

	"github.com/aceberg/inflower/internal/check"
	"github.com/aceberg/inflower/internal/gdb"
	"github.com/aceberg/inflower/internal/models"
	"github.com/gin-gonic/gin"
)

func deleteWallet(c *gin.Context) {

	id, ok := paramID(c)
	if ok {
		gdb.DeleteWallet(id)
	}

	c.Status(http.StatusNoContent)
}

func getWallets(c *gin.Context) {
	allWallets, _ := gdb.SelectWallets()
	c.JSON(http.StatusOK, allWallets)
}

func addWallet(c *gin.Context) {
	var wallet models.Wallet

	err := c.ShouldBind(&wallet)
	if !check.IfError(err) && wallet.Name != "" {
		gdb.UpdateWallet(wallet)
	}

	c.Redirect(http.StatusFound, c.Request.Referer())
}

func hideWallet(c *gin.Context) {

	id, ok := paramID(c)
	if ok {
		wallet := gdb.SelectWalletByID(id)
		wallet.Hide = !wallet.Hide
		gdb.UpdateWallet(wallet)
	}

	c.Status(http.StatusNoContent)
}
