import { apiDelEntry } from "../../functions/api";
import { syncEntriesAndWallets } from "../../functions/atstart";

import "./EntryRow.css";

let beforeDate = "";

function EntryRow(_props: any) {

  let newDate = false;
  if (beforeDate !== _props.entry.Date) {
    beforeDate = _props.entry.Date;
    newDate = true;
  }

  const amountPrefix =
  _props.entry.AccFrom && !_props.entry.AccTo
    ? "−"
    : _props.entry.AccTo && !_props.entry.AccFrom
    ? "+"
    : "";

  const handleDelete = async () => {
    if (confirm(`Delete ${_props.entry.Date}: ${_props.entry.Amount}?`)) {
      await apiDelEntry(_props.entry.ID);
      await syncEntriesAndWallets();
    }
  };

  return (
  <>
    <tr class={newDate ? "border-top" : ""}>
      <td>{_props.entry.Date}</td>
      <td>{_props.entry.AccFrom}→{_props.entry.AccTo}</td>
      <td>{_props.entry.Category}</td>
      <td>{amountPrefix}&nbsp;&nbsp;{(_props.entry.Amount/100).toFixed(2)}</td>
      <td>{_props.entry.Note}</td>
      <td onClick={handleDelete} class="entry-delete btn btn-sm btn-primary rounded-0" title="Delete">
        <i class="bi bi-x"></i>
      </td>
    </tr>
  </>
  )
}

export default EntryRow
