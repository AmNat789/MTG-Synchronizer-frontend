import React from 'react'
import { AppBar, Box, Button, Toolbar } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useAuth } from '@utils/auth/auth-context'

export default function Header() {
  const router = useRouter()
  const { logOut } = useAuth()

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => router.push('/collection')}>
            COLLECTION
          </Button>
          <Button color="inherit" onClick={() => router.push('/pool')}>
            POOLS
          </Button>
        </Box>
        <Button color="inherit" onClick={logOut}>
          LOG OUT
        </Button>
      </Toolbar>
    </AppBar>
  )
}
