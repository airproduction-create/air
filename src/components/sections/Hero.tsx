import type { CSSProperties } from 'react'

const heroImgStyle: CSSProperties = {
  objectPosition: '50% 38%',
  filter: 'saturate(1.08) contrast(1.06) sepia(.18) brightness(.72)',
  transform: 'scale(1.1)',
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-void isolate">
      {/* Full-bleed background photo */}
      <div className="absolute inset-0 -z-20">
        <img src="/images/samurai.jpg" alt="" className="w-full h-full object-cover" style={heroImgStyle} />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(0deg, rgba(24,20,15,.96) 6%, rgba(24,20,15,.35) 44%, rgba(24,20,15,.08) 70%), linear-gradient(180deg, rgba(24,20,15,.5), transparent 30%)',
          }}
        />
      </div>

      {/* Eyebrow row */}
      <div className="pt-[110px] px-6 lg:px-12 flex justify-between items-start gap-6 relative z-[4]">
        <span className="text-[11.5px] font-semibold tracking-[.09em] uppercase text-cream-dim max-w-[22ch] shrink-0">
          AIR — Artificial
          <br />
          Intelligence Revelations
        </span>
        <ul className="text-xs text-cream-dim text-right space-y-1 list-none shrink-0 whitespace-nowrap">
          <li>
            <span className="text-gold">— </span>Truth-Led
          </li>
          <li>
            <span className="text-gold">— </span>AI-Native
          </li>
          <li>
            <span className="text-gold">— </span>Cinematic Craft
          </li>
        </ul>
      </div>

      {/* Headline block */}
      <div className="flex-1 flex flex-col justify-end px-6 lg:px-12 -mt-10 relative">
        <div className="relative text-center">
          {/* "We don't" — sits BEHIND the foreground cutout layer (z-1) */}
          <h1
            className="relative z-[1] font-hero uppercase text-cream leading-[0.88] text-[clamp(2.6rem,12.5vw,4.2rem)] sm:text-[clamp(3.5rem,13.5vw,274px)]"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,.35)' }}
          >
            <span
              className="inline-block sm:translate-x-[.48em]"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,.7), 0 0 30px rgba(0,0,0,.55)' }}
            >
              We
            </span>
            <span className="inline-block translate-x-[.3em] sm:translate-x-[1.05em]">don't</span>
          </h1>

          {/* Foreground cutout — real alpha silhouette, sits above the text (z-2) */}
          <div className="hidden sm:block absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
            <img src="/images/samurai-cutout.png" alt="" className="w-full h-full object-cover" style={heroImgStyle} />
          </div>

          {/* "make" — on top, faded, nudged right (z-3, above the cutout) */}
          <div
            className="relative font-hero uppercase text-cream leading-[0.88] inline-block text-[clamp(2.6rem,12.5vw,4.2rem)] sm:text-[clamp(3.5rem,13.5vw,274px)]"
            style={{
              zIndex: 3,
              textShadow: '0 4px 30px rgba(0,0,0,.35)',
              transform: 'translateX(.35em)',
              WebkitMaskImage: 'linear-gradient(180deg,#000 45%,transparent 100%)',
              maskImage: 'linear-gradient(180deg,#000 45%,transparent 100%)',
            }}
          >
            make
          </div>

          {/* "content." — on top, full size, fully legible (z-3) */}
          <div
            className="relative font-hero uppercase text-cream leading-[0.88] block text-[clamp(2.6rem,12.5vw,4.2rem)] sm:text-[clamp(3.5rem,13.5vw,274px)]"
            style={{ zIndex: 3, textShadow: '0 4px 30px rgba(0,0,0,.35)' }}
          >
            content.
          </div>
        </div>

        {/* Script accent — always on top */}
        <div
          className="relative font-serif italic text-gold leading-[0.9] -mt-[.06em] ml-[.05em]"
          style={{ zIndex: 3, fontSize: 'clamp(2.4rem, 9vw, 7rem)', textShadow: '0 4px 24px rgba(0,0,0,.4)' }}
        >
          we reveal truth
        </div>

        {/* Meta card + actions */}
        <div className="relative z-[1] pt-8 pb-14 grid grid-cols-1 gap-6">
          <div className="bg-void/55 backdrop-blur-md border border-cream/10 rounded-2xl px-6 py-5 max-w-[420px] text-[12.5px] leading-[2] text-cream-dim">
            <div>
              <b className="text-cream font-semibold">Studio</b> — AIR
            </div>
            <div>
              <b className="text-cream font-semibold">Discipline</b> — Cinematic advertising &amp; branded content
            </div>
            <div>
              <b className="text-cream font-semibold">Approach</b> — AI-native, human-led
            </div>
            <div>
              <b className="text-cream font-semibold">Base</b> — South Africa
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <p className="text-sm text-cream-dim leading-relaxed max-w-[34ch]">
              An AI-native studio making cinematic advertising &amp; branded content — for brands that want to be
              understood, not merely seen.
            </p>
            <div className="flex gap-3">
              <a href="#contact" data-cursor className="btn-primary btn-glow">
                Begin
              </a>
              <a href="#portfolio" data-cursor className="btn-ghost">
                See the Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
