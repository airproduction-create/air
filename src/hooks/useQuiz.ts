import { useState } from 'react'
import type { QuizResult } from '../types'
import { calculateResult } from '../data/quiz'
import { saveQuizResponse } from '../lib/supabase'
import { generateShareToken, generateSessionId } from '../lib/utils'

type QuizStep = 'idle' | 'question-1' | 'question-2' | 'question-3' | 'revealing' | 'result'

export function useQuiz() {
  const [step, setStep] = useState<QuizStep>('idle')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<QuizResult | null>(null)
  const [shareToken, setShareToken] = useState<string>('')
  const [saving, setSaving] = useState(false)

  function start() {
    setStep('question-1')
    setAnswers({})
    setResult(null)
    setShareToken('')
  }

  function reset() {
    setStep('idle')
    setAnswers({})
    setResult(null)
    setShareToken('')
  }

  async function answer(questionId: number, value: string) {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (questionId < 3) {
      setStep(`question-${questionId + 1}` as QuizStep)
    } else {
      // All answered — calculate and save
      setStep('revealing')
      const quizResult = calculateResult(newAnswers)
      setResult(quizResult)

      const token = generateShareToken()
      setShareToken(token)

      setSaving(true)
      try {
        await saveQuizResponse({
          session_id: generateSessionId(),
          answers: newAnswers,
          result_archetype: quizResult.archetype,
          share_token: token,
        })
      } finally {
        setSaving(false)
      }

      // Brief pause before showing result
      setTimeout(() => setStep('result'), 2000)
    }
  }

  const currentQuestion = step.startsWith('question-')
    ? parseInt(step.split('-')[1])
    : null

  return {
    step,
    answers,
    result,
    shareToken,
    saving,
    currentQuestion,
    start,
    reset,
    answer,
  }
}
