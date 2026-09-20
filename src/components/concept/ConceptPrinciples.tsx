import { principles } from '../../data/concept'

/** Philosophy intro (the Ogilvy "one true detail" argument) + bento principles. */
export function ConceptPrinciples() {
  return (
    <section className="sec" id="principles">
      <div className="wrap">
        <div className="phil-grid">
          <div className="phil-intro">
            <span className="eyebrow">The Philosophy</span>
            <h3 style={{ marginTop: 18 }}>Most creative work says too much.</h3>
            <p>
              The best advertising in history didn't persuade. It revealed. Ogilvy's Rolls-Royce ad
              didn't claim the car was quiet. It said: "At 60 miles an hour the loudest noise comes
              from the electric clock." One true detail. Absolute trust.
            </p>
            <p>
              AI gives us the tools to excavate faster and deeper. Human insight tells us where to
              dig.
            </p>
          </div>
          <div className="phil-media">
            <img src="/images/philosophy-portrait.jpg" alt="" />
          </div>
        </div>

        <div className="principles">
          {principles.map((p) => (
            <div key={p.number} className={p.lead ? 'principle lead' : 'principle'}>
              <span className="n-bg" aria-hidden="true">
                {p.number}
              </span>
              <span className="n">{p.number}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <p className="aside">{p.aside}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
