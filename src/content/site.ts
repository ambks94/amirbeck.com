export const site = {
  name: "Amir Beck",
  role: "Design Engineer",
  location: "San Francisco",
  focus: "Fintech · Payments · San Francisco",
  email: "beck@amirbeck.com",
  phone: "530-204-8757",
  phoneHref: "+15302048757",
  linkedin: "https://www.linkedin.com/in/amir-beck/",
  github: "https://github.com/amirbecklumanu",
  githubPersonal: "https://github.com/ambks94",
  lead: "I design and build software, leading Lumanu's payments platform from concept to production code.",
  sub: "",
  colophon: "I designed and built this site. Hosted on Vercel.",
  description:
    "Amir Beck is a senior design engineer and product designer in San Francisco who both designs and ships fintech products. At Lumanu he leads the design of a B2B2C payments platform and personally builds it in React, Next.js, and TypeScript. He bridges Figma to production code on a design system that compounds.",
};

// Tech behind this site, listed in the footer.
export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "CSS Modules",
  "Motion",
  "Lucide",
  "Figma",
];

export type Stat = { figure: string; text: string; source: string };

export const stats: Stat[] = [
  {
    figure: "~90%",
    text: "of the app UI redesign coded personally",
    source: "Lumanu",
  },
  {
    figure: "~50%",
    text: "cut in digital signing mistakes",
    source: "SkySlope",
  },
  { figure: "~25%", text: "drop in onboarding drop off", source: "Granate" },
  { figure: "1 quarter", text: "developed and launched", source: "EasyPeady" },
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  years: string;
  body: string;
  outcomes: string[];
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
    browser?: string;
  };
  links: { label: string; href: string; external?: boolean }[];
};

export const projects: Project[] = [
  {
    slug: "lumanu",
    name: "Lumanu",
    category: "Payments Platform",
    years: "2023 to Now",
    body: "Lumanu is a fintech that processes payments and handles tax compliance for brands paying creators. I redesigned the app from the ground up.",
    outcomes: [
      "Led full app repositioning design, rebuilding app functionality from influencer marketing to payment processing",
      "Integrated design system with code, accelerating feature development",
      "Launched features creating significant new revenue streams",
    ],
    image: {
      src: "/images/home/lumanu_home.png",
      width: 5760,
      height: 4096,
      alt: "Lumanu project detail view showing budget, spending, and a payments table",
      browser: "app.lumanu.com",
    },
    links: [
      { label: "View Case Study", href: "/lumanu" },
      { label: "View Lumanu", href: "https://lumanu.com", external: true },
    ],
  },
  {
    slug: "skyslope",
    name: "SkySlope",
    category: "Real Estate Platform",
    years: "2020 to 2022",
    body: "SkySlope builds real estate transaction software. I improved the UX across DigiSign, Forms, and Breeze, and led Breeze's design from concept through launch.",
    outcomes: [
      "Cut digital signing mistakes by ~50%",
      "Expanded product for entire real estate teams",
      "15% increase in cross product usage",
    ],
    image: {
      src: "/images/home/skyslope_home.png",
      width: 4320,
      height: 3072,
      alt: "SkySlope interface showing document and signing tools for real estate agents",
      browser: "skyslope.com",
    },
    links: [
      { label: "View Case Study", href: "/skyslope" },
      {
        label: "View SkySlope",
        href: "https://skyslope.com/products-services/",
        external: true,
      },
    ],
  },
  {
    slug: "granate",
    name: "Granate",
    category: "Grief Support App",
    years: "2022 to 2023",
    body: "I led product design for an app built to support individuals through loss and end of life planning. My focus was simplifying onboarding, driving engagement, and building a scalable design foundation.",
    outcomes: [
      "~25% drop in onboarding drop off",
      "~30% lift in weekly engagement",
      "Set up the development team for quick feature delivery",
    ],
    image: {
      src: "/images/home/granate.png",
      width: 2940,
      height: 1916,
      alt: "Granate app screens after the rebrand, alongside the component library",
    },
    links: [{ label: "View Case Study", href: "/granate" }],
  },
  {
    slug: "easypeady",
    name: "EasyPeady",
    category: "Real Estate Form Streamlining",
    years: "2021",
    body: "I streamlined the PEAD form so real estate agents could stay focused on clients during the pandemic. Built and launched as a standalone web app in one quarter.",
    outcomes: [
      "Developed and launched in a quarter",
      "15% uplift in cross product engagement",
      "Generated a pipeline of new paying users",
    ],
    image: {
      src: "/images/home/easypeady.png",
      width: 2880,
      height: 2048,
      alt: "EasyPeady flow for creating and sending multiple PEAD-V forms",
      browser: "easypeady.com",
    },
    links: [
      { label: "View Case Study", href: "/easypeady" },
      {
        label: "View Breeze",
        href: "https://breeze.skyslope.com",
        external: true,
      },
    ],
  },
];

export const practices = [
  {
    label: "Craft",
    title: "Taste is knowing what to cut",
    body: "I cut to the key problem and the business goal behind it, then design only what serves both.",
  },
  {
    label: "Systems",
    title: "The system and the code agree",
    body: "I align the design system and codebase so handoff is clean and the work is ready for AI tools.",
  },
  {
    label: "Design & code",
    title: "I build what I design",
    body: "I design a scalable system and ship it in React, Next.js, and TypeScript. I build features and use AI to prototype and optimize.",
  },
];

export const about = [
  "I'm a design engineer at Lumanu in San Francisco, working across Product, Engineering, and Marketing to create, design, and ship product features.",
  "I studied Digital Media and Economics at UC Davis, and started out designing and developing websites for clients.",
  "I'm currently working on side projects like Glizzy. Outside of work I love to cook, write and play music, run, and shoot nature photography.",
];

export const kit = [
  {
    label: "Engineering",
    text: "Production quality UI in React, TypeScript, and Next.js, with modern HTML and CSS. Design to code with Code Connect and the Figma MCP, plus design tokens, animation, web performance, accessibility, and CI/CD.",
  },
  {
    label: "Tooling",
    text: "I build and prototype with AI native, design first tools daily. Cursor, Claude Code, Claude, Figma Make, Figma MCP, Code Connect, Paper, Framer AI, Motion, and the Vercel AI SDK.",
  },
  {
    label: "Design & systems",
    text: "Figma, prototyping, and motion. Design systems that compound in reusable components, variants, Token Studio, and Storybook.",
  },
  {
    label: "Product",
    text: "Taste and judgment on what to build. Product strategy and roadmapping, 0 to 1 through launch, AI assisted prototyping, research, and experimentation.",
  },
];
