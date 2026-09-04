export type CaseMetric = { figure: string; text: string };
export type CaseImage = { src: string; width: number; height: number; alt: string };
// A micro case study. Media is optional: a looping video, or one or more framed
// images (set `beforeAfter` to show the first two with an arrow between).
export type CaseSection = {
  heading: string;
  body: string;
  tags?: string[];
  problem?: string;
  result?: string;
  video?: string;
  images?: CaseImage[];
  beforeAfter?: boolean;
};

// Story layout: an overview, then chapters of blocks (heading + body + media).
export type CaseBlock = {
  heading?: string;
  body?: string;
  list?: string[];
  images?: CaseImage[];
  video?: string;
  beforeAfter?: boolean;
  captions?: string[];
  callout?: string;
};
export type CaseChapter = { title: string; blocks: CaseBlock[] };

export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  years: string;
  role: string;
  intro: string;
  hero?: CaseImage;
  metrics: CaseMetric[];
  layout?: "micro" | "story";
  // micro layout
  sections?: CaseSection[];
  // story layout
  overview?: string[];
  impact?: string[];
  workIncluded?: string;
  goals?: string[];
  chapters?: CaseChapter[];
  links: { label: string; href: string; external?: boolean }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "lumanu",
    name: "Lumanu",
    category: "Payments Platform",
    years: "2023 to Now",
    role: "Lead Design Engineer",
    intro:
      "I lead the design of Lumanu's B2B2C payments platform. I redesigned the app from the ground up and personally coded most of it.",
    metrics: [
      { figure: "~90%", text: "of the app redesign coded personally" },
      { figure: "1", text: "company pivot to payments, driven by the redesign" },
      { figure: "New", text: "revenue streams launched" },
    ],
    sections: [
      {
        heading: "Buyer dashboard",
        tags: ["Figma", "Motion", "React"],
        problem: "Buyers could not see the value moving through their workspace at a glance.",
        body: "I designed, built, and animated a role aware homepage that surfaces that value and gives a clear, actionable overview.",
        result: "A dashboard that makes invisible value visible on first load.",
        video: "/images/lumanu/buyer-dashboard.webm",
      },
      {
        heading: "App redesign",
        tags: ["Figma", "React", "Next.js"],
        problem: "The app was information dense and hard to use.",
        body: "I redesigned it from the ground up and held it to a pixel perfect bar, coding 90% myself, with help on the left nav and new features like universal search.",
        result: "A faster, clearer app, mostly shipped in my own code.",
        beforeAfter: true,
        images: [
          { src: "/images/lumanu/app-redesign-before.webp", width: 2400, height: 1805, alt: "The Lumanu app before the redesign" },
          { src: "/images/lumanu/app-redesign-after.webp", width: 2400, height: 1707, alt: "The Lumanu app after the redesign" },
        ],
      },
      {
        heading: "Reporting feature",
        tags: ["Code Connect", "Figma MCP"],
        problem: "User feedback and CS tickets pointed to a missing reporting feature.",
        body: "I spotted the need, then built and launched reporting myself. Figma Code Connect and the Figma MCP took me from design straight into shipped code.",
        result: "A new reporting feature, launched end to end.",
        video: "/images/lumanu/reporting.webm",
      },
      {
        heading: "Design system and AI tooling",
        tags: ["Design systems", "Code Connect", "AI tooling"],
        problem: "The design system and the code had drifted apart.",
        body: "I aligned them in component design, naming, and functionality, then used Figma Code Connect for a 1 to 1 match between the system and the code.",
        result: "Developers pick the right component at a glance, UI matches development exactly, build time is faster, and AI IDEs work more accurately.",
        images: [
          { src: "/images/lumanu/design-system-1.webp", width: 2400, height: 1277, alt: "The Lumanu design system in Figma" },
          { src: "/images/lumanu/design-system-2.webp", width: 2332, height: 1638, alt: "Components mapped from the design system to code" },
        ],
      },
      {
        heading: "Tax engine",
        tags: ["Research", "0 to 1", "Client interviews"],
        problem: "Businesses needed to handle global tax compliance, and nothing like it existed in the market.",
        body: "I designed a tax engine to automate it, research driven and shaped with clients.",
        result: "A new to market feature that gave the company an edge and room to grow globally.",
        images: [
          { src: "/images/lumanu/tax-1.webp", width: 1024, height: 630, alt: "The Lumanu tax engine interface" },
          { src: "/images/lumanu/tax-2.webp", width: 1024, height: 420, alt: "Tax compliance settings in the Lumanu app" },
        ],
      },
      {
        heading: "Projects",
        tags: ["Research", "Finance UX"],
        problem: "Finance teams lacked visibility and control over spending across a diverse client base.",
        body: "I designed the Projects feature for real time visibility and control, running multiple rounds of research interviews across agencies, SMBs, enterprise, and DTC.",
        result: "Finance teams get control, and creative and marketing teams get room to run.",
        images: [
          { src: "/images/lumanu/projects-1.webp", width: 1024, height: 972, alt: "The Lumanu Projects feature" },
          { src: "/images/lumanu/projects-2.webp", width: 1024, height: 761, alt: "Project spending overview in the Lumanu app" },
        ],
      },
      {
        heading: "Vendor onboarding and compliance",
        tags: ["Heap analytics", "Compliance UX"],
        problem: "Vendor compliance requirements were getting more demanding.",
        body: "I drove multiple redesigns of onboarding using Heap funnel analytics and support data, balancing compliance with a smooth flow.",
        result: "A straightforward sign up for vendors, and fully compliant, ready to pay vendors for brands.",
        images: [
          { src: "/images/lumanu/vendor-1.webp", width: 1024, height: 609, alt: "Lumanu vendor onboarding flow" },
          { src: "/images/lumanu/vendor-2.webp", width: 1024, height: 602, alt: "Vendor compliance step in onboarding" },
          { src: "/images/lumanu/vendor-3.webp", width: 1024, height: 826, alt: "Completed vendor profile ready to pay" },
        ],
      },
    ],
    links: [{ label: "View Lumanu", href: "https://lumanu.com", external: true }],
  },
  {
    slug: "skyslope",
    name: "SkySlope",
    category: "Real Estate Platform",
    years: "2020 to 2022",
    role: "UI and UX Designer",
    intro:
      "SkySlope builds real estate transaction software. I improved the UX across DigiSign, Forms, and Breeze, and led Breeze from concept through launch.",
    hero: {
      src: "/images/skyslope.webp",
      width: 2800,
      height: 2099,
      alt: "SkySlope transaction software for real estate agents",
    },
    metrics: [],
    layout: "story",
    overview: [
      "SkySlope makes software for processing real estate transaction documents: e signing with DigiSign, guided forms with Breeze, and document management with Forms. I improved the experience and the fit between these apps, and led the design of Breeze from first concept through launch.",
    ],
    impact: [
      "Cut digital signing mistakes by ~50%",
      "Made paperwork delegation easier for whole teams",
      "Drove a 15% increase in cross product usage, opening new customer pipelines",
    ],
    workIncluded: "UX, UI, User Research",
    goals: [
      "How might we reduce the time spent on complex real estate documents?",
      "How might we give agents more time with clients?",
      "How might we create one experience across all the products?",
      "How might we push the real estate software industry forward?",
    ],
    chapters: [
      {
        title: "DigiSign, interactions",
        blocks: [
          { heading: "Problem", body: "Agent feedback kept pointing to frustration placing signatures in DigiSign. The goal was clear, make the core e signing experience much easier to use." },
          {
            heading: "Usability testing",
            body: "I ran targeted usability tests to see why users struggled. Many could not place and assign signatures correctly, a 40 to 50% error rate. 4 of 10 testers were frustrated setting the properties of each block after drawing it, and 5 of 10 struggled to change a property selection while creating a block.",
            video: "/images/skyslope/digisign-usability.webm",
          },
          {
            body: "DigiSign kept the signature block and its type selected after placement, unlike most e signing tools. That forced extra clicks and unexpected changes when moving to the next signature. Changing who a block was for also changed the signature type.",
            video: "/images/skyslope/digisign-behavior.webm",
          },
          { heading: "Ideation", body: "Solving this was not simple, since many long time users were used to the old behavior. Surveys split evenly, so I built two things, a preferences page to choose the selection behavior, and a clearer flow for changing signers that cut effort and confusion." },
          { callout: "After closing the gaps from testing, we released to everyone." },
        ],
      },
      {
        title: "Forms, team access",
        blocks: [
          { heading: "Overview", body: "Agents handle a lot of paperwork, often with assistants called transaction coordinators. I reshaped Forms to support whole teams, not just individual agents." },
          {
            heading: "Team management",
            body: "I built ways for agents to add coordinators to their accounts, and for coordinators to request access, so delegation runs smoothly.",
            images: [
              { src: "/images/skyslope/forms-team.webp", width: 2400, height: 1707, alt: "Sharing and requesting team access in Forms" },
              { src: "/images/skyslope/forms-request.webp", width: 2400, height: 1706, alt: "Requesting access with multiple emails" },
            ],
            captions: ["A user can share or request access from their team view.", "Requesting access supports multiple emails at once."],
          },
          {
            heading: "File management",
            body: "Coordinators often manage files for many agents. I added a filter by agent, so delegating paperwork is easier and much faster.",
            images: [{ src: "/images/skyslope/forms-filter.webp", width: 2400, height: 1707, alt: "Filtering files by owner in Forms" }],
            captions: ["Filter by one or more file owners to see just their files."],
          },
          {
            heading: "File history",
            body: "Agents needed to know who changed what. I added a file history, so every update is attributable to a team member.",
            images: [{ src: "/images/skyslope/forms-history.webp", width: 2400, height: 1707, alt: "File history tracking edits in Forms" }],
            captions: ["Track which editor made each change."],
          },
          { callout: "The refined flows cut digital signing mistakes by ~50%." },
        ],
      },
      {
        title: "Breeze",
        blocks: [
          { heading: "Overview", body: "Breeze launched as a new web app, building on earlier work to help agents complete the many disclosure forms required in California real estate." },
          {
            heading: "Disclosures",
            body: "Data showed 90% of California transactions involve a few key disclosure forms, MHTDS, SPQ, TDS, and EQ. I designed a wizard that guides users and auto fills these complex forms.",
            images: [{ src: "/images/skyslope/breeze-disclosures.webp", width: 2400, height: 1878, alt: "Selecting disclosure forms in Breeze" }],
            captions: ["Users pick the disclosure forms for their package."],
          },
          {
            heading: "Management",
            body: "I built a clear way for agents to track how clients were completing documents, so they could watch progress and step in when needed.",
            images: [{ src: "/images/skyslope/breeze-management.webp", width: 2400, height: 1707, alt: "Tracking document completion in Breeze" }],
            captions: ["A clear overview of single document or full package status."],
          },
          {
            heading: "Mobile first",
            body: "Agents often work on the go, so Breeze is mobile first. Text to speech on visual inspection forms lets them complete forms on site by typing or dictation.",
            images: [{ src: "/images/skyslope/breeze-mobile.webp", width: 2400, height: 1484, alt: "Completing a form on site in Breeze on mobile" }],
            captions: ["Complete the visual inspection form on site by typing or dictation."],
          },
        ],
      },
      {
        title: "Conclusion",
        blocks: [
          { heading: "Impact", list: ["Cut digital signing mistakes by ~50%", "Expanded the platform to new user segments and increased stickiness", "Drove a 15% increase in cross product usage"] },
          { heading: "Retrospective", body: "Moving fast, I overlooked one thing, the new app's authentication. It needed to work with existing products and for new users outside the ecosystem, and we only found the issue in user testing. The lesson, run a thorough technical audit to pin down changing constraints before UI design, especially after a big strategic shift." },
        ],
      },
    ],
    links: [
      { label: "View SkySlope", href: "https://skyslope.com/products-services/", external: true },
      { label: "View Breeze", href: "https://breeze.skyslope.com", external: true },
    ],
  },
  {
    slug: "granate",
    name: "Granate",
    category: "Grief Support App",
    years: "2022 to 2023",
    role: "Lead Product Designer",
    intro:
      "I led product design for an app that supports people through loss and end of life planning. My work spanned UX, brand, and product strategy for an early stage startup.",
    hero: {
      src: "/images/granate.webp",
      width: 2800,
      height: 1825,
      alt: "Granate app screens after the rebrand, alongside the component library",
    },
    metrics: [
      { figure: "~25%", text: "drop in onboarding drop off" },
      { figure: "~30%", text: "lift in weekly engagement" },
      { figure: "1", text: "full rebrand and design system" },
    ],
    sections: [
      {
        heading: "Design system",
        body: "Granate's first brand was a quick launch solution. As the company matured I led a full visual redesign and rebuilt every component under the new brand, with dedicated Figma pages per component type.",
      },
      {
        heading: "Onboarding",
        body: "Users dropped off between opening the app and the homepage because onboarding could not be skipped. I pitched and shipped a skip option at the end of account creation, which grew the user base and investor interest.",
      },
      {
        heading: "Community",
        body: "People navigating loss want connection. The MVP added story submission and viewing, profiles, and notifications. I prioritized security and blocked social sharing to non users, and drove a 30% lift in weekly engagement.",
      },
      {
        heading: "Curated tasks",
        body: "New users are overwhelmed and lack clear next steps. I developed a sliding scale of responsibility, since a grieving spouse and an executor have different needs, so qualifying questions set the role and the app recommends or hides tasks.",
      },
    ],
    links: [],
  },
  {
    slug: "easypeady",
    name: "EasyPeady",
    category: "Real Estate Form Streamlining",
    years: "2021",
    role: "Lead Product Designer",
    intro:
      "In late 2020, agents were overwhelmed by COVID related paperwork, especially the PEAD form required for every home viewing. I led the design and launch of EasyPeady, a web app that streamlined it.",
    hero: {
      src: "/images/easypeady.webp",
      width: 2800,
      height: 2202,
      alt: "EasyPeady flow for creating and sending multiple PEAD forms",
    },
    metrics: [
      { figure: "1 qtr", text: "from start to launch" },
      { figure: "15%", text: "uplift in cross product engagement" },
      { figure: "New", text: "pipeline of paying users" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "Buyer agents balance paperwork against advising clients. SkySlope data showed buyers spend about 10 weeks searching and view a median of 9 homes, so the form needed to be fast and available anywhere.",
      },
      {
        heading: "Research",
        body: "In 2020, 53% of SkySlope transactions used a PEAD form. In 2021 it was 72%. Buyer agents were 46% more likely than seller agents to report difficulty, and the only competitor gated the form behind a paid membership.",
      },
      {
        heading: "The pivot",
        body: "Mid development, SkySlope shifted strategy from a paid feature to a free standalone app to capture new users. I partnered on new branding, redesigned the key screens plus a basic style guide, and re envisioned the service blueprint.",
      },
      {
        heading: "Retrospective",
        body: "The fast schedule led to one high impact oversight. An authentication problem surfaced only in user testing after the pivot. A technical audit should have followed the strategic change.",
      },
    ],
    links: [{ label: "View Breeze", href: "https://breeze.skyslope.com", external: true }],
  },
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
