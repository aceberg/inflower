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

func updateWallet(c *gin.Context) {
	var wallet models.Wallet

	wallet.Name = c.PostForm("name")
	wallet.Currency = c.PostForm("currency")

	id, err := strconv.Atoi(c.PostForm("id"))
	check.IfError(err)

	amount, err := strconv.ParseInt(c.PostForm("amount"), 10, 64)
	if !check.IfError(err) {

		wallet.ID = id
		wallet.Amount = amount
		gdb.UpdateWallet(wallet)

		c.JSON(http.StatusOK, gin.H{"ok": true})
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{
			"ok":    false,
			"error": err.Error(),
		})
	}
}
