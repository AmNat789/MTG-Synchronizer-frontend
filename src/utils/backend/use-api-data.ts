import { useState, useEffect, useCallback, useRef } from 'react'
import backendApiClient from '@utils/backend/api-client'
import { useAuth } from '@utils/auth/auth-context'
import { AxiosError, AxiosRequestConfig } from 'axios'

interface ApiRequest {
  endpoint: string
  id: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: any
}

interface UseApiDataOptions {
  initialRequests?: ApiRequest[]
}

export interface UseApiDataReturn<T> {
  data: Record<string, T | null>
  loading: boolean
  error: Record<string, AxiosError | null>
  triggerRequest: (request: ApiRequest) => Promise<void>
  setData: React.Dispatch<React.SetStateAction<Record<string, T | null>>>
}

const useApiData = <T>({
  initialRequests = [],
}: UseApiDataOptions = {}): UseApiDataReturn<T> => {
  const { user, loading: authLoading } = useAuth()
  const [data, setData] = useState<Record<string, T | null>>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Record<string, AxiosError | null>>({})
  const hasFetched = useRef(false)

  const fetchData = useCallback(async (request: ApiRequest) => {
    const { endpoint, id, method = 'GET', body = null } = request

    setError(prev => ({ ...prev, [endpoint]: null }))

    try {
      const config: AxiosRequestConfig = {
        method,
        url: endpoint,
        ...(body && { data: body }),
      }

      const response = await backendApiClient(config)
      setData(prev => ({ ...prev, [id]: response.data }))
    } catch (err) {
      setError(prev => ({ ...prev, [id]: err as AxiosError }))
    }
  }, [])

  useEffect(() => {
    if (!user || authLoading || hasFetched.current) return

    const executeInitialRequests = async () => {
      hasFetched.current = true
      for (const req of initialRequests) {
        await fetchData(req)
      }
      setLoading(false)
    }

    executeInitialRequests()
  }, [user, authLoading, initialRequests, fetchData])

  const triggerRequest = async (request: ApiRequest) => {
    setLoading(true)
    await fetchData(request)
    setLoading(false)
  }

  return { data, loading, error, triggerRequest, setData }
}

export default useApiData
