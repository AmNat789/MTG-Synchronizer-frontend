import { TableCell, TableRow, Card, Button } from '@mui/material'
import Image from 'next/image'
import symbology from '@utils/mtg-card/symbology'
import { ResponseCardInCollection } from '@utils/backend/schemas'
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'

interface CardDisplayRowProps {
  card: ResponseCardInCollection | null
  type: 'Collection' | 'Pool'
  edit: boolean
}

function CardDisplayRowNumberOwned(props: CardDisplayRowProps) {
  const { card, type, edit } = props
  if (!card) {
    return null
  }

  const display = type == 'Collection' ? 'table-cell' : 'none'

  if (edit) {
    return (
      <TableCell style={{ display: display }}>
        <input
          id={card.node.scryfall_id}
          name={card.node.scryfall_id}
          type="number"
          defaultValue={card.number_owned}
        />
      </TableCell>
    )
  }

  return <TableCell style={{ display: display }}>{card.number_owned}</TableCell>
}

function CardDisplayOracleText({ card }: { card: ResponseCardInCollection }) {
  console.log(card)
  return (
    <TableCell>
      {card.node.oracle_texts.map((text) => (
        <p 
        key={`${card.node.scryfall_id}-${text}`}
        style={{whiteSpace: 'pre-line'}}
        >
          {text.split(/(\{.*?\})/).map((part, index) => {
            // Check if the part is a symbol (e.g., {G}, {U}, etc.)
            if (part.startsWith('{') && part.endsWith('}')) {
              const symbol = part.slice(1, -1)
              return (
                <Image
                  key={`${card.node.scryfall_id}-${text}-${index}`}
                  src={symbology[symbol as keyof typeof symbology].svg_uri}
                  alt={symbol}
                  width={14}
                  height={14}
                />
              )
            }
            // Return the text part as is
            return part
          })}
        </p>
      ))}
    </TableCell>
  )
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
        >
          {card.node.full_name}
        </TableCell>
        <CardDisplayOracleText card={card} />
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
