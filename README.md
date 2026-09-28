# Realingo website

Landing page, privacy policy, and support page for [Realingo](https://apps.apple.com/us/app/realingo/id6791108476),
an iOS app that turns your own photos into language exercises.

Published with GitHub Pages: **https://nawta.github.io/realingo/**

## Files

| Path | What it is |
| --- | --- |
| `index.html` | Landing page: hero, how it works, four feature rows, privacy, languages, pricing, FAQ, contact |
| `privacy.html` | Privacy policy. The English text is the version that governs; the Japanese text is a reference translation |
| `support.html` | Support page and FAQ |
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

A small inline script in each `<head>` sets `data-lang` before the first paint, so
the wrong language never flashes. It takes `?lang=ja` or `?lang=en` from the URL
first, then the stored choice, then the browser language. `site.js` handles the
toggle buttons and stores what you pick.

To add text, add both versions. A block that exists in only one language will
show up in the other language too.

## Content

The page copy follows the App Store listing, and the privacy policy and FAQ match
the text the app ships with. When the app changes, update this site too, and keep
the Japanese and English versions in step.

The phone images are unmodified iOS simulator captures, resized to 660 px wide and
converted to WebP. Their captions live in the HTML, so the language switch can
translate them.

## Publishing

GitHub Pages serves the default branch from the repository root. Pushing to `main`
republishes the site, usually within a minute.

## Things to swap in later

The "get update announcements" button is a `mailto:` link for now. When there is a
sign-up form (Google Forms, Buttondown, and so on), replace both `mailto:` links in
the closing section of `index.html` with its URL.

For a custom domain, add a `CNAME` file containing the domain, point a DNS `CNAME`
record at `nawta.github.io`, and update `og:url` and the `canonical` link in the
three HTML files.
