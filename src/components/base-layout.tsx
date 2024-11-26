"use client"

import { useAuth } from '@components/auth/auth-context';
import Login from "@components/auth/login";
import LogoutButton from "@components/auth/logout-button";
import { useState, useEffect } from 'react';


export default function BaseLayout({children}: {children: React.ReactNode}) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  console.log(user)

  return (<>
  <LogoutButton/>
  {children}
  </>)
}
