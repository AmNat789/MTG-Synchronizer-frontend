'use client'
import CardDisplayTable from '@components/mtg-card/card-display/table'
import useApiData from '@utils/backend/use-api-data'
import { ResponseCardNode } from '@utils/backend/schemas'
import { useParams } from 'next/navigation'
import ImportCards from '@components/mtg-card/import-cards'
import BaseLayout from '@components/base-layout'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function PoolPage() {
  const router = useRouter()
  const params = useParams()
  const { poolId } = params

  const api = useApiData({
    initialRequests: [
      { endpoint: `/pool/${poolId}/cards`, id: 'pool', method: 'GET' },
    ],
  })

  return (
    <BaseLayout>
      <h1>Pool ID: {poolId}</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'start',
        }}
      >
        <ImportCards
          api={api}
          existing_data_id={'pool'}
          request_on_submit={{
            endpoint: `/pool/${poolId}/cards`,
            id: 'post-pool',
            method: 'POST',
          }}
          text_type={'name'}
        />

        <Button
          variant={'contained'}
          size={'large'}
          color={'secondary'}
          onClick={() => router.push(`/pool/${poolId}/suggestions`)}
        >
          <span
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              padding: '0.5rem',
            }}
          >
            Get Suggestions
          </span>
        </Button>
      </div>
      <CardDisplayTable
        data={api.data['pool'] as ResponseCardNode[] | null}
        api={api}
        request_on_submit={{
          endpoint: `/pool/${poolId}/cards`,
          id: 'delete-pool',
          method: 'DELETE',
        }}
        transformFormData={d => d.map(entry => entry.scryfall_id)}
      />
    </BaseLayout>
  )
}
