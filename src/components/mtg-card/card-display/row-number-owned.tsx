import { TableCell } from "@mui/material"
import { CardDisplayRowProps } from "@components/mtg-card/card-display/row"

export default function CardDisplayRowNumberOwned(props: CardDisplayRowProps) {
  const { card, type, edit } = props
  if (!card) {
    return null
  }

  const display = type == 'Collection' ? 'table-cell' : 'none'
  const name = `${card.node.scryfall_id}-number-owned`

  if (edit) {
    return (
      <TableCell style={{ display: display }}>
        <input
          id={name}
          name={name}
          type="number"
          defaultValue={card.number_owned}
        />
      </TableCell>
    )
  }

  return <TableCell style={{ display: display }}>{card.number_owned}</TableCell>
}