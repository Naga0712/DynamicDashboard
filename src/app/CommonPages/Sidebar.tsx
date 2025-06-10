'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from './SidebarContext'

const navItems = [
    { name: 'Home', path: '/home', icon: '🏠' },
    { name: 'Dashboard', path: '/dashboard', icon: '📊' }
]

export default function Sidebar() {
    const { isExpanded, toggleSidebar } = useSidebar()
    const pathname = usePathname()

    return (
        <aside className={`bg-gray-800 text-white h-screen p-4 ${isExpanded ? 'w-64' : 'w-16'} transition-all`}>
            <button
                onClick={toggleSidebar}
                className="text-white mb-6 bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
            >
                {isExpanded ? '<' : '☰'}
            </button>

            <nav className="space-y-2">
                {navItems.map(item => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center p-2 rounded hover:bg-gray-700 ${pathname === item.path ? 'bg-gray-700' : ''}`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        {isExpanded && <span className="ml-4">{item.name}</span>}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}
