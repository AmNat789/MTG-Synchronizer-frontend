'use client'

import { useAuth } from '@utils/auth/auth-context'

export default function LogoutButton() {
  const { logOut } = useAuth()

  return <button onClick={logOut}>Log Out</button>
}
