# spec.md — 003-type-and-theme

- **Slice:** 003
- **Status:** proposed, awaiting Viktar's approval
- **Date:** 2026-08-28
- **Depends on:** ADR-0005 (typefaces), ADR-0007 (default theme and accent), `docs/design-reference.md`
- **Unblocks:** 004-lesson-typography

---

## Why

Every visual decision in this repo is currently unmade at the point of use. The
site renders with browser defaults: one face, black on white, no theme. Nothing
that follows can be built honestly on top of that.

Two consequences force this slice to come first.

**Colour.** A component built before the tokens exist gets its colours written
into it, and has to be opened again when the tokens arrive. That is the argument
ADR-0007 already makes, and it is the reason 003 precedes 004.

**Polish.** Article III requires every typeface to render **ą ć ę ł ń ó ś ź ż**,
and ADR-0005 identifies the failure mode: the glyphs split across two Unicode
blocks, the default subset carries only one of them, and the build passes
anyway. Every lesson on this site is in Polish. The longer the site runs on
browser defaults, the longer that trap stays untested.

The site already carries real lesson content in Polish. This slice is what turns
it from readable-in-principle into readable.

## What

### 1. Two faces, and the split

The monospace face carries **structure**; the proportional sans carries
**prose**. The faces are settled by ADR-0005 — JetBrains Mono and Inter — and
this slice does not reopen them.

The split is expressed as a **default that applies to plain HTML**, not as
something each future component opts into. A heading is monospace because it is
a heading, not because someone remembered. This matters more than it sounds:
slice 004 renders Markdown, which produces bare elements with no place to attach
a class, and the lessons already written contain headings, blockquotes, tables
and lists that nobody will hand-annotate.

The default may be overridden, and this spec names the only conditions under
which that is legitimate: a passage that is *quoting* structural text, and a
control whose face is dictated by the platform. Any other override is a sign the
default is wrong and should be changed rather than escaped.

Both faces are self-hosted, so no request leaves the visitor's browser to a
third party and no face arrives late enough to shift the layout.

### 2. Colour, entirely as tokens

Every colour on the site is a named token, defined once per theme. The values
are ADR-0007's, unchanged.

The token set is **ADR-0007's eight per theme, plus naming for the roles slice
004 already demands** — the colour of a link, of a blockquote's rule, of a table
border. Those roles are named now so that 004 spends its time on typography
rather than on colour; but they are **bound to values that already exist**. This
slice introduces **no new hue**. The semantic callout colours named as
indicative in ADR-0007 — amber, coral, green — are not defined here: nothing in
the written content uses a callout, and a colour decided ahead of its first use
is a colour decided badly.

The accent keeps its two roles — a surface that carries dark text, and a line
for links, rules and active states. On the dark theme one value serves both; on
the light theme it must not.

**"No colour is hard-coded" is enforced by the build, not by memory.** A colour
literal written anywhere outside the token definitions fails the build, the same
way an invalid lesson does. A criterion that only a reviewer checks stops being
true the day slice 004 lands — which is exactly when hard-coded colours start
appearing. Where a literal is genuinely legitimate, it is exempted explicitly
and the reason recorded, rather than the rule being softened.

### 3. Size and rhythm, as far as this slice owns them

Font sizes and line heights are tokens on a scale, so later slices choose from a
scale instead of inventing numbers. **The prose measure — the reading column's
width — is not this slice's.** It is a layout decision about a lesson page, and
it belongs to 004 along with the rhythm between blocks.

### 4. The theme, and its default

**Dark is what every visitor gets until they choose otherwise.** The operating
system's preference is not consulted.

ADR-0007 as first written said both that dark is the default and that the toggle
honours `prefers-color-scheme` on a first visit. Those disagree for a first-time
visitor on a machine set to light, which is the common case on school hardware.
The contradiction surfaced while speccing this slice and **ADR-0007 has since
been amended** in favour of dark, with the amendment recorded in its own header.
This spec implements the amended decision; it does not carry an exception.

A chosen theme is remembered between visits, and **applied before the first
paint** — no flash of the wrong theme, on any page, on any navigation or reload.
ADR-0007 is explicit that a flash on every navigation is worse than having no
toggle, and that requirement is what makes this a real piece of work rather than
a class swap.

The toggle itself is **deliberately provisional**. Navigation and the header are
out of scope, so the control has no proper home; it gets a plain, fixed
placement, and a later slice moves it into the header. This spec records that so
the next slice inherits a known debt rather than a mystery.

### 5. Somewhere to look at it

Two surfaces prove the slice, and they prove different things.

The **written lessons** prove reach: because the split is a default on plain
HTML, every lesson already in `content/` picks it up without being touched. That
is the real test, and it is the roadmap's own done-condition.

A **reference page** proves coverage: prose and headings in both faces at both
sizes, the Polish pangram from ADR-0005, and every token as a labelled swatch.
Lessons alone will not exercise the muted text, the rule, or the accent surface.

That page is **permanent**. It is where the system gets checked after any later
slice touches it, and deleting it would make this slice's evidence
unreproducible. It is not linked from student-facing navigation. It is otherwise
an ordinary public page — ADR-0006's no-index posture was rejected, and this
slice does not quietly reintroduce it for one route. Whether it appears in a
sitemap is the sitemap slice's question.

### 6. The subset guard

The build fails if the Polish subset is not requested at font load time. This is
ADR-0005's first verification, and it exists because the failure mode is silent:
`ó` renders, `ł` does not, nothing errors, and it is discovered on a projector.

A configuration check cannot prove that a glyph actually drew, so it is paired
with the pangram on the reference page — machine-checked declaration,
eye-checked rendering. A rendering check in a headless browser would prove more,
and is not worth standing up test infrastructure for on this slice.

### 7. Both themes, equally

The light theme ships finished, not sketched. It is the theme nobody has looked
at; it is where ADR-0007's two-value accent either works or does not; and
`#5B4FBF` at 5.86:1 passes the arithmetic while still being able to read badly
as link text on a page of Polish prose. Contrast is computed *and* the result is
looked at.

## Out of scope

Named so that they are refused deliberately, not forgotten:

- **MDX components** — `Zadanie`, `Uwaga`, `Cele`, `Prompt`. No written content uses them.
- **Navigation, the header, the contents panel, breadcrumbs, prev/next.**
- **Code block styling** — background, highlighting, the copy control. Slice 005.
- **Prose measure, block rhythm, blockquote and table treatment.** Slice 004 owns these; 003 only names the colours they will use.
- **Content.** No lesson text changes. The lessons are the test subject, not the deliverable.
- **Sitemap, robots, indexing posture.**
- **The semantic callout colours.**
- **Per-module accents** — deferred by ADR-0007, not refused.
- **The chevron geometry, the circled letter, the doubled frames.** Signature elements, later slices.

## Acceptance criteria

Observable conditions. Each is checked, and the check's output is the evidence.

1. `npm run build` succeeds.
2. `npm run build` **fails** when the Polish subset is removed from the font
   configuration, and the failure names the reason. Demonstrated by making the
   change, showing the failure, and reverting it.
3. `npm run build` **fails** when a colour literal is introduced outside the
   token definitions. Demonstrated the same way.
4. Every lesson currently under `content/moduly/` renders with headings in the
   monospace face and body paragraphs in the sans face, in both themes.
5. The Polish alphabet — **ą ć ę ł ń ó ś ź ż Ą Ć Ę Ł Ń Ó Ś Ź Ż** — renders in
   both faces, at heading size and at body size, in both themes, with no
   fallback glyph and no tofu. The pangram `Zażółć gęślą jaźń — ĄĆĘŁŃÓŚŹŻ
   ążćęłńóśź` is on the reference page for this purpose.
6. The reference page shows every defined token as a labelled swatch, and the
   set changes with the theme.
7. A first visit, with no stored preference, paints dark — on a machine set to
   light as well as on one set to dark.
8. Toggling switches the theme, and the choice survives a reload and a
   navigation to another page.
9. **No flash of the wrong theme.** With a light preference stored, a reload and
   a navigation both paint light on the first frame. Checked with the connection
   throttled, where a flash is visible if it exists.
10. Contrast is computed and recorded for every text-on-background pair in both
    themes: body text ≥ 4.5:1, large headings ≥ 3:1, link colour against page
    background ≥ 4.5:1.
11. Link text in the light theme is judged on a rendered page of real Polish
    prose, not only on its ratio, and the judgement is recorded.
12. Searching the styling sources for colour literals returns only the token
    definitions and any explicitly recorded exemption.
13. Both themes are legible at a phone-width viewport.
14. The fresh-context review reports no gap against these criteria, and nothing
    outside this slice's scope was touched — in particular no lesson content, no
    navigation, and no MDX component.

## Notes for the reviewer

- The roadmap says "the four written lessons". There are now six, across two
  modules. Criterion 4 is written against what is in `content/` at the time of
  the check, not against a count.
- The theme toggle's placement is knowingly provisional (§4). It is a debt handed
  to the navigation slice, not an oversight.
- ADR-0007 was amended on 2026-08-28 to strike its `prefers-color-scheme` clause
  (§4). This spec implements the amended text, not the original.
