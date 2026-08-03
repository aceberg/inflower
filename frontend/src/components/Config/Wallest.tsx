import { For, onMount } from "solid-js";
import { apiPath } from "../../functions/api";
import { SquareXIcon } from "../../functions/icons";
import { formatMoney } from "../../functions/format";
import { walletStore } from "../../store/wallets";

function Wallets() {

  const handleDelete = async (id:number, name:string) => {
    if (confirm(`Delete ${name}?`)) {
      walletStore.remove(id);
    }
  };

  const handleHide = (id:number) => {
    walletStore.hide(id);
  };

  onMount(async () => {
    await walletStore.reload();
  });

  return (
    <div class="card border-primary">
      <div class="card-header">Wallets</div>
      <div class="card-body">
        <form class="input-group" action={apiPath + '/api/wallet'} method="post">
          <input name="name" type="text" class="form-control" placeholder="Name"></input>
          <input name="currency" type="text" class="form-control" placeholder="Currency"></input>
          <button type="submit" class="btn btn-primary">Add</button>
        </form>
        <div class="table-responsive">
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
            <For each={walletStore.wallets}>{(wallet) =>
              <tr>
                <td>
                  <div class="form-check form-switch">
                    <input type="checkbox" class="form-check-input" checked={wallet.Hide} onChange={() => handleHide(wallet.ID)}/>
                  </div>
                </td>
                <td>{wallet.Name}</td>
                <td class="d-flex flex-row-reverse">{formatMoney(wallet.Amount)}</td>
                <td>{wallet.Currency}</td>
                <td class="my-btn" onClick={() => handleDelete(wallet.ID, wallet.Name)} title="Delete">
                  <SquareXIcon></SquareXIcon>
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
            <For each={Object.entries(walletStore.totalsAll())}>
              {([currency, amount]) => (
              <tr>
                <td></td>
                <td></td>
                <td class="d-flex flex-row-reverse">{formatMoney(amount)}</td>
                <td>{currency}</td>
                <td></td>
              </tr>
              )}
            </For>
            </tbody>
          </table>
        </div>
        <div class="opacity-50">* hides wallet from main page</div>
      </div>
    </div>
  )
}

export default Wallets