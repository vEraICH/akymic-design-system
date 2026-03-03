/**
 * Generate a tokens.json-compatible object from a DerivedTheme.
 *
 * Output shape mirrors packages/tokens/tokens/tokens.json so a derived
 * theme can be stored as a first-class token file.
 */

import type { DerivedTheme, TokenSet } from "./types.js";

type JsonTokenEntry =
  | { light: string; dark: string }   // color token
  | string;                            // radius (plain value)

export interface ThemeJson {
  /** The manifest that was used to generate this theme. */
  $manifest: object;
  color: Record<string, JsonTokenEntry>;
  shadows: Record<string, { light: string; dark: string }>;
  typography: Record<string, string>;  // preserved as-is from base
}

// Shadow tokens are not derived — carry the base values forward
const BASE_SHADOWS = {
  resting: {
    light: "0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
    dark:  "0 1px 3px 0 rgb(0 0 0 / 0.35), 0 1px 2px -1px rgb(0 0 0 / 0.25)",
  },
  floating: {
    light: "0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.08)",
    dark:  "0 20px 25px -5px rgb(0 0 0 / 0.50), 0 8px 10px -6px rgb(0 0 0 / 0.35)",
  },
  inset: {
    light: "inset 0 1px 2px 0 rgb(0 0 0 / 0.06)",
    dark:  "inset 0 1px 3px 0 rgb(0 0 0 / 0.30)",
  },
};

const COLOR_TOKEN_KEYS: Array<keyof TokenSet> = [
  "background", "foreground",
  "card", "card-foreground",
  "popover", "popover-foreground",
  "primary", "primary-foreground",
  "secondary", "secondary-foreground",
  "muted", "muted-foreground",
  "accent", "accent-foreground",
  "destructive", "destructive-foreground",
  "success", "success-foreground",
  "warning", "warning-foreground",
  "border", "input", "ring",
];

export function generateJson(theme: DerivedTheme): ThemeJson {
  const color: Record<string, JsonTokenEntry> = {};

  for (const key of COLOR_TOKEN_KEYS) {
    color[key as string] = {
      light: theme.light[key] as string,
      dark:  theme.dark[key] as string,
    };
  }

  // Radius is a plain value (same in light + dark)
  color["radius"] = theme.light.radius;

  return {
    $manifest: theme.manifest,
    color,
    shadows: BASE_SHADOWS,
    typography: {}, // callers can merge in typography tokens from base if needed
  };
}
