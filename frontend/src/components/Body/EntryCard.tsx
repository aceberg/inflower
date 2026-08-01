import { createSignal, For, onMount } from "solid-js"
import { allEntries } from "../../functions/exports"
import EntryRow from "../All/EntryRow"
import { syncEntries } from "../../functions/atstart";
import { getDateFromCurrent } from "../../functions/date";

function EntryCard() {

  const [showEntiesPeriod, setShowEntiesPeriod] = createSignal<string>("month");

  const update = (value: string) => {
    setShowEntiesPeriod(value);
    syncEntries(getDateFromCurrent(value));
    localStorage.setItem("showEnties", value);
  };

  onMount(() => {
    const value = localStorage.getItem("showEnties");
    if (value !== null && value !== "") {
      setShowEntiesPeriod(value);
    } 
  });

  return (
  <div class="card border-primary">
    <div class="card-header">
      <select class="form-select form-select-sm w-auto" value={showEntiesPeriod()}
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
