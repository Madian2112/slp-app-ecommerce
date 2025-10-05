import type { ReactNode } from 'react'
import Header from './Header'
import BottomNavigation from './BottomNavigation'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-16">
        {children}
      </main>
      <BottomNavigation />
    </div>
  )
}
