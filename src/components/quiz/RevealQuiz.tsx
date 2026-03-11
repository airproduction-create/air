import { useEffect, useRef } from 'react'
import { useQuiz } from '../../hooks/useQuiz'
import { quizQuestions } from '../../data/quiz'
import { QuizQuestion } from './QuizQuestion'
import { QuizResult } from './QuizResult'
import { RevealText } from '../ui/RevealText'

export function RevealQuiz() {
  const quiz = useQuiz()
  const quizBodyRef = useRef<HTMLDivElement>(null)

  // Scroll quiz body into view on each step change (important on mobile)
  useEffect(() => {
    if (quiz.step === 'idle') return
    const el = quizBodyRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }, [quiz.step])

  return (
    <section id="quiz" className="py-32 lg:py-40 border-t border-border bg-void">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <RevealText className="mb-16 text-center">
          <span className="section-label block mb-4">— Reveal Yourself</span>
          <h2 className="font-serif text-4xl lg:text-5xl font-medium text-cream leading-tight mb-6">
            Three questions.<br />
            <span className="italic text-gradient">One revelation.</span>
          </h2>
          <p className="font-sans text-cream-dim max-w-lg mx-auto leading-relaxed">
            There are no correct answers. There is only your answer — and what it reveals
            about how you think, create, and solve.
          </p>
        </RevealText>

        {/* Quiz states */}
        <div ref={quizBodyRef}>
        {quiz.step === 'idle' && (
          <RevealText className="text-center">
            <button
              onClick={quiz.start}
              data-cursor
              className="btn-primary text-base px-12 py-4"
            >
              Begin the Reveal
            </button>
          </RevealText>
        )}

        {quiz.step.startsWith('question-') && quiz.currentQuestion !== null && (
          <QuizQuestion
            key={quiz.currentQuestion}
            question={quizQuestions[quiz.currentQuestion - 1]}
            questionNumber={quiz.currentQuestion}
            totalQuestions={quizQuestions.length}
            onAnswer={(value) => quiz.answer(quiz.currentQuestion!, value)}
          />
        )}

        {quiz.step === 'revealing' && (
          <div className="text-center py-20">
            <div className="relative w-16 h-16 mx-auto mb-8">
              <div className="absolute inset-0 border border-gold rounded-full animate-ping opacity-20" />
              <div className="absolute inset-2 border border-gold-dim rounded-full animate-pulse-slow" />
              <div className="absolute inset-4 border border-gold rounded-full" />
            </div>
            <p className="font-serif text-xl text-cream mb-2">Calculating your revelation…</p>
            <p className="font-mono text-xs text-muted tracking-widest">
              Analysing your patterns of thought
            </p>
          </div>
        )}

        {quiz.step === 'result' && quiz.result && (
          <QuizResult
            result={quiz.result}
            shareToken={quiz.shareToken}
            onReset={quiz.reset}
          />
        )}
        </div>

        {/* Progress dots */}
        {quiz.step.startsWith('question-') && (
          <div className="flex items-center justify-center gap-3 mt-12">
            {quizQuestions.map((_, i) => {
              const questionNum = i + 1
              const currentNum = quiz.currentQuestion || 0
              return (
                <div
                  key={i}
                  className={`h-px transition-all duration-300 ${
                    questionNum < currentNum
                      ? 'w-12 bg-gold'
                      : questionNum === currentNum
                      ? 'w-12 bg-gold-dim'
                      : 'w-6 bg-border'
                  }`}
                />
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
