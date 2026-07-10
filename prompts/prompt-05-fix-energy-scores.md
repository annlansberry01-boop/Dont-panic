# Claude Code Prompt: Fix Energy Action Impact Scores

Paste into Claude Code in the `dont-panic-planner` project folder. Only touches `index.html`.

---

## PROBLEM

The book's Energy chapter puts these actions in the **High Impact / Low Cost** quadrant, but they were given impact scores of 1–2 in the ACTIONS array. The low-cost-high-impact filter uses `cost <= 2 && impact >= 3`, so most of them are invisible when that filter is selected.

---

## CHANGES — find each action by `id` and update its `impact` value

In the `ACTIONS` array in `index.html`, find and update these 8 actions:

| id | Current impact | New impact | Reason |
|----|---------------|------------|--------|
| `open-windows` | 1 | **3** | Book: High Impact / Low Cost |
| `dress-up-heater` | 1 | **3** | Book: High Impact / Low Cost |
| `shorter-showers` | 2 | **3** | Book: High Impact / Low Cost |
| `heat-spaces` | 2 | **3** | Book: High Impact / Low Cost |
| `seal-gaps` | 2 | **3** | Book: High Impact / Low Cost |
| `led-lights` | 2 | **3** | Book: High Impact / Low Cost |
| `deciduous-vine` | 2 | **3** | Book: High Impact / Low Cost |
| `install-energy-meter` | 2 | **1** | Book: explicitly Low Impact |

No other changes. Do not touch any other actions, code, styles, or HTML.

---

## AFTER MAKING CHANGES

How many Energy personal actions now have `cost: 1` and `impact >= 3`?
Expected answer: **9** (the 7 fixed above + `buy-green-power` + `conversations-energy`)
