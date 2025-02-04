'use client'

import ImportCards from '@components/mtg-card/import-cards'
import CardDisplayTable from '@components/mtg-card/card-display/table'
import { ResponseCardAndNumOwned } from '@utils/backend/schemas'
import useApiData from '@utils/backend/use-api-data'
import BaseLayout from '@components/base-layout'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function CollectionPage() {
  const router = useRouter()
  const api = useApiData({
    initialRequests: [
      { endpoint: '/collection', id: 'collection', method: 'GET' },
    ],
  })

  return (
    <BaseLayout>
      <h2>Collection</h2>
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
          existing_data_id={'collection'}
          request_on_submit={{
            endpoint: '/collection',
            id: 'post-collection',
            method: 'POST',
          }}
          text_type="number_and_name"
        />

        <Button
          variant={'contained'}
          size={'large'}
          color={'secondary'}
          onClick={() => router.push(`/collection/clusters`)}
        >
          <span
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              padding: '0.5rem',
            }}
          >
            Get Clusters from Collection
          </span>
        </Button>
      </div>

      <CardDisplayTable
        data={api.data['collection'] as ResponseCardAndNumOwned[] | null}
        api={api}
        request_on_submit={{
          endpoint: '/collection',
          id: 'post-collection-table',
          method: 'POST',
        }}
      />
    </BaseLayout>
  )
}
