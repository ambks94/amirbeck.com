# Amir Beck — Design Engineer

I design and ship fintech products. At **Lumanu** I lead the design of a B2B2C payments
platform and personally build it in React, Next.js, and TypeScript — bridging Figma to
production code on a design system that compounds.

**→ [amirbeck.com](https://amirbeck.com)**

This repo is the site itself. I built it end to end — design through production code — so it
doubles as a working sample of how I work.

## How I built it

**Migrated off Framer.** The old site was a Framer build. I rebuilt it by hand in Next.js to
own the whole surface: real markup, real performance, no page-builder ceiling. Along the way I
fixed what Framer had quietly broken — illustrations cropped by their own frames, images
served far larger than they render, text and tap targets under accessible minimums.

**Designed in Figma.** The layout, type scale, and the palette all started in Figma. The two
brand colors come straight out of my own illustrations, so the design tokens and the artwork
agree.

**Bridged design to code with Figma Code Connect + the Figma MCP.** Components map to their
Figma source, so the design system and the codebase share one vocabulary — component names,
props, and structure line up. It's the same practice I lead at Lumanu: design-to-code where the
system compounds instead of resetting every screen.

**Animated with AI.** Motion is CSS-only and deliberately restrained — a load-time stagger that
animates transform, never opacity, so every word is legible on the first painted frame; slow
ambient drift on the illustrations; a scroll-progress hairline. I prototyped the timing quickly
with AI tools, then held it to a high bar. All of it turns off under `prefers-reduced-motion`.

## Selected work

- **Lumanu** — Lead design of a B2B2C payments platform. Redesigned the app from the ground up
  and personally coded ~90% of it; pivoted company strategy from influencer marketing to payments.
- **SkySlope** — Improved UX across DigiSign, Forms, and Breeze, and led Breeze from concept
  through launch. Cut digital signing mistakes by ~50%.
- **Granate** — Led product design for a grief-support app. ~25% drop in onboarding drop-off;
  ~30% lift in weekly engagement.
- **EasyPeady** — Designed and launched a standalone real-estate form app in one quarter.

## Stack

Next.js 15 · React 19 · TypeScript · CSS Modules · self-hosted Google Fonts · deployed on Vercel.
Figma · Code Connect · Figma MCP · design tokens for the design side.

## Contact

[beck@amirbeck.com](mailto:beck@amirbeck.com) ·
[LinkedIn](https://www.linkedin.com/in/amir-beck/) ·
[GitHub](https://github.com/amirbecklumanu)
