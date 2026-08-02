export interface Conf {
	Host:	   string;
	Port:	   string;
	Theme:	   string;
	Color:     string;
	Categories: string[];
};

export interface Entry {
	ID:       number;
	Date:     string;
	AccFrom:  string;
	AccTo:    string;
	Category: string;
	Amount:   number;
	Currency: string;
	Note:     string;
};

export interface Wallet {
	ID:       number;
	Name:     string;
	Amount:   number;
	Currency: string;
	Hide:    boolean;
}

export const emptyEntry:Entry = {
	ID:    0,
	Date: "",
	AccFrom: "",
	AccTo: "",
	Category: "",
	Amount: 0,
	Currency: "",
	Note: ""
};

export const emptyConf:Conf = {
	Host:	 "",
	Port:	 "",
	Theme:	 "",
	Color:   "",
	Categories: [],
};