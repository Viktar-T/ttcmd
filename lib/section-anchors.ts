import type { Root } from "hast";

/**
 * Section anchors, minted when the site is built.
 *
 * One derivation, two consumers: the id this plugin writes onto an `h2` in the
 * article's DOM and the id the contents panel links to are the same string,
 * produced once, here. The alternative — a second scan of the raw MDX for the
 * panel — is two derivations that agree only until a heading contains markup.
 *
 * The identifiers are addresses students bookmark and teachers write into
 * lesson plans, so they are held to Article III like every other slug:
 * lowercase ASCII, Polish diacritics transliterated, and A HEADING THAT
 * CANNOT PRODUCE ONE FAILS THE BUILD rather than minting an anchor nobody
 * could predict from the heading they are looking at. The throw carries the
 * heading's text; compile() in lib/content.ts prefixes the file, so the
 * failure names both with no machinery here.
 */

export interface SectionEntry {
  id: string;
  title: string;
}

/**
 * The id the panel's skip control jumps to, reserved here so a lesson heading
 * that would derive it — "Treść" would — takes the numeric suffix instead of
 * capturing the skip target.
 */
export const SKIP_TARGET_ID = "tresc";

/*
 * ą and ó live in different Unicode blocks (the trap Article III records for
 * fonts holds for slugs too), so the mapping is written out rather than
 * derived from a normalisation that handles one block and not the other.
 * Uppercase is lowercased before this map is consulted.
 */
const POLISH_TO_ASCII: Record<string, string> = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ź: "z",
  ż: "z",
};

/** What a finished identifier must look like. The derivation below cannot
    produce anything else; the regex keeps a future edit from widening it. */
const VALID_ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * Heading text → fragment identifier, per spec §1: lowercase, the fixed
 * Polish transliteration, everything else collapsing to hyphens, runs
 * collapsed, ends trimmed. Empty — a heading of punctuation or of characters
 * no rule covers — throws, and so does anything the final check rejects.
 */
export function slugifyHeading(text: string): string {
  const slug = [...text.toLowerCase()]
    .map((char) => POLISH_TO_ASCII[char] ?? char)
    .map((char) => (/[a-z0-9]/.test(char) ? char : "-"))
    .join("")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (slug === "" || !VALID_ID.test(slug)) {
    throw new Error(
      `heading "${text}" cannot derive a section id — nothing of it survives ` +
        `the ASCII derivation. Reword the heading, or extend the ` +
        `transliteration in lib/section-anchors.ts on purpose.`
    );
  }
  return slug;
}

interface HastNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

/** Every text descendant, concatenated — so inline markup in a future heading
    contributes its words and nothing else. */
function textOf(node: HastNode): string {
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(textOf).join("");
}

/**
 * The rehype plugin. Walks the whole tree rather than the root's children —
 * MDX wraps content in flow elements freely, and a top-level `##` section is
 * top-level to the reader whatever hast nests it in. Every `h2` gets an id;
 * `{ id, title }` is pushed onto `collect` in document order, which is the
 * array the panel renders.
 */
export function rehypeSectionAnchors(options: { collect: SectionEntry[] }) {
  return (tree: Root) => {
    const used = new Set<string>([SKIP_TARGET_ID]);

    const visit = (node: HastNode) => {
      if (node.type === "element" && node.tagName === "h2") {
        const title = textOf(node).trim();
        const base = slugifyHeading(title);

        let id = base;
        for (let n = 2; used.has(id); n += 1) id = `${base}-${n}`;
        used.add(id);

        node.properties = { ...node.properties, id };
        options.collect.push({ id, title });
        return;
      }
      for (const child of node.children ?? []) visit(child);
    };

    visit(tree as HastNode);
  };
}
