# Prompt — Research 04: the history of building mobile applications

|              |                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------- |
| Written      | 2026-08-29                                                                                    |
| Kind         | **Deep-research brief.** One single-shot prompt, meant to be pasted whole.                    |
| Produces     | `docs/content-research/research-04-mobile-app-history.md`                                     |
| Sibling of   | [`research-03-desktop-app-history.md`](research-03-desktop-app-history.md) — same shape, same rules, deliberately different argument |
| Feeds        | `course-structure-v1.md` — Moduł 4a and 4b primarily, 4c and the Semester 2 mobile modules secondarily |
| Run it in    | **Cowork**, or any agent session with web search. Not a spec slice — it produces no commit to `app/`. |
| Weighting    | **60 % programming languages, 40 % the rest of the lifecycle.** Enforced in the brief.        |
| Order        | **Run Research 03 first.** This brief tells the agent to read it and argue against it; without it, Part C cannot be written. |

## Why this exists

Moduł 4a is called *Co to jest aplikacja desktopowa, a co mobilna* — it has two
halves, and Research 03 only answers one. The mobile half cannot be written by
analogy from the desktop one, because the two histories differ in the way that
matters most for a lesson: **on mobile, the platform owner chooses your
language.** Apple made Objective-C compulsory, then made Swift; Google made
Java the default, then declared Kotlin-first. No desktop vendor ever held that
power, and the students will not notice it unless someone points at it.

Moduł 4b then needs the Xamarin → MAUI lineage explained, and that story is a
Windows Phone story before it is a .NET story.

## The time span

**Roughly 1996 → 2026, with 2007 as the hinge.** The Palm / Symbian / J2ME /
BlackBerry era gets real treatment rather than a dismissive paragraph — it is
where the constraints were invented — but the modern arc starts with the iPhone
SDK and the analysis weights accordingly.

This differs from Research 03's 1970s start, and it should: mobile's arc is
nineteen years, not fifty. That changes the *kind* of risk in the research. The
desktop problem is scarce and offline sources; the mobile problem is the
opposite — an enormous volume of vendor marketing, conference keynotes and
still-live blog posts, most of it written to sell something. See the sourcing
section.

## Notes before you paste it

- **Connectors that earn their place here:** *Microsoft Learn* (authless — the
  primary source for Windows Mobile, Windows Phone, Silverlight, Xamarin and
  the MAUI lineage, which is exactly what Moduł 4b needs), *Firecrawl* (paper
  search, and it reads archived and JS-heavy pages that plain fetch chokes on).
  Neither is required; both raise the hit rate on primary sources.
- Expect the agent to want to split this. If it does, let it write Part A
  first — that is the 60 %, and the half Moduł 4a needs most.
- It ends with a stop condition. If the agent starts drafting Polish, the
  prompt failed and that is worth an `sdd-journal.md` line.

---

## The prompt

```
You are doing a deep research pass for a course repository. Read the
instructions in full before searching, then work through them in order.

## What you are producing

One file: `docs/content-research/research-04-mobile-app-history.md`

It is research notes for the course owner (Viktar), not classroom material.
Written in English. Nothing here reaches a student directly — it is the
reasoning that will later decide what a lesson says.

The course is a 4th-year secondary-school course, *Aplikacje desktopowe i
mobilne*, running from 2026-09-01 in Poland. The students are 18-ish, will
write C# with an AI assistant, and have used smartphones their whole lives
without ever seeing one as a thing somebody had to build.

**Read these three files before you start, and treat them as context you must
not repeat:**

- `docs/content-research/research-03-desktop-app-history.md` — the desktop
  half of this pair. You are writing its sibling. Where it has already made an
  argument, cite it rather than remaking it, and where your evidence
  contradicts it, say so explicitly.
- `docs/content-research/research-01-ai-assisted-development.md`
- `docs/content-research/research-02-stack-tooling-constraints.md` — already
  holds the current .NET MAUI / Avalonia / Uno comparison. Do not redo it.
  Your job is the history that produced it.

## The topic

**How building a mobile application changed, from roughly 1996 to 2026 — and
why.**

Start with the constrained era: Palm OS, Symbian, BlackBerry, Java ME / MIDP,
WAP, Windows Mobile. That period is not a curiosity — it is where the
constraints that still shape mobile development were first met, usually
badly.

**2007–2008 is the hinge**: the iPhone, the App Store, the Android SDK. Weight
the analysis after it, but do not treat it as the beginning.

End in 2026, with the situation the course actually sits in.

## The weighting — this is the main instruction

**About 60 % of the document is about programming languages.** Not 60 % of the
sections; 60 % of the words, the evidence and the analytical effort. The
lifecycle material is real but subordinate. If you are on your fourth
paragraph about app-store review before the language argument is finished, you
have drifted.

## Part A — Languages (≈60 %)

Not a parade of language names. An argument, in which the chronology is
evidence.

**A1. The eras, and the language each one made obvious**
C and C++ on Palm OS and Symbian; Java ME / MIDP and the write-once-run-nowhere
promise; Objective-C from the 2008 iPhone SDK; Java on Android; C# on Windows
Mobile and then Windows Phone (Silverlight, then WinRT); Swift from 2014;
Kotlin from 2017 and Google's Kotlin-first declaration in 2019; JavaScript via
Cordova and then React Native; C# via Xamarin and then MAUI; Dart via Flutter;
Kotlin Multiplatform. For each: roughly when it was the obvious choice, what it
made easy that the previous one did not, and what it gave up.

**A2. The forces that actually moved the language**
This is the analytical spine. Trace each as its own thread across the whole
period, not era by era:

- **The platform owner picks the language.** The single biggest structural
  difference from desktop, and the thread to open with. Apple shipping Swift
  and deprecating Objective-C; Google's Kotlin-first announcement; Apple's
  historical restrictions on which languages and runtimes were even permitted
  in a shipped app, and how those rules changed. Establish what a vendor can
  and cannot compel, with sources — this is where a lesson lives.
- **Memory management under a hard budget.** Manual retain/release → ARC on
  iOS (2011) versus tracing GC on Android → ART. Argue why Apple chose
  compile-time reference counting where Android chose a collector, and what
  each costs in latency, battery and pause behaviour. Connect to Research 03's
  memory thread rather than restating it.
- **Null safety as a language answer to a mobile crash statistic.** Objective-C
  nil-messaging versus Java's NullPointerException are genuinely different
  failure modes; Swift optionals and Kotlin's nullable types are direct
  responses. If you can source a claim about how much of the crash volume this
  addressed, cite it with a date; if you cannot, say the claim is folklore.
- **Concurrency, the main thread, and an OS that kills you.** The frozen-window
  problem from Research 03 reappears with teeth: Android's ANR, iOS watchdog
  terminations. Trace callbacks → GCD (2009) → AsyncTask and its deprecation →
  Kotlin coroutines and structured concurrency → Swift `async`/`await` and
  actors (2021). Note where mobile and desktop converged on the same answer.
- **The app lifecycle as a language-visible problem.** Process death, saved
  state, Activity recreation, configuration changes. Nothing on desktop matches
  it, and it caused a decade of Android API churn (AsyncTask → Loaders →
  ViewModel → lifecycle-aware components). Treat that churn as evidence about
  the problem, not as a list of deprecations.
- **Binary size, cold start and battery as language constraints.** The 65k
  method limit and multidex, ProGuard and R8, app thinning, bitcode and its
  removal, Dart's tree shaking and AOT. Where a language feature exists because
  of a download size, say so.
- **How the UI gets described.** XML layouts and Interface Builder nibs then
  storyboards and Auto Layout → declarative UI: SwiftUI (2019), Jetpack Compose
  (2021), Flutter's widget tree. Argue the causation honestly: did mobile lead
  desktop here, follow React, or arrive in parallel? Research 03 asks the same
  question from the other side — reconcile the two answers or state the
  disagreement.
- **Cross-platform as a permanently re-litigated language question.** PhoneGap
  and Cordova, Titanium, Xamarin (2011), React Native (2015), Flutter (2017–18),
  Kotlin Multiplatform, MAUI. Ask why this question never stays answered, and
  what each generation claimed the previous one got wrong.
- **Interop and where the abstraction bleeds.** JNI, Objective-C ↔ Swift
  bridging, Flutter platform channels, React Native's bridge and its
  replacement. Every cross-platform framework leaks at the platform API; show
  where.

**A3. Ideas that were born on mobile and escaped it**
Coroutines and structured concurrency; ARC as a mainstream alternative to GC;
declarative UI reaching desktop through Compose Multiplatform and SwiftUI on
macOS; runtime permission prompts as a UX pattern; and the app-store
distribution model itself, which mobile exported back to the desktop. Source
each, and say where it lives now.

**A4. The languages and platforms that lost, and honestly why**
Java ME / MIDP, Symbian C++, BlackBerry, Windows Phone and the
Silverlight → WinRT → UWP lineage, Objective-C, Cordova. For each, separate
the technical reason from the commercial and ecosystem reasons. Windows Phone
is the important case for this course and deserves the most care: the C#/XAML
line that died there leads directly to Xamarin.Forms and then MAUI, which is
what the students may end up using. Avoid "X killed Y" framing without a cited
mechanism.

**A5. Measuring popularity, and why you should distrust it**
If you cite an index, a survey, a store statistic or a "% of apps built with"
figure, date it and state in one line what it measures and what it cannot see.
Vendor-published adoption numbers are marketing until proven otherwise; label
them as such.

**A6. What this arc means for a student writing C# in 2026**
Which of the above they will meet by name; why C# is a mobile option at all;
what MAUI inherited from Xamarin and Xamarin from Windows Phone. Short and
concrete — this is the payload for Moduł 4b.

## Part B — The rest of the development lifecycle (≈40 %)

- **The store as a gate with no desktop equivalent.** Review, rejection,
  approval latency, and the 30 % commission. Treat the commission as a force on
  what got built, not as a business-news item. Note any recent regulatory
  change with a date.
- **Signing and identity** — provisioning profiles, keystores, Play App
  Signing. Why losing a key is a category of disaster desktop developers do not
  have.
- **Release cadence, and the response to store latency.** You cannot patch a
  shipped binary. Staged rollouts, remote config and feature flags exist
  largely because of that. Trace the causation.
- **The compliance treadmill.** Target API level requirements with annual
  deadlines, OS version fragmentation, forced migrations. Desktop has no real
  equivalent, and it changes what "finished" means for an app.
- **Build and dependencies** — Ant → Gradle, Xcode build, CocoaPods →
  Carthage → Swift Package Manager. What each migration cost teams.
- **Testing** — emulators and simulators versus real devices, device farms,
  Espresso, XCTest, UI Automator. Say plainly why device-level testing stayed
  necessary, and connect to Research 03's argument about why UI testing stayed
  hard. This feeds Moduł 6.
- **After release** — crash and ANR telemetry, Crashlytics, store vitals
  dashboards as a quality bar the platform enforces rather than the team
  choosing.
- **Privacy as a lifecycle stage** — install-time permissions → runtime
  permissions (Android 6) → App Tracking Transparency (2021) → privacy
  manifests and nutrition labels. Each one changed what a team had to do before
  shipping.
- **CI/CD** — fastlane, TestFlight, internal testing tracks.

## Part C — Desktop and mobile, side by side (required, and short)

The section Moduł 4a is actually built from. Roughly a page, arguing three
things:

1. **What is genuinely different**, with the mechanism: the platform owner
   controls both language and distribution; the OS terminates your process; a
   store stands between you and your user; permissions are granted by the user
   at runtime; battery and cellular are hard budgets.
2. **What is the same**, and has been since 1984: the event loop, the single UI
   thread, keeping state out of the widget tree, the frozen-UI problem,
   install / update / uninstall.
3. **Where the two converged, roughly 2019–2026**: declarative UI on both
   sides; single-codebase frameworks targeting both (MAUI, Avalonia, Uno,
   Flutter, Compose Multiplatform, KMP); store-style distribution arriving on
   the desktop.

Then answer the question a student will actually ask: **in 2026, is "desktop
versus mobile" still a real distinction, or just a deployment target?** Take a
position and support it. A course named *Aplikacje desktopowe i mobilne* needs
an answer, and "it depends" is not one.

## Cross-cutting questions the document must answer explicitly

In their own section, near the end:

1. **What caused each transition** — hardware, economics, platform policy, or
   language design? Mobile has a fourth cause the desktop lacked: a vendor
   simply deciding. Say when that was the real reason.
2. **What is genuine progress and what is a cycle?** Native ↔ cross-platform,
   imperative ↔ declarative, web app ↔ installed app. Is 2026 a return with
   better tools, or a different place?
3. **What has not changed since 2008?**
4. **What was tried, failed, and came back?** — the mobile web versus native
   argument is the obvious candidate; treat it evenhandedly and with dated
   evidence rather than as a settled question.

## Sources and evidence

- **Every claim about the world carries a link and the date you checked it.**
  Repository rule (ADR-0008): a statement about what a tool does, what it cost,
  what a benchmark measured or what a platform requires needs a source, and
  where no source can be given the claim is not made. Explanations of concepts
  need no citation; checkable assertions do.
- **Links do two jobs, and the report must do both.** A link is evidence for
  the sentence it sits on, *and* a door for a reader who wants to go further:
  - **Inline, on the claim itself** — at the point the assertion is made, not
    only collected at the bottom. A reader should never have to guess which
    entry in the Sources list backs the paragraph they are reading.
  - **Deep enough to be worth opening** — the specific release note, session,
    policy page or commit, not a product homepage. Where the evidence is one
    line in a long document, say where to look.
  - **Enough of them** — every substantive subsection of Parts A and B carries
    several. A subsection with none is unsourced opinion, or should be cut.
  - **Openable** — prefer free, stable, public URLs. Cite paywalled or offline
    sources where they are the best available, mark them as such, and add a
    free alternative alongside where one exists.
- **Some links are doors, not evidence.** Include pointers a curious reader can
  follow — a canonical talk, a design document, a still-running open-source
  project worth reading. Label them as further reading rather than passing them
  off as support for a claim.
- **This field's specific hazard is volume, not scarcity.** Almost everything
  here has been written about a thousand times, mostly by someone selling a
  framework. Prefer, in order: the platform's own documentation, release notes
  and deprecation notices; conference sessions by the engineers who built the
  thing (WWDC, Google I/O, Droidcon); the actual commit or design document;
  contemporaneous reporting. A listicle is not a source.
- **Vendor claims get labelled as vendor claims.** "Google says Kotlin reduced
  crashes by X" is reportable as a Google claim with a date, not as a fact
  about the world.
- **Mobile's links rot faster than desktop's.** Deprecation pages get deleted,
  developer blogs get migrated, old SDK docs vanish. Where a source has already
  gone, use an archived copy and cite it as archived with the capture date.
- **Mark confidence.** Where sources disagree or the record is folklore, write
  that. "Widely repeated, poorly sourced" is a legitimate finding.
- Institutional facts about the school — timetable, lab machines, the INF.04
  exam scope — are not yours to assert. Mark any as `TO CONFIRM`.

## Tools

If a Microsoft Learn search tool is available, use it for anything touching
Windows Mobile, Windows Phone, Silverlight, UWP, Xamarin or MAUI — it is the
primary source for the lineage Moduł 4b depends on. If a paper-search or
scraping tool is available, use it for academic sources and for pages that
ordinary fetching cannot read. Neither is required; ordinary web search is.

## Shape of the output file

Match the sibling research files:

1. `# Research 04 — <title>` and a header table: `Written`, `For`, `Status`,
   `Feeds`.
2. A short framing note stating the time span and the relationship to
   Research 03.
3. **One timeline table**, compact — era, dominant language(s), how the UI was
   described, how it shipped, who controlled the distribution. One table, not
   five. The prose carries the argument.
4. Part A, Part B, Part C, the cross-cutting questions.
5. **`## What this means for the course`** — concrete, addressed to Moduł 4a
   first (the mobile half of "what is a desktop app, what is a mobile app"),
   then 4b (why C# is a mobile option, and what MAUI inherited), then 4c and
   the Semester 2 mobile modules. Say what should be taught, what should be
   mentioned once, and what should be left out because it is interesting to you
   and useless to them.
6. **Further reading where a reader would want it** — each major section of
   Parts A and B ends with two or three links that best repay opening, one
   clause each on what they give.
7. **`## What rots`** — which claims here have a short shelf life. This field
   rots faster than the desktop one; be specific about what to re-check before
   the lesson is written next year.
8. **`## Sources`** — grouped, full URLs, one line on what each supports, the
   date checked, and a mark for primary / vendor / secondary / archived. It
   should read as a reading list someone could work through, not a bibliography
   that proves you did the work.

Length: comparable to `research-02` and `research-03`. Cut any section that has
nothing sourced to say rather than padding it.

## What not to do

- Do not write the desktop document again with different nouns. If a paragraph
  would be equally true in Research 03, either cite Research 03 or cut it.
- Do not write nostalgia, and do not write launch-keynote prose. "The iPhone
  changed everything" is not a finding.
- Do not produce a list of languages with a paragraph each. A1 is scaffolding
  for A2, not the deliverable.
- Do not redo `research-02` §2. The current framework comparison exists; you
  are writing the history that produced it.
- Do not invent dates, version numbers, prices, adoption percentages or crash
  statistics. If you cannot source it, drop the claim and say the record is
  unclear.
- Do not write any Polish. Do not draft lesson text. Do not propose changes to
  `content/`, `app/`, `specs/` or the course structure.

## Stop condition

Write `docs/content-research/research-04-mobile-app-history.md` and stop.
No other file is created or edited — including Research 03, even if you now
disagree with it; record the disagreement inside your own file. If the research
turns up something that should change `course-structure-v1.md`, note it in
"What this means for the course" as a proposal and do not make the edit.

Before you stop, re-read your own draft against four checks and fix what fails:
1. Is Part A about 60 % of the document by weight?
2. Does every checkable claim have a link and a date, inline, on the claim —
   and is every vendor claim labelled as one?
3. Could a curious reader take any major section and keep going from the links
   in it alone?
4. Does Part C give Moduł 4a a real answer to "desktop versus mobile — is it
   still a distinction?", or does it hedge?
```
