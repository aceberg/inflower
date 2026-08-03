import { createSignal, For, onMount } from "solid-js"
import EntryRow from "../All/EntryRow"
import { entryStore } from "../../store/entries";

function EntryCard() {

  const [showEntiesPeriod, setShowEntiesPeriod] = createSignal<string>("month");

  const update = (value: string) => {
    entryStore.setMainPeriod(value);
  };

  onMount(() => {
    setShowEntiesPeriod(entryStore.getMainPeriod()); 
  });

  return (
  <div class="card border-primary">
    <div class="card-header">
      <select class="form-select form-select-sm w-auto" value={showEntiesPeriod()}
        onChange={e => update(e.currentTarget.value)}>
        <option value="today">Today</option>
        <option value="week">Week</option>
        <option value="last10">10 Days</option>
        <option value="month">Month</option>
        <option value="prevm">Previous Month</option>
        <option value="year">Year</option>
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
          <For each={entryStore.entries}>{(entry) =>
            <EntryRow entry={entry}></EntryRow>
          }</For>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default EntryCard
