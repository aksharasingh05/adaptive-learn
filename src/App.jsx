import { useLanguage } from './context/AppContext.jsx'
import Reader from './components/reader/Reader.jsx'
import Quiz from './components/quiz/Quiz.jsx'
import Community from './components/community/Community.jsx'

export default function App() {
  const { strings, view, setView, lang, setLang } = useLanguage()

  return (
    <div className="app-shell">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{strings.app.title}</h1>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="en">EN</option>
          <option value="hi">HI</option>
        </select>
      </header>

      <nav className="nav-bar">
        {['reader', 'quiz', 'community'].map((key) => (
          <button
            key={key}
            className={view === key ? 'active' : ''}
            onClick={() => setView(key)}
          >
            {strings.nav[key]}
          </button>
        ))}
      </nav>

      <main>
        {view === 'reader' && <Reader />}
        {view === 'quiz' && <Quiz />}
        {view === 'community' && <Community />}
      </main>
    </div>
  )
}
