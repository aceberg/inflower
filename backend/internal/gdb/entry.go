package gdb

import (
	"github.com/aceberg/inflower/internal/models"
)

// SelectEntries - get all Entries
func SelectEntries() (entries []models.Entry, err error) {

	tab := db.Table("entries")
	err = tab.Find(&entries).Error

	return entries, err
}

// SelectEntryByID - get Entry
func SelectEntryByID(id int) (entry models.Entry, err error) {

	tab := db.Table("entries")
	err = tab.First(&entry, id).Error

	return entry, err
}

// SelectEntriesByDate - get all Entries by date
func SelectEntriesByDate(date string) (entries []models.Entry, err error) {

	tab := db.Table("entries")
	err = tab.Where("\"DATE\" LIKE ?", date+"%").Find(&entries).Error

	return entries, err
}

// GetEntriesAfter - get Entries after date
func GetEntriesAfter(date string) (entries []models.Entry, err error) {

	tab := db.Table("entries")
	err = tab.Where("date > ?", date).Order("date DESC").Find(&entries).Error

	return entries, err
}
