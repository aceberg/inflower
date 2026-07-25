import { For } from "solid-js"
import { allWallets } from "../../functions/exports"
import WalletRow from "./WalletRow"

function WalletCard() {

  return (
  <div class="card border-primary">
    <div class="card-header">
      <h4>Wallets</h4>
    </div>
    <div class="card-body table-responsive">
      <table class="table table-sm table-hover table-borderless">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <For each={allWallets}>{(wallet) =>
            <WalletRow wallet={wallet}></WalletRow>
          }</For>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default WalletCard
