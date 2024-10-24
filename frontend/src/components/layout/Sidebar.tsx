import { Home, Map, MessageSquare, ClipboardList, User, BarChart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Maps', href: '/dashboard/maps', icon: Map },
  { name: 'Forum', href: '/dashboard/forum', icon: MessageSquare },
  { name: 'Assessments', href: '/dashboard/assessments', icon: ClipboardList },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-sm">
      <div className="flex items-center h-16 px-6">
        <div className="w-8 h-8 bg-pink-500 rounded-full mr-3"></div>
        <span className="text-2xl font-bold">Braincrumb</span>
      </div>
      <nav className="px-4 py-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-pink-50 text-pink-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-pink-500' : 'text-gray-400'
                  }`} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}