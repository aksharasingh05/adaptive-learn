// Dev-only. Lets you test Community.jsx end-to-end through the REAL
// AppContext (via addAnnotation) before Module 2's reader can write
// real questions. Never shown in production — Community.jsx only
// renders the seed button when import.meta.env.DEV is true, which
// Vite strips out of `npm run build`.

export const SAMPLE_QUESTIONS = [
  {
    chapterId: 'ch1',
    text: 'What does this paragraph actually mean in context?',
    author: 'Aisha',
  },
  {
    chapterId: 'ch1',
    text: 'Why does the second paragraph repeat the same idea as the first?',
    author: 'Rohan',
  },
  {
    chapterId: 'ch2',
    text: 'क्या यह वाक्य किसी गहरे अर्थ की ओर इशारा करता है?',
    author: 'Meher',
  },
]