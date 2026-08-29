import rehypeShiki, { type RehypeShikiOptions } from "@shikijs/rehype";
import { createCssVariablesTheme } from "shiki";
import type { ShikiTransformer } from "shiki";
import type { Element } from "hast";

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

const ttcmdCodeTransformer: ShikiTransformer = {
  name: "ttcmd:code",

  /*
   * The inline style shiki writes here paints the surface and the foreground.
   * CSS owns both: a <pre> painting its own background pokes out of the
   * wrapper's rounded corners, and the surface has to be on the wrapper anyway
   * so the filename header and the copy control sit on the same colour.
   */
  pre(node: Element) {
    delete node.properties.style;
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

    transformers: [ttcmdCodeTransformer],
  },
];
