package conf

import (
	"github.com/spf13/viper"

	"github.com/aceberg/inflower/internal/check"
	"github.com/aceberg/inflower/internal/models"
)

func read(path string) (config models.Conf) {

	viper.SetDefault("HOST", "0.0.0.0")
	viper.SetDefault("PORT", "8859")
	viper.SetDefault("THEME", "cerulean")
	viper.SetDefault("COLOR", "dark")
	viper.SetDefault("NODEPATH", "")
	viper.SetDefault("CATEGORIES", []string{"Food", "Cafe", "Home", "Me", "Clothes"})

	viper.SetConfigFile(path)
	viper.SetConfigType("yaml")
	err := viper.ReadInConfig()
	check.IfError(err)

	viper.AutomaticEnv() // Get ENVIRONMENT variables

	config.Host = viper.Get("HOST").(string)
	config.Port = viper.Get("PORT").(string)
	config.Theme = viper.Get("THEME").(string)
	config.Color = viper.Get("COLOR").(string)
	config.NodePath = viper.Get("NODEPATH").(string)

	config.Categories = viper.GetStringSlice("CATEGORIES")

	return config
}
