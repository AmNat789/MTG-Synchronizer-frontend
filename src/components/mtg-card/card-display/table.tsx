import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material'
import {
  ResponseCardAndNumOwned,
  ResponseCardNode,
} from '@utils/backend/schemas'
import CardDisplayRow from './row'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'
import { ApiRequest, UseApiDataReturn } from '@utils/backend/use-api-data'

interface CardDisplayTableProps {
  data: ResponseCardNode[] | null
  pool_id?: string
  api: UseApiDataReturn<any>
  editable?: boolean
  request_on_submit?: ApiRequest | null
  transformFormData?: (formData: FormDataEntry[]) => any
}

export interface FormDataEntry {
  scryfall_id: string
  number_owned: number
}

export default function CardDisplayTable({
  data,
  pool_id,
  api,
  request_on_submit,
  editable = true,
  transformFormData = d => d,
}: CardDisplayTableProps) {
  const [edit, setEdit] = useState(false)
  const [reset, setReset] = useState(false)

  if (data && data.length === 0) {
    return <>No Cards Found</>
  }
  if (!data) {
    return null
  }

  const handleSubmit = async (e: any) => {
    if (!request_on_submit) {
      return
    }

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

  const handleEdit = () => {
    if (edit) {
      setReset(true)
      setTimeout(() => setReset(false), 0)
    }
    setEdit(!edit)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                display: (data[0] as ResponseCardAndNumOwned).number_owned
                  ? 'table-cell'
                  : 'none',
              }}
            >
              Number Owned
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Oracel Text</TableCell>
            <TableCell>Types</TableCell>
            <TableCell>Colors</TableCell>
            {editable ? (
              <TableCell>
                <Button variant="contained" onClick={handleEdit}>
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
            ) : null}

            {pool_id ? <TableCell>Add To Pool</TableCell> : null}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map(card => (
            <CardDisplayRow
              card={card}
              key={card.node.scryfall_id}
              edit={edit}
              pool_id={pool_id}
              api={api}
              reset={reset}
            />
          ))}
        </TableBody>
      </Table>
    </form>
  )
}
