package gdb

import (
	"log"
	"log/slog"
	"os"
	"time"

	sqlite "github.com/aceberg/gorm-sqlite"

	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"github.com/aceberg/inflower/internal/check"
	"github.com/aceberg/inflower/internal/conf"
	"github.com/aceberg/inflower/internal/models"
)

var db *gorm.DB
var gormConf *gorm.Config

// Start working with DB
func Start() {
	var tab *gorm.DB
	var err error

	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
			SlowThreshold:             5 * time.Second,
			LogLevel:                  logger.Warn,
			IgnoreRecordNotFoundError: true,
			Colorful:                  true,
		},
	)
	gormConf = &gorm.Config{Logger: newLogger}

	Connect()

	// Migrate the schema
	tab = db.Table("entries")
	err = tab.AutoMigrate(&models.Entry{})
	check.IfError(err)

	tab = db.Table("wallets")
	err = tab.AutoMigrate(&models.Wallet{})
	check.IfError(err)
}

// Connect - choose DB and connect
func Connect() {
	var err error

	db, err = gorm.Open(sqlite.Open(conf.AppConfig.DBPath), gormConf)

	if !check.IfError(err) {
		slog.Info("Connected to DB: SQLite")
		db.Exec("PRAGMA journal_mode = wal;")
		db.Exec("PRAGMA busy_timeout = 5000;")
	}
}
