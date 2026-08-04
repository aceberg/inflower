import { createStore } from "solid-js/store";
import { apiAddEntry, apiDelEntry, apiGetEntries } from "../functions/api";
import { Entry } from "../functions/models";
import { formatDate } from "../functions/format";
import { walletStore } from "./wallets";


const [entries, setEntries] = createStore<Entry[]>([]);

async function setMainPeriod(value: string) {

    localStorage.setItem("mainEntries", value);
    await reload();
}

function getMainPeriod(): string {

    const value = localStorage.getItem("mainEntries");
    let period = "month";
    if (value !== null && value !== "") {
        period = value;
    } 
    return period
}

async function setHistPeriod(value: string) {

    localStorage.setItem("histEntries", value);
    await reloadHist();
}

function getHistPeriod(): string {

    const value = localStorage.getItem("histEntries");
    let period = "year";
    if (value !== null && value !== "") {
        period = value;
    } 
    return period
}

async function getEntries(date:string) {
  
  const es = await apiGetEntries(date);

  if (es !== null) {
    es.sort((a :Entry, b :Entry) => b.ID - a.ID);
    es.sort((a :Entry, b :Entry) => b.Date.localeCompare(a.Date));
    setEntries(es);
  }
}

async function add(entry: Entry) {
    
    await apiAddEntry(entry);
    await reload();
    walletStore.reload();
}

async function reload() {
    const period = getMainPeriod();
    await getEntries(formatDate(period));
}

async function reloadHist() {
    const period = getHistPeriod();
    await getEntries(formatDate(period));
}

async function remove(id: number, hist: boolean) {
    await apiDelEntry(id);
    if (hist) {
        await reloadHist();
    } else {
        await reload();
    }
    walletStore.reload();
}

export const entryStore = {
    entries,

    add,
    reload,
    reloadHist,
    remove,
    getMainPeriod,
    setMainPeriod,
    getHistPeriod,
    setHistPeriod,
};
