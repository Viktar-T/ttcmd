import rehypeShiki, { type RehypeShikiOptions } from "@shikijs/rehype";
import { createCssVariablesTheme } from "shiki";
import type { ShikiTransformer } from "shiki";
import type { Element } from "hast";
import {
  marksLine,
  parseCodeMeta,
  rangesPast,
  type CodeMeta,
} from "./code-meta";

/**
 * Syntax highlighting, computed when the site is built.
 *
 * Two things about this file matter more than the rest of it.
 *
 * 1. THE HIGHLIGHTER EMITS CSS VARIABLES, NEVER COLOURS. The theme below
 *    resolves every token colour to `var(--code-…)`, so the generated markup
 *    carries no colour value at all and the whole palette lives in
 *    `app/tokens.css` — the only file in the repository allowed to hold one
 *    (slice 003).
 *
 *    The failure mode this creates is silent: an emitted variable nobody
 *    defined makes the declaration invalid at computed-value time, `color`
 *    falls back to `inherit`, and that token class renders as ordinary body
 *    text with no error anywhere. `scripts/check-design-invariants.mjs`
 *    Check C is what turns that into a build failure. It reads the prefix out
 *    of this file by a source scan, so THE PREFIX BELOW MUST STAY A LITERAL
 *    at the call site.
 *
 * 2. NO FALLBACK LANGUAGE AND NO ERROR HANDLER. Together with `lazy`, that is
 *    what makes an unrecognised language fail the build instead of silently
 *    rendering grey: the grammar load rejects, the plugin's promise rejects,
 *    and the compile throws. Spec 005 §3.
 */

/** Read by Check C. Must stay a literal here — see the note above. */
export const CODE_VARIABLE_PREFIX = "--code-";

const codeTheme = createCssVariablesTheme({
  name: "ttcmd",
  variablePrefix: CODE_VARIABLE_PREFIX,
  variableDefaults: {},
  fontStyle: true,
});

/**
 * The parsed info line, put there by `parseMetaString` and read back in the
 * hooks below — parsed once per block rather than once per hook. shiki types
 * `meta` as an open record, so the cast happens here, once, with a shape check.
 */
function metaOf(meta: Record<string, unknown> | undefined): CodeMeta | null {
  const parsed = meta?._ttcmd;
  return parsed && typeof parsed === "object" ? (parsed as CodeMeta) : null;
}

const ttcmdCodeTransformer: ShikiTransformer = {
  name: "ttcmd:code",

  /*
   * The only hook that sees the code after the trailing newline has been
   * stripped, so it is the only place that knows how many lines the block
   * really has. A range that used to point at the interesting line and now
   * points past the end of the block is exactly the silent rot this repo
   * builds checks for.
   */
  preprocess(code) {
    const meta = metaOf(this.options.meta);
    if (!meta || meta.highlighted.length === 0) return;

    const lineCount = code.split("\n").length;
    const overrun = rangesPast(meta, lineCount);
    if (overrun.length > 0) {
      throw new Error(
        `code block: the info line marks ${overrun.join(", ")}, but the block ` +
          `has ${lineCount} line${lineCount === 1 ? "" : "s"}.`
      );
    }
  },

  /*
   * The inline style shiki writes here paints the surface and the foreground.
   * CSS owns both: a <pre> painting its own background pokes out of the
   * wrapper's rounded corners, and the surface has to be on the wrapper anyway
   * so the filename header and the copy control sit on the same colour.
   */
  pre(node: Element) {
    delete node.properties.style;

    const filename = metaOf(this.options.meta)?.filename;
    if (filename) node.properties["data-filename"] = filename;
  },

  /** `line` is 1-based, which is what an author writing `{2,4-5}` means. */
  line(node: Element, line: number) {
    const meta = metaOf(this.options.meta);
    if (meta && marksLine(meta, line)) {
      node.properties["data-highlighted"] = "";
    }
  },
};

export const rehypeCodeHighlight: [typeof rehypeShiki, RehypeShikiOptions] = [
  rehypeShiki,
  {
    theme: codeTheme,

    /*
     * Nothing preloaded, everything loaded on demand. There is no allow-list
     * of languages to maintain: every language in the bundle is available, and
     * only the grammars a lesson actually uses are ever read. C# is not a
     * configured special case (Article VII) — it is one of them.
     */
    langs: [],
    lazy: true,

    /* A fence with no language still gets the surface, the control and the
       rhythm, and no colour. Terminal output and directory trees have no
       language, and labelling them with one would be labelling them with a
       lie. `text` is a special language and needs no grammar. */
    defaultLanguage: "text",

    /* Deliberately absent: `fallbackLanguage` and `onError`. See the header. */

    /* Called once per block that carries an info line, and it throws rather
       than shrugging at anything it cannot read. See lib/code-meta.ts.

       The leading underscore is load-bearing: shiki copies every meta key that
       does not start with one onto the <pre> as an attribute, which would put
       `ttcmd="[object Object]"` in the tree. Nothing renders it today only
       because the block component builds its own <pre> and ignores the
       incoming props. */
    parseMetaString: (raw: string) => ({ _ttcmd: parseCodeMeta(raw) }),

    transformers: [ttcmdCodeTransformer],
  },
];
