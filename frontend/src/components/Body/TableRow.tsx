function TableRow(_props: any) {

  return (
    <tr>
      <td>{_props.entry.ID}</td>
      <td>{_props.entry.Date}</td>
      <td>{_props.entry.AccFrom}</td>
      <td>{_props.entry.AccTo}</td>
      <td>{_props.entry.Category}</td>
      <td>{_props.entry.Amount}</td>
      <td>{_props.entry.Note}</td>
    </tr>
  )
}

export default TableRow
