package conf

import (
	"log/slog"

	"github.com/spf13/viper"

	"github.com/aceberg/inflower/internal/check"
	"github.com/aceberg/inflower/internal/models"
)

// Write - write config to file
func Write(config models.Conf) {

	slog.Info("Writing new config to " + config.ConfPath)

	viper.SetConfigFile(config.ConfPath)
	viper.SetConfigType("yaml")

	viper.Set("HOST", config.Host)
	viper.Set("PORT", config.Port)
	viper.Set("THEME", config.Theme)
	viper.Set("COLOR", config.Color)
	viper.Set("NODEPATH", config.NodePath)
	viper.Set("LOG_LEVEL", config.LogLevel)

	err := viper.WriteConfig()
	check.IfError(err)
}
