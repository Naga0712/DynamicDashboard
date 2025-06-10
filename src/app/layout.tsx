import '../styles/globals.css'
import Sidebar from './CommonPages/Sidebar'
import { SidebarProvider } from './CommonPages/SidebarContext'

export const metadata = {
  title: 'My Dashboard',
  description: 'Sidebar Layout with Tailwind',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
