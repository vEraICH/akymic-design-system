/**
 * WCAG contrast validation for a derived TokenSet.
 *
 * Checks the critical foreground/background pairs that users actually encounter.
 * Target: AA (4.5:1) for all text-on-surface pairs.
 */

import { parseColor, contrastRatio } from "./color.js";
import type { TokenSet, ContrastPair, ContrastReport } from "./types.js";

interface PairDef {
  role:  string;
  fg:    keyof TokenSet;
  bg:    keyof TokenSet;
  /**
   * When true, this pair is informational only — failures are shown in the report
   * but do NOT cause the overall `pass` flag to be false.
   * Used for fixed (non-derived) tokens that the engine cannot adjust.
   */
  informational?: boolean;
}

const PAIRS: PairDef[] = [
  // ── Derived pairs — these MUST pass (engine can fix them) ─────────────────
  { role: "foreground on background",              fg: "foreground",                bg: "background" },
  { role: "foreground on card",                    fg: "card-foreground",           bg: "card" },
  { role: "foreground on popover",                 fg: "popover-foreground",        bg: "popover" },
  { role: "primary on background",                 fg: "primary",                   bg: "background" },
  { role: "primary-foreground on primary",         fg: "primary-foreground",        bg: "primary" },
  { role: "secondary-foreground on secondary",     fg: "secondary-foreground",      bg: "secondary" },
  { role: "muted-foreground on muted",             fg: "muted-foreground",          bg: "muted" },
  { role: "muted-foreground on background",        fg: "muted-foreground",          bg: "background" },
  { role: "accent-foreground on accent",           fg: "accent-foreground",         bg: "accent" },
  // ── Fixed intent pairs — informational only (engine cannot adjust these) ──
  { role: "destructive-foreground on destructive", fg: "destructive-foreground",    bg: "destructive",  informational: true },
  { role: "success-foreground on success",         fg: "success-foreground",        bg: "success",      informational: true },
  { role: "warning-foreground on warning",         fg: "warning-foreground",        bg: "warning",      informational: true },
];

export function buildContrastReport(tokens: TokenSet): ContrastReport {
  const pairs: ContrastPair[] = PAIRS.map(({ role, fg, bg, informational }) => {
    const fgVal = tokens[fg] as string;
    const bgVal = tokens[bg] as string;

    if (!fgVal || !bgVal || fgVal.includes("rem") || bgVal.includes("rem")) {
      return { role, fg: fgVal, bg: bgVal, ratio: 0, pass: true, informational };
    }

    try {
      const fgColor = parseColor(fgVal);
      const bgColor = parseColor(bgVal);
      const ratio = contrastRatio(fgColor, bgColor);
      return {
        role, fg: fgVal, bg: bgVal,
        ratio: Math.round(ratio * 100) / 100,
        pass: ratio >= 4.5,
        informational,
      };
    } catch {
      return { role, fg: fgVal, bg: bgVal, ratio: 0, pass: false, informational };
    }
  });

  // Only derived (non-informational) pairs determine overall pass
  return {
    pass: pairs.filter((p) => !p.informational).every((p) => p.pass),
    pairs,
  };
}
