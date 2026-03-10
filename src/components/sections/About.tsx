import { RevealText } from '../ui/RevealText'

export function About() {
  return (
    <section id="about" className="py-32 lg:py-40 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: Manifesto */}
          <div>
            <RevealText>
              <span className="section-label block mb-8">— The Philosophy</span>
            </RevealText>

            <RevealText delay={100}>
              <h2 className="font-serif text-4xl lg:text-5xl font-medium text-cream leading-tight mb-8">
                Most creative work<br />
                <span className="italic text-gradient">says too much.</span>
              </h2>
            </RevealText>

            <RevealText delay={200}>
              <p className="font-sans text-cream-dim leading-relaxed mb-6">
                The best advertising in history didn't persuade. It revealed. Ogilvy's Rolls-Royce ad
                didn't claim the car was quiet. It said: "At 60 miles an hour the loudest noise comes
                from the electric clock." One true detail. Absolute trust.
              </p>
            </RevealText>

            <RevealText delay={300}>
              <p className="font-sans text-cream-dim leading-relaxed mb-6">
                We believe the same principle governs all powerful creative work — across advertising,
                film, brand identity, corporate communication. The job isn't to construct a message.
                It's to excavate the one that was already there.
              </p>
            </RevealText>

            <RevealText delay={400}>
              <p className="font-sans text-cream-dim leading-relaxed">
                AI gives us the tools to excavate faster and deeper. Human insight tells us where to dig.
              </p>
            </RevealText>
          </div>

          {/* Right: Principles */}
          <div className="space-y-px bg-border">
            {[
              {
                number: '01',
                principle: 'Truth before beauty',
                description: 'A beautiful lie is still a lie. A true thing, well-told, always outlasts it.',
              },
              {
                number: '02',
                principle: 'Constraint as creative force',
                description: 'The most revelatory work in history emerged under pressure, not despite it.',
              },
              {
                number: '03',
                principle: 'Speed in service of clarity',
                description: 'We use velocity to reach the essential faster — not to avoid the essential entirely.',
              },
              {
                number: '04',
                principle: 'Intelligence without artifice',
                description: 'AI is a tool for revelation, not decoration. We apply it where it earns its place.',
              },
            ].map((item) => (
              <RevealText key={item.number} delay={parseInt(item.number) * 80}>
                <div className="bg-surface p-8 group hover:bg-surface-2 transition-colors duration-300">
                  <div className="flex items-start gap-6">
                    <span className="font-mono text-xs text-gold shrink-0 mt-1">{item.number}</span>
                    <div>
                      <h3 className="font-serif text-lg text-cream mb-2 group-hover:text-gold transition-colors duration-300">
                        {item.principle}
                      </h3>
                      <p className="font-sans text-sm text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealText>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
