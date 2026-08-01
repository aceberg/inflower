package api

import (
	"net/http"
	"strings"
	"time"

	"github.com/aceberg/inflower/internal/check"
	"github.com/aceberg/inflower/internal/gdb"
	"github.com/aceberg/inflower/internal/models"
	"github.com/gin-gonic/gin"
)

func deleteEntry(c *gin.Context) {

	id, ok := paramID(c)
	if ok {
		entry := gdb.SelectEntryByID(id)
		entryToWallet(entry.AccTo, entry.AccFrom, entry.Amount)
		gdb.DeleteEntry(id)
	}
	c.Status(http.StatusNoContent)
}

func getEntries(c *gin.Context) {
	var entries []models.Entry

	date := strings.TrimPrefix(c.Param("date"), "/")

	if date != "" {
		entries = gdb.SelectEntriesByDate(date)
	} else {
		entries, _ = gdb.SelectEntries()
	}

	c.JSON(http.StatusOK, entries)
}

func addEntry(c *gin.Context) {
	var entry models.Entry

	err := c.ShouldBind(&entry)

	if check.IfError(err) || entry.Amount == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"ok": false})
	} else {

		if entry.Date == "" {
			entry.Date = time.Now().Format("2006-01-02")
		}

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
