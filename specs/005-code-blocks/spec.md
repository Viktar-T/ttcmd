# spec.md — 005-code-blocks

- **Slice:** 005
- **Status:** proposed, awaiting Viktar's approval
- **Date:** 2026-08-29
- **Depends on:** 003 (faces, tokens, themes), 004 (the prose column and the
  vertical rhythm, which gave a code block its place and nothing else),
  ADR-0002 (the content pipeline), ADR-0007 (the accent, and that the code
  surface stays dark in both themes), `docs/design-reference.md` §Code blocks,
  constitution Article VII (the language is per-block metadata)
- **Unblocks:** the `Prompt` component, the exercise component, and every
  lesson that has to show C#

---

## Why

This is a programming course and its code blocks are unstyled text.

Slice 004 said so in as many words: a code block was given its place in the
vertical rhythm and containment, and everything else was deferred here. What is
on the live site today is nine fenced blocks in one lesson, set in the
monospace face at body size, on the page background, with no surface, no
colour, no way to copy them and nothing marking where the code ends and the
prose resumes.

Three things make that worse than merely plain.

**Every one of those blocks exists to be typed or pasted.** They are the
`git config`, `git add`, `git commit`, `git push` a student runs in the first
week. A student on a phone at home, reading the lesson before class, has no way
to get the text out of the page except by selecting it by hand — and selecting
by hand across a wrapped line is how a command arrives in a terminal with a
newline in the middle of it. The copy control is not a convenience here; it is
what the block is for.

**A block is not visibly a block.** With no surface behind it, a two-line shell
command sitting between two paragraphs reads as an oddly-set sentence. The
design reference is unambiguous — near-black background, distinctly darker than
the page — and it is unambiguous because the reference site is also a reading
and typing site, and it hit the same problem.

**C# has not been rendered once.** Article VII presumes C# and .NET for what
students will build, and no lesson has needed a C# block yet. The first one that
does must not be the moment anybody finds out whether it highlights. The
language belongs to the block, never to the site — a lesson comparing C# with
the shell has both on one page, and a design in which the site knows what
language it is about cannot express that.

There is also a sequencing argument, the same shape as 004's. The `Prompt`
component the design reference asks for is a copyable block of text; the
exercise component sits beside code; both attach to a code surface that does not
exist yet. Building them first means building them twice.

## What

### 1. The code surface

A fenced block renders as an object, not as a run of text: a **surface
distinctly darker than the page**, rounded, with room around the code inside it.

The surface is **the same in both themes**. ADR-0007 already settles that code
stays dark on the light theme, and this slice does not re-open it — but it does
follow the consequence through: **every colour used inside a code block is
theme-independent.** A colour that flips with the theme is legible on one of
them and not on the other, because the ground it sits on does not flip. This is
the single easiest way for this slice to be wrong on the light theme while
looking perfect on the dark one, so it is a criterion and not a note.

The code inside is monospace, as it already is, and it must carry Polish. A
comment in a lesson is written in Polish, and a code block is exactly where a
missing diacritic would show up first.

### 2. Highlighting

Fenced code is **syntax-highlighted, and the highlighting is computed when the
site is built.** Nothing about it reaches the browser: a student's phone should
not download a parser in order to read three lines of shell.

Two rules govern the colours.

**Every colour a highlighted token can take is a design token**, in the one file
allowed to hold a colour. Slice 003 made that rule and the build enforces it;
highlighting is the first thing in this repo with an appetite for a dozen hues,
and it is precisely the thing that would otherwise smuggle a stranger's palette
onto the site as markup. The palette is small, warm against the near-black
ground, and part of this site rather than borrowed from an editor.

**Colour is never the only thing carrying meaning.** Highlighting is
supplementary: the code has to be completely readable with colour removed from
the page, which means every colour it can take clears the body-text contrast
floor against the code surface. Nothing is rendered in a hue that is merely
decorative and unreadable.

### 3. The language belongs to the block

Per Article VII, and stated here as behaviour rather than as principle:

- The language is declared **on the fence**, per block. Two languages on one
  page is an ordinary case, not a special one.
- **Any language the highlighter knows may be declared**, and the work of
  supporting it is done when it is first used, not in advance. C# is not a
  configured special case; it is one of them.
- **A language that is not recognised fails the build**, naming the language and
  the file. A misspelt language that silently renders grey is the failure mode
  worth spending a build error on — it looks like a styling bug and it is a typo.
- A fence with **no language** renders on the code surface, unhighlighted, and
  does not fail. Terminal output, a file listing and a directory tree are all
  legitimately languageless, and requiring a label on them would mean labelling
  them with a lie.

### 4. The copy control

A **quiet control at the top-right, inside the block**, per the design
reference. It is present at rest rather than revealed on hover: it is the
most-used control on the site, hover does not exist on the phones half the
class reads this on, and "muted" is what the reference asks for — not "hidden".

- It reads in Polish, and it confirms in Polish after a copy, returning to rest
  afterwards. The confirmation is available to a screen reader, not only to an
  eye.
- It is reachable and operable from the keyboard.
- **What is copied is the block's source and nothing else** — not the filename,
  not the control's own label, not any marker this slice adds, and **not a
  trailing newline**. A copied shell command that ends in a newline runs the
  moment it is pasted, before the student has read it.
- It may cover the end of the first line while at rest. It may not make any
  text permanently unreachable: text under it can be brought out from under it.

### 5. The filename header

A block may declare a filename. When it does, the name shows **inside the
block**, above the code, in the monospace face, quieter than the code.

When it does not, there is no header and no empty bar in its place. Most blocks
in the one lesson with code are single shell commands; a permanent header would
double the height of every one of them.

No lesson declares a filename today. It is in this slice because the first C#
lesson needs it in its first paragraph — a snippet of `Program.cs` that is not
labelled `Program.cs` is a snippet a student cannot place — and because adding
it later means re-opening the block's internal layout.

### 6. Highlighted lines

A block may mark **specific lines**, so a lesson can point at *the* line instead
of writing "the third line" above it.

- The marking spans the line **across the block's whole width, including the
  part that is scrolled out of view**. A tint that stops where the viewport does
  is a tint that lies about which line is marked.
- It is **visible without colour**, like everything else in §2.
- **A line reference outside the block fails the build**, naming the block's file.
  Lines get inserted; a range that used to point at the interesting line and now
  points past the end of the block is exactly the silent rot this repo builds
  checks for.
- The same is true of anything else on the fence that cannot be understood: **an
  info line that does not parse fails the build** rather than being ignored.
  Silently dropping an instruction the author wrote is worse than refusing it.

### 7. Containment, and the phone

A code line must never widen the page. Slice 004 already contains the block
horizontally; this slice keeps that true after adding a surface, padding, a
header and a control, at a 375px viewport, in both themes.

The block scrolls **within its own bounds**. The page does not scroll
horizontally, on any lesson, at any width.

### 8. Where it is checked

**The written lesson is the test.** The nine fenced blocks in the Git lesson
pick the treatment up with no lesson file edited, exactly as in 003 and 004,
and the diff containing no change under `content/` is part of what "done" means.

The nine blocks do not cover the slice, though, and no honest reading pretends
they do: they are all `bash`, none declares a filename, none marks a line, and
none is long enough to scroll. So the **reference page** gains a specimen of
every construct this slice can produce — including **C#**, which is where
Article VII's language gets rendered for the first time without inventing a
lesson to hold it.

## Out of scope

Refused deliberately, not forgotten:

- **Every MDX component.** `Prompt`, `Zadanie`, `Uwaga`, `Cele`, image and
  caption. `Prompt` is the closest — it is a copyable block — and it is a
  different thing with a different purpose, and it is next, not now.
- **Inline code.** Settled by 003 and 004: the monospace face, no box, sized and
  coloured by its context. Nothing here changes it.
- **Navigation, breadcrumbs, the accent band, the contents panel, prev/next,
  back-to-top.** As in 004.
- **The contents panel's treatment of a code block**, including whether a
  filename becomes an anchor. There is no panel yet.
- **Line numbers.** Not the same feature as highlighted lines, and not asked for
  by the design reference.
- **Diff rendering, tabbed blocks, collapsible blocks, live editing, a run
  button, an "open in an editor" link.** None is in the design reference and each
  is a component, not a treatment.
- **Terminal and IDE screenshots**, which the design reference gives a thin
  accent border. That is the image component.
- **Content.** No lesson text changes, and no C# is added to a lesson in order
  to have something to look at.
- **The vertical rhythm.** 004 set it. This slice keeps a code block in the same
  place in it, and the check for that is that the rhythm did not move.
- **The semantic callout colours**, still indicative in ADR-0007. The code
  palette introduced here is a separate set and does not settle them.

## Acceptance criteria

Observable conditions. Each is checked and the check's output is the evidence.

1. `npm run build` succeeds.
2. No colour literal exists outside the token file — including every colour the
   highlighting can produce. The build's own guard is the proof.
3. **Every colour the highlighting can emit is defined.** An emitted colour with
   no definition renders as ordinary body text with no error anywhere, so this
   is checked by the build and not by looking.
4. All nine fenced blocks in the Git lesson render on the code surface,
   highlighted, in both themes, **with no lesson file edited**. `git diff`
   reports no change under `content/`.
5. Every colour inside a code block — the surface, the code, the comment, every
   syntax colour, the filename, the copy control, the line marking — computes to
   **the same value in both themes**. Read off the same rendered block with the
   theme toggled, and printed.
6. Every one of those colours is **≥ 4.5:1 against the code surface**. Computed
   from the token values and recorded.
7. With colour removed from the page, a `bash` block and a C# block are both
   completely readable, and no distinction the highlighting makes is lost that
   the reader needed.
8. A C# block renders with keywords, strings, comments, types and identifiers
   told apart, and a C# string containing Polish diacritics renders them — on
   the reference page, since no lesson contains C#.
9. A block whose declared language is not recognised **fails the build**, with a
   message naming the language and the file it is in. Shown by introducing one
   temporarily and reverting it.
10. A fence with no language renders on the code surface, unhighlighted, and the
    build succeeds.
11. The copy control sits at the top-right inside the block, is quiet at rest,
    is clearly reachable by keyboard, and shows a visible focus indicator.
12. Copying a block yields **exactly its source**: no filename, no control
    label, no line marking, no trailing newline. Compared against the `.mdx`
    source character for character.
13. After a copy the control confirms in Polish, the confirmation is exposed to
    assistive technology, and the control returns to rest.
14. A block declaring a filename shows it inside the block above the code; a
    block not declaring one shows no header and no empty bar. Both on the
    reference page.
15. A block declaring highlighted lines marks exactly those lines, and the
    marking spans the full scrollable width — checked with the block scrolled
    to its right-hand end, not only at rest.
16. A line reference beyond the block's last line **fails the build**, naming
    the file. Shown temporarily and reverted.
17. An info line that cannot be parsed **fails the build**. Shown temporarily
    and reverted.
18. A block containing a line wider than the column scrolls within its own
    bounds at a 375px viewport, while
    `document.documentElement.scrollWidth <= clientWidth` holds on every lesson
    in both themes.
19. Text lying under the copy control at rest can be brought out from under it
    by scrolling the block.
20. A code block's place in slice 004's vertical rhythm is unchanged: exactly
    one gap between a code block and each neighbour, and no gap on the page
    larger than the heading gap. Measured, as 004 measured it.
21. Polish diacritics render inside a code block, in a comment and in a string,
    in both languages. A code block is where a missing subset shows first.
22. **The browser receives no highlighting code.** The only client-side
    JavaScript this slice adds is the copy control. Checked against the built
    client bundle, not asserted.
23. The reference page carries a specimen of each construct in §8: `bash`, C#, a
    fence with no language, a filename header, marked lines, a line long enough
    to scroll, a Polish comment, and a one-line block.
24. The fresh-context review reports no gap against these criteria, and nothing
    outside this slice's scope was touched — in particular no lesson content, no
    MDX component, no navigation, and no change to slice 004's rhythm.

## Decisions taken

Per AGENTS.md §4. One line each, naming what was rejected.

1. **Highlighting is computed once, when the site is built, and none of it
   reaches the browser.** Rejected: highlighting in the browser, which ships a
   parser and a grammar to every phone in the room to colour three lines of
   shell.
2. **Every colour the highlighting can produce is a design token in the one file
   allowed to hold colour.** Rejected: adopting a ready-made editor theme, whose
   palette arrives baked into the markup, cannot be checked by the build, and
   belongs to somebody else's product.
3. **One palette, because the code surface stays dark in both themes.**
   Rejected: a second palette for the light theme — it re-opens a decision
   ADR-0007 already took and doubles what has to be checked, for a surface that
   does not change.
4. **Every token used inside a code block is theme-independent.** Rejected:
   reusing the page's muted-text and rule tokens, which flip with the theme and
   would be all but invisible on a dark surface under the light theme.
5. **The palette is small — around seven distinguishable colours.** Rejected:
   the full range an editor theme distinguishes, which on a lesson page is
   noise, and every extra hue is another value that has to clear the contrast
   floor.
6. **Any language the highlighter knows may be used, and its support is loaded
   only when a block asks for it.** Rejected: an allow-list of languages, which
   is a second place to edit whenever content needs a new one and which would
   block a lesson for no benefit.
7. **An unrecognised language fails the build.** Rejected: falling back to plain
   text, which turns a typo into a styling bug that nobody reports.
8. **A fence with no language renders unhighlighted rather than failing.**
   Rejected: requiring a language on every fence, which forces a label onto
   terminal output and directory trees that have none.
9. **An info line that does not parse fails the build, as does a line reference
   past the end of a block.** Rejected: ignoring what cannot be understood,
   which silently drops something the author wrote.
10. **The copy control is present at rest and quiet.** Rejected: revealing it on
    hover, which hides the site's most-used control from every touch device and
    from anyone who does not think to hover over a code block.
11. **What is copied carries no trailing newline.** Rejected: copying the
    newline, which makes a pasted shell command run before it has been read.
12. **The copy control overlays the block's top-right, and the code carries
    trailing space so nothing sits permanently under it.** Rejected: a header
    bar on every block (it doubles the height of a one-line command, and eight
    of the nine blocks in the Git lesson are one or two lines), and a gutter
    beside the code (it takes width from the code on a phone, permanently).
13. **Marked lines are shown by a change in lightness plus a marker at the
    line's start, spanning the full scrollable width.** Rejected: colour alone
    (lost without colour perception), dimming the unmarked lines (it makes most
    of the block harder to read to emphasise one line of it), and a tint that
    ends where the viewport does.
14. **The line marker scrolls with the code.** Rejected: pinning it to the
    block's left edge, which needs a second scrolling mechanism for a detail.
15. **The filename and the marked lines are declared on the fence itself.**
    Rejected: putting them in lesson frontmatter (they belong to a block, not to
    a lesson) and wrapping code in a component (that is the thing this slice is
    built to avoid needing).
16. **Line numbers are not rendered.** Rejected: a line-number gutter — it is
    noise on a one-line command, it is a second thing to keep out of the
    clipboard, and marked lines already do the pointing.
17. **The reference page carries the specimens, and is where C# is rendered for
    the first time.** Rejected: adding a C# block to a lesson to have something
    to look at, which is a content change this slice refuses.
18. **The build gains a check that every colour the highlighting can emit is
    defined.** Rejected: trusting the list to be complete — an undefined one
    renders as ordinary body text with no error, which is the same class of
    silent failure as slice 003's font subset.

## Notes for the reviewer

- **The light theme is where this slice will be wrong.** Everything here is
  built and looked at on a dark page, where a dark code surface and the page
  agree; on the light theme the code surface is an island, and every token
  inherited from the page palette inverts underneath it. Criterion 5 is written
  as a computed-value comparison rather than as a judgement for that reason.
- **Criterion 12 is the one that matters in class.** A student copies a command
  and it does not run — because a zero-width character, a stray label or a
  newline came with it — and the lesson is what gets blamed. It is compared
  against the source character for character, not eyeballed.
- **C# is checked, not assumed.** The scope note is explicit that C# must work
  when it appears, and today it appears nowhere. If the specimen on the
  reference page is dropped, nothing in this slice touches Article VII's
  language at all.
- Criteria 7, 11 and 14 are judgements made on a rendered page. As in 003 and
  004, the judgement is recorded rather than skipped.
- The palette itself is a taste decision recorded rather than escalated
  (AGENTS.md §4): it is reversible in one commit, and it lives in one block of
  one file. If Viktar disagrees with the hues, the veto is an edit to that
  block and nothing else moves.
