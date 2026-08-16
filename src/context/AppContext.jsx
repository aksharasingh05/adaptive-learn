import { createContext, useContext, useState, useCallback } from 'react'
import en from '../data/lang/en.json'
import hi from '../data/lang/hi.json'

const STRINGS = { en, hi }

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [lang, setLang] = useState('en')
  const [view, setView] = useState('reader') // 'reader' | 'quiz' | 'community'

  // Shared array Module 2 writes to and Module 4 reads from:
  // { id, type: 'highlight' | 'note' | 'question', text, chapterId, author, createdAt }
  const [annotations, setAnnotations] = useState([])

  const addAnnotation = useCallback((entry) => {
    console.log('AppContext addAnnotation', entry)
    setAnnotations((prev) => {
      const next = [
        ...prev,
        { id: crypto.randomUUID(), createdAt: Date.now(), ...entry },
      ]
      console.log('AppContext next annotations', next)
      return next
    })
  }, [])

  const strings = STRINGS[lang]

  const value = {
    lang,
    setLang,
    strings,
    view,
    setView,
    annotations,
    addAnnotation,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// Usage in any module: const { strings, view, setView } = useLanguage()
export function useLanguage() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useLanguage must be used within AppProvider')
  return ctx
}
