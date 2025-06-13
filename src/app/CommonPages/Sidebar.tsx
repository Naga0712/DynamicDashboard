'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from './SidebarContext'

const navItems = [

    { name: 'Reports', path: '/dashboard', icon: '📊' },
    { name: 'Home', path: '/home', icon: '🏠' },
]

export default function Sidebar() {
    const { isExpanded, toggleSidebar } = useSidebar()
    const pathname = usePathname()

    return (
        <aside className={`bg-white text-black h-screen p-4 ${isExpanded ? 'w-64' : 'w-16'} transition-all`}>

            <img src="/TeslaImage.png" className='w-64' />

            <nav className="space-y-2">
                {navItems.map(item => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`flex items-center p-2 rounded hover:bg-blue-100 ${pathname === item.path ? 'bg-blue-100' : ''}`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        {isExpanded && <span className="ml-4 text-black">{item.name}</span>}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}
