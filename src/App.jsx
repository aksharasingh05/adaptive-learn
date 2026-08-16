import { useLanguage } from './context/AppContext.jsx'
import Reader from './components/reader/Reader.jsx'
import Quiz from './components/quiz/Quiz.jsx'
import Community from './components/community/Community.jsx'

const moduleIcons = {
  reader: '📖',
  quiz: '🧠',
  community: '👥',
}

function Placeholder({ type, strings }) {
  const content = strings.app[type]

  return (
    <section className="module-placeholder">
      <div className="placeholder-card">
        <div className="placeholder-icon" aria-hidden="true">
          {moduleIcons[type]}
        </div>

        <div className="placeholder-copy">
          <p className="eyebrow">{strings.nav[type]}</p>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>

        <div className="activity-list" aria-label="Recent activity preview">
          <div className="activity-row">
            <span>{strings.activity.chapter1}</span>
            <span className="activity-indicator complete" aria-hidden="true">✓</span>
          </div>
          <div className="activity-row">
            <span>{strings.activity.chapter2}</span>
            <span className="activity-indicator" aria-hidden="true">○</span>
          </div>
          <div className="activity-row">
            <span>{strings.activity.quizPractice}</span>
            <span className="activity-indicator" aria-hidden="true">○</span>
          </div>
        </div>

        <div className="placeholder-actions">
          <button type="button" className="button-primary">
            {content.primary}
          </button>
          {content.secondary && (
            <button type="button" className="button-secondary">
              {content.secondary}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const { strings, view, setView, lang, setLang } = useLanguage()

  const highlights = [
    strings.app.highlights.path,
    strings.app.highlights.focus,
    strings.app.highlights.progress,
  ]

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap" aria-label="Adaptive Learn home">
          <div className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" role="img" aria-label="Adaptive Learn icon">
              <path d="M22 16.5C17.5 16.5 14 19.7 14 24v17.3c0 5.2 4.2 9.5 9.4 9.5H29V27.6h-5.7v-7.1H22Zm20.1 0c4.5 0 8 3.2 8 7.5v17.3c0 5.2-4.2 9.5-9.4 9.5H35V27.6h5.7v-7.1H42.1ZM22 21.7h3.8v16.1H22c-1.8 0-3.2-1.4-3.2-3.3V24.9c0-1.8 1.4-3.2 3.2-3.2Zm20.1 0H42v16.1h.1c1.8 0 3.2-1.4 3.2-3.3V24.9c0-1.8-1.4-3.2-3.2-3.2Z" fill="currentColor" opacity="0.96"/>
              <path d="M30.2 20.7h3.6v23.5h-3.6zm-2.1-4.2h7.8v3.2h-7.8z" fill="currentColor" opacity="0.84"/>
            </svg>
          </div>
          <div className="brand-copy">
            <h1>{strings.app.title}</h1>
            <p>{strings.app.subtitle}</p>
            <div className="trust-badge">{strings.app.badge}</div>
          </div>
        </div>

        <div className="toolbar">
          <label className="language-field" htmlFor="language-select">
            <span>{strings.app.languageLabel}</span>
            <select
              id="language-select"
              value={lang}
              onChange={(event) => setLang(event.target.value)}
              aria-label={strings.app.languageLabel}
            >
              <option value="en">{strings.app.language.en}</option>
              <option value="hi">{strings.app.language.hi}</option>
            </select>
          </label>
        </div>
      </header>

      <nav className="nav-bar" aria-label="Primary navigation">
        {['reader', 'quiz', 'community'].map((key) => (
          <button
            key={key}
            type="button"
            className={`nav-pill ${view === key ? 'active' : ''}`}
            onClick={() => setView(key)}
            aria-pressed={view === key}
          >
            <span className="nav-icon" aria-hidden="true">{moduleIcons[key]}</span>
            {strings.nav[key]}
          </button>
        ))}
      </nav>

      <div className="summary-strip" aria-label="Adaptive Learn highlights">
        {highlights.map((item) => (
          <div key={item} className="summary-chip">
            {item}
          </div>
        ))}
      </div>

      <main className="main-panel">
        {view === 'reader' && <Placeholder type="reader" strings={strings} />}
        {view === 'quiz' && <Quiz />}
        {view === 'community' && <Community />}
      </main>
    </div>
  )
}
