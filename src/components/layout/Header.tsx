import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Journal', href: '#revelation' },
  { label: 'Quiz', href: '#quiz' },
]

function Logomark() {
  return (
    <svg className="w-[26px] h-[18px]" viewBox="0 0 30 20" fill="none" aria-hidden="true">
      <path
        d="M2 17 Q10 19 15 12 Q20 5 28 3"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span className="relative block w-4 h-4">
      <span
        className={`absolute left-1/2 top-1/2 w-4 h-px bg-cream -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${
          open ? 'rotate-45' : '-translate-y-[5px]'
        }`}
      />
      <span
        className={`absolute left-1/2 top-1/2 w-4 h-px bg-cream -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
          open ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        className={`absolute left-1/2 top-1/2 w-4 h-px bg-cream -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${
          open ? '-rotate-45' : 'translate-y-[5px]'
        }`}
      />
    </span>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 pt-6 flex items-center justify-between">
        {/* Wordmark */}
        <a href="/" className="flex items-center gap-2 shrink-0 text-cream" data-cursor aria-label="AIR home">
          <Logomark />
          <span className="font-display text-xl font-bold tracking-tight leading-none">AiR</span>
        </a>

        {/* Centered pill nav */}
        <nav
          className={`hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 rounded-full border border-border px-2 py-2 transition-colors duration-500 ${
            scrolled ? 'bg-obsidian/90 backdrop-blur-md' : 'bg-obsidian/60 backdrop-blur-sm'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-cursor
              className="font-sans text-[13px] font-medium text-cream-dim hover:text-cream px-4 py-2 rounded-full hover:bg-surface-2 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: persistent Begin CTA + menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            data-cursor
            className="hidden sm:inline-flex items-center h-11 px-6 rounded-full font-sans text-sm font-semibold bg-gold text-void hover:bg-gold-bright transition-colors duration-300"
          >
            Begin
          </a>
          <button
            className="flex items-center justify-center w-11 h-11 rounded-full bg-obsidian border border-border hover:border-gold transition-colors duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            data-cursor
          >
            <MenuGlyph open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Dropdown menu (all breakpoints) */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-4 mx-4 lg:mx-10 rounded-2xl bg-obsidian/95 backdrop-blur-md border border-border px-6 py-6">
          <div className="max-w-[1600px] mx-auto flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="group py-3 border-b border-border/60 last:border-0"
                data-cursor
              >
                <span className="font-display text-2xl lg:text-3xl font-medium text-cream group-hover:text-gold transition-colors">
                  {link.label}
                </span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 self-start font-sans text-sm font-semibold px-6 py-3 rounded-full bg-gold text-void hover:bg-gold-bright transition-all duration-300"
              data-cursor
            >
              Begin
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
