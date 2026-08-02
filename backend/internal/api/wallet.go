package api

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/inflower/internal/check"
	"github.com/aceberg/inflower/internal/gdb"
	"github.com/aceberg/inflower/internal/models"
)

func deleteWallet(c *gin.Context) {

	id, ok := paramID(c)
	if ok {
		err := gdb.DeleteWallet(id)
		check.IfError(err)
	}

	c.Status(http.StatusNoContent)
}

func getWallets(c *gin.Context) {
	allWallets, err := gdb.SelectWallets()
	check.IfError(err)
	c.JSON(http.StatusOK, allWallets)
}

func addWallet(c *gin.Context) {
	var wallet models.Wallet

	err := c.ShouldBind(&wallet)
	if !check.IfError(err) && wallet.Name != "" {
		err = gdb.UpdateWallet(wallet)
		check.IfError(err)
	}

	c.Redirect(http.StatusFound, c.Request.Referer())
}

func hideWallet(c *gin.Context) {

	id, ok := paramID(c)
	if ok {
		err := gdb.ToggleWalletHide(id)
		check.IfError(err)
	}

	c.Status(http.StatusNoContent)
}
