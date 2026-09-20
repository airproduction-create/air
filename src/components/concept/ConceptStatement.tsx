/**
 * Pinned statement. As the section scrolls, useConceptMotion fills the scrubber
 * and resolves each [data-w] word from faint to cream (accent to terracotta).
 */
export function ConceptStatement() {
  return (
    <section className="scrub-outer" id="statement">
      <div className="scrub-pin">
        <div className="scrubber">
          <div className="line">
            <div className="fill" id="scrubFill" />
          </div>
          <div className="dot">
            <i />
          </div>
          <div className="line" />
        </div>
        <h2 className="scrub-head" id="scrubHead">
          <span className="w" data-w="">
            Powered
          </span>{' '}
          <span className="w" data-w="">
            by
          </span>{' '}
          <span className="w accent" data-w="">
            AI.
          </span>{' '}
          <span className="w" data-w="">
            Guided
          </span>{' '}
          <span className="w" data-w="">
            by
          </span>{' '}
          <span className="w" data-w="">
            human
          </span>{' '}
          <span className="w" data-w="">
            truth.
          </span>
        </h2>
      </div>
    </section>
  )
}
