package models

// Conf - app config
type Conf struct {
	Host       string
	Port       string
	Theme      string
	Color      string
	DirPath    string
	ConfPath   string
	DBPath     string
	NodePath   string
	Version    string
	Categories []string
}

// Entry is a money movement
type Entry struct {
	ID       int `gorm:"primaryKey"`
	Date     string
	AccFrom  string
	AccTo    string
	Category string
	Amount   int64
	Note     string
}

// Wallet holds money in a single currency
type Wallet struct {
	ID       int `gorm:"primaryKey"`
	Name     string
	Amount   int64
	Currency string
}
