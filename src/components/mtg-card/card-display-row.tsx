import { TableCell, TableRow, Card } from "@mui/material"
import Image from 'next/image'
import symbology from "@utils/mtg-card/symbology"
import { ResponseCardInCollection } from "app/collection/page"

export default function CardDisplayRow({
  card,
  type,
}: {
  card: ResponseCardInCollection | null
  type: "Collection" | "Pool"
}) {
    if (!card) {
        return null
    }

    return (
        <TableRow key={card.node.scryfall_id}>
            {type === "Collection" ? <TableCell>{card.number_owned}</TableCell> : null}
            <TableCell>{card.node.full_name}</TableCell>
            <TableCell>
                {card.node.types.map(type => (
                    <Card key={`${card.node.scryfall_id}-${type}`} sx={{margin: 0, padding: 0}}>{type}</Card>
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
    )
}
