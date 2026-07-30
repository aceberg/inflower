import { Show } from "solid-js";
import { apiDelEntry } from "../../functions/api";
import { syncEntriesAndWallets } from "../../functions/atstart";
import { SquareXIcon, XIcon } from "../../functions/icons";

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
      <td class="d-flex flex-row-reverse">{amountPrefix}&nbsp;&nbsp;{(_props.entry.Amount/100).toFixed(2)}</td>
      <td>{_props.entry.Currency}</td>
      <td>{_props.entry.Note}</td>
      <Show
        when={_props.history}
        fallback={
          <td onClick={handleDelete} class="entry-delete my-btn rounded-0" title="Delete">
            <XIcon></XIcon>
          </td>
        }
      >
        <td class="my-btn" onClick={handleDelete} title="Delete">
          <SquareXIcon></SquareXIcon>
        </td>
      </Show>
    </tr>
  </>
  )
}

export default EntryRow
