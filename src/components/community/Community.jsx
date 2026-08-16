import { useLanguage } from '../../context/AppContext.jsx'

// Module 4 owns this file and this folder.
// TODO: read "question" type items from the shared annotations array (from Module 2),
// display them as threads with 1-2 pre-scripted peer/teacher answer bubbles + author tag.
export default function Community() {
  const { annotations } = useLanguage()
  const questions = annotations.filter((a) => a.type === 'question')

  return (
    <div>
      {questions.length === 0 && <p>No questions yet — ask one from the Reader view.</p>}
      {questions.map((q) => (
        <div key={q.id}>
          <p>{q.text}</p>
        </div>
      ))}
    </div>
  )
}
