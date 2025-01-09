'use client'

import ImportCards from '@components/collection/import-cards'
import CardDisplayTable from '@components/mtg-card/card-display-table'
import { MtgCard } from '@utils/backend/schemas'
import useApiData from '@utils/backend/use-api-data'

export interface ResponseCardInCollection {
  node: MtgCard
  number_owned: number
}

export default function CollectionPage() {
  const api = useApiData({
    initialRequests: [
      { endpoint: '/collection', id: 'collection', method: 'GET' },
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
      <ImportCards api={api} />
    </div>
  )
}
