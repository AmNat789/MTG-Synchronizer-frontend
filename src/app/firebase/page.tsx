'use client'
import { useState } from 'react'
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  AuthProvider,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from './config' // Import your Firebase config
import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthenticationPage() {
  const [error, setError] = useState(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')

  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()

  const handleSignIn = async (provider: AuthProvider) => {
    setError(null)
    try {
      const result = await signInWithPopup(auth, provider)
      router.push(redirect || '/')
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => handleSignIn(googleProvider)}>
        Sign in with Google
      </button>
      <button onClick={() => handleSignIn(githubProvider)}>
        Sign in with GitHub
      </button>
    </div>
  )
}
