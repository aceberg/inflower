import { For } from "solid-js"
import WalletRow from "./WalletRow"
import { formatMoney } from "../../functions/format";
import { walletStore } from "../../store/wallets";

function WalletCard() {
  
  return (
  <div class="card border-primary">
    <div class="card-header">
      <h5>Wallets</h5>
    </div>
    <div class="card-body table-responsive">
      <table class="table table-sm table-hover table-borderless">
        <tbody>
          <For each={walletStore.wallets}>{(wallet) =>
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
          <For each={Object.entries(walletStore.totalsMain())}>
            {([currency, amount]) => (
            <tr>
              <td></td>
              <td class="d-flex flex-row-reverse">{formatMoney(amount)}</td>
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
