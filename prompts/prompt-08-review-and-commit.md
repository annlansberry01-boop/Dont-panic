# Claude Code Prompt: Review and Commit — Landing Screen, Share Button, Drag-and-Drop

Paste this into Claude Code when you're in the `dont-panic-planner` project folder (on your local machine, not through any synced/remote copy).

---

## CONTEXT

`index.html` and `session-memory.md` have uncommitted changes from a Cowork session. Three things changed in `index.html`:

1. **Removed the "Your Plan" tab/screen entirely.** The app now defaults to and only has "Manage" (`activeTab` default changed from `'yourPlan'` to `'myPlan'`, the `YourPlan` component and its nav entry are deleted).
2. **Added a Share button to Manage.** The existing share-to-text logic (`buildShareText`/`handleShare`, Web Share API with clipboard fallback) was moved from the deleted `YourPlan` component into `MyPlan`, with a toolbar at the top of the screen.
3. **Drag-and-drop for action cards.** Press-and-hold a card for 300ms to pick it up (short taps still open the bottom sheet as before), a ghost card follows the pointer/finger, year-bucket sections highlight as drop targets, releasing over a bucket moves the action there via the existing `handleMove`. Built with native mouse/touch events directly in `index.html` — no libraries.

`session-memory.md` also has notes on all of this plus an important operational note about a sync-lag bug encountered mid-session (see below).

---

## STEP 1 — Check for a stale git lock

Before anything else, check whether `.git/index.lock` exists in the repo root:

```bash
ls -la .git/index.lock 2>&1
```

If it exists and no other git process is actually running, delete it:

```bash
rm .git/index.lock
```

(This showed up as a permission error from a different environment during the Cowork session — it may or may not be present on your machine. If `git status` already works fine, skip this step.)

---

## STEP 2 — Review the diff carefully

Run:

```bash
git diff index.html
```

Read through it. Specifically confirm:
- The `YourPlan` function is fully removed (search the diff for `function YourPlan` — should only appear on `-` lines, never `+`).
- `NAV_TABS` no longer has a `yourPlan` entry.
- `MyPlan`'s signature includes `onMove`, and its return JSX includes a `.your-plan-toolbar` div with a Share button.
- New CSS classes present: `.action-card--dragging`, `.drag-ghost`, `.drag-ghost-card`, `.bucket--drop-active`.
- `ActionCardPlan` takes new optional props `dragging`, `onPressStart`, `onPressEnd`.
- The file still ends correctly with `root.render(<App />);`, `</script>`, `</body>`, `</html>` — this is the one part worth double-checking closely, since a prior sync bug in the Cowork session briefly truncated this exact section (caught and fixed there, but worth your own eyes on it too).

If anything in the diff looks incomplete, truncated, or like it cuts off mid-statement, **stop and flag it** rather than committing — don't try to fix it blind.

---

## STEP 3 — Sanity-check the file runs

Open `index.html` directly in a browser (double-click it, or `open index.html` / drag into a browser tab) and confirm:
- It loads without a blank screen or console errors.
- If you already have a user saved (from before), it should land on "Manage", not "Your Plan".
- The Share button appears at the top of Manage.
- Press-and-hold a card in a year bucket — after about 300ms it should visually lift and a ghost card should follow your cursor; dropping it on another year bucket should move it there.

---

## STEP 4 — Commit

If everything above checks out, commit with:

```bash
git add index.html session-memory.md
git commit -m "Remove Your Plan screen, add Share to Manage, implement drag-and-drop

- App now lands on Manage (editable plan) instead of the old static
  Your Plan summary screen, which has been removed entirely.
- Share button added to Manage, reusing the existing share-to-text
  logic (Web Share API with clipboard fallback).
- Drag-and-drop implemented natively (no libraries): press-and-hold
  300ms to pick up a card, ghost card follows pointer/finger, year
  buckets highlight as drop targets.
- prompt-02-drag-to-move.md is now superseded — it targeted a stale
  src/ Vite project that isn't the live app; this was implemented
  directly against index.html instead."
```

Adjust the message if your own review turned up something different from what's described above.

---

## AFTER COMMITTING

Please confirm:
1. Did the diff review in Step 2 turn up anything unexpected?
2. Did the manual browser check in Step 3 work as described?
3. Push when you're ready — that triggers the Netlify auto-deploy.
