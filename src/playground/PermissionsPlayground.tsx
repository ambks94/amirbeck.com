"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  ChevronDown,
  ChevronUp,
  CircleMinus,
  Folders,
  Info,
  KeyRound,
  Landmark,
  Plus,
  ReceiptText,
  Settings,
  SquarePen,
  Stamp,
  UsersRound,
  WalletMinimal,
} from "lucide-react";
import LiveFrame from "@/components/LiveFrame";
import {
  expandGrant,
  groupCount,
  groupIsFull,
  groupPermIds,
  groupsFor,
  groupsHeld,
  hasEveryPerm,
  isRowOn,
  newInvitee,
  seedInvitees,
  validateInvitee,
  type GroupDef,
  type Invitee,
  type Perm,
  type WorkspaceKind,
} from "./permissionsModel";
import styles from "./PermissionsPlayground.module.css";

const ICONS: Record<GroupDef["icon"], LucideIcon> = {
  info: Info,
  squarePen: SquarePen,
  stamp: Stamp,
  banknote: Banknote,
  folders: Folders,
  landmark: Landmark,
  receiptText: ReceiptText,
  wallet: WalletMinimal,
  settings: Settings,
  users: UsersRound,
};

const OverlayRoot = createContext<HTMLElement | null>(null);

function GroupIcon({ name, size }: { name: GroupDef["icon"]; size: number }) {
  const Icon = ICONS[name];
  return <Icon size={size} strokeWidth={2} aria-hidden="true" />;
}

function PermChip({ group, held }: { group: GroupDef; held: Set<string> }) {
  const overlay = useContext(OverlayRoot);
  const chipRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const place = useCallback(() => {
    const node = chipRef.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    setCoords({ top: box.top, left: box.left + box.width / 2 });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open, place]);

  const count = groupCount(group, held);
  const total = group.permissions.length;
  const suffix = count > 0 && count < total ? ` (${count}/${total})` : "";

  const tip =
    open && overlay
      ? createPortal(
          <span
            className={styles.tip}
            role="tooltip"
            style={{ top: coords.top, left: coords.left }}
          >
            <span className={styles.tipTitle}>{group.title}</span>
            {group.permissions.map((row) => (
              <span key={row.id} className={styles.tipRow}>
                <span
                  className={styles.dot}
                  data-on={isRowOn(held, row) ? "true" : "false"}
                />
                <span className={styles.body3}>{row.title}</span>
              </span>
            ))}
          </span>,
          overlay,
        )
      : null;

  return (
    <span
      ref={chipRef}
      className={styles.chip}
      tabIndex={0}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <GroupIcon name={group.icon} size={12} />
      {group.chip}
      {suffix}
      {tip}
    </span>
  );
}

function Chips({ kind, held }: { kind: WorkspaceKind; held: Set<string> }) {
  if (hasEveryPerm(kind, held)) {
    return (
      <span className={styles.chip}>
        <KeyRound size={12} strokeWidth={2} aria-hidden="true" />
        All
      </span>
    );
  }

  return groupsHeld(kind, held).map((group) => (
    <PermChip key={group.id} group={group} held={held} />
  ));
}

function InviteeCard({
  invitee,
  idx,
  selected,
  error,
  removable,
  loading,
  kind,
  onSelect,
  onEmail,
  onRemove,
}: {
  invitee: Invitee;
  idx: number;
  selected: boolean;
  error: string;
  removable: boolean;
  loading: boolean;
  kind: WorkspaceKind;
  onSelect: () => void;
  onEmail: (value: string) => void;
  onRemove: () => void;
}) {
  const held = new Set(invitee.held);
  const hasChips =
    hasEveryPerm(kind, held) || groupsHeld(kind, held).length > 0;

  return (
    <div className={styles.inviteeRow}>
      <div
        className={styles.inviteeCard}
        data-selected={selected}
        data-error={Boolean(error)}
        onClick={onSelect}
      >
        <div className={styles.inviteeField}>
          <label className={styles.fieldLabel} htmlFor={`email-${invitee.id}`}>
            Email
          </label>
          <input
            className={styles.textInput}
            id={`email-${invitee.id}`}
            type="text"
            placeholder="Enter member's email address"
            value={invitee.email}
            disabled={loading}
            onChange={(event) =>
              onEmail(event.target.value.toLowerCase().trim())
            }
            onFocus={onSelect}
            onClick={(event) => event.stopPropagation()}
          />
          {error ? <p className={styles.fieldError}>{error}</p> : null}
        </div>
        {hasChips ? (
          <>
            <div className={styles.divider} />
            <div className={styles.chips}>
              <Chips kind={kind} held={held} />
            </div>
          </>
        ) : null}
      </div>
      <button
        type="button"
        className={styles.btnIcon}
        data-hidden={!removable}
        aria-label={`Remove row ${idx + 1}`}
        disabled={loading}
        onClick={onRemove}
      >
        <CircleMinus size={16} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}

function GroupCard({
  group,
  held,
  expanded,
  loading,
  onToggleGroup,
  onToggleRow,
  onExpand,
}: {
  group: GroupDef;
  held: Set<string>;
  expanded: boolean;
  loading: boolean;
  onToggleGroup: (enabled: boolean) => void;
  onToggleRow: (row: Perm, enabled: boolean) => void;
  onExpand: () => void;
}) {
  const total = group.permissions.length;
  const count = groupCount(group, held);
  const all = groupIsFull(group, held);
  const partial = count > 0 && !all;

  return (
    <div className={styles.groupCard} data-on={count > 0}>
      <div className={styles.groupTop}>
        <div className={styles.groupId}>
          <GroupIcon name={group.icon} size={16} />
          <button
            type="button"
            className={styles.groupName}
            aria-expanded={expanded}
            aria-label={`${expanded ? "Hide" : "Show"} ${group.title}`}
            onClick={onExpand}
          >
            <span className={styles.body1}>{group.title}</span>
            {expanded ? (
              <ChevronUp size={16} strokeWidth={2} aria-hidden="true" />
            ) : (
              <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
          {partial ? (
            <span className={styles.chipCount}>
              {count}/{total}
            </span>
          ) : null}
        </div>
        <input
          className={styles.cbx}
          type="checkbox"
          aria-label={`Select all ${group.title}`}
          checked={all}
          disabled={loading}
          ref={(el) => {
            if (el) el.indeterminate = partial;
          }}
          onChange={(event) => onToggleGroup(event.target.checked)}
        />
      </div>
      <div className={styles.collapse} data-open={expanded}>
        <div className={styles.collapseInner}>
          <div className={styles.permTableWrap}>
            <table className={styles.permTable} data-disabled={loading}>
              <tbody>
                {group.permissions.map((row) => {
                  const checked = isRowOn(held, row);
                  return (
                    <tr
                      key={row.id}
                      onClick={() => {
                        if (!loading) onToggleRow(row, !checked);
                      }}
                    >
                      <td>
                        <p className={styles.body1}>{row.title}</p>
                      </td>
                      <td className={styles.cbxCell}>
                        <input
                          className={styles.cbx}
                          type="checkbox"
                          aria-label={row.title}
                          checked={checked}
                          disabled={loading}
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) =>
                            onToggleRow(row, event.target.checked)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddMembers() {
  const [kind, setKind] = useState<WorkspaceKind>("brand");
  const [invitees, setInvitees] = useState(() => seedInvitees("brand"));
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [overlay, setOverlay] = useState<HTMLDivElement | null>(null);

  const groups = useMemo(() => groupsFor(kind), [kind]);
  const selected = invitees[selectedIdx] ?? invitees[0];
  const held = new Set(selected?.held ?? []);

  function patchInvitee(idx: number, next: Partial<Invitee>) {
    setInvitees((list) =>
      list.map((invitee, i) => (i === idx ? { ...invitee, ...next } : invitee)),
    );
  }

  function applyToggle(ids: string[], enabled: boolean) {
    if (!selected) return;
    const next = new Set(selected.held);
    const granted = enabled ? expandGrant(kind, ids) : ids;
    for (const id of granted) {
      if (enabled) next.add(id);
      else next.delete(id);
    }
    patchInvitee(selectedIdx, { held: [...next] });
  }

  function reset() {
    setInvitees(seedInvitees(kind));
    setSelectedIdx(0);
    setErrors([]);
    setExpanded({});
  }

  function switchKind(next: WorkspaceKind) {
    if (next === kind) return;
    setKind(next);
    setInvitees(seedInvitees(next));
    setSelectedIdx(0);
    setErrors([]);
    setExpanded({});
  }

  function onSubmit() {
    const messages = invitees.map(validateInvitee);
    if (messages.some(Boolean)) {
      setErrors(messages);
      return;
    }
    setErrors([]);
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setInvitees(seedInvitees(kind));
      setSelectedIdx(0);
      setExpanded({});
    }, 900);
  }

  return (
    <div className={styles.root}>
      <header className={styles.benchHead}>
        <div className={styles.benchCopy}>
          <p className={styles.benchTitle}>Add Members Modal</p>
          <p className={styles.benchSub}>
            Invite members and set permissions per member. Brand and vendor
            workspaces get different permissions.
          </p>
        </div>
        <button type="button" className={styles.benchReset} onClick={reset}>
          Reset
        </button>
      </header>
      <div className={styles.dialog} ref={setOverlay}>
        <OverlayRoot.Provider value={overlay}>
          <div className={styles.modalHead}>
            <h2 className={styles.h6}>Add members</h2>
            <p className={`${styles.body2} ${styles.muted}`}>
              Invite members to your workspace.
            </p>
          </div>
          <div className={styles.divider} />
          <div className={styles.modalBody}>
            <div className={styles.invitees}>
              {invitees.map((invitee, idx) => (
                <InviteeCard
                  key={invitee.id}
                  invitee={invitee}
                  idx={idx}
                  selected={idx === selectedIdx}
                  error={errors[idx] ?? ""}
                  removable={invitees.length > 1}
                  loading={loading}
                  kind={kind}
                  onSelect={() => setSelectedIdx(idx)}
                  onEmail={(email) => patchInvitee(idx, { email })}
                  onRemove={() => {
                    const lastIdx = invitees.length - 2;
                    setInvitees((list) => list.filter((_, i) => i !== idx));
                    setErrors((list) => list.filter((_, i) => i !== idx));
                    setSelectedIdx((current) => {
                      const moved = current > idx ? current - 1 : current;
                      return Math.max(0, Math.min(moved, lastIdx));
                    });
                  }}
                />
              ))}
              <div className={styles.addAnother}>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnText}`}
                  disabled={loading}
                  onClick={() => {
                    const next = newInvitee(kind, "");
                    setInvitees((list) => [...list, next]);
                    setSelectedIdx(invitees.length);
                  }}
                >
                  <Plus size={14} strokeWidth={2} aria-hidden="true" />
                  Add another
                </button>
              </div>
            </div>
            <div className={styles.panelWrap}>
              <div className={styles.panel}>
                <div className={styles.panelHead}>
                  <p className={styles.body1}>
                    Permissions for{" "}
                    {selected?.email ? selected.email : "new team member"}
                  </p>
                  <p className={`${styles.body2} ${styles.muted}`}>
                    These permissions apply only to this member.
                  </p>
                </div>
                <div className={styles.panelScroll}>
                  <div className={styles.permissionsList}>
                    {groups.map((group) => (
                      <GroupCard
                        key={group.id}
                        group={group}
                        held={held}
                        expanded={Boolean(expanded[group.id])}
                        loading={loading}
                        onExpand={() =>
                          setExpanded((current) => ({
                            ...current,
                            [group.id]: !current[group.id],
                          }))
                        }
                        onToggleGroup={(enabled) =>
                          applyToggle(groupPermIds(group), enabled)
                        }
                        onToggleRow={(row, enabled) =>
                          applyToggle([row.id], enabled)
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.modalFoot}>
            <div className={styles.btnGroup}>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnText}`}
                onClick={reset}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnContained}`}
                disabled={loading}
                onClick={onSubmit}
              >
                Send invites
              </button>
            </div>
          </div>
        </OverlayRoot.Provider>
      </div>

      <div className={styles.controls}>
        <p className={styles.controlsLabel}>Workspace type</p>
        <div className={styles.seg}>
          <button
            type="button"
            aria-pressed={kind === "brand"}
            onClick={() => switchKind("brand")}
          >
            Brand
          </button>
          <button
            type="button"
            aria-pressed={kind === "vendor"}
            onClick={() => switchKind("vendor")}
          >
            Vendor
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PermissionsPlayground() {
  return (
    <LiveFrame url="app / settings / team">
      <AddMembers />
    </LiveFrame>
  );
}
