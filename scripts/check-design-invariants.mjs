#!/usr/bin/env node
/**
 * Design invariants, checked before every build.
 *
 * Runs ahead of `next build` (see package.json). Both checks exist because the
 * failures they catch are silent: nothing errors, nothing lints, and the damage
 * is only visible on a projector in front of a class.
 *
 * Check A — the Polish subset (ADR-0005, constitution Article III).
 *   ó lives in Latin-1 but ą ć ę ł ń ś ź ż live in Latin Extended-A. A font
 *   loaded with subsets: ['latin'] renders ó and silently drops ł.
 *
 * Check B — no colour literal outside app/tokens.css.
 *   A component that hard-codes a colour is invisible to the theme and has to
 *   be found by hand later. Two limits, stated rather than left to be
 *   rediscovered:
 *     1. It catches the realistic failure — somebody pastes #2A2926 into a
 *        component — not every conceivable one. A CSS named colour such as
 *        `white` slips through. Widening it to a named-colour list produces
 *        false positives on English prose in .tsx for very little gain.
 *     2. An id selector of hex-like shape (#abc) would trip it. The repo uses
 *        none. If one ever appears it takes the exemption comment below, not a
 *        weakened pattern.
 *   Exemption: a line carrying, or preceded by, a comment of the form
 *     design-token-exempt: <reason>
 *   is skipped, and the reason stays in the diff for good.
 *
 * Node built-ins only. Adding a dependency here needs an ADR (AGENTS.md §7).
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function fail(check, message) {
  failures.push({ check, message });
}

/* ------------------------------------------------------------------ *
 * Check A — every font declares the Polish subset
 * ------------------------------------------------------------------ */

const FONTS_FILE = "app/fonts.ts";
const REQUIRED_SUBSETS = ["latin", "latin-ext"];

function checkFontSubsets() {
  const file = path.join(repoRoot, FONTS_FILE);
  let source;
  try {
    source = readFileSync(file, "utf8");
  } catch {
    fail("A", `${FONTS_FILE} is missing. The typefaces are declared there and nowhere else.`);
    return;
  }

  // next/font reads its options by static analysis, so `subsets` is always an
  // array literal at the call site. That is why this is a source scan and not
  // a TypeScript type: the value cannot be hoisted into a shared constant.
  const declarations = [...source.matchAll(/subsets\s*:\s*\[([^\]]*)\]/g)];

  if (declarations.length < 2) {
    fail(
      "A",
      `${FONTS_FILE} declares ${declarations.length} font subset list(s); expected at least 2 ` +
        `(a monospace and a proportional sans, ADR-0005). A deleted font call must not pass this check.`,
    );
    return;
  }

  for (const [, body] of declarations) {
    const declared = [...body.matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]);
    const missing = REQUIRED_SUBSETS.filter((s) => !declared.includes(s));
    if (missing.length > 0) {
      fail(
        "A",
        `${FONTS_FILE}: a font declares subsets [${declared.join(", ")}] and is missing ` +
          `[${missing.join(", ")}]. Polish needs 'latin-ext' — without it ą ć ę ł ń ś ź ż ` +
          `fall back silently while ó still renders. See ADR-0005.`,
      );
    }
  }
}

/* ------------------------------------------------------------------ *
 * Check B — no colour literal outside the token file
 * ------------------------------------------------------------------ */

const SCAN_DIRS = ["app", "lib", "components"];
const SCAN_EXTENSIONS = [".css", ".ts", ".tsx"];
const TOKEN_FILE = path.join("app", "tokens.css");
const EXEMPT_MARKER = "design-token-exempt:";

const COLOUR_PATTERN =
  /#[0-9a-fA-F]{8}\b|#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b|\brgba?\(|\bhsla?\(|\boklch\(|\boklab\(|\bcolor-mix\(/;

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return; // an optional directory, such as components/, need not exist yet
  }
  for (const entry of entries) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      yield* walk(full);
    } else if (SCAN_EXTENSIONS.includes(path.extname(full))) {
      yield full;
    }
  }
}

function checkColourLiterals() {
  for (const dir of SCAN_DIRS) {
    for (const file of walk(path.join(repoRoot, dir))) {
      const relative = path.relative(repoRoot, file);
      if (relative === TOKEN_FILE) continue;

      const lines = readFileSync(file, "utf8").split(/\r?\n/);
      lines.forEach((line, index) => {
        const match = line.match(COLOUR_PATTERN);
        if (!match) return;

        const exempt =
          line.includes(EXEMPT_MARKER) ||
          (index > 0 && lines[index - 1].includes(EXEMPT_MARKER));
        if (exempt) return;

        fail(
          "B",
          `${relative.split(path.sep).join("/")}:${index + 1} contains the colour literal ` +
            `"${match[0]}" — "${line.trim()}". Colours live in ${TOKEN_FILE.split(path.sep).join("/")} ` +
            `and are used through var(). If this one is genuinely legitimate, mark it with a ` +
            `"${EXEMPT_MARKER} <reason>" comment rather than loosening the rule.`,
        );
      });
    }
  }
}

/* ------------------------------------------------------------------ */

checkFontSubsets();
checkColourLiterals();

if (failures.length > 0) {
  console.error("\n  Design invariants failed:\n");
  for (const { check, message } of failures) {
    console.error(`  [Check ${check}] ${message}\n`);
  }
  process.exit(1);
}

console.log("  Design invariants OK.");
