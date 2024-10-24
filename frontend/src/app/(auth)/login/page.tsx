
import { Metadata } from 'next'
import { LoginForm } from '@/src/components/auth/login-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"

export const metadata: Metadata = {
  title: 'Login - Braincrumb',
  description: 'Login to your Braincrumb account',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center mb-2">
            Welcome to Braincrumb
          </CardTitle>
          <CardDescription className="text-center">
            Please log in to continue to your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}