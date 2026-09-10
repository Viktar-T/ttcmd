# Brief — 7e · Pull request do repozytorium kolegi

| | |
| --- | --- |
| Lesson | `content/moduly/07-testy-i-jakosc/pull-request-do-kolegi.mdx` · `order: 5` · 4 h |
| Written | 2026-09-10, by write-lesson · approved: (blank) |
| Mode | semi-supervised |
| Research | `research-07-testy-jakosc-przeglad.md` §4, §3.6 (fork PRs), §2.4 (human baseline) |
| Drafted | 2026-09-10 |
| Why it exists | **The replacement for the deleted „Wspólna aplikacja” module** (course-structure v2.9). Open decision #16, answered by Viktar on 2026-09-10: it needed its own lesson and an hour taken from 7a–7d |

## Reader position

As 7d, plus: a repository with tests, a workflow, a ruleset and a closed pull
request of their own. **This is the load-bearing lesson of the module**, because
of what the reader file says they have never done — 7 of 12 have never worked on
the same files as another person; **nobody** has resolved a conflict; **nobody**
has reviewed another person's change; 8 of 12 have never had a user who was not
themselves. „No group projects” was named twice, unprompted, as what went worst
in their earlier schooling.

They know the words *pull request*, *gałąź*, *fork* only as vocabulary from 0c.
They have never pushed to a repository they do not own.

## Carrying question

> Umiesz już powiedzieć, czy kod robi to, co obiecuje **twoja** specyfikacja.
> Co powiesz o kodzie, którego nie pisałeś, w aplikacji, której nie znasz, i
> czyim zdaniem to w ogóle jest?

## Anchor

**One small change in a classmate's repository, carried from fork to merged (or
refused).** It is the same shape as everything the student did in 7b–7d — one
criterion, one test, one green tick — except that the criterion is somebody
else's and the verdict is not theirs to make.

**The change itself is fixed by the lesson and is the same for everybody, which
is the only way this works across sixty different applications: add one test for
one criterion in your partner's specification that has no test yet.** No feature,
no refactor, no opinion about their architecture. A test is the one contribution
that fits any application in the room and cannot break it.

## Shape

**Procedure with a narrative frame.** The git mechanics must scan, because
students will be reading them while doing. But the two narrative sections — the
review that names criteria rather than style, and what it feels like to receive
one — are the lesson.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | Every check so far was yours, or a machine's. Both of them share your blind spot | Names the pair and the one change |
| 1 | Cudze repozytorium na twoim dysku | `fork`, `clone`, a branch with your name in it. The first surprise: their application probably does not build for you on the first try, and that is information about their repository, not about you | The partner's repository, running or not |
| 2 | Jedna zmiana, nie dwie | Why the contribution is a test and nothing else. 7c's measured finding pays here: a diff under ten lines gets read; a diff of six hundred does not, by a person or a model | The change is chosen from their `spec.md` |
| 3 | Pull request, który da się przeczytać | The description: which criterion, what the test checks, how to run it. And the thing that will confuse everybody — a workflow on somebody else's repository may need the owner to click „Approve and run” the first time | The pull request, opened |
| 4 | Przegląd, który mówi o kryteriach, nie o stylu | The narrative section. Three questions to ask a change that is not yours: does it check what it claims · does it break anything that worked · would I be able to run it in a year. **Not**: would I have written it this way. „Werdykt z «bo»” from 6h, now addressed to a person | The review the student writes on the incoming pull request |
| 5 | Konflikt: dwie osoby, ta sama linijka | The one thing nobody in the room has done. What git prints, what the markers mean, and the rule: a conflict is resolved by deciding, not by picking the longer version | Both branches touched the same file |
| 6 | Zgoda, prośba o zmianę, odmowa | Three legitimate endings, all written down. The owner decides — **naprawiam · poprawiam i biorę · nie biorę, bo** — which is 5g's decision shape applied to somebody else's proposal | The merge, or the refusal, with its sentence |
| 7 | Ile znajduje normalny przegląd | The honest calibration, before anyone feels stupid: even at Uber only 51% of *human* review comments turn out to be bugs the author agrees with. **One real finding is a normal review** | |
| 8 | Czytelnik, którego nie da się zastąpić *(ending)* | Answers the opening: what a person sees that neither a test nor a model does — whether the thing makes sense to somebody who was not there | |

## Owns · recalls · avoids

- **Owns:** *fork*, *pull request do cudzego repozytorium*, *gałąź w cudzym
  repozytorium*, *konflikt scalenia* and its markers, *przegląd wg kryteriów*,
  *„Approve and run”*, and the three verdicts.
- **Recalls:** „werdykt z «bo»” (6h, by link) · the criterion shape (4c) ·
  the three buckets and the diff-size finding (7c) · the required check (7d) ·
  the zgłoszenie decision shape *naprawiam / nie naprawiam / to nie błąd, to brak
  w specyfikacji* (5g) · `git merge` and the sentence in 6h that said conflicts
  were „a topic for later” — **this is later, and the lesson says so.**
- **Avoids:** rebase, squash, force push, CODEOWNERS, protected-branch
  administration on somebody else's repository, licences, contributor agreements.

## Exercises

**One hand-in assignment**, and it is the only one in the course that lives in
two repositories.

Finished state: you have opened one pull request in your partner's repository
and reviewed one in your own; both are closed, one way or another, with a
written verdict.

Four conditions, all visible in the repositories:

- **in your partner's repository:** a pull request from a branch that carries
  your name, containing one test for one named criterion of *their*
  specification, with a description saying which criterion and how to run it;
- **in your repository:** their pull request, with your review on it — at least
  one comment that names a criterion and one verdict sentence containing „bo”.
  A review that says only „ok” does not count, and neither does one that is
  about formatting;
- **a conflict, resolved.** If your work did not produce one, make one on
  purpose: both of you change the same line of your own `README.md`, and the
  resolution is a commit whose message says which version won and why;
- `dziennik.md` records: how long their application took to build on your
  machine, what you could not understand without asking, and **one thing about
  your own repository that you changed because somebody else could not follow
  it.** That last one is the point of the lesson.

Then „Na koniec wypchnij wszystko.” and the standard hand-in sentence.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| „With the exception of `GITHUB_TOKEN`, secrets are not passed to the runner when a workflow is triggered from a forked repository.” | [docs.github.com](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) | checked 10.09.2026 | have |
| „When a first-time contributor submits a pull request to a public repository, a maintainer with write access may need to approve running workflows” | same | checked 10.09.2026 | have |
| „only 51% of human-written comments are considered as bugs by the author and addressed in the same changeset” | [uber.com](https://www.uber.com/en-US/blog/ureview/) | 12.08.2025 | have — one company; „addressed” is a proxy |
| Real reviews are small: median 24 lines changed; fewer than 25% of changes have more than one reviewer | [Sadowski et al., ICSE-SEIP '18](https://sback.it/publications/icse2018seip.pdf) | 27.05.2018 | have — Google, 2018, pre-LLM |
| Deleting a public repository does not delete its forks | [docs.github.com](https://docs.github.com/en/repositories/creating-and-managing-repositories/deleting-a-repository) | checked 10.09.2026 | pointed forward to 7f, one clause |
| The survey counts (7 of 12, nobody, 8 of 12, „no group projects” twice) | `docs/surveys/content-reader.md` | 02.09.2026 | have — **used as the lesson's reason, never said back to the reader as a fact about them** (`content-style.md`: a lesson does not tell the reader who they are) |

## Reader assumptions to verify

- **Pairs.** This is open question 1 of the module brief and it blocks the
  zadanie. The draft assumes: **teacher-assigned pairs inside a group, fixed for
  the lesson**, plus the teacher's reference build as the partner for anyone left
  over or whose partner is absent.
- That a partner's application builds on the student's machine. It often will
  not — the lesson treats that as content (section 1), not as an accident, but
  Viktar should expect the room to need help there.
- That both students' repositories are public, or that they can add each other
  as collaborators.

## Decisions

- **The contribution is a test, and only a test.** Rejected: „add a small
  feature” — sixty different applications, no shared feature, and a feature is
  the one contribution that can break somebody's working program the week before
  the semester ends. A test is additive, fits every application, and is the thing
  they have just learned to write.
- **A conflict is manufactured if it does not occur.** Rejected: leaving it to
  chance. Nobody in the room has resolved one, it is named in the survey gap, and
  a lesson that hopes for its own content is not a lesson.
- **The 51% appears before the student writes their review, not after.**
  Calibration given late is consolation; given early it is a standard.
- **The last journal line — what you changed in your own repository because
  somebody else could not follow it — is the assignment's real deliverable.**
  It is the only condition that cannot be satisfied without another person, which
  is what this lesson was created to buy back.

## Open questions for Viktar (≤ 3)

1. **Who assigns the pairs, and when?** If it is done in class on the day, the
   lesson needs ten minutes at the start that the four hours do not currently
   contain.
2. Two groups of thirty: do pairs stay inside a group, or is cross-group
   pairing wanted (it is the only place in the course where the two groups would
   meet)? The draft assumes inside a group.
3. Article IV: the assignment puts one student's repository URL into another
   student's `dziennik.md`. That is student-to-student, in public repositories
   they already own — but it is a disclosure decision and it is yours.

## Deviations from the approved arc

- Drafted the same day as the brief, unapproved (module-level decision).
- New lesson, new slug — it exists in neither v1 nor the v2 lesson table, and
  answers open decision #16.
