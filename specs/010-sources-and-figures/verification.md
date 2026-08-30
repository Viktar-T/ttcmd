# verification.md — 010-sources-and-figures

Evidence for the acceptance criteria in `spec.md`. Every line below is a command
that ran and what it returned, on 2026-08-30.

Criteria 5, 7, 10, 13, 14 and 16 are refusals: they are proved by **staging the
mistake in a real lesson, reading the message, and putting the file back**. The
staging copies live outside the repository, in the session's scratchpad, and
every restore is from a byte-for-byte copy of `content/` taken before anything
was staged.

> **Not `git checkout content/`, ever.** As this slice opened, seven files under
> `content/` carried Viktar's uncommitted edits and `content/interesting-to-read/`
> was untracked. Either command would have deleted work that is not this
> slice's, and the loss would have looked exactly like a successful revert.

---

## 1 · The build, the routes, the dependencies

```
npm run build
```

Passes. The emitted route list is **identical** to the one taken before the
slice opened:

```
diff routes-before.txt routes-after.txt
  IDENTICAL to the pre-slice baseline
```

Check E's fourteen contrast pairs, both themes, are identical before and after:

```
diff e-before.txt e-after.txt
  IDENTICAL — 14 pairs, both themes
```

No dependency was added:

```
git diff 2267616^..HEAD --stat -- package.json package-lock.json
  (empty)
```

**Criterion 1 met.**

## 20 · No client-side JavaScript

```
grep -rl '"use client"' components/ lib/ app/
  components/back-to-top.tsx
  components/copy-button.tsx
  components/scroll-spy.tsx
  app/theme-toggle.tsx
```

Four files, all of them pre-existing (slices 003, 005, 007). None of the seven
components this slice adds is among them, and none imports one. Everything the
slice does — classification, validation, resolution, deep-linking, date
formatting — happens during `npm run build`. **Criterion 20 met.**

## 8 · An unwrapped diagram renders exactly as it did

The whole prerendered tree was copied before the slice's code landed and
compared against the tree the slice produces. First, the five diagrams:

```
pages compared: 14

co-model-naprawde-potrafi.html       diagrams before=1 after=1 identical=True
na-zywo-agent-buduje-aplikacje.html  diagrams before=1 after=1 identical=True
nowy-warsztat-programisty.html       diagrams before=1 after=1 identical=True
od-podpowiedzi-do-agenta.html        diagrams before=1 after=1 identical=True
vibe-coding-kontra-inzynieria.html   diagrams before=1 after=1 identical=True
styleguide.html                      diagrams before=0 after=2 identical=False
```

The only page whose drawings changed is the reference page, which gained the two
specimens.

Then the whole document, with the RSC flight payload and the hashed asset names
removed — that is, the HTML a browser paints:

```
every page the browser paints is identical once the link treatment is removed: True
```

Thirteen pages, byte for byte. Nothing but anchors changed anywhere in the
corpus. **Criterion 8, first half, met.**

Second half, staged: one existing diagram wrapped in `<Rysunek>` in
`co-model-naprawde-potrafi.mdx`, then compared with the same drawing on the
pre-slice page:

```
wrapped drawing byte-identical to the baseline: True (1766 chars)
markup right after the wrapper opens:   data-figure=""><svg viewBox="0 0 660 320" role="img" …
markup right after the drawing closes:  </svg><figcaption class="…__caption">Zysk z narzędzi AI …
```

The drawing's own markup is untouched; only the `figure`/`figcaption` around it
is new. Reverted. **Criterion 8 met.**

## 12 · Every external link in the corpus is marked

From the built lesson page `vibe-coding-kontra-inzynieria.html`:

```
<p>— Andrej Karpathy, <a href="https://x.com/karpathy/status/1886192184808149383"
   target="_blank" rel="noopener noreferrer" data-external="">2 lutego 2025<span
   class="…__mark" aria-hidden="true"> ↗</span><span class="…__announcement">
   (link zewnętrzny)</span></a></p>
```

- visible: the arrow, after a no-break space;
- available to a reader not looking at the screen: the clipped phrase, which
  extends the link's accessible name rather than replacing it;
- `target="_blank"` with `rel="noopener noreferrer"`.

Internal links in the same prose carry none of it:

```
<a href="/moduly/01-jak-powstaje-oprogramowanie/na-zywo-agent-buduje-aplikacje">Na żywo: agent buduje aplikację</a>
<a href="/moduly/01-jak-powstaje-oprogramowanie/nowy-warsztat-programisty">Nowy warsztat programisty</a>
```

Across the corpus: **85 external anchors marked**, on seven lesson pages.
**Criterion 12 met.**

## 13, 16 · An internal link to nothing fails the build, naming file and line

The line offset was proved end to end first, because a body-relative line number
is the kind of wrong that looks right. A broken link was written on **file line
289** of `vibe-coding-kontra-inzynieria.mdx`:

```
Error: content/moduly/01-jak-powstaje-oprogramowanie/vibe-coding-kontra-inzynieria.mdx:289:
the link /moduly/01-jak-powstaje-oprogramowanie/nie-ma-takiej-lekcji —
/moduly/01-jak-powstaje-oprogramowanie is a module, but it holds no lesson with that slug.
```

289 reported, 289 in the editor. Reverted.

Then four unresolvable targets at once, one of them written as an element's
attribute rather than as Markdown:

```
co-model-naprawde-potrafi.mdx:310: the link /moduly/99-nie-ma/czegos — there is no such page.
    Links into the course are resolved against content/moduly/ when the site is built.
co-model-naprawde-potrafi.mdx:313: the link /moduly/01-jak-powstaje-oprogramowanie/nie-ma-takiej-lekcji
    — /moduly/01-jak-powstaje-oprogramowanie is a module, but it holds no lesson with that slug.
co-model-naprawde-potrafi.mdx:315: the link /kontakt — there is no such page. …
co-model-naprawde-potrafi.mdx:321: the link /moduly/01-jak-powstaje-oprogramowanie/tez-nie-ma
    — /moduly/01-jak-powstaje-oprogramowanie is a module, but it holds no lesson with that slug.
```

Line 321 is a `<Zrodlo url="…">`, which is criterion 15's other half: an
unresolvable target refused identically whether it was written as a link or as
an attribute. Reverted.

Every internal link the corpus writes today resolves — the build passes, and
that is what passing means now. **Criteria 13 and 16 met.**

Links that are neither internal nor `http(s)`, staged in a **module
introduction** — which also demonstrates that the treatment covers a module's
own page:

```
01-jak-powstaje-oprogramowanie/index.mdx:41: the link mailto:ktos@example.com is refused: …
01-jak-powstaje-oprogramowanie/index.mdx:43: the link ./inna-lekcja is refused: …
01-jak-powstaje-oprogramowanie/index.mdx:45: the link //example.com/x is refused:
    a protocol-relative link is a link to another site with the protocol left off.
    Write https:// in front of it.
```

Reverted.

## 14 · A link to a lesson that exists but is not published

`publish: false` staged on `nowy-warsztat-programisty.mdx` — one flag, four
lessons that link to it:

```
co-model-naprawde-potrafi.mdx:223:      … that lesson exists but is not published (publish: false),
jak-nie-wypasc-z-obiegu.mdx:31:           so the site answers it as not found. Publish it, or link
od-podpowiedzi-do-agenta.mdx:119:         somewhere else — a link to a not-found page on a public
vibe-coding-kontra-inzynieria.mdx:148:    site is worse than a build that stops.
```

Four files, four lines, one message that says which of the two failures it is.
It also shows the check reads the whole corpus rather than one file at a time.
Reverted. **Criterion 14 met.**

## 5 · A quotation with no date, no source, or no way of reaching it

Three staged at once in `vibe-coding-kontra-inzynieria.mdx`, on lines 290, 296
and 302 — **all three reported in one run**, which is what collecting refusals
rather than throwing them buys:

```
…/vibe-coding-kontra-inzynieria.mdx:290: <Cytat>: date="…" is required and is not there.
    (A value written as date={…} is removed before this check and looks exactly like one
    that was never written — write it as a quoted string.)
…/vibe-coding-kontra-inzynieria.mdx:296: <Cytat>: source="…" is required and is not there. …
…/vibe-coding-kontra-inzynieria.mdx:302: <Cytat>: a quotation says where it came from. Give it
    url="…", or — for a source that exists only on paper — print="…" naming the edition and the
    page. Leaving both out is the omission this element exists to prevent.
```

Reverted. The print case renders rather than failing — see the reference page,
where the third quotation carries `print` and no `url` and shows the printed
locator where the link would be. **Criterion 5 met.**

## 7, 10 · The figure, the entries, the kinds

Six refusals staged at once in `jak-nie-wypasc-z-obiegu.mdx`, six messages in
one run:

```
…:222: <Rysunek>: caption="…" is required and is not there. …                      (criterion 7)
…:228: <Zrodlo>: it belongs inside <Zrodla> and this one is on its own. An entry
       outside its list has no list to be an entry of.
…:230: <Zrodla>: it holds <Zrodlo> entries and nothing else, and this one holds <p>.
       Prose about the list goes above it, in the lesson.
…:238: <Zrodlo>: date="…" is required and is not there. …
…:240: <Zrodlo>: url="…" is required and is not there. …
…:246: <Lektura>: kind="podcast" is not one of the four: artykul, wideo, dokumentacja,
       kurs. Four is the whole list, so that a term's worth of lessons does not
       accumulate six spellings of one word.
```

Four more, staged in `git-i-github.mdx`:

```
…:198: <Cytat>: this build does not know how to open vimeo.com at a given moment. Either drop
       the moment, or add the host to DEEP_LINK_HOSTS in lib/links.ts — one line, and only if
       it takes ?t= in seconds.
…:204: <Zrodla>: checked="2026-08" names a day the list was checked, so it is written in full:
       yyyy-mm-dd.
…:212: <Zrodlo>: its note is one line, and this one is a block. Write it on the same line as
       the opening tag, with no blank line inside the element.
…:220: <Cytat>: this is a block and it has been written inside a paragraph. Leave a blank line
       before it and after its opening tag.
```

All reverted. **Criteria 7 and 10 met.**

## 2, 3, 4, 6, 9, 11, 17 · What the elements render

Read off `/styleguide`, where every element and every variant is compiled through
the pipeline a lesson uses.

**A quotation, with its source, in one block** (criterion 3):

```
<figure class="…__quote" data-quote=""><blockquote class="…__words"><p>Jest nowy rodzaj
kodowania…</p></blockquote><figcaption class="…__attribution"><span class="…__who">—
Andrej Karpathy, </span><a href="https://x.com/karpathy/status/1886192184808149383" …>X …</a>,
<time dateTime="2025-02-02">2 lutego 2025</time></figcaption></figure>
```

**A moment inside a recording, deep-linked** (criterion 4). `51:05` → 3065 s:

```
<a href="https://www.youtube.com/watch?v=NYFGCESmikA&amp;t=3065s" …>Lex Fridman Podcast,
odcinek 501, od 51:05 ↗</a>, <time dateTime="2026-08">sierpień 2026</time>
<span class="…__aside"> · Pełny zapis: <a href="https://lexfridman.com/dhh-2-transcript/" …>
lexfridman.com/dhh-2-transcript ↗</a></span>
```

**A figure whose caption is HTML outside the drawing** (criterion 6):

```
<figcaption class="…__caption">Ten sam zestaw narzędzi daje różny zysk w zależności od tego,
ile lat ma projekt.<span class="…__source">Dane: <a href="https://ingoeichhorst.medium.com/…" …>
analiza Stanford (Denisov-Blanch, 2025) ↗</a></span></figcaption>
```

and the second figure, with a caption and nothing else:

```
<figcaption class="…__caption">Pętla agenta: to samo pytanie wraca, dopóki wynik nie jest dobry.</figcaption>
```

**The evidence list** (criterion 9), with the checked date in the form
`docs/content-style.md` fixes verbatim, the three date precisions in list form,
and a note carrying a second link:

```
<p class="…__checked">Stan na <strong><time dateTime="2026-08-29">2026-08-29</time></strong>.</p>
…<span class="…__meta">Anthropic · <time dateTime="2024-11-25">25.11.2024</time></span>
…<span class="…__meta">Lex Fridman Podcast, odcinek 501 · <time dateTime="2026-08">08.2026</time></span>
   <span class="…__note">o „linii podziału” i harnessie od 7:55; pełny zapis:
   <a href="https://lexfridman.com/dhh-2-transcript/" …>lexfridman.com/dhh-2-transcript ↗</a></span>
…<span class="…__meta">METR · <time dateTime="2025-07-10">10.07.2025</time></span>
```

**Further reading, visibly a different list** (criterion 11) — every row leads
with its kind, in Polish, and carries no date:

```
<li class="…__entry"><span class="…__kind">artykuł</span><a href="https://ezyang.github.io/ai-blindspots/" …>
AI Blindspots ↗</a><span class="…__note">krótkie, praktyczne obserwacje o pracy z modelami</span></li>
… wideo … dokumentacja … kurs …
```

All four kinds render. **Criterion 17 met** — the page carries a quotation of
one paragraph and of several, with a timestamp and without, with a transcript
and without, with an organisation as author and with a print source; a figure
with a data source and without; an evidence list including a note with a second
link; a further-reading list of all four kinds; and a paragraph with one
external and one internal link.

**Criterion 2**: the same elements were staged in a real lesson *and* in
`01-jak-powstaje-oprogramowanie/index.mdx`, a module introduction. Both built
and rendered with no import written anywhere. Reverted.

## 15 · Links inside the elements get the treatment of links in prose

Measured in the browser, on a lesson page with the blocks staged:

```
proseAnchors: 19, externalAnchors: 15
sourcesAnchors: [
  { href: "https://metr.org/blog/2025-07-10-…",  target: "_blank", rel: "noopener noreferrer", ext: true },
  { href: "https://metr.org/blog/2026-02-24-…",  target: "_blank", rel: "noopener noreferrer", ext: true },
  { href: "/moduly/01-…/vibe-coding-kontra-inzynieria", target: "", rel: "", ext: false }
]
```

The first is an entry's own `url` attribute, the second is a link written inside
that entry's note, the third is an internal target — and all three are treated
exactly as the same links would be in a paragraph. Together with the attribute
refusal at line 321 above, **criterion 15 is met**.

## 18 · The boundary lines, in both themes

Computed styles read off the rendered page, in both themes, in one pass:

```
                        dark                     light
bg                      rgb( 42,  41,  38)       rgb(247, 246, 242)
[data-quote] top/bottom rgb(131, 128, 122)       rgb(131, 128, 122)
[data-quote] left       0px                      0px
[data-sources] top      rgb(131, 128, 122)       rgb(131, 128, 122)
[data-further-…] top    rgb(131, 128, 122)       rgb(131, 128, 122)
[data-figure] caption   rgb(131, 128, 122)       rgb(131, 128, 122)
entry separator         rgb( 69,  67,  62)       rgb(216, 213, 205)
plain blockquote rule   2px rgb(168, 164, 156)   2px rgb( 94,  90,  83)
```

`rgb(131, 128, 122)` is `#83807a`, which is `--rule-strong` — the same value in
both themes, and the pair Check E recomputes on every build at 3.69:1 (dark) and
3.64:1 (light) against a 3:1 floor. Every line the reader relies on to see where
a quotation, a figure or a list *ends* is that token. The separators between rows
inside a bounded block are `--rule`, which is ADR-0012's stated exemption.

Check B passes with the four new stylesheets in its scan, so no colour literal
entered outside `app/tokens.css`. **Criterion 18 met.**

> **Check B caught something real on the way.** The first version of the
> reference page wrote `source="Lex Fridman Podcast #501"`, and `#501` is a
> valid three-digit hex colour:
>
> ```
> [Check B] app/styleguide/page.tsx:196 contains the colour literal "#501" —
>   "source=\"Lex Fridman Podcast #501\"".
> ```
>
> This is the false positive that check's own header anticipates. The specimen
> says *odcinek 501* instead: the guard was not weakened, and no
> `design-token-exempt:` marker was planted inside text a student reads. Note
> that Check B scans `app`, `lib` and `components` only — a lesson under
> `content/` writing `#501` is unaffected.

## 19 · 375 px

On `/styleguide`, with every specimen on the page:

```
innerW 375 · documentElement.scrollWidth 375 · clientWidth 375 · horizontalScrollbar false
[data-quote]           ×3  left 16  right 359  width 343  overflowing children: none
[data-figure]          ×2  left 16  right 359  width 343  overflowing children: none
[data-sources]         ×1  left 16  right 359  width 343  overflowing children: none
[data-further-reading] ×1  left 16  right 359  width 343  overflowing children: none
figure parts: figure 343 · svg 343 · caption 343
```

On a lesson page with the four blocks staged:

```
horizontalScrollbar false · scrollWidth 375 · clientWidth 375
widths: [343, 343, 343, 343]
```

At 1280 px the split the figure element exists for is visible:

```
prose 736 · figure 736 · svg-in-figure 736 · caption 624 (max-width 624px = --measure)
```

Drawing at the drawing's scale, caption at the reading scale.

The only elements that overflow their container anywhere on the page are the
code block's own lines, which scroll inside the block — slice 005's design,
unchanged. **Criterion 19 met.**

## The quotation is not a blockquote

Read off the same page, which carries both:

```
[data-quote]                     border-top 1px / border-bottom 1px / border-left 0px
[data-quote] > blockquote        border-left 0px, padding-left 0px   (the inherited rule, removed)
.prose blockquote (elsewhere)    border-left 2px rgb(168, 164, 156), padding-left 20px
```

One is bounded above and below with no left rule; the other is a left rule with
an indent and no bounding. Whether that reads as *quotation* rather than
*callout* in running Polish is the judgement left open below.

## 21 · The content directory is untouched

```
sha256sum -c content.sha256
  (no line failed)
find content -type f | wc -l
  10        (baseline: 10)
```

Every file under `content/` is byte-for-byte what it was when the slice opened,
including the seven that carry Viktar's uncommitted edits and the untracked
`content/interesting-to-read/`. **Criterion 21 met.**

---

## 22 · What the closing review found, and what was done about it

The fresh-context review of the diff against `spec.md` (AGENTS.md §3) reported
**no gap in scope** — no surviving content edit, no change to the contents
panel, no new dependency, exactly six registered elements, and one definition of
"external" (`/^https?:\/\//i` appears once in the repository). It measured
85 of 85 external anchors marked and 128 of 128 internal anchors unmarked across
the corpus, and re-derived the frontmatter offset independently: `rehypeLinks`
over the body of `co-model-naprawde-potrafi.mdx` plus the offset gives lines
`[7, 223, 260]`, and a grep of the file for `](/moduly/` gives `[7, 223, 260]`.

It found three defects. Two affect an acceptance criterion and were fixed; the
third is recorded and left.

**Fixed — a kind outside the four could reach the page as an empty chip.**
`kind in READING_KINDS` walks the prototype chain, so `kind="toString"`,
`"valueOf"`, `"constructor"` and `"hasOwnProperty"` all passed the build, and
the component's lookup then returned a *function* — truthy, so its backstop
passed too, and the row rendered with a blank kind. A literal miss against
criterion 10 and spec §8. Both places now use `Object.hasOwn`:

```
…/jak-nie-wypasc-z-obiegu.mdx:224: <Lektura>: kind="toString" is not one of the four:
    artykul, wideo, dokumentacja, kurs. …
```

**Fixed — a transcript pointing into the course crashed the render with no
location.** `transcript` accepted an internal link, and `Quote` then called
`readableUrl`, which is `new URL(href)` with no base and throws a bare
`Invalid URL` — a build failure with no file and no line, which is the one shape
criterion 16 exists to remove. `transcript` is now declared as an attribute that
must leave the site, refused where the file and the line are known:

```
…/jak-nie-wypasc-z-obiegu.mdx:228: <Cytat>: transcript="/moduly/00-start/git-i-github" is a
    page of this course, and this attribute takes a link to another site — its text is
    derived from the address, which says nothing about a lesson. Link to the lesson from
    the prose instead.
```

**Fixed — a scheme with no address classified as external.** `https://` matched
the pattern and would have rendered as a marked anchor to nothing. `classifyLink`
now parses the URL rather than only matching it:

```
…/jak-nie-wypasc-z-obiegu.mdx:234: the link https:// is refused: it has a scheme but no
    address behind it.
```

All three staged in one run, all three reverted. After the fixes: build green,
route list identical to the pre-slice baseline, Check E identical, 85 external
anchors, `content/` byte-for-byte unchanged.

**Recorded and not fixed:** an internal link written with a trailing slash
(`/moduly/00-start/`) is validated against the normalised target and rendered
with the slash, so the reader reaches the page through Next's 308 redirect
rather than directly. The link works and nothing is published wrongly; the
normalisation exists so the *check* has one spelling of every target, and
rewriting what an author typed is a decision for whoever wants it.

**Criterion 22 met.**

## Not closable by an agent

Both are the spec's *Needs a human eye*, and no box is checked for either:

- **Whether a `Cytat` reads as a quotation rather than as a callout**, and
  whether it is distinguishable at a glance from the blockquotes the lessons
  keep. The measurements above pin the difference; the judgement is made by
  looking at a lesson page, in both themes. Look at
  `co-model-naprawde-potrafi` — its `Źródła` list and a `Cytat` sit within a
  screen of each other.
- **Whether the external-link mark is legible without being noisy** at the
  density the corpus actually has: `jak-nie-wypasc-z-obiegu` carries twenty
  marked links, and a screen reader hears *(link zewnętrzny)* once per link.

## Two things found on the way, neither this slice's to fix

1. **`style={{ width: "100%", height: "auto" }}` on every lesson diagram is dead
   code, and was before this slice.** `next-mdx-remote` removes
   expression-valued attributes in the remark phase, so the attribute never
   reaches the page — verified against the *pre-slice* baseline HTML, where the
   drawings' open tags are already `<svg viewBox="…" role="img" aria-label="…">`
   and nothing else. The diagrams fill their column because an `<svg>` with a
   `viewBox` and no width has no intrinsic width, not because of that line. It
   is content-lane work, and it changes nothing on the page.

2. **React logs `Invalid DOM property stroke-width / font-size / font-weight /
   stroke-dasharray` in development** for every lesson diagram, and did so
   before this slice — the attributes are written in HTML case, which React dev
   builds warn about and production ships correctly. The reference page's two
   specimen drawings follow the corpus's convention and therefore log the same
   four warnings.

## One thing that changed underfoot

`npm run check:content` reports differently before and after this slice — new
columns (`names/100`, `once`) and new smells (*opening starts from the course*,
*block quote without an attribution line*, *percentage with no link anywhere in
its section*). **None of that is this slice.** `scripts/check-content-style.mjs`
and `docs/content-style.md` are untracked files that Viktar edited while this
slice was running; `content/` is byte-for-byte unchanged, as the hashes above
show, and this slice's diff touches neither file:

```
git diff --stat 2267616^..HEAD -- scripts/ docs/
  (empty)
```

Worth noticing in passing: one of the new smells is *block quote without an
attribution line*, reported eleven times across the corpus. That is the same
gap `<Cytat>` closes.
