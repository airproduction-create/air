export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl font-medium text-cream mb-3">AIR</p>
            <p className="font-mono text-xs text-muted tracking-ultra mb-6">
              Artificial Intelligence Revelations
            </p>
            <p className="font-sans text-sm text-muted leading-relaxed">
              We don't make content.<br />
              We reveal what was always there.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-xs text-muted tracking-ultra uppercase mb-6">Navigate</p>
            <nav className="flex flex-col gap-3">
              {['Work', 'Revelation', 'Services', 'Reveal Yourself', 'Begin'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                  className="font-sans text-sm text-muted hover:text-cream transition-colors duration-200"
                  data-cursor
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-xs text-muted tracking-ultra uppercase mb-6">Contact</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@air.co"
                className="font-sans text-sm text-muted hover:text-gold transition-colors duration-200"
                data-cursor
              >
                hello@air.co
              </a>
              <p className="font-sans text-sm text-muted">
                London · Johannesburg · Remote
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="font-mono text-xs text-muted">
            © {year} AIR — Artificial Intelligence Revelations
          </p>
          <p className="font-mono text-xs text-muted">
            Revealing what was always there.
          </p>
        </div>
      </div>
    </footer>
  )
}
