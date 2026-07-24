package conf

import (
	"github.com/aceberg/inflower/internal/check"
	"github.com/aceberg/inflower/internal/models"
)

// AppConfig - app config
var AppConfig models.Conf

// Start - initial config
func Start(dirPath, nodePath string) {

	confPath := dirPath + "/config.yaml"
	check.Path(confPath)

	AppConfig = read(confPath)

	AppConfig.DirPath = dirPath
	AppConfig.ConfPath = confPath
	AppConfig.DBPath = dirPath + "/sqlite.db"
	if nodePath != "" {
		AppConfig.NodePath = nodePath
	}
}
