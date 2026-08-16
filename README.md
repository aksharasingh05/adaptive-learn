# Hackathon App

Multilingual ebook reader + adaptive quiz + community Q&A.

## Setup
```
npm install
npm run dev
```

## Module ownership

| Module | Owns | Notes |
|---|---|---|
| 1 — App Shell, Nav & Language | `App.jsx`, `context/AppContext.jsx`, `data/lang/` | Also owns final integration |
| 2 — Ebook Reader + Annotation | `components/reader/` | Most JS-heavy: `window.getSelection()` + floating toolbar |
| 3 — Adaptive Quiz | `components/quiz/` | Difficulty pointer: medium → harder/easier |
| 4 — Community Q&A | `components/community/` | Reads "question" items from shared annotations array |
| 5 — Data + Integration | `data/chapters.json`, `data/questions.json`, `data/lang/*.json` | Fills mock data with real content, wires modules into `AppContext` |

## Shared state (`AppContext`)
- `lang`, `strings` — current language + translated strings
- `view`, `setView` — active tab (`reader` / `quiz` / `community`)
- `annotations`, `addAnnotation` — shared highlight/note/question array

Build against the mock data in `src/data/` first — Module 5 swaps in real content once modules 2-4 work individually.
