import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { apiPath } from "./api";

export interface Conf {
	Host:	   string;
	Port:	   string;
	Theme:	   string;
	Color:     string;
	NodePath:  string;
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
	NodePath: "",
	Categories: [],
};

export const [allEntries, setAllEntries] = createStore<Entry[]>([]);
export const [allWallets, setAllWallets] = createStore<Wallet[]>([]);

export const [appConfig, setAppConfig] = createSignal<Conf>(emptyConf);
export const [themePath, setThemePath] = createSignal(apiPath+"/fs/public/themes/cerulean/bootstrap.min.css");
export const [walletList, setWalletList] = createSignal<string[]>([]);

export const [showEnties, setShowEnties] = createSignal<string>("month");
export const [today, setToday] = createSignal<string>("");