import { Layout } from '../components/layout/Layout'
import { Hero } from '../components/sections/Hero'
import { DailyRevelation } from '../components/revelation/DailyRevelation'
import { Portfolio } from '../components/sections/Portfolio'
import { Services } from '../components/sections/Services'
import { About } from '../components/sections/About'
import { RevealQuiz } from '../components/quiz/RevealQuiz'
import { Contact } from '../components/sections/Contact'

export function Home() {
  return (
    <Layout>
      <Hero />
      <DailyRevelation />
      <Portfolio />
      <Services />
      <About />
      <RevealQuiz />
      <Contact />
    </Layout>
  )
}
