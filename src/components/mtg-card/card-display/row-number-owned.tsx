import { TableCell } from '@mui/material'
import { CardDisplayRowProps } from '@components/mtg-card/card-display/row'
import { ResponseCardAndNumOwned } from '@utils/backend/schemas'

export default function CardDisplayRowNumberOwned(props: CardDisplayRowProps) {
  const { card, edit } = props
  if (!card) {
    return null
  }

  const num_owned = (card as ResponseCardAndNumOwned).number_owned

  const display = num_owned ? 'table-cell' : 'none'

  if (edit) {
    return (
      <TableCell style={{ display: display }}>
        <input
          id={`${card.node.scryfall_id}-number-owned`}
          name={card.node.scryfall_id}
          type="number"
          defaultValue={num_owned ? num_owned : '1'}
        />
      </TableCell>
    )
  }

  return (
    <TableCell style={{ display: display }}>
      {(card as ResponseCardAndNumOwned).number_owned}
    </TableCell>
  )
}
