import { useState, useEffect } from 'react'

const navLinks = [
  { index: '1.0', label: 'Work', href: '#portfolio' },
  { index: '2.0', label: 'Revelation', href: '#revelation' },
  { index: '3.0', label: 'Services', href: '#services' },
  { index: '4.0', label: 'Reveal', href: '#quiz' },
]

/* Arqos-style grid-dots / close glyph inside the rounded menu button */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span className="relative block w-4 h-4">
      {open ? (
        <>
          <span className="absolute left-1/2 top-1/2 w-4 h-px bg-cream -translate-x-1/2 -translate-y-1/2 rotate-45" />
          <span className="absolute left-1/2 top-1/2 w-4 h-px bg-cream -translate-x-1/2 -translate-y-1/2 -rotate-45" />
        </>
      ) : (
        <span className="grid grid-cols-3 gap-[3px] w-full h-full place-content-center">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="w-[3px] h-[3px] rounded-full bg-cream/85" />
          ))}
        </span>
      )}
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-void/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Wordmark */}
        <a href="/" className="flex items-center shrink-0" data-cursor aria-label="AIR home">
          <span className="font-display text-2xl font-bold text-cream tracking-tight leading-none">
            AIR<span className="align-super text-[0.5em] font-medium">®</span>
          </span>
        </a>

        {/* Centered numbered nav */}
        <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} data-cursor className="group flex items-baseline gap-1.5">
              <span className="font-mono text-[11px] text-muted group-hover:text-gold transition-colors duration-200">
                {link.index}
              </span>
              <span className="font-sans text-[15px] font-medium text-cream group-hover:text-gold transition-colors duration-200">
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Rounded grid-dots menu button */}
        <button
          className="flex items-center justify-center w-14 h-11 rounded-xl bg-obsidian border border-border hover:border-gold transition-colors duration-300 shrink-0"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          data-cursor
        >
          <MenuGlyph open={menuOpen} />
        </button>
      </div>

      {/* Dropdown menu (all breakpoints) */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-void/95 backdrop-blur-md border-t border-border px-6 lg:px-10 py-6">
          <div className="max-w-[1600px] mx-auto flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline gap-3 py-3 border-b border-border/60 last:border-0"
                data-cursor
              >
                <span className="font-mono text-[11px] text-muted group-hover:text-gold transition-colors">{link.index}</span>
                <span className="font-display text-2xl lg:text-3xl font-medium text-cream group-hover:text-gold transition-colors">
                  {link.label}
                </span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 self-start font-mono text-xs tracking-widest uppercase px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-void transition-all duration-300"
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
