import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export interface Conf {
	Host:	   string;
	Port:	   string;
	Theme:	   string;
	Color:     string;
	DirPath:   string;
	NodePath:  string;
	LogLevel:  string;
};

export interface Entry {
	ID:       number;
	Date:     string;
	AccFrom:  string;
	AccTo:    string;
	Category: string;
	Amount:   number;
	Note:     string;
};

export interface Wallet {
	ID:       number;
	Name:     string;
	Amount:   number;
	Currency: string;
}

export const emptyEntry:Entry = {
	ID:    0,
	Date: "",
	AccFrom: "",
	AccTo: "",
	Category: "",
	Amount: 0,
	Note: ""
};

export const emptyConf:Conf = {
	Host:	 "",
	Port:	 "",
	Theme:	 "sand",
	Color:   "dark",
	DirPath: "",
	NodePath: "",
	LogLevel: "",
};

export const today = new Date().toISOString().slice(0, 10);

export const [allEntries, setAllEntries] = createStore<Entry[]>([]);
export const [allWallets, setAllWallets] = createStore<Wallet[]>([]);

export const [appConfig, setAppConfig] = createSignal<Conf>(emptyConf);
export const [walletList, setWalletList] = createSignal<string[]>([]);
export const [catList, setCatList] = createSignal<string[]>([]);