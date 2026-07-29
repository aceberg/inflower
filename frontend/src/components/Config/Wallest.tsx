import { createMemo, For } from "solid-js"
import { allWallets } from "../../functions/exports"
import { apiDelWallet, apiHideWallet, apiPath } from "../../functions/api";
import { syncWallets } from "../../functions/atstart";

function Wallets() {

  const totals = createMemo(() =>
    allWallets.reduce<Record<string, number>>((acc, wallet) => {
      acc[wallet.Currency] = (acc[wallet.Currency] ?? 0) + wallet.Amount;
      return acc;
    }, {})
  );

  const handleDelete = async (id:number, name:string) => {
    if (confirm(`Delete ${name}?`)) {
      await apiDelWallet(id);
      await syncWallets();
    }
  };

  const handleHide = async (id:number) => {
    await apiHideWallet(id);
    await syncWallets();
  };

  return (
    <div class="card border-primary">
      <div class="card-header">Wallets</div>
      <div class="card-body">
        <form class="input-group" action={apiPath + '/api/wallet'} method="post">
          <input name="name" type="text" class="form-control" placeholder="Name"></input>
          <input name="currency" type="text" class="form-control" placeholder="Currency"></input>
          <button type="submit" class="btn btn-primary">Add</button>
        </form>
        <table class="table table-sm table-borderless mt-4">
          <thead>
            <tr>
              <th>Hide *</th>
              <th>Name</th>
              <th class="d-flex flex-row-reverse">Amount</th>
              <th style="width: 3em;"></th>
              <th style="width: 2em;">Del</th>
            </tr>
          </thead>
          <tbody>
          <For each={allWallets}>{(wallet) =>
            <tr>
              <td>
                <div class="form-check form-switch">
                  <input type="checkbox" class="form-check-input" checked={wallet.Hide} onChange={() => handleHide(wallet.ID)}/>
                </div>
              </td>
              <td>{wallet.Name}</td>
              <td class="d-flex flex-row-reverse">{(wallet.Amount/100).toFixed(2)}</td>
              <td>{wallet.Currency}</td>
              <td class="my-btn" onClick={() => handleDelete(wallet.ID, wallet.Name)}>
                <i class="bi bi-x-square opacity-50"></i>
              </td>
            </tr>
          }</For>
          <tr>
            <td colSpan={5}><hr></hr></td>
          </tr>
          <tr>
            <td></td>
            <td><b>Total</b></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <For each={Object.entries(totals())}>
            {([currency, amount]) => (
            <tr>
              <td></td>
              <td></td>
              <td class="d-flex flex-row-reverse">{(amount / 100).toFixed(2)}</td>
              <td>{currency}</td>
              <td></td>
            </tr>
            )}
          </For>
          </tbody>
        </table>
        <div class="opacity-50">* hides wallet from main page</div>
      </div>
    </div>
  )
}

export default Wallets