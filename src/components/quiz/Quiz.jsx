import { useState, useEffect } from "react";
import questions from "../../data/questions.json";
import DifficultyMeter from "./DifficultyMeter";
import QuizQuestion from "./QuizQuestion";

const DIFFICULTY_LEVELS = ["easy", "medium", "hard"];
const TOTAL_QUESTIONS = 6;

export default function Quiz() {
  const [difficultyIndex, setDifficultyIndex] = useState(1); // start at "medium"
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredIds, setAnsweredIds] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // "correct" | "incorrect" | null
  const [quizOver, setQuizOver] = useState(false);

  function pickNextQuestion(difficultyIdx, answeredIds) {
    const targetDifficulty = DIFFICULTY_LEVELS[difficultyIdx];
    const pool = questions.filter(
      (q) => q.difficulty === targetDifficulty && !answeredIds.includes(q.id)
    );

    if (pool.length > 0) {
      return pool[Math.floor(Math.random() * pool.length)];
    }

    // fallback: no questions left at this tier, grab any unanswered question
    const fallbackPool = questions.filter((q) => !answeredIds.includes(q.id));
    return fallbackPool.length > 0 ? fallbackPool[0] : null;
  }

  function handleAnswer(selectedIndex) {
    const isCorrect = selectedIndex === currentQuestion.answer;
    setFeedback(isCorrect ? "correct" : "incorrect");
    if (isCorrect) setScore((s) => s + 1);

    let newDifficultyIndex = difficultyIndex;
    if (isCorrect && difficultyIndex < DIFFICULTY_LEVELS.length - 1) {
      newDifficultyIndex = difficultyIndex + 1; // move up a tier
    } else if (!isCorrect && difficultyIndex > 0) {
      newDifficultyIndex = difficultyIndex - 1; // move down a tier
    }

    const newAnsweredIds = [...answeredIds, currentQuestion.id];

    // brief delay so the learner sees the feedback before the next question loads
    setTimeout(() => {
      setDifficultyIndex(newDifficultyIndex);
      setAnsweredIds(newAnsweredIds);
      setFeedback(null);

      if (newAnsweredIds.length >= TOTAL_QUESTIONS) {
        setQuizOver(true);
      } else {
        setCurrentQuestion(pickNextQuestion(newDifficultyIndex, newAnsweredIds));
      }
    }, 900);
  }

  useEffect(() => {
    setCurrentQuestion(pickNextQuestion(difficultyIndex, []));
  }, []);

  if (quizOver) {
    return (
      <div>
        <h2>Quiz complete!</h2>
        <p>Score: {score} / {TOTAL_QUESTIONS}</p>
        <p>Final difficulty reached: {DIFFICULTY_LEVELS[difficultyIndex]}</p>
      </div>
    );
  }

  return (
    <div>
      <DifficultyMeter difficultyIndex={difficultyIndex} />
      {currentQuestion && (
        <QuizQuestion question={currentQuestion} onAnswer={handleAnswer} feedback={feedback} />
      )}
    </div>
  );
}