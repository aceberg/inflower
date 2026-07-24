package gdb

import (
	"github.com/aceberg/inflower/internal/check"
	"github.com/aceberg/inflower/internal/models"
)

// UpdateEntry - update or create Entry
func UpdateEntry(entry models.Entry) {

	tab := db.Table("entries")
	result := tab.Save(&entry)
	check.IfError(result.Error)
}

// DeleteEntry - delete Entry from DB
func DeleteEntry(id int) {

	tab := db.Table("entries")
	result := tab.Delete(&models.Entry{}, id)
	check.IfError(result.Error)
}

// UpdateWallet - update or create Wallet
func UpdateWallet(wallet models.Wallet) {

	tab := db.Table("wallets")
	result := tab.Save(&wallet)
	check.IfError(result.Error)
}

// DeleteWallet - delete Wallet from DB
func DeleteWallet(id int) {

	tab := db.Table("wallets")
	result := tab.Delete(&models.Wallet{}, id)
	check.IfError(result.Error)
}
