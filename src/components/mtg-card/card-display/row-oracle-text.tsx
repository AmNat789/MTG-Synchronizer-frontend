import { TableCell } from '@mui/material'
import { ResponseCardInCollection } from '@utils/backend/schemas'
import symbology from '@utils/mtg-card/symbology'
import Image from 'next/image'

export default function CardDisplayRowOracleText({
  card,
}: {
  card: ResponseCardInCollection
}) {
  console.log(card)
  return (
    <TableCell>
      {card.node.oracle_texts.map(text => (
        <p
          key={`${card.node.scryfall_id}-${text}`}
          style={{ whiteSpace: 'pre-line' }}
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
