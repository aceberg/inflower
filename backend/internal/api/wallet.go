package api

import (
	"net/http"
	"strconv"

	"github.com/aceberg/inflower/internal/check"
	"github.com/aceberg/inflower/internal/gdb"
	"github.com/aceberg/inflower/internal/models"
	"github.com/gin-gonic/gin"
)

func deleteWallet(c *gin.Context) {

	id, err := strconv.Atoi(c.Param("id"))
	if !check.IfError(err) {
		gdb.DeleteWallet(id)
	}
}

func getWallets(c *gin.Context) {
	allWallets, _ := gdb.SelectWallets()
	c.IndentedJSON(http.StatusOK, allWallets)
}

func addWallet(c *gin.Context) {
	var wallet models.Wallet

	wallet.Name = c.PostForm("name")
	wallet.Currency = c.PostForm("currency")

	gdb.UpdateWallet(wallet)
	c.Redirect(http.StatusFound, c.Request.Referer())
}

func hideWallet(c *gin.Context) {

	id, err := strconv.Atoi(c.Param("id"))
	if !check.IfError(err) {
		wallet := gdb.SelectWalletByID(id)
		wallet.Hide = !wallet.Hide
		gdb.UpdateWallet(wallet)
	}
}
