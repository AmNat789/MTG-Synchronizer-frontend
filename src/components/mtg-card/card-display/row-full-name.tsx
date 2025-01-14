import { TableCell } from '@mui/material'
import { useState } from 'react'
import Image from 'next/image'
import { ResponseCardInCollection } from '@utils/backend/schemas'

export default function CardDisplayRowFullName({
  card,
}: {
  card: ResponseCardInCollection
}) {
  const [showImg, setShowImg] = useState(false)

  return (
    <>
      <TableCell
        onMouseEnter={() => setShowImg(true)}
        onMouseLeave={() => setShowImg(false)}
        style={{ position: 'relative' }}
      >
        {card.node.full_name}
        {showImg && (
          <Image
            src={card.node.img_uris_small[0]}
            alt={card.node.full_name}
            width={200}
            height={280}
            style={{ position: 'absolute', zIndex: 1, top: -140, left: 200 }}
          />
        )}
      </TableCell>
    </>
  )
}
