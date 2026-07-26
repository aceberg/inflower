import { createMemo, For } from "solid-js"
import { allWallets } from "../../functions/exports"
import WalletRow from "./WalletRow"

function WalletCard() {

  const totals = createMemo(() =>
    allWallets.reduce<Record<string, number>>((acc, wallet) => {
      acc[wallet.Currency] = (acc[wallet.Currency] ?? 0) + wallet.Amount;
      return acc;
    }, {})
  );

  return (
  <div class="card border-primary">
    <div class="card-header">
      <h5>Wallets</h5>
    </div>
    <div class="card-body table-responsive">
      <table class="table table-sm table-hover table-borderless">
        <tbody>
          <For each={allWallets}>{(wallet) =>
            <WalletRow wallet={wallet}></WalletRow>
          }</For>
        </tbody>
      </table>
      <hr></hr>
      <table class="table table-sm table-hover table-borderless">
        <thead>
          <tr>
            <th style="width: 10em;">Total</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <For each={Object.entries(totals())}>
            {([currency, amount]) => (
            <tr>
              <td></td>
              <td class="d-flex flex-row-reverse">{(amount / 100).toFixed(2)}</td>
              <td>{currency}</td>
            </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default WalletCard
