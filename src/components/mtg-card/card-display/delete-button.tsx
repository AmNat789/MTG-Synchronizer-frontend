import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { ResponseCardNode } from '@utils/backend/schemas'

interface CardDisplayDeleteButtonProps {
  card: ResponseCardNode
  setHidden: (hidden: boolean) => void
}
export default function CardDisplayDeleteButton({
  card,
  setHidden,
}: CardDisplayDeleteButtonProps) {
  const handleDelete = () => {
    const input = document.getElementById(
      `${card.node.scryfall_id}-number-owned`
    )
    if (input) {
      ;(input as HTMLInputElement).value = '0'
      setHidden(true)
    }
  }

  return (
    <Button variant="contained" color="error" onClick={handleDelete}>
      <DeleteIcon />
    </Button>
  )
}
