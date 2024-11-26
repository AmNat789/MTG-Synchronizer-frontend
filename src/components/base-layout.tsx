'use client'

import { useRouter, usePathname } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, logout } from '@utils/firebase'
import { useState, useEffect } from 'react'
import React, { ReactNode } from 'react'

export default function BaseLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log('User is signed in');
        console.log(user);
        setLoading(false); // Stop loading when user state is known
      } else {
        router.push(`/sign-in?redirect=${pathname}`);
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) return <div>Loading...</div>; // Show loading state during hydration

  return (
    <div>
      <button onClick={logout}>Sign out</button>
      {children}
    </div>
  );
}

