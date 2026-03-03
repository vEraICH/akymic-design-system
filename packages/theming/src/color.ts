/**
 * Pure color math utilities.
 * No external dependencies — just arithmetic.
 */

import type { HslColor } from "./types.js";

// ── Parsing ────────────────────────────────────────────────────────────────────

/**
 * Parse a color string into an HslColor.
 * Accepts:
 *   "H S% L%"  — our internal token format (e.g. "243 75% 59%")
 *   "#RRGGBB"  — hex shorthand
 *   "#RGB"     — 3-char hex
 */
export function parseColor(input: string): HslColor {
  const trimmed = input.trim();

  if (trimmed.startsWith("#")) {
    return hexToHsl(trimmed);
  }

  // "H S% L%" format — strip % signs and parse
  const parts = trimmed.split(/\s+/);
  if (parts.length === 3) {
    const h = parseFloat(parts[0]);
    const s = parseFloat(parts[1].replace("%", ""));
    const l = parseFloat(parts[2].replace("%", ""));
    if (!isNaN(h) && !isNaN(s) && !isNaN(l)) {
      return { h: clamp(h, 0, 360), s: clamp(s, 0, 100), l: clamp(l, 0, 100) };
    }
  }

  throw new Error(`Cannot parse color: "${input}"`);
}

/**
 * Serialise an HslColor to our "H S% L%" token string format.
 */
export function hslToString({ h, s, l }: HslColor): string {
  return `${round(h)} ${round(s)}% ${round(l)}%`;
}

// ── Hex → HSL ─────────────────────────────────────────────────────────────────

function hexToHsl(hex: string): HslColor {
  let r: number, g: number, b: number;

  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  } else {
    throw new Error(`Invalid hex color: "${hex}"`);
  }

  return rgbToHsl(r / 255, g / 255, b / 255);
}

function rgbToHsl(r: number, g: number, b: number): HslColor {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l: l * 100 };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h: number;
  switch (max) {
    case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
    case g: h = ((b - r) / d + 2) / 6;               break;
    default: h = ((r - g) / d + 4) / 6;              break;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

// ── HSL → RGB (for luminance) ─────────────────────────────────────────────────

function hslToRgb({ h, s, l }: HslColor): [number, number, number] {
  const sn = s / 100;
  const ln = l / 100;

  if (sn === 0) return [ln, ln, ln];

  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  const hn = h / 360;

  return [
    hueToRgb(p, q, hn + 1 / 3),
    hueToRgb(p, q, hn),
    hueToRgb(p, q, hn - 1 / 3),
  ];
}

function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

// ── WCAG contrast ─────────────────────────────────────────────────────────────

/** WCAG 2.1 relative luminance of an HSL color. */
export function relativeLuminance(color: HslColor): number {
  const [r, g, b] = hslToRgb(color);
  const linearize = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/** WCAG 2.1 contrast ratio between two colors. */
export function contrastRatio(fg: HslColor, bg: HslColor): number {
  const L1 = relativeLuminance(fg);
  const L2 = relativeLuminance(bg);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ── Contrast-aware lightness adjustment ───────────────────────────────────────

/**
 * Adjust the lightness of `color` until it achieves `targetRatio` contrast
 * against `background`. Binary-searches lightness in [0, 100].
 *
 * @param preferDark  When true, tries darkening first; otherwise lightening.
 */
export function adjustToContrast(
  color: HslColor,
  background: HslColor,
  targetRatio: number,
  preferDark: boolean
): HslColor {
  // If already passes, return as-is
  if (contrastRatio(color, background) >= targetRatio) return color;

  // Try the preferred direction first
  const result = binarySearchLightness(color, background, targetRatio, preferDark);
  if (result && contrastRatio(result, background) >= targetRatio) return result;

  // Fallback: try the opposite direction
  const fallback = binarySearchLightness(color, background, targetRatio, !preferDark);
  if (fallback) return fallback;

  // Last resort: pure black or white
  const black: HslColor = { h: color.h, s: 0, l: 5 };
  const white: HslColor = { h: color.h, s: 0, l: 97 };
  return contrastRatio(black, background) >= contrastRatio(white, background) ? black : white;
}

function binarySearchLightness(
  color: HslColor,
  background: HslColor,
  targetRatio: number,
  darker: boolean
): HslColor | null {
  let lo = darker ? 0 : color.l;
  let hi = darker ? color.l : 100;

  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    const candidate: HslColor = { ...color, l: mid };
    const ratio = contrastRatio(candidate, background);

    if (ratio >= targetRatio) {
      if (darker) lo = mid; else hi = mid;
    } else {
      if (darker) hi = mid; else lo = mid;
    }
  }

  const result: HslColor = { ...color, l: darker ? lo : hi };
  return contrastRatio(result, background) >= targetRatio ? result : null;
}

// ── Utilities ─────────────────────────────────────────────────────────────────

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function round(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Return the better of two foreground candidates (white vs black) on a given background. */
export function bestForeground(bg: HslColor): HslColor {
  const white: HslColor = { h: 0, s: 0, l: 98 };
  const black: HslColor = { h: 0, s: 0, l: 10 };
  return contrastRatio(white, bg) >= contrastRatio(black, bg) ? white : black;
}
