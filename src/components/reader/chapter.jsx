import React from "react";
import Paragraph from "./paragraph";

export default function Chapter({ chapter, annotations }) {
  const findAnnotation = (paragraphId, type) =>
    annotations.find((a) => a.paragraphId === paragraphId && a.type === type);

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
        {chapter.title}
      </h2>
      {chapter.paragraphs.map((text, index) => {
        const paragraphId = `${chapter.id}-p${index}`;
        const highlight = findAnnotation(paragraphId, "highlight");
        return (
          <Paragraph
            key={paragraphId}
            id={paragraphId}
            text={text}
            highlightedText={highlight ? highlight.selectedText : null}
            hasNote={!!findAnnotation(paragraphId, "note")}
            hasQuestion={!!findAnnotation(paragraphId, "question")}
          />
        );
      })}
    </div>
  );
}
