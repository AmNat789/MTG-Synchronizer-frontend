import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material'
import { ResponseCardInCollection } from '@utils/backend/schemas'
import CardDisplayRow from './row'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'
import { ApiRequest, UseApiDataReturn } from '@utils/backend/use-api-data'
import { ppid } from 'process'

interface CardDisplayTableProps {
  data: ResponseCardInCollection[] | null
  pools?: ResponseCardInCollection[]
  type: 'Collection' | 'Pool'
  api: UseApiDataReturn<any>
  request_on_submit: ApiRequest
}

export default function CardDisplayTable({
  data,
  pools = [],
  type,
  api,
  request_on_submit,
}: CardDisplayTableProps) {
  const [edit, setEdit] = useState(false)

  if (!data) {
    return null
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    interface FormDataEntry {
      scryfall_id: string
      number_owned: number
    }

    function getFormData(event: Event): FormDataEntry[] {
      const formElements = (event.target as HTMLFormElement).elements
      const formData: FormDataEntry[] = []

      Array.from(formElements).forEach(element => {
        const inputElement = element as HTMLInputElement

        if (
          inputElement.id &&
          inputElement.defaultValue !== inputElement.value
        ) {
          formData.push({
            scryfall_id: inputElement.id,
            number_owned: Number(inputElement.value),
          })
        }
      })

      return formData
    }

    const formData = getFormData(e)

    await api
      .triggerRequest({
        endpoint: request_on_submit.endpoint,
        id: request_on_submit.id,
        method: request_on_submit.method,
        body: formData,
      })
      .then(() => {
        window.location.reload()
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              style={{ display: type == 'Collection' ? 'table-cell' : 'none' }}
            >
              Number Owned
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Oracel Text</TableCell>
            <TableCell>Types</TableCell>
            <TableCell>Colors</TableCell>
            <Button variant="contained" onClick={() => setEdit(!edit)}>
              <EditIcon />
            </Button>
            <Button
              disabled={!edit}
              variant="contained"
              color="success"
              type="submit"
            >
              Save
            </Button>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map(card => (
            <CardDisplayRow
              card={card}
              type={type}
              key={card.node.scryfall_id}
              edit={edit}
              pools={pools}
            />
          ))}
        </TableBody>
      </Table>
      <Button
        onClick={() => {
          console.log(api)
        }}
      >
        click me
      </Button>
    </form>
  )
}
