import chapters from '../../data/chapters.json'
import { useLanguage } from '../../context/AppContext.jsx'

// Module 2 owns this file and this folder.
// TODO: render each paragraph as its own component (not one text blob),
// wire up window.getSelection() -> floating toolbar (Highlight / Note / Ask Question),
// and call addAnnotation() from AppContext to store results.
export default function Reader() {
  const { addAnnotation } = useLanguage()

  return (
    <div>
      {chapters.map((chapter) => (
        <section key={chapter.id}>
          <h2>{chapter.title}</h2>
          {chapter.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      ))}
      {/* placeholder call so addAnnotation isn't flagged unused; remove once wired up */}
      <button style={{ display: 'none' }} onClick={() => addAnnotation({ type: 'note', text: '' })} />
    </div>
  )
}
