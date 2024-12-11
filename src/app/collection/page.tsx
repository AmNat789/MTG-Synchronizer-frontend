'use client'

import CollectionTable from '@components/collection/collection-table'
import { MtgCard } from '@utils/backend/schemas'
import useApiData from '@utils/backend/use-api-data'
import useScryfallData from '@utils/scryfall/use-api-data'
import { useEffect, useState } from 'react'

export interface ResponseCardInCollection {
  node: MtgCard
  number_owned: number
}

export default function CollectionPage() {
  const { data, loading, error } =
    useApiData<ResponseCardInCollection[]>('/collection')

  // const [scryfallCardsIds, setscryfallCardsIds] = useState<string | null>(null)

  // const {
  //   data: scryfallData,
  //   loading: scryfallLoading,
  //   error: scryfallError,
  // } = useScryfallData<any>(
  //   {
  //     endpoint: '/cards/collection',
  //     make_request: scryfallCardsIds !== null,
  //     body: scryfallCardsIds,
  //     method: 'POST'
  //   }
  // )

  // useEffect(() => {
  //   if (data && !loading) {
  //     const requestObject: { identifiers: { id: UUID }[] } = { identifiers: [] }
  //     for (const card of data) {
  //       requestObject.identifiers.push({ id: card.scryfall_id })
  //     }
      
  //     setscryfallCardsIds(
  //       JSON.stringify(requestObject)
  //     )
  //   }
  // }, [data, loading])
  
  // const { data: scryfallData, loading: scryfallLoading, error: scryfallError } = useScryfallData<any>(scryfallCardsEndpoint || null);

  return (
    <div>
      <h2>Collection</h2>
      {/* <div>Backend Data:</div>
      <pre>{JSON.stringify(data, null, 2)}</pre> */}
      
      {/* <h2>Scryfall Cards</h2>
      <div>Scryfall Data:</div>
      <pre>{JSON.stringify(scryfallData, null, 2)}</pre> */}
      <CollectionTable data={data}/>
    </div>
  )
}
