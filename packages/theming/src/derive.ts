/**
 * Theme derivation engine.
 *
 * Takes a ThemeManifest (~5 inputs) and produces a complete DerivedTheme
 * (light + dark TokenSets + contrast reports).
 *
 * Rules:
 * - --destructive is fixed (not themeable — red = universal danger signal)
 * - All foreground tokens are derived to pass WCAG AA (4.5:1) automatically
 * - muted-foreground targets AA (4.5:1) for readable secondary text
 */

import {
  parseColor,
  hslToString,
  contrastRatio,
  adjustToContrast,
} from "./color.js";
import type { HslColor, ThemeManifest, TokenSet, DerivedTheme } from "./types.js";
import { buildContrastReport } from "./validate.js";

// ── Fixed tokens (never themeable) ────────────────────────────────────────────

const DESTRUCTIVE_LIGHT: HslColor = { h: 0, s: 84.2, l: 60.2 };
const DESTRUCTIVE_DARK: HslColor  = { h: 0, s: 84.2, l: 60.2 };
const DESTRUCTIVE_FG: HslColor    = { h: 0, s: 0, l: 98 };

// Success and warning are fixed design decisions, not brand-variable
const SUCCESS_LIGHT: HslColor = { h: 142, s: 76, l: 36 };
const SUCCESS_DARK:  HslColor = { h: 142, s: 72, l: 52 };
const SUCCESS_FG:    HslColor = { h: 0, s: 0, l: 98 };

const WARNING_LIGHT: HslColor     = { h: 43, s: 96, l: 37 };
const WARNING_DARK:  HslColor     = { h: 43, s: 96, l: 56 };
const WARNING_FG_LIGHT: HslColor  = { h: 0,  s: 0,  l: 98 };
const WARNING_FG_DARK: HslColor   = { h: 38, s: 90, l: 10 };

// ── Radius map ────────────────────────────────────────────────────────────────

const RADIUS_MAP: Record<Required<ThemeManifest>["radius"], string> = {
  none: "0rem",
  sm:   "0.375rem",
  md:   "0.75rem",
  lg:   "1rem",
  full: "9999px",
};

// ── Neutral hue config ────────────────────────────────────────────────────────

interface NeutralConfig {
  h: number;  // base hue for neutral surfaces
  s: number;  // base saturation for neutral surfaces
}

function neutralConfig(neutral: ThemeManifest["neutral"] = "cool"): NeutralConfig {
  switch (neutral) {
    case "warm":    return { h: 30,  s: 6  };
    case "neutral": return { h: 220, s: 3  };
    case "cool":
    default:        return { h: 220, s: 7  };
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

export function deriveTheme(manifest: ThemeManifest): DerivedTheme {
  const primary = parseColor(manifest.primary);
  const nc = neutralConfig(manifest.neutral);
  const radius = RADIUS_MAP[manifest.radius ?? "md"];

  const light = deriveLight(primary, nc, radius, manifest.backgroundLightness ?? 97.5);
  const dark  = deriveDark(primary, nc, radius, manifest.darkBackgroundLightness ?? 8);

  return {
    manifest,
    light,
    dark,
    contrast: {
      light: buildContrastReport(light),
      dark:  buildContrastReport(dark),
    },
  };
}

// ── Light mode derivation ─────────────────────────────────────────────────────

function deriveLight(
  primary: HslColor,
  nc: NeutralConfig,
  radius: string,
  bgLightness: number
): TokenSet {
  // Backgrounds
  const background: HslColor = { h: nc.h, s: nc.s, l: bgLightness };
  const card: HslColor       = { h: nc.h, s: nc.s, l: Math.max(bgLightness - 1.5, 90) };
  const popover: HslColor    = { h: nc.h, s: nc.s, l: Math.min(bgLightness + 1, 100) };

  // Foregrounds — adjusted to ≥7:1 (AAA body text)
  const foreground        = adjustToContrast({ h: nc.h, s: nc.s + 5, l: 12 }, background, 7, true);
  const cardForeground    = adjustToContrast({ ...foreground }, card, 7, true);
  const popoverForeground = adjustToContrast({ ...foreground }, popover, 7, true);

  // Primary — darken if needed to pass AA on background (4.52 buffer avoids float boundary)
  const primaryAdj = adjustToContrast(primary, background, 4.52, true);
  const primaryFg  = pickForeground(primaryAdj);

  // Secondary — washed-out primary tint
  const secondary: HslColor   = { h: primary.h, s: 10, l: 92 };
  const secondaryFg           = adjustToContrast({ h: nc.h, s: nc.s + 5, l: 20 }, secondary, 4.5, true);

  // Muted — neutral surface
  const muted: HslColor       = { h: nc.h, s: nc.s + 3, l: 94 };
  // muted-foreground targets 4.5:1 — readable secondary text
  const mutedFg               = adjustToContrast({ h: nc.h, s: nc.s + 5, l: 40 }, muted, 4.5, true);

  // Accent — slightly saturated, hover/selection surface
  const accent: HslColor      = { h: primary.h, s: 15, l: 90 };
  const accentFg              = adjustToContrast({ h: primary.h, s: 50, l: 20 }, accent, 4.5, true);

  // Borders / inputs
  const border: HslColor      = { h: nc.h, s: nc.s + 6, l: 88 };
  const input: HslColor       = { ...border };
  const ring: HslColor        = primaryAdj;

  return toTokenSet({
    background, foreground,
    card, cardForeground,
    popover, popoverForeground,
    primary: primaryAdj, primaryFg,
    secondary, secondaryFg,
    muted, mutedFg,
    accent, accentFg,
    destructive: DESTRUCTIVE_LIGHT, destructiveFg: DESTRUCTIVE_FG,
    success: SUCCESS_LIGHT, successFg: SUCCESS_FG,
    warning: WARNING_LIGHT, warningFg: WARNING_FG_LIGHT,
    border, input, ring,
    radius,
  });
}

// ── Dark mode derivation ──────────────────────────────────────────────────────

function deriveDark(
  primary: HslColor,
  nc: NeutralConfig,
  radius: string,
  bgLightness: number
): TokenSet {
  // Backgrounds
  const background: HslColor = { h: nc.h, s: nc.s + 2, l: bgLightness };
  const card: HslColor       = { h: nc.h, s: nc.s + 2, l: bgLightness + 4 };
  const popover: HslColor    = { h: nc.h, s: nc.s + 2, l: bgLightness + 3 };

  // Foregrounds — adjusted to ≥7:1 on their respective surfaces
  const foreground        = adjustToContrast({ h: nc.h, s: nc.s, l: 96 }, background, 7, false);
  const cardForeground    = adjustToContrast({ ...foreground }, card, 7, false);
  const popoverForeground = adjustToContrast({ ...foreground }, popover, 7, false);

  // Primary — lighten for dark bg contrast (4.52 buffer avoids float boundary)
  const primaryAdj = adjustToContrast(primary, background, 4.52, false);
  const primaryFg  = pickForeground(primaryAdj);

  // Secondary — dark tinted surface
  const secondary: HslColor   = { h: primary.h, s: 10, l: bgLightness + 10 };
  const secondaryFg           = adjustToContrast({ h: nc.h, s: nc.s, l: 90 }, secondary, 4.5, false);

  // Muted
  const muted: HslColor       = { h: nc.h, s: nc.s + 3, l: bgLightness + 7 };
  const mutedFg               = adjustToContrast({ h: nc.h, s: nc.s + 5, l: 60 }, muted, 4.5, false);

  // Accent
  const accent: HslColor      = { h: primary.h, s: 15, l: bgLightness + 14 };
  const accentFg              = adjustToContrast({ h: primary.h, s: 40, l: 90 }, accent, 4.5, false);

  // Borders / inputs — subtle in dark mode
  const border: HslColor      = { h: nc.h, s: nc.s + 6, l: bgLightness + 14 };
  const input: HslColor       = { ...border };
  const ring: HslColor        = primaryAdj;

  return toTokenSet({
    background, foreground,
    card, cardForeground,
    popover, popoverForeground,
    primary: primaryAdj, primaryFg,
    secondary, secondaryFg,
    muted, mutedFg,
    accent, accentFg,
    destructive: DESTRUCTIVE_DARK, destructiveFg: DESTRUCTIVE_FG,
    success: SUCCESS_DARK, successFg: SUCCESS_FG,
    warning: WARNING_DARK, warningFg: WARNING_FG_DARK,
    border, input, ring,
    radius,
  });
}

// ── Foreground picker ─────────────────────────────────────────────────────────

/**
 * Pick the best foreground (white or black) for a given background.
 * Uses adjustToContrast so we always guarantee ≥ 4.5:1 even for mid-lightness
 * backgrounds where neither pure white nor pure black is a clear winner.
 */
function pickForeground(bg: HslColor): HslColor {
  const white: HslColor = { h: 0, s: 0, l: 98 };
  const black: HslColor = { h: 0, s: 0, l: 10 };
  const wRatio = contrastRatio(white, bg);
  const bRatio = contrastRatio(black, bg);

  // If either passes AA as-is, return the higher-contrast one
  if (wRatio >= 4.5 || bRatio >= 4.5) {
    return wRatio >= bRatio ? white : black;
  }

  // Neither passes — adjust the better candidate
  const preferDark = bRatio >= wRatio;
  return adjustToContrast(preferDark ? black : white, bg, 4.52, preferDark);
}

// ── Internal helpers ──────────────────────────────────────────────────────────

interface TokenInputs {
  background:     HslColor;
  foreground:     HslColor;
  card:           HslColor;
  cardForeground: HslColor;
  popover:        HslColor;
  popoverForeground: HslColor;
  primary:        HslColor;
  primaryFg:      HslColor;
  secondary:      HslColor;
  secondaryFg:    HslColor;
  muted:          HslColor;
  mutedFg:        HslColor;
  accent:         HslColor;
  accentFg:       HslColor;
  destructive:    HslColor;
  destructiveFg:  HslColor;
  success:        HslColor;
  successFg:      HslColor;
  warning:        HslColor;
  warningFg:      HslColor;
  border:         HslColor;
  input:          HslColor;
  ring:           HslColor;
  radius:         string;
}

function toTokenSet(t: TokenInputs): TokenSet {
  return {
    background:             hslToString(t.background),
    foreground:             hslToString(t.foreground),
    card:                   hslToString(t.card),
    "card-foreground":      hslToString(t.cardForeground),
    popover:                hslToString(t.popover),
    "popover-foreground":   hslToString(t.popoverForeground),
    primary:                hslToString(t.primary),
    "primary-foreground":   hslToString(t.primaryFg),
    secondary:              hslToString(t.secondary),
    "secondary-foreground": hslToString(t.secondaryFg),
    muted:                  hslToString(t.muted),
    "muted-foreground":     hslToString(t.mutedFg),
    accent:                 hslToString(t.accent),
    "accent-foreground":    hslToString(t.accentFg),
    destructive:            hslToString(t.destructive),
    "destructive-foreground": hslToString(t.destructiveFg),
    success:                hslToString(t.success),
    "success-foreground":   hslToString(t.successFg),
    warning:                hslToString(t.warning),
    "warning-foreground":   hslToString(t.warningFg),
    border:                 hslToString(t.border),
    input:                  hslToString(t.input),
    ring:                   hslToString(t.ring),
    radius:                 t.radius,
  };
}
