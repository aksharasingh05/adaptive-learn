function timeAgo(createdAt) {
  const mins = Math.max(1, Math.round((Date.now() - createdAt) / 60000))
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.round(hrs / 24)}d ago`
}

function AnswerBubble({ answer, strings }) {
  const isTeacher = answer.role === 'teacher'
  return (
    <div className="community-answer">
      <div
        className={`community-answer-avatar${isTeacher ? '' : ' peer'}`}
        aria-hidden="true"
      >
        {isTeacher ? 'T' : 'P'}
      </div>
      <div className="community-answer-body">
        <div className="community-answer-head">
          <span className="community-answer-author">{answer.author}</span>
          {isTeacher && (
            <span className="community-answer-badge">{strings.verifiedTeacher}</span>
          )}
        </div>
        <p className="community-answer-text">{answer.text}</p>
      </div>
    </div>
  )
}

export default function QuestionThread({ question, answers, chapterLabel, strings }) {
  return (
    <article className="community-thread">
      <div className="community-thread-meta">
        <span>{chapterLabel}</span>
        <span aria-hidden="true">·</span>
        <span>{timeAgo(question.createdAt)}</span>
      </div>

      <div className="community-question">
        <p>{question.text}</p>
        <span className="community-asked-by">
          {strings.askedBy} <strong>{question.author}</strong>
        </span>
      </div>

      <div className="community-answers">
        {answers.map((a, i) => (
          <AnswerBubble key={i} answer={a} strings={strings} />
        ))}
      </div>
    </article>
  )
}