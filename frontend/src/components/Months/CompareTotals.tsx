import { createMemo, For } from "solid-js";
import { formatMoney } from "../../functions/format";

function CompareTotals(_props: any) {

  const categoryTotals = createMemo(() => {
    const totals1: Record<string, number> = {};
    const totals2: Record<string, number> = {};

    for (const entry of _props.entries1) {
      const key = `${entry.Category}\0${entry.Currency}`;
      totals1[key] = (totals1[key] ?? 0) + entry.Amount;
    }

    for (const entry of _props.entries2) {
      const key = `${entry.Category}\0${entry.Currency}`;
      totals2[key] = (totals2[key] ?? 0) + entry.Amount;
    }

    const keys = new Set([
      ...Object.keys(totals1),
      ...Object.keys(totals2),
    ]);

    return [...keys]
      .map(key => {
        const [category, currency] = key.split("\0");
        return {
          category,
          currency,
          amount1: totals1[key] ?? 0,
          amount2: totals2[key] ?? 0,
        };
      })
      .sort((a, b) =>
        b.amount2 - a.amount2 ||
        a.category.localeCompare(b.category) ||
        a.currency.localeCompare(b.currency)
      );
  });

  const currencyTotals = createMemo(() => {
  const totals: Record<string, { amount1: number; amount2: number }> = {};

  for (const row of categoryTotals()) {
    if (!totals[row.currency]) {
      totals[row.currency] = {
        amount1: 0,
        amount2: 0,
      };
    }

    totals[row.currency].amount1 += row.amount1;
    totals[row.currency].amount2 += row.amount2;
  }

  return Object.entries(totals)
    .map(([currency, t]) => ({
      currency,
      amount1: t.amount1,
      amount2: t.amount2,
    }))
    .sort((a, b) => a.currency.localeCompare(b.currency));
  });

  return (
  <>
    <For each={categoryTotals()}>
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
    <For each={currencyTotals()}>
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