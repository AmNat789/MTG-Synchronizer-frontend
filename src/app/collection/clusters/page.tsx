'use client'
import { GetCardClustersResponse } from '@utils/backend/schemas'
import useApiData from '@utils/backend/use-api-data'
import Image from 'next/image'

export default function CardClustersPage() {
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
                <div style={{ width:"100%", display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
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
    </div>
  )
}
