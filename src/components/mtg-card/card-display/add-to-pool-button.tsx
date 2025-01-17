import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { GetPool, ResponseCardInCollection } from '@utils/backend/schemas';
import { UseApiDataReturn } from '@utils/backend/use-api-data';
import { ChangeEvent, useState } from 'react'

interface CardDisplayAddToPoolProps {
    card: ResponseCardInCollection | null
    pools: GetPool[] | undefined
    api: UseApiDataReturn<any>
}

export default function CardDisplayAddToPool({card, pools, api}: CardDisplayAddToPoolProps) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleAddToPool = () => {
        api.triggerRequest({
            endpoint: `/pool/${selectedOption}/cards`,
            id: 'post-pool',
            method: 'POST',
            body: {
                scryfall_id: card?.node.scryfall_id,
            }
        });
    }

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    if (!pools) {
        return null
    }

    return (
    <>
        <Button onClick={handleAddToPool} variant='contained' color='success'>
            <AddIcon/>
        </Button>
        <select value={selectedOption} onChange={handleChange}>
            {
                pools.map(pool => (
                    <option key={pool.p.pool_id} value={pool.p.pool_id}>
                        {pool.p.name}
                    </option>
                ))
            }
        </select>
    </>  
    )
}