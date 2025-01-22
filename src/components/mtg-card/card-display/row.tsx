import { TableCell, TableRow, Card } from '@mui/material'
import { ResponseCardNode } from '@utils/backend/schemas'
import { useState } from 'react'
import CardDisplayRowNumberOwned from '@components/mtg-card/card-display/row-number-owned'
import CardDisplayRowOracleText from '@components/mtg-card/card-display/row-oracle-text'
import CardDisplayRowColors from '@components/mtg-card/card-display/row-colors'
import CardDisplayDeleteButton from '@components/mtg-card/card-display/delete-button'
import CardDisplayRowFullName from '@components/mtg-card/card-display/row-full-name'
import CardDisplayAddToPool from '@components/mtg-card/card-display/add-to-pool-button'
import { UseApiDataReturn } from '@utils/backend/use-api-data'

export interface CardDisplayRowProps {
  card: ResponseCardNode | null
  edit: boolean
  pool_id?: string
  api: UseApiDataReturn<any>
}

export default function CardDisplayRow(props: CardDisplayRowProps) {
  const { card, edit, pool_id, api } = props
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
        <CardDisplayRowColors card={card} />

        <TableCell>
          {edit ? (
            <CardDisplayDeleteButton card={card} setHidden={setHidden} />
          ) : null}

          {pool_id && !edit ? (
            <CardDisplayAddToPool card={card} pool_id={pool_id} api={api} />
          ) : null}
        </TableCell>
      </TableRow>
    </>
  )
}
