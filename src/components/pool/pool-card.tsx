import { Button, Card } from '@mui/material'
import { UseApiDataReturn } from '@utils/backend/use-api-data'
import { useState } from 'react'
import { GetPool } from '@utils/backend/schemas'

export interface PoolCardProps {
  pool: GetPool
  api: UseApiDataReturn<any>
}

export default function PoolCard({ pool, api }: PoolCardProps) {
  const [deleted, setDeleted] = useState(false)

  const handleDelete = async () => {
    setDeleted(true)
    await api.triggerRequest({
      endpoint: `/pool/${pool.p.pool_id}`,
      id: 'delete-pool',
      method: 'DELETE',
    })
  }

  if (deleted) {
    return <></>
  }

  return (
    <Card>
      <h3>{pool.p.name}</h3>
      <p>{pool.p.description}</p>
      <Button href={`/pool/${pool.p.pool_id}`}>View Pool</Button>
      <Button onClick={handleDelete} variant="contained" color="error">
        Delete Pool
      </Button>
    </Card>
  )
}
