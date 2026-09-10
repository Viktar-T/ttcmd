# Brief — 7c · Przegląd kodu: model czyta twój diff

| | |
| --- | --- |
| Lesson | `content/moduly/07-testy-i-jakosc/ai-code-review.mdx` · `order: 3` · 3 h |
| Written | 2026-09-10, by write-lesson · approved: (blank) |
| Mode | semi-supervised |
| Research | `research-07-testy-jakosc-przeglad.md` §2 (whole) |
| Drafted | 2026-09-10 |

## Reader position

As 7b, plus: has a test project, at least three green tests, and a history that
shows one of them red first. Has compared their own test with an agent's and
found the agent's one six years out of date. Has read diffs for eleven weeks and
asked them the four questions of 6h. **Has never had anyone else read their
code.** Slug and term note: *przegląd kodu* already exists in the corpus — 6h
ends with „bez «bo» to opinia; z «bo» to przegląd kodu”.

## Carrying question

> Test sprawdza to, co ktoś pomyślał, żeby sprawdzić. Kto przeczyta resztę — i
> ile jest wart czytelnik, który nigdy się nie nudzi, ale czasem zmyśla?

## Anchor

**The diff the student produced in 7b** — the commit that repaired the round
trip — read three times: by the student with the four questions of 6h, by a
model, and then by the student again with the model's comments in hand. The same
twenty lines, three readings, three different lists.

## Shape

**Narrative with a hands-on middle.** The tools are a means; the lesson's
subject is what a second reader is worth and how to tell a finding from a
fabrication. The evidence section is the heart, and it is built exactly like
1c's: two measurements that disagree, each with its limitation, and the reader
asked which they would trust.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | The test caught the round trip because 7a found it first. What about the bug nobody has found yet? | The 7b diff, still open on screen |
| 1 | Przeczytaj swój diff jeszcze raz, cztery pytaniami | Do it by hand first, for two minutes, and write down what you found. This is the baseline the rest of the lesson is measured against | 6h's four questions on the student's own repair |
| 2 | Ten sam diff, drugi czytelnik | The procedure, two paths: Copilot code review requested on a pull request, and `/code-review` on a local diff in Claude Code. What each needs and what a student on a public repo actually gets for free | The same diff, a list of comments |
| 3 | Co znalazł, czego nie znalazłeś — i odwrotnie | Compare the two lists. Three buckets, written into `dziennik.md`: **trafione · nieistotne · zmyślone** | The comparison table is the deliverable |
| 4 | Dwie liczby, które się nie zgadzają | The evidence. GitHub: 71% of reviews carry actionable feedback, 5,1 comments each, one in five reviews on GitHub. An independent preprint: on real pull requests the best model reaches **F1 = 0,066**, „barely above random”, and false positives outnumber true ones. Both with their limitations, side by side | The student's own three buckets are a third measurement, with n = 1 |
| 5 | Dlaczego duży diff psuje przegląd — komu- i czemukolwiek | The mechanism behind both numbers: under 10 lines F1 0,657–0,800, at 150–600 lines F1 0,043–0,070. And the human baseline: 200–400 lines is the ceiling for a person too, at 70–90% detection. **The size of the change is the variable, not the reader** | Why 7b's commits were small, and why 7e's will have to be |
| 6 | Przegląd, którego nie przeczytałeś, nie jest przeglądem | The rule. Thoughtworks' „Hold” on complacency; Willison's „don't file pull requests with code you haven't reviewed yourself”. A green robot comment is not a verdict | |
| 7 | Drugi czytelnik, nie drugi autor *(ending)* | Answers the opening in four decisions | The three buckets, kept for 7e |

## Owns · recalls · avoids

- **Owns:** *przegląd kodu przez model*, *fałszywy alarm (false positive)*,
  *trafione / nieistotne / zmyślone* as the three buckets, `/code-review`,
  *Copilot code review*, *rozmiar zmiany jako zmienna*.
- **Recalls:** the four questions and „werdykt z «bo»” (6h, by link) ·
  *halucynacja* (3d — and this is its second concrete instance, on the student's
  own code) · „biegłość to nie poprawność” (3d) · pull request as a word (0c).
- **Avoids:** CodeRabbit, Graphite, Bugbot, Qodo as things to switch on (named
  once, in *Czytaj dalej*, because their free-tier conditions could not be
  verified — research §7.8) · CI (7d) · reviewing another person's code (7e) ·
  security findings as a category (7f).

## Exercises

Folded into 7d's hand-in assignment; 7c keeps two kinds, both landing in
`dziennik.md`:

1. **Action on the anchor** — the three buckets for your own diff, with one
   line per comment. Observable result: a table with at least one entry in the
   „zmyślone” column, or a sentence saying there was none and why you believe it.
2. **Reflection** — one sentence: which of the two published measurements you
   would quote to somebody who asked whether AI review works, and what you would
   have to add so the sentence is not misleading.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| „In 71% of the reviews, Copilot code review surfaces actionable feedback”; 5,1 comments; „more than one in five code reviews on GitHub” | [github.blog](https://github.blog/ai-and-ml/github-copilot/60-million-copilot-code-reviews-and-counting/) | 05.03.2026 | have — vendor, self-reported, „actionable” vendor-defined |
| „On real PRs alone, the best model (Haiku) achieves F1 = 0,066, barely above random”; 56 TP / 116 FP | [arXiv:2606.15689](https://arxiv.org/abs/2606.15689) | 09.04.2026 | have — preprint, 50 real PRs, LLM-judged |
| Diff size: F1 0,657–0,800 under 10 lines vs 0,043–0,070 at 150–600 | same | 09.04.2026 | have |
| Recall by bug class (security 69,6% … performance 0,0%) | same | 09.04.2026 | have |
| Uber's two sources of false positives, verbatim | [uber.com](https://www.uber.com/en-US/blog/ureview/) | 12.08.2025 | have |
| Human baseline: 51% of human comments addressed | same | 12.08.2025 | have |
| 200–400 LOC / 70–90% / 500 LOC per hour | [smartbear.com](https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/) | checked 10.09.2026 | have — vendor page summarising a 2006 study; **its own sample size is not stated and is not claimed** |
| „It's all too tempting to be less vigilant…”, ring **Hold** | [thoughtworks.com](https://www.thoughtworks.com/radar/techniques/complacency-with-ai-generated-code) | 05.11.2025 | have |
| „Don't file pull requests with code you haven't reviewed yourself.” | [simonwillison.net](https://simonwillison.net/guides/agentic-engineering-patterns/anti-patterns/) | 04.03.2026 | have |
| Copilot Student includes code review; Actions minutes remain free on public repos | [docs.github.com](https://docs.github.com/en/copilot/get-started/plans) · [changelog](https://github.blog/changelog/2026-04-27-github-copilot-code-review-will-start-consuming-github-actions-minutes-on-june-1-2026/) | 10.09.2026 | have — **but GitHub's own pages disagree about which plans qualify (research §7); the lesson says „sprawdź w swoim koncie” and makes it the dated exercise** |
| **Precision/recall for Copilot code review** | — | — | **dropped — GitHub publishes none** (research §7.10) |

## Reader assumptions to verify

- **Open decision #2** — whether students may verify a GitHub Student account.
  If they may not, path one collapses and the lesson runs on `/code-review`
  alone; the draft is written so that either path stands alone.
- That the students' Claude Code / Copilot access is the same on lab machines as
  at home.

## Decisions

- **Two tools taught, the rest named once.** Rejected: a comparison table of six
  review tools — the name budget forbids it (`docs/content-style.md`: fewer than
  three new names per hundred words) and four of the six have unverifiable free
  tiers.
- **The student reads by hand first.** Rejected: running the model first and
  then „checking”. Without a baseline of their own, every model comment looks
  like a finding, which is the complacency the Radar puts on Hold.
- **The 71% and the 0,066 are printed together, never separately.** Either one
  alone is propaganda in a different direction.
- **The diff-size finding is the section that pays for 7e** — it is why 7e
  requires small pull requests, and saying it here means 7e does not have to
  argue it.

## Open questions for Viktar (≤ 3)

1. GitHub's plans table and its how-to page disagree on whether Copilot code
   review is included for a verified student (research §7.8). The draft handles
   it by making „check it in your own account and write down the date” the
   research condition — but if you already know the answer for this school, the
   lesson should just say it.

## Deviations from the approved arc

- Drafted the same day as the brief, unapproved (module-level decision).
- Title departs from v1's „AI robi code review”; the slug `ai-code-review` does not.
