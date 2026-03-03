// ── Theme Manifest ─────────────────────────────────────────────────────────────
// The small set of "root" inputs a user or agent controls.
// Everything else is derived algorithmically.

export interface ThemeManifest {
  /** Brand primary color. HSL string "H S% L%" or hex "#RRGGBB". */
  primary: string;

  /**
   * Neutral tint direction for backgrounds, borders, and muted surfaces.
   * - "cool"    → blue-gray hue (~220°)
   * - "warm"    → taupe hue (~30°)
   * - "neutral" → minimal saturation, no strong hue bias
   * Defaults to "cool".
   */
  neutral?: "cool" | "warm" | "neutral";

  /**
   * Border-radius scale applied to all components via --radius.
   * Defaults to "md".
   */
  radius?: "none" | "sm" | "md" | "lg" | "full";

  /**
   * Override the lightness of the light-mode background (0–100).
   * Defaults to 97.5 (near-white).
   */
  backgroundLightness?: number;

  /**
   * Override the lightness of the dark-mode background (0–100).
   * Defaults to 8.
   */
  darkBackgroundLightness?: number;
}

// ── Internal color representation ─────────────────────────────────────────────

export interface HslColor {
  h: number; // 0–360
  s: number; // 0–100
  l: number; // 0–100
}

// ── Token set ─────────────────────────────────────────────────────────────────
// Matches the shadcn/ui + Akymic token contract.
// All color values are stored as "H S% L%" strings.

export interface ColorTokens {
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  success: string;
  "success-foreground": string;
  warning: string;
  "warning-foreground": string;
  border: string;
  input: string;
  ring: string;
}

export interface TokenSet extends ColorTokens {
  radius: string; // CSS length, e.g. "0.75rem"
}

// ── Derived theme ──────────────────────────────────────────────────────────────

export interface DerivedTheme {
  manifest: ThemeManifest;
  light: TokenSet;
  dark: TokenSet;
  contrast: {
    light: ContrastReport;
    dark: ContrastReport;
  };
}

// ── Contrast report ───────────────────────────────────────────────────────────

export interface ContrastPair {
  role: string;            // e.g. "primary on background"
  fg: string;              // "H S% L%"
  bg: string;              // "H S% L%"
  ratio: number;           // e.g. 5.23
  pass: boolean;           // ratio >= 4.5
  informational?: boolean; // true = fixed token, failure shown but doesn't block pass
}

export interface ContrastReport {
  pass: boolean;
  pairs: ContrastPair[];
}
