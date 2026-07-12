# Changelog

## 10 July 2026 — Remove Your Plan screen, add Share to Manage, drag-and-drop

Three changes to `index.html`, done in one session per Ian's request:

1. **Removed the "Your Plan" tab/screen entirely.** The app now lands on "Manage" (the editable plan view, `activeTab` default changed from `'yourPlan'` to `'myPlan'`) instead of the old static summary screen. The `YourPlan` component, its nav entry, and all references were deleted.
2. **Added a Share button to Manage.** Migrated the existing `buildShareText()`/`handleShare()` logic (Web Share API with clipboard-copy fallback) from the deleted `YourPlan` component into `MyPlan`, with a matching toolbar at the top of the screen. Print was not carried over (wasn't requested).
3. **Implemented drag-and-drop** so action cards can be dragged between year buckets in Manage: press-and-hold for 300ms (so normal taps still open the bottom sheet), a ghost card follows the pointer/finger, year buckets highlight as drop zones, drop commits the move via the existing `handleMove`. Built with native mouse/touch events directly in `index.html` (no libraries) since the drag-and-drop prompt on file (`prompt-02-drag-to-move.md`) targeted a separate, stale Vite project (`src/`) that isn't the live codebase — that prompt is now superseded.

Also confirmed via a live fetch of the Netlify site that `index.html` (repo root) is the actual deployed source — an earlier note pointing at a `.claude/worktrees/...` copy was wrong; that worktree has a broken git reference and is not connected to the live app.

**Process note:** hit and recovered from a real bug during this work — the bash tool's view of files in this OneDrive-synced folder can lag significantly behind the Edit tool's (potentially minutes). A `sed` line-delete run through bash used stale line numbers and deleted the wrong content, breaking the file. Recovered using `git show HEAD:index.html` as a reference and the Edit tool to patch it back. Full detail and the safe-editing rule going forward are in `session-memory.md`.

Known side effect: `handleSwitchPlanType` (the "switch plan type" feature, e.g. Standard → Quick Wins) had no UI outside the deleted Your Plan screen, so it's currently unreachable dead code. Flag to Ian — may need a new home (e.g. Profile) if that feature should stay.

---

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
