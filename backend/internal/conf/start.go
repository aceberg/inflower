package conf

import (
	"path/filepath"

	"github.com/aceberg/inflower/internal/check"
	"github.com/aceberg/inflower/internal/models"
)

// AppConfig - app config
var AppConfig models.Conf

// Start - initial config
func Start(dirPath string) {

	confPath := filepath.Join(dirPath, "config.yaml")
	check.Path(confPath)

	AppConfig = readConfig(confPath)

	AppConfig.DirPath = dirPath
	AppConfig.ConfPath = confPath
	AppConfig.DBPath = filepath.Join(dirPath, "sqlite.db")
}
