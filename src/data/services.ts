import type { Service } from '../types'

export const services: Service[] = [
  {
    id: 'agencies',
    audience: 'Creative Agencies',
    title: 'Production Without Compromise',
    description: 'You have the idea. We have the infrastructure to make it real — at the pace modern campaigns demand, without the quality erosion that pace usually brings.',
    capabilities: [
      'Cinematic advertising and commercials',
      'Visual treatments and creative direction',
      'Trailer and teaser production',
      'AI-accelerated pre-production',
      'Post-production and colour grading',
      'Music, sound design and mix',
      'Rapid creative iteration',
    ],
    icon: 'film',
  },
  {
    id: 'corporate',
    audience: 'Corporate Communications',
    title: 'The Story You Haven\'t Told Yet',
    description: 'Most corporate communications describe what a company does. We help you articulate what a company means — to its people, its partners, and the culture it operates in.',
    capabilities: [
      'Training and instructional video',
      'Internal communications campaigns',
      'External brand and culture content',
      'Executive positioning films',
      'Brand identity and values content',
      'Annual report and ESG storytelling',
      'Event and keynote production',
    ],
    icon: 'building',
  },
  {
    id: 'production',
    audience: 'Production Companies',
    title: 'From Treatment to Screen',
    description: 'AIR partners with production companies to bring intelligent creative tools to every stage of the process — from the first treatment to the final frame.',
    capabilities: [
      'Visual treatment development',
      'Trailer and promo production',
      'Visual character development',
      'Short film production',
      'Commercial and branded content',
      'AI-integrated production workflows',
      'Post-production and delivery',
    ],
    icon: 'cpu',
  },
]
