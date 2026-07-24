import { apiGetAllEntries } from "./api";
import { setAllEntries } from "./exports";

export function runAtStart() {
  getEntries();
 
  setInterval(() => {
    getEntries();
  }, 60000); // 60000 ms = 1 minute
}

export async function getEntries() {
  const entries = await apiGetAllEntries();

  if (entries !== null && entries.length > 0) {
    setAllEntries(entries);
  }
}