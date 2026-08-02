import { For } from "solid-js";
import { formatMoney } from "../../functions/format";

function CompareTotals(_props: any) {

  return (
  <>
    <For each={_props.money}>
      {(row) => (
        <tr>
          <td>{row.category}</td>
          <td class="text-end">{formatMoney(row.amount1)}</td>
          <td>{row.currency}</td>
          <td class="text-end">{formatMoney(row.amount2)}</td>
          <td>{row.currency}</td>
        </tr>
      )}
    </For>
    <tr>
      <td colSpan={5}><hr></hr></td>
    </tr>
    <For each={_props.totals}>
      {(row) => (
        <tr class="fw-bold">
          <td>Total</td>
          <td class="text-end">{formatMoney(row.amount1)}</td>
          <td>{row.currency}</td>
          <td class="text-end">{formatMoney(row.amount2)}</td>
          <td>{row.currency}</td>
        </tr>
      )}
    </For>
  </>
  )
}

export default CompareTotals