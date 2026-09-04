export type WorkspaceKind = "brand" | "vendor";

export type Perm = {
  id: string;
  title: string;
  needs?: string[];
};

export type GroupDef = {
  id: string;
  title: string;
  chip: string;
  icon:
    | "info"
    | "squarePen"
    | "stamp"
    | "banknote"
    | "folders"
    | "landmark"
    | "receiptText"
    | "wallet"
    | "settings"
    | "users";
  permissions: Perm[];
};

const userManagement: GroupDef = {
  id: "users",
  title: "User Management",
  chip: "Users",
  icon: "users",
  permissions: [
    {
      id: "manageMembers",
      title: "Manage members and set permissions",
      needs: ["viewMembers"],
    },
  ],
};

const brand: GroupDef[] = [
  {
    id: "general",
    title: "General",
    chip: "General",
    icon: "info",
    permissions: [
      { id: "partners", title: "View and Manage Partners" },
      { id: "viewPayouts", title: "View payouts" },
      { id: "viewMembers", title: "View members" },
    ],
  },
  {
    id: "createPayouts",
    title: "Create Payouts",
    chip: "Create Payouts",
    icon: "squarePen",
    permissions: [
      { id: "createPayouts", title: "Create payouts", needs: ["viewPayouts"] },
      { id: "uploadCsv", title: "Upload CSV", needs: ["viewPayouts"] },
      { id: "editPayouts", title: "Edit payouts", needs: ["viewPayouts"] },
    ],
  },
  {
    id: "approvePayouts",
    title: "Approve Payouts",
    chip: "Approve Payouts",
    icon: "stamp",
    permissions: [
      {
        id: "approvePayouts",
        title: "Approve and unapprove payouts",
        needs: ["viewPayouts"],
      },
    ],
  },
  {
    id: "payPayouts",
    title: "Pay Payouts",
    chip: "Pay Payouts",
    icon: "banknote",
    permissions: [
      {
        id: "payWithBalance",
        title: "Use balance to pay payout",
        needs: ["viewPayouts"],
      },
      {
        id: "payViaInvoice",
        title: "Pay via funding invoice",
        needs: ["viewPayouts"],
      },
    ],
  },
  {
    id: "projects",
    title: "Manage Projects",
    chip: "Projects",
    icon: "folders",
    permissions: [
      { id: "createProjects", title: "Create projects" },
      { id: "editProjects", title: "Edit and archive projects" },
    ],
  },
  {
    id: "finance",
    title: "Finance Management",
    chip: "Finances",
    icon: "landmark",
    permissions: [
      { id: "viewBalance", title: "View balance & transaction history" },
      {
        id: "createFundingInvoice",
        title: "Create funding invoices",
        needs: ["viewBalance"],
      },
      {
        id: "applyDeposits",
        title: "Apply deposits to funding invoices",
        needs: ["viewBalance"],
      },
      {
        id: "requestWithdrawals",
        title: "Request withdrawals by email",
        needs: ["viewBalance"],
      },
    ],
  },
  {
    id: "workspace",
    title: "Workspace Management",
    chip: "Workspace",
    icon: "settings",
    permissions: [
      { id: "orgSettings", title: "Manage organization settings" },
      { id: "taxSetup", title: "Set up tax info and workspace details" },
    ],
  },
  userManagement,
];

const vendor: GroupDef[] = [
  {
    id: "general",
    title: "General",
    chip: "General",
    icon: "info",
    permissions: [
      { id: "viewInvoices", title: "View invoices" },
      { id: "partners", title: "View and Manage Partners" },
      { id: "viewMembers", title: "View workspace members" },
    ],
  },
  {
    id: "invoices",
    title: "Create Invoices",
    chip: "Invoices",
    icon: "receiptText",
    permissions: [
      {
        id: "createInvoices",
        title: "Create invoices",
        needs: ["viewInvoices"],
      },
    ],
  },
  {
    id: "wallet",
    title: "Wallet",
    chip: "Wallet",
    icon: "wallet",
    permissions: [
      { id: "viewBalance", title: "View balance & transaction history" },
      { id: "linkBank", title: "Link bank & withdraw funds" },
      { id: "instantPay", title: "Request instant pay" },
    ],
  },
  {
    id: "workspace",
    title: "Workspace Management",
    chip: "Workspace",
    icon: "settings",
    permissions: [
      { id: "orgSettings", title: "Manage organization settings" },
      { id: "taxSetup", title: "Set up tax info and workspace details" },
    ],
  },
  userManagement,
];

export function groupsFor(kind: WorkspaceKind) {
  return kind === "vendor" ? vendor : brand;
}

export function permById(kind: WorkspaceKind, id: string) {
  for (const group of groupsFor(kind)) {
    const perm = group.permissions.find((row) => row.id === id);
    if (perm) return perm;
  }
  return undefined;
}

export function groupPermIds(group: GroupDef) {
  return group.permissions.map((row) => row.id);
}

export function expandGrant(kind: WorkspaceKind, ids: string[]) {
  const next = new Set(ids);
  for (const id of ids) {
    for (const need of permById(kind, id)?.needs ?? []) next.add(need);
  }
  return [...next];
}

export function isRowOn(held: Set<string>, row: Perm) {
  return held.has(row.id);
}

export function groupCount(group: GroupDef, held: Set<string>) {
  return group.permissions.filter((row) => isRowOn(held, row)).length;
}

export function groupIsFull(group: GroupDef, held: Set<string>) {
  return group.permissions.every((row) => isRowOn(held, row));
}

export function groupsHeld(kind: WorkspaceKind, held: Set<string>) {
  return groupsFor(kind).filter((group) =>
    group.permissions.some((row) => isRowOn(held, row)),
  );
}

export function hasEveryPerm(kind: WorkspaceKind, held: Set<string>) {
  return groupsFor(kind).every((group) => groupIsFull(group, held));
}

export function defaultHeld(kind: WorkspaceKind) {
  return groupPermIds(groupsFor(kind)[0]);
}

export function starterHeld(kind: WorkspaceKind) {
  const extra =
    kind === "vendor"
      ? ["createInvoices", "viewBalance"]
      : ["createPayouts", "editPayouts", "viewBalance"];
  return expandGrant(kind, [...defaultHeld(kind), ...extra]);
}

export type Invitee = {
  id: string;
  email: string;
  held: string[];
};

export function newInvitee(kind: WorkspaceKind, email = ""): Invitee {
  return {
    id: crypto.randomUUID(),
    email,
    held: defaultHeld(kind),
  };
}

export function seedInvitees(kind: WorkspaceKind): Invitee[] {
  return [
    {
      id: "seed-dana",
      email: "dana@northwindstudio.com",
      held: starterHeld(kind),
    },
    {
      id: "seed-empty",
      email: "",
      held: defaultHeld(kind),
    },
  ];
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInvitee(invitee: Invitee) {
  if (!EMAIL_RE.test(invitee.email)) return "Enter a valid email address.";
  if (invitee.held.length < 1)
    return "Turn on at least one permission for this member.";
  return "";
}
