import { apiDelEntry } from "../../functions/api";
import { syncEntriesAndWallets } from "../../functions/atstart";

let beforeDate = "";

function EntryRow(_props: any) {

  let newDate = false;

  if (beforeDate !== _props.entry.Date) {
    beforeDate = _props.entry.Date;
    newDate = true;
  }

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
      <td>{(_props.entry.Amount/100).toFixed(2)}</td>
      <td>{_props.entry.Note}</td>
      <td onClick={handleDelete} class="btn opacity-50">x</td>
    </tr>
  </>
  )
}

export default EntryRow
