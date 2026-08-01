package models

// Conf - app config
type Conf struct {
	Host       string `form:"host"`
	Port       string `form:"port"`
	Theme      string `form:"theme"`
	Color      string `form:"color"`
	DirPath    string
	ConfPath   string
	DBPath     string
	NodePath   string
	Version    string
	Categories []string
}

// Entry is a money movement
type Entry struct {
	ID       int    `gorm:"primaryKey"`
	Date     string `form:"date"`
	AccFrom  string `form:"acc_from"`
	AccTo    string `form:"acc_to"`
	Category string `form:"category"`
	Amount   int64  `form:"amount"`
	Currency string `form:"currency"`
	Note     string `form:"note"`
}

// Wallet holds money in a single currency
type Wallet struct {
	ID       int    `gorm:"primaryKey"`
	Name     string `form:"name"`
	Amount   int64  `form:"amount"`
	Currency string `form:"currency"`
	Hide     bool   `form:"hide"`
}
