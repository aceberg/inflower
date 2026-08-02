import { createEffect, createSignal } from "solid-js";
import { compareMonths, CompareResult, shiftMonth } from "../../functions/months";
import { formatDate } from "../../functions/format";
import PieChart from "./PieChart";
import { CarLeft, CarRight } from "../../functions/icons";


function PieCard() {

  const [comparison, setComparison] = createSignal<CompareResult>();
  const [m2, setM2] = createSignal<string>(formatDate("month"));

  createEffect(async () => {
    const month2 = m2();

    setComparison(await compareMonths("2009-11", month2));
  });

  return (
    <div class="card border-primary">
      <div class="card-body">
        <div class="d-flex justify-content-center">
          <div class="my-btn p-2 text-body" onClick={() => setM2(shiftMonth(m2(), -1))}><CarLeft></CarLeft></div>
          <input type="date" class="form-control w-auto" placeholder="Date" value={m2()+"-01"} onInput={e => setM2(e.currentTarget.value.slice(0, 7))}></input>
          <div class="my-btn p-2 text-body" onClick={() => setM2(shiftMonth(m2(), 1))}><CarRight></CarRight></div>
        </div>
        <div class="p-4">
          <p class="text-body fw-bolder">Income</p>
          <PieChart data={comparison()?.income ?? []} />
        </div>
        <div class="p-4">
          <p class="text-body fw-bolder">Expenses</p>
          <PieChart data={comparison()?.expenses ?? []} />
        </div>
      </div>
    </div>
  )
}

export default PieCard