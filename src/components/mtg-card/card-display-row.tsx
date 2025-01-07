import { TableCell, TableRow, Card, Button } from '@mui/material'
import Image from 'next/image'
import symbology from '@utils/mtg-card/symbology'
import { ResponseCardInCollection } from 'app/collection/page'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'

interface CardDisplayRowProps {
  card: ResponseCardInCollection | null
  type: 'Collection' | 'Pool'
  edit: boolean
}

function CardDisplayRowNumberOwned(props: CardDisplayRowProps) {
  const { card, type, edit } = props
  if (!card || type !== 'Collection') {
    return null
  }

  if (edit) {
    return (
      <TableCell>
        <input
          id={card.node.scryfall_id}
          name={card.node.scryfall_id}
          type="number"
          defaultValue={card.number_owned}
        />
      </TableCell>
    )
  }

  return <TableCell>{card.number_owned}</TableCell>
}

export default function CardDisplayRow(props: CardDisplayRowProps) {
  const { card, edit } = props
  const [hidden, setHidden] = useState(false)
  const [showImg, setShowImg] = useState(false)

  if (!card) {
    return null
  }

  const handleDelete = () => {
    const input = document.getElementById(card.node.scryfall_id)
    if (input) {
      ;(input as HTMLInputElement).value = '0'
      setHidden(true)
    }
  }

  return (
    <>
    {showImg ? (
      <Image
        src={card.node.img_uris_small[0]}
        alt={card.node.full_name}
        width={200}
        height={280}
        style={{ position: 'absolute', zIndex: 1 }}
      />
      ) : null}
    <TableRow
      key={card.node.scryfall_id}
      sx={{ display: hidden && edit ? 'none' : 'table-row' }}
    >
      <CardDisplayRowNumberOwned {...props} />
      <TableCell
        onMouseEnter={() => setShowImg(true)}
        onMouseLeave={() => setShowImg(false)}
      >{card.node.full_name}</TableCell>
      <TableCell>
        {card.node.types.map(type => (
          <Card key={`${card.node.scryfall_id}-${type}`}>{type}</Card>
        ))}
      </TableCell>
      <TableCell>
        {card.node.colors.map(color => (
          <Image
            key={`${card.node.scryfall_id}-${color}`}
            src={symbology[color as keyof typeof symbology].svg_uri}
            alt={color}
            width={20}
            height={20}
          />
        ))}
      </TableCell>
    </TableRow>

    {edit ? (
        <Button variant="contained" color="error" onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      ) : null}
    </>
  )
}
