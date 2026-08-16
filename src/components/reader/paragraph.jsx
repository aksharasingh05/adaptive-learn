import React from "react";

// Renders one paragraph. Highlighted text (if any annotation exists
// for this paragraph) gets wrapped in a <mark>.
export default function Paragraph({ id, text, highlightedText }) {
  const renderText = () => {
    if (!highlightedText || !text.includes(highlightedText)) {
      return text;
    }
    const parts = text.split(highlightedText);
    return (
      <>
        {parts[0]}
        <mark>{highlightedText}</mark>
        {parts.slice(1).join(highlightedText)}
      </>
    );
  };

  return (
    <p data-paragraph-id={id} className="reader-paragraph">
      {renderText()}
    </p>
  );
}
