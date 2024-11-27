import { useState, useEffect } from 'react'
import axiosClient from '@utils/backend/axios-client'
import { useAuth } from '@utils/auth/auth-context'
import { AxiosError, AxiosRequestConfig } from 'axios'

// Define types for the hook's parameters
interface UseApiDataOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' // HTTP methods
  body?: Record<string, any> | null // Payload body for POST/PUT/PATCH requests
}

// Define types for the hook's return value
interface UseApiDataReturn<T> {
  data: T | null
  loading: boolean
  error: AxiosError | null
}

// The hook itself
const useApiData = <T>(
  endpoint: string,
  { method = 'GET', body = null }: UseApiDataOptions = {}
): UseApiDataReturn<T> => {
  const { user, loading: authLoading } = useAuth()
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<AxiosError | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!user || authLoading) return // Wait until auth is initialized
      setLoading(true)
      setError(null)

      try {
        const config: AxiosRequestConfig = {
          method,
          url: endpoint,
          ...(body && { data: body }), // Include `data` only if a body is provided
        }

        const response = await axiosClient(config)
        setData(response.data)
      } catch (err) {
        setError(err as AxiosError)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user, authLoading, endpoint, method, body])

  return { data, loading, error }
}

export default useApiData
