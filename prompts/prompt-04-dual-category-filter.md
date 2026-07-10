# Claude Code Prompt: Dual-Category Actions (Money ↔ Other Themes)

Paste this into Claude Code when you're in the `dont-panic-planner` project folder.
This only touches `index.html`.

---

## CONTEXT

In `index.html`, the `AllActions` filter already handles the Money direction correctly — when a user taps Money, it shows:
- Actions with `theme: 'money'`
- Actions from other themes that have a `moneyAngle` field

The filter logic is around line 1148–1156 and looks like this:
```js
const themeMatch = themeFilter === 'All'
  ? true
  : isMoneyView ? (a.theme === 'money' || !!a.moneyAngle)
  : a.theme === themeFilter.toLowerCase();
```

Ian wants the **reverse** to also work: money-primary actions that belong to another category should also appear when that other category is tapped.

---

## TWO CHANGES NEEDED

### Change 1 — Filter logic (one line)

Find this line (around line 1154):
```js
: a.theme === themeFilter.toLowerCase();
```

Replace with:
```js
: a.theme === themeFilter.toLowerCase() || a.altTheme === themeFilter.toLowerCase();
```

That's the only code change needed.

---

### Change 2 — Add `altTheme` to money-primary actions

In the ACTIONS array, find each of the following actions by their `id` and add the `altTheme` field shown:

**Money personal actions:**
```
id: 'try-shorter-showers'       → add  altTheme: 'energy'
id: 'try-less-power-money'      → add  altTheme: 'energy'
id: 'try-less-meat-money'       → add  altTheme: 'food'
id: 'drive-less-money'          → add  altTheme: 'transport'
id: 'use-less-power'            → add  altTheme: 'energy'
id: 'waste-less-food'           → add  altTheme: 'food'
id: 'buy-less-red-meat'         → add  altTheme: 'food'
id: 'buy-less-stuff'            → add  altTheme: 'stuff'
id: 'invest-solar'              → add  altTheme: 'energy'
id: 'electrify-house'           → add  altTheme: 'energy'
id: 'invest-ev'                 → add  altTheme: 'transport'
id: 'invest-home-reno'          → add  altTheme: 'energy'
id: 'invest-community-energy'   → add  altTheme: 'energy'
```

**Money community actions:**
```
id: 'collective-solar-farm'     → add  altTheme: 'energy'
id: 'collective-car-sharing'    → add  altTheme: 'transport'
id: 'collective-clothing-hire'  → add  altTheme: 'stuff'
id: 'parents-school-bushland'   → add  altTheme: 'nature'
id: 'donate-local-community'    → add  altTheme: 'nature'
```

---

## WHAT NOT TO CHANGE

- Do not change the Money filter logic (lines around 1153) — it already works correctly
- Do not change any other code, styles, or HTML
- Do not add `altTheme` to actions that already have `moneyAngle` — they already appear in the Money filter via that field

---

## AFTER MAKING CHANGES

Please confirm:
1. What line did you change for the filter?
2. How many actions did you add `altTheme` to?
3. Quick test: if a user taps "Energy", will `id: 'invest-solar'` (theme: money, altTheme: energy) now appear? Answer yes or no based on the new logic.
