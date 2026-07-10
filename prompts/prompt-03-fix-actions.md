# Claude Code Prompt: Replace Actions in index.html

Paste this into Claude Code when you're in the `dont-panic-planner` project folder.

---

## PROMPT

I need you to replace the ACTIONS array in `index.html` with a corrected version.

**Step 1:** Open `index.html` and find the line that starts with:
```
const ACTIONS = [
```
Note the line number.

**Step 2:** Find the closing `];` that ends the ACTIONS array. Note that line number too.

**Step 3:** Replace everything between (and including) `const ACTIONS = [` and its closing `];` with the corrected array below.

**Do not change anything else in the file** — not the HTML, not the CSS, not any other JavaScript. Only replace the ACTIONS array.

---

## CORRECTED ACTIONS ARRAY

Replace with the full contents of the file:
`prompts/actions-corrected.js`

(Copy the entire `const ACTIONS = [ ... ];` block from that file and use it as the replacement.)

---

## AFTER REPLACING

Please confirm:
1. How many total actions are now in the array?
2. How many are `actionType: 'personal'`?
3. How many are `actionType: 'community'`?
4. How many are `actionType: 'political'`?
5. Are there any duplicate IDs?

Expected answers: 190 total — 108 personal, 60 community, 23 political, 0 duplicates.
