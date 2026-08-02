import { createEffect, createSignal } from "solid-js";
import CompareTotals from "./CompareTotals";
import { compareMonths, CompareResult, shiftMonth } from "../../functions/months";
import { formatDate } from "../../functions/format";
import { CarLeft, CarRight } from "../../functions/icons";

function Compare() {

  const [comparison, setComparison] = createSignal<CompareResult>();
  const [m1, setM1] = createSignal<string>(formatDate("prevm"));
  const [m2, setM2] = createSignal<string>(formatDate("month"));

  createEffect(async () => {
    const month1 = m1();
    const month2 = m2();

    setComparison(await compareMonths(month1, month2));
  });

  return (
    <div class="card border-primary">
      <div class="card-body table-responsive">
        <table class="table table-sm table-hover table-borderless">
          <thead>
            <tr>
              <th></th>
              <th class="d-flex">
                <div class="my-btn p-2 text-body" onClick={() => setM1(shiftMonth(m1(), -1))}><CarLeft></CarLeft></div>
                <input type="date" class="form-control" placeholder="Date" value={m1()+"-01"} onInput={e => setM1(e.currentTarget.value.slice(0, 7))}></input>
                <div class="my-btn p-2 text-body" onClick={() => setM1(shiftMonth(m1(), 1))}><CarRight></CarRight></div>
              </th>
              <th></th>
              <th class="d-flex">
                <div class="my-btn p-2 text-body" onClick={() => setM2(shiftMonth(m2(), -1))}><CarLeft></CarLeft></div>
                <input type="date" class="form-control" placeholder="Date" value={m2()+"-01"} onInput={e => setM2(e.currentTarget.value.slice(0, 7))}></input>
                <div class="my-btn p-2 text-body" onClick={() => setM2(shiftMonth(m2(), 1))}><CarRight></CarRight></div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} class="fw-bold table-active">Income</td>
            </tr>
            <CompareTotals money={comparison()?.income} totals={comparison()?.incomeTotals}></CompareTotals>
            <tr>
              <td colSpan={5}><hr></hr></td>
            </tr>
            <tr>
              <td colSpan={5} class="fw-bold table-active">Expenses</td>
            </tr>
            <CompareTotals money={comparison()?.expenses} totals={comparison()?.expenseTotals}></CompareTotals>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Compare