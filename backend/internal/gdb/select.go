package gdb

import (
	"github.com/aceberg/inflower/internal/check"
	"github.com/aceberg/inflower/internal/models"
)

// SelectEntries - get all Entries
func SelectEntries() (entries []models.Entry, ok bool) {

	tab := db.Table("entries")
	err := tab.Find(&entries).Error

	return entries, !check.IfError(err)
}

// SelectWallets - get all Wallets
func SelectWallets() (wallets []models.Wallet, ok bool) {

	tab := db.Table("wallets")
	err := tab.Find(&wallets).Error

	return wallets, !check.IfError(err)
}
