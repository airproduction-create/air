import { motion } from 'framer-motion'

const navItems = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Journal', href: '#revelation' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Begin', href: '#contact' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-void">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-24 pb-12">
        {/* Top: CTA + email */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-20 border-b border-border"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="font-mono text-xs text-gold tracking-ultra uppercase block mb-6">
              / Let's Talk
            </span>
            <a
              href="mailto:we@airstu.co.za"
              data-cursor
              className="group inline-flex items-center gap-4 font-display font-medium text-cream hover:text-gold transition-colors leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
            >
              we@airstu.co.za
              <span className="text-gold transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-1">↗</span>
            </a>
          </div>
          <p className="font-sans text-sm text-muted max-w-xs leading-relaxed lg:text-right">
            We don't make content.<br />We reveal what was always there.
          </p>
        </motion.div>

        {/* Middle: columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-2xl font-bold text-cream tracking-tight mb-3">
              AIR<span className="align-super text-[0.5em] text-gold">®</span>
            </p>
            <p className="font-mono text-[10px] text-muted tracking-ultra uppercase">
              Artificial Intelligence<br />Revelations
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-[10px] text-muted tracking-ultra uppercase mb-6">Navigation</p>
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  data-cursor
                  className="font-sans text-sm text-cream-dim hover:text-gold transition-colors duration-200 w-fit"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="font-mono text-[10px] text-muted tracking-ultra uppercase mb-6">Social</p>
            <nav className="flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/company/airproduction"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="font-sans text-sm text-cream-dim hover:text-gold transition-colors duration-200 w-fit"
              >
                LinkedIn
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[10px] text-muted tracking-ultra uppercase mb-6">Contact</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:we@airstu.co.za"
                data-cursor
                className="font-sans text-sm text-cream-dim hover:text-gold transition-colors duration-200 w-fit"
              >
                we@airstu.co.za
              </a>
              <p className="font-sans text-sm text-muted">Remote · Worldwide</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="font-mono text-[11px] text-muted tracking-wide">
            © {year} AIR — Artificial Intelligence Revelations
          </p>
          <p className="font-mono text-[11px] text-muted tracking-wide">
            Revealing what was always there.
          </p>
        </div>
      </div>
    </footer>
  )
}
