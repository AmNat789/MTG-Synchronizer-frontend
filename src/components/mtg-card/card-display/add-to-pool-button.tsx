import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import { ResponseCardNode } from '@utils/backend/schemas'
import { UseApiDataReturn } from '@utils/backend/use-api-data'
import { ChangeEvent, useState } from 'react'

interface CardDisplayAddToPoolProps {
  card: ResponseCardNode | null
  pool_id?: string
  api: UseApiDataReturn<any>
  setHidden: (hidden: boolean) => void
}

export default function CardDisplayAddToPool({
  card,
  pool_id,
  api,
  setHidden,
}: CardDisplayAddToPoolProps) {
  const handleAddToPool = async () => {
    await api.triggerRequest({
      endpoint: `/pool/${pool_id}/cards`,
      id: 'post-pool',
      method: 'POST',
      body: {
        scryfall_id: card?.node.scryfall_id,
      },
    }).then(() => setHidden(true))
  }

  if (!pool_id) {
    return null
  }

  return (
    <>
      <Button onClick={handleAddToPool} variant="contained" color="success">
        <AddIcon />
      </Button>
    </>
  )
}
