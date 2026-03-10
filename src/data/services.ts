import type { Service } from '../types'

export const services: Service[] = [
  {
    id: 'agencies',
    audience: 'Creative Agencies',
    title: 'Production Without Compromise',
    description: 'You have the idea. We have the infrastructure to make it real — at the pace modern campaigns demand, without the quality erosion that pace usually brings.',
    capabilities: [
      'Cinematic advertising production',
      'Director access across genres',
      'AI-accelerated pre-production',
      'Post-production and colour',
      'Music and sound design',
      'Rapid iteration on creative',
    ],
    icon: 'film',
  },
  {
    id: 'corporate',
    audience: 'Corporate Communications',
    title: 'The Story You Haven\'t Told Yet',
    description: 'Most corporate communications describe what a company does. We help you articulate what a company means — to its people, its partners, and the culture it operates in.',
    capabilities: [
      'Executive positioning films',
      'Brand identity and values content',
      'Annual report and ESG storytelling',
      'Internal communications campaigns',
      'Leadership narrative development',
      'Event and keynote production',
    ],
    icon: 'building',
  },
  {
    id: 'production',
    audience: 'Production Companies',
    title: 'Intelligence as Infrastructure',
    description: 'AIR\'s AI-integrated workflows compress production timelines and expand creative possibility. We partner with production companies to bring intelligent tools to complex projects.',
    capabilities: [
      'AI-assisted casting and location research',
      'Generative concept development',
      'Script and narrative analysis',
      'Visual treatment generation',
      'Production workflow optimisation',
      'Post-production AI integration',
    ],
    icon: 'cpu',
  },
]
