import { For } from "solid-js"
import { allEntries } from "../functions/exports"
import TableRow from "../components/Body/TableRow"

function Body() {

  return (
    <div class="card border-primary">
      <div class="card-header">
        <p>Hello</p>
      </div>
      <div class="card-body table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>From</th>
              <th>To</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            <For each={allEntries}>{(entry) =>
              <TableRow entry={entry}></TableRow>
            }</For>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Body
