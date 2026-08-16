import { useLanguage } from '../../context/AppContext.jsx'

export default function Community() {
  const { strings } = useLanguage()
  const content = strings.app.community

  return (
    <section className="module-placeholder">
      <div className="placeholder-card">
        <div className="placeholder-icon" aria-hidden="true">
          👥
        </div>

        <div className="placeholder-copy">
          <p className="eyebrow">{strings.nav.community}</p>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>

        <div className="placeholder-actions">
          <button type="button" className="button-primary">
            {content.primary}
          </button>
        </div>
      </div>
    </section>
  )
}
