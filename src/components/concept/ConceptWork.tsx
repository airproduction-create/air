import { reels } from '../../data/concept'

function ArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

/**
 * Selected Work carousel. Drag-to-scroll, arrow controls, an index scrubber and
 * Vimeo lightbox playback are wired imperatively in useConceptMotion, which
 * reads data-vimeo / data-title off each card.
 */
export function ConceptWork() {
  return (
    <section className="sec" id="reels">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title">Selected Work</h2>
          <div className="carousel-nav">
            <button className="pill pill-icon" id="prevBtn" type="button" aria-label="Previous">
              <ArrowLeft />
            </button>
            <button className="pill pill-icon" id="nextBtn" type="button" aria-label="Next">
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div className="carousel-track" id="track">
        {reels.map((r) => (
          <a
            key={r.title}
            className={r.vimeo ? 'reel-card' : 'reel-card no-play'}
            href="#"
            data-cursor=""
            data-vimeo={r.vimeo}
            data-title={r.title}
          >
            <img src={r.image} alt={r.alt} draggable={false} />
            {r.vimeo && (
              <div className="play-badge">
                <PlayIcon />
              </div>
            )}
            <div className="reel-content">
              <div className="reel-top">
                <span>{r.client}</span>
                <span>{r.year}</span>
              </div>
              <div className="reel-title">{r.title}</div>
              <div className="reel-bottom">
                <p className="reel-desc">{r.desc}</p>
                <span className="reel-tag">{r.tag}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="wrap">
        <div className="carousel-index">
          <span className="idx-num" id="idxCurrent">
            01
          </span>
          <div className="idx-line">
            <div className="idx-dot" id="idxDot" />
          </div>
          <span className="idx-num" id="idxTotal">
            05
          </span>
        </div>
      </div>
    </section>
  )
}
