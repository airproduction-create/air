import '../styles/concept.css'
import { useConceptMotion } from '../hooks/useConceptMotion'
import { ConceptNav } from '../components/concept/ConceptNav'
import { ConceptHero } from '../components/concept/ConceptHero'
import { ConceptStatement } from '../components/concept/ConceptStatement'
import { ConceptPrinciples } from '../components/concept/ConceptPrinciples'
import { ConceptInterlude } from '../components/concept/ConceptInterlude'
import { ConceptWork } from '../components/concept/ConceptWork'
import { ConceptServices } from '../components/concept/ConceptServices'
import { ConceptClose } from '../components/concept/ConceptClose'
import { ConceptFooter } from '../components/concept/ConceptFooter'

/**
 * airstu.co.za — the AIR "Revelations" single-pager.
 * Hero → pinned statement → philosophy & principles → interlude → selected work
 * → who we work with → begin. All motion is driven by useConceptMotion.
 */
export function Home() {
  useConceptMotion()

  return (
    <div className="concept">
      <div className="cur" id="cur" aria-hidden="true" />
      <ConceptNav />

      <main id="top">
        <ConceptHero />
        <ConceptStatement />
        <ConceptPrinciples />
        <ConceptInterlude />
        <ConceptWork />
        <ConceptServices />
        <ConceptClose />
      </main>

      <ConceptFooter />

      <div className="lightbox" id="lightbox" aria-hidden="true">
        <button className="lightbox-close" id="lightboxClose" type="button" aria-label="Close video">
          &times;
        </button>
        <div className="lightbox-frame">
          <div className="lightbox-embed" id="lightboxEmbed" />
        </div>
      </div>
    </div>
  )
}
