import { Layout } from '../components/layout/Layout'
import { Hero } from '../components/sections/Hero'
import { Statement } from '../components/sections/Statement'
import { Services } from '../components/sections/Services'
import { About } from '../components/sections/About'
import { Portfolio } from '../components/sections/Portfolio'
import { FAQ } from '../components/sections/FAQ'
import { DailyRevelation } from '../components/revelation/DailyRevelation'
import { RevealQuiz } from '../components/quiz/RevealQuiz'
import { Contact } from '../components/sections/Contact'

/**
 * One-page scroll in Arqos section order, adapted to AIR content:
 * Hero → "//" statement → Services → The AIR Way (About) → Work (Portfolio)
 * → FAQ → Journal (Daily Revelation) → Reveal (Quiz) → Begin (Contact).
 */
export function Home() {
  return (
    <Layout>
      <Hero />
      <Statement />
      <Services />
      <About />
      <Portfolio />
      <FAQ />
      <DailyRevelation />
      <RevealQuiz />
      <Contact />
    </Layout>
  )
}
