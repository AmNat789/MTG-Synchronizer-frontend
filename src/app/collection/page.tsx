'use client';

import useApiData from '@utils/backend/use-api-data';
import useScryfallData from '@utils/scryfall/use-api-data';
import { UUID } from 'crypto';
import { useEffect, useState } from 'react';

interface ResponseCardInCollection {
  scryfall_id: UUID;
  number_owned: number;
}

export default function CollectionPage() {
  // Fetch data from the backend API
  const { data, loading, error } = useApiData<ResponseCardInCollection[]>('/collection');

  // Scryfall data state
  const [scryfallCardsEndpoint, setScryfallCardsEndpoint] = useState<string | null>(null);

  // Fetch data from Scryfall API when the collection data is loaded
  const { data: scryfallData, loading: scryfallLoading, error: scryfallError } = useScryfallData<any>(scryfallCardsEndpoint || null);

  useEffect(() => {
    if (data && !loading) {
      // When backend data is loaded, construct the Scryfall API endpoint
      // const cardNames = data.map(card => card.name).join(' OR ');
      setScryfallCardsEndpoint(`/cards/${encodeURIComponent(data[0].scryfall_id)}`);
    }
  }, [data, loading]);

  if (loading || scryfallLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (scryfallError) return <div>Error fetching Scryfall data: {scryfallError.message}</div>;
  if (!data || !scryfallData) return <div>No data available.</div>;
  
  // const { data: scryfallData, loading: scryfallLoading, error: scryfallError } = useScryfallData<any>(scryfallCardsEndpoint || null);


  return (
    <div>
      <h2>Collection</h2>
      <div>Backend Data:</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      
      <h2>Scryfall Cards</h2>
      <div>Scryfall Data:</div>
      <pre>{JSON.stringify(scryfallData, null, 2)}</pre>
    </div>
  );
}
