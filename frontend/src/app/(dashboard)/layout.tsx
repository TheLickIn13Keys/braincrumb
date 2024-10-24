
"use client"

import { useAuth } from '@/src/hooks/common/useAuth'
import { redirect } from 'next/navigation'
import { Bell, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-pink-500 rounded-full mr-3"></div>
          <h1 className="text-2xl font-bold">Braincrumb</h1>
        </div>
        <nav>
          <ul className="space-y-2">
            <li><a href="/dashboard" className="block py-2 px-4 text-pink-500 bg-pink-100 rounded">Home</a></li>
            <li><a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">Maps</a></li>
            <li><a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">Forum</a></li>
            <li><a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">Assessments</a></li>
            <li><a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">Profile</a></li>
            <li><a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded">Analytics</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Welcome to Braincrumb!</h2>
          <div className="flex items-center space-x-4">
            <Search className="text-gray-500" />
            <Bell className="text-gray-500" />
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        {children}
      </main>
    </div>
  )
}