# Claude Code Prompt: Fix Cost/Impact Scoring Errors

Paste this into Claude Code when you're in the `dont-panic-planner` project folder.
This touches `index.html` and `prompts/actions-corrected.js`.

If these files already show the fixes below applied, no action is needed —
this prompt is here so the fix can be reproduced on a fresh checkout if needed.

---

## CONTEXT

The cost/impact scores in the ACTIONS array were originally assigned by reading
the book's PDF as flat text, which loses all colour information from the
"Personal Action: What Can I Do?" cost/impact tables. Re-rendering those table
pages as images and reading the colours directly found 32 actions sitting in
the wrong bucket (cost ≤2 vs ≥3, impact ≤2 vs ≥3) — mismatched against what
the book's own table shows.

---

## CHANGES NEEDED

Find each `id` in the ACTIONS array (in both `index.html` and
`prompts/actions-corrected.js`) and update the fields shown. Only the fields
listed change — leave `title`, `theme`, `actionType`, and any existing
`moneyAngle`/`altTheme` fields alone unless a moneyAngle change is explicitly
listed below.

**Energy**
```
induction-cooking       → impact: 2   (was 3)
```

**Transport**
```
get-an-e-bike           → cost: 2     (was 3)
use-car-sharing         → cost: 3     (was 2)
drive-less              → impact: 2  (was 3)
buy-a-bike              → impact: 2  (was 3)
test-walk-ride-bus-train→ impact: 2  (was 3)
```

**Nature**
```
indigenous-garden       → cost: 2     (was 3)
bird-boxes              → impact: 3  (was 2)
bush-walks-often        → impact: 3  (was 2)
leave-mess-insects      → impact: 3  (was 2)
nature-sitting-spot     → impact: 3  (was 1)
nature-covenant         → cost: 3     (was 2)
donate-conservation     → cost: 3     (was 2)
do-all-other-actions    → cost: 3     (was 1)
frog-pond               → cost: 3     (was 2)
slow-stormwater         → cost: 3, impact: 3   (was cost 1, impact 2)
collect-rainwater       → cost: 3, impact: 3   (was cost 2, impact 2)
plant-pollinators       → impact: 2  (was 3)
plant-native-tree       → impact: 2  (was 3)
hike-nature             → cost: 3     (was 1)
```

**Food**
```
buy-what-you-need       → impact: 3  (was 2)
eat-leftovers           → impact: 3  (was 2)
buy-seasonal            → impact: 3  (was 2)
wicking-bed             → cost: 3     (was 2)
fruit-trees             → cost: 3     (was 2)
eat-less-meat           → impact: 2  (was 3)
chook-shed              → impact: 2  (was 3)
```

**Money**
```
use-less-power          → impact: 3            (was 2)
waste-less-food         → impact: 3            (was 2)
switch-super            → moneyAngle: 'save'   (was 'invest')
shift-shares            → moneyAngle: 'save'   (was 'invest')
switch-banks            → moneyAngle: 'save'   (was 'invest')
```

**Stuff chapter** — no changes. The book has no cost/impact table for this
chapter (confirmed: it's explicitly called out as "not relevant" in the text).

---

## ALSO CHECK

Both files sometimes pick up stray trailing null bytes at end-of-file from
OneDrive sync. Before committing, run:

```bash
python3 -c "
for f in ['index.html', 'prompts/actions-corrected.js']:
    data = open(f, 'rb').read()
    if b'\x00' in data:
        open(f, 'wb').write(data.replace(b'\x00', b''))
        print('cleaned', f)
"
```

---

## WHAT NOT TO CHANGE

- Do not touch the dual-category filter logic or `altTheme` fields — already applied (see `prompt-04-dual-category-filter.md`, already run)
- Do not change any styles, HTML structure, or other actions not listed above
- Do not touch `.claude/worktrees/` — it's a stale, disconnected worktree copy, not the live source

---

## AFTER MAKING CHANGES

Please confirm:
1. How many of the 32 listed fixes were actually applied (some may already be in place)?
2. Did `node --check` (or equivalent) pass on both files after editing?
3. Any null bytes found and cleaned?
