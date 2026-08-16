export default function QuizQuestion({ question, onAnswer, feedback }) {
  return (
    <div>
      <h3>{question.text}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {question.options.map((opt, i) => (
          <button key={i} onClick={() => onAnswer(i)} disabled={feedback !== null}>
            {opt}
          </button>
        ))}
      </div>
      {feedback && (
        <p style={{ color: feedback === "correct" ? "green" : "red" }}>
          {feedback === "correct" ? "Correct!" : "Not quite."}
        </p>
      )}
    </div>
  );
}