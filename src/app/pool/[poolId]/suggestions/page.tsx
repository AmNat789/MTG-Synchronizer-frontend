'use client'
import { useState } from 'react'
import { Button, Card, Checkbox, FormControlLabel, Switch } from '@mui/material'
import { useParams } from 'next/navigation'
import useApiData from '@utils/backend/use-api-data'
import CardDisplayTable from '@components/mtg-card/card-display/table'
import { ResponseCardNode } from '@utils/backend/schemas'
import BaseLayout from '@components/base-layout'

export default function PoolSuggestionsPage() {
  const params = useParams()
  const { poolId } = params as { poolId: string }

  const api = useApiData()

  const legalities: string[] = [
    'standard',
    'future',
    'historic',
    'timeless',
    'gladiator',
    'pioneer',
    'explorer',
    'modern',
    'legacy',
    'pauper',
    'vintage',
    'penny',
    'commander',
    'oathbreaker',
    'standardbrawl',
    'brawl',
    'alchemy',
    'paupercommander',
    'duel',
    'oldschool',
    'premodern',
  ]

  // State typesa
  const [fromCollection, setFromCollection] = useState<boolean>(true)
  const [maxPrice, setMaxPrice] = useState<string>('')
  const [ignoreBasicLands, setIgnoreBasicLands] = useState<boolean>(true)
  const [preserveColors, setPreserveColors] = useState<boolean>(true)
  const [selectedLegalities, setSelectedLegalities] = useState<string[]>([])

  // Handle changes
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value)
  }

  const handleLegalitiesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const legality = event.target.name
    if (event.target.checked) {
      setSelectedLegalities(prev => [...prev, legality])
    } else {
      setSelectedLegalities(prev => prev.filter(l => l !== legality))
    }
  }

  const handleButtonClick = async () => {
    // Construct query parameters
    const queryParams = new URLSearchParams()

    queryParams.append('from_collection', String(fromCollection))
    queryParams.append('ignore_basic_lands', String(ignoreBasicLands))
    queryParams.append('preserve_colors', String(preserveColors))

    if (maxPrice) queryParams.append('max_price', maxPrice)
    if (selectedLegalities.length > 0) {
      queryParams.append('legalities', selectedLegalities.join(',')) // Convert array to comma-separated string
    }

    const url = `/pool/suggestions/${poolId}?${queryParams.toString()}`

    console.log('Request URL:', url) // Debugging log

    await api.triggerRequest({
      endpoint: url,
      id: 'pool-suggestions',
      method: 'GET',
    })
  }

  return (
    <BaseLayout>
      <h1>Card Suggestions for Pool ID: {poolId}</h1>

      <Card>
        <strong>Choose Cards to buy (Not in Collection)</strong>
        <Switch
          checked={fromCollection}
          onChange={() => setFromCollection(!fromCollection)}
        />
        <strong>Choose Cards you already own (In Collection)</strong>
      </Card>

      <Card>
        <strong>Max Price</strong>
        <input
          type="number"
          placeholder="Max Price (usd)"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
      </Card>

      <Card>
        <strong>Legalities</strong>
        {legalities.map(leg => (
          <Card key={leg} style={{ display: 'inline-block' }}>
            <FormControlLabel
              control={
                <Checkbox
                  name={leg}
                  color="primary"
                  checked={selectedLegalities.includes(leg)}
                  onChange={handleLegalitiesChange}
                />
              }
              label={leg}
            />
          </Card>
        ))}
      </Card>

      <Card>
        <FormControlLabel
          control={
            <Checkbox
              checked={ignoreBasicLands}
              onChange={() => setIgnoreBasicLands(!ignoreBasicLands)}
            />
          }
          label={<strong>Ignore Basic Lands</strong>}
        />
      </Card>

      <Card>
        <FormControlLabel
          control={
            <Checkbox
              checked={preserveColors}
              onChange={() => setPreserveColors(!preserveColors)}
            />
          }
          label={
            <>
              <strong>Preserve Colors</strong> Choose cards with the same color
              as cards in pool
            </>
          }
        />
      </Card>

      <Button onClick={handleButtonClick}>Search For Suggestions</Button>

      <CardDisplayTable
        data={api.data['pool-suggestions'] as ResponseCardNode[] | null}
        api={api}
        editable={false}
        pool_id={poolId}
      />
    </BaseLayout>
  )
}
