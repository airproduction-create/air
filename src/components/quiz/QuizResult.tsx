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

  const shareUrl = `${window.location.origin}/reveal/${shareToken}`

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
              <div className="border-l border-border pl-8">
                <p className="font-mono text-xs text-gold tracking-widest uppercase mb-4">The revelation</p>
                <p className="font-sans text-cream leading-relaxed text-sm italic">{result.revelation}</p>
              </div>
            </div>

            {/* AIR connection */}
            <div className="border-t border-border pt-8 mb-8">
              <p className="font-sans text-sm text-muted leading-relaxed">
                At AIR, we work with every creative archetype — because revelation doesn't belong to one
                type of mind. It requires them all. If this resonates,{' '}
                <a href="#contact" className="text-gold hover:underline">let's talk</a>.
              </p>
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
