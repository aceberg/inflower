package api

import (
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/aceberg/inflower/internal/check"
	"github.com/aceberg/inflower/internal/gdb"
	"github.com/aceberg/inflower/internal/models"
)

func deleteEntry(c *gin.Context) {

	id, ok := paramID(c)
	if ok {
		err := gdb.DelEntryFromWallet(id)
		check.IfError(err)
	}
	c.Status(http.StatusNoContent)
}

func getEntries(c *gin.Context) {
	var entries []models.Entry
	var err error

	date := strings.TrimPrefix(c.Param("date"), "/")

	if date != "" {
		entries, err = gdb.SelectEntriesByDate(date)
	} else {
		entries, err = gdb.SelectEntries()
	}
	check.IfError(err)

	c.JSON(http.StatusOK, entries)
}

func addEntry(c *gin.Context) {
	var entry models.Entry

	err := c.ShouldBind(&entry)

	if !check.IfError(err) && entry.Amount != 0 {

		if entry.Date == "" {
			entry.Date = time.Now().Format("2006-01-02")
		}

		err = gdb.AddEntryToWallet(entry)
		check.IfError(err)

		c.JSON(http.StatusOK, gin.H{"ok": true})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"ok": false})
	}
}
