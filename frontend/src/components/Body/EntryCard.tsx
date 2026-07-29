import { For } from "solid-js"
import { allEntries, setShowEnties, showEnties } from "../../functions/exports"
import EntryRow from "./EntryRow"
import { syncEntries } from "../../functions/atstart";

function EntryCard() {

  const update = (value: string) => {
    setShowEnties(value);
    syncEntries();
    localStorage.setItem("showEnties", value);
  };

  return (
  <div class="card border-primary">
    <div class="card-header">
      <select class="form-select form-select-sm w-auto" value={showEnties()}
        onChange={e => update(e.currentTarget.value)}>
        <option value="today">Today</option>
        <option value="decade">Decade</option>
        <option value="month">Month</option>
      </select>
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
          <For each={allEntries}>{(entry) =>
            <EntryRow entry={entry}></EntryRow>
          }</For>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default EntryCard
