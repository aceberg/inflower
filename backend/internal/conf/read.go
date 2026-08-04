package conf

import (
	"github.com/spf13/viper"

	"github.com/aceberg/inflower/internal/check"
	"github.com/aceberg/inflower/internal/models"
)

func readConfig(path string) (config models.Conf) {

	viper.SetDefault("HOST", "0.0.0.0")
	viper.SetDefault("PORT", "8859")
	viper.SetDefault("THEME", "cerulean")
	viper.SetDefault("COLOR", "dark")
	viper.SetDefault("CATEGORIES", []string{"Food", "Cafe", "Home", "Clothes"})

	viper.AutomaticEnv() // Get ENVIRONMENT variables

	viper.SetConfigFile(path)
	viper.SetConfigType("yaml")
	err := viper.ReadInConfig()
	check.IfError(err)

	err = viper.Unmarshal(&config)
	check.IfError(err)

	return config
}
