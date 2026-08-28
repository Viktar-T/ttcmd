# ADR-0003 — Deploy with a temporary no-index posture

- **Date:** 2026-08-28
- **Status:** rejected (2026-08-28, Viktar)
- **Decision by:** Viktar

## Context

Slice 002 (`specs/002-deploy/`) puts the site at `ttcmd.vercel.app`. At the
moment it goes public, everything on it is placeholder: two modules named
"Moduł przykładowy" and two lessons whose text says, in Polish, that they
contain no real course content.

That site is going to be indexed under Viktar's name and, once the school is
named, under the school's. Placeholder pages are cheap to publish and expensive
to un-publish: a URL that has entered a search index is not ours to clear, and
removal requests take weeks. The window in which this decision is free lasts
until the first crawl, which is why it belongs in the deploy slice rather than
in a tidier one afterwards.

Against that, the constitution already speaks on the subject. **Article IV**
opens with, as a statement of fact:

> The GitHub repository is public. The Vercel site is public and indexed.

A spec may not contradict the constitution (constitution, preamble), so
`spec.md` criteria 6 and 12 — every response carries a no-index instruction,
and its removal is a recorded gate — cannot be executed while Article IV reads
as a present-tense property of the site. An agent may not amend that file
(Article X). Hence this ADR.

The conflict is narrower than it looks. Article IV's subject is **privacy and
leakage**: what must never enter a public repo or a public site. "Indexed" is
there to make the consequence vivid — anyone can find this — not to mandate
crawler behaviour on day one. Nothing in this ADR makes the site less public.
The URL is public, unauthenticated, and shareable from the first deployment;
only the invitation to search engines is withheld, and only while the content
is fake.

## Options considered

| Option | Why not |
| --- | --- |
| Deploy indexed now, clean up when real content lands | The failure mode the decision exists to prevent. By the time it is noticed, the placeholders are in an index that is not ours to clear. It trades a free decision today for a slow, partial remedy later. |
| `robots.txt` with `Disallow: /` | Backwards, and the most common way this is got wrong. `Disallow` forbids the *fetch*, so a crawler never reads the `noindex` it was forbidden from fetching — and a URL discovered from an external link can still be listed, without a snippet, precisely because the page could not be read. Allow the fetch, deny the index. |
| Vercel password protection / deployment protection | Contradicts Article IV in the way that actually matters: the site stops being public. It also blocks the students it exists for, and defers the indexing decision instead of taking it. Out of scope by `spec.md` as well. |
| `<meta name="robots">` alone | Invisible to anything that reads headers but not HTML, and to non-HTML responses. Correct, insufficient on its own. |
| `X-Robots-Tag` header alone | Sufficient in practice, but leaves nothing in the page source — so the posture is invisible to anyone reading the HTML, including a future maintainer wondering why the site is not in Google. |
| **Header + meta + a permissive `robots.txt`, with a recorded expiry** | **Accepted.** The header is what a crawler receives and what `curl -I` can prove; the meta tag carries the same instruction to anything that parses HTML; `robots.txt` allows the fetch so the other two are actually read. The expiry is a task in a file, not an intention. |

## Decision

1. Deploy with **no index, no follow**, delivered in three layers: an
   `X-Robots-Tag` response header on every path, `metadata.robots` in the root
   layout, and a `robots.txt` that **allows** crawling.
2. This posture is **temporary and dated**. It is lifted by the first slice
   that publishes real course content, as a required task in that slice's
   `tasks.md`; until that slice exists, the gate lives in `docs/roadmap.md`
   under Phase 1. An intention that is not written down is not a gate.
3. **Proposed amendment to Article IV** — one line, changing an assertion about
   the present into one about the end state:

   > The GitHub repository is public. The Vercel site is public, and will be
   > indexed once it carries real content (ADR-0003).

   Everything else in Article IV is untouched. The list of what never enters
   this repo or this site does not change, and neither does the fact that the
   URL is public from the first deployment.

If Viktar rejects this, criteria 6 and 12 come out of `spec.md`, and slice 002
is re-specced as a plain deploy. It is not executed either way by default.

## Outcome — rejected

Viktar, 2026-08-28: **the site may be indexed from the first deployment. It is
not important.**

So none of the three layers is built, `constitution.md` is not amended —
Article IV keeps "the Vercel site is public and indexed", which is now simply
true — and `spec.md` criteria 6 and 12 are struck. Slice 002 is a plain deploy.

The ADR stays in the tree rather than being deleted. It is the record of a
decision that was actually taken, and of the one thing in it that outlives the
rejection: **`Disallow: /` is not how you keep a page out of an index.** If the
question is ever reopened — the likely trigger is the school being named on the
site, not the placeholder content — the options table is already written.

## Consequences

- The site is publicly reachable and shareable with students immediately; it
  simply will not appear in a search for a while. For a URL that is handed out
  in class, this costs nothing.
- The removal becomes a real piece of work someone has to check off, and its
  absence is visible in `docs/roadmap.md` rather than only in memory.
- Article IV becomes slightly weaker as a blunt warning. The mitigation is that
  the leakage rules it exists for are unchanged, and that git history is still
  permanent whatever robots do.
- If the amendment is accepted, this ADR is the record of why; Article IV
  itself carries only the one-line result.
