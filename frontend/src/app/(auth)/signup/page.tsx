
import { Metadata } from 'next'
import { SignupForm } from '@/src/components/auth/signup-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"

export const metadata: Metadata = {
  title: 'Sign Up - Braincrumb',
  description: 'Create your Braincrumb account',
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center mb-2">
            Create your account
          </CardTitle>
          <CardDescription className="text-center">
            Start your learning journey with Braincrumb
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  )
}