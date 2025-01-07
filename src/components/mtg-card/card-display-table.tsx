import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { ResponseCardInCollection } from 'app/collection/page'
import CardDisplayRow from './card-display-row'

export default function CardDisplayTable({
  data,
  type,
}: {
  data: ResponseCardInCollection[] | null
  type: "Collection" | "Pool"
}) {
  if (!data) {
    return null
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
            {type === "Collection" ? <TableCell>Number Owned</TableCell> : null}
          <TableCell>Name</TableCell>
          <TableCell>Types</TableCell>
          <TableCell>Colors</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map(card => (
          <CardDisplayRow card={card} type={type} key={card.node.scryfall_id}/>
        ))}
      </TableBody>
    </Table>
  )
}
