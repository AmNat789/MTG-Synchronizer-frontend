'use client'

import CreateCardPool from '@components/pool/create-pool'
import PoolCard from '@components/pool/pool-card'
import { GetPool } from '@utils/backend/schemas'
import useApiData from '@utils/backend/use-api-data'

export default function PoolPage() {
  const api = useApiData({
    initialRequests: [{ endpoint: '/pool', id: 'pool', method: 'GET' }],
  })

  const pools = api.data['pool'] as GetPool[] | null

  if (!pools) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Card Pools</h2>

      {pools?.map(pool => (
        <PoolCard pool={pool} api={api} key={pool.p.pool_id} />
      ))}

      <CreateCardPool api={api} />
    </div>
  )
}
