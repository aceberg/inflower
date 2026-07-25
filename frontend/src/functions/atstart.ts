import { apiGetAllEntries, apiGetAllWallets, apiGetCategories } from "./api";
import { allWallets, Entry, setAllEntries, setAllWallets, setCatList, setWalletList } from "./exports";

export function runAtStart() {
  syncCategories();
  syncEntries();
  syncWallets();
}

export async function syncEntries() {
  const entries = await apiGetAllEntries();

  if (entries !== null && entries.length > 0) {
    entries.sort((a :Entry, b :Entry) => b.ID - a.ID);
    entries.sort((a :Entry, b :Entry) => b.Date.localeCompare(a.Date));
    setAllEntries(entries);
  }
}

export async function syncWallets() {
  
  const wallets = await apiGetAllWallets();

  if (wallets !== null && wallets.length > 0) {
    setAllWallets(wallets);

    setWalletList(allWallets.map(w => w.Name));
  }
}

export async function syncCategories() {
  
  const cats = await apiGetCategories()

  if (cats !== null && cats.length > 0) {
    setCatList(cats);
  }
}