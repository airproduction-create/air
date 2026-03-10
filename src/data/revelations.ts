import type { Revelation } from '../types'

// Placeholder data mirroring the real Supabase schema
// Replace with live Supabase data — this seeds the widget when DB is unavailable

export const placeholderRevelations: Revelation[] = [
  {
    id: '1',
    date: new Date().toISOString().split('T')[0],
    headline: 'Just Do It Was Never About Sport',
    narrative: 'In 1988, Nike hired Wieden+Kennedy to create a campaign for a company struggling to stay relevant against Reebok. Dan Wieden wrote five words inspired by convicted murderer Gary Gilmore\'s last words before execution: "Let\'s do it." He changed it to "Just Do It." What emerged wasn\'t a sports campaign — it was a philosophy of will, of defiance against inertia. Nike\'s revenue grew from $877 million to $9.2 billion in the following decade.',
    why: 'The campaign solved a problem deeper than brand awareness: it answered the question of what stops people. Not lack of ability — lack of permission. Three words gave an entire generation permission to begin. That\'s not advertising. That\'s a cultural operating system.',
    subject: 'Nike / Wieden+Kennedy',
    year: 1988,
    category: 'campaign',
    tags: ['Nike', 'Wieden+Kennedy', 'Dan Wieden', 'Brand Identity', 'Copywriting'],
  },
  {
    id: '2',
    date: '',
    headline: 'The Director Who Invented Fear as Entertainment',
    narrative: 'When Jaws opened in June 1975, it didn\'t just become the first summer blockbuster — it rewired the entire business model of Hollywood. Steven Spielberg, aged 27, was three weeks over schedule and $3 million over budget, working with a mechanical shark that barely functioned. The shark\'s failure forced him to imply its presence rather than show it. The unseen became more terrifying than anything he could have put on screen.',
    why: 'Spielberg discovered a principle that transcends film: the imagination is more powerful than the image. By solving a practical crisis — a broken prop — he accidentally created one of cinema\'s enduring techniques. Constraint revealed truth. The industry shift to wide releases and mass marketing followed, changing how films are made and sold to this day.',
    subject: 'Steven Spielberg',
    year: 1975,
    category: 'film',
    tags: ['Spielberg', 'Hollywood', 'Blockbuster', 'Direction', 'Constraint'],
  },
  {
    id: '3',
    date: '',
    headline: 'Ogilvy\'s Whisper That Outsold Every Shout',
    narrative: 'In 1958, David Ogilvy wrote an advertisement for Rolls-Royce with the headline: "At 60 miles an hour the loudest noise in this new Rolls-Royce comes from the electric clock." He found the line in an engineering report. He didn\'t invent it — he recognised it. The ad made Rolls-Royce one of the most aspirational brands in America, not through claims of prestige but through a single, precise, utterly believable detail.',
    why: 'Ogilvy proved that truth, told specifically and with craft, beats any invented glamour. The consumer doesn\'t distrust the brand — they distrust the unearned claim. One true thing, precisely placed, creates more trust than ten polished promises. This principle remains the foundation of all effective communication.',
    subject: 'David Ogilvy',
    year: 1958,
    category: 'personality',
    tags: ['Ogilvy', 'Copywriting', 'Rolls-Royce', 'Advertising Principles'],
  },
  {
    id: '4',
    date: '',
    headline: 'The Ceiling That Became a Window',
    narrative: 'In 1508, Pope Julius II commissioned a 33-year-old sculptor — who had never painted in fresco — to decorate the ceiling of the Sistine Chapel. Michelangelo protested. He was a sculptor, not a painter. He wanted to build the Pope\'s tomb. Julius insisted. Over four years, working largely alone on scaffolding he designed himself, Michelangelo painted 343 figures across 5,000 square feet, completing The Creation of Adam — a scene so charged that the space between two fingers became the most reproduced image in human history.',
    why: 'Michelangelo solved the problem of depicting the divine by depicting the human. The moment of contact — almost but not quite touching — captured something philosophy couldn\'t. Forced beyond his comfort entirely, he transcended his own limits. Resistance and constraint, applied correctly, don\'t diminish the artist. They reveal them.',
    subject: 'Michelangelo Buonarroti',
    year: 1512,
    category: 'artwork',
    tags: ['Michelangelo', 'Renaissance', 'Sistine Chapel', 'Fresco', 'Vatican'],
  },
  {
    id: '5',
    date: '',
    headline: 'Virgil Abloh and the Grammar of the Quotation Mark',
    narrative: 'When Virgil Abloh founded Off-White in 2013, he introduced a visual language built around quotation marks — placing words like "SHOELACES" on shoelaces, "AIR" on Air Jordans. It looked like a student project. Fashion critics were confused. Streetwear kids understood immediately: it was irony as identity, referencing the reference, making the origin visible. By 2018, when he became the first Black artistic director of Louis Vuitton menswear, the fashion establishment caught up.',
    why: 'Abloh understood that the generation he was designing for had grown up in remix culture — they didn\'t want to own luxury; they wanted to own the conversation about luxury. He didn\'t disrupt fashion by ignoring its codes. He disrupted it by making its codes explicit. The quotation marks weren\'t a gimmick — they were a thesis about how meaning is constructed.',
    subject: 'Virgil Abloh',
    year: 2013,
    category: 'movement',
    tags: ['Virgil Abloh', 'Off-White', 'Louis Vuitton', 'Streetwear', 'Fashion'],
  },
  {
    id: '6',
    date: '',
    headline: 'The 60-Second Film That Ran Once and Changed Everything',
    narrative: 'Apple\'s "1984" advertisement aired exactly once in national broadcast, during the third quarter of Super Bowl XVIII. Directed by Ridley Scott, it depicted a dystopian world shattered by a lone athlete hurling a hammer at Big Brother — never showing the product, never explaining it. It cost $900,000 to produce and $500,000 to air. Apple\'s board initially wanted to pull it. Steve Jobs fought to keep it. Macintosh sold $3.5 million worth of units in the following 100 days.',
    why: 'The ad didn\'t sell a computer. It sold a position — Apple as the force of liberation against conformity. It established the principle that brand mythology is more valuable than product features. It also proved that a single, supremely crafted moment of storytelling could generate returns that months of conventional advertising couldn\'t. The era of brand as narrative began here.',
    subject: 'Apple / Ridley Scott / Chiat\\Day',
    year: 1984,
    category: 'campaign',
    tags: ['Apple', 'Ridley Scott', 'Super Bowl', 'Chiat/Day', 'Brand Mythology'],
  },
  {
    id: '7',
    date: '',
    headline: 'Coco Chanel and the Colour of Liberation',
    narrative: 'In 1926, Coco Chanel published a sketch in American Vogue of a simple, short, black crepe de chine dress. Vogue called it "the Chanel Ford" — predicting it would become a universal uniform the way Ford\'s Model T had become a universal automobile. Before this moment, black was the colour of mourning and servitude. Chanel made it the colour of elegance.',
    why: 'Chanel understood that liberation often works through subversion of the existing code rather than rejection of it. She didn\'t abandon fashion — she took its most loaded symbol and inverted its meaning entirely. The little black dress remains one of the most radical design acts in the history of clothing, precisely because it looks so simple. Simplicity is often the most radical position available.',
    subject: 'Coco Chanel',
    year: 1926,
    category: 'movement',
    tags: ['Chanel', 'Fashion', 'LBD', 'Design', 'Cultural Shift'],
  },
  {
    id: '8',
    date: '',
    headline: 'What Warhol Understood That the Art World Didn\'t',
    narrative: 'When Andy Warhol exhibited his Campbell\'s Soup Cans at the Ferus Gallery in Los Angeles in 1962, critics and gallerists dismissed them as trivial, even offensive. A neighbouring gallery put actual soup cans in its window with a sign reading "the real thing, only 29 cents." Warhol was unperturbed. He understood something the art world had not yet processed: that mass production and repetition were the grammar of the new culture, and that painting them with the same obsessive care given to religious icons was itself an act of revelation.',
    why: 'Pop Art didn\'t elevate the mundane — it made the mundane visible. Warhol understood that familiarity creates blindness, and that art\'s function is to remove that blindness. The soup can wasn\'t ironic. It was sincere. By treating commercial imagery with absolute seriousness, he revealed the invisible aesthetic decisions embedded in everyday life — and permanently altered the relationship between commerce and culture.',
    subject: 'Andy Warhol',
    year: 1962,
    category: 'artwork',
    tags: ['Warhol', 'Pop Art', 'Campbell\'s', 'Commercial Art', 'Culture'],
  },
  {
    id: '9',
    date: '',
    headline: 'The Album That Proved the Studio Was an Instrument',
    narrative: 'When the Beatles entered Abbey Road Studios in November 1966 to record Sgt. Pepper\'s Lonely Hearts Club Band, they had just retired from touring. The studio — previously just a recording facility — became their creative instrument. Producer George Martin and engineer Geoff Emerick pioneered techniques that had never been used: slowed tapes, backwards recordings, orchestras given minimal instruction and maximum freedom. The album took 700 studio hours. It was released June 1967 and spent 27 weeks at number one.',
    why: 'Sgt. Pepper\'s proved that constraint — in this case, the impossibility of replicating the album live — could be a creative liberation rather than a limitation. The Beatles\' decision to stop performing created the conditions for them to make the most influential album in pop history. Constraint forced invention. The album established the studio record as art form in its own right and expanded what music could be.',
    subject: 'The Beatles / George Martin',
    year: 1967,
    category: 'innovation',
    tags: ['Beatles', 'George Martin', 'Abbey Road', 'Studio', 'Production'],
  },
  {
    id: '10',
    date: '',
    headline: 'The Speech That Changed What Words Could Do',
    narrative: 'On 28 August 1963, Martin Luther King Jr. delivered a prepared speech at the March on Washington. Midway through, gospel singer Mahalia Jackson called from behind him: "Tell them about the dream, Martin." He set his notes aside. What followed — improvised from fragments he had delivered in smaller settings — became one of the most consequential pieces of oratory in human history. The dream passage wasn\'t written that morning. It was synthesised in real time from years of accumulated language and belief.',
    why: 'The speech demonstrated that prepared craft and spontaneous truth are not opposites — they are partners. King\'s years of preaching and writing created a reserve of language so deep that improvisation became precision. The lesson for every creative practitioner: preparation doesn\'t constrain inspiration. It makes it possible. The breakthrough came not from abandoning structure but from having so thoroughly internalised it that he could leave it behind.',
    subject: 'Martin Luther King Jr.',
    year: 1963,
    category: 'movement',
    tags: ['MLK', 'Civil Rights', 'Oratory', 'Washington', 'Language'],
  },
]

export function getTodaysRevelation(fallbackIndex?: number): Revelation {
  // Deterministic daily selection based on day of year
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  const index = fallbackIndex !== undefined
    ? fallbackIndex
    : dayOfYear % placeholderRevelations.length

  const revelation = { ...placeholderRevelations[index] }
  revelation.date = now.toISOString().split('T')[0]
  return revelation
}
