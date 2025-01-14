import { TableCell } from "@mui/material";
import { ResponseCardInCollection } from "@utils/backend/schemas";
import symbology from "@utils/mtg-card/symbology";
import Image from 'next/image'

export default function CardDisplayRowColors({card}:{card: ResponseCardInCollection}){
    return (<TableCell>
    {card.node.colors.map(color => (
      <Image
        key={`${card.node.scryfall_id}-${color}`}
        src={symbology[color as keyof typeof symbology].svg_uri}
        alt={color}
        width={20}
        height={20}
      />
    ))}
  </TableCell>)
}