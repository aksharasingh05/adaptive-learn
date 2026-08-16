import { useState, useEffect, useCallback } from "react";

// Detects text the user selects with their mouse, finds which paragraph
// it belongs to, and returns coordinates so a toolbar can be positioned.
export default function useTextSelection() {
  const [selectionInfo, setSelectionInfo] = useState(null);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();

      if (selection && selection.toString().trim().length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        let node = range.startContainer;
        if (node.nodeType === 3) node = node.parentElement; // text node -> element
        const paragraphEl = node.closest("[data-paragraph-id]");

        if (paragraphEl && rect.width > 0) {
          setSelectionInfo({
            text: selection.toString(),
            paragraphId: paragraphEl.dataset.paragraphId,
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
          });
          return;
        }
      }
      setSelectionInfo(null);
    };

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("touchend", handleSelection);
    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("touchend", handleSelection);
    };
  }, []);

  const clearSelection = useCallback(() => {
    setSelectionInfo(null);
    window.getSelection()?.removeAllRanges();
  }, []);

  return { selectionInfo, clearSelection };
}
