/**
 * Layered hero: parallax background photo, a masked "make" word bridging to a
 * foreground cutout, the "we reveal truth" script line, a glass meta-card and
 * the primary CTAs.
 */
export function ConceptHero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <img id="heroImg" src="/images/samurai.jpg" alt="" />
      </div>

      <div className="hero-top">
        <span className="eyebrow">
          AIR — Artificial
          <br />
          Intelligence Revelations
        </span>
        <ul className="dashlist">
          <li>Truth-Led</li>
          <li>AI-Native</li>
          <li>Cinematic Craft</li>
        </ul>
      </div>

      <div className="hero-type wrap">
        <div className="hero-word-wrap">
          <h1 className="hw-row hero-word">
            <span className="hw-we">We</span>
            <span className="hw-dont">don't</span>
          </h1>
          <div className="hero-word hw-make">make</div>
          <div className="hero-word hw-content">content.</div>
        </div>
        <div className="hero-script">we reveal truth</div>
      </div>

      <div className="hero-fg">
        <img src="/images/samurai-cutout.png" alt="" />
      </div>

      <div className="hero-bottom wrap">
        <div className="meta-card">
          <div>
            <b>Studio</b> — AIR
          </div>
          <div>
            <b>Discipline</b> — Cinematic advertising &amp; branded content
          </div>
          <div>
            <b>Approach</b> — AI-native, human-led
          </div>
          <div>
            <b>Base</b> — South Africa
          </div>
        </div>
        <div className="hero-actions">
          <p className="hero-sub">
            An AI-native studio making cinematic advertising &amp; branded content — for brands that
            want to be understood, not merely seen.
          </p>
          <div className="hero-cta-group">
            <a href="#begin" className="pill pill-fill">
              Begin
            </a>
            <a href="#reels" className="pill">
              See the Work
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
