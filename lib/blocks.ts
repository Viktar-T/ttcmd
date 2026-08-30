import type { Root } from "hast";
import { parseContentDate } from "./dates";
import { classifyLink, deepLink, type CollectedLink, type ContentProblem } from "./links";

/**
 * The four elements a lesson writes to say where something came from — and the
 * two entry elements two of them take.
 *
 * They exist to make one rule visible: a claim about the world carries a source
 * and a date. So **none of them may be usable in a way that hides it** (spec
 * §8). A quotation with no date, an evidence entry with no link, an entry
 * outside its list, a kind that is not one of the four — each stops the build
 * in front of its author. Nothing here ever renders a blank, a dash or a
 * plausible-looking gap: on a public site read by a class, a missing source
 * that looks like a design choice is worse than a build that will not finish.
 *
 * The names are Polish and ASCII because an author writing a lesson is writing
 * Polish and Article III holds every identifier to ASCII; the attribute names
 * are English and ASCII, as `Zadanie title="…"` already is (slice 009). The
 * React components and their files are English.
 *
 * WHY THIS PLUGIN VALIDATES AND STAMPS NOTHING. Everything an element renders
 * it can derive from what the author wrote — unlike an exercise, whose number
 * comes from a walk of the whole module and has to be stamped (ADR-0003). So
 * the plugin's job is refusal, and the component's job is rendering, and the
 * two share the pure functions in lib/dates.ts and lib/links.ts rather than
 * sharing a value passed between them.
 *
 * REFUSALS ARE COLLECTED, NOT THROWN — see `ContentProblem` in lib/links.ts.
 * `next-mdx-remote` rebuilds anything thrown inside a compile as a fresh Error
 * carrying only the message text, so a line number attached to a throw does not
 * survive. `compile()` in lib/content.ts composes `path:line: message`.
 *
 * ONE THING THIS PLUGIN CANNOT SEE. `next-mdx-remote` deletes expression-valued
 * attributes and spread attributes in the remark phase, before any rehype
 * plugin runs, so `date={ZMIENNA}` is simply absent by the time this code looks
 * — indistinguishable from a value that was never written. Every "required
 * attribute missing" message therefore says so.
 */

/* ------------------------------------------------------------------ *
 * The names an author types
 * ------------------------------------------------------------------ */

export const QUOTE_ELEMENT = "Cytat";
export const FIGURE_ELEMENT = "Rysunek";
export const SOURCES_ELEMENT = "Zrodla";
export const SOURCE_ELEMENT = "Zrodlo";
export const FURTHER_READING_ELEMENT = "CzytajDalej";
export const READING_ELEMENT = "Lektura";

/**
 * Every fixed Polish word these elements put on the page, in one place.
 *
 * The author writes none of them. Viktar rewrites anything student-facing
 * (AGENTS.md §7), and a phrase kept beside each component makes that a search
 * rather than an edit. The two date forms and the month names are in
 * lib/dates.ts for the same reason.
 */
export const WORDS = {
  /** The line `docs/content-style.md` §Mechanics fixes verbatim, ISO date and
      all: `Stan na **2026-08-29**.` */
  checkedOn: "Stan na",
  /** Before a figure's data source. */
  figureSource: "Dane:",
  /** Before a moment inside a recording, in a quotation's attribution. */
  fromMoment: "od",
  /** Before the link to a recording's transcript. */
  transcript: "Pełny zapis:",
  /** Before a printed locator, when a quotation's source has no URL. */
  print: "Wydanie drukowane:",
  /** Announced instead of the arrow that marks a link leaving the site. */
  externalLink: "link zewnętrzny",
} as const;

/**
 * The four kinds of further reading, ASCII in, Polish out.
 *
 * Four and no more (spec §5). A free string becomes six spellings of *artykuł*
 * inside one term; a fifth kind is a deliberate edit here, with a specimen on
 * the reference page, not something an author invents in a lesson.
 */
export const READING_KINDS: Record<string, string> = {
  artykul: "artykuł",
  wideo: "wideo",
  dokumentacja: "dokumentacja",
  kurs: "kurs",
};

/* ------------------------------------------------------------------ *
 * The contract
 * ------------------------------------------------------------------ */

interface AttributeSpec {
  required?: boolean;
  /** Its value is a link, so it is classified, refused if it is neither
      internal nor http(s), and collected for resolution if it is internal —
      exactly like a link written in prose (criterion 15). */
  url?: boolean;
}

type Children =
  /** Flow content: paragraphs, a drawing, a list. At least one. */
  | { kind: "block" }
  /** One line of inline content — a note, a reason to read something. Never a
      paragraph, a list or a second block wearing a note's clothes. */
  | { kind: "inline"; required: boolean }
  /** Only this element, at least one of it. */
  | { kind: "entries"; entry: string };

interface Contract {
  attributes: Record<string, AttributeSpec>;
  children: Children;
  /** The element this one must sit directly inside, if any. */
  parent?: string;
}

const REQUIRED: AttributeSpec = { required: true };
const REQUIRED_URL: AttributeSpec = { required: true, url: true };
const OPTIONAL: AttributeSpec = {};
const OPTIONAL_URL: AttributeSpec = { url: true };

const CONTRACTS: Record<string, Contract> = {
  [QUOTE_ELEMENT]: {
    attributes: {
      author: REQUIRED,
      source: REQUIRED,
      date: REQUIRED,
      url: OPTIONAL_URL,
      print: OPTIONAL,
      at: OPTIONAL,
      transcript: OPTIONAL_URL,
    },
    children: { kind: "block" },
  },
  [FIGURE_ELEMENT]: {
    attributes: {
      caption: REQUIRED,
      source: OPTIONAL,
      sourceUrl: OPTIONAL_URL,
    },
    children: { kind: "block" },
  },
  [SOURCES_ELEMENT]: {
    attributes: { checked: REQUIRED },
    children: { kind: "entries", entry: SOURCE_ELEMENT },
  },
  [SOURCE_ELEMENT]: {
    attributes: {
      title: REQUIRED,
      publisher: REQUIRED,
      date: REQUIRED,
      url: REQUIRED_URL,
    },
    children: { kind: "inline", required: false },
    parent: SOURCES_ELEMENT,
  },
  [FURTHER_READING_ELEMENT]: {
    attributes: {},
    children: { kind: "entries", entry: READING_ELEMENT },
  },
  [READING_ELEMENT]: {
    attributes: { title: REQUIRED, url: REQUIRED_URL, kind: REQUIRED },
    children: { kind: "inline", required: true },
    parent: FURTHER_READING_ELEMENT,
  },
};

/** The names this plugin governs — the components map binds exactly these. */
export const BLOCK_ELEMENTS = Object.keys(CONTRACTS);

/* ------------------------------------------------------------------ *
 * The walk
 * ------------------------------------------------------------------ */

interface JsxAttribute {
  type: string;
  name?: string;
  value?: unknown;
}

interface Node {
  type: string;
  tagName?: string;
  value?: string;
  name?: string | null;
  attributes?: JsxAttribute[];
  children?: Node[];
  position?: { start?: { line?: number } };
}

/** Tags that mean the author left a blank line and got flow content where one
    line was asked for. `p` is the one this actually catches; the rest are here
    so the message stays true when somebody writes a list. */
const BLOCK_TAGS = new Set([
  "p",
  "ul",
  "ol",
  "li",
  "blockquote",
  "pre",
  "div",
  "table",
  "figure",
  "hr",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
]);

const isWhitespace = (node: Node) =>
  node.type === "text" && (node.value ?? "").trim() === "";

const lineOf = (node: Node) => node.position?.start?.line ?? 0;

export function rehypeBlocks(options: {
  problems: ContentProblem[];
  collect: CollectedLink[];
}) {
  return (tree: Root) => {
    const { problems, collect } = options;

    const fail = (node: Node, message: string) =>
      problems.push({ line: lineOf(node), message: `<${node.name}>: ${message}` });

    /**
     * `parent` is the nearest ancestor among the six, which is what makes
     * "an entry outside its list" checkable. There is no render-time backstop
     * for it and there cannot be: a Server Component cannot read React context,
     * so this walk is the whole guarantee.
     */
    const visit = (node: Node, parent: string | null) => {
      const name =
        node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement"
          ? (node.name ?? "")
          : "";
      const contract = name ? CONTRACTS[name] : undefined;

      if (contract) {
        check(node, name, contract, parent, fail, collect);
      }

      const childParent = contract ? name : parent;
      for (const child of node.children ?? []) visit(child, childParent);
    };

    visit(tree as unknown as Node, null);
  };
}

function check(
  node: Node,
  name: string,
  contract: Contract,
  parent: string | null,
  fail: (node: Node, message: string) => void,
  collect: CollectedLink[]
): void {
  /* A block written inside a paragraph. MDX decides this by the blank lines
     around it, and the author's mistake is invisible in the source. */
  if (node.type === "mdxJsxTextElement") {
    fail(
      node,
      `this is a block and it has been written inside a paragraph. Leave a ` +
        `blank line before it and after its opening tag.`
    );
    return;
  }

  /* Placement. An entry states the list it belongs to; the four block elements
     state only that they do not nest — a quotation inside a sources list, or a
     figure inside a quotation, is a mistake with no reading. */
  if (contract.parent && parent !== contract.parent) {
    fail(
      node,
      parent === null
        ? `it belongs inside <${contract.parent}> and this one is on its own. ` +
            `An entry outside its list has no list to be an entry of.`
        : `it belongs inside <${contract.parent}>, and this one is inside ` +
            `<${parent}>.`
    );
  } else if (!contract.parent && parent !== null) {
    fail(node, `it cannot be written inside <${parent}>.`);
  }

  const written = readAttributes(node, name, contract, fail);
  if (written === null) return;

  checkChildren(node, name, contract, fail);

  for (const [attribute, spec] of Object.entries(contract.attributes)) {
    const value = written.get(attribute);
    if (spec.url && value !== undefined) {
      checkUrl(node, attribute, value, fail, collect);
    }
  }

  if (name === QUOTE_ELEMENT) checkQuote(node, written, fail);
  if (name === FIGURE_ELEMENT) checkFigure(node, written, fail);
  if (name === SOURCES_ELEMENT) checkDate(node, "checked", written, fail, true);
  if (name === SOURCE_ELEMENT) checkDate(node, "date", written, fail, false);
  if (name === READING_ELEMENT) checkKind(node, written, fail);
}

/**
 * Every attribute the author wrote, refusing the ones this element does not
 * take and the ones written without a plain quoted value.
 *
 * Returns `null` when the shape is broken badly enough that the checks after it
 * would only produce noise.
 */
function readAttributes(
  node: Node,
  name: string,
  contract: Contract,
  fail: (node: Node, message: string) => void
): Map<string, string> | null {
  const written = new Map<string, string>();
  const known = Object.keys(contract.attributes);

  for (const attribute of node.attributes ?? []) {
    /* Unreachable today — see the header: expression and spread attributes are
       deleted before this plugin runs. Kept because "unreachable" is a property
       of a dependency's default option, not of this repository. */
    if (attribute.type !== "mdxJsxAttribute") {
      fail(node, `a spread attribute is not supported.`);
      return null;
    }

    const attributeName = attribute.name ?? "";
    if (!(attributeName in contract.attributes)) {
      fail(
        node,
        attributeName === "date" && name === READING_ELEMENT
          ? `further reading carries no date. If the entry backs a claim the ` +
              `lesson makes, it is evidence and belongs in <${SOURCES_ELEMENT}>, ` +
              `where a date is required.`
          : `unknown attribute "${attributeName}". This element takes ` +
              `${known.length === 0 ? "no attributes" : known.map((k) => `${k}="…"`).join(", ")}.`
      );
      return null;
    }

    if (typeof attribute.value !== "string") {
      fail(
        node,
        `${attributeName} must be written as ${attributeName}="…", a plain ` +
          `quoted string.`
      );
      return null;
    }

    if (attribute.value.trim() === "") {
      fail(node, `${attributeName} is empty.`);
      return null;
    }

    written.set(attributeName, attribute.value.trim());
  }

  for (const [attribute, spec] of Object.entries(contract.attributes)) {
    if (spec.required && !written.has(attribute)) {
      fail(
        node,
        `${attribute}="…" is required and is not there. (A value written as ` +
          `${attribute}={…} is removed before this check and looks exactly ` +
          `like one that was never written — write it as a quoted string.)`
      );
    }
  }

  return written;
}

function checkChildren(
  node: Node,
  name: string,
  contract: Contract,
  fail: (node: Node, message: string) => void
): void {
  const children = (node.children ?? []).filter((child) => !isWhitespace(child));

  if (contract.children.kind === "block") {
    if (children.length === 0) {
      fail(
        node,
        name === QUOTE_ELEMENT
          ? `it is empty. The quoted words go between the tags, with a blank ` +
              `line on each side of them.`
          : `it is empty. The drawing goes between the tags, with a blank ` +
              `line on each side of it.`
      );
    }
    return;
  }

  if (contract.children.kind === "entries") {
    const { entry } = contract.children;
    if (children.length === 0) {
      fail(node, `it is empty. It holds <${entry}> entries and nothing else.`);
      return;
    }
    for (const child of children) {
      const childName =
        child.type === "mdxJsxFlowElement" || child.type === "mdxJsxTextElement"
          ? child.name
          : null;
      if (childName !== entry) {
        fail(
          node,
          `it holds <${entry}> entries and nothing else, and this one holds ` +
            `${childName ? `<${childName}>` : describe(child)}. Prose about ` +
            `the list goes above it, in the lesson.`
        );
      }
    }
    return;
  }

  /* Inline: one line, which is what a blank line inside the element destroys.
     `<Zrodlo …>nota z [linkiem](…)</Zrodlo>` on one line gives text and an
     anchor; the same words with blank lines around them give a paragraph. */
  const block = children.find(
    (child) =>
      child.type === "mdxJsxFlowElement" ||
      (child.type === "element" && BLOCK_TAGS.has(child.tagName ?? ""))
  );
  if (block) {
    fail(
      node,
      `its note is one line, and this one is a block. Write it on the same ` +
        `line as the opening tag, with no blank line inside the element.`
    );
    return;
  }

  if (contract.children.required && children.length === 0) {
    fail(
      node,
      `it needs one line saying why this is worth reading, written on the ` +
        `same line as the opening tag.`
    );
  }
}

function describe(node: Node): string {
  if (node.type === "element") return `<${node.tagName}>`;
  if (node.type === "text") return "text";
  return node.type;
}

function checkUrl(
  node: Node,
  attribute: string,
  value: string,
  fail: (node: Node, message: string) => void,
  collect: CollectedLink[]
): void {
  const link = classifyLink(value);
  if (link.kind === "refused") {
    fail(node, `${attribute}="${value}" is refused: ${link.why}.`);
  } else if (link.kind === "internal") {
    collect.push({ line: lineOf(node), href: link.href, target: link.target });
  }
}

function checkQuote(
  node: Node,
  written: Map<string, string>,
  fail: (node: Node, message: string) => void
): void {
  const url = written.get("url");
  const print = written.get("print");

  if (!url && !print) {
    fail(
      node,
      `a quotation says where it came from. Give it url="…", or — for a ` +
        `source that exists only on paper — print="…" naming the edition and ` +
        `the page. Leaving both out is the omission this element exists to ` +
        `prevent.`
    );
  } else if (url && print) {
    fail(
      node,
      `it has both url="…" and print="…". The printed locator stands in ` +
        `place of a link, not beside one; put the edition in the source's ` +
        `name if the reader needs both.`
    );
  }

  checkDate(node, "date", written, fail, false);

  const at = written.get("at");
  if (at === undefined) return;

  if (!url) {
    fail(node, `at="${at}" is a moment inside a recording, and there is no url="…" to open at it.`);
    return;
  }

  /* Validated here and discarded; the component calls the same function to
     render. One derivation, two callers — the shape this slice uses for the
     classifier and for the dates too. */
  try {
    deepLink(url, at);
  } catch (error) {
    fail(node, error instanceof Error ? error.message : String(error));
  }
}

function checkFigure(
  node: Node,
  written: Map<string, string>,
  fail: (node: Node, message: string) => void
): void {
  if (written.has("sourceUrl") && !written.has("source")) {
    fail(
      node,
      `sourceUrl="…" is a link on the data-source line and there is no ` +
        `source="…" for it to sit on. Link text names the thing ` +
        `(docs/content-style.md, Mechanics).`
    );
  }
}

function checkDate(
  node: Node,
  attribute: string,
  written: Map<string, string>,
  fail: (node: Node, message: string) => void,
  fullPrecision: boolean
): void {
  const value = written.get(attribute);
  if (value === undefined) return;

  let parsed;
  try {
    parsed = parseContentDate(value);
  } catch (error) {
    fail(node, `${attribute}: ${error instanceof Error ? error.message : String(error)}`);
    return;
  }

  if (fullPrecision && parsed.day === undefined) {
    fail(
      node,
      `${attribute}="${value}" names a day the list was checked, so it is ` +
        `written in full: yyyy-mm-dd.`
    );
  }
}

function checkKind(
  node: Node,
  written: Map<string, string>,
  fail: (node: Node, message: string) => void
): void {
  const kind = written.get("kind");
  if (kind === undefined) return;
  if (!(kind in READING_KINDS)) {
    fail(
      node,
      `kind="${kind}" is not one of the four: ` +
        `${Object.keys(READING_KINDS).join(", ")}. Four is the whole list, so ` +
        `that a term's worth of lessons does not accumulate six spellings of ` +
        `one word.`
    );
  }
}
