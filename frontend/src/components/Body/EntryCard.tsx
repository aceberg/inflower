import { For } from "solid-js"
import { allEntries } from "../../functions/exports"
import EntryRow from "./EntryRow"

function EntryCard() {

  return (
  <div class="card border-primary">
    <div class="card-header">
      <select class="form-select w-auto">
        <option>Today</option>
        <option>Week</option>
        <option>Month</option>
      </select>
    </div>
    <div class="card-body table-responsive">
      <table class="table table-sm table-hover table-borderless">
        <thead>
          <tr>
            <th>Date</th>
            <th>From→To</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Note</th>
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
