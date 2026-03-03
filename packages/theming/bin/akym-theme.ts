#!/usr/bin/env tsx
/**
 * akym-theme — Akymic Design System theme generator CLI
 *
 * Usage:
 *   tsx bin/akym-theme.ts generate <manifest.json>
 *   tsx bin/akym-theme.ts generate --primary "#4F46E5" --neutral cool --radius md
 *   tsx bin/akym-theme.ts check    <theme.css|manifest.json>
 *
 * Output (written to themes/<name>/):
 *   theme.css    — :root {} + .dark {} CSS variable override block
 *   theme.json   — token manifest in tokens.json format
 *   report.json  — WCAG contrast report
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, join, basename, extname, dirname } from "path";
import { fileURLToPath } from "url";
import { deriveTheme } from "../src/derive.js";
import { generateCSS } from "../src/generate-css.js";
import { generateJson } from "../src/generate-json.js";
import type { ThemeManifest } from "../src/types.js";

// ── Helpers ───────────────────────────────────────────────────────────────────

const RESET  = "\x1b[0m";
const BOLD   = "\x1b[1m";
const GREEN  = "\x1b[32m";
const RED    = "\x1b[31m";
const YELLOW = "\x1b[33m";
const CYAN   = "\x1b[36m";
const DIM    = "\x1b[2m";

function log(msg: string) { process.stdout.write(msg + "\n"); }
function err(msg: string) { process.stderr.write(`${RED}Error:${RESET} ${msg}\n`); }

function parseArgs(argv: string[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      const key = argv[i].slice(2);
      map[key] = argv[i + 1] ?? "true";
      i++;
    } else {
      map[`_${Object.keys(map).filter(k => k.startsWith("_")).length}`] = argv[i];
    }
  }
  return map;
}

function themesDir(): string {
  // __dirname equivalent for ESM on Windows
  const __dirname = dirname(fileURLToPath(import.meta.url));
  // bin/ → theming/ → packages/ → repo-root (3 levels up)
  return resolve(__dirname, "../../..", "themes");
}

// ── Commands ──────────────────────────────────────────────────────────────────

function cmdGenerate(argv: string[]) {
  const args = parseArgs(argv);
  let manifest: ThemeManifest;

  // If first positional arg looks like a file path, read it
  const firstPos = args["_0"];
  if (firstPos && (firstPos.endsWith(".json") || existsSync(firstPos))) {
    try {
      manifest = JSON.parse(readFileSync(resolve(firstPos), "utf8")) as ThemeManifest;
    } catch (e) {
      err(`Cannot read manifest file: ${firstPos}`);
      process.exit(1);
    }
  } else {
    // Build manifest from flags
    if (!args["primary"]) {
      err("--primary is required. Example: --primary \"#4F46E5\"");
      printHelp();
      process.exit(1);
    }
    manifest = {
      primary:  args["primary"],
      neutral:  (args["neutral"] as ThemeManifest["neutral"]) ?? "cool",
      radius:   (args["radius"]  as ThemeManifest["radius"])  ?? "md",
    };
    if (args["backgroundLightness"])     manifest.backgroundLightness     = parseFloat(args["backgroundLightness"]);
    if (args["darkBackgroundLightness"]) manifest.darkBackgroundLightness = parseFloat(args["darkBackgroundLightness"]);
  }

  // Derive
  log(`\n${BOLD}Deriving theme…${RESET}`);
  log(`  primary  ${CYAN}${manifest.primary}${RESET}`);
  log(`  neutral  ${CYAN}${manifest.neutral ?? "cool"}${RESET}`);
  log(`  radius   ${CYAN}${manifest.radius ?? "md"}${RESET}`);

  let theme;
  try {
    theme = deriveTheme(manifest);
  } catch (e) {
    err(`Derivation failed: ${(e as Error).message}`);
    process.exit(1);
  }

  // Determine output directory name
  // If the file is named "manifest.json", use the parent folder name instead
  function deriveNameFromPath(p: string): string {
    const base = basename(p, extname(p));
    if (base === "manifest") return basename(dirname(p));
    return base;
  }
  const themeName = args["name"]
    ?? (firstPos ? deriveNameFromPath(firstPos) : sanitizeName(manifest.primary));

  const outDir = join(themesDir(), themeName);
  mkdirSync(outDir, { recursive: true });

  // Write CSS
  const css = generateCSS(theme);
  writeFileSync(join(outDir, "theme.css"), css, "utf8");

  // Write JSON
  const json = generateJson(theme);
  writeFileSync(join(outDir, "theme.json"), JSON.stringify(json, null, 2) + "\n", "utf8");

  // Write manifest
  writeFileSync(join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n", "utf8");

  // Write contrast report
  writeFileSync(join(outDir, "report.json"), JSON.stringify(theme.contrast, null, 2) + "\n", "utf8");

  // Print summary
  log(`\n${BOLD}Output → themes/${themeName}/${RESET}`);
  log(`  ${GREEN}✓${RESET} theme.css`);
  log(`  ${GREEN}✓${RESET} theme.json`);
  log(`  ${GREEN}✓${RESET} manifest.json`);
  log(`  ${GREEN}✓${RESET} report.json`);

  // Print contrast summary
  printContrastSummary(theme.contrast.light, "Light mode");
  printContrastSummary(theme.contrast.dark,  "Dark mode");

  const allPass = theme.contrast.light.pass && theme.contrast.dark.pass;
  log(`\n${allPass ? `${GREEN}${BOLD}All contrast checks passed.` : `${RED}${BOLD}Some contrast checks failed.`}${RESET}\n`);

  if (!allPass) process.exit(1);
}

function cmdCheck(argv: string[]) {
  const args = parseArgs(argv);
  const file = args["_0"];
  if (!file) {
    err("Provide a manifest.json or report.json to check.");
    process.exit(1);
  }

  const content = JSON.parse(readFileSync(resolve(file), "utf8"));

  // If it has a "light" key it's already a derived theme contrast object
  if (content.light && content.dark) {
    printContrastSummary(content.light, "Light mode");
    printContrastSummary(content.dark, "Dark mode");
    return;
  }

  // Otherwise treat as manifest and derive
  const theme = deriveTheme(content as ThemeManifest);
  printContrastSummary(theme.contrast.light, "Light mode");
  printContrastSummary(theme.contrast.dark, "Dark mode");
}

function printContrastSummary(
  report: { pass: boolean; pairs: Array<{ role: string; ratio: number; pass: boolean; informational?: boolean }> },
  label: string
) {
  const icon = report.pass ? `${GREEN}✓${RESET}` : `${RED}✗${RESET}`;
  log(`\n${BOLD}${label}${RESET} ${icon}`);
  for (const pair of report.pairs) {
    const isInfo = pair.informational === true;
    let status: string;
    if (pair.pass)       status = `${GREEN}✓${RESET}`;
    else if (isInfo)     status = `${YELLOW}⚠${RESET}`;
    else                 status = `${RED}✗${RESET}`;

    const ratio   = pair.ratio.toFixed(2).padStart(5);
    const roleStr = pair.role.padEnd(38);
    const note = !pair.pass && isInfo
      ? ` ${YELLOW}(fixed token — not derived)${RESET}`
      : !pair.pass
      ? ` ${YELLOW}(need 4.5:1)${RESET}`
      : "";
    log(`  ${status} ${DIM}${roleStr}${RESET} ${ratio}:1${note}`);
  }
}

function sanitizeName(primary: string): string {
  return primary.replace(/[^a-zA-Z0-9]/g, "-").replace(/^-+|-+$/g, "").toLowerCase() || "custom";
}

function printHelp() {
  log(`
${BOLD}akym-theme${RESET} — Akymic Design System theme generator

${BOLD}COMMANDS${RESET}
  generate    Derive and write a theme
  check       Run contrast check only

${BOLD}GENERATE FLAGS${RESET}
  --primary   <color>   Brand color. HSL "H S% L%" or hex "#RRGGBB". ${RED}(required)${RESET}
  --neutral   cool|warm|neutral        Neutral tint. Default: cool
  --radius    none|sm|md|lg|full       Radius scale. Default: md
  --name      <string>                 Output folder name under themes/

${BOLD}EXAMPLES${RESET}
  tsx bin/akym-theme.ts generate --primary "#4F46E5"
  tsx bin/akym-theme.ts generate --primary "243 75% 59%" --neutral warm --radius lg --name indigo
  tsx bin/akym-theme.ts generate themes/my-brand/manifest.json
  tsx bin/akym-theme.ts check    themes/my-brand/manifest.json
`);
}

// ── Entry point ───────────────────────────────────────────────────────────────

const [, , command, ...rest] = process.argv;

switch (command) {
  case "generate": cmdGenerate(rest); break;
  case "check":    cmdCheck(rest);    break;
  case "--help":
  case "-h":
  case undefined:  printHelp();       break;
  default:
    err(`Unknown command: "${command}"`);
    printHelp();
    process.exit(1);
}
