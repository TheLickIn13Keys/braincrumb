import { Inter } from 'next/font/google'
import { AuthProvider } from '@/src/lib/auth/auth-context'
import { ErrorBoundary } from '@/src/components/common/ErrorBoundary';

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}