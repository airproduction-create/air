import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Revelation', href: '#revelation' },
  { label: 'Services', href: '#services' },
  { label: 'Reveal Yourself', href: '#quiz' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-void/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group" data-cursor>
          <div className="relative">
            <span className="font-serif text-xl font-medium text-cream tracking-widest">AIR</span>
            <span
              className="absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 w-0 group-hover:w-full"
            />
          </div>
          <span className="font-mono text-xs text-muted tracking-ultra hidden sm:block">
            Artificial Intelligence Revelations
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-cursor
              className="font-sans text-sm text-muted hover:text-cream transition-colors duration-200 tracking-wider"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            data-cursor
            className="font-sans text-xs tracking-widest uppercase px-5 py-2 border border-gold text-gold hover:bg-gold hover:text-void transition-all duration-300"
          >
            Begin
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          data-cursor
        >
          <span className={`block w-6 h-px bg-cream transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-cream transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-void/95 backdrop-blur-md border-b border-border px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-sm text-cream-dim hover:text-cream transition-colors tracking-wider py-2 border-b border-border last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="font-sans text-xs tracking-widest uppercase px-5 py-3 border border-gold text-gold text-center mt-2"
          >
            Begin
          </a>
        </div>
      </div>
    </header>
  )
}
