import { createSignal, For } from "solid-js";
import { catList, emptyEntry, Entry, today, walletList } from "../../functions/exports";
import { apiAddEntry } from "../../functions/api";
import { syncEntries } from "../../functions/atstart";

function AddRow() {

  const [newEntry, setNewEntry] = createSignal<Entry>({
    ...emptyEntry,
    Date: today,
  });

  const update = (field: keyof Entry, value: string) => {
    setNewEntry(prev => ({
      ...prev,
      [field]: field === "Amount" ? Number(value) : value,
    }));
  };

  const handleAdd = async () => {
    await apiAddEntry(newEntry());
    setNewEntry({
      ...emptyEntry,
      Date: newEntry().Date,
    });
    await syncEntries();
  };

  return (
    <div class="col-md mt-4">
      <div class="input-group">
        <input type="date" class="form-control" placeholder="Date" value={newEntry().Date} onInput={e => update("Date", e.currentTarget.value)}></input>
        <select class="form-select" value={newEntry().AccFrom} 
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
        <select class="form-select" value={newEntry().AccTo} 
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
        <select class="form-select" value={newEntry().Category} 
          onChange={e => update("Category", e.currentTarget.value)}
        >
          <option value="" disabled>Category</option>
          <For each={catList()}>
            {cat => (
              <option value={cat}>
                {cat}
              </option>
            )}
          </For>
        </select>
        <input type="number" class="form-control" placeholder="Amount" value={newEntry().Amount} onInput={e => update("Amount", e.currentTarget.value)}></input>
        <input type="text" class="form-control" placeholder="Note" value={newEntry().Note} onInput={e => update("Note", e.currentTarget.value)} name="note"></input>
        <button type="submit" class="btn btn-primary" onClick={handleAdd}>Add</button>
      </div>
    </div>
  )
}

export default AddRow
