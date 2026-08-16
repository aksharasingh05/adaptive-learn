import React, { useState } from "react";

export default function SelectionToolbar({ selectionInfo, onSave, onClose }) {
  const [mode, setMode] = useState(null); // null | "note" | "question"
  const [inputText, setInputText] = useState("");

  if (!selectionInfo) return null;

  const toolbarHeight = mode ? 88 : 52;
  const toolbarWidth = mode ? 260 : 220;
  const gap = 12;
  const margin = 8;
  const selectedTop = selectionInfo.top ?? 0;
  const selectedLeft = selectionInfo.left ?? 0;

  const topBelowSelection = selectedTop + gap + toolbarHeight;
  const placeBelow = topBelowSelection <= window.innerHeight - margin;
  const preferredTop = placeBelow ? selectedTop + gap : selectedTop - toolbarHeight - gap;
  const clampedTop = Math.min(
    Math.max(preferredTop, margin),
    Math.max(margin, window.innerHeight - toolbarHeight - margin)
  );

  const preferredLeft = selectedLeft + toolbarWidth > window.innerWidth - margin
    ? window.innerWidth - toolbarWidth - margin
    : selectedLeft;
  const clampedLeft = Math.min(
    Math.max(preferredLeft, margin),
    Math.max(margin, window.innerWidth - toolbarWidth - margin)
  );

  const handleHighlight = () => {
    onSave({ type: "highlight", content: "" });
    reset();
  };

  const handleSubmitInput = () => {
    if (!inputText.trim()) return;
    onSave({ type: mode, content: inputText.trim() });
    reset();
  };

  const reset = () => {
    setMode(null);
    setInputText("");
    onClose();
  };

  return (
    <div
      className="absolute z-50 bg-white border border-gray-200 rounded-xl shadow-lg p-2"
      style={{
        top: clampedTop,
        left: clampedLeft,
      }}
    >
      {!mode && (
        <div className="flex gap-1">
          <button
            onClick={handleHighlight}
            className="px-3 py-1.5 text-sm rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 font-medium"
          >
            Highlight
          </button>
          <button
            onClick={() => setMode("note")}
            className="px-3 py-1.5 text-sm rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium"
          >
            Note
          </button>
          <button
            onClick={() => setMode("question")}
            className="px-3 py-1.5 text-sm rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium"
          >
            Ask Question
          </button>
        </div>
      )}

      {mode && (
        <div className="flex gap-2 items-center min-w-[260px]">
          <input
            autoFocus
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmitInput()}
            placeholder={
              mode === "note" ? "Write a note..." : "Ask a question..."
            }
            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={handleSubmitInput}
            className="px-3 py-1.5 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
