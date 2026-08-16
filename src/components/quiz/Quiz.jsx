import { useState } from 'react'
import questions from '../../data/questions.json'

// Module 3 owns this file and this folder.
// TODO: difficulty pointer logic — start medium, correct -> harder, wrong -> easier.
// Show a visual difficulty indicator so judges can see it adapting live.
export default function Quiz() {
  const [difficulty, setDifficulty] = useState('medium')
  const current = questions.find((q) => q.difficulty === difficulty) || questions[0]

  return (
    <div>
      <p>Difficulty: <strong>{difficulty}</strong></p>
      <h3>{current.text}</h3>
      <ul>
        {current.options.map((opt) => (
          <li key={opt}>{opt}</li>
        ))}
      </ul>
    </div>
  )
}
