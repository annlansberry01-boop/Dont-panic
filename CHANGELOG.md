# Changelog

## 10 July 2026 — Cost/impact scoring corrections

Rendered the book's PDF table pages (2 Jul 2026 final version) as images to read the colour-coded cost/impact quadrants directly, replacing earlier guesswork-based scores that were assigned without seeing the colours. Corrected 32 actions across 6 chapters in both `prompts/actions-corrected.js` and `index.html`.

**Energy** (1 fix)
- `induction-cooking`: impact 3→2 (was miscategorised as High Impact/High Cost; book places it Low Impact/High Cost)

**Transport** (5 fixes)
- `get-an-e-bike`: cost 3→2
- `use-car-sharing`: cost 2→3
- `drive-less`: impact 3→2
- `buy-a-bike`: impact 3→2
- `test-walk-ride-bus-train`: impact 3→2

**Nature** (14 fixes)
- `indigenous-garden`: cost 3→2
- `bird-boxes`: impact 2→3
- `bush-walks-often`: impact 2→3
- `leave-mess-insects`: impact 2→3
- `nature-sitting-spot`: impact 1→3
- `nature-covenant`: cost 2→3
- `donate-conservation`: cost 2→3
- `do-all-other-actions`: cost 1→3
- `frog-pond`: cost 2→3
- `slow-stormwater`: cost 1→3, impact 2→3
- `collect-rainwater`: cost 2→3, impact 2→3
- `plant-pollinators`: impact 3→2
- `plant-native-tree`: impact 3→2
- `hike-nature`: cost 1→3

**Food** (7 fixes)
- `buy-what-you-need`: impact 2→3
- `eat-leftovers`: impact 2→3
- `buy-seasonal`: impact 2→3
- `wicking-bed`: cost 2→3
- `fruit-trees`: cost 2→3
- `eat-less-meat`: impact 3→2
- `chook-shed`: impact 3→2

**Money** (5 fixes)
- `use-less-power`: impact 2→3
- `waste-less-food`: impact 2→3
- `switch-super`: moneyAngle 'invest'→'save'
- `shift-shares`: moneyAngle 'invest'→'save'
- `switch-banks`: moneyAngle 'invest'→'save'

(Reasoning for the moneyAngle change: divesting super/shares/banking isn't new spending, and the book places these actions on the Low Cost/Save side of its table, not the Good Investment side.)

**Stuff chapter**: confirmed to have no cost/impact table in the book — no changes needed.

**Also fixed**: stray trailing null bytes at the end of both `index.html` and `prompts/actions-corrected.js` (pre-existing sync corruption, unrelated to the data fix, would have broken JS parsing on next load).

Full before/after tables with book page references are in `session-memory.md`.

Files changed: `index.html`, `prompts/actions-corrected.js` (both uncommitted as of this writing — `git status` on `master`, up to date with `origin/master`).

Note: `.claude/worktrees/flamboyant-volhard-6173a3/` contains a stale worktree copy of `index.html` with a broken git reference (points to a Windows path that doesn't resolve from a Linux session). It was not touched and is not the live source — the root `index.html` is.
