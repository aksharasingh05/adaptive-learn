export default function DifficultyMeter({ difficultyIndex }) {
  const labels = ["Easy", "Medium", "Hard"];
  return (
    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
      {labels.map((label, i) => (
        <div
          key={label}
          style={{
            padding: "4px 12px",
            borderRadius: "6px",
            fontWeight: i === difficultyIndex ? "bold" : "normal",
            background: i === difficultyIndex ? "#4f46e5" : "#e5e7eb",
            color: i === difficultyIndex ? "white" : "#374151",
            transition: "all 0.3s ease",
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}