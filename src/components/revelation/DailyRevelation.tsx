import { useDailyRevelation } from '../../hooks/useDailyRevelation'
import { RevealText } from '../ui/RevealText'
import { Tag } from '../ui/Tag'
import { categoryColor, formatDate } from '../../lib/utils'

export function DailyRevelation() {
  const { revelation, loading } = useDailyRevelation()

  return (
    <section id="revelation" className="py-32 lg:py-40 border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section header */}
        <RevealText className="mb-16">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="section-label block mb-3">— Daily Revelation</span>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium text-cream">
                Something worth knowing today.
              </h2>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-muted">
                {new Date().toLocaleDateString('en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <p className="font-mono text-xs text-muted mt-1">Updates at midnight</p>
            </div>
          </div>
        </RevealText>

        {/* Widget card */}
        {loading ? (
          <div className="border border-border p-12 lg:p-16 animate-pulse">
            <div className="h-4 w-24 bg-surface-2 rounded mb-6" />
            <div className="h-8 w-3/4 bg-surface-2 rounded mb-4" />
            <div className="h-4 w-full bg-surface-2 rounded mb-3" />
            <div className="h-4 w-5/6 bg-surface-2 rounded" />
          </div>
        ) : revelation ? (
          <RevealText>
            <article className="border border-border hover:border-border-light transition-all duration-500 group">
              <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[400px]">

                {/* Left: Metadata sidebar */}
                <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-border p-8 lg:p-10 flex flex-col gap-6 bg-obsidian">
                  {/* Category */}
                  <div>
                    <span
                      className="font-mono text-xs tracking-ultra uppercase px-3 py-1 border inline-block"
                      style={{
                        color: categoryColor(revelation.category),
                        borderColor: categoryColor(revelation.category) + '40',
                      }}
                    >
                      {revelation.category}
                    </span>
                  </div>

                  {/* Subject and year */}
                  <div>
                    <p className="font-serif text-xl text-cream mb-1">{revelation.subject}</p>
                    <p className="font-mono text-xs text-muted">{revelation.year}</p>
                  </div>

                  {/* Divider */}
                  <div className="w-8 h-px bg-border" />

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {revelation.tags?.slice(0, 3).map((tag: string) => (
                      <Tag key={tag} label={tag} />
                    ))}
                  </div>

                  {/* Date */}
                  <div className="mt-auto pt-6 border-t border-border">
                    <p className="font-mono text-xs text-muted">
                      {revelation.date ? formatDate(revelation.date) : ''}
                    </p>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col gap-8">
                  {/* Headline */}
                  <h3 className="font-serif text-2xl lg:text-3xl text-cream leading-snug group-hover:text-gold transition-colors duration-500">
                    {revelation.headline}
                  </h3>

                  {/* Narrative */}
                  <div>
                    <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">What happened</p>
                    <p className="font-sans text-cream-dim leading-relaxed text-sm lg:text-base">
                      {revelation.narrative}
                    </p>
                  </div>

                  {/* Why — the key insight */}
                  <div className="border-l-2 border-gold pl-8">
                    <p className="font-mono text-xs text-gold tracking-widest uppercase mb-3">Why it matters</p>
                    <p className="font-sans text-cream leading-relaxed text-sm lg:text-base italic">
                      {revelation.why}
                    </p>
                  </div>

                  {/* AIR connection */}
                  <div className="mt-auto pt-6 border-t border-border flex items-center gap-3">
                    <div className="w-1 h-1 bg-gold rounded-full" />
                    <p className="font-mono text-xs text-muted">
                      Filed in AIR's library of revelations — curated for those who look beneath the surface.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </RevealText>
        ) : null}
      </div>
    </section>
  )
}
