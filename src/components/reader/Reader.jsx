import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/AppContext.jsx'
import Chapter from './chapter'
import SelectionToolbar from './selectiontoolbar'
import useTextSelection from './usetextselection'
import chaptersData from '../../data/chapters.json'

export default function Reader() {
  const { addAnnotation } = useLanguage()
  const [chapters, setChapters] = useState([])
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0)
  const [annotations, setAnnotations] = useState(() => {
    try {
      const saved = localStorage.getItem('adaptive-learn-annotations')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const { selectionInfo, clearSelection } = useTextSelection()

  useEffect(() => {
    setChapters(chaptersData)
  }, [])

  useEffect(() => {
    localStorage.setItem('adaptive-learn-annotations', JSON.stringify(annotations))
  }, [annotations])

  const handleSaveAnnotation = ({ type, content }) => {
    if (!selectionInfo) return

    const newAnnotation = {
      id: crypto.randomUUID(),
      chapterId: chapters[currentChapterIndex]?.id,
      paragraphId: selectionInfo.paragraphId,
      type,
      selectedText: selectionInfo.text,
      content,
      author: 'You',
      timestamp: Date.now(),
    }

    setAnnotations((prev) => [...prev, newAnnotation])

    if (type === 'question') {
      console.log('Reader handleSaveAnnotation => question', {
        content,
        chapterId: chapters[currentChapterIndex]?.id,
        selectionInfo,
      })
      addAnnotation({
        id: crypto.randomUUID(),
        type: 'question',
        text: content,
        chapterId: chapters[currentChapterIndex]?.id,
        author: 'You',
        createdAt: Date.now(),
      })
    }
  }

  if (chapters.length === 0) return <p>Loading chapters...</p>

  const currentChapter = chapters[currentChapterIndex]

  return (
    <div className="reader-container" style={{ position: 'relative' }}>
      <div className="chapter-nav" style={{ marginBottom: '1rem' }}>
        <button
          disabled={currentChapterIndex === 0}
          onClick={() => setCurrentChapterIndex((i) => i - 1)}
        >
          Previous
        </button>
        <span style={{ margin: '0 1rem' }}>
          Chapter {currentChapterIndex + 1} of {chapters.length}
        </span>
        <button
          disabled={currentChapterIndex === chapters.length - 1}
          onClick={() => setCurrentChapterIndex((i) => i + 1)}
        >
          Next
        </button>
      </div>

      <Chapter chapter={currentChapter} annotations={annotations} />

      <SelectionToolbar
        selectionInfo={selectionInfo}
        onSave={handleSaveAnnotation}
        onClose={clearSelection}
      />
    </div>
  )
}
