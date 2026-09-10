# Research 07 — Tests, quality, code review, CI and security

| | |
| --- | --- |
| Written | **2026-09-10** |
| For | `content/moduly/07-testy-i-jakosc/` — Moduł 7, lessons 7a–7f (course-structure-v2 §Moduł 7) |
| Status | Evidence file. **Not law, not a lesson.** Every figure below is quoted as published, with a link and a date, per ADR-0008. Nothing here is written from memory |
| Method | Four parallel web passes on 2026-09-10 (tests-and-AI · AI code review · .NET 10 testing and GitHub Actions · secrets and prompt injection), plus one build pass on a real .NET SDK **10.0.112** machine (§6) |
| Rule this file obeys | A claim without a link and a date does not enter a lesson. A claim whose source could not be reached is recorded in **§7 Not found** and is *dropped*, not guessed |

**How to read the tables.** „Limitation” is not decoration. This module teaches
„wrażenie nie jest dowodem”, and a lesson that quotes a vendor's own marketing
figure without saying it is the vendor's own figure teaches the opposite. Every
number that reaches a student carries its limitation in the same sentence or in
the same table cell.

---

## 1. Does AI-written code need tests more, or less? — 7a

### 1.1 The productivity picture is not what anyone assumes

| Claim | Figure as published | Source | Date | Limitation |
| --- | --- | --- | --- | --- |
| Experienced open-source developers were **slower** with AI tools while believing they were faster | „when developers use AI tools, they take **19% longer** than without”; expected **+24%** speedup beforehand, still estimated **+20%** afterwards | [METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) | 10.07.2025 | RCT, but **16 developers / 246 issues**, all on mature repos they already knew; measures *time*, not defects |
| METR's own restatement and its weaker follow-up | „19% longer, with a confidence interval between **+2% and +39%**”; late-2025 re-run: original devs **−18%** (CI −38% to +9%), new recruits **−4%** (CI −15% to +9%) | [METR](https://metr.org/blog/2026-02-24-uplift-update/) | 24.02.2026 | METR calls the new data „weak evidence”; **30–50%** of developers declined to submit tasks they would not do without AI — self-selection admitted by the authors |

**Already owned by lesson 1c** (the METR 19% / 20% / 39 pp story and its 2026
correction). 7a may recall it in one clause with a link; it may not re-tell it.

### 1.2 What actually changes in the code — the material 7a needs

| Claim | Figure as published | Source | Date | Limitation |
| --- | --- | --- | --- | --- |
| Duplicated blocks rise, refactoring collapses | block duplication **+81% since 2023** (40,3 → 73,0 per million changed lines); copy/paste **15,7% of changed lines vs 9,4% in 2022**; refactoring/moved code **3,8% of changed lines YTD 2026, was 21% in 2022**; error-masking constructs **+47%**; two-week churn **+15%** | [GitClear, *The Maintainability Gap*](https://www.gitclear.com/the_ai_code_quality_maintainability_gap) | 01.2026 (month only) | **623 million changes, 2023–2026**; the vendor's own product telemetry, correlational, and it **reports no bug or defect rate at all** |
| Higher AI adoption goes with **more throughput and more instability at once** | „higher AI adoption is associated with an increase in both software delivery throughput and software delivery instability”; **90%** use AI at work; median **two hours** of the last workday with AI; **30%** report little or no trust in AI-generated code | [DORA 2025 report (PDF)](https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf) · [analysis](https://dora.dev/insights/balancing-ai-tensions/) | 23.09.2025 · analysis 10.03.2026 | Self-reported survey, ~5 000 respondents, correlational; the throughput/instability effects are **standardized effect estimates in a figure, not percentages** — see §7.7 |
| The *kind* of defect shifts: fewer shallow, more deep | syntax errors **−76%**, logic bugs **−60%**; privilege-escalation paths **+322%**, architectural design flaws **+153%**; „ten times more security issues”; **10 000+** new security findings per month, a 10× increase from December 2024 | Apiiro research, via [The Register](https://www.theregister.com/2025/09/05/ai_code_assistants_security_problems/) | 05.09.2025 | **Secondary reporting** — Apiiro's own page would not render; vendor-funded; sample described only as „tens of thousands of repositories” at Fortune 50 firms. **Label it as secondary in the lesson** |
| At scale, the raw speed gain is largely eaten by rework | „AI boosts productivity by **10–25%**”, but **−9%** code quality, **2,6×** rework, **3,6×** variance, **+1%** effective output; greenfield simple **30–35%**, legacy complex **5–10%** | [Denisov-Blanch, Stanford (slides)](https://aiconference.com/wp-content/uploads/2025/09/Yegor-Denisov-Blanch-Will-AI-Replace-Software-Engineers_-.pptx.pdf) | slides dated through 07.2025 | **Conference slide deck, not peer-reviewed**; 100k+ engineers, 600+ companies; the rework methodology is proprietary and unpublished |

The 1c matrix (Stanford +30–40% … 0–10%) is **1c's story**; the 2,6× rework
figure from the same group is new and may be owned by 7a.

### 1.3 The strongest single fact for 7a — the benchmark's own definition

The industry's main coding benchmark defines „solved” as *a test suite going
green*, and **half of that criterion exists purely to detect regression**:

> „A proposed edit is evaluated by running both the `FAIL_TO_PASS` and
> `PASS_TO_PASS` tests. If the `FAIL_TO_PASS` tests pass, this means the edit
> solves the issue. If the `PASS_TO_PASS` tests pass, then the edit has not
> inadvertently broken unrelated sections of the codebase.”
> — OpenAI with the SWE-bench authors, [*Introducing SWE-bench Verified*](https://openai.com/index/introducing-swe-bench-verified/), 13.08.2024, updated 24.02.2025

This is a methodological description, not an empirical finding — which is
exactly why it is safe. It says: **the way the whole industry decides whether a
model fixed a bug is by running the tests that were already there.** For a
student who has never written a test, that is the argument, and it needs no
percentage.

Vendor guidance says the same thing to the person, not to the benchmark:

> „Give Claude a check it can run: tests, a build, a screenshot to compare. It's
> the difference between a session you watch and one you walk away from.”
> „**The trust-then-verify gap.** Claude produces a plausible-looking
> implementation that doesn't handle edge cases. **Fix**: Always provide
> verification (tests, scripts, screenshots). If you can't verify it, don't ship it.”
> — Anthropic, [*Best practices for Claude Code*](https://code.claude.com/docs/en/best-practices), **undated living documentation**, fetched 10.09.2026

> „Codex can read and edit files, as well as run commands including test
> harnesses, linters, and type checkers. […] it can iteratively run tests until
> it receives a passing result.”
> — OpenAI, [*Introducing Codex*](https://openai.com/index/introducing-codex/), 16.05.2025

> „Automated tests are no longer optional when working with coding agents.”
> — Simon Willison, [*Agentic Engineering Patterns — First run the tests*](https://simonwillison.net/guides/agentic-engineering-patterns/first-run-the-tests/), updated 28.02.2026

> „In vibe coding you don't care about the code, just the behavior of the system.
> In augmented coding you care about the code, its complexity, the tests, & their coverage.”
> — Kent Beck, [*Augmented Coding: Beyond the Vibes*](https://newsletter.kentbeck.com/p/augmented-coding-beyond-the-vibes), 25.06.2025

And, in Beck's own words, the failure mode a student will meet within a week:

> „Any indication that the genie was cheating, for example by disabling or
> deleting tests.”
> — Kent Beck, same post, 25.06.2025

### 1.4 The honest counterweight — models are *not* simply good at tests

A lesson that says „and the model writes the tests for you” would be wrong on
the evidence. This is the material that keeps 7a and 7b honest.

| Claim | Figure as published | Source | Date | Limitation |
| --- | --- | --- | --- | --- |
| The best-documented industrial deployment: most generated tests are unusable, the filtered remainder is accepted | „**75%** of TestGen-LLM's test cases built correctly, **57%** passed reliably, and **25%** increased coverage… **73%** of its recommendations being accepted for production deployment by Meta software engineers” | [Alshahwan et al., Meta, arXiv:2402.09171](https://arxiv.org/abs/2402.09171) | 14.02.2024 | Peer-reviewed (FSE 2024 industry track). **The 73% is acceptance of what survived the filter, not of what the model produced** — the 75/57/25 chain must be quoted with it. The tool *improves existing* tests; it does not write a suite from scratch |
| Shown buggy code, a model writes tests that **lock the bug in** | a „misguidance effect”: buggy code has „a twofold impact: increasing tests that assert incorrect behavior while suppressing effective, bug-finding tests” | [arXiv:2607.22883](https://arxiv.org/abs/2607.22883) (ISSTA 2026) | 24.07.2026 | Peer-reviewed. **Exact percentages could not be extracted — see §7.1. Quote the direction, never a number** |
| Coverage and mutation score mislead exactly when it matters | „in another common scenario where the code-under-test may already be buggy and the goal is to expose the bug…, they no longer serve as reliable indicators” | [arXiv:2607.22880](https://arxiv.org/abs/2607.22880) (ISSTA 2026) | 24.07.2026 | Peer-reviewed replicability study; no single headline figure |
| Forcing an agent through a TDD loop did **not** measurably improve the result and cost several times more | tokens **8,5×** (small tasks), **2,96×** (medium), **4,89×** (large); „there was no clearly discernable difference based on TDD workflow versus no TDD workflow”; no meaningful difference in mutation scores | [Birgitta Böckeler, *TDD inside the agent loop*](https://martinfowler.com/articles/exploring-gen-ai/tdd-in-the-agent-loop.html) | 10.08.2026 | **Small-N practitioner experiment**, 5 batches; an **LLM was the judge of quality**. It tests *TDD as an agent workflow*, **not** whether having a test suite is worth anything |

Böckeler's sentence is the one worth quoting to students, because it is about
evidence, not about tools:

> „Watching a test go red is only proof of anything if someone is checking *why*
> it went red. When the agent both writes the test and confirms it failed, a red
> test tells you the agent ran it and saw failure, not that the failure was for
> the right reason.”
> — [same, 10.08.2026](https://martinfowler.com/articles/exploring-gen-ai/tdd-in-the-agent-loop.html)

**Consequence for the module.** 7a's claim is *„a test suite that already exists
is what stops an agent from breaking what worked yesterday”* — which §1.3
supports. It is **not** *„let the model write your tests”*, which §1.4
contradicts. 7b therefore has the student write the first test **by hand** and
only then compare it with the agent's version.

---

## 2. AI code review — 7c

### 2.1 Scale and what the vendors report

| Claim | Figure as published | Source | Date | Limitation |
| --- | --- | --- | --- | --- |
| Copilot code review at GA | „available to all paid Copilot subscribers”; „over **1 million** developers have already used Copilot code review” in just over a month | [GitHub changelog](https://github.blog/changelog/2025-04-04-copilot-code-review-now-generally-available/) | 04.04.2025 | Vendor announcement |
| Share of all reviews on GitHub | „usage has grown 10X, now accounting for **more than one in five code reviews on GitHub**”; „more than **12,000** organizations… automatically” | [GitHub](https://github.blog/ai-and-ml/github-copilot/60-million-copilot-code-reviews-and-counting/) | 05.03.2026 | Vendor blog, self-reported, no methodology |
| Copilot's own signal rate | „In **71%** of the reviews, Copilot code review surfaces actionable feedback”; „In the remaining **29%**, the agent says nothing at all”; „about **5,1** comments per review” | same | 05.03.2026 | „Actionable” is vendor-defined and not externally audited |
| One company's production numbers | „**131 246** review runs across **48 095** merge requests in **5 169** repositories”; median review **3 min 39 s**; „the average review costs **$1,19**” | [Cloudflare](https://blog.cloudflare.com/ai-code-review/) | 20.04.2026 | One company's engineering blog, self-reported |
| Uber's coverage and action rate | „over **90%** of the weekly ~**65 000** diffs”; „Engineers who interact with the tool mark **75%** of its comments as useful”; „over **65%** of its posted comments addressed” | [Uber Engineering, *Introducing uReview*](https://www.uber.com/en-US/blog/ureview/) | 12.08.2025 | Self-reported; „engineers who interact” excludes those who ignore it |

### 2.2 The number that makes the lesson honest

| Claim | Figure as published | Source | Date | Limitation |
| --- | --- | --- | --- | --- |
| On real pull requests, LLM review nearly collapses | „On real PRs alone, the best model (Haiku) achieves **F1 = 0,066**, barely above random.” Synthetic → real: 0,847 → 0,066 (−92%), 0,796 → 0,050 (−94%), 0,804 → 0,007 (−99%) | [Kumar, Bararia, Raj, arXiv:2606.15689](https://arxiv.org/abs/2606.15689) | 09.04.2026 | **Preprint, N = 150 (only 50 real PRs)**; ground truth auto-extracted, not human-labelled; an LLM judged the models |
| Recall is wildly uneven by kind of bug | security **69,6%** · architecture **33,3%** · logic **24,5%** · best practice **6,7%** · **performance 0,0%** | same | 09.04.2026 | As above |
| Big diffs break it | diffs under 10 lines: F1 **0,657–0,800**; diffs of 150–600 lines: F1 **0,043–0,070** — „a 15× drop”. Real PR diffs: „median **117** lines, max 562” | same | 09.04.2026 | As above |
| False positives outnumber true positives | Haiku 4.5: „P 32,6%, R 41,2%, F1 36,4% (**56 TP, 116 FP**)” | same | 09.04.2026 | As above |
| Running two models does not help | „Ensembles hurt F1. The models largely detect the same bugs.” 0,365 → 0,333 | same | 09.04.2026 | As above |

**The pair to teach with.** GitHub says 71% of its reviews carry actionable
feedback; an independent preprint says that on real pull requests the best model
scored 0,066. Both are quoted with their limitations, side by side, and the
student is asked which measurement they would trust and why. That contrast, not
either number alone, is 7c's evidence section — and it is the same move 1c makes
with METR.

### 2.3 What it gets wrong, in practitioners' words

> „The main challenge of AI code review is false positives from two sources: LLM
> hallucinations that generate incorrect comments and issues that are generally
> valid but not important in that specific scenario.”
> — Choudhary, Mahajan, Wang, [Uber Engineering](https://www.uber.com/en-US/blog/ureview/), 12.08.2025

> „if they're not good enough, you stop reading them. We see that all the time,
> you get flooded with false positives”
> — a developer at WirelessCar, quoted in [arXiv:2505.16339](https://arxiv.org/html/2505.16339v1), 22.05.2025 (N = 7 interviews; qualitative)

> „This isn't a replacement for human code review, at least not yet with today's models.”
> — Ryan Skidmore, [Cloudflare](https://blog.cloudflare.com/ai-code-review/), 20.04.2026

> „It's all too tempting to be less vigilant when reviewing AI suggestions after
> a few positive experiences with an assistant.”
> — Thoughtworks, [*Complacency with AI-generated code*](https://www.thoughtworks.com/radar/techniques/complacency-with-ai-generated-code), ring **Hold**, Technology Radar Vol. 33, 05.11.2025

> „Don't file pull requests with code you haven't reviewed yourself. […] If you
> put code up for review you need to be confident that it's ready for other
> people to spend their time on it.”
> — Simon Willison, [*Agentic engineering patterns — Anti-patterns*](https://simonwillison.net/guides/agentic-engineering-patterns/anti-patterns/), 04.03.2026

> „Hallucinations are the core feature of LLMs. We just call it 'hallucinations'
> when they do something we don't want, and 'intelligence' in the cases where
> it's useful to us.”
> — Birgitta Böckeler, [*I still care about the code*](https://martinfowler.com/articles/exploring-gen-ai/i-still-care-about-the-code.html), 09.07.2025

### 2.4 The human baseline — so 7c compares instead of asserting

| Claim | Figure as published | Source | Date | Limitation |
| --- | --- | --- | --- | --- |
| Humans miss about half too | „only **51%** of human-written comments are considered as bugs by the author and addressed in the same changeset” — versus 65% for uReview | [Uber](https://www.uber.com/en-US/blog/ureview/) | 12.08.2025 | One company; „addressed” is a proxy for „correct” |
| Real reviews are tiny | „the median number of lines modified is **24**”; „over **10%** of changes modify only a single line”; „fewer than **25%** of changes have more than one reviewer” | [Sadowski, Söderberg et al., *Modern Code Review: A Case Study at Google*](https://sback.it/publications/icse2018seip.pdf), ICSE-SEIP '18 | 27.05.2018 | One company, 2018, pre-LLM |
| Review size ceiling | „developers should review no more than **200 to 400 LOC** at a time”; „a review of 200-400 LOC over 60 to 90 minutes should yield **70-90%** defect discovery”; „a significant drop in defect density at rates faster than **500 LOC per hour**” | [SmartBear / Cisco case study summary](https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/) | checked 10.09.2026 | Vendor page summarising a 2006 study; **the study's own size is not stated there — see §7.11.** Pre-AI, pre-GitHub |
| Review load is now the bottleneck | pull requests on GitHub „increased fivefold over three years” | [Gergely Orosz, *What is happening with code reviews?*](https://newsletter.pragmaticengineer.com/p/what-is-happening-with-code-reviews) | 08.09.2026 | Newsletter |

### 2.5 What a student can actually switch on — checked 10.09.2026

| Tool | What it reviews | Free for a student on a **public** repo? | Source |
| --- | --- | --- | --- |
| **GitHub Copilot code review** | Pull requests on github.com (request Copilot as reviewer, or automatically via a ruleset) | **Yes, through Copilot Student.** Requires verification as a student („degree- or diploma-granting program, such as a high school…”, at least 13, proof of enrolment). Copilot **Free** gets only „Review selection” in VS Code — not PR review. Since 01.06.2026 reviews draw Actions minutes, but „There are no changes to public repositories, where Actions minutes remain free” | [plans](https://docs.github.com/en/copilot/get-started/plans) · [changelog 27.04.2026](https://github.blog/changelog/2026-04-27-github-copilot-code-review-will-start-consuming-github-actions-minutes-on-june-1-2026/) |
| **Claude Code `/code-review`** | A local diff, or a target you name (file, PR number, `main...gałąź`) | **Yes on any Claude Code plan** — „you can still review a diff locally with the `/code-review` command”. Needs a Claude subscription or an API key for Claude Code itself | [docs](https://code.claude.com/docs/en/code-review) |
| **Claude Code Review** (managed GitHub App) | Pull requests, inline comments by severity | **No.** „available for Team and Enterprise subscriptions”; „Each review averages **$15-25** in cost” | same |
| **Gemini Code Assist for GitHub** | Pull requests; `/gemini review` | **Ambiguous — do not teach without re-checking.** The 2025 launch promised free reviews; the current doc requires a Google Cloud billing account. A card is a real barrier for a 17-year-old | [doc](https://docs.cloud.google.com/gemini/docs/code-review/use-code-assist-github) |
| CodeRabbit · Graphite · Cursor Bugbot · Qodo Merge | Pull requests | Free tiers advertised, **eligibility rules not published in a fetchable form** — see §7.4/§7.5/§7.6. Do not put a condition in a lesson that the vendor does not state | — |

**Decision recorded here:** 7c teaches **two** paths — Copilot code review on a
pull request (because the students are on GitHub and eligible) and Claude Code's
`/code-review` on a local diff (because it needs no GitHub App). Everything else
is named in *Czytaj dalej*, not taught. Rejected: teaching CodeRabbit, whose
free-tier condition could not be verified — decision #2 (student accounts) is
still open anyway.

---

## 3. .NET testing and CI — 7b and 7d

Everything in this section was checked on 10.09.2026 against Microsoft Learn,
the projects' own documentation and NuGet, **and** against a real SDK on this
machine (§6). Where the two disagree, §6 wins and says so.

### 3.1 The framework decision: **NUnit 4**, via the built-in template

| Fact | Source |
| --- | --- |
| SDK 10 ships exactly three test templates: `mstest`, `nunit`, `xunit` (plus `-class`/`-test` item templates and the Playwright variants). Default TFM `net10.0` | [dotnet new templates](https://learn.microsoft.com/dotnet/core/tools/dotnet-new-sdk-templates); confirmed in §6.1 |
| `dotnet new xunit` on SDK 10 creates **xUnit v2** — and the `xunit` v2 package is **deprecated on NuGet**: „This package has been deprecated as it is legacy and is no longer maintained” | [NuGet: xunit](https://www.nuget.org/packages/xunit) · [dotnet/sdk issue #54499, still open](https://github.com/dotnet/sdk/issues/54499) |
| `Avalonia.Headless.XUnit` **12.1.2** (02.09.2026) requires `xunit.v3.extensibility.core (>= 3.2.2)` — so the built-in xUnit template is a **dead end** in this stack | [NuGet](https://www.nuget.org/packages/Avalonia.Headless.XUnit/12.1.2) |
| `Avalonia.Headless.NUnit` **12.1.2** requires `NUnit (>= 4.5.1)` — satisfied by the current NUnit 4 line | [NuGet](https://www.nuget.org/packages/Avalonia.Headless.NUnit/12.1.2) |
| `dotnet test` on SDK 10 defaults to **VSTest**; Microsoft.Testing.Platform is opt-in through `global.json`. „Test runner selection is available starting with .NET 10 SDK” | [dotnet test](https://learn.microsoft.com/dotnet/core/tools/dotnet-test) |
| `--xunit-version v3` and NUnit's `--test-runner` are **.NET 11** features, and **.NET 11 is not released** (.NET 10 is LTS, released 11.11.2025, EOL 14.11.2028) | [What's new .NET 11](https://learn.microsoft.com/dotnet/core/whats-new/dotnet-11/sdk#test-improvements) · [support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core) |

**Chosen: `dotnet new nunit`.** It is in the SDK (no extra install on a school
network), `dotnet test` runs it with **zero configuration** (no `global.json`,
no Microsoft.Testing.Platform decision in lesson one), nothing in it is
deprecated, and it is the one framework that still works if the course ever adds
a headless Avalonia test.

**Rejected:** `dotnet new xunit` — generates deprecated v2 packages and cannot
be combined with Avalonia 12's headless testing. `dotnet new xunit3` — the most
modern option, but costs a template install and very probably a `global.json`
before `dotnet test` runs at all: three new concepts before the first green
tick. `mstest` — modern and maintained, but Avalonia ships headless integrations
for xUnit and NUnit only.

### 3.2 What the template actually generates — verified on this machine

From `dotnet new nunit` on **SDK 10.0.112** (§6.1), the generated
`.csproj` pins:

| Package | Version generated |
| --- | --- |
| `NUnit` | **4.3.2** |
| `NUnit3TestAdapter` | **5.0.0** |
| `NUnit.Analyzers` | **4.7.0** |
| `Microsoft.NET.Test.Sdk` | **17.14.0** |
| `coverlet.collector` | **6.0.4** |

and it declares `<Using Include="NUnit.Framework" />`, so **the generated file
has no `using NUnit.Framework;` line** — the using is implicit. A lesson that
tells students to add it is wrong for the generated file and right for a file
they create by hand; say which.

Latest published versions on NuGet at 10.09.2026, for the „your numbers will
differ” sentence: NUnit **4.6.1** (19.05.2026), MSTest **4.4.0** (02.09.2026),
`xunit.v3` **4.0.0** (15.08.2026), `Microsoft.NET.Test.Sdk` **18.10.0**
(09.09.2026). **Do not print pinned versions as if they were fixed** — the
lesson tells the student to read their own generated `.csproj`.

### 3.3 The NUnit 4 trap, which is a teaching gift

NUnit 4 moved the classic assertions to a legacy namespace:

> „NUnit 4.0 has a few breaking changes making it neither binary nor source code
> compatible with NUnit 3.14.0” — the classic `Assert.AreEqual` / `Assert.IsTrue`
> were **moved to `NUnit.Framework.Legacy`**. The constraint model is the
> recommended form: `Assert.That(actual, Is.EqualTo(42))`.
> — [NUnit 4.0 Migration Guide](https://docs.nunit.org/articles/nunit/release-notes/Nunit4.0-MigrationGuide.html), checked 10.09.2026

Almost every NUnit tutorial on the web, and therefore a good share of what a
model produces, writes `Assert.AreEqual`. On NUnit 4 that does not compile
without the legacy `using`. **This is 7b's *Rozbierz to*:** the agent writes
code that looks right, was right for six years, and does not build today — and
the compiler, not the student's judgment, is what catches it. The dating of the
change is what makes it teachable, and it is why 3d's „biegłość to nie
poprawność” gets a second, concrete instance.

Attribute shapes (NUnit 4): `[Test]` for one case, `[TestCase(…)]` for inline
data ([docs](https://docs.nunit.org/articles/nunit/writing-tests/attributes/testcase.html)).

### 3.4 Commands, with the SDK 10 renames

`dotnet reference add` is the .NET 10 form: „If you're using .NET 9 SDK or
earlier, use the 'verb first' form (`dotnet add reference`) instead. The 'noun
first' form was introduced in .NET 10” — and „While the verb-first forms
continue to work, it's better to use the noun-first forms”
([docs](https://learn.microsoft.com/dotnet/core/tools/dotnet-reference-add)).
Every tutorial older than November 2025 uses the old form. Both work; the lesson
picks one and stays with it.

`dotnet new sln` on SDK 10 creates **`.slnx`**, not `.sln`: „Starting with .NET
10, the default format is `slnx`” ([docs](https://learn.microsoft.com/dotnet/core/tools/dotnet-sln)).
A sentence promising a `.sln` file is wrong on this SDK. **`dotnet test` needs
no solution at all**, which is the version the lesson uses.

Two gotchas worth one line each:

- „When discovery finds no matching tests, the run prints a warning rather than
  an error and still returns `0` by default”
  ([docs](https://learn.microsoft.com/dotnet/core/tools/dotnet-test-vstest)) —
  **a CI gate can go green on zero tests.** This is the fact that makes 7d's
  „bramka” an honest lesson rather than a ceremony.
- Exit codes on the VSTest path are only `0` and `1`.

### 3.5 Testing an Avalonia application — what 7b actually teaches

`Avalonia.Headless`, `Avalonia.Headless.NUnit` and `Avalonia.Headless.XUnit`
exist at **12.1.2** (02.09.2026). The headless platform „runs Avalonia without a
visible window, making it ideal for automated testing in CI/CD environments and
on machines without a display”, and „replaces the real windowing and rendering
backends with in-memory implementations”
([docs](https://docs.avaloniaui.net/docs/concepts/headless/)). The NUnit
attribute is `[AvaloniaTest]`; the xUnit ones are `[AvaloniaFact]` /
`[AvaloniaTheory]` — **not** `[AvaloniaTest]`
([xunit](https://docs.avaloniaui.net/docs/concepts/headless/headless-xunit) ·
[nunit](https://docs.avaloniaui.net/docs/concepts/headless/headless-nunit), last
updated 20.04.2026).

**But that is not what 7b teaches.** Avalonia's own MVVM page states the
approach that costs nothing and needs no Avalonia package in the test project at
all:

> „Testability: View models can be unit tested like any other class, without
> launching a UI.” … „Because the view model has no reference to the view or to
> Avalonia types, it can be unit tested like any other code.”
> — [Avalonia docs, *The MVVM pattern*](https://docs.avaloniaui.net/docs/fundamentals/the-mvvm-pattern/), last updated 25.08.2026

This is 6f's rule („okno tylko pokazuje”, „gdzie jest stan”) collecting its
payment: the students moved state out of the controls in Moduł 6, and the reward
arrives in Moduł 7 as *the logic can be tested without a window*. Headless
Avalonia is named in *Czytaj dalej*; it is not built in class.

### 3.6 GitHub Actions — verified for 7d

**Billing, quoted exactly:**

> „GitHub Actions usage is free for self-hosted runners and for public
> repositories that use standard GitHub-hosted runners.”
> — [About billing for GitHub Actions](https://docs.github.com/en/billing/concepts/product-billing/github-actions), checked 10.09.2026

The students' repositories are public, so `ubuntu-latest` costs them nothing.

**Current major versions** — GitHub's own starter workflow is stale and must not
be copied: it still pins `actions/checkout@v4` and `actions/setup-dotnet@v4`,
while the actions' own repositories are at **`actions/checkout@v7`** (latest tag
v7.0.1) and **`actions/setup-dotnet@v6`** (latest tag v6.0.0), and setup-dotnet's
own README uses `'10.0.x'` in its matrix example. The release *years* could not
be read from the pages — see §7. Verify the tags on the day the lesson is
taught; that re-check is itself an exercise.

**The workflow, as it will appear in the lesson:**

```yaml
name: CI

on: [push, pull_request]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7

      - name: Setup .NET
        uses: actions/setup-dotnet@v6
        with:
          dotnet-version: '10.0.x'

      - name: Build
        run: dotnet build

      - name: Test
        run: dotnet test
```

It lives in `.github/workflows/` ([docs](https://docs.github.com/en/actions/tutorials/build-and-test-code/net)).
`dotnet restore` is deliberately absent: „You don't have to run `dotnet restore`
because it's run implicitly by all commands that require a restore”
([docs](https://learn.microsoft.com/dotnet/core/tools/dotnet-restore)) — the
shorter file is the one a student can read.

**The gate itself.** Rulesets, not the old branch protection UI:
Settings → **Rules** → **Rulesets** → **New ruleset** → **New branch ruleset** →
enforcement **Active** → target the default branch → enable the status-check
rule. „Rulesets are available in public repositories with GitHub Free”
([creating rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository)).
The rule's name appears in GitHub's own documentation in **two different
wordings** — „Require status checks to pass before merging” on the
[rules reference](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)
and „Require status checks before merging” on the creating page. **The lesson
must not print a checkbox label it has not seen on the live UI** — see §7.5.

Two facts that must be in the lesson because they defeat the gate:

> „A job that is skipped will report its status as 'Success'. It will not
> prevent a pull request from merging, even if it is a required check.”
> — [About status checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks), checked 10.09.2026

> „With the exception of `GITHUB_TOKEN`, secrets are not passed to the runner
> when a workflow is triggered from a forked repository.” … „When a first-time
> contributor submits a pull request to a public repository, a maintainer with
> write access may need to approve running workflows on the pull request.”
> — [Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows), checked 10.09.2026

The second one belongs to **7e**: a build-and-test workflow needs no secrets, so
it runs on a classmate's pull request — but the owner may have to click
„Approve and run” the first time, and a student whose pull request appears to do
nothing will otherwise conclude that they broke something.

**A second gate, if 7d has time:** `dotnet format --verify-no-changes` —
„Verifies that no formatting changes would be performed. Terminates with a non
zero exit code if any files would have been formatted”
([docs](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-format)).

---

## 4. The pull request into a classmate's repository — 7e

This lesson's ground is not a study; it is the survey and GitHub's own
documentation. The relevant reader facts, from
`docs/surveys/content-reader.md` (12 answers, 02.09.2026): **7 of 12 have never
worked on the same files as another person**; nobody has resolved a conflict or
reviewed someone's change; **8 of 12 have never had a user who was not
themselves**; „no group projects” was named twice, unprompted, as what went
worst before; and „umiem samemu napisać program” is what 4 of 9 mean by a
successful course.

The mechanics 7e needs are all in §3.6 (fork pull requests, first-run approval)
and §2.5 (review tooling), plus §2.4's human baseline — 51% at Uber — which is
the honest frame for a first review by a seventeen-year-old: **a review that
finds one real thing is a normal review, not a weak one.**

The one measured statement worth putting in front of them about review size is
SmartBear's 200–400 LOC / 70–90% pair (§2.4), with its age and its vendor
status stated. It converts „review the whole thing” into „review this much”.

---

## 5. Secrets, a public repository, and prompt injection — 7f

### 5.1 Scale

| Claim | Figure as published | Source | Date | Limitation |
| --- | --- | --- | --- | --- |
| New hardcoded secrets in public GitHub commits in 2025 | **28 650 000** („~29 million”), **+34%** year on year, against ~1,94 billion public commits (+43%) | [GitGuardian, *State of Secrets Sprawl 2026*](https://blog.gitguardian.com/the-state-of-secrets-sprawl-2026/) | 17.03.2026 | Vendor-funded, scan-based estimate from the vendor's own detectors |
| A leaked secret stays usable for years | „**70%** of secrets leaked in 2022 were still valid” (2025 report); by January 2026, „**64%** of valid secrets from 2022 are still active and exploitable” | [2025](https://blog.gitguardian.com/the-state-of-secrets-sprawl-2025/) · [2026](https://blog.gitguardian.com/the-state-of-secrets-sprawl-2026/) | 11.03.2025 · 17.03.2026 | Two measurements a year apart; validity checked by the vendor's own service. **These are proportions still valid, not a duration — do not convert one into the other** |
| **Commits made with an assistant leak more** | public repositories with Copilot enabled: **6,4%** contained exposed secrets vs **4,6%** across all public repositories — „a **40% higher** incident rate” (2025). Claude Code-assisted commits: **3,2%** secret-leak rate vs a **1,5%** baseline (2026) | [2025](https://www.gitguardian.com/state-of-secrets-sprawl-report-2025) · [2026](https://blog.gitguardian.com/the-state-of-secrets-sprawl-2026/) | 11.03.2025 · 17.03.2026 | **Correlation, not causation**; vendor-funded; „assistant used” is inferred from repository settings and commit metadata |
| Configuration files for agent tooling are themselves a leak surface | **24 008** unique secrets in MCP-related configuration files, of which **2 117** valid | [2026](https://blog.gitguardian.com/the-state-of-secrets-sprawl-2026/) | 17.03.2026 | As above |
| How fast a public key is used | „the actor can detect and launch a full-scale mining operation **within five minutes** from the time of an AWS IAM credential being exposed in a public GitHub repository”; AWS quarantined the key „within **two minutes**”, and the actor „started their operations within **four minutes after** AWS applied the quarantine policy” | [Unit 42, Palo Alto Networks](https://unit42.paloaltonetworks.com/malicious-operations-of-exposed-iam-keys-cryptojacking/) | 30.10.2023 | Vendor research, one campaign; three years old |

### 5.2 The sentences a student has to hear, in GitHub's own words

> „You should consider any leaked secret to be immediately compromised and it is
> essential that you undertake proper remediation steps, such as revoking the
> secret. **Simply removing the secret from the codebase, pushing a new commit,
> or deleting and recreating the repository do not prevent the secret from being
> exploited.**”
> — [Remediating a leaked secret](https://docs.github.com/en/code-security/tutorials/remediate-leaked-secrets/remediating-a-leaked-secret), checked 10.09.2026

> „If you only rewrite your history and force push it, the commits with sensitive
> data may still be accessible elsewhere: In any clones or forks of your
> repository · Directly via their SHA-1 hashes in cached views on GitHub ·
> Through any pull requests that reference them”
> — [Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository), checked 10.09.2026

> „**Deleting a public repository will not delete any forks of the repository.**”
> — [Deleting a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/deleting-a-repository), checked 10.09.2026

> „GitHub will detach public forks of the public repository and put them into a
> new network. **Public forks are not made private.**”
> — [Setting repository visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility), checked 10.09.2026

> „**Avoid the catch-all commands `git add .` and `git commit -a` on the command
> line—use `git add filename` and `git rm filename` to individually stage files,
> instead.**” … „Use `git diff --cached` to review the changes that you have
> staged for commit.”
> — same page, checked 10.09.2026

### 5.3 The machinery that is already on the students' side

| Mechanism | Exact wording | Source |
| --- | --- | --- |
| Push protection for users | „Is **enabled by default** · **Stops you from pushing secrets to public repositories on GitHub**” | [Push protection](https://docs.github.com/en/code-security/concepts/secret-security/push-protection), checked 10.09.2026 |
| Push protection for repositories | „**Is disabled by default**, and can be enabled by a repository administrator…” | same |
| Default on new public repos since | „All new public repositories owned by personal accounts will now have secret scanning and push protection enabled by default” — **but** „Existing public repositories are not affected, nor are new public repositories that belong to an organization” | [changelog](https://github.blog/changelog/2024-03-11-secret-scanning-and-push-protection-are-enabled-by-default-on-new-public-repositories/), 11.03.2024 |
| Bypassing is recorded | choosing a reason then „Allow me to push this secret” creates an alert in the Security tab, „**Adds the bypass event to the audit log**”, and emails watchers „**with a link to the secret and the reason it was allowed**”. „I'll fix it later” leaves an **open** alert | [Push protection](https://docs.github.com/en/code-security/concepts/secret-security/push-protection) |
| The provider is told | „**When a partner secret is detected, we notify the provider so they can take action, such as revoking the credential.**” Verified partners include **Amazon AWS**, **Anthropic**, **OpenAI** | [About secret scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning) · [patterns](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns) |
| What the provider does | „We will forward any keys we find to the relevant service, who will automatically disable them and notify their owners. **The end-to-end process takes just a few seconds.**” | [changelog](https://github.blog/changelog/2021-06-08-rubygems-adobe-and-openai-are-now-github-secret-scanning-integrators/), 08.06.2021 |

### 5.4 Where a .NET secret goes instead

`dotnet new gitignore` ships in the SDK
([templates](https://learn.microsoft.com/dotnet/core/tools/dotnet-new-sdk-templates)).
`dotnet user-secrets init` / `set` store values **outside the project tree** —
`%APPDATA%\Microsoft\UserSecrets\<id>\secrets.json` on Windows,
`~/.microsoft/usersecrets/<id>/secrets.json` on Linux and macOS — and „They
aren't checked into source control”. With the warning that must travel with it:

> „**Secret Manager doesn't encrypt the stored secrets and shouldn't be treated
> as a trusted store. It's for development purposes only.**”
> — [Safe storage of app secrets in development](https://learn.microsoft.com/aspnet/core/security/app-secrets#use-the-secret-manager-tool), checked 10.09.2026

And the `.gitignore` fact that catches everybody once:

> „Entries in a `.gitignore` file apply **only to untracked files**. They don't
> prevent Git from reporting changes to tracked files.”
> — [Microsoft Learn](https://learn.microsoft.com/azure/devops/repos/git/ignore-files), checked 10.09.2026

Adding `.env` to `.gitignore` *after* committing it does nothing.

### 5.5 Prompt injection — the definition and the incidents

Simon Willison's **lethal trifecta**: an agent is exposed when it has all three of
**„Access to your private data”**, **„Exposure to untrusted content”** and
**„The ability to externally communicate”**.

> „**LLMs are unable to reliably distinguish the importance of instructions based
> on where they came from.**” … „we still don't know how to 100% reliably prevent
> this from happening.” … „**The only way to stay safe there is to avoid that
> lethal trifecta combination entirely.**”
> — Simon Willison, [*The lethal trifecta for AI agents*](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/), 16.06.2025

**Incidents, all primary-sourced.** The lesson uses at most two; the rest are
here so that the two chosen are chosen, not merely available.

| Date | What happened | Source |
| --- | --- | --- |
| 01.04.2025 | **MCP tool poisoning.** A malicious server hides instructions in a *tool description* the user never sees; demonstrated leak of `~/.cursor/mcp.json` and SSH keys. Also names the „rug pull”: the server changes a tool's description after the client approved it | [Invariant Labs](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks) |
| 26.05.2025 | **GitHub MCP server exploit.** An attacker files an issue in a *public* repository containing a prompt injection. The user asks their agent to „look at the open issues”; the agent reads it, pulls *private* repository data into context and publishes it in a pull request on the public repository. „**This is not a flaw in the GitHub MCP server code itself, but rather a fundamental architectural issue**” | [Invariant Labs](https://invariantlabs.ai/blog/mcp-github-vulnerability) |
| 23.07.2025 | **Amazon Q Developer extension for VS Code 1.84.0** shipped with attacker-committed code: „With that access token, the threat actor was able to commit malicious code into the extension's open-source repository that was automatically included in a release.” It did not run — „**unsuccessful in executing due to a syntax error**”. Fixed in 1.85.0 | [AWS Security Bulletin AWS-2025-015](https://aws.amazon.com/security/security-bulletins/AWS-2025-015/) |
| 26–29.08.2025 | **Nx „s1ngularity”.** A `postinstall` script in malicious `nx` releases harvested wallets, `.env` files, SSH keys and tokens — and **invoked the locally installed AI CLIs with their permission checks turned off** to search the filesystem for it. GitGuardian: **2 349** distinct secrets from **1 079** systems in about 15 hours, over 1 100 still valid. Phase two used the stolen tokens to flip private repositories public: Wiz counted **>5 500** private repositories exposed. Root cause: a workflow that echoed an unsanitized pull-request title | [Nx postmortem](https://nx.dev/blog/s1ngularity-postmortem) · [GitGuardian](https://blog.gitguardian.com/the-nx-s1ngularity-attack-inside-the-credential-leak/) · [Wiz](https://www.wiz.io/blog/s1ngularity-supply-chain-attack) |
| 25.11.2025 | **Google Antigravity** — indirect prompt injection to command execution, **hidden instructions in invisible Unicode tag characters** that the model reads and a human reviewer cannot see, and `.env` exfiltration through markdown image rendering | [Johann Rehberger](https://embracethered.com/blog/posts/2025/security-keeps-google-antigravity-grounded/) |
| 03.12.2025 · 12.01.2026 | **CVE-2025-66032**, Claude Code command-validation bypass, CVSS 8.7, fixed in 1.0.93; the full write-up shows one bypass reachable through **untrusted repository content** | [GHSA-xq4m-mc3c-vvg3](https://github.com/anthropics/claude-code/security/advisories/GHSA-xq4m-mc3c-vvg3) · [RyotaK, GMO Flatt Security](https://flatt.tech/research/posts/pwning-claude-code-in-8-different-ways/) |
| 09.02.2026 | **„Clinejection.”** A repository's issue-triage workflow ran an agent with Bash access for *any* user. A malicious **issue title** made the agent `npm install` an attacker's fork, poisoning the Actions cache; on 17.02.2026 the resulting credentials were used to publish a malicious release | [Adnan Khan](https://adnanthekhan.com/posts/clinejection/) |
| 18.03.2026 | **CVE-2026-33068.** Claude Code read the permission mode from `.claude/settings.json` — **a file the repository controls** — before deciding whether to show the workspace-trust prompt, so a malicious repository could skip the prompt on first open. CVSS 7.7, fixed in 2.1.53 | [GHSA-mmgp-wc2j-qcv7](https://github.com/anthropics/claude-code/security/advisories/GHSA-mmgp-wc2j-qcv7) |

**The shape all of them share, and the sentence 7f is built on:** untrusted text
from somewhere public reaches an agent that holds credentials. That is the
lethal trifecta, and a student with a public repository and an agent has exactly
those three things.

**Recommended two for the lesson:** the **GitHub MCP exploit** (26.05.2025) —
because it is an issue in a public repository, which is precisely what 7e has
just taught the student to create — and **Nx s1ngularity** (August 2025) —
because the malicious code used the students' own tools, with their permission
prompts turned off, as the search engine. Rejected for class use: the CVE
timeline (accurate, but a list of fixed versions is a catalogue, not a lesson)
and Antigravity's invisible-Unicode finding (excellent, but Antigravity is one
of the class tools and the finding would read as a warning about a tool the
course told them to install rather than about the mechanism).

### 5.6 What the vendors say to do about it

> „**Network command approval**: Commands that fetch content from the web such as
> `curl` and `wget` are not auto-approved by default.” … „**Isolated context
> windows**: Web fetch uses a separate context window to avoid injecting
> potentially malicious prompts” … „**User responsibility**: Claude Code only has
> the permissions you grant it. **You're responsible for reviewing proposed code
> and commands for safety before approval.**” … „**While these protections
> significantly reduce risk, no system is completely immune to all attacks.**”
> — Anthropic, [*Security*](https://code.claude.com/docs/en/security), checked 10.09.2026

> „**Use caution when enabling network access or web search in Codex. Prompt
> injection can cause the agent to fetch and follow untrusted instructions.**”
> — OpenAI, [*Agent approvals & security*](https://learn.chatgpt.com/docs/agent-approvals-security), checked 10.09.2026

On the „turn the prompts off” flag, the verbatim warning now lives on
Anthropic's dev-container page, not the security page:

> „**Skipping permission prompts removes your opportunity to review tool calls
> before they run.**”
> — Anthropic, [*Development containers*](https://code.claude.com/docs/en/devcontainer), checked 10.09.2026

Read that against Nx s1ngularity, where the attacker's script passed exactly
those flags on the victim's machine. That pairing is the lesson.

### 5.7 „Public” is longer than a student thinks

GitHub „stores repositories in the GitHub Arctic Code Vault, a very-long-term
archive **intended to last at least 1,000 years**”
([docs](https://docs.github.com/en/repositories/archiving-a-github-repository/about-archiving-content-and-data-on-github),
checked 10.09.2026), and „On **02/02/2020** GitHub captured a snapshot of every
active public repository” ([FAQ](https://archiveprogram.github.com/faq/)).
**One verified snapshot, in 2020.** The lesson may say „the 2020 snapshot”; it
may **not** say that GitHub archives their repository every year — see §7.5.

GitHub's minimum age is 13, „If you are a resident of a country outside the
United States, your country's minimum age may be older; in such a case, you are
responsible for complying with your country's laws”
([Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service),
checked 10.09.2026). Anything about Polish law here is **outside GitHub's
documentation** and is not asserted in a lesson (Article V; open decision #2).

---

## 6. Build log — what was compiled and run for this file

**Machine:** the session container, Ubuntu 24.04, **.NET SDK 10.0.112**
installed from the distribution feed on 10.09.2026. The lab machines are
expected to be on the **10.0.4xx** feature band (course-structure v2, lab prep),
so the *template package versions in §3.2 may differ there*; the CLI behaviour
verified below does not depend on the band. **NuGet is unreachable from this
container** (`api.nuget.org` refused by the egress proxy), so **no test project
was restored or run.** Everything in §6.2 needs one confirming run on a lab
machine before the module is published.

### 6.1 Verified by execution

| Checked | Result |
| --- | --- |
| `dotnet new list` test templates | `mstest`, `mstest-class`, `mstest-playwright`, `nunit`, `nunit-test`, `nunit-playwright`, `xunit` — **no `xunit3`** |
| `dotnet new nunit --help` | options are `-f/--framework` (choice: `net10.0` only, default `net10.0`), `-p/--enable-pack`, `--no-restore`, `-p:l/--langVersion`. **No `--test-runner`** — confirms §3.1 |
| generated `Notatnik.Testy.csproj` | packages and versions as in §3.2; `<Using Include="NUnit.Framework" />` present |
| generated `UnitTest1.cs` | `[SetUp] public void Setup() { }` and `[Test] public void Test1() { Assert.Pass(); }`, **no `using` line** |
| `dotnet new nunit` restore step | **fails in this container** — `NU1301: Unable to load the service index for source https://api.nuget.org/v3/index.json` |

### 6.2 The lesson's central example, built and run

The module's anchor is the round trip *save → close → open*, which every Moduł 5
application has because 5g's rubric requires „aplikacja pamięta coś po
zamknięciu”. The naive version below is the shape agents commonly produce, and
it is what students will find in their own repositories.

```csharp
static class MagazynV1
{
    public static void Zapisz(string plik, List<string> pozycje)
        => File.WriteAllText(plik, string.Join(";", pozycje));

    public static List<string> Wczytaj(string plik)
        => File.Exists(plik)
            ? new List<string>(File.ReadAllText(plik).Split(';'))
            : new List<string>();
}
```

Run as a console program on SDK 10.0.112, 10.09.2026, **measured output**:

```
zwykle:   wpisano 2, odczytano 2
z ';':    wpisano 2, odczytano 3
          pierwsza pozycja po odczycie: "mleko"
pusta:    wpisano 0, odczytano 1
```

**Two real defects, neither visible while clicking through the window:**

1. an item containing the separator comes back as two items, and the first one
   is truncated — 2 in, 3 out;
2. **an empty list comes back with one empty item** — 0 in, 1 out — because
   `"".Split(';')` yields one empty string. This is the *first run* of every one
   of these applications.

The repaired version, also built and run the same day:

```csharp
static class Magazyn
{
    public static void Zapisz(string plik, List<string> pozycje)
        => File.WriteAllLines(plik, pozycje);

    public static List<string> Wczytaj(string plik)
        => File.Exists(plik)
            ? File.ReadAllLines(plik).Where(l => l.Length > 0).ToList()
            : new List<string>();
}
```

```
zwykle         wpisano 2, odczytano 2  -> to samo
ze srednikiem  wpisano 2, odczytano 2  -> to samo
pusta lista    wpisano 0, odczytano 0  -> to samo
ze spacjami    wpisano 1, odczytano 1  -> to samo
polskie znaki  wpisano 2, odczytano 2  -> to samo
```

**Its honest limit, which belongs in the lesson:** the repair drops empty lines,
so an item that *is* an empty string is lost. Five green cases do not make the
code correct; they make five statements true. That is the sentence 7a needs and
7b earns.

---

## 7. Not found — searched for, not verified, and therefore dropped

Recording an absent answer is a result (`docs/content-style.md`; the hand-in
pattern says the same to students).

1. **Exact percentages of the „misguidance effect” paper (arXiv:2607.22883).** The results tables would not render and arxiv.org PDFs are blocked by the egress proxy. The direction is safe; **no number from this paper may be quoted.**
2. **A study measuring a regression *rate*** — „AI-edited code broke previously-passing behaviour N% of the time” in a real repository. It does not appear to exist publicly. **The module may not claim a headline regression figure.** §1.3's benchmark definition is the substitute, and it is a better one.
3. **The official SWE-bench Verified leaderboard.** swebench.com is client-rendered and returned no data; vendor posts put the scores in images. Model scores are therefore **not** quoted in this module.
4. **Uplevel's widely repeated „41% more bugs”.** Not verifiable from any primary source; Uplevel's own page states no percentage. **Do not use it.**
5. **Whether GitHub still takes archive snapshots after 02.02.2020**, and **the exact rulesets checkbox label** (GitHub's own docs give two wordings), and **whether GitHub Free's 2 000 minutes are private-only** (the billing page does not say). All three are „check on the day”, and two of them are exercises.
6. **The exact terminal text of a blocked push, and of a real `dotnet test` failure on the VSTest path.** Microsoft Learn documents exit codes and prose but not the summary line; GitHub documents a fragment. **Both must be captured from a real machine — do not print an invented console block.**
7. **The DORA throughput/instability effect as a percentage** — published only as standardized effect estimates in a figure. The claim stays directional.
8. **Free-tier eligibility rules for CodeRabbit, Qodo, Graphite and Cursor Bugbot**, and **Gemini Code Assist's review quota**. None is published in a form that could be fetched. Not taught.
9. **Apiiro's primary post** (§1.2) and **Check Point's original CVE-2026-21852 write-up** — both rendered empty; the figures are secondary and are labelled as such wherever used.
10. **Precision or recall for GitHub Copilot code review.** GitHub publishes volume and „actionable” share only. No independent audit exists.
11. **The SmartBear/Cisco study's own size.** The commonly repeated „2 500 reviews, 3,2 million lines, 50 developers” is not verified here and is **not** to be stated; the ratios are quoted from the page that does state them.
12. **A dated DHH statement on tests and AI-generated code**, 2025–2026. Nothing found. Böckeler's measured null result (§1.4) is the better-sourced dissent and is used instead.

---

## 8. What this file decides, and what it leaves to Viktar

**Decided here, on the evidence above:**

- **NUnit 4 via `dotnet new nunit`** — §3.1, with xUnit v2, xUnit v3 and MSTest rejected for named, verified reasons.
- **7b tests plain C# logic, not the window** — §3.5; headless Avalonia is *Czytaj dalej*.
- **7c teaches Copilot code review and Claude Code `/code-review`** and names the rest — §2.5.
- **7c's evidence section is the 71%-versus-0,066 pair**, each with its limitation — §2.2.
- **7f uses two incidents** (GitHub MCP, Nx s1ngularity) and the lethal trifecta — §5.5.
- **No regression percentage, no leaderboard score, no invented console output** — §7.

**Left open, and named in the module's briefs:**

- Every code block in 7b and 7d needs **one confirming run on a lab machine on SDK 10.0.4xx** before publication (§6). Until then the module stays `publish: false`.
- Whether students may sign in to the accounts 7c and 7d require is **open decision #2** and is not settled here.
- The exact rulesets label and the blocked-push screen (§7.5, §7.6) must be read off the live UI on the day.
