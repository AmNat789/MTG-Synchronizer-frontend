'use client'
import CardDisplayTable from '@components/mtg-card/card-display-table'
import useApiData from '@utils/backend/use-api-data'
import { ResponseCardInCollection } from '@utils/backend/schemas'
import { useParams } from 'next/navigation'

export default function PoolPage() {
  const params = useParams()
  const { poolId } = params

  const api = useApiData({
    initialRequests: [
      { endpoint: `/pool/${poolId}/cards`, id: 'pool', method: 'GET' },
    ],
  })

  console.log(api.data['pool'])

  return (
    <div>
      <h1>Pool ID: {poolId}</h1>
      <CardDisplayTable
        data={api.data['pool'] as ResponseCardInCollection[] | null}
        type={'Pool'}
        api={api}
        request_on_submit={{
          endpoint: `/pool/${poolId}/cards`,
          id: 'post-pool-table',
          method: 'POST',
        }}
      />
    </div>
  )
}
