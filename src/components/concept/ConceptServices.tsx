import { services } from '../../data/concept'

/** "Who We Work With" — audience rows with capability chips. */
export function ConceptServices() {
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title">Who We Work With</h2>
        </div>
        <div className="services">
          {services.map((s) => (
            <div className="service" key={s.audience}>
              <div>
                <span className="role">{s.role}</span>
                <h3 className="audience">{s.audience}</h3>
              </div>
              <div>
                <p>{s.body}</p>
                <div className="caps">
                  {s.caps.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
