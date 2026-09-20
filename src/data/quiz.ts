import type { QuizQuestion, QuizResult } from '../types'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: 'When a problem refuses to yield, your first instinct is to—',
    subtext: 'There is no wrong answer. There is only your answer.',
    options: [
      {
        id: '1a',
        label: 'Dismantle it completely. Understand each part before reconsidering the whole.',
        value: 'analyst',
        archetype: 'architect',
      },
      {
        id: '1b',
        label: 'Step away. The solution almost always arrives when you stop demanding it.',
        value: 'intuitive',
        archetype: 'revealer',
      },
      {
        id: '1c',
        label: 'Find its pattern. Every unsolvable problem resembles one that has already been solved elsewhere.',
        value: 'connector',
        archetype: 'connector',
      },
      {
        id: '1d',
        label: 'Question whether it\'s the right problem at all. The real question is usually hiding beneath the obvious one.',
        value: 'interrogator',
        archetype: 'provocateur',
      },
    ],
  },
  {
    id: 2,
    text: 'The most interesting creative work makes you feel—',
    subtext: 'The feeling is the signal.',
    options: [
      {
        id: '2a',
        label: 'Seen. Like something you knew but couldn\'t articulate has finally been given form.',
        value: 'recognition',
        archetype: 'revealer',
      },
      {
        id: '2b',
        label: 'Certain of something you couldn\'t name before it existed.',
        value: 'certainty',
        archetype: 'architect',
      },
      {
        id: '2c',
        label: 'Connected. Suddenly aware of a thread running through things you thought were unrelated.',
        value: 'connection',
        archetype: 'connector',
      },
      {
        id: '2d',
        label: 'Uncomfortable. Like something has been made visible that most people agree to leave unsaid.',
        value: 'discomfort',
        archetype: 'provocateur',
      },
    ],
  },
  {
    id: 3,
    text: 'Speed and quality—',
    subtext: 'What you believe here tells us almost everything.',
    options: [
      {
        id: '3a',
        label: 'Are always at war. Rushing is how craft dies.',
        value: 'perfectionist',
        archetype: 'architect',
      },
      {
        id: '3b',
        label: 'Become one under the right kind of pressure. Urgency is clarifying.',
        value: 'pragmatist',
        archetype: 'provocateur',
      },
      {
        id: '3c',
        label: 'Both depend on having the right constraint. The frame makes the painting possible.',
        value: 'structuralist',
        archetype: 'connector',
      },
      {
        id: '3d',
        label: 'Are symptoms of something deeper — how clearly you understand what you\'re actually trying to say.',
        value: 'essentialist',
        archetype: 'revealer',
      },
    ],
  },
]

export const quizResults: Record<string, QuizResult> = {
  architect: {
    archetype: 'architect',
    headline: 'The Architect',
    description: 'You approach creativity as a structural problem. You believe that before anything beautiful can be built, its foundations must be absolutely sound. You are drawn to the logic beneath the aesthetic — the why beneath the what.',
    revelation: 'Your greatest work happens when you trust that the structure you\'ve built is strong enough to hold the unexpected. The scaffold isn\'t the building — it\'s what makes the building possible.',
    trait: 'Precision in service of transcendence',
    color: '#C1703F',
  },
  revealer: {
    archetype: 'revealer',
    headline: 'The Revealer',
    description: 'You perceive what others overlook. Not through analysis but through recognition — as if the hidden truth of a thing arrives whole, fully formed, needing only to be named. Your instincts are often faster than your reasoning.',
    revelation: 'The risk of your gift is that you sometimes move on before others have caught up. The work of the Revealer isn\'t just to see — it\'s to make others see too. That requires patience with the visible world.',
    trait: 'Truth-sensing at depth',
    color: '#C1703F',
  },
  connector: {
    archetype: 'connector',
    headline: 'The Connector',
    description: 'You think in patterns and parallels. When a problem in branding reminds you of a solution in biology, or a campaign challenge mirrors a move from jazz improvisation, you follow that thread with conviction. Cross-domain thinking is your native language.',
    revelation: 'The most profound connections aren\'t found — they\'re built. Your gift is recognising them, but your power comes from building the bridge deliberately enough that others can cross it behind you.',
    trait: 'Cross-domain intelligence',
    color: '#C1703F',
  },
  provocateur: {
    archetype: 'provocateur',
    headline: 'The Provocateur',
    description: 'You have a low tolerance for false premises. When a brief arrives, your first move is to interrogate whether the question itself is right. You make people uncomfortable — productively — because you refuse to accept the frame others hand you.',
    revelation: 'Disruption without direction is just noise. The Provocateur\'s deepest work happens when the challenge leads somewhere specific — when the discomfort has a destination. What are you moving people toward?',
    trait: 'Subversive clarity',
    color: '#C1703F',
  },
}

export function calculateResult(answers: Record<string, string>): QuizResult {
  const archetypeCounts: Record<string, number> = {
    architect: 0,
    revealer: 0,
    connector: 0,
    provocateur: 0,
  }

  const q1 = quizQuestions[0]
  const q2 = quizQuestions[1]
  const q3 = quizQuestions[2]

  const allOptions = [...q1.options, ...q2.options, ...q3.options]

  Object.values(answers).forEach((value) => {
    const option = allOptions.find((o) => o.value === value)
    if (option && archetypeCounts[option.archetype] !== undefined) {
      archetypeCounts[option.archetype]++
    }
  })

  const dominant = Object.entries(archetypeCounts).reduce((a, b) =>
    a[1] >= b[1] ? a : b
  )[0]

  return quizResults[dominant] || quizResults.revealer
}
