import { TableCell, TableRow, Card } from '@mui/material'
import { ResponseCardNode } from '@utils/backend/schemas'
import { useEffect, useState } from 'react'
import CardDisplayRowNumberOwned from '@components/mtg-card/card-display/row-number-owned'
import CardDisplayRowOracleText from '@components/mtg-card/card-display/row-oracle-text'
import CardDisplayRowColors from '@components/mtg-card/card-display/row-colors'
import CardDisplayDeleteButton from '@components/mtg-card/card-display/delete-button'
import CardDisplayRowFullName from '@components/mtg-card/card-display/row-full-name'
import CardDisplayAddAndIgnorePoolButtons from '@components/mtg-card/card-display/add-and-ignore-pool-buttons'
import { UseApiDataReturn } from '@utils/backend/use-api-data'

export interface CardDisplayRowProps {
  card: ResponseCardNode | null
  edit: boolean
  pool_id?: string
  api: UseApiDataReturn<any>
  reset: boolean
}

export default function CardDisplayRow(props: CardDisplayRowProps) {
  const { card, edit, pool_id, api, reset } = props
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (reset) {
      setHidden(false)
    }
  }, [reset])

  if (!card) {
    return null
  }

  return (
    <>
      <TableRow
        key={card.node.scryfall_id}
        style={{ display: hidden ? 'none' : undefined }}
      >
        <CardDisplayRowNumberOwned {...props} />
        <CardDisplayRowFullName card={card} />
        <CardDisplayRowOracleText card={card} />
        <TableCell>
          {card.node.types.map((type, idx) => (
            <Card key={`${card.node.scryfall_id}-type-${idx}`}>{type}</Card>
          ))}
        </TableCell>
        <CardDisplayRowColors card={card} />

        <TableCell>
          {edit ? (
            <CardDisplayDeleteButton card={card} setHidden={setHidden} />
          ) : null}

          {pool_id ? (
            <CardDisplayAddAndIgnorePoolButtons
              card={card}
              pool_id={pool_id}
              api={api}
              setHidden={setHidden}
            />
          ) : null}
        </TableCell>
      </TableRow>
    </>
  )
}
