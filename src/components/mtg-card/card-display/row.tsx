import { TableCell, TableRow, Card, Button } from '@mui/material'
import Image from 'next/image'
import { ResponseCardInCollection } from '@utils/backend/schemas'
import { useState } from 'react'
import CardDisplayRowNumberOwned from '@components/mtg-card/card-display/row-number-owned'
import CardDisplayRowOracleText from '@components/mtg-card/card-display/row-oracle-text'
import CardDisplayRowColors from '@components/mtg-card/card-display/row-colors'
import CardDisplayDeleteButton from '@components/mtg-card/card-display/delete-button'
import CardDisplayRowFullName from '@components/mtg-card/card-display/row-full-name'

export interface CardDisplayRowProps {
  card: ResponseCardInCollection | null
  type: 'Collection' | 'Pool'
  edit: boolean
  pools?: ResponseCardInCollection[]
}

export default function CardDisplayRow(props: CardDisplayRowProps) {
  const { card, edit } = props
  const [hidden, setHidden] = useState(false)

  if (!card) {
    return null
  }

  return (
    <>
      <TableRow
        key={card.node.scryfall_id}
        style={{ display: hidden && edit ? 'none' : undefined }}
      >
        <CardDisplayRowNumberOwned {...props} />
        <CardDisplayRowFullName card={card} />
        <CardDisplayRowOracleText card={card} />
        <TableCell>
          {card.node.types.map(type => (
            <Card key={`${card.node.scryfall_id}-${type}`}>{type}</Card>
          ))}
        </TableCell>
        <CardDisplayRowColors card={card}/>
      </TableRow>

      {edit ? <CardDisplayDeleteButton card={card} setHidden={setHidden}/> : null}
    </>
  )
}
