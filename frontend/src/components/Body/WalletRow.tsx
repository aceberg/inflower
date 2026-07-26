function WalletRow(_props: any) {

  return (
    <tr>
      <td>{_props.wallet.Name}</td>
      <td class="d-flex flex-row-reverse">{(_props.wallet.Amount/100).toFixed(2)}</td>
      <td>{_props.wallet.Currency}</td>
    </tr>
  )
}

export default WalletRow
