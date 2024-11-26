'use client';

import { useAuth } from '@components/auth/auth-context';

export default function LogoutButton() {
  const { logOut } = useAuth()

  return (
      <button onClick={logOut}>Log Out</button>
  )
}