import { onMount } from "solid-js";
import AddRow from "../components/Body/AddRow"
import EntryCard from "../components/Body/EntryCard"
import WalletCard from "../components/Body/WalletCard"
import { walletStore } from "../store/wallets";
import { entryStore } from "../store/entries";

function Body() {

  onMount(async () => {
    await Promise.all([
        entryStore.reload(),
        walletStore.reload(),
    ]);
  });

  return (
  <>
  <div class="row">
    <AddRow></AddRow>
  </div>
  <div class="row mt-4">
    <div class="col-md-9 mb-4">
      <EntryCard></EntryCard>
    </div>
    <div class="col-md-3 mb-4">
      <WalletCard></WalletCard>
    </div>
  </div>
  </>
  )
}

export default Body
