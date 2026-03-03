/**
 * Generate a CSS override block from a DerivedTheme.
 *
 * Output format:
 *   :root { --token: value; ... }
 *   .dark  { --token: value; ... }
 *
 * This block can be:
 *   - Written to a file as a standalone theme override
 *   - Injected into a <style> tag at runtime
 *   - Appended after the base tokens.css
 */

import type { DerivedTheme, TokenSet } from "./types.js";

// Tokens that are plain CSS values (not HSL components)
const PLAIN_VALUE_TOKENS = new Set(["radius"]);

export function generateCSS(theme: DerivedTheme, selector = ":root"): string {
  const darkSelector = selector === ":root" ? ".dark" : `${selector}.dark`;

  const lightBlock = renderBlock(selector, theme.light);
  const darkBlock  = renderBlock(darkSelector, theme.dark);

  const header = [
    `/* Akymic Theme — generated from manifest */`,
    `/* Primary: ${theme.manifest.primary} | Neutral: ${theme.manifest.neutral ?? "cool"} | Radius: ${theme.manifest.radius ?? "md"} */`,
    ``,
  ].join("\n");

  return `${header}${lightBlock}\n\n${darkBlock}\n`;
}

function renderBlock(selector: string, tokens: TokenSet): string {
  const lines = Object.entries(tokens).map(([key, value]) => {
    const cssValue = PLAIN_VALUE_TOKENS.has(key) ? value : value;
    return `  --${key}: ${cssValue};`;
  });

  return `${selector} {\n${lines.join("\n")}\n}`;
}
