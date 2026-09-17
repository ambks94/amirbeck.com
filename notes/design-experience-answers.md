# Application answers

Drafted from the work on amirbeck.com. Links point at the specific section of each case study.

---

## 1. Experience as a Product Designer working directly with Product Managers and Engineers on complex digital products. What types of products or workflows have you designed?

I have spent the last six years on products where the hard part is the domain, not the screen. Real estate transactions, then fintech payments.

At [Lumanu](https://amirbeck.com/lumanu) I lead product design on a B2B2C payments platform, code much of the app UI myself, and work with the exec team on what we build. Lumanu is the fintech master vendor for marketing partnerships and productions. Global brands use it to onboard, pay, and account for creators, freelancers, and agencies. I work from inside product and engineering rather than handing designs over a wall. I am in the same repo as the developers, so a tradeoff gets settled in a conversation instead of a redline.

The workflows I design are multi actor and rule driven.

- [Payments and money movement](https://amirbeck.com/playground#withdrawal). Linking a withdrawal method, where the country and currency pair decides which rails are available. A US payout runs on ACH or an instant debit card. Everywhere else it is a local bank transfer where we support one, and a SWIFT wire where we do not.
- [Global tax compliance](https://amirbeck.com/lumanu#tax-engine). A tax engine that automates taxes, research driven and shaped with users, so the company can grow globally.
- [Vendor onboarding and compliance](https://amirbeck.com/lumanu#vendor-onboarding-and-compliance). Multiple redesigns driven by Heap funnel analytics and CS ticket data, balancing international requirements against drop off.
- [Projects](https://amirbeck.com/lumanu#projects). Real time visibility and control over marketing spend. I ran multiple rounds of research interviews across agencies, SMBs, enterprise, and DTC.
- [Reporting](https://amirbeck.com/lumanu#reporting-feature). User feedback and CS tickets pointed at a missing feature, so clients could not audit their own finances. I built and launched it.
- [Permissions](https://amirbeck.com/playground#permissions). Our roles could not meet the different requirements from buyer auditors, so we moved to permission groups set per user.
- [The buyer dashboard](https://amirbeck.com/lumanu#buyer-dashboard). A role aware homepage that surfaces value and gives an actionable overview. I designed, built, and animated it.

Before Lumanu I was at [SkySlope](https://amirbeck.com/skyslope), working across [DigiSign](https://amirbeck.com/skyslope#digisign), [Forms](https://amirbeck.com/skyslope#forms), and [Breeze](https://amirbeck.com/skyslope#breeze). Signature block placement, team access for transaction coordinators, file history for compliance, and a wizard flow for California disclosure packages. At [Granate](https://amirbeck.com/granate) I led product design for a grief support app, including [a model that ranks tasks](https://amirbeck.com/granate#curated-tasks) by the user's role, priority, and due date.

The constant is working in a triad. On [EasyPeady](https://amirbeck.com/easypeady) the team was a PM, a UX researcher, me, and six developers. I co-wrote the PRD with the PM, ran the research that settled who we were building for, and [ran a brainstorm with product and engineering](https://amirbeck.com/easypeady#flows) where developers scored each solution's build complexity 1 to 5 while designers scored its UX. We chose the flows that were cheapest to build with the best UX, and everyone could see the tradeoff.

---

## 2. Experience working with established design systems in Figma. How have you used components, tokens, auto-layout, and existing patterns while also identifying when new patterns were needed?

I have inherited systems and built them. The part I care most about is the part most systems get wrong, which is staying true to the code.

**Working inside a system.** At Lumanu [the design system and the codebase had drifted apart](https://amirbeck.com/lumanu#design-system-and-ai-tooling). Same concept, different names, different props, different behavior. I aligned them in component UI, naming, and functionality, then used Figma Code Connect for a 1 to 1 match. A component in Figma now resolves to the real component in the repo. Developers pick the right component easily, mockups match development 1 to 1, build time is faster with no manual mapping, and AI IDEs and code assistants work more accurately because they are reading a real vocabulary instead of guessing at one.

Day to day that means building from what exists. Variants and states instead of one off frames. Auto layout, so a component behaves like the flex and grid it will become in code. Tokens for color, type, and spacing, so a change moves through the system instead of being repainted screen by screen. If a spec needs a magic number to hold together, I have usually drawn something the system cannot build.

**Building one.** At [Granate](https://amirbeck.com/granate#design-system) I rebuilt every component under the new brand identity with an emphasis on usability, scalability, and team accessibility. I used dedicated Figma pages per component type so the small team could find things without asking me, with each component in its own frame. Then I split the redesign into four phases so we could ship it piece by piece and capture value in each release, without the app feeling inconsistent along the way. On [EasyPeady](https://amirbeck.com/easypeady#the-pivot), with a quarter to launch, I compressed that into one style guide sheet covering color, type, buttons, inputs, radios, dropdowns, and table states. That let development spin up without blockers.

**Knowing when a new pattern is needed.** I reach for the existing pattern first, and the bar for a new one is evidence, not preference. Two cases where the evidence cleared it.

- In [DigiSign](https://amirbeck.com/skyslope#digisign) our signature block stayed selected after placement, a pattern deviation from most other e-signing tools. Usability testing found 4 of 10 testers were frustrated placing and assigning blocks, and 5 of 10 struggled to change a block's properties after placement. But many long time users were used to the old interaction and the survey split was even. So the answer was not to adopt the standard pattern or to keep ours. I built two things, a preferences page to choose the selection behavior and a clearer flow for changing signers. We saw a ~50% reduction in digital signing mistakes.
- At Lumanu, [roles could not meet the different requirements from buyer auditors](https://amirbeck.com/playground#permissions). That is a data model problem showing up as a UI problem, and no rearrangement of the existing pattern fixes it. We moved to permission groups, set per user.

---

## 3. An example of a project where you worked closely with engineers from design handoff through development. How did you manage technical tradeoffs and ensure the final shipped experience matched the intended design?

[EasyPeady](https://amirbeck.com/easypeady). In late 2020 COVID required the PEAD-V form for every home viewing, and agents were buried in it. The team was a PM, a UX researcher, me, and six developers. Given the timeliness of the issue we needed an MVP by the end of Q1 2021, ideally sooner.

The real problem was routing, not screens. A buyer agent wants one envelope covering every property their client will visit, the buyer signs once, and each seller agent gets only their own PEAD. [I mapped who acts at each step](https://amirbeck.com/easypeady#flows), every point where the system has to send an email, and four ways to split the completed envelope.

Three tradeoffs, each settled with engineering rather than handed to them.

- **Scope.** Research showed buyer agents were 46% more likely than seller agents to report difficulty, so we scoped the MVP to buyer agents. What it cost was explicit. Seller agent use cases stayed out of the MVP.
- **The split.** Splitting in the backend was the right experience because it removed the PDF split agents were doing manually, but it was the more expensive build. The PM and I committed to it with a fallback if we hit technical constraints. Naming the fallback up front is what made the expensive call safe to take.
- **How we chose in general.** In the brainstorm, developers scored each solution's build complexity 1 to 5 while designers scored its UX. Putting both numbers side by side turned a negotiation into a shared decision.

Then, [mid-development, SkySlope shifted strategy](https://amirbeck.com/easypeady#the-pivot). The tool went from a paid feature inside Forms to a free standalone app aimed at capturing new customers, so instead of only authenticating existing accounts we had to support net new users too. We rebranded mid-development because the development team was already ramped up and stopping would have cost more than continuing. To keep them moving, I partnered with the visual designer on new branding, redesigned the key screens, and created a basic style guide so development could spin up without blockers. From there I designed the UI alongside development, iterating as we built and clearing UX blockers via drop-in calls while trying to get ahead.

[We launched in under a quarter](https://amirbeck.com/easypeady#launch). SkySlope's other products saw a 15% increase in usage, the app generated a pipeline of new customers, and it became the groundwork for Breeze.

[What it cost](https://amirbeck.com/easypeady#retrospective). The fast schedule led to one high impact oversight. An authentication problem surfaced only in user testing after the pivot. More thorough testing would have helped us find it before launch.

**How I hold fidelity now.** The most reliable way to make the shipped experience match the design is to remove the translation step. At Lumanu I designed and built [the reporting feature](https://amirbeck.com/lumanu#reporting-feature) myself, and Figma Code Connect, the Figma MCP, and Claude Code took me from design to shipped code. I coded [~90% of the app redesign](https://amirbeck.com/lumanu#app-redesign) the same way, with help on the left nav and complex layout files. When the design system and the codebase share one vocabulary, fidelity stops being something you police in review.

---

## 4. What experience do you have using AI-assisted design or development tools such as Claude and Cursor in your product design workflow? Please share a specific example of how you've used them alongside Figma.

I build and prototype with AI native, design first tools daily. Cursor, Claude Code, Claude, Figma Make, the Figma MCP, Code Connect, Paper, Framer AI, and the Vercel AI SDK. What I have learned is that their value depends almost entirely on the system you point them at. A model reading a messy Figma file writes a messy approximation of your components. A model reading a mapped one writes your components.

**The specific example is [reporting at Lumanu](https://amirbeck.com/lumanu#reporting-feature).** User feedback and CS tickets pointed to a missing reporting feature, so clients had no way to audit their finances. I designed it in Figma on our existing system, then built and launched it myself.

- **The prerequisite.** None of this pays off until the system is accurate, so first I [aligned the design system with the codebase](https://amirbeck.com/lumanu#design-system-and-ai-tooling) in component UI, naming, and functionality, and wired them together with Code Connect.
- **Figma MCP.** With reporting designed, Claude Code reads the actual frame, its structure, tokens, spacing, and component instances, instead of me describing it or pasting a screenshot and hoping.
- **Code Connect.** Because the mapping exists, what comes back uses our components and our tokens. It is not a lookalike built out of divs, which is the usual failure mode and the thing that makes AI generated UI expensive to clean up.
- **My judgment on top.** I review the output as a designer. Token misuse, spacing that drifted, states nobody thought about, keyboard and focus behavior. The tools got me through the mechanical translation quickly. Deciding what is right is still mine.

Reporting shipped, and our clients can audit their finances.

**A smaller example is [this site](https://amirbeck.com).** It was a Framer build and I rebuilt it by hand in Next.js. The layout, type scale, and palette started in Figma, and components map to their Figma source through Code Connect, so the design system and the codebase share one vocabulary of component names, props, and structure. I prototyped the motion timing with AI tools and then held it to a high bar. Load time stagger animates transform and never opacity, so every word is legible on the first painted frame, and all of it turns off under `prefers-reduced-motion`. Along the way I fixed what Framer had quietly broken, including illustrations cropped by their own frames, images served far larger than they render, and text and tap targets under accessible minimums.

AI took the translation work out of design to code. It does not decide what is worth building, and it did not catch the tap targets.
