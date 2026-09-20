/** Fixed top nav with recreated AiR wordmark and a "Begin" CTA pill. */
export function ConceptNav() {
  return (
    <header className="nav">
      <a href="#top" className="logo" aria-label="AIR">
        <svg className="logo-mark" width="30" height="20" viewBox="0 0 30 20" aria-hidden="true">
          <path d="M2 17 Q10 19 15 12 Q20 5 28 3" />
        </svg>
        <span className="logo-word">
          A<i>i</i>R
        </span>
      </a>
      <nav className="nav-mid" aria-label="Primary">
        <a href="#reels">Work</a>
        <a href="#principles">Principles</a>
        <a href="#services">Services</a>
      </nav>
      <a href="#begin" className="pill pill-fill">
        Begin
      </a>
    </header>
  )
}
