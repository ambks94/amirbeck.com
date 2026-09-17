# Application answers

Short form, in my own phrasing from amirbeck.com.

---

## 1. Can you describe your experience as a Product Designer working directly with Product Managers and Engineers on complex digital products? What types of products or workflows have you designed?

At [Lumanu](https://amirbeck.com/lumanu) I lead product design, code much of the app UI myself, and work with the exec team on what we build, then lead design on tax, vendor compliance, and payments from inside product and engineering. That has meant a [tax engine](https://amirbeck.com/lumanu#tax-engine), [Projects](https://amirbeck.com/lumanu#projects) for real time control over marketing spend, [vendor onboarding](https://amirbeck.com/lumanu#vendor-onboarding-and-compliance) rebuilt on Heap funnel data and CS tickets, and [reporting](https://amirbeck.com/lumanu#reporting-feature), after earlier work across [DigiSign, Forms, and Breeze](https://amirbeck.com/skyslope) at SkySlope. I want to be close enough to engineering that we make the calls together, like on [EasyPeady](https://amirbeck.com/easypeady#flows), where developers scored each solution's build complexity 1 to 5 while designers scored its UX.

---

## 2. Tell us about your experience working with established design systems in Figma. How have you used components, tokens, auto-layout, and existing patterns while also identifying when new patterns were needed?

At Lumanu [the design system and the codebase had drifted apart](https://amirbeck.com/lumanu#design-system-and-ai-tooling), so I aligned them in component UI, naming, and functionality and used Code Connect for a 1 to 1 match. Now developers pick the right component easily, mockups match development, and AI assistants work accurately, and I build from what is there, variants, tokens, and auto layout that behaves like the flex and grid it will become. New patterns need evidence. Our [DigiSign](https://amirbeck.com/skyslope#digisign) tool kept the signature block selected after placement, and when the survey on changing it split evenly, I shipped a preferences page for the selection behavior plus a clearer flow for changing signers, cutting signing mistakes 50%.

---

## 3. Can you share an example of a project where you worked closely with engineers from design handoff through development? How did you manage technical tradeoffs and ensure the final shipped experience matched the intended design?

On [EasyPeady](https://amirbeck.com/easypeady#flows) the PM and I settled on splitting the completed envelope in the backend, because it removed the PDF split agents were doing manually, with a fallback if we hit technical constraints. When [SkySlope shifted strategy mid-development](https://amirbeck.com/easypeady#the-pivot), I got the key screens and a basic style guide to development fast so nobody was blocked, then designed the UI alongside the build, clearing blockers on drop-in calls. These days I skip the handoff where I can, which is why I coded [~90% of the Lumanu redesign](https://amirbeck.com/lumanu#app-redesign) myself.

---

## 4. What experience do you have using AI-assisted design or development tools such as Claude and Cursor in your product design workflow? Please share a specific example of how you've used them alongside Figma.

User feedback and CS tickets pointed to a missing [reporting feature](https://amirbeck.com/lumanu#reporting-feature), so I designed it in Figma on our existing system and built and launched it myself, with Code Connect, the Figma MCP, and Claude Code carrying it from design to shipped code. That only works because the [system and the codebase already matched](https://amirbeck.com/lumanu#design-system-and-ai-tooling), so the MCP reads the real frame and what comes back uses our components, not a lookalike built out of divs. I still review it as a designer, for token misuse, spacing that drifted, and states nobody thought about.
