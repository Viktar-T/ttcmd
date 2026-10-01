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
