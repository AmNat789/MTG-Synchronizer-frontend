'use client'

import { useRouter, usePathname } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, logout } from './firebase/config'
import { useEffect } from 'react'
import React, { ReactNode } from 'react'

export default function BaseLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log('User is signed in')
      } else {
        // User is signed out, redirect to the login page
        router.push(`/firebase?redirect=${pathname}`)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <div>
      <button onClick={logout}>Sign out</button>
      {children}
    </div>
  )
}
