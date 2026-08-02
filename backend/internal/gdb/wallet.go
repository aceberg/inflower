package gdb

import (
	"gorm.io/gorm"

	"github.com/aceberg/inflower/internal/models"
)

// UpdateWallet - update or create Wallet
func UpdateWallet(wallet models.Wallet) (err error) {

	tab := db.Table("wallets")
	err = tab.Save(&wallet).Error

	return err
}

// DeleteWallet - delete Wallet from DB
func DeleteWallet(id int) (err error) {

	tab := db.Table("wallets")
	err = tab.Delete(&models.Wallet{}, id).Error

	return err
}

// SelectWallets - get all Wallets
func SelectWallets() (wallets []models.Wallet, err error) {

	tab := db.Table("wallets")
	err = tab.Find(&wallets).Error

	return wallets, err
}

// ToggleWalletHide changes hide
func ToggleWalletHide(id int) (err error) {

	tab := db.Table("wallets")
	err = tab.Where("id = ?", id).Update("hide", gorm.Expr("NOT hide")).Error

	return err
}
