import { useState } from 'react'
import type { QuizResult as QuizResultType } from '../../types'
import { RevealText } from '../ui/RevealText'

interface QuizResultProps {
  result: QuizResultType
  shareToken: string
  onReset: () => void
}

export function QuizResult({ result, shareToken, onReset }: QuizResultProps) {
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')
  const [leadState, setLeadState] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')

  const shareUrl = `${window.location.origin}/reveal/${shareToken}`

  async function handleLead(e: React.FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setLeadState('error')
      return
    }
    setLeadState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Reveal Yourself lead',
          email: email.trim(),
          audience: 'Quiz',
          context: `Quiz archetype: ${result.archetype} — "${result.headline}". Requested their full revelation.`,
        }),
      })
      setLeadState(res.ok ? 'sent' : 'error')
    } catch {
      setLeadState('error')
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback
      const input = document.createElement('input')
      input.value = shareUrl
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div className="animate-fade-up">
      {/* Result card */}
      <RevealText>
        <div className="border border-border hover:border-border-light transition-all duration-500">
          {/* Top bar */}
          <div
            className="h-1"
            style={{ background: `linear-gradient(90deg, ${result.color}, transparent)` }}
          />

          <div className="p-8 lg:p-12">
            {/* Archetype label */}
            <div className="flex items-center gap-3 mb-8">
              <span
                className="font-mono text-xs tracking-ultra uppercase px-3 py-1 border"
                style={{ color: result.color, borderColor: result.color + '40' }}
              >
                Your Archetype
              </span>
            </div>

            {/* Headline */}
            <h3
              className="font-serif text-4xl lg:text-5xl font-medium mb-6 leading-tight"
              style={{ color: result.color }}
            >
              {result.headline}
            </h3>

            {/* Trait */}
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-8 flex items-center gap-3">
              <span
                className="inline-block w-4 h-px"
                style={{ background: result.color }}
              />
              {result.trait}
            </p>

            {/* Description */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              <div>
                <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">Your creative nature</p>
                <p className="font-sans text-cream-dim leading-relaxed text-sm">{result.description}</p>
              </div>
              <div className="border-t border-border pt-8 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-8">
                <p className="font-mono text-xs text-gold tracking-widest uppercase mb-4">The revelation</p>
                <p className="font-sans text-cream leading-relaxed text-sm italic">{result.revelation}</p>
              </div>
            </div>

            {/* AIR connection + lead capture */}
            <div className="border-t border-border pt-8 mb-8">
              <p className="font-sans text-sm text-muted leading-relaxed mb-6">
                At AIR, we work with every creative archetype — because revelation doesn't belong to one
                type of mind. It requires them all.
              </p>

              {leadState === 'sent' ? (
                <p className="font-mono text-xs text-gold tracking-wider">
                  ✓ On its way. We'll send your full revelation shortly.
                </p>
              ) : (
                <form onSubmit={handleLead} className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (leadState === 'error') setLeadState('idle') }}
                    placeholder="you@email.com"
                    aria-label="Email for your full revelation"
                    className="flex-1 bg-transparent border border-border px-4 py-3 font-sans text-sm text-cream focus:outline-none focus:border-gold transition-colors duration-200"
                  />
                  <button
                    type="submit"
                    data-cursor
                    disabled={leadState === 'loading'}
                    className="btn-primary btn-glow justify-center shrink-0 disabled:opacity-50"
                  >
                    {leadState === 'loading' ? 'Sending…' : 'Email me my revelation'}
                  </button>
                </form>
              )}
              {leadState === 'error' && (
                <p className="font-mono text-xs text-rust mt-3">Enter a valid email and try again.</p>
              )}
            </div>

            {/* Share + Reset */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleCopy}
                data-cursor
                className={`btn-primary ${copied ? '!border-gold-bright !text-gold-bright' : ''}`}
              >
                {copied ? '✓ Copied' : 'Share Your Result →'}
              </button>

              <div className="font-mono text-xs text-muted">
                {shareUrl.replace('https://', '')}
              </div>

              <button
                onClick={onReset}
                data-cursor
                className="ml-auto font-mono text-xs text-muted hover:text-cream-dim transition-colors duration-200 tracking-wider"
              >
                Retake →
              </button>
            </div>
          </div>
        </div>
      </RevealText>
    </div>
  )
}
