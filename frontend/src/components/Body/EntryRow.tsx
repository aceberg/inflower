function TableRow(_props: any) {

  return (
  <>
    <tr>
      <td>{_props.entry.Date}</td>
      <td>{_props.entry.AccFrom}→{_props.entry.AccTo}</td>
      <td>{_props.entry.Category}</td>
      <td>{_props.entry.Amount}</td>
      <td>{_props.entry.Note}</td>
    </tr>
  </>
  )
}

export default TableRow
