import React from "react";

export default function Paragraph({
  id,
  text,
  highlightedText,
  hasNote,
  hasQuestion,
}) {
  const renderText = () => {
    if (!highlightedText || !text.includes(highlightedText)) {
      return text;
    }
    const parts = text.split(highlightedText);
    return (
      <>
        {parts[0]}
        <mark className="bg-indigo-100 text-indigo-900 rounded px-0.5">
          {highlightedText}
        </mark>
        {parts.slice(1).join(highlightedText)}
      </>
    );
  };

  return (
    <p
      data-paragraph-id={id}
      className="text-gray-700 leading-relaxed mb-4 select-text relative"
    >
      {renderText()}
      {hasNote && (
        <span
          className="ml-2 text-xs text-amber-600 align-middle"
          title="Has a note"
        >
          📝
        </span>
      )}
      {hasQuestion && (
        <span
          className="ml-1 text-xs text-purple-600 align-middle"
          title="Has a question"
        >
          ❓
        </span>
      )}
    </p>
  );
}
