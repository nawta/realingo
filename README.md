# Realingo — website

Landing page, privacy policy, and support page for [Realingo](https://apps.apple.com/us/app/realingo/id6791108476),
an iOS app that turns your own photos into language exercises.

Published with GitHub Pages: **https://nawta.github.io/realingo/**

## Files

| Path | What it is |
| --- | --- |
| `index.html` | Landing page: hero, how it works, four feature rows, privacy, languages, pricing, FAQ, contact |
| `privacy.html` | Privacy policy. The English text is the version that governs; the Japanese text is a reference translation |
| `support.html` | Support page and FAQ, linked from App Store Connect |
| `styles.css` | One stylesheet for all three pages |
| `site.js` | Language switch and scroll reveal |
| `assets/` | App icon, app screenshots (WebP), Open Graph image |

No build step and no dependencies. Open `index.html` in a browser, or serve the
directory with `python3 -m http.server 8080` to check it locally.

## How the language switch works

Both languages are in the HTML at the same time, wrapped in `<span class="ja">`
and `<span class="en">`. CSS hides whichever one is not selected, keyed off
`data-lang` on `<html>`:

```css
html[data-lang="ja"] .en,
html[data-lang="en"] .ja { display: none !important; }
```

A small inline script in each `<head>` sets `data-lang` before the first paint,
from `localStorage` or the browser language, so the wrong language never flashes.
`site.js` handles the toggle buttons and stores the choice.

To add text, add both versions. A block that exists in only one language will
show up in the other language too.

## Where the content comes from

The copy tracks the live App Store listing and the source repository
`nawta/Realingo_v3`:

- Screenshots: `docs/appstore_review/2026-08-14/screenshots/raw/en-US/` in that
  repository, resized to 660 px wide and converted to WebP. The raw captures are
  used rather than the App Store composites, because the composites have English
  captions burned into the image.
- App icon: `realingo_product/ProductAssets.xcassets/AppIcon-Product.appiconset/AppIcon1024.png`.
- Privacy policy and FAQ: `hosting/product/public/privacy.html` and `support.html`.
  Those two pages are the ones currently linked from App Store Connect; the pages
  here are the same text in the site design, plus a Japanese translation. The
  support page there said 15 learning languages, which disagreed with the App
  Store listing and the app itself — this site says 18.

If any of that changes in the app, update it here too, and keep the Japanese and
English versions in step.

## Publishing

GitHub Pages serves the default branch from the repository root. Pushing to
`main` republishes the site, usually within a minute.

The App Store listing still points at the Firebase Hosting copies
(`https://realingo-prod-33903.web.app/privacy.html` and `/support.html`). To move
those links to this site, update the URLs in App Store Connect and in
`ProductLinks.privacyPolicyURL` in the app.

## Things to swap in later

- **Mailing list.** The "get update announcements" button is a `mailto:` link.
  Replace both `mailto:` links in the closing section of `index.html` with a form
  URL (Google Forms, Buttondown, and so on) when there is one.
- **Custom domain.** Add a `CNAME` file containing the domain, point a DNS
  `CNAME` record at `nawta.github.io`, and update `og:url` and the `canonical`
  link in the three HTML files.
