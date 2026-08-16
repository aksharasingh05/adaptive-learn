// Pre-scripted peer/teacher answers — no live API, per team decision.
// Keyed by chapterId to match src/data/chapters.json (currently ch1, ch2).
// Add more keys as Module 5 adds real chapters.

export const ANSWER_BANK = {
  ch1: [
    {
      author: 'Ms. Rao',
      role: 'teacher',
      text: 'Good question — reread the paragraph just before this one, it sets up the answer.',
    },
    {
      author: 'Kabir (peer)',
      role: 'peer',
      text: "I wondered the same thing, it wasn't obvious to me either on first read.",
    },
  ],
  ch2: [
    {
      author: 'Mr. Verma',
      role: 'teacher',
      text: 'Close reading. Hold that thought — the next section answers this indirectly.',
    },
    {
      author: 'Simran (peer)',
      role: 'peer',
      text: 'मुझे भी यही लगा जब मैंने पहली बार पढ़ा था।',
    },
  ],
}

// Used when a question's chapterId has no scripted pool yet.
export const FALLBACK_ANSWERS = [
  {
    author: 'Ms. Rao',
    role: 'teacher',
    text: 'Great question — bring this one up in class, worth discussing as a group.',
  },
  {
    author: 'A classmate',
    role: 'peer',
    text: 'I wondered about this too, no answer yet but following this thread.',
  },
]

/**
 * Returns the answer set for a question. Deterministic by chapterId —
 * no randomness, so re-renders never shuffle who "answered."
 */
export function getAnswersFor(question) {
  return ANSWER_BANK[question.chapterId] || FALLBACK_ANSWERS
}