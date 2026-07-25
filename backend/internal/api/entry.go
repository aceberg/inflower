package api

import (
	"net/http"
	"strconv"

	"github.com/aceberg/inflower/internal/check"
	"github.com/aceberg/inflower/internal/gdb"
	"github.com/aceberg/inflower/internal/models"
	"github.com/gin-gonic/gin"
)

func deleteEntry(c *gin.Context) {

	id, err := strconv.Atoi(c.Param("id"))
	if !check.IfError(err) {
		gdb.DeleteEntry(id)
	}
}

func getEntries(c *gin.Context) {
	allEntries, _ := gdb.SelectEntries()
	c.IndentedJSON(http.StatusOK, allEntries)
}

func addEntry(c *gin.Context) {
	var entry models.Entry

	entry.Date = c.PostForm("date")
	entry.AccFrom = c.PostForm("acc_from")
	entry.AccTo = c.PostForm("acc_to")
	entry.Category = c.PostForm("category")
	entry.Note = c.PostForm("note")

	amount, err := strconv.ParseInt(c.PostForm("amount"), 10, 64)
	if check.IfError(err) || amount == 0 || entry.Date == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"ok": false})
	} else {
		entry.Amount = amount
		gdb.UpdateEntry(entry)

		c.JSON(http.StatusOK, gin.H{"ok": true})
	}
}
