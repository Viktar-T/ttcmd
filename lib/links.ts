/**
 * What a link is, decided once.
 *
 * The spec's reviewer note names the mistake this file exists to make
 * unconstructible: **a second definition of "external"**. A build check that
 * knows one definition and a rendered anchor that knows another fail in the
 * direction that publishes — a link validated as internal and rendered as
 * external opens a new tab onto a page that is not there.
 *
 * So `classifyLink` is the only place in the repository that answers *what kind
 * of link is this*, and it has exactly two callers: the rehype plugin below,
 * which validates and collects at build, and `components/prose-link.tsx`, which
 * renders. Every anchor on a compiled page goes through the second of those —
 * `a` is bound in the components map the way `pre` already is — so there is one
 * classifier and one renderer, not two of either.
 *
 * ORDERING, because it is the trap. The set of valid internal targets is the
 * course model, and the function that builds the course model is the same
 * function that runs the compiles (`getCourse` in lib/content.ts). A plugin
 * that asked it for the answer would re-enter a cached promise waiting on the
 * very compile that asked. So this file **classifies and collects during a
 * compile, and resolves after every compile has finished** — `rehypeLinks`
 * pushes, `resolveInternalLinks` decides.
 */

import type { Root } from "hast";

/* ------------------------------------------------------------------ *
 * Classification
 * ------------------------------------------------------------------ */

export type LinkKind =
  | { kind: "external"; href: string }
  /** `target` is the href with any fragment removed — the part that has to
      resolve to a page. The fragment is deliberately not validated (spec,
      *Out of scope*), and it is split off HERE so the check and the anchor
      cannot disagree about what the target was. */
  | { kind: "internal"; href: string; target: string }
  | { kind: "refused"; href: string; why: string };

/**
 * The site's own routes that are not derived from content: `app/page.tsx` and
 * `app/moduly/page.tsx`. Everything else a link may point at is a module or a
 * lesson, and comes from the course model.
 *
 * `/styleguide` is deliberately absent. It is a maintainer's instrument that
 * nothing links to, and a lesson linking to it is a mistake worth stopping.
 * Adding an entry here is a deliberate edit, not a pattern to widen.
 */
export const SITE_ROUTES: readonly string[] = ["/", "/moduly"];

export function classifyLink(rawHref: string): LinkKind {
  const href = rawHref.trim();

  if (href === "") {
    return { kind: "refused", href, why: "it is empty" };
  }

  if (/^https?:\/\//i.test(href)) {
    return { kind: "external", href };
  }

  /* Before the leading-slash test: `//example.com` is a protocol-relative
     link to another site, and reading it as a path is how one would be
     validated against the course and then opened as an internal page. */
  if (href.startsWith("//")) {
    return {
      kind: "refused",
      href,
      why: "a protocol-relative link is a link to another site with the protocol left off. Write https:// in front of it",
    };
  }

  if (href.startsWith("/")) {
    const target = href.split("#")[0];
    if (target.includes("?")) {
      return {
        kind: "refused",
        href,
        why: "a query string means nothing on this site — every page is static (Article VIII). Remove it",
      };
    }
    /* One spelling of every target: `/moduly/` and `/moduly` are the same
       page, and only one of them is in the course model. */
    const normalised =
      target.length > 1 && target.endsWith("/") ? target.slice(0, -1) : target;
    return { kind: "internal", href, target: normalised };
  }

  return {
    kind: "refused",
    href,
    why:
      "it is neither a link into this site (starting with /) nor an http(s) " +
      "link to another one. Nothing in the corpus writes a mailto:, a tel:, a " +
      "bare #fragment or a relative path, so the build refuses one rather than " +
      "guessing how it should render (spec, Out of scope)",
  };
}

/* ------------------------------------------------------------------ *
 * A moment inside a recording
 * ------------------------------------------------------------------ */

/**
 * `7:55` → 475, `1:01:16` → 3676.
 *
 * The shapes the corpus writes, and no others: `m:ss`, `mm:ss`, `h:mm:ss`,
 * `hh:mm:ss`.
 */
export function parseTimestamp(at: string): number {
  const parts = at.trim().split(":");
  if (parts.length < 2 || parts.length > 3 || !parts.every((p) => /^\d{1,2}$/.test(p))) {
    throw new Error(
      `"${at}" is not a moment in a recording. Write it as m:ss, mm:ss or ` +
        `h:mm:ss — the way the player shows it.`
    );
  }

  const numbers = parts.map(Number);
  const seconds = numbers[numbers.length - 1];
  const minutes = numbers[numbers.length - 2];
  const hours = numbers.length === 3 ? numbers[0] : 0;

  if (seconds > 59 || (numbers.length === 3 && minutes > 59)) {
    throw new Error(`"${at}" is not a moment in a recording — 60 is a minute.`);
  }
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * The hosts this build knows how to address a moment inside.
 *
 * Every one of them takes the same `t` parameter in seconds, which is why this
 * is a set and not a table of functions. A host that needs a different
 * parameter is a host that needs a table, and the day one arrives is the day to
 * write it.
 */
const DEEP_LINK_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
]);

/**
 * The link, moved to the moment.
 *
 * **Throws on a host it cannot address** rather than returning the link
 * unchanged (spec, decision 8). Rendering `51:05` beside a link that opens at
 * the start is a promise to the reader that the page quietly breaks, and the
 * reader has no way to notice.
 */
export function deepLink(href: string, at: string): string {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    throw new Error(`"${href}" is not a link a moment can be added to.`);
  }

  if (!DEEP_LINK_HOSTS.has(url.hostname)) {
    throw new Error(
      `this build does not know how to open ${url.hostname} at a given ` +
        `moment. Either drop the moment, or add the host to DEEP_LINK_HOSTS ` +
        `in lib/links.ts — one line, and only if it takes ?t= in seconds.`
    );
  }

  if (url.searchParams.has("t")) {
    throw new Error(
      `the link already opens at a moment (t=${url.searchParams.get("t")}), ` +
        `and the moment is also written beside it. Keep one of the two — the ` +
        `written one, which the reader can see.`
    );
  }

  url.searchParams.set("t", `${parseTimestamp(at)}s`);
  return url.toString();
}

/* ------------------------------------------------------------------ *
 * Resolution — after every compile, never during one
 * ------------------------------------------------------------------ */

/** One internal link, with where it was written. `path` and `line` are stamped
    by `compile()` in lib/content.ts, which is the only place that knows both
    the file and the frontmatter offset. */
export interface LinkUse {
  path: string;
  line: number;
  href: string;
  target: string;
}

/**
 * Everything a target may resolve to, and enough to say *why* one did not.
 *
 * Built by `getCourse` from the course it has just assembled — never by a
 * second walk of the content directory, which would have to re-implement the
 * publish rule, the module-prefix rule and the slug rule and would disagree
 * with the first implementation the day any of the three changed.
 */
export interface LinkTargets {
  /** Every href a link may point at: the site routes, the modules, and the
      published lessons. */
  published: ReadonlySet<string>;
  /** Lesson hrefs whose file is on disk but whose `publish` flag is false, so
      that "there is no such lesson" and "that lesson is not published" are
      different sentences. */
  unpublished: ReadonlySet<string>;
  /** Module hrefs, so a wrong lesson slug under a real module says so. */
  modules: ReadonlySet<string>;
}

/**
 * Refuses every internal link that does not resolve — all of them, in one
 * message, so a run of the build reports every broken link rather than the
 * first.
 */
export function resolveInternalLinks(
  uses: readonly LinkUse[],
  targets: LinkTargets
): void {
  const problems: string[] = [];

  for (const use of uses) {
    if (targets.published.has(use.target)) continue;

    let why: string;
    if (targets.unpublished.has(use.target)) {
      why =
        `that lesson exists but is not published (publish: false), so the ` +
        `site answers it as not found. Publish it, or link somewhere else — ` +
        `a link to a not-found page on a public site is worse than a build ` +
        `that stops`;
    } else {
      const parent = use.target.slice(0, use.target.lastIndexOf("/"));
      why = targets.modules.has(parent)
        ? `${parent} is a module, but it holds no lesson with that slug`
        : `there is no such page. Links into the course are resolved against ` +
          `content/moduly/ when the site is built`;
    }

    problems.push(`${use.path}:${use.line}: the link ${use.href} — ${why}.`);
  }

  if (problems.length > 0) {
    throw new Error(problems.join("\n\n"));
  }
}

/* ------------------------------------------------------------------ *
 * The plugin
 * ------------------------------------------------------------------ */

/** A refusal, with the line it was written on — body-relative, because that is
    what the tree carries. `compile()` in lib/content.ts adds the file and the
    frontmatter offset; nothing here knows either.

    COLLECTED RATHER THAN THROWN, and that is not a style choice.
    `next-mdx-remote` catches anything thrown inside a compile and rebuilds it
    as a fresh plain Error carrying only the message text, so a line number
    attached to a throw does not survive the compile. Pushing lets one place —
    `compile()` — compose `path:line: message`, and reports every refusal in a
    file in one run instead of one per build. */
export interface ContentProblem {
  line: number;
  message: string;
}

/** An internal link as the tree gives it: no file yet, and the line still
    body-relative. `compile()` completes it into a `LinkUse`. */
export type CollectedLink = Omit<LinkUse, "path">;

interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  position?: { start?: { line?: number } };
  children?: HastNode[];
  /** MDX's JSX nodes reach the rehype phase intact, so a link written as raw
      JSX arrives as one of these rather than as an `element`. */
  name?: string | null;
  attributes?: { type: string; name?: string; value?: unknown }[];
}

/**
 * Classifies every anchor in the tree, refuses the ones that are neither
 * internal nor `http(s)`, and collects the internal ones for
 * `resolveInternalLinks` to decide on once the course exists.
 *
 * **It writes nothing onto the node.** The anchor's markup — the new tab, the
 * relationship attributes, the visible mark — is `components/prose-link.tsx`,
 * which every anchor on a compiled page reaches because `a` is bound in the
 * components map the way `pre` already is. A plugin that also wrote markup
 * would be the second spelling this file's header exists to prevent.
 *
 * Walks the whole tree rather than the root's children, for the reason both
 * existing plugins give: MDX nests flow content freely, and a link is a link
 * wherever hast puts it.
 */
export function rehypeLinks(options: {
  collect: CollectedLink[];
  problems: ContentProblem[];
}) {
  return (tree: Root) => {
    const visit = (node: HastNode) => {
      const href = anchorHref(node);
      if (href !== undefined) {
        const line = node.position?.start?.line ?? 0;
        const link = classifyLink(href);
        if (link.kind === "refused") {
          options.problems.push({
            line,
            message: `the link ${link.href} is refused: ${link.why}.`,
          });
        } else if (link.kind === "internal") {
          options.collect.push({ line, href: link.href, target: link.target });
        }
      }
      for (const child of node.children ?? []) visit(child);
    };

    visit(tree as unknown as HastNode);
  };
}

/** The `href` of an anchor, whether it was written as Markdown or as JSX, or
    `undefined` when the node is not an anchor. An `href={expr}` is deleted
    before any rehype plugin runs — see the note in lib/blocks.ts — so it reads
    here as absent rather than as an expression. */
function anchorHref(node: HastNode): string | undefined {
  if (node.type === "element" && node.tagName === "a") {
    const href = node.properties?.href;
    return typeof href === "string" ? href : undefined;
  }
  if (
    (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
    node.name === "a"
  ) {
    const attribute = (node.attributes ?? []).find(
      (a) => a.type === "mdxJsxAttribute" && a.name === "href"
    );
    return typeof attribute?.value === "string" ? attribute.value : undefined;
  }
  return undefined;
}
