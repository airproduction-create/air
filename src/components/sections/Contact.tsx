import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealText } from '../ui/RevealText'
import { useIsDesktop } from '../../hooks/useIsDesktop'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', context: '', audience: '' })
  const isDesktop = useIsDesktop()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-32 lg:py-40 bg-obsidian border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left */}
          <div>
            <RevealText>
              <span className="section-label block mb-8">— Begin</span>
            </RevealText>
            <RevealText delay={100}>
              <h2 className="font-serif text-4xl lg:text-5xl font-medium text-cream leading-tight mb-8">
                Tell us what you're<br />
                <span className="text-muted">trying to reveal.</span>
              </h2>
            </RevealText>
            <RevealText delay={200}>
              <p className="font-sans text-cream-dim leading-relaxed mb-12">
                Every engagement begins with a conversation about the real problem — not the brief.
                Tell us about your audience, your constraints, and what you suspect might be
                hiding beneath the obvious answer.
              </p>
            </RevealText>

            <RevealText delay={300}>
              <div className="space-y-6">
                {[
                  { label: 'Response', value: 'Within 24 hours' },
                  { label: 'First meeting', value: 'Strategic conversation, not a pitch' },
                  { label: 'Based', value: 'Remote' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="font-mono text-xs text-gold w-24 shrink-0 mt-0.5">{item.label}</span>
                    <span className="font-sans text-sm text-cream-dim">{item.value}</span>
                  </div>
                ))}
              </div>
            </RevealText>
          </div>

          {/* Right: Form — glass treatment */}
          <div>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={isDesktop ? { rotateY: 90, opacity: 0 } : { opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={isDesktop ? { transformPerspective: 1000 } : undefined}
                >
                  <RevealText>
                    <div className="glass-strong border-gradient border border-gold p-12 text-center rounded-lg">
                      <div className="w-12 h-12 border border-gold flex items-center justify-center mx-auto mb-6">
                        <span className="text-gold text-xl">→</span>
                      </div>
                      <h3 className="font-serif text-2xl text-cream mb-4">We've received your message.</h3>
                      <p className="font-sans text-sm text-muted leading-relaxed">
                        Someone from AIR will be in touch within 24 hours.
                        In the meantime, explore today's revelation.
                      </p>
                    </div>
                  </RevealText>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  exit={isDesktop ? { rotateY: -90, opacity: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={isDesktop ? { transformPerspective: 1000 } : undefined}
                >
                  <RevealText>
                    <form onSubmit={handleSubmit} className="glass border-gradient rounded-lg p-8 lg:p-10 space-y-6">
                      {/* Audience select */}
                      <div>
                        <label className="font-mono text-xs text-muted tracking-widest uppercase block mb-3">
                          You are—
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {['Creative Agency', 'Corporate', 'Production Co'].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setForm({ ...form, audience: opt })}
                              data-cursor
                              className={`px-4 py-3 border text-xs font-mono tracking-wider uppercase transition-all duration-200 ${
                                form.audience === opt
                                  ? 'border-gold text-gold bg-gold/5'
                                  : 'border-border text-muted hover:border-border-light'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="font-mono text-xs text-muted tracking-widest uppercase block mb-3">Name</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-transparent border border-border px-4 py-3 font-sans text-sm text-cream focus:outline-none focus:border-gold focus:shadow-[0_0_12px_rgba(255,87,0,0.15)] transition-all duration-200"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="font-mono text-xs text-muted tracking-widest uppercase block mb-3">Email</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-transparent border border-border px-4 py-3 font-sans text-sm text-cream focus:outline-none focus:border-gold focus:shadow-[0_0_12px_rgba(255,87,0,0.15)] transition-all duration-200"
                          placeholder="you@company.com"
                        />
                      </div>

                      <div>
                        <label className="font-mono text-xs text-muted tracking-widest uppercase block mb-3">
                          What are you trying to reveal?
                        </label>
                        <textarea
                          required
                          value={form.context}
                          onChange={(e) => setForm({ ...form, context: e.target.value })}
                          rows={4}
                          className="w-full bg-transparent border border-border px-4 py-3 font-sans text-sm text-cream focus:outline-none focus:border-gold focus:shadow-[0_0_12px_rgba(255,87,0,0.15)] transition-all duration-200 resize-none"
                          placeholder="Tell us about the problem beneath the brief…"
                        />
                      </div>

                      {error && (
                        <p className="font-mono text-xs text-rust text-center">{error}</p>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        data-cursor
                        className="btn-primary btn-glow w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Sending…' : 'Send →'}
                      </button>
                    </form>
                  </RevealText>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
