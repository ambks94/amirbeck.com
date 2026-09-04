# Amir Beck, Design Engineer

I design and ship fintech products. At **Lumanu** I lead the design of a B2B2C payments platform.


**→ [amirbeck.com](https://amirbeck.com)**

This repo is the site itself.

## How I built it

**Migrated off Framer.** The old site was a Framer build. I rebuilt it by hand in Next.js to
own the whole surface, with real markup, real performance, and no page builder ceiling. Along
the way I fixed what Framer had quietly broken, including illustrations cropped by their own
frames, images served far larger than they render, and text and tap targets under accessible
minimums.

**Designed in Figma.** The layout, type scale, and palette all started in Figma. The two brand
colors come straight out of my own illustrations, so the design tokens and the artwork agree.

**Bridged design to code with Figma Code Connect and the Figma MCP.** Components map to their
Figma source, so the design system and the codebase share one vocabulary of component names,
props, and structure. It is the same practice I lead at Lumanu, design to code where the system
compounds instead of resetting every screen.

**Motion.** Load-time stagger is CSS and animates transform, never opacity, so every word is
legible on the first painted frame. Slow ambient drift on the illustrations. A scroll progress
hairline. The mobile menu and image-load shimmer use Motion for React, with springs, stagger,
and AnimatePresence so open and close stay interruptible. I prototyped the timing with AI
tools, then held it to a high bar. All of it turns off under `prefers-reduced-motion`.

## Selected work

- **[Lumanu](https://amirbeck.com/lumanu).** Lead design of a B2B2C payments platform.
  Lead the design through the company
  strategy pivot from influencer marketing to payments.
- **[SkySlope](https://amirbeck.com/skyslope).** Improved UX across DigiSign, Forms, and
  Breeze, and led Breeze from concept through launch. 
- **[Granate](https://amirbeck.com/granate).** Led product design for a grief support app.

- **[EasyPeady](https://amirbeck.com/easypeady).** Designed and launched a standalone real
  estate form app in one quarter, built alongside engineering. It became the groundwork for
  Breeze.

## Stack

Next.js 16, React 19, TypeScript, CSS Modules, Motion, Lucide, self hosted Google Fonts,
deployed on Vercel. Figma, Code Connect, Figma MCP, and design tokens on the design side.

## Contact

[beck@amirbeck.com](mailto:beck@amirbeck.com) ·
[LinkedIn](https://www.linkedin.com/in/amir-beck/) ·
[GitHub](https://github.com/amirbecklumanu)
