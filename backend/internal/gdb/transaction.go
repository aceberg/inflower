package gdb

import (
	"gorm.io/gorm"

	"github.com/aceberg/inflower/internal/models"
)

// DelEntryFromWallet both dels entry and updates wallets amounts
func DelEntryFromWallet(id int) (err error) {

	err = db.Transaction(func(tx *gorm.DB) error {

		entry, err := SelectEntryByID(id)
		if err != nil {
			return err
		}

		entry.Amount = -1 * entry.Amount

		if _, err = entryToWallet(tx, entry); err != nil {
			return err
		}

		if err = tx.Delete(&models.Entry{}, entry.ID).Error; err != nil {
			return err
		}

		return nil
	})

	return err
}

// AddEntryToWallet both adds entry and updates wallets amounts
func AddEntryToWallet(entry models.Entry) (err error) {

	err = db.Transaction(func(tx *gorm.DB) error {
		var wallet models.Wallet
		var name string

		name, err = entryToWallet(tx, entry)

		if err != nil {
			return err
		}

		if err = tx.Where("name = ?", name).First(&wallet).Error; err != nil {
			return err
		}

		entry.Currency = wallet.Currency
		if err = tx.Save(&entry).Error; err != nil {
			return err
		}

		return nil
	})

	return err
}

func entryToWallet(tx *gorm.DB, entry models.Entry) (name string, err error) {

	if entry.AccFrom != "" {
		name = entry.AccFrom
		err = updWalletAmount(tx, entry.AccFrom, -1*entry.Amount)
	}
	if entry.AccTo != "" {
		name = entry.AccTo
		err = updWalletAmount(tx, entry.AccTo, entry.Amount)
	}

	return name, err
}

func updWalletAmount(tx *gorm.DB, name string, delta int64) error {

	err := tx.Model(&models.Wallet{}).Where("name = ?", name).
		Update("amount", gorm.Expr("amount + ?", delta)).Error

	return err
}
