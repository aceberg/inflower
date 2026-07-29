import { createMemo, For } from "solid-js"
import { allWallets } from "../../functions/exports"
import WalletRow from "./WalletRow"

function WalletCard() {
  
  const totals = createMemo(() =>
    allWallets.reduce<Record<string, number>>((acc, wallet) => {
      if (wallet.Hide) return acc;

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
            !wallet.Hide && <WalletRow wallet={wallet} />
          }</For>
          <tr>
            <td colSpan={3}><hr></hr></td>
          </tr>
          <tr>
            <td><b>Total</b></td>
            <td></td>
            <td></td>
          </tr>
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
