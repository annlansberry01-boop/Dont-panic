# Don't Panic App — Session Memory
*Last updated: 10 July 2026*

## Purpose & context

Ann is building two companion apps to *Don't Panic*, a practical sustainability action guide for Australians by Ian McBurney. Ann is a code beginner on Windows. Ask before creating files/artifacts. Use markdown.

---

## CRITICAL: OneDrive sync lag between bash and file tools

Discovered 10 Jul 2026: the `mcp__workspace__bash` tool sees a **stale, laggy view** of files under the OneDrive-synced "Dont panic" folder — potentially minutes behind. The Read/Edit/Write/Grep/Glob tools are instant and authoritative.

**Rule: never use bash (sed, cat >, cp, etc.) to write to any file in this folder.** A `sed -i` line-range delete on `index.html` used bash's stale line numbers and silently deleted the wrong ~130 lines (cut off the entire end of the `App()` function, including `root.render`), even though the Edit tool's own view of the file was correct at the time. It was NOT caught until a Babel syntax check on a bash-read copy failed.

**Safe pattern going forward:**
- All edits to files in this folder: use the **Edit tool only**. Never bash/sed/cp for writes.
- All verification/syntax checks: use **Read and Grep tools**, not bash `cat`/`wc`/`node --check`. If you must check syntax with a real JS parser (Babel), copy the file to the **outputs folder** first via `cp` (read-only from OneDrive side is fine — bash CAN read, just don't trust it as fresh), but even then re-verify critical sections with Read afterward since the copy itself may be stale.
- If bash absolutely must touch this folder, treat its view as unreliable and re-confirm anything important via Read/Grep before acting on it.
- Recovery when this bites you: the repo is git-tracked (`master`, tracks `origin/master`). `git show HEAD:<file>` gives a clean reference copy — but writing it back must go through Write/Edit, not `git checkout` (that also failed with "Operation not permitted: unlink" from bash on this mount).

---

## App 1: Don't Panic Planner

Live Netlify URL: `jovial-semolina-6babd6.netlify.app`
**Source file: `C:\Users\annla\OneDrive\Documents\Dont panic\index.html`** (the repo root file — confirmed 10 Jul 2026 by fetching the live Netlify URL and matching meta tags, plus `git status` showing this file on `master`, up to date with `origin/master`).

**Correction:** the `.claude\worktrees\flamboyant-volhard-6173a3\index.html` path mentioned in earlier notes is NOT the live source. It's a stale worktree with a broken git reference (points to a Windows path that doesn't resolve from a Linux session) and a completely different/older app version. Don't edit it, don't treat it as truth.

Also note: `src/` (App.jsx, components/*.jsx, a proper Vite project) is **also stale/unused** — its git history is corrupted and it's not what's deployed. All real work happens in the single-file `index.html`.

Actions data (source of truth for the raw data, mirrored into `index.html`'s inline ACTIONS array): `C:\Users\annla\OneDrive\Documents\Dont panic\prompts\actions-corrected.js`

### Action data structure
- 191 actions: 108 personal, 60 community, 23 political (the "190" in older notes was a stale comment in the file, off by one — not a data bug)
- `actionType`: personal / community / political
- `theme`: transport, energy, stuff, nature, food, money
- `cost` and `impact`: 1 (low) → 5 (high)
- `moneyAngle`: 'save' or 'invest' (cross-listed actions)
- `altTheme`: secondary theme for money-primary actions

### App structure (as of 10 Jul 2026)
- Nav tabs: Manage (`myPlan`, the editable/draggable plan — now the **default landing tab**), All Actions, Reminders, Profile.
- The old "Your Plan" tab/screen (static summary with Share+Print) has been **removed entirely** per Ian's request. Its Share logic (`buildShareText`/`handleShare`) was migrated into `MyPlan` — Manage now has its own Share button (Web Share API, falls back to clipboard copy). Print was dropped (wasn't requested); if it's wanted back later it'll need a new home since the only Print button lived on the deleted screen.
- Drag-and-drop implemented directly in `MyPlan`/`ActionCardPlan` in `index.html` (native touch+mouse events, 300ms hold delay, ghost card follows pointer, year-bucket sections highlight as drop zones via `data-drop-year` attribute). This works differently from `prompt-02-drag-to-move.md`'s original design (which targeted the stale `src/App.jsx`/`MyPlan.jsx` files) — that prompt is now superseded/obsolete, kept for reference only.
- Known minor dead code from the Your Plan removal (harmless, not cleaned up): `handleSwitchPlanType` in `App()` is now unused (plan-type switching UI had no other home — flag to Ian if that feature should live somewhere else, e.g. Profile). `SprintList` component (list-style sprint view) is also now unused since only `YourPlan` rendered it; `SprintCards` (grid-style, used in Manage) is unaffected.

### Prompts folder status
- `prompt-04-dual-category-filter.md` — **already run**, confirmed applied in `index.html` (filter logic + all 18 `altTheme` tags present).
- `prompt-05-fix-energy-scores.md` — **DO NOT RUN. Contains wrong scores.** Still not deleted — do it next time.
- `prompt-02-drag-to-move.md` — **superseded.** Drag-and-drop is implemented (see above), but not via this prompt since it targeted the wrong file structure. Prompt left in place for reference/history only.
- `prompt-06-fix-cost-impact-scores.md` — the scoring corrections prompt, already applied to both `index.html` and `actions-corrected.js`, kept for reproducibility on a fresh checkout.

---

## CRITICAL: Book colour-coded tables — the core problem

Every chapter in the book has a "Personal Action: What Can I Do?" table that sorts actions into a 2×2 grid by cost and impact. The grid cells are colour-coded:
- **Dark green** = High Impact, Low Cost
- **Light green** = Low Cost, Low Impact
- **Light pink** = High Cost, High Impact
- **Dark pink** = High Cost, Low Impact

**The problem:** When Claude reads the PDF as text (using the Read tool on the PDF directly), ALL colour information is lost. Claude just gets a flat list of action names with no way to tell which quadrant they belong to. As a result, the cost/impact scores in `actions-corrected.js` were assigned by guesswork and are likely wrong across all 6 chapters. This caused a real bug: the low-cost/high-impact filter in the app was showing the wrong actions.

**The fix:** Render each table page as a PNG image using PyMuPDF, then use the Read tool on the PNG. Claude can see the colours in the image and correctly assign scores. This has been confirmed working for the energy chapter.

**Do NOT use the Read tool directly on the PDF to get scores** — it will not show colours and will produce wrong results again.

### How to render a table page as an image

The PDF (`Dont Panic 2 Jul 2026.pdf`) is in the uploads folder. In a new session it will be at a different `/sessions/...` path — find it with:
```bash
find /sessions -name "Dont Panic*.pdf" 2>/dev/null
```

Install PyMuPDF if needed: `pip install PyMuPDF --break-system-packages`

**PDF page offset:** book page number + 2 = PDF 0-indexed page (e.g., book p.99 = PDF index 101)

Render a page:
```python
import fitz
doc = fitz.open("/sessions/XXXX/mnt/uploads/Dont Panic 2 Jul 2026.pdf")
page = doc[101]  # book page 99 = index 101
mat = fitz.Matrix(2, 2)
pix = page.get_pixmap(matrix=mat)
pix.save("/sessions/XXXX/mnt/outputs/page_101.png")
doc.close()
```
Then use the Read tool on the saved PNG path to see the colours.

**Table pages still to do** (energy is done — see below):
- Transport personal actions table
- Stuff personal actions table
- Nature personal actions table
- Food personal actions table
- Money personal actions table

Find the right page numbers by searching the PDF text for "Personal Action: What Can I Do?" headings near each chapter.

---

## Energy chapter — CONFIRMED CORRECT scores (book p.99, PDF index 101)

### High Impact / Low Cost (cost ≤ 2, impact ≥ 3)
| Action | ID | cost | impact |
|--------|----|------|--------|
| Teach and learn / Have change conversations | conversations-energy | 1 | 4 |
| Insulate the roof | insulate-roof | 2 | 4 |
| Seal all gaps | seal-gaps | 1 | 4 |
| Open windows on summer nights | open-windows | 1 | 4 |
| Insulate the floor | insulate-floor | 2 | 4 |
| Grow a deciduous tree/vine | deciduous-vine | 2 | 3 |
| Buy Green power | buy-green-power | 1 | 3 |

### High Impact / High Cost (cost ≥ 3, impact ≥ 3)
| Action | ID | cost | impact |
|--------|----|------|--------|
| Get Solar PV | get-solar | 4 | 5 |
| Renovate the house | renovate-house | 5 | 5 |
| Get a hot water heat pump | hot-water-pump | 4 | 4 |
| Get a battery | get-battery | 4 | 4 |
| Upgrade to 5-6 star appliances | upgrade-appliances | 3 | 3 |
| Get electric heating/cooling | electric-heating | 3 | 4 |
| Get Induction cooking | get-induction | 3 | 4 |

### Low Impact / Low Cost (cost ≤ 2, impact ≤ 2)
| Action | ID | cost | impact |
|--------|----|------|--------|
| Dress up to keep the heater down | dress-up-heater | 1 | 2 |
| Have shorter showers | shorter-showers | 1 | 2 |
| Insulate the walls | insulate-walls | 2 | 2 |
| Heat the spaces you're in | heat-spaces | 1 | 2 |
| Change the lights to LED | led-lights | 1 | 2 |
| Install an energy meter | install-energy-meter | 1 | 1 |

### Low Impact / High Cost (cost ≥ 3, impact ≤ 2)
| Action | ID | cost | impact |
|--------|----|------|--------|
| Double glaze the windows | double-glaze | 4 | 2 |

---

## ERROR FOUND in "confirmed" Energy scores

Re-checked the energy table image closely (10 Jul 2026 session) and found one mistake in the table above:

- **Get Induction cooking (`induction-cooking`)** is actually in the **dark pink (Low Impact / High Cost)** cell, not High Impact/High Cost as recorded above. Current file has `cost: 3, impact: 3`. Cost bucket is fine (High Cost) but impact bucket is wrong — should be Low Impact (impact ≤ 2, e.g. impact 2), matching "Double glaze the windows" in the same cell-column. **Not yet fixed in `actions-corrected.js` — needs fixing.**

---

## Transport chapter — CONFIRMED scores (book p.85, PDF index 87)

### High Impact / Low Cost (cost ≤ 2, impact ≥ 3)
| Action | ID | cost | impact |
|--------|----|------|--------|
| Teach and learn / Have change conversations / Write to local papers and Council | conversations-transport, write-council-transport | 1 | 3 |
| Get a bus often / Get a train often | catch-bus-or-train | 1 | 3 |
| Walk often / Ride often / Sell two cars | walk-often, ride-often, ditch-two-cars | 1 | 3–5 |
| Sell a car | ditch-one-car | 1 | 4 |
| Buy an e-bike | get-an-e-bike | 2 | 4 |

### High Impact / High Cost (cost ≥ 3, impact ≥ 3)
| Action | ID | cost | impact |
|--------|----|------|--------|
| Move closer to work, school and shops | move-closer-to-work | 4 | 4 |
| Buy an EV | buy-an-ev | 5 | 5 |
| Use car sharing | use-car-sharing | 3 | 3 |

### Low Impact / Low Cost (cost ≤ 2, impact ≤ 2)
| Action | ID | cost | impact |
|--------|----|------|--------|
| Drive less, drive smooth, service often / Drop the kids 500m from school | drive-less, drop-kids-500m | 1 | 2 |
| Buy a bike | buy-a-bike | 2 | 2 |
| Test a combination of walking, riding, bus and train to work | test-walk-ride-bus-train | 1 | 2 |
| Get bike ready | get-bike-ready | 1 | 2 |
| Try walking / Try riding | try-walking, try-riding-a-bike | 1 | 1 |
| Try a bus / Try a train | try-catching-a-bus, try-a-train | 1 | 1 |

### Low Impact / High Cost
None — this quadrant is empty in the book for Transport.

### ⚠ Mismatches vs current `actions-corrected.js` (bucket-level: cost ≤2/≥3, impact ≤2/≥3)
- `get-an-e-bike` — file has cost **3** (High), book shows Low Cost → should be cost ≤2
- `use-car-sharing` — file has cost **2** (Low), book shows High Cost → should be cost ≥3
- `drive-less` — file has impact **3** (High), book shows Low Impact → should be impact ≤2
- `buy-a-bike` — file has impact **3** (High), book shows Low Impact → should be impact ≤2
- `test-walk-ride-bus-train` — file has impact **3** (High), book shows Low Impact → should be impact ≤2

---

## Nature chapter — CONFIRMED scores (book p.130, PDF index 132)

### High Impact / Low Cost (cost ≤ 2, impact ≥ 3)
| Action | ID | cost | impact |
|--------|----|------|--------|
| Be a responsible pet owner | responsible-pet-owner | 1 | 3 |
| Create an indigenous garden | indigenous-garden | 2 | 4 |
| Teach and learn / Have change conversations | conversations-nature | 1 | 3 |
| Install bird boxes | bird-boxes | 1 | 3 |
| Plant the nature strip with natives | nature-strip-natives | 1 | 3 |
| Go for regular bush walks | bush-walks-often | 1 | 3 |
| Leave logs and stones in your garden for insect/reptile habitat | leave-mess-insects | 1 | 3 |
| Create a small native garden | small-native-garden | 2 | 3 |
| Create a nature sitting spot in your garden | nature-sitting-spot | 1 | 3 |

### High Impact / High Cost (cost ≥ 3, impact ≥ 3)
| Action | ID | cost | impact |
|--------|----|------|--------|
| Put a nature covenant on your land | nature-covenant | 3 | 5 |
| Buy a block of degraded land and restore it | restore-degraded-land | 5 | 5 |
| Donate money to local conservation projects | donate-conservation | 3 | 4 |
| Do all the energy, transport and stuff actions | do-all-other-actions | 3 | 5 |
| Build a frog pond / Slow and retain stormwater | frog-pond, slow-stormwater | 3 | 3 |
| Collect and use your own rainwater | collect-rainwater | 3 | 3 |

### Low Impact / Low Cost (cost ≤ 2, impact ≤ 2)
| Action | ID | cost | impact |
|--------|----|------|--------|
| Plant for local pollinators | plant-pollinators | 1 | 2 |
| Plant a native tree, shrub and grass | plant-native-tree | 1 | 2 |
| Plant for summer shade and winter sun | plant-summer-shade | 1 | 2 |
| Go for a local bush walk / Keep a bird sighting list | bush-walk, keep-bird-list | 1 | 1 |
| Buy local bird, plant, insect and reptile guides | buy-nature-guides | 1 | 1 |

### Low Impact / High Cost (cost ≥ 3, impact ≤ 2)
| Action | ID | cost | impact |
|--------|----|------|--------|
| Hike in nature often | hike-nature | 3 | 2 |

### ⚠ Mismatches vs current `actions-corrected.js` (bucket-level)
- `indigenous-garden` — file cost **3** (High); book shows Low Cost → should be ≤2
- `bird-boxes` — file impact **2** (Low); book shows High Impact → should be ≥3
- `bush-walks-often` — file impact **2** (Low); book shows High Impact → should be ≥3
- `leave-mess-insects` — file impact **2** (Low); book shows High Impact → should be ≥3
- `nature-sitting-spot` — file impact **1** (Low); book shows High Impact → should be ≥3
- `nature-covenant` — file cost **2** (Low); book shows High Cost → should be ≥3
- `donate-conservation` — file cost **2** (Low); book shows High Cost → should be ≥3
- `do-all-other-actions` — file cost **1** (Low); book shows High Cost → should be ≥3
- `frog-pond` — file cost **2** (Low); book shows High Cost → should be ≥3
- `slow-stormwater` — file cost **1**, impact **2** (Low/Low); book shows High Cost/High Impact → should be ≥3/≥3
- `collect-rainwater` — file cost **2**, impact **2** (Low/Low); book shows High Cost/High Impact → should be ≥3/≥3
- `plant-pollinators` — file impact **3** (High); book shows Low Impact → should be ≤2
- `plant-native-tree` — file impact **3** (High); book shows Low Impact → should be ≤2
- `hike-nature` — file cost **1** (Low); book shows High Cost → should be ≥3

That's 14 of 23 nature personal actions in the wrong bucket — largest error count of any chapter so far.

---

## Food chapter — CONFIRMED scores (book p.148, PDF index 150)

### High Impact / Low Cost (cost ≤ 2, impact ≥ 3)
| Action | ID | cost | impact |
|--------|----|------|--------|
| Teach and learn / Have change conversations | conversations-food | 1 | 3 |
| Become vegan | become-vegan | 1 | 5 |
| Buy the food you need / Eat leftovers / Eat less red meat | buy-what-you-need, eat-leftovers, eat-less-red-meat | 1 | 3 |
| Become vegetarian / Grow your own veggies | become-vegetarian, grow-own-veggies | 1–2 | 3–4 |
| Buy seasonal food / Eat less dairy | buy-seasonal, eat-less-dairy | 1 | 3 |
| Buy local, organic and regenerative | buy-local-organic | 2 | 4 |

### High Impact / High Cost (cost ≥ 3, impact ≥ 3)
| Action | ID | cost | impact |
|--------|----|------|--------|
| Build your own wicking veggie bed | wicking-bed | 3 | 3 |
| Plant and manage your own fruit trees | fruit-trees | 3 | 3 |

### Low Impact / Low Cost (cost ≤ 2, impact ≤ 2)
| Action | ID | cost | impact |
|--------|----|------|--------|
| Eat less meat | eat-less-meat | 1 | 2 |
| Grow your own herbs | grow-own-herbs | 1 | 2 |
| Try buying less red meat | less-red-meat-try | 1 | 1 |

### Low Impact / High Cost (cost ≥ 3, impact ≤ 2)
| Action | ID | cost | impact |
|--------|----|------|--------|
| Build your own chook shed | chook-shed | 3 | 2 |

### ⚠ Mismatches vs current `actions-corrected.js` (bucket-level)
- `buy-what-you-need` — file impact **2** (Low); book shows High Impact → should be ≥3
- `eat-leftovers` — file impact **2** (Low); book shows High Impact → should be ≥3
- `buy-seasonal` — file impact **2** (Low); book shows High Impact → should be ≥3
- `wicking-bed` — file cost **2** (Low); book shows High Cost → should be ≥3
- `fruit-trees` — file cost **2** (Low); book shows High Cost → should be ≥3
- `eat-less-meat` — file impact **3** (High); book shows Low Impact → should be ≤2
- `chook-shed` — file impact **3** (High); book shows Low Impact → should be ≤2 (cost bucket is already correct)

---

## Money chapter — CONFIRMED scores (book p.168, PDF index 170)

Note: this chapter's table uses **Low Cost vs Good Investment** as the horizontal axis, not Low/High Cost. "Good Investment" = book's `moneyAngle: 'invest'`; "Low Cost" side = `moneyAngle: 'save'` (or no angle, e.g. teach & learn).

### High Impact / Low Cost·Save (impact ≥ 3)
| Action | ID | impact | moneyAngle |
|--------|----|--------|--------|
| Teach and learn / Have change conversations | conversations-money | 3 | — |
| Take your super and shares and banking out of coal, oil and gas | switch-super, shift-shares, switch-banks | 4–5 | **should be 'save', not 'invest'** |
| Drive less | drive-less-money | 3 | save ✓ |
| Use less power | use-less-power | 3 | save (file has impact 2 — wrong) |
| Waste less food | waste-less-food | 3 | save (file has impact 2 — wrong) |
| Buy less red meat | buy-less-red-meat | 3 | save ✓ |
| Buy less stuff | buy-less-stuff | 3 | save ✓ |

### High Impact / Good Investment (impact ≥ 3)
| Action | ID | impact | moneyAngle |
|--------|----|--------|--------|
| Invest in community renewable energy projects | invest-community-energy | 4 | invest ✓ |
| Invest in an efficient, electric, solar powered home renovation | invest-home-reno | 5 | invest ✓ |
| Invest in Solar PV | invest-solar | 4 | invest ✓ |
| Invest in an EV | invest-ev | 5 | invest ✓ |
| Invest in an electric home | electrify-house | 5 | invest ✓ |

### Spans both columns (book draws this action across the full width)
| Action | ID |
|--------|----|
| Donate to local community people, projects and places | donate-local-projects |

### Low Impact / Low Cost·Save (impact ≤ 2)
| Action | ID | impact |
|--------|----|--------|
| Try shorter showers | try-shorter-showers | 1 |
| Try using less power | try-less-power-money | 1 |
| Try buying less meat | try-less-meat-money | 1 |

### Low Impact / Good Investment
None — empty in the book.

### ⚠ Mismatches vs current `actions-corrected.js`
- `use-less-power` — file impact **2** (Low); book shows High Impact → should be ≥3
- `waste-less-food` — file impact **2** (Low); book shows High Impact → should be ≥3
- `switch-super`, `shift-shares`, `switch-banks` — currently tagged `moneyAngle: 'invest'`; book places "take money out of coal/oil/gas" on the **Low Cost/Save** side, not Investment. Divesting isn't new spending, so `moneyAngle` should probably be `'save'` for all three.
- `donate-local-projects` — book draws this spanning both sides. Current `moneyAngle: 'invest'` is a reasonable single choice, but worth noting it's genuinely dual-purpose.

---

## Stuff chapter

No cost/impact table exists for this chapter — book explicitly says it's not relevant (all stuff actions are small, ongoing, money-saving habits). Nothing to render or fix here.

---

## Summary: total bucket-level errors found across all chapters (10 Jul 2026 session)

- Energy: 1 (`induction-cooking` impact bucket)
- Transport: 5
- Nature: 14
- Food: 7
- Money: 2 impact errors + 3 moneyAngle mislabels

None of these have been written back to `actions-corrected.js` yet — the table above is the reference for doing that fix.

---

## Next session — what to do

1. Decide whether to fix `actions-corrected.js` now using the mismatch tables above (recommended — this is the actual bug fix).
2. After fixing scores, write a new prompt to replace the ACTIONS array in `index.html`.
3. Run `prompt-04-dual-category-filter.md` in Claude Code (still ready, untouched).
4. Delete `prompt-05-fix-energy-scores.md` — confirmed still wrong, not needed now that the fix list above exists.
5. Lower priority: drag-to-move, "ask for help", commenting features.

---

## App 2: Don't Panic Social

- Stage 1 COMPLETE: auth + user profile (name, email, suburb, postcode, state). No profile photos.
- Supabase connected; email confirmation off for MVP.
- Next: two post types, feed logic, connections via comment threads
- **Strict rule:** never touch `dont-panic-planner/` from Social work

---

## Tools
- Netlify (auto-deploy from GitHub), Git on Windows
- Supabase (Social only), Claude Code, Vite
- Book: *Don't Panic* by Ian McBurney, final version 2 Jul 2026
