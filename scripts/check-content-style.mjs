#!/usr/bin/env node
/**
 * Content style smells, reported per lesson. Never fails.
 *
 *   npm run check:content                 # every lesson under content/moduly
 *   node scripts/check-content-style.mjs content/moduly/01-jak-powstaje-oprogramowanie
 *   node scripts/check-content-style.mjs path/to/lesson.mdx [more.mdx ...]
 *
 * The prose rules live in docs/content-style.md. This script counts the few
 * things a script can count — the "Budgets" table there — so that a writer,
 * human or model, sees the smells before a reader does. Every line it prints
 * is a question, not a verdict: a procedure lesson trips the one-sentence
 * paragraph count by design, and a lesson about definitions needs its block
 * quotes. It exits 0 always and is not part of `npm run build`.
 *
 * What it looks at, per lesson (frontmatter, code fences, SVG blocks, MDX
 * comments and the Źródła section removed first; Ćwiczenia excluded from the
 * prose metrics):
 *
 *   words, H2 count, bold spans per 100 words, one-sentence paragraphs,
 *   "To nie X. To Y.", block quotes, forward references, short H2 sections,
 *   straight or mismatched quotation marks, gendered second-person forms —
 *   the cohesion smells of the first audit; and, since the reader revision of
 *   2026-08-30, the comprehension smells: distinct capitalised names per 100
 *   words and the names that get one sentence only, phrases that assert the
 *   reader's experience, an opening whose first words recall the previous
 *   lesson, a block quote without an attribution line carrying a date and a
 *   link, and a section with a percentage and no link anywhere in it.
 *
 *   The name count is deliberately crude — a capitalised token that does not
 *   start a sentence, is not an all-caps acronym and is not a month. It
 *   overcounts a little (a product name of two words is two names) and that
 *   is fine: it is a question, and the list of once-only names beside it is
 *   what the writer actually acts on.
 *
 * Across the lessons of one module: H2 headings repeated in two lessons, and
 * recurring stories mentioned outside their home lesson. The story patterns
 * mirror the appendix of docs/content-style.md; when a row changes there, it
 * changes here.
 *
 * Node built-ins only.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* ------------------------------------------------------------------ *
 * Thresholds — mirror the "Budgets" table in docs/content-style.md
 * ------------------------------------------------------------------ */

const T = {
  boldPer100: 1.5,
  oneSentenceParagraphs: 3,
  oneSentenceMaxWords: 25,
  toNieToY: 1,
  blockquotes: 4,
  forwardRefs: 3,
  shortSectionWords: 90,
  namesPer100: 3,
  onceNamesListed: 15,
};

const STANDARD_HEADINGS = new Set(["ćwiczenia", "źródła"]);

/* ------------------------------------------------------------------ *
 * Story map — mirror the appendix of docs/content-style.md
 * `home` is the lesson slug (file name without extension).
 * ------------------------------------------------------------------ */

// `czterdziesci-lat-zmian` lives in content/interesting-to-read/ since
// 2026-08-30, outside the scanned tree, so every recall of its stories inside
// the module is reported — correctly: they point at a lesson the student
// cannot open from the module.
const STORIES = [
  { name: "the forty-year promise (4GL / Visual Basic / iPhone web apps)", re: /4GL|czwartej generacji/gi, home: "czterdziesci-lat-zmian" },
  { name: "Visual Basic 6, Delphi", re: /Visual Basic|Delphi/g, home: "czterdziesci-lat-zmian" },
  { name: "Airbnb / Shopify", re: /Airbnb|Shopify/g, home: "czterdziesci-lat-zmian" },
  { name: "METR 2025 and its correction", re: /METR/g, home: "co-model-naprawde-potrafi" },
  { name: "the Stanford matrix", re: /macierz|Stanford/gi, home: "co-model-naprawde-potrafi" },
  { name: "Microsoft junior/senior", re: /Demirer|\+40%|\+7%/g, home: "co-model-naprawde-potrafi" },
  { name: "the Anthropic learning RCT (67% / 50%)", re: /67%|50%/g, home: "co-model-naprawde-potrafi" },
  { name: "Osmani's 70%", re: /Osmani|70%/g, home: "co-model-naprawde-potrafi" },
  { name: "Stack Overflow 2025 figures", re: /Stack Overflow|84%|33%|66%|46%|51%/g, home: "co-model-naprawde-potrafi" },
  { name: "środek stawki / front", re: /środek stawki|środku stawki/g, home: "co-model-naprawde-potrafi" },
  { name: "30–100 godzin", re: /30[–-]100/g, home: "co-model-naprawde-potrafi" },
  { name: "Torvalds", re: /Torvalds/g, home: "co-model-naprawde-potrafi" },
  { name: "the demo (Fiszki, three tools)", re: /Fiszki|fiszki-/g, home: "na-zywo-agent-buduje-aplikacje" },
  { name: "DHH", re: /DHH|Heinemeier/g, home: "nowy-warsztat-programisty" },
  { name: "the harness", re: /harness/gi, home: "nowy-warsztat-programisty" },
  { name: "seven updates a day", re: /siedem razy dziennie/g, home: "nowy-warsztat-programisty" },
  { name: "550 dollars", re: /550/g, home: "nowy-warsztat-programisty" },
  { name: "Basecamp, February 2026", re: /Basecamp/g, home: "vibe-coding-kontra-inzynieria" },
  { name: "Karpathy", re: /Karpathy/g, home: "vibe-coding-kontra-inzynieria" },
  { name: "Willison", re: /Willison/g, home: "vibe-coding-kontra-inzynieria" },
  { name: "Kent Beck", re: /Kent Beck|Beck/g, home: "vibe-coding-kontra-inzynieria" },
  { name: "Ronacher", re: /Ronacher/g, home: "vibe-coding-kontra-inzynieria" },
  { name: "dogoni front w dwa tygodnie", re: /dwa tygodnie|dwutygodniow/g, home: "jak-nie-wypasc-z-obiegu" },
  { name: "the four rankings", re: /TIOBE|Octoverse|IEEE/g, home: "jak-nie-wypasc-z-obiegu" },
];

/* ------------------------------------------------------------------ *
 * Files
 * ------------------------------------------------------------------ */

function lessonFiles(args) {
  const roots = args.length ? args : [path.join(repoRoot, "content", "moduly")];
  const files = [];
  for (const root of roots) {
    const abs = path.resolve(root);
    const st = statSync(abs);
    if (st.isFile()) {
      files.push(abs);
      continue;
    }
    const walk = (dir) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(p);
        else if (entry.name.endsWith(".mdx") && entry.name !== "index.mdx") files.push(p);
      }
    };
    walk(abs);
  }
  return files.sort();
}

/* ------------------------------------------------------------------ *
 * Parsing
 * ------------------------------------------------------------------ */

function stripFrontmatter(src) {
  const m = src.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  return m ? src.slice(m[0].length) : src;
}

/** Replace fenced code, SVG blocks and MDX comments with a marker line. */
function stripBlocks(src) {
  let hadDiagram = false;
  let out = src.replace(/```[\s\S]*?```/g, "\n[code]\n");
  out = out.replace(/<svg[\s\S]*?<\/svg>/g, () => {
    hadDiagram = true;
    return "\n[diagram]\n";
  });
  out = out.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
  return { text: out, hadDiagram };
}

function words(s) {
  return s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

/** Split body into sections at H2 headings. The preamble is the opening. */
function sections(text) {
  const lines = text.split(/\r?\n/);
  const out = [{ heading: "(opening)", lines: [], start: 1 }];
  lines.forEach((line, i) => {
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h2) out.push({ heading: h2[1], lines: [], start: i + 1 });
    else out[out.length - 1].lines.push({ n: i + 1, s: line });
  });
  return out;
}

/** Group a section's lines into blocks separated by blank lines. */
function blocks(lines) {
  const out = [];
  let cur = null;
  for (const { n, s } of lines) {
    if (s.trim() === "") {
      if (cur) out.push(cur);
      cur = null;
      continue;
    }
    if (!cur) cur = { start: n, text: s };
    else cur.text += " " + s.trim();
  }
  if (cur) out.push(cur);
  return out.map((b) => ({ ...b, kind: kindOf(b.text) }));
}

function kindOf(t) {
  const s = t.trimStart();
  if (s.startsWith("[code]")) return "code";
  if (s.startsWith("[diagram]")) return "diagram";
  if (s.startsWith("###")) return "h3";
  if (s.startsWith("#")) return "heading";
  if (s.startsWith("|")) return "table";
  if (s.startsWith(">")) return "quote";
  if (/^(-|\*|\d+\.)\s/.test(s)) return "list";
  return "prose";
}

function stripInline(t) {
  return t.replace(/`[^`]*`/g, "").replace(/\]\([^)]*\)/g, "]");
}

/* ------------------------------------------------------------------ *
 * Per-lesson analysis
 * ------------------------------------------------------------------ */

const FORWARD = /wrócimy|wróćmy|w module o |w dalszej części kursu|w osobnej lekcji|będzie osobna lekcja|w następn\w+ lekcj\w*|w ostatniej lekcji|w module \d/gi;
const TO_NIE = /\bTo nie [^.!?]{2,90}[.!?]\s+To\s/g;
// Second-person masculine past tense and conditional (-łeś, -łbyś) and the
// analytic future with a masculine participle. "jesteś" and "-eś" adjectives
// are neutral and deliberately not matched.
const GENDERED = /\b\p{L}+(?:łeś|łbyś)\b|\bbędziesz (?:miał|mógł|chciał|musiał|potrafił|umiał|wiedział)\b/gu;
// A sentence that tells the reader who they are, what they have seen or what
// they surely know. Each is listed; the reader file decides whether it is true.
const READER_CLAIM = /twoje (?:całe )?doświadczenie|całe twoje|nigdy nie widział\p{L}*|pamiętasz,? jak|na pewno (?:znasz|wiesz|używa\p{L}*|widział\p{L}*)|każdy z was|wszyscy (?:znacie|używacie|wiecie)|jak każdy (?:z was|uczeń)|nie znasz jeszcze|zapewne (?:znasz|wiesz|używasz)/giu;
// First words of an opening that starts from the course instead of the student.
const OPENS_FROM_COURSE = /^(?:Poprzedni\p{L}* (?:lekcj\p{L}*|dwie lekcje)|W (?:poprzedniej )?lekcji|Dwie poprzednie lekcje|Na pokazie z lekcji|W lekcji \[|Wróćmy do lekcji)/u;
// A capitalised token that is not a sentence start. All-caps acronyms (AI,
// IDE, XAML, METR) are terms, not names, and are left to the term rules.
const NAME_TOKEN = /(^|[^\p{L}\p{N}„"'(\[—-])(\p{Lu}[\p{L}\p{N}'’.+#-]*)/gu;
const MONTHS = new Set(["Stycznia","Lutego","Marca","Kwietnia","Maja","Czerwca","Lipca","Sierpnia","Września","Października","Listopada","Grudnia","Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"]);
// Attribution line under a quotation: an em dash, then somewhere a link and a year.
const ATTRIBUTED = /—\s[^\n]*\]\((?:https?:)?\/\/[^)]*\)[^\n]*/u;
const HAS_YEAR = /\b(?:19|20)\d\d\b/;
const HAS_LINK = /\]\((?:https?:)?\/\/[^)]*\)/;
const PERCENT = /\d+\s?%/;

/** Distinct capitalised names in a prose string, and how many times each occurs. */
function countNames(plain, tally) {
  const text = plain
    .replace(/^\s*(?:>|-|\*|\d+\.)\s+/, "")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "");
  for (const m of text.matchAll(NAME_TOKEN)) {
    const before = text.slice(0, m.index + m[1].length).trimEnd();
    // Sentence-initial: nothing before it, or a sentence end, a colon, an
    // opening quote or bracket, an em dash aside, a list marker inside a
    // joined list block, or the close of a […] ellipsis inside a quotation.
    if (before === "" || /[.!?…:„"(\[—\]•-]$/u.test(before)) continue;
    const tok = m[2].replace(/[.,;:]+$/, "");
    if (tok.length < 2) continue;
    if (tok === tok.toUpperCase()) continue;
    if (MONTHS.has(tok)) continue;
    tally.set(tok, (tally.get(tok) || 0) + 1);
  }
}

function analyseLesson(file) {
  const slug = path.basename(file, ".mdx");
  const raw = readFileSync(file, "utf8");
  const body = stripFrontmatter(raw);
  const { text } = stripBlocks(body);
  const secs = sections(text);

  const report = { file, slug, notes: [], headings: [] };
  let proseWords = 0;
  let allWords = 0;
  let bold = 0;
  let oneSentence = 0;
  let quotes = 0;
  let forward = 0;
  let toNie = 0;
  const badQuotes = [];
  const gendered = [];
  const shortSections = [];
  const readerClaims = [];
  const unattributed = [];
  const percentNoLink = [];
  const names = new Map();
  let opensFromCourse = null;

  for (const sec of secs) {
    const key = sec.heading.toLowerCase();
    if (key === "źródła") continue;
    const isExercises = key === "ćwiczenia";
    if (!isExercises && sec.heading !== "(opening)") report.headings.push(sec.heading);

    const bl = blocks(sec.lines);
    let secWords = 0;
    let hasFurniture = false;
    let secHasPercent = false;
    let secHasLink = false;
    let firstProseSeen = false;

    for (const b of bl) {
      if (b.kind === "code" || b.kind === "diagram") {
        hasFurniture = true;
        continue;
      }
      if (b.kind === "table" || b.kind === "list") hasFurniture = true;
      const plain = stripInline(b.text);
      const w = words(plain.replace(/^[#>|\-\d.\s]+/, ""));
      secWords += w;
      allWords += w;
      if (isExercises) continue;

      if (b.kind === "quote") {
        quotes++;
        if (!(ATTRIBUTED.test(b.text) && HAS_YEAR.test(b.text))) unattributed.push(b.start);
      }
      if (b.kind === "prose" || b.kind === "list" || b.kind === "table") {
        if (PERCENT.test(plain)) secHasPercent = true;
        if (HAS_LINK.test(b.text)) secHasLink = true;
      }
      if (b.kind === "prose" && sec.heading === "(opening)" && !firstProseSeen) {
        firstProseSeen = true;
        const m = plain.trim().match(OPENS_FROM_COURSE);
        if (m) opensFromCourse = { line: b.start, words: m[0] };
      }
      if (b.kind === "prose" || b.kind === "list" || b.kind === "quote") {
        proseWords += w;
        countNames(plain, names);
        for (const m of plain.matchAll(READER_CLAIM)) readerClaims.push({ line: b.start, text: m[0] });
        bold += (plain.match(/\*\*[^*]+\*\*/g) || []).length;
        forward += (plain.match(FORWARD) || []).length;
        toNie += (plain.match(TO_NIE) || []).length;
        // Any straight double quote in prose is a smell: Polish prose uses „…”.
        // Inline code and link targets were stripped above.
        for (const m of plain.matchAll(/"/g)) {
          badQuotes.push({ line: b.start, text: plain.slice(Math.max(0, m.index - 18), m.index + 12).replace(/\s+/g, " ") });
        }
        for (const m of plain.matchAll(GENDERED)) gendered.push({ line: b.start, form: m[0] });
      }
      if (b.kind === "prose") {
        const sentences = (plain.match(/[.!?…](\s|$)/g) || []).length;
        if (sentences <= 1 && w <= T.oneSentenceMaxWords) oneSentence++;
      }
    }

    if (!isExercises && sec.heading !== "(opening)" && secWords < T.shortSectionWords && !hasFurniture) {
      shortSections.push(`${sec.heading} (${secWords} words, line ${sec.start})`);
    }
    if (!isExercises && secHasPercent && !secHasLink) percentNoLink.push(`${sec.heading} (line ${sec.start})`);
  }

  const distinctNames = names.size;
  const namesPer100 = proseWords ? (distinctNames / proseWords) * 100 : 0;
  const onceNames = [...names.entries()].filter(([, n]) => n === 1).map(([k]) => k);

  const boldPer100 = proseWords ? (bold / proseWords) * 100 : 0;
  report.metrics = { words: allWords, h2: report.headings.length, boldPer100, oneSentence, quotes, forward, toNie, badQuotes: badQuotes.length, namesPer100, distinctNames, onceNames: onceNames.length };

  if (boldPer100 > T.boldPer100) report.notes.push(`bold: ${bold} spans in ${proseWords} words of prose = ${boldPer100.toFixed(2)} per 100 (budget ${T.boldPer100})`);
  if (oneSentence > T.oneSentenceParagraphs) report.notes.push(`one-sentence paragraphs: ${oneSentence} (budget ${T.oneSentenceParagraphs})`);
  if (toNie > T.toNieToY) report.notes.push(`"To nie X. To Y.": ${toNie} (budget ${T.toNieToY})`);
  if (quotes > T.blockquotes) report.notes.push(`block quotes: ${quotes} (budget ${T.blockquotes})`);
  if (forward > T.forwardRefs) report.notes.push(`forward references: ${forward} (budget ${T.forwardRefs})`);
  for (const s of shortSections) report.notes.push(`short H2 section without table/diagram/list: ${s}`);
  for (const q of badQuotes) report.notes.push(`quotation mark: line ${q.line}: …${q.text}…`);
  if (namesPer100 > T.namesPer100) report.notes.push(`names: ${distinctNames} distinct capitalised names in ${proseWords} words of prose = ${namesPer100.toFixed(2)} per 100 (budget ${T.namesPer100})`);
  if (onceNames.length) {
    const shown = onceNames.slice(0, T.onceNamesListed).join(", ");
    const more = onceNames.length > T.onceNamesListed ? ` … and ${onceNames.length - T.onceNamesListed} more` : "";
    report.notes.push(`names used in one sentence only (${onceNames.length}), judge each — cut, or give it a second sentence: ${shown}${more}`);
  }
  for (const c of readerClaims) report.notes.push(`claim about the reader: line ${c.line}: „${c.text}” — check docs/content-reader.md`);
  if (opensFromCourse) report.notes.push(`opening starts from the course, not the student: line ${opensFromCourse.line}: „${opensFromCourse.words}…”`);
  for (const l of unattributed) report.notes.push(`block quote without an attribution line (— author, [date](link)): line ${l}`);
  for (const sName of percentNoLink) report.notes.push(`percentage with no link anywhere in its section: ${sName}`);
  report.gendered = gendered;
  return report;
}

/* ------------------------------------------------------------------ *
 * Cross-lesson analysis, per module directory
 * ------------------------------------------------------------------ */

function crossLesson(reports) {
  const byModule = new Map();
  for (const r of reports) {
    const mod = path.basename(path.dirname(r.file));
    if (!byModule.has(mod)) byModule.set(mod, []);
    byModule.get(mod).push(r);
  }
  const out = [];
  for (const [mod, rs] of byModule) {
    const seen = new Map();
    for (const r of rs) {
      for (const h of r.headings) {
        const k = h.toLowerCase();
        if (STANDARD_HEADINGS.has(k)) continue;
        if (!seen.has(k)) seen.set(k, []);
        seen.get(k).push(r.slug);
      }
    }
    for (const [h, slugs] of seen) {
      if (slugs.length > 1) out.push(`${mod}: heading "${h}" appears in ${slugs.join(", ")}`);
    }
    for (const r of rs) {
      const raw = stripBlocks(stripFrontmatter(readFileSync(r.file, "utf8"))).text;
      const bodyOnly = raw.split(/^## Źródła/m)[0];
      for (const s of STORIES) {
        if (s.home === r.slug) continue;
        const n = (bodyOnly.match(s.re) || []).length;
        if (n > 0) out.push(`${mod}/${r.slug}: mentions ${s.name} ×${n} — home is ${s.home}`);
      }
    }
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Report
 * ------------------------------------------------------------------ */

const files = lessonFiles(process.argv.slice(2));
if (files.length === 0) {
  console.log("check-content-style: no lessons found");
  process.exit(0);
}

const reports = files.map(analyseLesson);

const pad = (s, n) => String(s).padEnd(n);
console.log("");
console.log(`${pad("lesson", 34)} ${pad("words", 6)} ${pad("H2", 3)} ${pad("bold/100", 9)} ${pad("1-sent", 7)} ${pad("quotes", 7)} ${pad("fwd", 4)} ${pad("marks", 5)} ${pad("names/100", 10)} ${pad("once", 5)}`);
for (const r of reports) {
  const m = r.metrics;
  console.log(`${pad(r.slug, 34)} ${pad(m.words, 6)} ${pad(m.h2, 3)} ${pad(m.boldPer100.toFixed(2), 9)} ${pad(m.oneSentence, 7)} ${pad(m.quotes, 7)} ${pad(m.forward, 4)} ${pad(m.badQuotes, 5)} ${pad(m.namesPer100.toFixed(2), 10)} ${pad(m.onceNames, 5)}`);
}

for (const r of reports) {
  if (r.notes.length === 0 && r.gendered.length === 0) continue;
  console.log("");
  console.log(`## ${path.relative(process.cwd(), r.file)}`);
  for (const n of r.notes) console.log(`  - ${n}`);
  if (r.gendered.length) {
    const forms = r.gendered.map((g) => `${g.form} (l.${g.line})`).join(", ");
    console.log(`  - gendered second-person forms, judge each: ${forms}`);
  }
}

const cross = crossLesson(reports);
if (cross.length) {
  console.log("");
  console.log("## across lessons");
  for (const c of cross) console.log(`  - ${c}`);
}

console.log("");
console.log("check-content-style: smells are questions, not failures (see docs/content-style.md, Budgets)");
process.exit(0);
