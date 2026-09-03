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
  lead:
    "I design and build software, leading Lumanu's payments platform from concept to production code.",
  sub: "",
};

export const workIntro =
  "Fintech and real estate products, designed and coded end to end.";

export type Stat = { figure: string; text: string; source: string };

export const stats: Stat[] = [
  { figure: "90%", text: "of the app redesign coded personally", source: "Lumanu" },
  { figure: "~50%", text: "cut in digital signing mistakes", source: "SkySlope" },
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
  image: { src: string; width: number; height: number; alt: string };
  links: { label: string; href: string; external?: boolean }[];
};

export const projects: Project[] = [
  {
    slug: "lumanu",
    name: "Lumanu",
    category: "Payments Platform",
    years: "2023 to Now",
    body:
      "I lead the design of Lumanu's B2B2C payments platform. I redesigned the app from the ground up and personally coded 90% of it.",
    outcomes: [
      "Led full app redesign, pivoting company strategy from influencer marketing to payments",
      "Integrated design system with code, accelerating feature development",
      "Launched features creating significant new revenue streams",
    ],
    image: {
      src: "/images/lumanu.webp",
      width: 2000,
      height: 1500,
      alt: "Lumanu buyer dashboard, a role aware homepage showing an overview of the workspace",
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
    body:
      "SkySlope builds real estate transaction software. I improved the UX across DigiSign, Forms, and Breeze, and led Breeze's design from concept through launch.",
    outcomes: [
      "Cut digital signing mistakes by ~50%",
      "Expanded product for entire real estate teams",
      "15% increase in cross product usage",
    ],
    image: {
      src: "/images/skyslope.webp",
      width: 2000,
      height: 1500,
      alt: "SkySlope interface showing document and signing tools for real estate agents",
    },
    links: [
      { label: "View Case Study", href: "/skyslope" },
      { label: "View SkySlope", href: "https://skyslope.com/products-services/", external: true },
    ],
  },
  {
    slug: "granate",
    name: "Granate",
    category: "Grief Support App",
    years: "2022 to 2023",
    body:
      "I led product design for an app built to support individuals through loss and end of life planning. My focus was simplifying onboarding, driving engagement, and building a scalable design foundation.",
    outcomes: [
      "~25% drop in onboarding drop off",
      "~30% lift in weekly engagement",
      "Set up the development team for quick feature delivery",
    ],
    image: {
      src: "/images/granate.webp",
      width: 2000,
      height: 1304,
      alt: "Granate app screens after the rebrand, alongside the component library",
    },
    links: [{ label: "View Case Study", href: "/granate" }],
  },
  {
    slug: "easypeady",
    name: "EasyPeady",
    category: "Real Estate Form Streamlining",
    years: "2021",
    body:
      "I streamlined the PEAD form so real estate agents could stay focused on clients during the pandemic. Built and launched as a standalone web app in one quarter.",
    outcomes: [
      "Developed and launched in a quarter",
      "15% uplift in cross product engagement",
      "Generated a pipeline of new paying users",
    ],
    image: {
      src: "/images/easypeady.webp",
      width: 2000,
      height: 1573,
      alt: "EasyPeady flow for creating and sending multiple PEAD-V forms",
    },
    links: [
      { label: "View Case Study", href: "/easypeady" },
      { label: "View Breeze", href: "https://breeze.skyslope.com", external: true },
    ],
  },
];

export const practices = [
  {
    label: "Craft",
    title: "Taste is knowing what to cut",
    body:
      "I cut to the key problem and the business goal behind it, then design only what serves both.",
  },
  {
    label: "Systems",
    title: "The system and the code agree",
    body:
      "I align the design system and codebase so handoff is clean and the work is ready for AI tools.",
  },
  {
    label: "Design & code",
    title: "I build what I design",
    body:
      "I design a scalable system and ship it in React, Next.js, and TypeScript. I build features and use AI to prototype and optimize.",
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
    label: "Design & systems",
    text: "Figma, prototyping, and motion. Design systems that compound in reusable components, variants, Token Studio, and Storybook.",
  },
  {
    label: "Product",
    text: "Taste and judgment on what to build. Product strategy and roadmapping, 0 to 1 through launch, AI assisted prototyping, research, and experimentation.",
  },
];
