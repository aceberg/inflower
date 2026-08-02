import { formatMoney } from "../../functions/format"

function WalletRow(_props: any) {

  return (
    <tr>
      <td>{_props.wallet.Name}</td>
      <td class="d-flex flex-row-reverse">{formatMoney(_props.wallet.Amount)}</td>
      <td>{_props.wallet.Currency}</td>
    </tr>
  )
}

export default WalletRow
