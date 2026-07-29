package api

import (
	"net/http"
	"strconv"
	"time"

	"github.com/aceberg/inflower/internal/check"
	"github.com/aceberg/inflower/internal/gdb"
	"github.com/aceberg/inflower/internal/models"
	"github.com/gin-gonic/gin"
)

func deleteEntry(c *gin.Context) {

	id, err := strconv.Atoi(c.Param("id"))
	if !check.IfError(err) {
		entry := gdb.SelectEntryByID(id)
		entryToWallet(entry.AccTo, entry.AccFrom, entry.Amount)
		gdb.DeleteEntry(id)
	}
}

func getEntries(c *gin.Context) {
	var entries []models.Entry

	period := c.Param("period")
	period = period[1:]
	date := ""

	switch period {
	case "today":
		date = time.Now().Format("2006-01-02")
		entries = gdb.SelectEntriesByDate(date)
	case "decade":
		date = time.Now().Format("2006-01-02")
		date = date[:9]
		entries = gdb.SelectEntriesByDate(date)
	case "month":
		date = time.Now().Format("2006-01")
		entries = gdb.SelectEntriesByDate(date)
	case "prevm":
		date = time.Now().AddDate(0, -1, 0).Format("2006-01")
		entries = gdb.SelectEntriesByDate(date)
	default:
		entries, _ = gdb.SelectEntries()
	}

	c.IndentedJSON(http.StatusOK, entries)
}

func addEntry(c *gin.Context) {
	var entry models.Entry

	entry.Date = c.PostForm("date")
	entry.AccFrom = c.PostForm("acc_from")
	entry.AccTo = c.PostForm("acc_to")
	entry.Category = c.PostForm("category")
	entry.Note = c.PostForm("note")

	if entry.Date == "" {
		entry.Date = time.Now().Format("2006-01-02")
	}

	amount, err := strconv.ParseInt(c.PostForm("amount"), 10, 64)
	if check.IfError(err) || amount == 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"ok": false})
	} else {
		entry.Amount = amount
		entry.Currency = entryToWallet(entry.AccFrom, entry.AccTo, entry.Amount)

		gdb.UpdateEntry(entry)

		c.JSON(http.StatusOK, gin.H{"ok": true})
	}
}

func entryToWallet(accFrom, accTo string, amount int64) (currency string) {
	var wallet models.Wallet

	if accFrom != "" {
		wallet = gdb.SelectWalletByName(accFrom)
		wallet.Amount = wallet.Amount - amount
		gdb.UpdateWallet(wallet)
	}

	if accTo != "" {
		wallet = gdb.SelectWalletByName(accTo)
		wallet.Amount = wallet.Amount + amount
		gdb.UpdateWallet(wallet)
	}

	return wallet.Currency
}
