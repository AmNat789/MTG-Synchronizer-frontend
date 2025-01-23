import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { Button } from '@mui/material'
import { ResponseCardNode } from '@utils/backend/schemas'
import { ApiRequest, UseApiDataReturn } from '@utils/backend/use-api-data'

interface CardDisplayAddToPoolProps {
  card: ResponseCardNode | null
  pool_id?: string
  api: UseApiDataReturn<any>
  setHidden: (hidden: boolean) => void
}

export default function CardDisplayAddAndIgnorePoolButtons({
  card,
  pool_id,
  api,
  setHidden,
}: CardDisplayAddToPoolProps) {
  const handleRequest = async (
    endpoint: string,
    transform_body: {
      (scryfall_id: string): any
    }
  ): Promise<void> => {
    if (!card) return
    const body = transform_body(card?.node.scryfall_id)
    await api
      .triggerRequest({
        endpoint: endpoint,
        id: `add-or-ignore${card?.node.scryfall_id}`,
        method: 'POST',
        body: body,
      })
      .then(() => {
        setHidden(true)
      })
  }

  if (!pool_id) {
    return null
  }

  return (
    <>
      <Button
        onClick={() =>
          handleRequest(`/pool/${pool_id}/cards`, (scryfall_id: string) => [
            { scryfall_id },
          ])
        }
        variant="contained"
        color="success"
      >
        <AddIcon />
      </Button>
      <Button
        onClick={() =>
          handleRequest(
            `/pool/${pool_id}/cards/ignore`,
            (scryfall_id: string) => [scryfall_id]
          )
        }
        variant="contained"
        color="error"
      >
        <CloseIcon />
      </Button>
    </>
  )
}
