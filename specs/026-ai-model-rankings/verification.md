# verification.md — 026-ai-model-rankings

Evidence for every task in `tasks.md` and every acceptance criterion in
`spec.md` as amended 2026-10-01. Each section is the command that ran and what
it returned. Criterion 10 is Viktar's eye and is marked as such.

The working tree carried slice 025's uncommitted work throughout (`app/postep/*`,
`content/schedule.json`, `lib/schedule*.ts`, `specs/025-*`). None of it is in
any 026 commit; its fingerprint is recorded in T06.

---

## T01 — The list exists, and the build knows its rules

The seed equals spec §3, byte for byte, in order — a one-off script that reads
the spec's three table rows (`| [name](url) | description |`) and compares:

```
$ node scratchpad/t01-seed.mjs
spec §3 rows found: 3
file rankings: 3
 1. Arena — Agent: Overall -> https://arena.ai/leaderboard/agent/overall (295 chars)
 2. Artificial Analysis -> https://artificialanalysis.ai/ (213 chars)
 3. SWE-bench -> https://www.swebench.com/ (204 chars)
rankings === spec §3 rows, in order: true
lede non-blank: true
starts with BOM: false
exit 0
```

Build, lint, and the type check that sees the two new modules (nothing renders
them yet, so the build's own compile does not reach them):

```
$ npm run build
  Design invariants OK.
✓ Compiled successfully in 597ms
  Finished TypeScript in 2.9s ...
✓ Generating static pages using 9 workers (55/55) in 24.4s
build exit 0

$ npm run lint
> eslint
lint exit 0

$ npx tsc --noEmit --listFilesOnly | grep ai-rankings
D:/code/ttcmd/lib/ai-rankings-schema.ts
D:/code/ttcmd/lib/ai-rankings.ts
$ npx tsc --noEmit
tsc exit 0
```

Criterion 1 holds at this step.

## T02 — `/rankingi-ai` renders the list

```
$ npm run build
  Design invariants OK.
✓ Compiled successfully in 553ms
  Finished TypeScript in 2.1s ...
✓ Generating static pages using 10 workers (56/56) in 13.4s
├ ○ /postep
├ ○ /rankingi-ai
build exit 0

$ npm run lint
> eslint
lint exit 0
```

`○` — prerendered as static content, so the loader's validation runs at build
time. Read from `.next/server/app/rankingi-ai.html` with the `<script>` payload
cut away, so only element markup is counted; the addresses are read out of
spec §3 by the same pattern T01 used:

```
$ node scratchpad/t02-page.mjs
tab title: "Ranking modeli AI — ttcmd"
h1 count: 1 text: "Ranking modeli AI"
tbody rows: 3
 row 1: first cell <a href="https://arena.ai/leaderboard/agent/overall">Arena — Agent: Overall</a> | target === §3: true | second cell 295 chars, non-empty: true
 row 2: first cell <a href="https://artificialanalysis.ai/">Artificial Analysis</a> | target === §3: true | second cell 213 chars, non-empty: true
 row 3: first cell <a href="https://www.swebench.com/">SWE-bench</a> | target === §3: true | second cell 204 chars, non-empty: true
anchors on the page: 4
   <a class="wordmark" aria-label="Strona główna" href="/">
   <a href="https://arena.ai/leaderboard/agent/overall">
   <a href="https://artificialanalysis.ai/">
   <a href="https://www.swebench.com/">
anchors with target=: 0 | anchors whose href has '?': 0
'_blank' anywhere in the file: false
PASS
exit 0

$ grep -o '<h1>Ranking modeli AI</h1><p>[^<]*</p><table>' .next/server/app/rankingi-ai.html
<h1>Ranking modeli AI</h1><p>Każdy z tych rankingów mierzy coś innego, a ich wyniki zmieniają się często.</p><table>
```

Criterion 3's markup half (the heading), criterion 4 (three rows, exact
targets, non-empty descriptions, in §3's order) and criterion 5 (no
`target="_blank"`, no query string — across every anchor, the header's
included) hold. The lede sits between the title and the table (spec §2).

## T03 — Invalid data fails the build, naming the entry

No code changed: the messages read as written. The data file was copied
aside first and its hash recorded; after each break it was restored from the
copy and the hash compared with the committed one. The broken states existed
only in the working tree, for the length of one build each, and none was
committed (`scratchpad/t03-break.sh`):

```
committed sha256: e9afdbb98fcd64506e17cf5407cb3b87fc0a54792824cfa19af7ece1e83b038a
working   sha256: e9afdbb98fcd64506e17cf5407cb3b87fc0a54792824cfa19af7ece1e83b038a

=== (a) ===
-      "url": "https://artificialanalysis.ai/",
-      "description": "Niezależne porównanie modeli i dostawców API: zbiorczy wskaźnik „inteligencji” z kilku testów, szybkość od
+      "url": "https://artificialanalysis.ai/"
npm run build exit 1
Error: content/ai-rankings.json — ranking "Artificial Analysis": "description" must be text with something in it — one or two sentences saying what this ranking measures.
restored: sha256 e9afdbb9…b038a == committed e9afdbb9…b038a: true

=== (b) ===
-      "url": "https://www.swebench.com/",
+      "url": "http://www.swebench.com/",
npm run build exit 1
Error: content/ai-rankings.json — ranking "SWE-bench": "url" is "http://www.swebench.com/", which is not an https address. Every ranking is linked over https — write the address starting with https://.
restored: sha256 e9afdbb9…b038a == committed e9afdbb9…b038a: true

=== (c) ===
-      "url": "https://arena.ai/leaderboard/agent/overall",
+      "url": "https//arena.ai/leaderboard/agent/overall",
npm run build exit 1
Error: content/ai-rankings.json — ranking "Arena — Agent: Overall": "url" is "https//arena.ai/leaderboard/agent/overall", which is not a web address. Write the whole address as the browser shows it, starting with https://.
restored: sha256 e9afdbb9…b038a == committed e9afdbb9…b038a: true

=== after the last restore ===
npm run build exit 0
✓ Generating static pages using 10 workers (56/56) in 16.2s
├ ○ /rankingi-ai
(porcelain for the data file above; empty = clean)
```

Where the build stops, from break (b)'s log:

```
Error occurred prerendering page "/rankingi-ai". Read more: https://nextjs.org/docs/messages/prerender-error
Error: content/ai-rankings.json — ranking "SWE-bench": "url" is "http://www.swebench.com/", which is not an https address. Every ranking is linked over https — write the address starting with https://.
    at l (lib\ai-rankings.ts:26:9)
Export encountered an error on /rankingi-ai/page: /rankingi-ai, exiting the build.
⨯ Next.js build worker exited with code: 1 and signal: null
```

Criterion 6 holds: a removed description, an `http:` address and a malformed
address each fail `npm run build` with a message naming the entry by its own
name, and the restored file builds.
