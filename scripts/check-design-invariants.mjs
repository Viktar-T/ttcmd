#!/usr/bin/env node
/**
 * Design invariants, checked before every build.
 *
 * Runs ahead of `next build` (see package.json). Every check here exists
 * because the failure it catches is silent: nothing errors, nothing lints, and
 * the damage is only visible on a projector in front of a class.
 *
 * Check A — the Polish subset (ADR-0005, constitution Article III).
 *   ó lives in Latin-1 but ą ć ę ł ń ś ź ż live in Latin Extended-A. A font
 *   loaded with subsets: ['latin'] renders ó and silently drops ł.
 *
 * Check B — no colour literal outside app/tokens.css.
 *   A component that hard-codes a colour is invisible to the theme and has to
 *   be found by hand later. It covers hex in 3, 4, 6 and 8 digits and the
 *   functional notations, case-insensitively. Two limits remain, stated rather
 *   than left to be rediscovered:
 *     1. A CSS named colour such as `white` slips through. Widening it to a
 *        named-colour list produces false positives on English prose in .tsx
 *        for very little gain.
 *     2. An id selector of hex-like shape (#abc) would trip it. The repo uses
 *        none. If one ever appears it takes the exemption comment below, not a
 *        weakened pattern.
 *   The 4-digit hex, uppercase function names and lab()/lch()/color() were all
 *   missed by the first version of this pattern and were found by the slice's
 *   closing review, not by the build. Widen it rather than trusting the list.
 *   Exemption: a line carrying, or preceded by, a comment of the form
 *     design-token-exempt: <reason>
 *   is skipped, and the reason stays in the diff for good.
 *
 * Check C — every colour the highlighter can emit is defined (ADR-0010/0011).
 *   The syntax theme resolves every token colour to var(--code-...) instead of
 *   to a colour, which is what keeps the palette inside app/tokens.css. The
 *   failure that creates is silent: an emitted variable nobody defined makes
 *   the declaration invalid at computed-value time, `color` falls back to
 *   `inherit`, and that token class renders as ordinary body text with no error
 *   anywhere. Same shape as Check A's missing font subset.
 *
 * Check D — the code palette does not move with the theme (ADR-0007/0011).
 *   The code surface stays dark on the light theme, so the ground these colours
 *   sit on does not flip. A colour that flips underneath a ground that does not
 *   is legible on one theme and invisible on the other — and everything in this
 *   repo is built while looking at the dark one.
 *
 * Node built-ins only, EXCEPT `shiki` in Check C: the list of variables the
 * theme can emit belongs to the theme, and a second copy of it here would be a
 * second thing to keep in step. `shiki` is already a dependency of the project
 * (ADR-0010); this adds none.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createCssVariablesTheme } from "shiki/core";

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

// Case-insensitive: CSS function names are, so RGB( is as valid as rgb().
// The hex branches run longest-first so #123456 is not clipped to #1234.
const COLOUR_PATTERN =
  /#[0-9a-f]{8}\b|#[0-9a-f]{6}\b|#[0-9a-f]{4}\b|#[0-9a-f]{3}\b|\brgba?\(|\bhsla?\(|\boklch\(|\boklab\(|\blch\(|\blab\(|\bcolor\(|\bcolor-mix\(/i;

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

/* ------------------------------------------------------------------ *
 * Checks C and D — the code palette
 *
 * Both read app/tokens.css as a set of declaration blocks. It has no nested
 * rules and no media queries, so a flat scan is exact rather than approximate;
 * if one ever appears here, this parser is what has to grow, not the rule.
 * ------------------------------------------------------------------ */

const HIGHLIGHT_FILE = "lib/code-highlight.ts";

function stripCssComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "");
}

/** [{ selector, declarations: Map<name, value> }], in source order. */
function readTokenBlocks() {
  const source = stripCssComments(
    readFileSync(path.join(repoRoot, TOKEN_FILE), "utf8"),
  );
  return [...source.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, selector, body]) => {
    const declarations = new Map();
    for (const [, name, value] of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      declarations.set(name, value.trim());
    }
    return { selector: selector.trim(), declarations };
  });
}

/** The prefix is a literal at its call site, for the same reason Check A's
    `subsets` is: the value is read by a source scan, not imported. */
function readVariablePrefix() {
  const source = readFileSync(path.join(repoRoot, HIGHLIGHT_FILE), "utf8");
  const matches = [...source.matchAll(/variablePrefix:\s*(?:CODE_VARIABLE_PREFIX|["']([^"']+)["'])/g)];
  const literal = [...source.matchAll(/CODE_VARIABLE_PREFIX\s*=\s*["']([^"']+)["']/g)];
  const found = literal[0]?.[1] ?? matches[0]?.[1];
  if (matches.length !== 1 || !found) {
    fail(
      "C",
      `${HIGHLIGHT_FILE}: expected exactly one \`variablePrefix:\` and one literal ` +
        `CODE_VARIABLE_PREFIX to read it from; found ${matches.length} and ` +
        `${literal.length}. Check C reads the prefix by a source scan, so it has to ` +
        `stay a literal there — see the note in that file.`,
    );
    return null;
  }
  return found;
}

function checkCodePalette() {
  const prefix = readVariablePrefix();
  if (!prefix) return;

  const blocks = readTokenBlocks();
  const rootDeclarations = new Map();
  for (const block of blocks) {
    if (block.selector === ":root") {
      for (const [name, value] of block.declarations) rootDeclarations.set(name, value);
    }
  }

  /* Check C — everything the theme can emit has a definition. */
  const theme = createCssVariablesTheme({ variablePrefix: prefix });
  const emitted = new Set(
    [...JSON.stringify(theme).matchAll(/var\((--[\w-]+)\)/g)].map((m) => m[1]),
  );
  const undefined_ = [...emitted].filter((name) => !rootDeclarations.has(name)).sort();
  if (undefined_.length > 0) {
    fail(
      "C",
      `the syntax theme can emit ${undefined_.length} variable(s) that ` +
        `${TOKEN_FILE.split(path.sep).join("/")} does not define: ${undefined_.join(", ")}. ` +
        `An undefined one is invalid at computed-value time, so that token class ` +
        `renders as ordinary body text with no error anywhere. Define it in the code ` +
        `palette block — as an alias of an existing one if nothing renders it yet.`,
    );
  }

  /* Check D, first half — nothing in the palette is redefined per theme. */
  for (const block of blocks) {
    if (!block.selector.includes("[data-theme")) continue;
    for (const name of block.declarations.keys()) {
      if (!name.startsWith(prefix)) continue;
      fail(
        "D",
        `${TOKEN_FILE.split(path.sep).join("/")}: \`${name}\` is defined inside ` +
          `\`${block.selector}\`. The code surface stays dark in both themes ` +
          `(ADR-0007), so a colour on it must not move with the theme — it would be ` +
          `legible on one and invisible on the other.`,
      );
    }
  }

  /* Check D, second half — nor by reference. A palette entry written as
     var(--something) is only theme-independent while --something is. */
  for (const [name, value] of rootDeclarations) {
    if (!name.startsWith(prefix)) continue;
    for (const [, referenced] of value.matchAll(/var\((--[\w-]+)\)/g)) {
      if (referenced.startsWith(prefix)) continue; // covered by the half above
      const rootValue = rootDeclarations.get(referenced);
      if (rootValue === undefined) {
        fail("D", `${TOKEN_FILE.split(path.sep).join("/")}: \`${name}\` refers to \`${referenced}\`, which :root does not define.`);
        continue;
      }
      for (const block of blocks) {
        if (!block.selector.includes("[data-theme")) continue;
        const themeValue = block.declarations.get(referenced);
        if (themeValue !== undefined && themeValue !== rootValue) {
          fail(
            "D",
            `${TOKEN_FILE.split(path.sep).join("/")}: \`${name}\` refers to ` +
              `\`${referenced}\`, which is \`${rootValue}\` on :root and \`${themeValue}\` ` +
              `in \`${block.selector}\`. That makes a code colour theme-dependent by ` +
              `reference — the failure Check D exists to catch, and the one nobody ` +
              `sees on the dark theme.`,
          );
        }
      }
    }
  }
}

/* ------------------------------------------------------------------ */

checkFontSubsets();
checkColourLiterals();
checkCodePalette();

if (failures.length > 0) {
  console.error("\n  Design invariants failed:\n");
  for (const { check, message } of failures) {
    console.error(`  [Check ${check}] ${message}\n`);
  }
  process.exit(1);
}

console.log("  Design invariants OK.");
