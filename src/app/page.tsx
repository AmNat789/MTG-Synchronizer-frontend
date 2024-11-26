'use client';

import { useAuth } from '@components/auth/auth-context';
import Login from "@components/auth/login";
import LogoutButton from "@components/auth/logout-button";


export default function Home() {
  const { user, logOut } = useAuth();

  if (!user) {
    return <Login />;
  }

  console.log(user)

  return (<>
  <LogoutButton/>
  Home Page
  </>)
}
