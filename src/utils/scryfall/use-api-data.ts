import { useState, useEffect } from 'react';
import scryfallApiClient from '@utils/scryfall/api-client';
import { AxiosError, AxiosRequestConfig } from 'axios';


interface UseScryfallDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}


const useScryfallData = <T>(
  endpoint: string | null,
  use_base_url: boolean = true
): UseScryfallDataReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  endpoint = use_base_url ? `https://api.scryfall.com${endpoint}` : endpoint;

  useEffect(() => {
    if(endpoint == null) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {        
        const config: AxiosRequestConfig = {
          method: 'GET',
          url: endpoint
        };

        const response = await scryfallApiClient(config);
        setData(response.data);
      } catch (err) {
        setError(err as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useScryfallData;
