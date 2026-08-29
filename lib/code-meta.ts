/**
 * The fence info line — the only authoring surface slice 005 creates.
 *
 * Complete grammar, and it is short on purpose:
 *
 *   info   := ( WS+ item )*
 *   item   := 'title="' [^"]+ '"'  |  '{' range ( ',' range )* '}'
 *   range  := N | N '-' M            (N >= 1, and M >= N)
 *
 * ```csharp title="Program.cs" {2,4-5}
 *
 * At most one of each, in either order. ANYTHING ELSE THROWS. A parser that
 * silently ignores what it does not implement drops something the author wrote
 * and leaves them looking for the styling bug that is not there — so the
 * dialect other tools accept (`showLineNumbers`, `caption`, word highlighting,
 * `/regex/` ranges) is refused by name rather than skipped, because every one
 * of those is a feature slice 005's spec put out of scope.
 *
 * The line-range check that needs the code — a number past the last line — is
 * not here. It lives in the transformer in `lib/code-highlight.ts`, which is
 * the only place that knows how many lines the block has after the trailing
 * newline is stripped.
 */

export interface CodeMeta {
  /** Rendered as the block's header. Absent means no header at all. */
  filename?: string;
  /** 1-based line numbers, ascending, deduplicated. */
  highlighted: number[];
}

const ACCEPTED = 'expected `title="name"` and/or `{1,3-5}`, separated by spaces, in either order';

function reject(raw: string, detail: string): never {
  throw new Error(
    `code block: cannot read the info line \`${raw.trim()}\` — ${detail}. ` +
      `The whole grammar is: ${ACCEPTED}. Nothing else is accepted, deliberately: ` +
      `silently ignoring part of an info line drops something the author wrote.`
  );
}

function parseRanges(raw: string, body: string): number[] {
  const lines = new Set<number>();

  if (body.trim() === "") reject(raw, "`{}` marks no lines");

  for (const part of body.split(",")) {
    const range = part.trim();
    const match = /^(\d+)(?:-(\d+))?$/.exec(range);
    if (!match) {
      reject(raw, `\`${range}\` is not a line or a range of lines`);
    }
    const from = Number(match[1]);
    const to = match[2] === undefined ? from : Number(match[2]);
    if (from < 1) reject(raw, `line numbers start at 1, so \`${range}\` cannot be marked`);
    if (to < from) reject(raw, `\`${range}\` runs backwards`);
    for (let line = from; line <= to; line++) lines.add(line);
  }

  return [...lines].sort((a, b) => a - b);
}

export function parseCodeMeta(raw: string): CodeMeta {
  const meta: CodeMeta = { highlighted: [] };
  let seenTitle = false;
  let seenRanges = false;
  let at = 0;

  while (at < raw.length) {
    if (/\s/.test(raw[at])) {
      at += 1;
      continue;
    }

    if (raw.startsWith('title="', at)) {
      const end = raw.indexOf('"', at + 7);
      if (end === -1) reject(raw, "a `title=\"` is never closed");
      if (seenTitle) reject(raw, "`title=` appears twice, and a block has one filename");
      const filename = raw.slice(at + 7, end);
      if (filename.trim() === "") reject(raw, "`title=\"\"` is a header with no name in it");
      meta.filename = filename;
      seenTitle = true;
      at = end + 1;
      continue;
    }

    if (raw[at] === "{") {
      const end = raw.indexOf("}", at + 1);
      if (end === -1) reject(raw, "a `{` is never closed");
      if (seenRanges) reject(raw, "two sets of line ranges, and a block has one set");
      meta.highlighted = parseRanges(raw, raw.slice(at + 1, end));
      seenRanges = true;
      at = end + 1;
      continue;
    }

    reject(raw, `\`${raw.slice(at).split(/\s/)[0]}\` is not something a fence may carry`);
  }

  return meta;
}
