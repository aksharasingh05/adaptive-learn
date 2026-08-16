import { useLanguage } from '../../context/AppContext.jsx'

export default function Reader() {
  const { strings } = useLanguage()
  const content = strings.app.reader

  return (
    <section className="module-placeholder">
      <div className="placeholder-card">
        <div className="placeholder-icon" aria-hidden="true">
          📖
        </div>

        <div className="placeholder-copy">
          <p className="eyebrow">{strings.nav.reader}</p>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>

        <div className="activity-list" aria-label="Recent activity preview">
          <div className="activity-row">
            <span>Chapter 1</span>
            <span className="activity-indicator complete" aria-hidden="true">✓</span>
          </div>
          <div className="activity-row">
            <span>Chapter 2</span>
            <span className="activity-indicator" aria-hidden="true">○</span>
          </div>
          <div className="activity-row">
            <span>Quiz Practice</span>
            <span className="activity-indicator" aria-hidden="true">○</span>
          </div>
        </div>

        <div className="placeholder-actions">
          <button type="button" className="button-primary">
            {content.primary}
          </button>
          <button type="button" className="button-secondary">
            {content.secondary}
          </button>
        </div>
      </div>
    </section>
  )
}
