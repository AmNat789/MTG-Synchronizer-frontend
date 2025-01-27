'use client'

import { AuthProvider } from '@utils/auth/auth-context'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import theme from '@styles/theme'
import { ThemeProvider } from '@emotion/react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <AppRouterCacheProvider>
          <body>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </AppRouterCacheProvider>
          </body>
        </AppRouterCacheProvider>
      </AuthProvider>
    </html>
  )
}
