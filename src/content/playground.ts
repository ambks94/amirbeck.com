export const playgroundGroupOrder = ["company", "personal"] as const;

export type PlaygroundGroupId = (typeof playgroundGroupOrder)[number];

type PlaygroundBase = {
  slug: string;
  title: string;
  blurb: string;
  problem: string;
  solution: string;
  description: string;
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
