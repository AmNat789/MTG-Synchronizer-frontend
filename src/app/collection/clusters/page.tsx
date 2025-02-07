'use client'
import CreateCardPool from '@components/pool/create-pool'
import { Button, Card } from '@mui/material'
import {
  GetCardClustersResponse,
  MtgCard,
  RequestUpdateCard,
} from '@utils/backend/schemas'
import useApiData from '@utils/backend/use-api-data'
import Image from 'next/image'
import { useState } from 'react'

export default function CardClustersPage() {
  const [showOverlay, setShowOverlay] = useState(false)
  const [cards, setCards] = useState<RequestUpdateCard[]>([])

  const api = useApiData({
    initialRequests: [
      {
        endpoint: '/suggestions/collection-clusters',
        id: 'collection-clusters',
        method: 'GET',
      },
    ],
  })

  if (
    !api.data['collection-clusters'] ||
    (api.data['collection-clusters'] as GetCardClustersResponse[]).length === 0
  ) {
    return null
  }

  const handleSelectCluster = (cluster: MtgCard[]) => {
    setShowOverlay(true)
    setCards(cluster.map(card => ({ scryfall_id: card.scryfall_id })))
  }

  return (
    <div>
      <h1>Card Cluster Suggestions Page</h1>
      <div>
        <h2>Cluster 1</h2>
        {(api.data['collection-clusters'] as GetCardClustersResponse[]).map(
          (cluster, idx) => (
            <div key={idx}>
              <h3>Cluster {idx + 1}</h3>
              <div>
                <h4>Card Suggestions</h4>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleSelectCluster(cluster.nodes)}
                >
                  Create Pool From Cluster
                </Button>
                <div
                  style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns:
                      'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '16px',
                  }}
                >
                  {cluster.nodes.map((card, idx) => (
                    <Image
                      src={card.img_uris_normal[0]}
                      alt={card.full_name}
                      width={200}
                      height={280}
                      key={idx}
                    />
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div
        style={{
          display: showOverlay ? undefined : 'none',
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          bottom: 0,
          left: 0,
          backgroundColor: 'gray',
        }}
      >
        <Card
          style={{
            margin: 'auto',
            top: '50%',
            transform: 'translateY(-50%)',
            position: 'relative',
          }}
        >
          <CreateCardPool api={api} cards={cards} />
        </Card>
      </div>
    </div>
  )
}
