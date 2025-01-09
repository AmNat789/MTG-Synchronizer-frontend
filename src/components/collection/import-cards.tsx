import { Button, TextField } from '@mui/material'
import { UseApiDataReturn } from '@utils/backend/use-api-data'
import { useState, useEffect } from 'react'

export default function ImportCards({ api }: { api: UseApiDataReturn<any> }) {
  const [text, setText] = useState('')
  const [error, setError] = useState(false)
  const [update, setUpdate] = useState(false)
  const [helperText, setHelperText] = useState(<></>)

  useEffect(() => {
    const update_data = () => {
      const collectionData = api.data['collection']
        ? [...api.data['collection']]
        : []
      const newData = api.data['post-collection'] || []

      for (const card of newData) {
        const index = collectionData.findIndex(
          old_card => old_card.node.scryfall_id === card.node.scryfall_id
        )
        if (index !== -1) {
          collectionData[index] = {
            ...collectionData[index],
            number_owned: card.number_owned,
          }
        } else {
          collectionData.push(card)
        }
      }

      api.setData(prev => ({
        ...prev,
        collection: collectionData,
      }))
    }

    if (api.data['post-collection'] && update) {
      update_data()
      setUpdate(false)
    }
  }, [api.data, update])

  useEffect(() => {
    const err = api.error['post-collection']
    if (err) {
      if (err.response?.status === 404) {
        setError(true)
        const errorData = err.response?.data as {
          detail: { missing_cards: string[] }
        }
        setHelperText(
          <>
            The following cards could not be found: <br />{' '}
            {errorData.detail.missing_cards.join(', ')}
          </>
        )
      }
    }
  }, [api.error])

  const textToCards = () => {
    try {
      // Clear any previous errors
      setError(false)

      const lines = text.trim().split('\n')
      const result = lines.map(line => {
        // Use regex to match "integer space string" format
        const match = line.trim().match(/^(\d+)\s+(.+)$/)

        if (!match) {
          throw new Error(`Invalid format in line: "${line}"`)
        }

        const update_amount = parseInt(match[1], 10)
        const name = match[2]

        return {
          update_amount,
          name,
        }
      })

      return result
    } catch {
      setError(true)
      setHelperText(
        <>
          Wrong Format: <br />
          Expected Format: <strong>&lt;number&gt;</strong>{' '}
          <strong>&lt;card name&gt;</strong>
          <br />
          For example: <strong>4 Lightning Bolt</strong>
        </>
      )
    }
  }

  const handleButtonClick = async () => {
    setError(false)
    const cards = textToCards()

    if (cards) {
      await api.triggerRequest({
        endpoint: '/collection',
        id: 'post-collection',
        method: 'POST',
        body: cards,
      })

      setUpdate(true)
    }
  }

  return (
    <div>
      <TextField
        multiline
        value={text}
        onChange={e => setText(e.target.value)}
        error={error}
        helperText={helperText}
        placeholder="2 Island"
      />
      <Button onClick={handleButtonClick} color={error ? 'error' : 'primary'}>
        Import Cards
      </Button>
    </div>
  )
}
