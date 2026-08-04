import { Show } from "solid-js";
import { SquareXIcon, XIcon } from "../../functions/icons";
import { formatMoney } from "../../functions/format";
import { entryStore } from "../../store/entries";

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
    if (confirm(`Delete ${_props.entry.Date}: ${formatMoney(_props.entry.Amount)}?`)) {
      entryStore.remove(_props.entry.ID, _props.history);
    }
  };

  return (
  <>
    <tr class={newDate ? "border-top" : ""}>
      <td>{_props.entry.Date}</td>
      <td>{_props.entry.AccFrom}→{_props.entry.AccTo}</td>
      <td>{_props.entry.Category}</td>
      <td class="d-flex flex-row-reverse">{amountPrefix}&nbsp;&nbsp;{formatMoney(_props.entry.Amount)}</td>
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
