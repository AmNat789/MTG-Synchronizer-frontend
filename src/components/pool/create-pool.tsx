import { UseApiDataReturn } from '@utils/backend/use-api-data'
import { Button, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'



export default function CreateCardPool({ api }: { api: UseApiDataReturn<any> }) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [disabled, setDisabled] = useState(false)
    const router = useRouter()


    const handleButtonClick = () => {
        setDisabled(true)
        if (name != '' && description != '') {
            api.triggerRequest({
                endpoint: '/pool',
                id: 'create-pool',
                method: 'POST',
                body: {
                    name: name,
                    description: description
                }
            })
        }
    }

    useEffect(() => {
        if (api.data['create-pool']) {
            const path = `/pool/${api.data['create-pool'].pool_id}`
            router.push(path)
        }
    }, [api.data])
    
    return (
        <>
            <TextField
            value={name}
            onChange={e => setName(e.target.value)}
            helperText="Name"
            />
            
            <TextField
            multiline
            value={description}
            onChange={e => setDescription(e.target.value)}
            helperText="Description"
            />

            <Button onClick={handleButtonClick} disabled={disabled}>
                Create New Card Pool
            </Button>
        </>
    )
}