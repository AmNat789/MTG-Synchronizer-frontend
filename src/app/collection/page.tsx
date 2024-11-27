'use client'

import useApiData from '@utils/backend/use-api-data'

interface ResponseCardInCollection {
  name: string
  number_owned: number
}

export default function CollectionPage() {
  const { data, loading, error } =
    useApiData<ResponseCardInCollection[]>('/collection')

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div>No data available.</div>

  return <div>Data: {JSON.stringify(data)}</div>
}
