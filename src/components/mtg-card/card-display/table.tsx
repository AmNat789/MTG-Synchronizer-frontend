import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material'
import { GetPool, ResponseCardInCollection } from '@utils/backend/schemas'
import CardDisplayRow from './row'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'
import { ApiRequest, UseApiDataReturn } from '@utils/backend/use-api-data'

interface CardDisplayTableProps {
  data: ResponseCardInCollection[] | null
  pools?: GetPool[]
  type: 'Collection' | 'Pool'
  api: UseApiDataReturn<any>
  request_on_submit: ApiRequest
  transformFormData?: (formData: FormDataEntry[]) => any
}

export interface FormDataEntry {
  scryfall_id: string
  number_owned: number
}

export default function CardDisplayTable({
  data,
  pools = [],
  type,
  api,
  request_on_submit,
  transformFormData = (d) => d,
}: CardDisplayTableProps) {
  const [edit, setEdit] = useState(false)

  if (!data) {
    return null
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    function getFormData(event: Event): FormDataEntry[] {
      const formElements = (event.target as HTMLFormElement).elements
      const formData: FormDataEntry[] = []

      Array.from(formElements).forEach(element => {
        const inputElement = element as HTMLInputElement

        if (
          inputElement.name &&
          inputElement.defaultValue !== inputElement.value
        ) {
          formData.push({
            scryfall_id: inputElement.name,
            number_owned: Number(inputElement.value),
          })
        }
      })

      return formData
    }

    const formData = getFormData(e)
    const formattedFormData = transformFormData(formData)
    
    await api
      .triggerRequest({
        endpoint: request_on_submit.endpoint,
        id: request_on_submit.id,
        method: request_on_submit.method,
        body: formattedFormData,
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
            <TableCell>
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
            </TableCell>
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
              api={api}
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
