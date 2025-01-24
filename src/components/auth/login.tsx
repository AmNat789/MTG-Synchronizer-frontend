'use client'

import { useAuth } from '@utils/auth/auth-context'
import useApiData from '@utils/backend/use-api-data'

export default function Login() {
  const { signIn } = useAuth()
  const api = useApiData()

  const handleSignIn = async () => {
    await signIn().then(async () => {
        await api.triggerRequest({
          endpoint: '/user',
          id: 'user-login',
          method: 'POST',
        })
      })
  }

  return (
    <div>
      <h1>Please sign in to view content</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  )
}
