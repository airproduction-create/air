import { Header } from './Header'
import { Footer } from './Footer'
import { CursorEffect } from '../ui/CursorEffect'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <CursorEffect />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
