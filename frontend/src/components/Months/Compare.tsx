import { createSignal } from "solid-js";
import CompareTotals from "./CompareTotals";
import { apiGetEntries } from "../../functions/api";
import { Entry } from "../../functions/exports";

function Compare() {

  const [entries1, setEntries1] = createSignal([]);
  const [entries2, setEntries2] = createSignal([]);
  const [entries1m, setEntries1m] = createSignal([]);
  const [entries2m, setEntries2m] = createSignal([]);

  const getData = async () => {
    const e1 = (await apiGetEntries("prevm"));
    const e2 = (await apiGetEntries("month"));

    setEntries1(e1.filter(
      (entry: Entry) => entry.AccFrom === "" && entry.AccTo !== ""
    ));
    setEntries2(e2.filter(
      (entry: Entry) => entry.AccFrom === "" && entry.AccTo !== ""
    ));
    setEntries1m(e1.filter(
      (entry: Entry) => entry.AccFrom !== "" && entry.AccTo === ""
    ));
    setEntries2m(e2.filter(
      (entry: Entry) => entry.AccFrom !== "" && entry.AccTo === ""
    ));
  };

  getData();

  return (
    <div class="card border-primary">
      <div class="card-body table-responsive">
        <table class="table table-sm table-hover table-borderless">
          <thead>
            <tr>
              <th>Category</th>
              <th class="text-end">Amount 1</th>
              <th></th>
              <th class="text-end">Amount 2</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} class="fw-bold table-active">Income</td>
            </tr>
            <CompareTotals entries1={entries1()} entries2={entries2()}></CompareTotals>
            <tr>
              <td colSpan={5}><hr></hr></td>
            </tr>
            <tr>
              <td colSpan={5} class="fw-bold table-active">Expenses</td>
            </tr>
            <CompareTotals entries1={entries1m()} entries2={entries2m()}></CompareTotals>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Compare