
"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"

export default function Home() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/signup')
  }

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to Braincrumb</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Your personalized learning journey starts here. Track your progress, get tailored recommendations, and achieve your academic goals.
            </p>
            <div className="space-x-4">
              <Button onClick={handleGetStarted} size="lg">
                Get Started
              </Button>
              <Button onClick={handleLogin} variant="outline" size="lg">
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Braincrumb?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get customized study plans and recommendations based on your academic profile and goals.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor your progress with detailed analytics and insights to stay on track.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expert Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access a community of learners and educators to help you succeed.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
