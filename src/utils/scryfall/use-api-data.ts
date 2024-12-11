import { useState, useEffect } from 'react'
import scryfallApiClient from '@utils/scryfall/api-client'
import { AxiosError, AxiosRequestConfig } from 'axios'

interface UseScryfallDataReturn<T> {
  data: T | null
  loading: boolean
  error: AxiosError | null
}

interface UseScryfallDataProps {
  endpoint: string
  make_request: boolean
  use_base_url?: boolean
  body?: any
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
}

const useScryfallData = <T>({
  endpoint,
  make_request,
  use_base_url = true,
  body = null,
  method = 'GET',
}: UseScryfallDataProps): UseScryfallDataReturn<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<AxiosError | null>(null)

  endpoint = use_base_url ? `https://api.scryfall.com${endpoint}` : endpoint

  useEffect(() => {
    if (!make_request) return
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const config: AxiosRequestConfig = {
          method: method,
          url: endpoint,
          data: body,
        }

        const response = await scryfallApiClient(config)
        setData(response.data)
      } catch (err) {
        setError(err as AxiosError)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [make_request])

  return { data, loading, error }
}

export default useScryfallData
