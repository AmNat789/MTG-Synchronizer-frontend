'use client'

import ImportCards from '@components/mtg-card/import-cards'
import CardDisplayTable from '@components/mtg-card/card-display/table'
import { ResponseCardInCollection } from '@utils/backend/schemas'
import useApiData from '@utils/backend/use-api-data'

export default function CollectionPage() {
  const api = useApiData({
    initialRequests: [
      { endpoint: '/collection', id: 'collection', method: 'GET' },
      { endpoint: '/pool', id: 'collection-pool', method: 'GET' },
    ],
  })

  return (
    <div>
      <h2>Collection</h2>
      <CardDisplayTable
        data={api.data['collection'] as ResponseCardInCollection[] | null}
        type={'Collection'}
        api={api}
        request_on_submit={{
          endpoint: '/collection',
          id: 'post-collection-table',
          method: 'POST',
        }}
      />
      <ImportCards
        api={api}
        existing_data_id={'collection'}
        request_on_submit={{
          endpoint: '/collection',
          id: 'post-collection',
          method: 'POST',
        }}
      />
    </div>
  )
}
