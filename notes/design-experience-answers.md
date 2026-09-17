# Application answers

Drafted from the work documented on amirbeck.com (Lumanu, SkySlope, Granate, EasyPeady).

---

## 1. Experience as a Product Designer working directly with Product Managers and Engineers on complex digital products. What types of products or workflows have you designed?

I've spent the last six years on products where the hard part is the domain, not the screen: real estate transactions, then fintech payments.

At Lumanu I'm the lead product design engineer on a B2B2C payments platform — the master vendor global brands use to onboard, pay, and account for creators, freelancers, and agencies. I work with the exec team on what we build, then lead design on tax, vendor compliance, and payments from inside product and engineering rather than from the outside. I don't hand work over a wall; I code a large share of the app UI myself, so I'm in the same repo and the same standups as the engineers.

The workflows I've designed are mostly high-stakes, multi-actor, and rule-driven:

- **Payments and money movement** — linking withdrawal methods where the country and currency pair determines the available rails (ACH and instant debit in the US, local bank transfer where we support one, SWIFT where we don't), plus live conversion.
- **Global tax compliance** — a tax engine that automates tax handling so the company can operate internationally. Research-driven and shaped with users.
- **Vendor onboarding and compliance** — multiple redesigns driven by Heap funnel analytics and CS ticket data, balancing tightening international requirements against drop-off.
- **Financial visibility and control** — Projects, for real-time spend visibility across finance and marketing teams, researched across agencies, SMBs, enterprise, and DTC. And a reporting feature so clients can audit their finances.
- **Permissions** — moving from fixed roles to permission groups so enterprise buyers with stricter audit requirements can set access per user.
- **Role-aware dashboards** — a homepage that changes by who's looking at it.

Before Lumanu, at SkySlope, I worked across DigiSign, Forms, and Breeze: e-signature block placement, team and delegation models for transaction coordinators, file history for compliance auditing, and a wizard flow for California disclosure packages. At Granate I led design for a grief support app, including a model that ranks tasks by the user's role, priority, and due date.

Across all of it, the constant is working in a triad. On EasyPeady the team was a PM, a UX researcher, me, and six developers. I co-wrote the PRD with the PM, ran the research that decided who we'd build for, and ran a joint brainstorm where developers scored each option's build complexity 1 to 5 while designers scored its UX — so we picked flows that were cheap to build *and* good to use, with the tradeoff visible to everyone in the room.

---

## 2. Experience working with established design systems in Figma. How have you used components, tokens, auto-layout, and existing patterns, and identified when new patterns were needed?

I've both inherited systems and built them, and I care most about the part most systems get wrong: staying true to the code.

**Working inside a system.** At Lumanu the design system and the codebase had drifted apart — same concept, different names, different props, different behavior. I aligned them across component UI, naming, and functionality, then wired them together with Figma Code Connect so the mapping is 1 to 1. Now a component in Figma resolves to the real component in the repo. The effects are practical: developers pick the right component without guessing, mockups match what ships, build time drops because nobody is hand-mapping, and AI code assistants produce accurate output because they're reading a real vocabulary instead of inferring one.

Day to day that means composing from what exists — variants and states rather than one-off frames, auto-layout so components behave like the flex and grid they'll become in code, and tokens for color, type, and spacing so a change propagates instead of being repainted screen by screen. If a spec needs a magic number to hold together, that's usually a sign I've drawn something the system can't actually build.

**Building one.** At Granate I rebuilt every component under a new brand identity, organized as dedicated Figma pages per component type so the small team could find things without asking me, with each component isolated in its own frame. I then split the rollout into four phases so a small dev team could ship it piece by piece and capture value in each release, instead of the app looking half-migrated for a quarter. On EasyPeady, under a one-quarter deadline, I compressed that to a single style guide sheet — color, type, buttons, inputs, radios, dropdowns, and table states — specifically so engineering could start building without waiting on me.

**Knowing when a new pattern is warranted.** My default is to reach for the existing pattern, and the bar for a new one is evidence, not preference. Two examples where the evidence cleared it:

- In DigiSign, our signature block stayed selected after placement — a deliberate deviation from the e-signing convention. Usability testing showed 4 of 10 testers were frustrated placing and assigning blocks and 5 of 10 struggled to change a block's properties afterward. But the survey on changing it split evenly, because long-time users had built muscle memory. So the answer wasn't "adopt the standard pattern" or "keep ours" — it was a preferences page for selection behavior plus a clearer flow for changing signers. Signing mistakes dropped ~50%.
- At Lumanu, roles couldn't express what enterprise buyer auditors needed. That's a data model problem surfacing as a UI problem, and no rearrangement of the existing pattern fixes it — so we moved to permission groups, set per user.

---

## 3. An example of working closely with engineers from design handoff through development. How did you manage technical tradeoffs and ensure the shipped experience matched the intent?

**EasyPeady.** In late 2020, COVID made the PEAD-V form mandatory for every home viewing, and agents were drowning in it. We had a PM, a researcher, me, and six developers, and we needed an MVP by the end of Q1 2021 — ideally sooner.

The core design problem was routing, not screens. A buyer agent wants to build one envelope covering every property their client will visit, have the buyer sign once, and then have each seller agent receive only their own PEAD. I mapped who acts at each step, every point where the system has to send an email, and four different ways to split the completed envelope.

Three tradeoffs, each made with engineering rather than handed to them:

1. **Scope.** Research showed buyer agents were 46% more likely than seller agents to report difficulty with the form, so we scoped the MVP to buyer agents. The cost was explicit: seller agent use cases stayed out.
2. **The split.** Splitting in the backend was the right experience — it removed the PDF splitting agents were doing by hand — but it was the more expensive build. The PM and I committed to it with a documented fallback if we hit a technical wall. Naming the fallback up front is what made the expensive choice safe to take.
3. **How we chose in general.** I ran a brainstorm where developers scored each candidate solution's build complexity 1 to 5 while designers scored its UX. Putting both numbers side by side turned "can we do this?" into a shared decision instead of a negotiation.

Then mid-development the company changed strategy: EasyPeady went from a paid feature inside our existing Forms product to a free standalone app aimed at capturing new customers. Instead of only authenticating known accounts, we now had to support net-new users. Rebranding mid-build was the call, because the dev team was already ramped and stopping would have cost more than continuing. To keep them unblocked, I partnered with our visual designer on the new brand, redesigned the key screens, and shipped a basic style guide fast. From there I designed the UI alongside development, iterating as we built and clearing UX blockers on drop-in calls while staying a step ahead of the build.

We launched in under a quarter. It drove a 15% increase in usage of SkySlope's other products, generated a new customer pipeline, and became the groundwork for Breeze.

**What I'd do differently, and did.** The pace cost us: an authentication problem surfaced only in user testing after the pivot, late enough to hurt. More thorough testing before launch would have caught it.

**How I ensure fidelity now.** The most reliable way I've found to make the shipped experience match the design is to remove the translation step. At Lumanu I designed and built the reporting feature myself — Figma Code Connect and the Figma MCP took me from the design file to shipped code, with Claude Code doing the mechanical work. I coded ~90% of the app UI redesign the same way, with help from engineers on the left nav and the more complex layout files. When the design system and the codebase share one vocabulary, fidelity stops being something you police in review and becomes a property of the pipeline.

---

## 4. Experience using AI-assisted design or development tools such as Claude and Cursor. A specific example alongside Figma.

I use AI-native tools daily — Claude Code, Claude, Cursor, the Figma MCP, Code Connect, Figma Make, Paper, and the Vercel AI SDK. My view is that their value is almost entirely determined by the quality of the system you point them at. A model reading a messy Figma file writes messy approximations of your components. A model reading a mapped one writes your components.

**Specific example: the reporting feature at Lumanu.**

User feedback and CS tickets kept pointing at the same gap — clients had no way to audit their own finances. I designed reporting in Figma on our existing system, then built and launched it myself.

The workflow:

1. **Prerequisite work.** Before any of this paid off, I aligned the design system with the codebase — component UI, naming, and functionality — and wired them together with Figma Code Connect so each Figma component resolves to the real React component, with real props.
2. **Figma MCP.** With reporting designed, Claude Code reads the actual frame — structure, tokens, spacing, component instances — instead of me describing it or pasting a screenshot and hoping.
3. **Code Connect.** Because the mapping exists, what comes back uses our components and our tokens. It isn't a visual lookalike assembled from divs, which is the usual failure mode and the thing that makes AI-generated UI expensive to clean up.
4. **My judgment on top.** I review the output as a designer: token misuse, spacing that drifted, states nobody thought about, keyboard and focus behavior. AI got me through the mechanical translation quickly; the last mile is still taste.

Reporting shipped, and clients can audit their finances.

**A second, smaller example.** I rebuilt my own site off Framer by hand in Next.js. The layout, type scale, and palette started in Figma, with components mapped to their Figma source through Code Connect. I prototyped motion timing with AI tools and then held it to a bar the tools don't have an opinion about — load-time stagger animates transform and never opacity, so every word is legible on the first painted frame, and all of it turns off under `prefers-reduced-motion`. I also fixed what the page builder had quietly broken along the way: illustrations cropped by their own frames, images served far larger than they render, and text and tap targets below accessible minimums.

That's the pattern in both cases. AI removes the translation tax between design and code. It doesn't decide what's worth building, and it doesn't notice that your tap targets are too small.
