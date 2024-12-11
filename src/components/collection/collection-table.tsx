import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { ResponseCardInCollection } from 'app/collection/page'

export default function CollectionTable({data}: {data: ResponseCardInCollection[] | null}) {
  if (!data) {
    return null
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
            <TableCell>Number Owned</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Types</TableCell>
            <TableCell>Colors</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((card) => 
                <TableRow key={card.node.scryfall_id}>
                    <TableCell>{card.number_owned}</TableCell>
                    <TableCell>{card.node.full_name}</TableCell>
                    <TableCell>{card.node.types}</TableCell>
                    <TableCell>{card.node.colors}</TableCell>
                </TableRow>
            )}
      </TableBody> 
    </Table>
  )
}
