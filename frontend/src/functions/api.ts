import { Entry } from "./exports";

export const apiPath = 'http://127.0.0.1:8840';

export const apiGetEntries = async (period:string) => {
  const url = apiPath+'/api/entry/'+period;
  const entries = await (await fetch(url)).json();

  return entries;
};

export const apiGetAllWallets = async () => {
  const url = apiPath+'/api/wallet';
  const wallets = await (await fetch(url)).json();

  return wallets;
};

export const apiGetCategories = async () => {
  const url = apiPath+'/api/category';
  const cats = await (await fetch(url)).json();

  return cats;
};

export const apiGetDate = async () => {
  const url = apiPath+'/api/date';
  const date = await (await fetch(url)).json();

  return date;
}

export const apiAddEntry = async (entry:Entry) => {

  let data = new FormData();
  data.set('date', entry.Date);
  data.set('acc_from', entry.AccFrom);
  data.set('acc_to', entry.AccTo);
  data.set('category', entry.Category);
  data.set('amount', String(entry.Amount));
  data.set('note', entry.Note);

  await fetch(apiPath + "/api/entry", {
    method: "POST",
    body: data,
  });
};

export const apiDelEntry = async (id:number) => {

  await fetch(`${apiPath}/api/entry/${id}`, {
    method: "DELETE",
  });
};