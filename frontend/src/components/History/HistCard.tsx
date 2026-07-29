import { createMemo, createSignal, For, onMount } from "solid-js"
import { allEntries, setShowEnties } from "../../functions/exports"
import { syncEntries } from "../../functions/atstart";
import EntryRow from "../All/EntryRow";

function HistCard() {

  const [search, setSearch] = createSignal("");

  const update = (value: string) => {
    setShowEnties(value);
    syncEntries();
  };

  const filteredEntries = createMemo(() => {
    const q = search().trim().toLowerCase();

    if (!q) return allEntries;

    return allEntries.filter(entry =>
      Object.values(entry).some(value =>
        String(value).toLowerCase().includes(q)
      )
    );
  });

  onMount(() => {
    update("year");
  });

  return (
  <div class="card border-primary">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <select class="form-select form-select-sm w-auto"
          onChange={e => update(e.currentTarget.value)}>
          <option value="month">Month</option>
          <option value="year" selected>Year</option>
          <option value="all">All</option>
        </select>
        <input type="search" class="form-control form-control-sm w-auto" placeholder="Search" onInput={e => setSearch(e.currentTarget.value)} value={search()} ></input>
        <div></div>
      </div>
    </div>
    <div class="card-body table-responsive">
      <table class="table table-sm table-hover table-borderless">
        <thead>
          <tr>
            <th>Date</th>
            <th>From→To</th>
            <th>Category</th>
            <th class="d-flex flex-row-reverse">Amount</th>
            <th></th>
            <th style="width: 12em;">Note</th>
            <th style="width: 1em;"></th>
          </tr>
        </thead>
        <tbody>
          <For each={filteredEntries()}>{(entry) =>
            <EntryRow entry={entry} history={true}></EntryRow>
          }</For>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default HistCard
