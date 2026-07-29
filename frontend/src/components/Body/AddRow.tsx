import { createSignal, For } from "solid-js";
import { appConfig, emptyEntry, Entry, today, walletList } from "../../functions/exports";
import { apiAddEntry } from "../../functions/api";
import { syncEntriesAndWallets } from "../../functions/atstart";

function AddRow() {

  const [emptyAmount, setEmptyAmount] = createSignal<string>("");
  const [newEntry, setNewEntry] = createSignal<Entry>({
    ...emptyEntry,
  });

  const parseAmount = (value: string): number => {
    if (!/^[\d+\-*/().\s]+$/.test(value)) {
      return 0;
    }

    try {
      return Number(Function(`"use strict"; return (${value})`)());
    } catch {
      return 0;
    }
  };

  const update = (field: keyof Entry, value: string) => {
    setNewEntry(prev => ({
      ...prev,
      [field]: field === "Amount"
        ? Math.round(parseAmount(value) * 100)
        : value,
    }));
  };

  const handleAdd = async () => {
    if (newEntry().Date === "") {
      newEntry().Date = today();
    }
    await apiAddEntry(newEntry());
    setNewEntry({
      ...emptyEntry,
      Date: newEntry().Date,
    });
    setEmptyAmount("0");
    setEmptyAmount("");
    await syncEntriesAndWallets();
  };

  return (
    <div class="col-md mt-4">
      <div class="input-group d-flex flex-column flex-sm-row">
        <input type="date" class="form-control w-auto" placeholder="Date" value={today()} onInput={e => update("Date", e.currentTarget.value)}></input>
        <select class="form-select w-auto" value={newEntry().AccFrom} 
          onChange={e => update("AccFrom", e.currentTarget.value)}
        >
          <option value="" disabled>From</option>
          <For each={walletList()}>
            {wallet => (
              <option value={wallet}>
                {wallet}
              </option>
            )}
          </For>
        </select>
        <select class="form-select w-auto" value={newEntry().AccTo} 
          onChange={e => update("AccTo", e.currentTarget.value)}
        >
          <option value="" disabled>To</option>
          <For each={walletList()}>
            {wallet => (
              <option value={wallet}>
                {wallet}
              </option>
            )}
          </For>
        </select>
        <select class="form-select w-auto" value={newEntry().Category} 
          onChange={e => update("Category", e.currentTarget.value)}
        >
          <option value="" disabled>Category</option>
          <For each={appConfig().Categories}>
            {cat => (
              <option value={cat}>
                {cat}
              </option>
            )}
          </For>
        </select>
        <input type="text" class="form-control w-auto" placeholder="Amount" value={emptyAmount()} onInput={e => update("Amount", e.currentTarget.value)}></input>
        <input type="text" class="form-control w-auto" placeholder="Note" value={newEntry().Note} onInput={e => update("Note", e.currentTarget.value)} name="note"></input>
        <button type="submit" class="btn btn-primary" onClick={handleAdd}>Add</button>
      </div>
    </div>
  )
}

export default AddRow
