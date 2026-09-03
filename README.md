# amirbeck.com

Personal site for Amir Beck — Senior Design Engineer. Next.js 15, React 19, TypeScript,
CSS Modules.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start
```

## Deploy to Vercel

```bash
git init && git add -A && git commit -m "New site"
gh repo create amirbeck.com --private --source=. --push
```

Then import the repo at vercel.com. Framework preset is detected as Next.js; there are no
environment variables. Add `amirbeck.com` under the project's Domains tab, update DNS, and
unpublish the Framer site once it's live.

## Layout

```
src/
  app/
    layout.tsx        fonts, metadata
    page.tsx          section order
    globals.css       tokens, primitives, keyframes
  components/         one .tsx + one .module.css each
  content/site.ts     ALL copy and project data — edit here
public/
  images/             project screenshots (2000px WebP)
  illustrations/      Amir's SVGs
scripts/
  harvest-assets.mjs  pull every original off the Framer CDN
  optimize.mjs        re-encode them to web-ready WebP
```

## Assets

`public/illustrations/curves.svg` and `arc.svg` have corrected `viewBox` values — their
original frames were cropping most of the artwork away. See `CLAUDE.md` for the numbers.

The four screenshots in `public/images` are re-encoded from Amir's originals at 2000px
WebP. The originals on the Framer CDN run up to 13630×10220. To pull the rest:

```bash
node scripts/harvest-assets.mjs
npm i -D sharp && node scripts/optimize.mjs
```

## Notes

- Copy is Amir's own writing. `CLAUDE.md` explains the voice rules before you edit it.
- Project images use a fixed 4:3 `contain` slot so all four entries align.
- Motion animates transform only, never opacity, and is off under `prefers-reduced-motion`.
