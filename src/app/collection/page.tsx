'use client'

import CollectionTable from '@components/collection/collection-table'
import ImportCards from '@components/collection/import-cards'
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
      <CollectionTable data={api.data['collection'] as ResponseCardInCollection[] | null} />
      <ImportCards api={api} />
    </div>
  )
}
