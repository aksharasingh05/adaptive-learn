import React, { useState, useEffect } from "react";
import Chapter from "./chapter";
import SelectionToolbar from "./selectiontoolbar";
import useTextSelection from "./usetextselection";
import chaptersData from "../../data/chapters.json";

export default function Reader() {
  const [chapters, setChapters] = useState([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [annotations, setAnnotations] = useState([]); // TODO: swap for AppContext later

  const { selectionInfo, clearSelection } = useTextSelection();

  useEffect(() => {
    setChapters(chaptersData);
  }, []);

  const handleSaveAnnotation = ({ type, content }) => {
    if (!selectionInfo) return;
    const newAnnotation = {
      id: crypto.randomUUID(),
      chapterId: chapters[currentChapterIndex]?.id,
      paragraphId: selectionInfo.paragraphId,
      type,
      selectedText: selectionInfo.text,
      content,
      author: "You",
      timestamp: Date.now(),
    };
    setAnnotations((prev) => [...prev, newAnnotation]);
  };

  if (chapters.length === 0) return <p>Loading chapters...</p>;

  const currentChapter = chapters[currentChapterIndex];

  return (
    <div className="reader-container" style={{ position: "relative" }}>
      <div className="chapter-nav" style={{ marginBottom: "1rem" }}>
        <button
          disabled={currentChapterIndex === 0}
          onClick={() => setCurrentChapterIndex((i) => i - 1)}
        >
          Previous
        </button>
        <span style={{ margin: "0 1rem" }}>
          Chapter {currentChapterIndex + 1} of {chapters.length}
        </span>
        <button
          disabled={currentChapterIndex === chapters.length - 1}
          onClick={() => setCurrentChapterIndex((i) => i + 1)}
        >
          Next
        </button>
      </div>

      <Chapter chapter={currentChapter} annotations={annotations} />

      <SelectionToolbar
        selectionInfo={selectionInfo}
        onSave={handleSaveAnnotation}
        onClose={clearSelection}
      />
    </div>
  );
}
