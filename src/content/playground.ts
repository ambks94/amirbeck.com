export const playgroundGroupOrder = ["company", "personal"] as const;

export type PlaygroundGroupId = (typeof playgroundGroupOrder)[number];

type PlaygroundBase = {
  slug: string;
  title: string;
  blurb: string;
  problem: string;
  solution: string;
  description: string;
  disclaimer?: string;
  note?: string;
};

export type PlaygroundItem =
  | (PlaygroundBase & { kind: "company"; company: string })
  | (PlaygroundBase & { kind: "personal" });

export const playgroundGroupLabels: Record<PlaygroundGroupId, string> = {
  company: "Company work",
  personal: "Side projects",
};

export const playgroundItems: PlaygroundItem[] = [
  {
    slug: "permissions",
    title: "Permissions",
    kind: "company",
    company: "Lumanu",
    blurb: "Granular workspace permissioning",
    problem:
      "Our roles could not meet the different requirements from buyer auditors.",
    solution:
      "We moved to permission groups, so access can be set per user for enterprise companies with stricter compliance requirements.",
    description: "Granular workspace permissioning",
  },
  {
    slug: "withdrawal",
    title: "Simplify Linking Withdrawal Methods",
    kind: "company",
    company: "Lumanu",
    blurb: "Linking withdrawal methods & live currency conversion",
    problem:
      "Users were confused when linking their withdrawal method, resulting in support tickets.",
    solution:
      "Simplify the flow and guide users, starting with country and currency, then showing the withdrawal methods that work for that pair.",
    description: "Link a withdrawal method by wallet",
    disclaimer:
      "The exchange rate displayed is for demonstration purposes only. It does not reflect any company financial policy.",
    note: "The wallet is a fixed $1,000 USD. Currency conversion uses a live mid market rate from open.er-api.com, refreshed every 15 minutes. I read the country header Vercel provides to set your default country for the input, or your browser's timezone if that's missing.",
  },
];

export function playgroundBySlug(slug: string) {
  return playgroundItems.find((item) => item.slug === slug);
}

export function playgroundHref(slug: string) {
  return `/playground#${slug}`;
}

export function playgroundGroups() {
  return playgroundGroupOrder.map((id) => ({
    id,
    label: playgroundGroupLabels[id],
    items: playgroundItems.filter((item) => item.kind === id),
  }));
}
