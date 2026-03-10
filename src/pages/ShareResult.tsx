import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchQuizResult } from '../lib/supabase'
import { quizResults } from '../data/quiz'
import type { QuizResult } from '../types'

export function ShareResult() {
  const { token } = useParams<{ token: string }>()
  const [result, setResult] = useState<QuizResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function load() {
      if (!token) {
        setError(true)
        setLoading(false)
        return
      }

      try {
        const response = await fetchQuizResult(token)
        if (response) {
          const archetype = response.result_archetype
          setResult(quizResults[archetype] || null)
        } else {
          setError(true)
        }
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [token])

  return (
    <div className="min-h-screen bg-void flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl font-medium text-cream tracking-widest" data-cursor>
          AIR
        </Link>
        <span className="font-mono text-xs text-muted tracking-ultra hidden sm:block">
          Artificial Intelligence Revelations
        </span>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full">

          {loading && (
            <div className="text-center">
              <div className="w-12 h-12 border border-gold rounded-full animate-ping opacity-30 mx-auto mb-6" />
              <p className="font-mono text-xs text-muted tracking-widest">Loading revelation…</p>
            </div>
          )}

          {error && !loading && (
            <div className="text-center border border-border p-12">
              <p className="font-serif text-2xl text-cream mb-4">This revelation has passed.</p>
              <p className="font-sans text-sm text-muted mb-8">
                The shared result you're looking for isn't available. Take the quiz yourself to receive your own.
              </p>
              <Link to="/#quiz" data-cursor className="btn-primary">
                Reveal Yourself →
              </Link>
            </div>
          )}

          {result && !loading && (
            <div className="animate-fade-up">
              {/* Shared by tag */}
              <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-px bg-gold" />
                <span className="font-mono text-xs text-muted tracking-ultra">Someone shared their revelation</span>
              </div>

              {/* Result card */}
              <div className="border border-border">
                <div
                  className="h-1"
                  style={{ background: `linear-gradient(90deg, ${result.color}, transparent)` }}
                />
                <div className="p-8 lg:p-12">
                  <span
                    className="font-mono text-xs tracking-ultra uppercase px-3 py-1 border inline-block mb-8"
                    style={{ color: result.color, borderColor: result.color + '40' }}
                  >
                    Their Archetype
                  </span>

                  <h1
                    className="font-serif text-4xl lg:text-5xl font-medium mb-4 leading-tight"
                    style={{ color: result.color }}
                  >
                    {result.headline}
                  </h1>

                  <p className="font-mono text-xs text-muted tracking-widest uppercase mb-8 flex items-center gap-3">
                    <span className="inline-block w-4 h-px" style={{ background: result.color }} />
                    {result.trait}
                  </p>

                  <p className="font-sans text-cream-dim leading-relaxed mb-8">{result.description}</p>

                  <div className="border-l-2 border-gold pl-6 mb-10">
                    <p className="font-mono text-xs text-gold tracking-widest uppercase mb-3">The revelation</p>
                    <p className="font-sans text-cream leading-relaxed italic">{result.revelation}</p>
                  </div>

                  <div className="border-t border-border pt-8">
                    <p className="font-sans text-sm text-muted mb-6">
                      Curious what archetype you are? Take the AIR Reveal quiz.
                    </p>
                    <Link to="/#quiz" data-cursor className="btn-primary">
                      Reveal Yourself →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer note */}
      <div className="border-t border-border px-6 lg:px-12 py-6 flex items-center justify-between">
        <p className="font-mono text-xs text-muted">AIR — Artificial Intelligence Revelations</p>
        <p className="font-mono text-xs text-muted">We reveal what was always there.</p>
      </div>
    </div>
  )
}
