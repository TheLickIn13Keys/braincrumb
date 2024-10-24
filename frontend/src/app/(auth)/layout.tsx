export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="min-h-screen bg-gray-100">
        <nav className="p-4">
          <div className="container mx-auto">
            <a href="/" className="flex items-center">
              <div className="w-8 h-8 bg-pink-500 rounded-full mr-3"></div>
              <span className="text-2xl font-bold">Braincrumb</span>
            </a>
          </div>
        </nav>
        {children}
      </div>
    )
  }