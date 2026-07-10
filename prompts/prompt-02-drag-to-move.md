# Claude Code Prompt: Drag to Move Actions Between Timeframes

Paste this prompt into Claude Code when you're in the `dont-panic-planner` project folder.

---

## CONTEXT (do not change any of this — read only)

The app is a Vite + React project. Here's what's relevant:

**`src/App.jsx`** manages plan state. Each plan item is `{ actionId, year, addedAt }` where `year` is one of: `'done'`, `'this_year'`, `'next_year'`, `'three_years'`, `'five_years'`, `'ten_years'`.

There is already a `handleMove(actionId, year)` function in App.jsx that updates an action's year in state and saves to localStorage. It is currently passed to BottomSheet via the `onMove` prop, but NOT passed to MyPlan.

**`src/components/MyPlan.jsx`** renders the plan as vertical stacked sections — one "Celebrating wins" section for done items, then one section per year bucket. Each section has a `card-grid` div containing `ActionCard` components.

**`src/data/templates.js`** exports `YEAR_BUCKETS`:
```js
[
  { value: 'this_year',   label: 'This year' },
  { value: 'next_year',   label: 'Next year' },
  { value: 'three_years', label: '3 years' },
  { value: 'five_years',  label: '5 years' },
  { value: 'ten_years',   label: '10 years' },
]
```

---

## WHAT TO BUILD

Add touch and mouse drag-and-drop so users can hold and drag an action card from one year bucket to another directly in the My Plan screen.

### Changes needed

**1. `src/App.jsx`**
Pass `onMove={handleMove}` as a new prop to `<MyPlan>`.

**2. `src/components/MyPlan.jsx`**
- Accept `onMove` as a new prop
- Add drag functionality to `ActionCard` and the bucket drop zones

### Drag behaviour

- User **presses and holds** a card (touch) or **clicks and drags** (mouse)
- Use a 300ms hold delay before drag starts, so normal taps still open the bottom sheet as before
- While dragging: card looks lifted — `opacity: 0.6`, `transform: scale(1.03)`, subtle `box-shadow`
- A floating ghost card follows the finger/cursor position
- Each year bucket section becomes a drop zone and highlights when the dragged card is over it — use `rgba(29,158,117,0.15)` background and a `2px solid #1D9E75` border
- On release over a valid bucket: call `onMove(actionId, newYear)` — the card moves instantly
- On release outside any bucket: card snaps back, no change
- Prevent page scroll while dragging (`event.preventDefault()` in touchmove)
- **Do not include 'done' / 'Celebrating wins' as a drop target** — users mark done via the bottom sheet as before

### Implementation approach
- Use **native touch and mouse events only** — no external libraries
- Handle both `touchstart`/`touchmove`/`touchend` and `mousedown`/`mousemove`/`mouseup`
- Track drag state in React `useRef` (not useState) to avoid re-renders during drag
- Use `document.elementFromPoint()` to detect which bucket the card is over on release

---

## CONSTRAINTS

1. Normal taps must still open the bottom sheet exactly as before
2. Do not change any existing styles, logic, or other components
3. Do not touch `dont-panic-social/` or any other file outside `src/App.jsx` and `src/components/MyPlan.jsx`
4. After implementing, describe what you built in plain language and list the exact files changed
