import AddRow from "../components/Body/AddRow"
import EntryCard from "../components/Body/EntryCard"
import WalletCard from "../components/Body/WalletCard"

function Body() {

  return (
  <>
  <div class="row">
    <AddRow></AddRow>
  </div>
  <div class="row">
    <div class="col-9 mt-4 mb-4">
      <EntryCard></EntryCard>
    </div>
    <div class="col-3 mt-4 mb-4">
      <WalletCard></WalletCard>
    </div>
  </div>
  </>
  )
}

export default Body
