import type { Root } from "hast";
import { exerciseId, exerciseNumber } from "./numbering";

/**
 * Exercises, counted and numbered when the site is built.
 *
 * ADR-0003 and constitution Article VI: an exercise is numbered
 * `<module>.<n>`, continuously across the whole module, so **an exercise
 * cannot know its own number from inside its own file**. The ADR says in as
 * many words that any implementation computing the number per file, or storing
 * it, is wrong. This plugin is therefore deliberately incapable of producing a
 * number on its own: in `count` mode it only counts, and it can only number
 * when a caller hands it the module's number and the running total of the
 * lessons before this one — which only `getCourse` knows.
 *
 * That is why one lesson is compiled twice. The first compile counts, its body
 * is discarded, and the components map binds a stub that throws if that body is
 * ever rendered. The second compile receives the offset and stamps the number
 * and the identifier onto the node, before the tree becomes JSX — so the number
 * arrives at the component as an ordinary prop and leaves as ordinary text in
 * the HTML the server sends. No client JavaScript is involved, and none can be:
 * a Server Component cannot read React context, which is the other obvious way
 * to push a value down a tree and the way that would have forced this element
 * to ship JavaScript.
 *
 * MDX's JSX nodes survive into the rehype phase — `@mdx-js/mdx` lists
 * `mdxJsxFlowElement` and `mdxJsxTextElement` among the node types
 * `remark-rehype` passes through untouched — which is what lets this run in the
 * same phase as `rehypeSectionAnchors` and see the element the author wrote.
 *
 * Every refusal below throws from inside the compile. `compile()` in
 * `lib/content.ts` prefixes the relative path, so each message names its file
 * with no machinery here — the convention that file already established for the
 * highlighter.
 */

/** The name an author writes. Polish, because a student reads it; ASCII,
    because Article III holds every identifier to that. The React component and
    its file are English (`components/exercise.tsx`); this is the map key. */
export const EXERCISE_ELEMENT = "Zadanie";

/**
 * What a compile is allowed to do with an exercise.
 *
 * `forbidden` is not a convenience — it is the build failure of spec §6. A
 * module's own introduction is not a lesson, so it sits outside the `order`
 * walk that produces numbers, and an exercise written there could only render
 * as a blank, a zero or a `?` on a public page.
 */
export type ExercisePolicy =
  | { mode: "forbidden"; reason: string }
  | { mode: "count" }
  | { mode: "number"; moduleNumber: number; offset: number };

export interface ExerciseEntry {
  /** The fragment identifier, in `number` mode. Empty while counting: no
      offset is known yet, so no identifier exists to mint. */
  id: string;
  /** The public number, in `number` mode. Empty while counting. */
  number: string;
}

interface JsxAttribute {
  type: string;
  name?: string;
  value?: unknown;
}

interface JsxNode {
  type: string;
  name?: string | null;
  attributes?: JsxAttribute[];
  children?: JsxNode[];
}

/** The one attribute an author may write. Everything else is refused — see
    `checkAttributes`. */
const TITLE = "title";

function fail(message: string): never {
  throw new Error(`<${EXERCISE_ELEMENT}>: ${message}`);
}

/**
 * The author's side of the contract.
 *
 * A written `number` or `id` is the single input that would silently defeat
 * this slice: the page would look right, the number would be a second source of
 * truth, and it would be wrong the first time a lesson was reordered. It is
 * refused rather than overwritten, so the author is told instead of ignored.
 */
function checkAttributes(node: JsxNode): string | undefined {
  let title: string | undefined;

  for (const attribute of node.attributes ?? []) {
    if (attribute.type !== "mdxJsxAttribute") {
      fail(
        `a spread attribute is not supported. Write the title as ` +
          `${TITLE}="…" or leave it out.`
      );
    }

    if (attribute.name !== TITLE) {
      fail(
        `unknown attribute "${attribute.name}". The only attribute is ` +
          `${TITLE}. In particular an exercise carries no number and no ` +
          `offset: the number is derived from the module when the site is ` +
          `built (ADR-0003), and one written here would be a second source ` +
          `of truth for the string a teacher says out loud.`
      );
    }

    /* A quoted attribute arrives as a plain string. `title` alone arrives as
       null, and title={…} arrives as an expression node this build cannot
       evaluate — both are refused rather than rendered as an empty header. */
    if (typeof attribute.value !== "string") {
      fail(
        `${TITLE} must be written as ${TITLE}="…", a plain quoted string.`
      );
    }

    if (attribute.value.trim() === "") {
      fail(`${TITLE} is empty. Leave the attribute out instead.`);
    }

    title = attribute.value;
  }

  return title;
}

/**
 * The rehype plugin.
 *
 * Walks the whole tree rather than the root's children: an exercise is meant to
 * sit inline in the lesson where its concept was explained, and MDX nests flow
 * content freely. `collect` receives one entry per exercise in document order,
 * and its length is the lesson's exercise count.
 */
export function rehypeExercises(options: {
  policy: ExercisePolicy;
  collect: ExerciseEntry[];
}) {
  return (tree: Root) => {
    const { policy, collect } = options;

    const visit = (node: JsxNode, insideExercise: boolean) => {
      const isExercise =
        (node.type === "mdxJsxFlowElement" ||
          node.type === "mdxJsxTextElement") &&
        node.name === EXERCISE_ELEMENT;

      if (isExercise) {
        if (policy.mode === "forbidden") fail(policy.reason);

        if (node.type === "mdxJsxTextElement") {
          fail(
            `an exercise is a block, and this one is inside a paragraph. ` +
              `Leave a blank line before it, and one before its body.`
          );
        }

        if (insideExercise) {
          fail(
            `an exercise cannot contain another exercise — the numbering ` +
              `walks a module's lessons, not a nesting.`
          );
        }

        checkAttributes(node);

        const index = collect.length + 1;
        if (policy.mode === "number") {
          const n = policy.offset + index;
          const number = exerciseNumber(policy.moduleNumber, n);
          const id = exerciseId(policy.moduleNumber, n);

          /* Stamped onto the node, so `compileMDX` turns it into a prop and
             the component renders it as text. The author wrote neither. */
          node.attributes = [
            ...(node.attributes ?? []),
            { type: "mdxJsxAttribute", name: "number", value: number },
            { type: "mdxJsxAttribute", name: "id", value: id },
          ];
          collect.push({ id, number });
        } else {
          collect.push({ id: "", number: "" });
        }
      }

      for (const child of node.children ?? []) {
        visit(child, insideExercise || isExercise);
      }
    };

    visit(tree as unknown as JsxNode, false);
  };
}
