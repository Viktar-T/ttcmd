# sources.md

What was read while designing this repo's method, and what was actually taken
from it. Kept so a decision can be traced back to its reason, and so the same
ground is not re-read later.

Not a reading list — only sources that changed something in
`constitution.md`, `AGENTS.md` or `docs/adr/`.

---

## Local — EvoCoders study notes

`D:\Life-OS\124-Edu-TTC\learn-ai-codding\` (read-only quarry; nothing is copied
into this repo from it)

| Note | What it changed here |
| --- | --- |
| `02-programming-with-ai/12-spec-driven-development.md` | The whole loop. Survey of Spec Kit / BMAD / OpenSpec / Kiro / Spec Workflow MCP → **ADR-0001**. The line "a contract with verifiable criteria" and "a report against the acceptance criteria" → acceptance criteria are mandatory in `spec.md` (Article IX). |
| `02-programming-with-ai/10-advanced-context.md` | Context Pack, Memory Bank and `HANDOFF.md` patterns. A slice folder already *is* a Context Pack, so no `/memory-bank/` was added; the handoff idea became the end-of-session rule in `AGENTS.md` §5. Also: "context is not elastic". |
| `02-programming-with-ai/09-indexing-and-memory.md` | Claude Code searches by grep and does **not** use RAG → precise paths and small, discoverable files matter more than any index. Also the `AGENTS.md` standard and its origin (OpenAI → Agentic AI Foundation). |
| `02-programming-with-ai/11-skills-and-subagents.md` | Rules are *always* in context, skills load on demand → `AGENTS.md` §10 ("Growing this file"): repeatable procedures go to `.claude/skills/`, not here. Subagent context isolation → §5 and the fresh-context review in §3. |
| `02-programming-with-ai/13-ai-code-review.md` | Fresh-context review of the diff before closing work. The CI/Actions pipeline it describes is **out of scope for v1** — no backend, no CI yet (Article VIII). |
| `02-programming-with-ai/06-agentic-code-generation.md` | The agent loop; pointer to Claude Code best practices and AI Blindspots below. |

## External

| Source | What it changed here |
| --- | --- |
| [GitHub Spec Kit](https://github.com/github/spec-kit) | Artifact names and phase order: `constitution → spec → plan → tasks → implement`. Its spec/plan boundary — spec is "the *what* and *why*, not the tech stack", plan is "tech stack and architecture choices" — is the rule enforced in `AGENTS.md` §2. Its `converge` phase has no automated equivalent here; see ADR-0001. |
| [agents.md](https://agents.md/) | `AGENTS.md` at the repo root is the tool-agnostic standard ("a README for agents"); format is free Markdown; nearest file wins in subdirectories. Kept as the single contract, with `CLAUDE.md` doing nothing but `@AGENTS.md` so Claude Code loads it automatically. |
| [Claude Code best practices](https://code.claude.com/docs/en/best-practices) | The largest influence on `AGENTS.md`. "Give Claude a check it can run" and the trust-then-verify gap → §3 Verification and the per-task definition of done. Explore→plan→code→commit → the mandatory pause after `spec.md`. Context degradation, `/clear` between unrelated tasks, subagents for investigation → §5. "Bloated CLAUDE.md files cause Claude to ignore your actual instructions" → §10. Adversarial review in a fresh subagent context, told to report only gaps affecting correctness → §3. |
| [AI Blindspots](https://ezyang.github.io/ai-blindspots/) | "Respect the Spec", "Requirements, not Solutions", "Stop Digging", "Know Your Limits" → §7 and §11. "Walking Skeleton" — build a minimal end-to-end system first → the shape of slice 001. |
| [fullstackopen.com/en](https://fullstackopen.com/en/) | The visual and structural model for the whole site → **`docs/design-reference.md`**. Numbered parts with lettered chapters; exercises numbered continuously across a part and placed inline where the concept was explained; breadcrumb + prev/next instead of a persistent sidebar; one accent colour on a light neutral; a site that is almost entirely typography. Its announcements, partners, authors/licence block, challenge and language selector are deliberately dropped. |
| [Google Fonts metadata](https://github.com/google/fonts) — `ofl/jetbrainsmono/METADATA.pb`, `ofl/inter/METADATA.pb` | Evidence for **ADR-0005**: both families declare a `latin-ext` subset, which is the block holding ą ć ę ł ń ś ź ż. Checked at source rather than assumed, because the Google Fonts CSS API returned a legacy response with no `unicode-range` data. |

## Deliberately not adopted

- **Spec Workflow MCP**, **Kiro / Qoder native SDD** — ADR-0001.
- **BMAD** — role-agent team, wrong scale for one developer and a content site.
- **OpenSpec** — its archive-and-merge model conflicts with append-only slices.
- **Memory Bank folder** (`GOALS.md` / `STATUS.md` / `PROGRESS.md` / …) — the slice folders already carry that state; a second copy would drift from the first.
- **AI code review in CI** — no CI in v1. Revisit when there is something to gate.
