function WalletRow(_props: any) {

  return (
    <tr>
      <td>{_props.wallet.Name}</td>
      <td>{_props.wallet.Amount}  {_props.wallet.Currency}</td>
    </tr>
  )
}

export default WalletRow
