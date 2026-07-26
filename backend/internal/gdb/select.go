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

// SelectEntryByID - get Entry
func SelectEntryByID(id int) (entry models.Entry) {

	tab := db.Table("entries")
	tab.First(&entry, id)

	return entry
}

// SelectEntriesByDate - get all Entries by date
func SelectEntriesByDate(date string) (entries []models.Entry) {

	tab := db.Table("entries")
	tab.Where("\"DATE\" LIKE ?", date+"%").Find(&entries)

	return entries
}

// SelectWallets - get all Wallets
func SelectWallets() (wallets []models.Wallet, ok bool) {

	tab := db.Table("wallets")
	err := tab.Find(&wallets).Error

	return wallets, !check.IfError(err)
}

// SelectWalletByName - get Wallet
func SelectWalletByName(name string) (wallet models.Wallet) {

	tab := db.Table("wallets")
	tab.Where("name = ?", name).First(&wallet)

	return wallet
}
