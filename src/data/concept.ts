/** Content for the concept single-pager, kept as data so the markup stays lean. */

export interface Principle {
  number: string
  title: string
  body: string
  aside: string
  lead?: boolean
}

export const principles: Principle[] = [
  {
    number: '01',
    title: 'Truth before beauty',
    body: 'A beautiful lie is still a lie. A true thing, well-told, always outlasts it.',
    aside: 'The most enduring creative work is specific, not spectacular.',
    lead: true,
  },
  {
    number: '02',
    title: 'Constraint as creative force',
    body: 'The most revelatory work in history emerged under pressure, not despite it.',
    aside: 'Jaws. Just Do It. The Sistine ceiling. All born from refusal.',
  },
  {
    number: '03',
    title: 'Speed in service of clarity',
    body: 'We use velocity to reach the essential faster — not to avoid it entirely.',
    aside: 'Urgency clarifies. The brief under pressure reveals what matters.',
  },
  {
    number: '04',
    title: 'Intelligence without artifice',
    body: 'AI is a tool for revelation, not decoration. We apply it where it earns its place.',
    aside: "If the AI is visible in the work, we haven't used it correctly.",
    lead: true,
  },
]

export interface Reel {
  image: string
  alt: string
  client: string
  year: string
  title: string
  desc: string
  tag: string
  vimeo?: string
}

export const reels: Reel[] = [
  {
    image: '/images/work-azande.jpg',
    alt: 'Azande',
    client: 'Azande Coffee',
    year: '2024',
    title: 'Azande',
    desc: 'A coffee ad that treats the product as a meditation, not a commodity.',
    tag: 'Commercial',
    vimeo: '1199514877',
  },
  {
    image: '/images/work-bishop.jpg',
    alt: 'Bishop',
    client: 'Bishop Mosa Sono',
    year: '2024',
    title: 'Bishop',
    desc: 'An origin story that refuses easy hagiography.',
    tag: 'Origin Story',
    vimeo: '1199516622',
  },
  {
    image: '/images/work-padral.jpg',
    alt: 'Padral',
    client: 'Padral',
    year: '2025',
    title: 'Padral',
    desc: 'A brand introduction that earns its confidence.',
    tag: 'Brand Film',
    vimeo: '1199518698',
  },
  {
    image: '/images/work-city-remembers.jpg',
    alt: 'The City Remembers',
    client: 'AIR Originals',
    year: '2026',
    title: 'The City Remembers',
    desc: 'A future African city built between three histories — asking whether memory survives progress.',
    tag: 'Speculative Film',
    vimeo: '1225052084',
  },
  {
    image: '/images/work-twin-thrones.jpg',
    alt: 'Twin Thrones',
    client: 'AIR Originals',
    year: '2026',
    title: 'Twin Thrones',
    desc: 'Two lineages, one inheritance — an epic told across continents.',
    tag: 'Feature — In Development',
  },
]

export interface Service {
  role: string
  audience: string
  body: string
  caps: string[]
}

export const services: Service[] = [
  {
    role: '01 — Role',
    audience: 'Creative Agencies',
    body: 'You have the idea. We have the infrastructure to make it real — at the pace modern campaigns demand, without the quality erosion that pace usually brings.',
    caps: ['Cinematic advertising', 'Visual treatments', 'AI pre-production', 'Colour grading'],
  },
  {
    role: '02 — Role',
    audience: 'Corporate Communications',
    body: 'Most corporate communications describe what a company does. We help you articulate what a company means — to its people, its partners, and the culture it operates in.',
    caps: ['Training video', 'Internal campaigns', 'Executive films', 'ESG storytelling'],
  },
  {
    role: '03 — Role',
    audience: 'Production Companies',
    body: 'AIR partners with production companies to bring intelligent creative tools to every stage of the process — from the first treatment to the final frame.',
    caps: ['Treatment development', 'Short films', 'AI workflows', 'Post & delivery'],
  },
]
