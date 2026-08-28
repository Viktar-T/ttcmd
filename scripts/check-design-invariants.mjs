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
 * Node built-ins only. Adding a dependency here needs an ADR (AGENTS.md §7).
 */

import { readFileSync } from "node:fs";
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

/* ------------------------------------------------------------------ */

checkFontSubsets();

if (failures.length > 0) {
  console.error("\n  Design invariants failed:\n");
  for (const { check, message } of failures) {
    console.error(`  [Check ${check}] ${message}\n`);
  }
  process.exit(1);
}

console.log("  Design invariants OK.");
