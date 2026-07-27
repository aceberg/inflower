import { apiGetEntries, apiGetAllWallets, apiGetDate } from "./api";
import { allWallets, Entry, setAllEntries, setAllWallets, setShowEnties, setToday, setWalletList, showEnties } from "./exports";

export async function runAtStart() {
  
  // "today", "decade" or "month" for the main page
  const value = localStorage.getItem("showEnties");
  if (value !== null && value !== "") {
    setShowEnties(String(value));
  }

  await syncDate();

  await syncEntriesAndWallets();
}

export async function syncDate() {
  const date = await apiGetDate();
  if (String(date) === "") {
    setToday(new Date().toJSON().slice(0, 10));
  } else {
    setToday(String(date));
  }
}

export async function syncEntriesAndWallets() {
  await syncEntries();
  await syncWallets();
}

export async function syncEntries() {
  const entries = await apiGetEntries(showEnties());

  if (entries !== null) {
    entries.sort((a :Entry, b :Entry) => b.ID - a.ID);
    entries.sort((a :Entry, b :Entry) => b.Date.localeCompare(a.Date));
    setAllEntries(entries);
  }
}

export async function syncWallets() {
  
  const wallets = await apiGetAllWallets();

  if (wallets !== null) {
    setAllWallets(wallets);

    setWalletList(allWallets.map(w => w.Name));
  }
}