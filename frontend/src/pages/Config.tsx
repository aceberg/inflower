import { onMount } from "solid-js";
import Basic from "../components/Config/Basic"
import Category from "../components/Config/Category"
import Wallets from "../components/Config/Wallest"
import { syncWallets } from "../functions/atstart";


function Config() {

  onMount(async () => {
    await syncWallets();
  });

  return (
    <div class="row mb-4">
      <div class="col-md mt-4">
        <Basic></Basic>
        <div class="mt-4">
          <Category></Category>
        </div>
      </div>
      <div class="col-md mt-4">
        <Wallets></Wallets>
      </div>
    </div>
  )
}

export default Config