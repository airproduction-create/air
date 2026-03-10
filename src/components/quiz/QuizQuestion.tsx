import { useState } from 'react'
import type { QuizQuestion as QuizQuestionType } from '../../types'

interface QuizQuestionProps {
  question: QuizQuestionType
  questionNumber: number
  totalQuestions: number
  onAnswer: (value: string) => void
}

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null)

  function handleSelect(value: string) {
    if (selected) return
    setSelected(value)
    setTimeout(() => onAnswer(value), 600)
  }

  return (
    <div className="animate-fade-up">
      {/* Question number */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-gold">{String(questionNumber).padStart(2, '0')}</span>
          <span className="font-mono text-xs text-border">—</span>
          <span className="font-mono text-xs text-muted">{String(totalQuestions).padStart(2, '0')}</span>
        </div>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Question text */}
      <div className="mb-10">
        <h3 className="font-serif text-2xl lg:text-3xl text-cream leading-snug mb-3">
          {question.text}
        </h3>
        {question.subtext && (
          <p className="font-mono text-xs text-muted tracking-wider italic">{question.subtext}</p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, i) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.value)}
            data-cursor
            disabled={!!selected}
            className={`w-full text-left p-6 border transition-all duration-300 group ${
              selected === option.value
                ? 'border-gold bg-gold/5 text-cream'
                : selected && selected !== option.value
                ? 'border-border text-muted opacity-40'
                : 'border-border hover:border-border-light text-cream-dim hover:text-cream hover:bg-surface/50'
            }`}
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <div className="flex items-start gap-4">
              <span
                className={`font-mono text-xs shrink-0 mt-0.5 transition-colors duration-200 ${
                  selected === option.value ? 'text-gold' : 'text-muted group-hover:text-cream-dim'
                }`}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="font-sans text-sm leading-relaxed">{option.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
