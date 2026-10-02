# Don't Panic Planner: Design Rules

## Purpose
This app is embedded in ianmcburney.com (Squarespace) through an iframe.
It must look like a native part of that site. Follow these rules on every change.
Styling and layout only. Never alter app logic, action data or plan behaviour.

## Colour
| Token | Value | Use |
|---|---|---|
| --bg | #FFFFFF | Page and card background |
| --text | #000000 | Headings and body text |
| --text-muted | #555555 | Secondary text, helper notes |
| --border | #E5E5E3 | Card borders, dividers |
| --button | #000000 | Primary button background |
| --accent | #E19167 | Active tab underline, ticks, highlight borders |
| --accent-dark | #C36F42 | Large accent text only (20px and above) |

- No dark backgrounds anywhere, including the start screen.
- Orange is the only accent. Never use it for small text.
- Maroon (#4D0000) belongs to Ian's quotes section. Do not use it in the app.

## Category labels
Cards are white with a 1px --border. Colour appears only in the category label.
Energy #9A5B00, Food #4F7A1F, Transport #1F6FB2, Money #5B4FC4,
Nature #0F7B5F, Stuff #B5502E.
Check each has at least 4.5:1 contrast on white and darken where needed.

## Typography
Load from Google Fonts: Bodoni Moda (400, 700) and Outfit (300, 600, 700).
These are free stand-ins for the site's LTC Bodoni 175 and Sofia Pro.

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Page heading | Bodoni Moda | clamp(32px, 4vw, 44px) | 700 | letter-spacing -0.02em |
| Section heading | Bodoni Moda | 24px | 400 | |
| Body | Outfit | 16px | 300 | line-height 1.7, letter-spacing 0.01em |
| Emphasis | Outfit | 16px | 700 | |
| Card text | Outfit | 15px | 300 | line-height 1.4 |
| Labels, tabs, buttons | Outfit | 12px | 600 | UPPERCASE, letter-spacing 0.1em |

Remove Inter entirely.

## Components
- Primary button: black background, white label text, 10px radius,
  minimum height 44px, no shadow.
- Secondary button: white background, 1px black border, black label text.
- Form fields: white, 1px --border, 10px radius, 16px text.
- Cards: white, 1px --border, 10px radius, no shadow.
- Tabs: text only, no emoji or icons. Active tab has a 2px --accent underline.
- Spacing: generous white space. 24px between blocks on mobile, 40px on desktop.

## Layout
- Remove the app's own "Don't Panic" header bar. The Squarespace page supplies the title.
- Tabs sit at the top of the app: Manage, All Actions, Profile.
- Remove the Reminders tab and its screen. Change nothing else in the logic.
- Show life stage and progress count as one quiet line under the tabs.
- Mobile first. Widen on desktop to a maximum of 1040px, centred.
- Action cards: 2 columns on phones, 3 from 700px, 4 from 1000px.

## Embed rules (never break these)
- No position: fixed or position: sticky.
- No 100vh or 100dvh heights. The app grows to the height of its content.
- No internal scrolling areas. The parent page does the scrolling.
- Background stays white so the iframe edge is invisible.
- Report content height to the parent page with window.parent.postMessage
  whenever the height changes, so the iframe can resize itself.
- Keep EMBED.md up to date with the exact iframe snippet for Squarespace,
  including the small script that listens for the height message.
- Download must work from inside the iframe. Printed output is white with black text.
