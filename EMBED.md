# Embedding Don't Panic in Squarespace

The app reports its own height to the parent page via `window.parent.postMessage`
whenever its content changes size (see the `useEffect` near the top of `src/App.jsx`).
The snippet below listens for that message and resizes the iframe to match — so there's
no inner scrollbar and no cut-off content, and the app never needs `100vh`/`fixed`
positioning to make itself fit.

## 1. Add a Code Block to the Squarespace page

In the Squarespace page editor, add a **Code Block** where you want the planner to
appear, and paste this in:

```html
<iframe
  id="dont-panic-frame"
  src="https://YOUR-SITE-NAME.netlify.app"
  title="Don't Panic planner"
  style="width: 100%; border: 0; display: block;"
  scrolling="no"
></iframe>

<script>
  (function () {
    var frame = document.getElementById('dont-panic-frame');
    window.addEventListener('message', function (event) {
      if (event.source !== frame.contentWindow) return;
      var data = event.data;
      if (!data || data.type !== 'dont-panic-height') return;
      frame.style.height = data.height + 'px';
    });
  })();
</script>
```

Replace `https://YOUR-SITE-NAME.netlify.app` with the actual URL once this branch
has its own Netlify site (same process as before: Netlify → Add new project →
this repo → branch `design-refresh` → build command `npm run build` → publish
directory `dist`).

## 2. Why `scrolling="no"` and no fixed height

The iframe starts at whatever height the browser defaults an `<iframe>` to, then the
script above resizes it the moment the app reports its real content height — which
happens on load and again every time the content inside changes (switching tabs,
opening the inline panel, adding actions to a plan, and so on). The Squarespace page
itself does the scrolling; the iframe just grows and shrinks to match its contents.

## 3. If you ever embed it more than once

The script only acts on messages that come from its own `<iframe>` (checked via
`event.source`), so it's safe to paste this block onto more than one page. If you
ever need two planner embeds on the *same* page, give each iframe/script pair its
own unique `id` (e.g. `dont-panic-frame-2`) instead of reusing `dont-panic-frame`,
since `getElementById` only finds the first match.

## 4. Testing the embed

Before asking Ian to add this to his live site, open the Netlify URL directly first
and confirm the app works on its own. Then test the Squarespace embed in Squarespace's
own preview — resize the browser window while on the page to confirm the iframe grows
and shrinks smoothly as you move between tabs.
