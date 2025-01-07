'use client'

import { useAuth } from '@utils/auth/auth-context'
import Login from '@components/auth/login'
import LogoutButton from '@components/auth/logout-button'

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading authentication...</div>
  }

  if (!user) {
    return <Login />
  }

  // console.log(user)

  return (
    <>
      <header>
        <LogoutButton />
      </header>
      <main>{children}</main>
    </>
  )
}
