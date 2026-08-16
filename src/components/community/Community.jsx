import { useMemo } from 'react'
import { useLanguage } from '../../context/AppContext.jsx'
import chapters from '../../data/chapters.json'
import QuestionThread from './QuestionThread.jsx'
import { getAnswersFor } from './answerBank.js'
import { communityStrings } from './communityStrings.js'
import { SAMPLE_QUESTIONS } from './devSeedData.js'
import './Community.css'

// { ch1: "Chapter 1: Getting Started", ch2: "..." } — built once, not per render.
const chapterTitleById = chapters.reduce((map, ch) => {
  map[ch.id] = ch.title
  return map
}, {})

export default function Community() {
  const { strings, lang, annotations, addAnnotation } = useLanguage()
  const c = communityStrings[lang] || communityStrings.en

  const questions = useMemo(
    () =>
      annotations
        .filter((a) => a.type === 'question')
        .sort((a, b) => b.createdAt - a.createdAt),
    [annotations]
  )

  const seedSampleQuestion = () => {
    const next = SAMPLE_QUESTIONS[questions.length % SAMPLE_QUESTIONS.length]
    addAnnotation({ type: 'question', ...next })
  }

  return (
    <section className="community-panel">
      <header>
        <div className="community-heading-row">
          <h2>{strings.app.community.title}</h2>
          <span className="community-count">{c.countLabel(questions.length)}</span>
        </div>
        <p className="community-subtitle">{strings.app.community.description}</p>
      </header>

      {questions.length === 0 ? (
        <div className="community-empty">
          <p>{c.empty}</p>
          {import.meta.env.DEV && (
            <button type="button" className="community-dev-btn" onClick={seedSampleQuestion}>
              {c.devSeedButton}
            </button>
          )}
        </div>
      ) : (
        <div className="community-thread-list">
          {questions.map((q) => (
            <QuestionThread
              key={q.id}
              question={q}
              answers={getAnswersFor(q)}
              chapterLabel={chapterTitleById[q.chapterId] || q.chapterId}
              strings={c}
            />
          ))}
          {import.meta.env.DEV && (
            <button type="button" className="community-dev-btn" onClick={seedSampleQuestion}>
              {c.devSeedButton}
            </button>
          )}
        </div>
      )}
    </section>
  )
}