import { apiGetEntries, apiGetAllWallets, apiGetDate, apiGetConfig, apiPath } from "./api";
import { getDateFromCurrent } from "./date";
import { allWallets, appConfig, Entry, setAllEntries, setAllWallets, setAppConfig,  setThemePath, setToday, setWalletList } from "./exports";

export async function runAtStart() {
  
  await syncAppConfig();

  await syncDate();
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
  const value = localStorage.getItem("showEnties");
  let period = "month";
  if (value !== null && value !== "") {
    period = value;
  } 

  await syncEntries(getDateFromCurrent(period));
  await syncWallets();
}

export async function syncEntries(date:string) {
  
  const entries = await apiGetEntries(date);

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

    setWalletList(allWallets.filter(w => !w.Hide).map(w => w.Name));
  }
}

const syncAppConfig = async () => {
  setAppConfig(await apiGetConfig());

  const theme = appConfig().Theme?appConfig().Theme:"cerulean";
  const color = appConfig().Color?appConfig().Color:"dark";

  changeBackColor(color);

  setThemePath(apiPath+"/fs/public/themes/"+theme+"/bootstrap.min.css");
}

export const changeBackColor = (color:string) => {
  document.documentElement.setAttribute("data-bs-theme", color);
  color === "dark"
    ? document.documentElement.style.setProperty('--transparent-light', '#ffffff15')
    : document.documentElement.style.setProperty('--transparent-light', '#00000015');
}