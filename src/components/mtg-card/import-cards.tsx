import { Button, TextField } from '@mui/material'
import { ApiRequest, UseApiDataReturn } from '@utils/backend/use-api-data'
import { useState, useEffect } from 'react'

interface Card{
  name: string
  update_amount?: number
}

interface ImportCardsProps {
  api: UseApiDataReturn<any>
  existing_data_id: string
  request_on_submit: ApiRequest
  text_type: 'name' | 'number_and_name'
  transformRequestData?: (data: Card[]) => any
}

export default function ImportCards({
  api,
  existing_data_id,
  request_on_submit,
  text_type,
  transformRequestData = (data: any) => data,
}: ImportCardsProps) {
  const [text, setText] = useState('')
  const [error, setError] = useState(false)
  const [update, setUpdate] = useState(false)
  const [helperText, setHelperText] = useState(<></>)

  const id = request_on_submit.id

  useEffect(() => {
    const update_data = () => {
      const data = api.data[existing_data_id]
        ? [...api.data[existing_data_id]]
        : []
      const newData = api.data[id] || []

      for (const card of newData) {
        const index = data.findIndex(
          old_card => old_card.node.scryfall_id === card.node.scryfall_id
        )
        if (index !== -1) {
          data[index] = {
            ...data[index],
            number_owned: card.number_owned,
          }
        } else {
          data.push(card)
        }
      }

      api.setData(prev => ({
        ...prev,
        [existing_data_id]: data,
      }))
    }

    if (api.data[id] && update) {
      update_data()
      setUpdate(false)
    }
  }, [api.data, update])

  useEffect(() => {
    const err = api.error[id]
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
        if (text_type === 'name') {
          return {
            name: line.trim(),
          }
        }
        
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
      const transformedCards = transformRequestData(cards)
      await api.triggerRequest({
        endpoint: request_on_submit.endpoint,
        id: request_on_submit.id,
        method: request_on_submit.method,
        body: transformedCards,
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
        placeholder={text_type == 'name' ? "Island \nFireball" : "2 Island \n3 Fireball"}
      />
      <Button onClick={handleButtonClick} color={error ? 'error' : 'primary'}>
        Import Cards
      </Button>
    </div>
  )
}
