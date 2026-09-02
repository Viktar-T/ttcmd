# Research 04 — How building a mobile application changed, 1996–2026

| | |
| --- | --- |
| Written | 2026-08-29 |
| For | Course structure v1.0 — *Aplikacje desktopowe i mobilne* |
| Status | **Research notes.** Repo-facing English (Article III). Not course content, not law. |
| Feeds | `course-structure-v1.md` — Moduł 4a/4b primarily, 4c and the Semester 2 mobile modules (7–9) secondarily |
| Length | **Longer than `research-01` and `research-02`**, because Part A carries nine analytical threads and Part B nine more, each sourced inline. Part A is ~55% of the document by weight. Part B is deliberately compact: `research-02` §5 already holds the distribution, cost and account material, and this file does not restate it. The sections are navigable independently and meant to be mined, not read straight through. |

> **Time span.** Roughly 1996 to 2026 — from the constrained handhelds through the
> 2007–2008 hinge to the situation this course actually sits in.
>
> **Sourcing.** ADR-0008 applies throughout: a checkable claim carries a link.
> **All sources here were checked on 2026-08-29.** Where a page could not be
> retrieved directly, or exists only as a mirror or a contemporaneous quotation,
> the text says so on the claim rather than in a footnote; where a figure is live
> and moving, the date it was true is stated inline. Vendor claims are marked **[vendor]** where a company is asserting
> something about its own product's adoption or success. Where the record is
> folklore, the text says so rather than picking the tidier version.
>
> **Article V applies.** Nothing here asserts a fact about the school. Where one
> would be needed it is marked `TO CONFIRM`.

---

## A note on Research 03, and on the file numbering

**Research 03 was written on the same day as this file, in a parallel session.**
When I began, `docs/content-research/research-03-desktop-app-history.md` did not
exist and I worked from its brief; it appeared while this document was being
drafted, and every cross-reference below has been re-checked against **the actual
text** rather than the brief. Where I refer to it I cite its section, as
`[R03 §A2.4]`.

**Two things Viktar needs to know before reading either file.**

**1. There is a numbering collision, and it is now four files wide.**
`docs/content-research/` currently contains
`research-03-building-desktop-apps.md` *and*
`research-03-desktop-app-history.md`, plus
`research-04-building-mobile-apps.md` *and* this file. Research 03 flags the
problem for its own pair and proposes renumbering without doing it. **The same
applies here, and I have likewise made no edit** (stop condition). The
distinction is the same on both sides: the `-building-` files answer *what
building an app looks like in 2026*; the `-history` files answer *how it got that
way and why*. The README's file table lists none of the four. **Renumbering and
a README update are proposed, not done.**

**2. Where the two history files stand relative to each other.** I checked the
four places the briefs asked us to reconcile:

| Question | Research 03 | This file | Status |
| --- | --- | --- | --- |
| Is declarative UI a return to 1985? | "It is a different place, and the difference is not the syntax" `[R03 §A2.4]` | Same conclusion, reached independently (A2.7) | **Agreement**, and worth trusting more for having been reached twice |
| Memory: why reference counting? | "determinism turned out to matter more than the theoretical elegance of tracing GC where latency is visible" `[R03 §"What was tried, failed, and came back"]` | I searched for a stated vendor rationale and found none; the *why* is folklore (A2.2) | **Mild disagreement.** R03's sentence is a sound inference, not a sourced claim. Both can stand if R03's is read as interpretation |
| Why did UI testing stay hard? | No seam; the accessibility layer is the only general answer and is opt-in per control `[R03 §B5]` | Agreed, plus the device itself became a variable (B6) | **Complementary**, not competing |
| What has not changed since 1984? | Six-row table `[R03 §"What has not changed since 1984"]` | Not restated; Part C §2 points at it and adds only the mobile enforcement mechanism | **Deliberate non-duplication** |

## The shape of the period

One orientation table. The prose carries the argument.

| Era | Dominant language(s) | How the UI was described | How it shipped | Who controlled distribution |
| --- | --- | --- | --- | --- |
| ~1996–2002 · handheld | C, C++ (Palm OS, Symbian) | Hand-built forms and resource files; imperative widget code | Desktop sync cradle, IR beam, floppy-era mentality | Nobody. You gave the user a file |
| ~1998–2007 · feature phone | Java ME / MIDP, WML | `Canvas`/`Form` in code; WML decks | Over-the-air download, carrier deck | **The carrier.** Portal placement decided everything |
| ~2003–2010 · Windows Mobile | C++, then **C#** (.NET Compact Framework) | Windows CE dialogs, then XAML on WP7 | CAB files, sideload, operator channels | Mostly nobody, then Microsoft |
| 2008–2014 · the first smartphone decade | Objective-C (iOS), Java (Android) | Interface Builder nibs → storyboards; Android XML layouts | **App Store / Play** | **The platform owner** |
| 2014–2019 · the vendor-language turn | Swift, Kotlin, C# (Xamarin), JS (RN), Dart | Storyboards + Auto Layout; XML + ConstraintLayout | Store, with review and staged rollout | Platform owner, now with an enforced quality bar |
| 2019–2026 · declarative and cross-platform | Swift, Kotlin, Dart, C#, TS | **SwiftUI, Jetpack Compose, Flutter widgets** — code-as-UI | Store + app bundles + annual API-level deadlines | Platform owner, under active regulatory attack |

---

# Part A — Languages

## A1. The eras, and the language each one made obvious

Scaffolding for A2, not the deliverable. One line each on what the language made
easy and what it cost.

**C on Palm OS (from 1996).** Palm's *Programmer's Companion* gives every
application a single entry point, `PilotMain`, and an event loop that calls
`EvtGetEvent` and dispatches until an `appStopEvent`
([Palm OS Programmer's Companion, ch. 4](https://stuff.mit.edu/afs/sipb/project/pilot/doc/Companion.pdf)).
The dynamic heap was 32–256 KB depending on device and OS version, and no memory
chunk could exceed slightly under 64 KB
([Palm memory management chapter, mirrored](https://www.fuw.edu.pl/~michalj/palmos/Memory.html) —
the original palmos.com hosting is gone; this is a mirror of the official SDK
doc, and archive.org was unreachable from this session to cross-check it, so
treat the exact byte figures as **medium confidence**). C made the machine
addressable. It gave up every abstraction: you segmented your own code because
the format forced you to.

**C++ on Symbian (from ~1998).** Symbian C++ is the clearest case in this whole
document of a language dialect invented by a memory budget. It replaced C strings
with *descriptors* — `TPtrC` is described in Nokia's own developer library as
"the equivalent of using `const char*`"
([Symbian Developer Library, descriptors](https://katastrophos.net/symbian-dev/GUID-21627ABC-AA70-4837-89A1-28BD9B2FD4B0.html));
it replaced C++ exceptions with *leaves* and a *cleanup stack*; and it forbade
constructors that can fail, requiring **two-phase construction** — "a constructor
must never leave", so allocation moves into a separate `ConstructL()` called by a
`NewL()` factory
([Symbian Developer Library, two-phase construction](https://katastrophos.net/symbian-dev/GUID-48AD5B98-DBA8-4601-A158-12559985BCEB.html)).
Concurrency was *active objects* on a cooperative scheduler rather than threads
([S60 3rd Ed. C++ Developer's Library, active objects](https://docs.huihoo.com/symbian/s60-3rd-edition-cpp-developers-library-v1.1/GUID-35228542-8C95-4849-A73F-2B4F082F0C44/html/SDL_93/doc_source/guide/Base-subsystem-guide/e32/InterProcessCommunication/AsynchronousServicesGuide/AsynchronousServicesGuide3/IntroductionToActiveObjectsScheduler.guide.html)).
Every one of those is a correct engineering answer to a device with no virtual
memory and no room for a stack unwinder. Together they made Symbian C++ a
language almost nobody could hire for.

**Java ME / MIDP (2000–~2012).** CLDC 1.0 was finalised 2000-05-30
([JSR 30](https://jcp.org/en/jsr/detail?id=30)); MIDP 1.0 on 2000-09-19
([JSR 37](https://jcp.org/en/jsr/detail?id=37)); MIDP 2.0 on 2002-11-20
([JSR 118](https://jcp.org/en/jsr/detail?id=118)); CLDC 1.1 restored floating
point on 2003-03-27 ([JSR 139](https://jcp.org/en/jsr/detail?id=139)). Sun's own
KVM white paper of 2000-05-19 states the constraints plainly: "No support for
floating point data types", "No reflection features", a VM core of 40–80 KB and
a total budget of "no more than a few hundred kilobytes"
([Sun, *The K Virtual Machine (KVM)*, PDF](https://www.oracle.com/a/tech/docs/java/kvmwp.pdf)).
Java ME bought portability of *syntax* and gave up portability of *behaviour* —
see A4.

**C# on Windows Mobile (from 2003).** The date C# became a supported way to write
a mobile application is 2003-03-19, when Microsoft shipped the .NET Compact
Framework with Visual Studio .NET 2003, explicitly to "enable millions of desktop
Visual Basic developers and the rapidly growing market of C# developers to begin
building smart mobile applications"
([Microsoft press release, 2003-03-19](https://news.microsoft.com/source/2003/03/19/microsoft-launches-mobile-developer-solution-featuring-net-compact-framework)
**[vendor]**). This matters for Moduł 4b: C# is not a newcomer to mobile. It has
been there, in some form, longer than Objective-C has been on a phone.

**Objective-C on iOS (2008).** Apple's initial position in 2007 was that third
parties should write *web* apps
([Apple press release, 2007-06-11](https://www.apple.com/newsroom/2007/06/11iPhone-to-Support-Third-Party-Web-2-0-Applications/));
the native SDK beta came on 2008-03-06
([Apple press release](https://www.apple.com/newsroom/2008/03/06Apple-Announces-iPhone-2-0-Software-Beta/)).
Objective-C brought a mature, dynamic, message-passing object model and a
20-year-old framework stack (NeXT's) to a phone. It gave up compile-time safety
almost entirely — see A2.3.

**Java on Android (2008).** Android 1.0's SDK shipped 2008-09-23
([Android Developers Blog](https://android-developers.googleblog.com/2008/09/announcing-android-10-sdk-release-1.html)),
with the T-Mobile G1 on 2008-10-22
([T-Mobile press release](https://www.t-mobile.com/news/press/t-mobile-launches-the-highly-anticipatedt-mobile-g1)).
Critically, it was Java *syntax* on a **register-based** VM of Google's own
design, not a JVM — Dan Bornstein's Google I/O 2008 slides argue the register
machine "avoids instruction dispatch", "avoids unnecessary memory access" and
uses ~30% fewer instructions than a stack machine
([Dalvik VM Internals, slides](http://www.kandroid.org/board/data/board/AndroidBeginner/file_in_body/1/2008-05-29-Presentation-Of-Dalvik-VM-Internals.pdf)).
Java bought Google an enormous existing developer population. It gave up
determinism (A2.2) and, for a decade, null safety (A2.3).

**Swift (2014), Kotlin (2017/2019), Dart (2018), the cross-platform set.** Each
is treated as evidence in A2 rather than described here.

---

## A2. The forces that actually moved the language

### A2.1 The platform owner picks the language

**This is the structural difference from the desktop, and everything else in
Part A is downstream of it.** On the desktop, a language wins by persuading
developers. On mobile, it can win by being chosen — and the mechanism by which a
vendor makes a choice stick is worth establishing precisely, because the popular
version of this story is wrong in both directions.

**What Apple actually compelled.** In April 2010 Apple added to its iOS Developer
Program License Agreement the clause now known as **§3.3.1**: applications "must
be originally written in Objective-C, C, C++, or JavaScript as executed by the
iPhone OS WebKit engine", and apps that "link to Documented APIs through an
intermediary translation or compatibility layer or tool are prohibited". The
agreement was under NDA and never published, so the clause survives only in
contemporaneous quotation — see
[a developer's copy, 2010-04-11](https://blog.rakeshpai.me/2010/04/section-331-of-iphone-sdk-license.html)
and [Daring Fireball's verbatim quotation of the "old text", 2010-09-09](https://daringfireball.net/2010/09/app_store_guidelines).
**Confidence: high on the wording (two independent contemporaneous
reproductions agree), but there is no primary copy.** Apple's public rationale
was Steve Jobs' "Thoughts on Flash" of 2010-04-29: "letting a third party layer
of software come between the platform and the developer ultimately results in
sub-standard apps and hinders the enhancement and progress of the platform." The
original apple.com page now 404s and archive.org was unreachable from this
session; the text is taken from two independent same-day reproductions
([OSXDaily](https://osxdaily.com/2010/04/29/steve-jobs-posts-his-thoughts-on-flash/),
[ABC News](https://abcnews.com/Technology/apples-steve-jobs-posts-public-letter-adobe-flash/story?id=10508997)).

**And what it gave back, five months later.** On 2010-09-09 Apple published a
press release "relaxing all restrictions on the development tools used to create
iOS apps, as long as the resulting apps do not download any code", and — in the
same breath — published the App Store Review Guidelines for the first time
([Apple, 2010-09-09](https://www.apple.com/newsroom/2010/09/09Statement-by-Apple-on-App-Store-Review-Guidelines/)).
This is the single most instructive five months in mobile development history.
The vendor asserted control over *source language*, took five months of public
argument, and retreated to control over *runtime behaviour* instead. Xamarin,
Flutter, React Native and MAUI all exist inside the space that retreat opened.

**The rule that replaced it is still in force.** Current Guideline **2.5.2**:
apps "may not download, install, or execute code which introduces or changes
features or functionality of the app", with a narrow carve-out for educational
apps that teach coding
([App Store Review Guidelines, Software Requirements](https://developer.apple.com/app-store/review/guidelines/#software-requirements),
checked 2026-08-29). Guideline **2.5.6** separately requires WebKit for
browsing, with an entitlement route for alternative engines in the EU and Japan
(same page). This is why every managed-code framework on iOS must compile
ahead of time. Microsoft's own MAUI documentation states the constraint from the
outside: "there is a security restriction on iOS, set by Apple, which disallows
the execution of dynamically generated code on a device"
([.NET MAUI, iOS interpreter](https://learn.microsoft.com/en-us/dotnet/maui/macios/interpreter?view=net-maui-9.0)
**[vendor, describing another vendor's rule]**).

**Google's mechanism is different and the difference is the lesson.** Kotlin
became officially supported on 2017-05-17
([Android Developers Blog](https://android-developers.googleblog.com/2017/05/android-announces-support-for-kotlin.html));
on 2019-05-07 Google declared that "Android development will become increasingly
Kotlin-first. Many new Jetpack APIs and features will be offered first in Kotlin"
([Google I/O 2019 announcement](https://android-developers.googleblog.com/2019/05/google-io-2019-empowering-developers-to-build-experiences-on-Android-Play.html)).
But Google has never banned Java: its own Kotlin-first page still shows full Java
support across the platform SDK, Android Studio, lint and AndroidX, while listing
Jetpack Compose as Kotlin-only
([developer.android.com/kotlin/first](https://developer.android.com/kotlin/first)).
**Apple compelled by contract and then retreated to a runtime rule; Google
steers by making the good new things reachable only from one language.** Steering
is slower and much harder to argue with.

**Apple has not deprecated Objective-C — correcting the brief.** The brief for
this file says "Apple shipping Swift and deprecating Objective-C". I could find
no formal deprecation notice anywhere. The Objective-C runtime documentation
carries no deprecation banner
([developer.apple.com/documentation/objectivec](https://developer.apple.com/documentation/objectivec)),
and Apple's own Swift page frames the relationship as coexistence: "Swift code
coexists alongside your Objective-C and C++ files in the same project"
([developer.apple.com/swift](https://developer.apple.com/swift)). What is true is
*de facto* obsolescence by omission: SwiftUI, SwiftData and Swift Charts have no
Objective-C interface at all
([SwiftUI](https://developer.apple.com/documentation/swiftui),
[SwiftData](https://developer.apple.com/documentation/swiftdata),
[Swift Charts](https://developer.apple.com/documentation/charts)), whereas
UIKit's `UIView` still carries the Objective-C class symbol `c:objc(cs)UIView`
in its documentation metadata
([UIView](https://developer.apple.com/documentation/uikit/uiview)). **The finding
is more interesting than the folklore: Apple did not kill Objective-C, it stopped
building the future in it.** Swift itself was announced 2014-06-02, open-sourced
2015-12-03 ([Apple](https://www.apple.com/newsroom/2015/12/03Apple-Releases-Swift-as-Open-Source/)),
reached 6.0 on 2024-09-17 ([swift.org](https://www.swift.org/blog/announcing-swift-6/)),
and — a genuinely surprising 2026 development — shipped its first official
Android SDK in Swift 6.3 on 2026-03-24
([swift.org](https://www.swift.org/blog/swift-6.3-released/)).

**What a vendor cannot compel, as far as the record shows: nothing, yet.** I
checked this specifically, because it is where a lesson lives. Regulation has
attacked *distribution* and *payments* and has not touched *language*. The EU
DMA produced alternative marketplaces and alternative browser engines from
iOS 17.4 in March 2024
([Apple, 2024-01-25](https://www.apple.com/newsroom/2024/01/apple-announces-changes-to-ios-safari-and-the-app-store-in-the-european-union/));
the one technical capability it prised open — JIT compilation — was granted only
to *authorised browser engines*, and only in the EU
([Apple, alternative browser engines](https://developer.apple.com/support/alternative-browser-engines/)).
Epic v. Apple, through the Ninth Circuit's 2025-12-11 opinion, is entirely about
anti-steering, link-outs and commissions
([Ninth Circuit opinion, PDF](https://cdn.ca9.uscourts.gov/datastore/opinions/2025/12/11/25-2935.pdf)).
Japan's Mobile Software Competition Act guidelines cover distribution, data,
interoperability and security, and contain no provision about programming
languages
([JFTC guidelines, PDF](https://www.jftc.go.jp/file/MSCA_Guidelines_tentative_translation.pdf)).
**Finding: after fifteen years of litigation and two major regulatory regimes,
the platform owner's control over which language you may compile from is the one
lever nobody has taken away.**

> **Further reading.**
> [Apple's 2010-09-09 statement](https://www.apple.com/newsroom/2010/09/09Statement-by-Apple-on-App-Store-Review-Guidelines/) — three paragraphs that created the cross-platform industry.
> [The current App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) — read 2.5.2 and 4.7 side by side; the whole design space of remote configuration sits between them.
> [developer.android.com/kotlin/first](https://developer.android.com/kotlin/first) — what "steering rather than compelling" looks like when written down by the steerer.

### A2.2 Memory management under a hard budget

`[R03 §A2.1]` runs the desktop memory thread — manual → counted → traced → owned
— and is not restated here. **The mobile question is not which technique but why
the two phones diverged**, and the honest answer includes an admission.

iOS never had a tracing collector. Apple's own documentation states it flatly:
"Garbage collection is not available in iOS"
([Introduction to Garbage Collection, archived Apple docs](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/GarbageCollection/Introduction.html)).
Objective-C GC existed on the Mac only, and the same page carries its deprecation
notice for OS X 10.8. **A correction worth recording:** the commonly repeated
"removed in macOS 10.13" is not what Apple's live documentation says —
`NSGarbageCollector`'s availability metadata reads macOS 10.5–10.10
([NSGarbageCollector](https://developer.apple.com/documentation/foundation/nsgarbagecollector)).
Use 10.10, or say the record is inconsistent.

ARC arrived with Xcode 4.2 in 2011
([Xcode 4.2 release notes](https://developer.apple.com/library/archive/releasenotes/IDEs/whatsnewxcode4/Articles/xcode_4_2.html);
WWDC 2011 session 323 is the canonical talk,
[developer.apple.com/videos/play/wwdc2011/323](https://developer.apple.com/videos/play/wwdc2011/323/)).
The technically decisive point is in the Clang specification, not the marketing:
ARC is a **compile-time transformation** that inserts retain/release, and "It does
not provide a cycle collector; users must explicitly manage the lifetime of their
objects, breaking cycles manually or with weak or unsafe references"
([Clang ARC specification](https://clang.llvm.org/docs/AutomaticReferenceCounting.html)).
That single sentence is the whole trade: deterministic deallocation, no collector
thread, no pause — in exchange for `weak`/`unowned` becoming the programmer's
permanent responsibility
([The Swift Programming Language, ARC](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting/)).

Android went the other way and then spent a decade paying for it in engineering.
Dalvik's collector was mark-and-sweep with staged pauses around 10 ms, and
suffered chronic heap fragmentation — described by Romain Guy, a Google engineer
on the framework and graphics team, in
[*Talking Trash: The Evolution of Garbage Collection on Android*](https://speakerdeck.com/romainguy/talking-trash-the-evolution-of-garbage-collection-on-android).
ART became the exclusive runtime in Android 5.0
([Android Developers Blog, October 2014](https://android-developers.googleblog.com/2014/10/whats-new-in-android-50-lollipop.html)
**[vendor]**); Android 7.0 added a JIT back alongside AOT with profile-guided
compilation, done "only when the device is idle and charging"
([Android 7.0 for developers](https://developer.android.com/about/versions/nougat/android-7.0));
Android 8.0's concurrent copying collector claims "32% smaller heap sizes on
average", allocations "70% faster", and "85% smaller pause times" versus 7.0
([source.android.com, ART improvements](https://source.android.com/docs/core/runtime/improvements)
**[vendor — Google's own benchmark of its own runtime]**). Baseline Profiles now
claim ~30% faster first-launch code execution
([Baseline Profiles overview](https://developer.android.com/topic/performance/baselineprofiles/overview)
**[vendor]**).

**The honest part, and a disagreement with Research 03.** `[R03 §"What was tried,
failed, and came back"]` writes that with reference counting "determinism turned
out to matter more than the theoretical elegance of tracing GC where latency is
visible." That is a good inference and I believe it is right — but I went looking
for the *stated* reason on both sides and found none. No WWDC session, LLVM design note or Apple engineer statement gives the reason;
no Google statement defends the choice of a tracing collector as opposed to
describing its later optimisation.
**The "why" here is folklore: widely repeated, poorly sourced.** What *is*
sourced is the consequence, and it is enough to teach from: Apple's approach has
no pause by construction and hands you cycles; Google's approach needed
RosAlloc, concurrent copying, generational collection and compaction, over about
eight years, to drag pause times down toward a frame budget. The engineering
effort visible in that list is itself the evidence about which problem is harder
on a device with a hard memory ceiling.

> **Further reading.**
> [The Clang ARC specification](https://clang.llvm.org/docs/AutomaticReferenceCounting.html) — short, precise, and the only place the mechanism is stated without marketing.
> [Romain Guy, *Talking Trash*](https://speakerdeck.com/romainguy/talking-trash-the-evolution-of-garbage-collection-on-android) — the Android GC story told by someone who was there.
> [source.android.com ART improvements](https://source.android.com/docs/core/runtime/improvements) — Google's own numbers, useful precisely because you can see what they chose to measure.

### A2.3 Null safety as a language answer to a crash statistic

Objective-C and Java fail differently, and the two mobile languages that followed
them are direct answers to their respective failure modes.

In Objective-C, "it is valid to send a message to nil—it simply has no effect at
runtime", returning 0/nil for most return types and *undefined* values for some
([Apple, Objective-C objects and classes](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjectiveC/Chapters/ocObjectsClasses.html)).
A nil bug is therefore **silent**: the screen is blank, the row is empty, nothing
crashes, and nothing is logged. In Java a null dereference is a
`NullPointerException` and the app dies where the mistake is. **Silent-wrong
versus loud-dead is a genuine design difference, and it explains why the
responses differ in emphasis** — Swift's optionals make absence a distinct type
you must unwrap
([The Swift Programming Language, Optionals](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics/#Optionals)),
while Kotlin's nullable types explicitly frame themselves as a fix for the crash:
"Null safety is a Kotlin feature designed to significantly reduce the risk of
null references, also known as The Billion-Dollar Mistake"
([kotlinlang.org, Null safety](https://kotlinlang.org/docs/null-safety.html)).
That phrase is Tony Hoare's, from QCon London 2009 — "I call it my billion-dollar
mistake. It was the invention of the null reference in 1965"
([InfoQ recording](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/),
[QCon London abstract](https://qconlondon.com/london-2009/qconlondon.com/london-2009/presentation/Null%2BReferences_%2BThe%2BBillion%2BDollar%2BMistake.html)).

**The crash statistic, handled properly.** The number everyone repeats — "Kotlin
apps crash 20% less" — is real, is Google's, and has no published methodology.
The original is a post by a Google Android Developer Advocate dated 2020-10-29:
"Apps built with Kotlin are 20% less likely to crash", derived from an unexplained
analysis of "the top 1,000 apps on Google Play", alongside two customer anecdotes
(Swiggy: 50% fewer crashes; Google Home: "a 33% decrease in Null Pointer crashes")
([Android Developers on Medium, 2020-10-29](https://medium.com/androiddevelopers/fewer-crashes-and-more-stability-with-kotlin-b606c6a6ac04)
**[vendor]**). The same figure is still on Google's own landing page today
([developer.android.com/kotlin](https://developer.android.com/kotlin), checked
2026-08-29, **[vendor]**). The post states no time period, no sample selection
criteria, no data source and no confidence interval. **Verdict: reportable as a
Google claim of 2020, not as a fact about the world. I found no independent,
non-vendor measurement of null-related crash rates on mobile at all** — which is
itself worth saying to students, because it is the normal condition of evidence
in this industry.

The same idea reached C# late and by a different route: nullable reference types
in C# 8, September 2019, "entirely a compile-time feature" that leaves runtime
behaviour unchanged — and Microsoft's own documentation name-checks the
predecessors: "If you worked with Kotlin's nullable types, TypeScript's
strictNullChecks, or Swift's optionals, the model is familiar"
([Microsoft Learn, nullable reference types](https://learn.microsoft.com/dotnet/csharp/fundamentals/null-safety/nullable-reference-types);
[C# version history](https://learn.microsoft.com/dotnet/csharp/whats-new/csharp-version-history#c-version-80)).
**For Moduł 4b that is a clean, sourced line: the mobile languages got there
first, and C# followed them, by Microsoft's own account.**

> **Further reading.**
> [Hoare's QCon 2009 talk](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/) — the origin of the phrase, from the man who made the mistake.
> [Kotlin's null-safety page](https://kotlinlang.org/docs/null-safety.html) — a language documenting itself as a response to a bug class.
> [The 2020 Google crash post](https://medium.com/androiddevelopers/fewer-crashes-and-more-stability-with-kotlin-b606c6a6ac04) — worth opening as an exercise in reading a vendor claim critically.

### A2.4 Concurrency, the main thread, and an OS that kills you

`[R03 §A2.3]` establishes the frozen window as a desktop constant, and its
"what has not changed since 1984" table lists **"the frozen window, and its
five-second timeout"**, sourced to Microsoft's *Preventing Hangs in Windows
Applications*. That five seconds is worth pausing on, because **Android's ANR
threshold is also five seconds** — two vendors, two decades apart, independently
picking the same number for how long a person will tolerate a dead interface.

**On mobile the constant acquires an enforcement mechanism: block the main thread
and the operating system kills your process.** That is the entire difference, and
it is why concurrency became a *language* feature here rather than a library.

The thresholds are published and specific. Android: "If your app has not
responded to an input event... within 5 seconds"
([ANR documentation](https://developer.android.com/topic/performance/vitals/anr)),
with AOSP source giving 10 s for foreground broadcasts and 60 s for background
([ActivityManagerService.java](https://github.com/aosp-mirror/platform_frameworks_base/blob/master/services/core/java/com/android/server/am/ActivityManagerService.java)),
and 20 s / 200 s for foreground / background services
([ActivityManagerConstants.java](https://github.com/aosp-mirror/platform_frameworks_base/blob/master/services/core/java/com/android/server/am/ActivityManagerConstants.java)).
iOS is deliberately vaguer but no gentler: the watchdog kills you with
`0x8badf00d`, "pronounced 'ate bad food'"
([Apple, Addressing watchdog terminations](https://developer.apple.com/documentation/xcode/addressing-watchdog-terminations);
[SIGKILL reference](https://developer.apple.com/documentation/xcode/sigkill)).
**Apple publishes the exception code and not the time limit** — a small, real
asymmetry worth noticing.

The response arc: callbacks and manual threads, then Grand Central Dispatch —
blocks plus queues, letting you "execute arbitrary blocks of code either
asynchronously or synchronously"
([Apple, Concurrency Programming Guide](https://developer.apple.com/library/archive/documentation/General/Conceptual/ConcurrencyProgrammingGuide/GCDWorkQueues/GCDWorkQueues.html);
open-sourced 2009-09-14 per
[TidBITS](https://tidbits.com/2009/09/14/apple-releases-grand-central-dispatch-as-open-source/) —
I could not find an Apple page dating GCD's introduction, so the 2009 date is
**secondary only**). On Android, `AsyncTask` — deprecated in API 30 with the
terse instruction to "Use the standard `java.util.concurrent` or Kotlin
concurrency utilities instead"
([API 30 diff](https://developer.android.com/sdk/api_diff/30/changes/android.os.AsyncTask);
[AsyncTask reference](https://developer.android.com/reference/android/os/AsyncTask)).
The AOSP source is more candid than the docs about why: a single global pool
"results in suboptimal behavior for different tasks", and serialising everything
"results in excessive queuing for unrelated operations"
([AsyncTask.java](https://github.com/aosp-mirror/platform_frameworks_base/blob/master/core/java/android/os/AsyncTask.java)).
Then Kotlin coroutines — experimental in 1.1 (March 2017,
[JetBrains](https://blog.jetbrains.com/kotlin/2017/03/kotlin-1-1/)), stable in 1.3
on 2018-10-29 ([Kotlin 1.3 release notes](https://kotlinlang.org/docs/whatsnew13.html))
— and Swift's `async`/`await` and actors in Swift 5.5, 2021
([SE-0296](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0296-async-await.md),
[SE-0304](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0304-structured-concurrency.md),
[SE-0306](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0306-actors.md)).

**Where mobile and desktop converged — and the receipts, because this is the
kind of claim usually asserted without them.** C# 5 shipped `async`/`await` in
August 2012, designed against a desktop GUI problem
([C# version history](https://learn.microsoft.com/dotnet/csharp/whats-new/csharp-version-history#c-version-50)).
Did the mobile languages follow it? I checked the design documents directly:

- **Kotlin: yes, explicitly and repeatedly.** The coroutines KEEP, by Andrey
  Breslav and Roman Elizarov, names C# three times — "asynchronous computations
  (handled by `async`/`await` in C# and other languages)"; "no special keywords
  (like `async` and `await` in C#, JS and other languages)"; "lazily computed
  sequences (handled by `yield` in C#, Python and many other languages)"
  ([KEEP-0164](https://github.com/Kotlin/KEEP/blob/main/proposals/KEEP-0164-coroutines.md)).
- **Swift: barely, and not where you would expect.** SE-0296 mentions C# once,
  as a *naming convention to avoid*. SE-0304 does not mention it at all. Only
  SE-0306 (actors) cites prior art directly: Microsoft Orleans "is perhaps
  closest to the Swift approach described here, because it is built on top of a
  language that provides async/await (C#)"
  ([SE-0306](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0306-actors.md)).

**Finding: the convergence is real but asymmetric.** Kotlin wrote C# into its
rationale as a matter of course; Swift treated its own async/await as an
independent design and acknowledged the C# lineage only for actors. For a course
teaching C#, that is a much better story than "everyone copied C#", and it is
checkable in one click.

> **Further reading.**
> [The Kotlin coroutines KEEP](https://github.com/Kotlin/KEEP/blob/main/proposals/KEEP-0164-coroutines.md) — a language design document that reads like an argument, and cites its influences.
> [SE-0306, Actors](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0306-actors.md) — see the "Existing practice" section for how Swift positions itself against Orleans and Akka.
> [Android's ANR page](https://developer.android.com/topic/performance/vitals/anr) — the frozen-window problem with a number attached to it.

### A2.5 The app lifecycle as a language-visible problem

Nothing on the desktop matches this, and the evidence that it is genuinely hard
is not an argument — it is the deprecation record.

Android's own documentation states the two facts that make it hard. First:
"The system never kills an activity directly... Instead, it kills the process the
activity runs in, destroying not only the activity but everything else running in
the process as well"
([Activity lifecycle](https://developer.android.com/guide/components/activities/activity-lifecycle)),
with a published importance hierarchy in which cached processes die first
([Processes and app lifecycle](https://developer.android.com/guide/components/activities/process-lifecycle)).
Second: a configuration change — a rotation — "destroys the existing Activity"
and creates a new one, which "clears out any state kept as fields in the Activity"
([Handle configuration changes](https://developer.android.com/guide/topics/resources/runtime-changes)).
So your object graph can vanish for two unrelated reasons, one of which is the
user turning the phone sideways.

**The churn as evidence.** Read as a list of deprecations this is noise; read as
a sequence of attempts at one problem it is a finding.

| Attempt | Fate | What it failed to survive |
| --- | --- | --- |
| `AsyncTask` | deprecated API 30 ([diff](https://developer.android.com/sdk/api_diff/30/changes/android.os.AsyncTask)) | configuration change; results delivered to a dead Activity |
| Loaders (`LoaderManager`, `AsyncTaskLoader`) | "deprecated as of Android 9 (API level 28)" ([Loaders](https://developer.android.com/guide/components/loaders)) | complexity; replaced by "a combination of ViewModel objects and LiveData" |
| `ViewModel` + lifecycle-aware components (2017) | current | configuration change — but **not** process death |
| `SavedStateHandle` | current | process death: values "persist after the process is killed by the system" ([ViewModel saved state](https://developer.android.com/topic/libraries/architecture/viewmodel/viewmodel-savedstate)) |

Four generations, roughly 2011–2019, converging on: *keep state out of the
Activity, and separate "survives rotation" from "survives process death" because
they are different problems.* That is a conclusion worth teaching, and it is
still being paid for — the current Activity lifecycle page no longer mentions
`onSaveInstanceState` at all, directing readers to `rememberSaveable`, `ViewModel`
and local storage instead. The churn has not stopped either: Android 16 makes
predictive back mandatory at `targetSdk` 36, deprecating `onBackPressed()`
([Android 16 behavior changes](https://developer.android.com/about/versions/16/behavior-changes-16#predictive-back);
this specific anchor was confirmed via citation rather than direct fetch —
**medium confidence**).

iOS has the same problem in a milder form and added its own discontinuity: from
iOS 13 the single-window assumption broke, and "UIKit can disconnect a background
or suspended scene at any time to reclaim its resources"
([Managing your app's life cycle](https://developer.apple.com/documentation/uikit/managing-your-app-s-life-cycle);
[Transitioning to the scene-based life cycle](https://developer.apple.com/documentation/uikit/transitioning-to-the-uikit-scene-based-life-cycle)).
Memory-pressure termination is documented as jetsam
([Identifying high memory use with jetsam event reports](https://developer.apple.com/documentation/xcode/identifying-high-memory-use-with-jetsam-event-reports)).
**I could not source a quantified comparison of how often iOS kills backgrounded
apps versus Android** — the mechanisms are documented, the relative frequency is
not. Do not assert that iOS is gentler; assert that Android makes recreation a
routine event by design and iOS does not.

> **Further reading.**
> [Handle configuration changes](https://developer.android.com/guide/topics/resources/runtime-changes) — the shortest path to understanding why Android apps are architected the way they are.
> [The Loaders deprecation page](https://developer.android.com/guide/components/loaders) — a platform explaining, in its own words, why it is replacing something it shipped.
> [Managing your app's life cycle](https://developer.apple.com/documentation/uikit/managing-your-app-s-life-cycle) — the iOS side, for contrast.

### A2.6 Binary size, cold start and battery as language constraints

Some language and toolchain features exist because of a download.

**The 65k limit is a file-format constant that became a build system.** "The
Dalvik Executable specification limits the total number of methods that can be
referenced within a single DEX file to 65,536" — a 16-bit method index
([Enable multidex](https://developer.android.com/build/multidex)). An entire
build feature, multidex, exists to work around one integer width. Shrinking is
the other half: R8 is now the default shrinker, and Android's own documentation
explains the language-visible consequence — because "R8 cannot detect classes
that are loaded [via reflection]", you must write explicit keep rules
([keep rule examples](https://developer.android.com/topic/performance/app-optimization/keep-rule-examples)).
**That is a size constraint reaching back into how you may write code:
reflection is discouraged on Android partly because a size optimiser cannot see
through it.** (The specific claim that R8 became default in AGP 3.4.0 rests only
on secondary guides; I could not confirm it from Google's own release notes —
**low confidence on the version number, high on the current state.**)

Distribution format followed: the Android App Bundle became required for new apps
from August 2021
([App Bundle documentation](https://developer.android.com/guide/app-bundle);
[Play policy](https://support.google.com/googleplay/android-developer/answer/9844279)),
with Google claiming bundles are "on average 8% smaller on download"
([Android Developers Blog, 2018](https://android-developers.googleblog.com/2018/10/playtime-2018.html)
**[vendor]**). Current Play limits: a 200 MB threshold above which mobile-data
users get a warning, 4 GB per module, 34 GB total
([Play Console, app size](https://support.google.com/googleplay/android-developer/answer/9859372?hl=en),
checked 2026-08-29).

Apple's side has the most instructive failure. **Bitcode** — an
Apple-mandated intermediate representation intended to let Apple "re-optimize
your app binary in the future without the need to submit a new version"
([App thinning, Xcode help](https://help.apple.com/xcode/mac/current/en.lproj/devbbdc5ce4f.html))
— was introduced with iOS 9 in 2015 (**secondary sourcing only**; Apple's
original pages have been restructured) and killed in Xcode 14: "the App Store no
longer accepts bitcode submissions from Xcode 14... 'Building with bitcode is
deprecated'"
([Xcode 14 release notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes)).
A platform owner required an intermediate representation from every developer for
seven years, then withdrew it. That is a better lesson about platform risk than
anything in Part B.

**The cleanest example of a language feature caused by download size** is Dart's.
Flutter's icon tree-shaker can only discard unused font glyphs if it can
statically determine which are used, so `IconData` carries the constraint in its
own source comment: "Instantiating non-const instances of this class in your app
will mean the app cannot be built in release mode with icon tree-shaking"
([flutter/flutter issue #181344, quoting `icon_data.dart`](https://github.com/flutter/flutter/issues/181344)).
**A `const` constructor requirement, imposed on application authors, because of
kilobytes.** Tree shaking itself runs only in AOT release builds
([Flutter, app size tooling](https://docs.flutter.dev/tools/devtools/app-size);
[build modes](https://docs.flutter.dev/testing/build-modes) **[vendor]**), with
Flutter's own tracking issue reporting a minimal Android APK at 4.06 MB
([flutter/flutter#16833](https://github.com/flutter/flutter/issues/16833)
**[vendor]**).

Cold start and battery close the loop: Android publishes "Cold startup takes 5
seconds or longer" as the excessive threshold
([App startup time vitals](https://developer.android.com/topic/performance/vitals/launch-time)),
and since Android 6.0 Doze and since 8.0 background execution limits mean **the
OS decides when your code runs at all**
([Doze and App Standby](https://developer.android.com/training/monitoring-device-state/doze-standby);
[Android 8.0 background limits](https://developer.android.com/about/versions/oreo/background)).
No desktop language ever had to model that.

> **Further reading.**
> [Enable multidex](https://developer.android.com/build/multidex) — one integer width, one build system.
> [Xcode 14 release notes, bitcode](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes) — a mandate withdrawn, in the vendor's own words.
> [Flutter's app-size issue #16833](https://github.com/flutter/flutter/issues/16833) — years of a team publicly measuring their own floor.

### A2.7 How the UI gets described

The arc is real: imperative widget construction → markup and visual designers →
declarative, reactive code-as-UI. Interface Builder nibs became storyboards in
iOS 5 / Xcode 4.2, 2011
([Apple, What's New in iOS 5](https://developer.apple.com/library/archive/releasenotes/General/WhatsNewIniOS/Articles/iOS5.html));
Auto Layout landed on OS X Lion first — "OS X Lion introduces a new layout system
for Cocoa, replacing the historical springs and struts model", document dated
2011-06-06
([Auto Layout release notes](https://developer.apple.com/library/content/releasenotes/UserExperience/RNAutomaticLayout/index.html))
— and reached iOS in 2012 via WWDC session 202
([developer.apple.com/videos/play/wwdc2012/202](https://developer.apple.com/videos/play/wwdc2012/202/)).
Android used XML layouts to "separate the presentation of your app from the code
that controls its behavior"
([Declaring layout](https://developer.android.com/develop/ui/views/layout/declaring-layout)),
adding ConstraintLayout in May 2016
([Android Developers Blog](https://android-developers.googleblog.com/2016/05/android-studio-22-preview-new-ui.html)).
Then the turn: SwiftUI at WWDC on 2019-06-03
([Apple newsroom](https://www.apple.com/newsroom/2019/06/highlights-from-wwdc-2019/)),
Jetpack Compose previewed 2019-05-08 and stable on 2021-07-28
([preview](https://android-developers.googleblog.com/2019/05/whats-new-with-android-jetpack.html);
[1.0](https://android-developers.googleblog.com/2021/07/jetpack-compose-announcement.html)),
and Flutter's widget tree, which its documentation contrasts explicitly with
"Frameworks from Win32 to web to Android and iOS [that] typically use an
imperative style"
([Introduction to declarative UI](https://docs.flutter.dev/flutter-for/declarative)).

**The causation question, answered honestly — and it is not the answer the brief
expects.** I went looking for vendor acknowledgment of React as an influence and
mostly did not find it:

- **Flutter's own "Introduction to declarative UI" page does not mention React.**
  I fetched it directly to check. Flutter maintains a separate
  [Flutter for React Native devs](https://docs.flutter.dev/flutter-for/react-native-devs)
  page, but that is a migration guide, not an acknowledgment of influence.
- **Google's Compose 1.0 announcement mentions neither React, Flutter nor
  SwiftUI.** Also checked directly.
- **The one real acknowledgment is not in documentation at all.** Leland
  Richardson, on the Jetpack Compose team, states in his talk *React, Meet
  Compose*: "Much of its design has been inspired by other declarative UI
  frameworks such as React, Flutter, etc.", while distinguishing Compose's slot
  table and positional memoisation from React's virtual DOM
  ([speakerdeck.com/lelandrichardson/react-meet-compose](https://speakerdeck.com/lelandrichardson/react-meet-compose)).
  A named team member's conference talk — good evidence, but not a vendor
  statement.
- **Elm and Model-View-Update: unsourced.** I looked specifically for any Apple,
  Google or JetBrains statement citing Elm or MVU and found none. Third-party
  developers assert the lineage constantly. **Widely repeated, poorly sourced.**

**My answer to "did mobile lead, follow React, or arrive in parallel":
mobile followed, by roughly six years, and the vendors have mostly declined to
say so.** React was 2013, React Native 2015; SwiftUI 2019 and Compose 2021 are
downstream in time by any reading, and the only insider account we have says so
outright. But the follow is not a copy: Compose's execution model is different
enough that its own designer spends a talk on the difference.

**The distinction that gets conflated, and that Moduł 4b needs.** XAML (2006) was
*declarative markup* with data binding. SwiftUI, Compose and Flutter are
*declarative and reactive* — the UI is a pure function of state, re-derived on
change, with no retained widget you mutate. **Those are not the same thing, and a
student who has learned XAML will assume they are.** I could not find a
vendor or academic source that draws the line cleanly; the best I found is an
individual developer's argument that WPF/XAML solved declarative composition but
never adopted unidirectional data flow
([wizardsofsmart.wordpress.com, 2016-03-04](https://wizardsofsmart.wordpress.com/2016/03/04/react-what-wpf-should-have-been/)
— **an opinion post, cited as an argument, not as evidence**).

`[R03 §A2.4]` asks the desktop side of exactly this question — "is the current
state a return to 1985 with better tooling, or something new?" **We reached the
same answer independently: it is not a return.** My reasoning is that resource
files and form designers produced declarative *descriptions of a widget tree you
then mutated imperatively*, and reactive declarative UI removes the mutation
step. Research 03 puts the same mechanism more precisely — a designer "produces a
mutable instance graph and hands you a reference to it", whereas the declarative
model produces "a function from state to a description", so "the current truth
lives in your state, and the widget tree is a cache the framework maintains."

**Two documents, two research passes, one conclusion — and Research 03 adds a
third, independent arrival I had not found:** Casey Muratori's 2005 argument that
retained GUI trees were the problem and immediate-mode rendering the answer, which
Dear ImGui credits directly `[R03 §A2.4]`. The games industry and the application
industry reached "do not keep mutable state in the widget tree" a decade apart
without contact. **That is much better evidence than either document's own
argument, and it is the version to teach.**

Note that this also settles the XAML question above in the same direction:
Research 03's account of markup as the middle stage — "which is exactly why MVVM
had to be invented on top of it" — is the sourced version of the distinction I
could only support from an opinion post.

> **Further reading.**
> [Flutter's Introduction to declarative UI](https://docs.flutter.dev/flutter-for/declarative) — the imperative/declarative contrast in side-by-side code, and the clearest short statement of the model.
> [Leland Richardson, *React, Meet Compose*](https://speakerdeck.com/lelandrichardson/react-meet-compose) — the only insider account of Compose's influences I could find.
> [Apple's Auto Layout release notes (2011)](https://developer.apple.com/library/content/releasenotes/UserExperience/RNAutomaticLayout/index.html) — worth opening to see what "springs and struts" was, since Auto Layout is what students will meet if they touch UIKit.

### A2.8 Cross-platform as a permanently re-litigated question

The generations, with what each claimed the last got wrong:

| Generation | Dates | Claim against its predecessor |
| --- | --- | --- |
| PhoneGap / Cordova | 2008; Adobe acquires Nitobi 2011, donates to Apache | Native SDKs are two codebases; the web is one |
| Titanium | ~2009 | The web view is slow; compile JS to native widgets |
| Xamarin | founded May 2011 | Web technology is the wrong abstraction; share *logic* in a real language |
| React Native | 2015 | Sharing logic is not enough; share the *UI paradigm*, render natively |
| Flutter | 2018 | Native widgets are the problem; own the pixels |
| KMP / MAUI / Compose Multiplatform | 2022–2025 | Owning the pixels loses the platform; share logic, and share UI only where it pays |

Dates and fates, sourced: PhoneGap began at Nitobi in 2008 and reached Apache as
Cordova after Adobe's 2011 acquisition
([Apache Cordova, "Goodbye PhoneGap", 2020-08-14](https://cordova.apache.org/announcements/2020/08/14/goodbye-phonegap.html));
Adobe ended PhoneGap and shut PhoneGap Build on 2020-10-01
([Adobe's own notice](https://medium.com/phonegap/update-for-customers-using-phonegap-and-phonegap-build-cc701c77502c)
**[vendor]**). **Correction to a widely believed claim: Apache Cordova has *not*
been retired and is not in the Apache Attic** — I checked the
[Attic's project list](https://attic.apache.org/projects.html) and it is absent.
The confusion appears to come from Microsoft App Center dropping Cordova support
in 2021–22, in a post whose own text says: "It's a pity the title of this article
says that Apache Cordova is retiring. It isn't. Microsoft support for it is"
([Microsoft App Center blog](https://devblogs.microsoft.com/appcenter/announcing-apache-cordova-retirement/)
**[vendor]**). Titanium's support ended when Axway stopped SDK support on
2022-03-01
([Axway announcement](https://blog.axway.com/product-insights/discontinued/appcelerator/changes-to-application-development-services)
**[vendor]**).

Xamarin was founded in May 2011 by the Mono team after Attachmate's Novell
layoffs ended MonoTouch/MonoDroid
([eWeek, May 2011](https://www.eweek.com/development/mono-project-founder-launches-new-company-xamarin/) —
**secondary; I could not find a primary founding announcement**);
Xamarin.Forms arrived with Xamarin 3.0 on 2014-05-29
([InfoQ](https://www.infoq.com/news/2014/05/xamarin-forms/) — **secondary**);
Microsoft announced the acquisition on 2016-02-24
([Official Microsoft Blog](https://blogs.microsoft.com/blog/2016/02/24/microsoft-to-acquire-xamarin-and-empower-more-developers-to-build-apps-on-any-device/));
and **Xamarin support ended on 2024-05-01 "for all Xamarin SDKs including
Xamarin.Forms"**
([.NET support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/xamarin)).

React Native was announced at React.js Conf in January 2015 and open-sourced for
iOS in March 2015, Android on 2015-09-14
([React blog](https://legacy.reactjs.org/blog/2015/02/18/react-conf-roundup-2015.html);
[Meta Engineering](https://engineering.fb.com/2016/04/13/android/react-native-a-year-in-review/)).
Flutter: Sky at the Dart Developer Summit in April 2015, beta at MWC on
2018-02-27
([Google Developers Blog](https://developers.googleblog.com/2018/02/announcing-flutter-beta-1.html)),
1.0 on 2018-12-04
([Google Developers Blog](https://developers.googleblog.com/flutter-10-googles-portable-ui-toolkit/)),
and still shipping — Flutter 3.47 on 2026-08-12
([flutter.dev blog](https://flutter.dev/blog/whats-new-in-flutter-3-47) **[vendor]**).
Kotlin Multiplatform went stable for shared logic in November 2023
([JetBrains](https://blog.jetbrains.com/kotlin/2023/11/kotlin-multiplatform-stable/)
**[vendor]**), and Compose Multiplatform for iOS in 1.8.0, May 2025
([JetBrains](https://blog.jetbrains.com/kotlin/2025/05/compose-multiplatform-1-8-0-released-compose-multiplatform-for-ios-is-stable-and-production-ready/)
**[vendor]**). .NET MAUI reached GA on 2022-05-23
([.NET Blog](https://devblogs.microsoft.com/dotnet/introducing-dotnet-maui-one-codebase-many-platforms/)
**[vendor]**).

**Why the question never stays answered.** The best available evidence is a
matched pair of first-hand accounts about the *same technology*, seven years
apart, reaching opposite conclusions:

- **Airbnb, 2018-06-19, "Sunsetting React Native"** — cites failures on speed,
  quality, code reuse and developer experience, and the organisational finding
  that bridging meant "supporting code on three platforms instead of two". Note
  the detail almost everyone omits: in Airbnb's own survey **63% of engineers who
  had used React Native said they would choose it again**
  ([Airbnb Engineering](https://medium.com/airbnb-engineering/sunsetting-react-native-1868ba28e30a)).
- **Shopify, 2025-01-13, "Five years of React Native at Shopify"** — fully
  migrated, sub-500 ms P75 screen loads, >99.9% crash-free sessions, and
  *increasing* investment: "a lot of limitations that led people to not adopt it
  simply don't exist anymore"
  ([Shopify Engineering](https://shopify.engineering/five-years-of-react-native-at-shopify)
  **[vendor-like: a company promoting its own choice]**).

**Both are honest, both are well argued, and both are about engineering culture
and scale rather than the technology being good or bad.** That pair is the whole
answer to "why is this permanently re-litigated": the decision is dominated by
team shape, hiring, and how much platform-specific surface the product needs —
none of which are properties of the framework. For scale, Appfigures estimates
that React Native and Flutter together went from ~7% of new app releases in 2020
to ~15% in 2024
([Appfigures, 2025-03-07](https://appfigures.com/resources/insights/20250307?f=1)
— **third-party, and it is SDK-detection on app binaries, not a registry; see
A5**).

> **Further reading.**
> [Airbnb, *Sunsetting React Native*](https://medium.com/airbnb-engineering/sunsetting-react-native-1868ba28e30a) and [Shopify, *Five years of React Native*](https://shopify.engineering/five-years-of-react-native-at-shopify) — read as a pair; nothing else in this field teaches "it depends on your team" so concretely.
> [Apache Cordova's "Goodbye PhoneGap"](https://cordova.apache.org/announcements/2020/08/14/goodbye-phonegap.html) — an open-source project outliving the corporation that owned it.

### A2.9 Interop and where the abstraction bleeds

Every cross-platform framework is fine until it needs a platform API, and each
one bleeds in a documented place.

**JNI (Android).** Google's own guidance opens with the cost: "Marshalling across
the JNI layer has non-trivial costs. Try to design an interface that minimizes the
amount of data you need to marshall." The same page lists the traps: a `JNIEnv`
cannot be shared between threads; attached threads must detach or leak; "Never
compare references with `==` in native code"; most JNI functions may not be called
while an exception is pending
([JNI tips](https://developer.android.com/ndk/guides/jni-tips)).

**Objective-C ↔ Swift.** A bridging header exposes Objective-C to Swift; a
*generated* header exposes Swift to Objective-C, and only `public`/`open`
declarations appear in it unless explicitly marked `@objc`
([Importing Objective-C into Swift](https://developer.apple.com/documentation/swift/importing-objective-c-into-swift);
[Importing Swift into Objective-C](https://developer.apple.com/documentation/swift/importing-swift-into-objective-c)).
**Gap, recorded honestly:** the well-known list of Swift features invisible to
Objective-C (generics, enums with associated values, plain structs) is *not*
currently stated as a list on either live Apple page — Apple appears to have
trimmed it from the older *Using Swift with Cocoa and Objective-C* guide. The
technical facts are consistently reported in secondary literature but **I could
not pin them to a current Apple page; do not cite Apple for them.**

**Flutter platform channels.** Flutter's own documentation is explicit that this
is what you use "if you need to use the platform's APIs in a non-Dart language",
and that the platform-side method must run on the platform's main thread
([Platform channels](https://docs.flutter.dev/platform-integration/platform-channels)),
with FFI as the lower-level route for C APIs
([C interop](https://docs.flutter.dev/platform-integration/android/c-interop)).
The moment you need something Flutter has not wrapped, you write native code on
both sides — twice.

**React Native's bridge.** The old architecture serialised every call across an
asynchronous JSON bridge; React Native's own documentation justifies the
replacement with a concrete case — camera frames of ~30 MB, "roughly 2 GB of data
per second", which the bridge could not carry but JSI's direct memory references
can
([Why a new architecture](https://reactnative.dev/docs/0.72/the-new-architecture/why)
**[vendor]**). The New Architecture became default in 0.76 on 2024-10-23
([RN blog](https://reactnative.dev/blog/2024/10/23/release-0.76-new-architecture));
the legacy architecture was frozen in 0.80 (2025-06-12), declared unsupported in
0.82 (2025-10-08), and code removal began in 0.84 (2026-02-11) — **but the
interop compatibility layer is still there**
([0.80](https://reactnative.dev/blog/2025/06/12/react-native-0.80),
[0.82](https://reactnative.dev/blog/2025/10/08/react-native-0.82),
[0.84](https://reactnative.dev/blog/2026/02/11/react-native-0.84)).
Current release is 0.87, 2026-08-11 ([RN blog](https://reactnative.dev/blog)).
**Do not say "the bridge is gone"; say it has been in phased removal since 2024.**

**.NET on iOS — the one that matters for this course.** Microsoft documents the
consequences of AOT-only compilation precisely: "Since applications using
Xamarin.iOS are compiled to static code, it is not possible to use any facilities
that require code generation at runtime", and locates the cause below the App
Store rule entirely: "the iOS kernel prevents an application from generating code
dynamically." No `System.Reflection.Emit`, no `System.Runtime.Remoting`, limits
on generic subclasses of `NSObject`, and a runtime error students will actually
see:
`System.ExecutionEngineException: Attempting to JIT compile method '...' while
running in aot-only mode`
([Xamarin.iOS limitations](https://learn.microsoft.com/en-us/previous-versions/xamarin/ios/internals/limitations)
**[vendor]**). **This is the cleanest single page in the whole document for
Moduł 4b: a platform rule (A2.1) becoming a compiler mode becoming a specific
exception message in a student's console.**

> **Further reading.**
> [Xamarin.iOS limitations](https://learn.microsoft.com/en-us/previous-versions/xamarin/ios/internals/limitations) — read it once and the AOT/JIT argument stops being abstract.
> [JNI tips](https://developer.android.com/ndk/guides/jni-tips) — a platform documenting the sharp edges of its own escape hatch.
> [React Native, "Why a new architecture"](https://reactnative.dev/docs/0.72/the-new-architecture/why) — a framework explaining, with a worked example, why its central design had to be replaced.

---

## A3. Ideas born on mobile that escaped it

Each of these is usually asserted. Here is what the evidence actually supports.

**Structured concurrency — escaped, but mobile did not invent it.** JEP 533
credits the term to Martin Sústrik and its popularisation to Nathaniel J. Smith,
"Ideas from other languages, such as Erlang's hierarchical supervisors, inform
the design" — and **does not mention Kotlin at all**
([JEP 533, Structured Concurrency (Seventh Preview), targeted at JDK 27](https://openjdk.org/jeps/533)).
Smith's essay predates Kotlin's stable coroutines by six months
([*Notes on structured concurrency*, 2018-04-25](https://vorpus.org/blog/notes-on-structured-concurrency-or-go-statement-considered-harmful/)).
Python shipped `asyncio.TaskGroup` in 3.11 on 2022-10-24
([What's New in Python 3.11](https://docs.python.org/3/whatsnew/3.11.html)).
**Honest verdict: this is convergence, not export. Kotlin and Android made the
pattern mainstream by sheer developer population; the idea came from elsewhere,
and neither Java's nor Swift's design documents credit Kotlin.**

**ARC — mostly did *not* escape.** Rust's `Arc`/`Rc` require an explicit
`.clone()` ([std::sync::Arc](https://doc.rust-lang.org/std/sync/struct.Arc.html)):
same counting, different mechanism, since the whole point of ARC is that the
compiler inserts the calls. ARC also was never mobile-only — it shipped on
Mac OS X and iOS simultaneously in 2011. The one clear non-Apple case is Nim,
which independently shipped a deterministic, compiler-inserted scheme it also
calls ARC, default from Nim 1.4 and superseded by ORC in Nim 2.0
([Nim memory management](https://nim-lang.org/docs/mm.html)), without citing
Swift. **Verdict: this is the weakest of the "escaped" claims and should be
dropped from any lesson rather than softened.**

**Declarative UI reaching the desktop — escaped, clearly.** Compose Multiplatform
1.0 covered desktop in December 2021
([JetBrains](https://blog.jetbrains.com/kotlin/2021/12/compose-multiplatform-1-0-is-going-live/)
**[vendor]**); SwiftUI shipped on macOS with Catalina in 2019; Flutter reached
stable on Windows with 2.10 in February 2022 and on macOS and Linux with
Flutter 3 on 2022-05-11 — "Flutter is now stable for macOS and Linux, in addition
to Windows!"
([flutter.dev](https://flutter.dev/blog/whats-new-in-flutter-3) **[vendor]**).
**This one is solid: a UI paradigm matured on phones and is now a mainstream way
to write desktop software.**

**Runtime permission prompts — escaped, and the desktop is still catching up.**
Android 6.0 introduced runtime permissions in 2015
([Android Developers Blog, 2015-08-27](https://android-developers.googleblog.com/2015/08/building-better-apps-with-runtime.html)).
macOS followed: "In macOS 10.14 and later, the user must explicitly grant
permission for each app to access cameras and microphones"
([Apple](https://developer.apple.com/documentation/bundleresources/requesting-authorization-for-media-capture-on-macos)).
The web standardised the pattern
([W3C Permissions API, Working Draft 2025-10-06](https://www.w3.org/TR/permissions/)).
**And the sharpest detail in this section: Windows only got per-app camera,
microphone and location permissions for ordinary desktop apps in an Insider
preview build on 2026-08-21** — "Previously, access... was managed through a
single device-wide setting"
([Windows Insider release notes, build 26340.9233](https://learn.microsoft.com/windows-insider/release-notes/experimental/preview-build-26340-9233)).
Eleven years after Android, still in preview. That is a genuinely striking fact
for Moduł 4a.

**App-store distribution exported to the desktop — escaped, and this is the one
with the sharpest teeth.** The Mac App Store opened on 2011-01-06
([Apple press release](https://www.apple.com/newsroom/2011/01/06Apples-Mac-App-Store-Opens-for-Business/)),
and — more importantly — **notarisation became mandatory for software
distributed *outside* the store from 2020-02-03**
([Apple developer news](https://developer.apple.com/news/?id=12232019a)). Windows
10 S, a Store-apps-only mode, was announced 2017-05-02
([Windows Blog](https://blogs.windows.com/windowsexperience/2017/05/02/microsoft-education-empowering-students-teachers-today-create-world-tomorrow/)).
Linux acquired the packaging half without the gatekeeping: Canonical's snappy
(2014-12-09, [Canonical](https://canonical.com/blog/a-new-transactionally-updated-snappy-ubuntu-core)),
Flatpak (from xdg-app, 2015–2016, [flatpak.org](https://flatpak.org/about/)), and
winget (2020-05-19, [Microsoft](https://devblogs.microsoft.com/commandline/windows-package-manager-preview/)).
**The store model escaped mobile; the *review gate* only partially did — and that
distinction is the core of Part C.**

> **Further reading.**
> [JEP 533](https://openjdk.org/jeps/533) — Java documenting its own influences, and conspicuously not naming Kotlin.
> [Apple's notarisation announcement](https://developer.apple.com/news/?id=12232019a) — the moment the desktop stopped being a place you could just ship a binary.
> [Windows Insider build 26340.9233](https://learn.microsoft.com/windows-insider/release-notes/experimental/preview-build-26340-9233) — the per-app permission model arriving on Windows in 2026.

## A4. The languages and platforms that lost, and honestly why

**Java ME / MIDP.** *Technical:* the specification standardised the language and
the core library and left everything that mattered — screen size, input, sound,
vendor APIs — to the handset. The fragmentation is documented in the artefacts
Sun itself produced to fight it (a *Java ME De-fragmentation Technical Overview*),
and in reports that studios shipped hundreds or thousands of builds of one game
([NUS device-fragmentation survey, 2008-04-28](https://www.comp.nus.edu.sg/~damithch/df/device-fragmentation.htm)
— **the underlying primary sources are dead and archive.org was unreachable from
this session; treat the specific numbers as low confidence, the pattern as well
attested**). *Commercial:* distribution ran through carrier decks, so the
platform never had a developer-to-user channel. **I could find no dated Oracle
end-of-life notice for Java ME — the record is unclear, and it is fairer to say
it was abandoned than that it was ended.**

**Symbian C++.** *Technical:* see A1 — descriptors, cleanup stack, two-phase
construction and active objects are individually defensible and collectively a
wall. *Commercial:* Symbian held about 67% of the smartphone market in 2006 and
52.4% by 2008
([AllAboutSymbian citing Canalys, 2007-02-11](http://www.allaboutsymbian.com/news/item/4887_Symbian_worldwide_smartphone_s.php);
[TechCrunch citing Gartner, 2009-03-13](https://techcrunch.com/?p=9965) — both
**secondary reporting of primary market research**), so it was losing share
before iOS and Android were significant. Nokia took platform development back
in-house in November 2010
([The Register, 2010-11-08](https://www.theregister.com/on-prem/2010/11/08/nokia_grabs_control_of_symbian_downsizes_foundation/1357802))
and the Foundation's websites closed on 2010-12-17. Stephen Elop's "burning
platform" memo of 2011-02-08 named the mechanism from inside — "we still don't
have a product that is close to their experience"
([Engadget, reproducing the memo](https://www.engadget.com/2011-02-08-nokia-ceo-stephen-elop-rallies-troops-in-brutally-honest-burnin.html)).
**Mechanism, not "X killed Y": a language that made hiring hard met a competitor
whose SDK a web developer could pick up in a weekend.**

**BlackBerry.** RIM's proprietary `net.rim.device.api.*` layered on Java ME meant
BlackBerry apps were neither portable nor modern. BB10 (2013-01-30) rebuilt on
C++/Qt with Cascades and bolted on an Android runtime — an admission that its own
ecosystem was insufficient
([Qt wiki, BlackBerry](https://wiki.qt.io/BlackBerry)). Services ended
2022-01-04: devices "will no longer reliably function, including for data, phone
calls, SMS, and 9-1-1 functionality"
([BlackBerry end-of-life notice](https://www.blackberry.com/us/en/support/devices/end-of-life)).

**Windows Phone, and the C#/XAML line — the case this course needs.** This
deserves the most care, because the lineage does not end in the grave; it ends in
the students' IDE.

*What the platform actually was, technically.* Windows Phone 7 (2010) apps were
**Silverlight** apps: XAML views, code-behind, MVVM, and a lifecycle Microsoft's
own documentation calls *tombstoning* — "when a user switches to another app...
the app currently running is deactivated, or, in the terms of Windows Phone
development, tombstoned", with lifecycle events wired up in `App.xaml`
([Microsoft Learn, storing and retrieving list items on a Windows Phone](https://learn.microsoft.com/sharepoint/dev/general-development/how-to-store-and-retrieve-sharepoint-list-items-on-a-windows-phone)).
Read that alongside A2.5: **Microsoft had shipped a documented answer to the
mobile lifecycle problem, in C#, in 2010 — the same year Android was still
telling people to use `AsyncTask`.** The technical case against Windows Phone is
much weaker than its outcome suggests.

*What Microsoft did to its own developers.* Windows Phone 8 (2012) moved to the
Windows Runtime, and by 2014 Microsoft was publishing migration guidance telling
Silverlight developers to move to WinRT XAML to "prepare for universal app
development in Windows 10", with a namespace-and-class mapping table — the post
calls the process "fairly straightforward", which is a phrase that only appears
when it is not
([Windows Developer Blog, 2014-12-17](https://blogs.windows.com/windowsdeveloper/2014/12/17/bring-your-windows-phone-silverlight-apps-to-windows-runtime-xaml-prepare-for-universal-app-development-in-windows-10/)
**[vendor]**). Then UWP, and then: Windows 10 Mobile support ended 2019-12-10
([Microsoft Lifecycle](https://learn.microsoft.com/en-us/lifecycle/announcements/windows-10-mobile-end-of-support));
Silverlight support ended 2021-10-12
([Microsoft Lifecycle, announced 2019-07-10](https://learn.microsoft.com/en-us/lifecycle/announcements/silverlight-end-of-support));
and Microsoft's current documentation states plainly: **"UWP is no longer under
active development. WinUI 3 and the Windows App SDK are its successors"**
([Microsoft Learn, migrating UWP to WinUI 3](https://learn.microsoft.com/windows/apps/develop/ai-assisted/migrate/uwp-to-winui)).

*The honest separation.* **Technical reason: weak.** XAML, C#, MVVM and data
binding were a good stack; the tooling was good; the lifecycle model was ahead of
Android's. **Ecosystem reason: decisive.** Three incompatible app models in five
years (Silverlight → WinRT → UWP) meant a developer who backed Microsoft was
asked to rewrite twice, and each rewrite was announced *as a benefit*. **The
mechanism worth teaching is not "Microsoft was late" but "a platform that breaks
its developers twice loses the developers who survived the first break."**

*And the line continues.* The XAML/C#/MVVM idiom that died on the phone is
recognisably what Xamarin.Forms shipped in 2014 and what .NET MAUI ships now.
MAUI's own migration documentation is a class-by-class map from `Xamarin.Forms.*`
to `Microsoft.Maui.*`
([Microsoft Learn, upgrading Xamarin.Forms to .NET MAUI](https://learn.microsoft.com/dotnet/maui/migration/multi-project-to-single-project?view=net-maui-10.0)),
and MAUI's announcement puts the inheritance in one sentence: "Upon the Xamarin
shoulders of mobile controls, .NET MAUI adds support for multi-window desktop
applications, menu bars, and new animation capabilities"
([.NET Blog, 2022-05-23](https://devblogs.microsoft.com/dotnet/introducing-dotnet-maui-one-codebase-many-platforms/)
**[vendor]**). Current: .NET MAUI 10, released 2025-11-11, supported to 2027-05-11
([.NET MAUI support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/maui)).

**Objective-C.** Not dead, not deprecated, not replaced — see A2.1. It lost the
*future*, not the present. Any lesson saying "Apple deprecated Objective-C" is
repeating folklore.

**Cordova.** *Technical:* a web view cannot match native input latency or
platform integration, and every native capability needs a plugin someone must
maintain. *Commercial:* its sponsor left (Adobe, 2020) and its main commercial
build service left (Microsoft App Center, 2022). But it is **not** retired —
see A2.8. **Correct framing: Cordova lost its corporate patrons, not its
existence.**

> **Further reading.**
> [Microsoft's 2014 Silverlight→WinRT migration post](https://blogs.windows.com/windowsdeveloper/2014/12/17/bring-your-windows-phone-silverlight-apps-to-windows-runtime-xaml-prepare-for-universal-app-development-in-windows-10/) — what asking your developers to rewrite looks like when written as good news.
> [The Elop memo](https://www.engadget.com/2011-02-08-nokia-ceo-stephen-elop-rallies-troops-in-brutally-honest-burnin.html) — a platform's collapse described from inside it, in plain language.
> [Microsoft's UWP→WinUI 3 page](https://learn.microsoft.com/windows/apps/develop/ai-assisted/migrate/uwp-to-winui) — a vendor writing "no longer under active development" about its own strategic platform.

## A5. Measuring popularity, and why you should distrust it

Every number in this field measures something narrower than it appears to.

| Source | What it actually measures | What it cannot see |
| --- | --- | --- |
| [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/technology) (published 2025-12-29, 49,009 responses) | Self-selected respondents reporting what they used in the past year | Anyone not on Stack Overflow. Its own [methodology page](https://survey.stackoverflow.co/2025/methodology) admits "highly-engaged users on Stack Overflow were more likely to notice the prompts" |
| [JetBrains State of Developer Ecosystem 2025](https://lp.jetbrains.com/developer-ecosystem-2025-methedology/) (24,534 respondents) | Same, with a vendor's audience | Admits bias; reduced JetBrains-affiliated weighting by 10%. **JetBrains sells Kotlin tooling** |
| [TIOBE](https://www.tiobe.com/tiobe-index/programminglanguages_definition/) | "counting hits for the search query `+"<language> programming"`" across ~25 search engines | Code. Developers. Anything at all about usage |
| Appfigures / Sensor Tower | SDK signatures detected in store binaries | Enterprise and internally distributed apps; sideloaded apps; what the code does |

Store analytics deserve a specific warning. The U.S. SEC settled a $10 million
securities-fraud case with App Annie on 2021-09-14, finding that from late 2014
to mid-2018 it "used non-aggregated and non-anonymized [confidential customer]
data to alter its model-generated estimates to make them more valuable to sell to
trading firms" — having promised customers the opposite
([SEC press release](https://www.sec.gov/newsroom/press-releases/2021-176)).
App Annie became data.ai and was acquired by Sensor Tower in March 2024
([press release](https://www.prnewswire.com/news-releases/sensor-tower-acquires-market-intelligence-platform-dataai-302090753.html)).
**That is not a reason to ignore store estimates; it is the reason to name the
firm and the method whenever one is quoted.**

Vendor adoption claims, collected and labelled:

- **Google:** "used by over 60% of professional Android developers" and "20% less
  likely to crash", both on [developer.android.com/kotlin](https://developer.android.com/kotlin)
  with no date or methodology on the page **[vendor]**.
- **Flutter:** "over 1 million monthly active developers" and "nearly 30% of all
  new iOS apps", the latter citing third-party Apptopia data
  ([Google Developers Blog, 2024-12-17](https://developers.googleblog.com/en/celebrating-flutters-production-era/)
  **[vendor]**). Note that the widely repeated "over 1 million *apps*" is a
  different claim that gets conflated with this one.
- **React Native:** deliberately non-numeric — "Thousands of apps are using React
  Native" ([showcase](https://reactnative.dev/showcase) **[vendor]**).
- **.NET MAUI:** **no adoption figures published at all.** Microsoft's
  [What is .NET MAUI?](https://learn.microsoft.com/dotnet/maui/what-is-maui) and
  its [customer showcase](https://dotnet.microsoft.com/en-us/platform/customers/maui)
  give qualitative case studies and no numbers. That absence is itself
  information, and it should be stated rather than filled in with a guess.

The methodological point, put well by a firm that publishes rankings and
disclaims them: "No claims are made here that these rankings are representative
of general usage more broadly"
([RedMonk](https://redmonk.com/sogrady/2016/02/19/language-rankings-1-16/)).
**The gap that matters for a school: "developers who used X last year" and "apps
shipped with X" are different quantities, and no public source measures the
second for enterprise or internal software at all.**

> **Further reading.**
> [The SEC's App Annie order](https://www.sec.gov/newsroom/press-releases/2021-176) — the best single artefact for teaching source criticism in this field.
> [TIOBE's own definition page](https://www.tiobe.com/tiobe-index/programminglanguages_definition/) — an index explaining that it counts search results, which almost nobody who cites it has read.

## A6. What this arc means for a student writing C# in 2026

Short and concrete. This is the payload for Moduł 4b.

**Which of the above they will meet by name, in their first weeks:** XAML and
MVVM (A4 — inherited from Silverlight via Xamarin.Forms); `async`/`await`
(A2.4 — C# had it in 2012, and the mobile languages followed); nullable reference
types (A2.3 — C# 8, 2019, and Microsoft's docs name Kotlin and Swift as the
precedent); the garbage collector (A2.2 — they are on the Android side of that
divide); and, if they touch iOS at all, the AOT restriction and its exception
message (A2.9).

**Why C# is a mobile option at all** — three sourced reasons, in order of weight:

1. **Apple retreated in September 2010** (A2.1). Before that, a C#-to-iOS
   toolchain was contractually prohibited. Xamarin was founded in May 2011,
   eight months after the retreat. That is not a coincidence and it is worth
   saying out loud.
2. **Microsoft bought the toolchain** (2016-02-24) and made it part of .NET.
3. **The idiom survived its own platform's death** (A4): the XAML/C#/MVVM stack
   that failed on Windows Phone is what MAUI ships.

**What MAUI inherited, precisely:** Xamarin.Forms' control set and XAML dialect —
documented as a class-by-class rename from `Xamarin.Forms.*` to
`Microsoft.Maui.*`, with real behavioural differences (default spacings changed
from 6 to 0; `Grid` rows and columns must now be declared explicitly;
`RelativeLayout` survives only in a compatibility namespace)
([layout behaviour changes](https://learn.microsoft.com/dotnet/maui/migration/layouts?view=net-maui-10.0)).
**And what Xamarin inherited from Windows Phone is the idiom, not the code** — I
found no Microsoft source claiming code lineage from Silverlight for Windows
Phone into Xamarin.Forms, and there is good reason to think there is none
(Xamarin was an independent company built on Mono). **Teach the idiom lineage;
do not claim a codebase lineage.**

**The one sentence that carries all of it:** *the language a mobile developer
writes in has, for twenty years, been chosen at least as much by the platform
owner as by the developer — and C# is on the phone today because a licence clause
was withdrawn in 2010, not because it won an argument on merit.*

---

# Part B — The rest of the development lifecycle

Deliberately more compact than Part A. Every subsection is an argument about a
constraint that has no desktop equivalent, or whose desktop equivalent is
optional.

## B1. The store as a gate

Apple states that "on average, 90% of submissions are reviewed in less than 24
hours" ([App Review](https://developer.apple.com/distribute/app-review/)
**[vendor]**). Google Play warns that "certain apps may be subject to extended
reviews, which may result in review times of up to 7 days or longer"
([Play Console help](https://support.google.com/googleplay/android-developer/answer/9859751?hl=en)
**[vendor]**), with new personal developer accounts routinely at seven days
([Play Console help](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)).
Scale: Apple's 2024 transparency report describes 7.77 million submissions,
1.93 million rejections, and 295,109 initially rejected apps later approved after
fixes (reported at
[MacRumors, 2025-05-30](https://www.macrumors.com/2025/05/30/app-store-2024-transparency-report/)
— **secondary reporting of Apple's own PDF**).

**The commission as a force, not a business story.** Apple took 30% from 2008;
the Small Business Program cut it to 15% for developers under \$1M in prior-year
proceeds, announced 2020-11-18 and effective 2021-01-01
([Apple newsroom](https://www.apple.com/newsroom/2020/11/apple-announces-app-store-small-business-program/)
**[vendor]**). Google matched with 15% on the first \$1M from 2021-07-01
([Play Console help](https://support.google.com/googleplay/android-developer/answer/10632485?hl=en)
**[vendor]**) and 15% on subscriptions from day one from 2022-01-01
([Android Developers Blog, 2021-10-21](https://android-developers.googleblog.com/2021/10/evolving-business-model.html)
**[vendor]**).

The argument students should get is about incentives: **a per-transaction cut on
paid downloads and in-app purchases, and none on advertising, tilts the economics
toward free apps that monetise attention.** I looked specifically for a dated
store statistic quantifying the shift from paid apps to free-with-IAP and
**could not source one** — the qualitative claim is everywhere and the number is
nowhere I could verify. State the mechanism; do not put a percentage on it.

**What "a gate" means operationally.** Review is not only a delay, it is an
authority with discretion: Apple's own transparency figures show roughly a
quarter of submissions rejected and 295,109 of those later approved after
changes, which means the modal rejection is a negotiation, not a verdict. The
escape hatch is discretionary too — Apple maintains a request form for expedited
review ([Apple developer contact](https://developer.apple.com/contact/app-store/)
**[vendor]**), granted at Apple's discretion. **A desktop developer has no
equivalent of "my critical fix is waiting on someone else's queue", and that
single fact explains most of B3.**

Regulation, briefly and with dates: the EU DMA produced new business terms on
2024-01-25 ([Apple](https://www.apple.com/newsroom/2024/01/apple-announces-changes-to-ios-safari-and-the-app-store-in-the-european-union/)),
and a €500 million anti-steering fine on 2025-04-23
([European Commission](https://digital-strategy.ec.europa.eu/en/news/commission-finds-apple-and-meta-breach-digital-markets-act)).
The Ninth Circuit affirmed Apple's contempt over link-out commissions but
reversed the blanket zero-commission order on 2025-12-11
([opinion, PDF](https://cdn.ca9.uscourts.gov/datastore/opinions/2025/12/11/25-2935.pdf)).
Google announced expanded billing choice, a "Registered App Stores" sideloading
programme and new fee tiers on 2026-03-04, rolling out to September 2027
([Android Developers Blog](https://android-developers.googleblog.com/2026/03/a-new-era-for-choice-and-openness.html)
**[vendor]**). **This is the fastest-rotting material in the file — see "What
rots".**

> **Further reading.** [The current Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) · [Google's 2026 "new era for choice and openness"](https://android-developers.googleblog.com/2026/03/a-new-era-for-choice-and-openness.html) — a gatekeeper describing its own concessions.

## B2. Signing and identity

On the desktop you can ship a new binary. On mobile your identity *is* a key, and
the store enforces continuity between releases.

Android's own documentation states the disaster case: "if you lose your app's
signing key, you lose the ability to update your app"
([App signing](https://developer.android.com/studio/publish/app-signing)
**[vendor]**). Play App Signing exists to remove that failure mode — "Google
manages and protects your app's signing key for you and uses it to sign your APKs
for distribution", while the developer keeps only an upload key (same page).
Android 9 added key rotation via APK Signature Scheme v3
([source.android.com](https://source.android.com/docs/security/features/apksigning/v3)).
On Apple platforms the rule is more absolute: "Apple platforms, except macOS,
won't run arbitrary third-party code. All execution of third-party code must be
authorized by Apple. This authorization comes in the form of a provisioning
profile"
([TN3125, Inside code signing: provisioning profiles](https://developer.apple.com/documentation/technotes/tn3125-inside-code-signing-provisioning-profiles)).

The asymmetry runs deeper than key custody. On the desktop, identity is a
convenience: an unsigned binary still runs, and code signing buys the user a
smoother warning dialog. On mobile, identity is a precondition — an app's
cryptographic key *is* its identity to the store, and two builds signed by
different keys are two different applications no matter what the code says.

**The teachable asymmetry:** a lost keystore is a category of disaster with no
desktop equivalent — not "you must re-sign", but "this app can never be updated
again and must be republished as a different app, losing its reviews, ranking and
installed base." Note that the "must publish a new listing" consequence is the
well-known practical implication rather than a verbatim Google sentence; the
verbatim claim is only "you lose the ability to update your app."

## B3. Release cadence, and the response to store latency

**You cannot patch a shipped binary.** Every fix re-enters review. Two families of
mechanism exist because of that, and the causation is worth tracing rather than
asserting.

*Limit the blast radius.* Google Play staged rollouts can be halted: "If you
discover an issue, you can halt a staged rollout... no additional users will
receive the app version"
([Play Console help](https://support.google.com/googleplay/android-developer/answer/6346149?hl=en)
**[vendor]**). Apple's Phased Release runs 1% / 2% / 5% / 10% / 20% / 50% / 100%
over seven days and can be paused "for up to 30 days, with no limit on the number
of pauses"
([App Store Connect help](https://www.developer.apple.com/help/app-store-connect/update-your-app/release-a-version-update-in-phases)
**[vendor]**).

*Ship the switch in advance.* Firebase Remote Config exists to "change the
behavior and appearance of your client app... without requiring users to download
an app update"
([Firebase docs](https://firebase.google.com/docs/remote-config) **[vendor]**).

**And the boundary between those two ideas is a platform rule.** Guideline 2.5.2
forbids downloading code that "introduces or changes features or functionality of
the app" ([Review Guidelines](https://developer.apple.com/app-store/review/guidelines/#software-requirements)).
So you may ship a *flag* and flip it; you may not ship *behaviour* and load it.
**Feature flags are not a fashion on mobile — they are the largest legal design
space left once remote code is prohibited.** That single sentence connects A2.1
to B3 and is the best available answer to a student asking "why is everything
behind a flag?"

## B4. The compliance treadmill

An app that is finished stops working. This is the constraint with no desktop
analogue at all, and it changes what "done" means.

Google Play requires apps to target a recent API level on an annual cycle: for
2026, new apps and updates must target **Android 16 (API level 36) by
2026-08-31**, with an extension available to 2026-11-01, and existing apps must
stay at API 35+ to remain visible on newer OS versions
([Target API level requirements](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en)
**[vendor]**, checked 2026-08-29). Apple runs the same treadmill through the SDK:
from **2026-04-28**, uploads must be built with the iOS 26 SDK or later
([Apple developer news](https://developer.apple.com/news/?id=ueeok6yw) **[vendor]**).

Fragmentation is the other half, and the public evidence has *degraded*.
Google's platform dashboard now publishes only Vulkan and OpenGL ES capability
data and directs developers to the Play Console's "Reach and devices" instead
([developer.android.com/about/dashboards](https://developer.android.com/about/dashboards),
page dated 2025-12-05). **The OS-version distribution figures that everyone used
to cite are no longer public** — a finding worth recording, because a lesson that
promises to show students "the fragmentation chart" cannot. Apple still publishes
its adoption figures: 79% of all iPhones on iOS 26, 86% of devices from the last
four years ([Apple, App Store support](https://developer.apple.com/support/app-store/),
page dated 2026-06-07 **[vendor]**; this is a live dashboard, so re-check before
quoting).

## B5. Build and dependencies

Android moved from Ant to Gradle with Android Studio at Google I/O 2013,
explicitly to end "discrepancies in behavior and capability between the in-IDE
builds with Eclipse, and CI builds with Ant"
([Android Studio's 10-year anniversary, 2025-01](https://android-developers.googleblog.com/2025/01/android-studios-10-year-anniversary.html)
**[vendor]**). The cost was build time, and it is still being paid: Gradle's own
configuration-cache benchmarks report a 600-project build's configuration time
falling from 2m04s to 55s
([Gradle blog, 2025-03-14](https://blog.gradle.org/road-to-configuration-cache)
**[vendor]**).

On Apple's side, three dependency managers in a decade. CocoaPods (2011) is now
in maintenance mode by its maintainers' own announcement of **2024-08-13** —
"We're still keeping it ticking, but we're being more up-front that CocoaPods is
in maintenance mode", promising at least two releases a year for Xcode
compatibility and no new features
([CocoaPods blog](https://blog.cocoapods.org/CocoaPods-Support-Plans/) **[vendor]**;
note this corrects the commonly cited "December 2024"). Swift Package Manager
arrived with Swift's open-sourcing on 2015-12-03
([Apple](https://www.apple.com/newsroom/2015/12/03Apple-Releases-Swift-as-Open-Source/))
and reached Xcode in Xcode 11, 2019
([Xcode 11 release notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-11-release-notes)).

**What each migration cost teams: the record is anecdotal.** I could not source a
dated, first-hand accounting of a CocoaPods → Carthage → SPM migration. Do not
put a number on it. What *is* checkable is the shape of the cost: each migration
changed the project file format, so it could not be done incrementally by one
person on a branch without the whole team following, and each one arrived because
the *platform's* tooling moved rather than because the team wanted it. **That is
the same pattern as B4 — on mobile, a large share of engineering work is
compelled from outside the team.** It is the honest answer to a student asking
why professional projects seem to spend so much time not adding features.

> **Further reading (B2–B5).**
> [Play App Signing](https://developer.android.com/studio/publish/app-signing) — read the paragraph on losing your key; it is the shortest statement of a disaster with no desktop equivalent.
> [Apple's phased release schedule](https://www.developer.apple.com/help/app-store-connect/update-your-app/release-a-version-update-in-phases) — the exact percentages, which make "you cannot patch a shipped binary" concrete.
> [CocoaPods' maintenance-mode post](https://blog.cocoapods.org/CocoaPods-Support-Plans/) — maintainers writing honestly about winding a dependency down.

## B6. Testing

`[R03 §B5]` establishes why automating a desktop UI stayed hard, and the
mechanism transfers wholesale: there is no seam, because the visible state lives
in a widget tree owned by the OS; the only general answer was the accessibility
layer; and that layer is **opt-in per control**, so a custom control is testable
only if its author made it so. Espresso, UI Automator and XCUITest all rest on
the same foundation — Apple states it outright, "UI testing rests upon two core
technologies: the XCTest framework and Accessibility" `[R03 §B5]`.

**The mobile addition is a second variable on top of that one: the device
itself.**

The frameworks are unremarkable and well documented: Espresso for in-process
Android UI tests
([Espresso](https://developer.android.com/training/testing/espresso)), UI Automator
for cross-app and system-level tests — it "lets you test an app from outside of
the app's process"
([UI Automator](https://developer.android.com/training/testing/other-components/ui-automator)),
and XCTest on Apple platforms
([XCTest](https://developer.apple.com/documentation/xctest)).

**Why device-level testing stayed necessary** is the part worth arguing. Emulators
and simulators reproduce the API, not the device: OEM skins, vendor-modified
Android builds, real GPUs, real thermal behaviour and real memory pressure are
not in the image. The scale of the variation is the evidence — OpenSignal counted
24,093 distinct Android device models in use in 2015
([VentureBeat, 2015-08-05](https://venturebeat.com/mobile/fragmentation-report-there-are-now-24093-distinct-android-devices-up-78-from-last-year)
— **secondary, and the article's own headline and body disagree on the growth
rate, so cite the count, not the increase**). Device farms exist for exactly this:
Firebase Test Lab runs tests "on devices hosted in a Google data center"
([docs](https://firebase.google.com/docs/test-lab) **[vendor]**), and AWS Device
Farm launched in July 2015 to test "against real phones and tablets in the AWS
Cloud" ([AWS](https://aws.amazon.com/about-aws/whats-new/2015/07/deliver-high-quality-apps-by-testing-them-against-real-phones-and-tablets-in-the-aws-cloud-with-device-farm)
**[vendor]**).

Two honest gaps: **Google's current emulator documentation does not prominently
enumerate the emulator's limitations** — it leads with "high fidelity — the
emulator provides almost all the capabilities of a real Android device"
([Android Emulator](https://developer.android.com/studio/run/emulator) **[vendor]**)
— and Apple's "Testing in Simulator versus testing on hardware devices" page
could not be retrieved in a readable form during this research. So the "emulators
are not enough" argument should be made from device diversity and from the
existence of device farms, not from a vendor admission that does not exist.

**For Moduł 6:** the transferable point is that a green test suite on an emulator
is evidence about your logic and almost no evidence about your app.

## B7. After release — telemetry as a bar somebody else sets

Crash reporting became a lifecycle stage. Crashlytics was acquired by Twitter in
January 2013, by Google on 2017-01-18, and its Fabric platform was shut down on
2020-03-31, with everything folded into Firebase
([TechCrunch, 2017-01-18](https://techcrunch.com/2017/01/18/google-twitter-fabric/) — **secondary**).

**The finding that matters is not the tooling but who holds the threshold.**
Google publishes "bad behavior thresholds": a user-perceived crash rate of
**1.09%** of daily users, or a user-perceived ANR rate of **0.47%**, and the
consequence is not internal — the app becomes "less discoverable on Google Play"
and "a warning may be displayed on your app's store listing"
([Android vitals thresholds](https://support.google.com/googleplay/android-developer/answer/9844486?hl=en)
**[vendor]**, checked 2026-08-29). **The platform sets the quality bar and
enforces it through distribution.** No desktop equivalent exists.

**Why this is a language-adjacent fact and not just an ops fact.** An ANR is
produced by blocking the main thread (A2.4); a user-perceived crash on Android is
very often an uncaught exception, historically a `NullPointerException` (A2.3).
So the two numbers Google enforces are, almost exactly, the two failure modes
that Kotlin's nullable types and coroutines were designed to remove. **The
platform set a bar, and the language moved to meet it.** That is the tightest
loop between Part A and Part B in this document, and it is the one to teach.

Apple is the control case. MetricKit is described only as a way to "measure your
app's performance using daily metric and diagnostic reports from real users"
([MetricKit](https://developer.apple.com/documentation/metrickit) **[vendor]**),
and I could find **no Apple-published numeric quality threshold tied to App Store
discoverability**. Third-party ASO blogs speculate; Apple does not publish. That
is an absence, not a fact — report it as "I could not find one", not as "Apple
does not do this."

## B8. Privacy as a lifecycle stage

Each step below added work a team must complete *before* it can ship, which is
what makes this a lifecycle stage rather than a feature.

- **Install-time → runtime permissions.** Android 6.0, 2015: "one of the largest
  changes to the permissions model"
  ([Android Developers Blog, 2015-08-27](https://android-developers.googleblog.com/2015/08/building-better-apps-with-runtime.html)
  **[vendor]**). A permission became a runtime state your code must handle, not a
  manifest line.
- **Privacy nutrition labels.** Required from 2020-12-08 (Apple's own
  announcement page was not retrievable in this session; date corroborated by
  [9to5Mac, 2020-11-05](https://9to5mac.com/2020/11/05/app-store-privacy-labels-developers/amp)
  — **secondary**).
- **App Tracking Transparency.** "These requirements apply to all apps starting
  April 26, 2021"
  ([Apple developer news, 2021-04-20](https://developer.apple.com/news/?id=ecvrtzt2)
  **[vendor]**).
- **Play Data safety section.** Required for all apps from 2022-07-20
  ([Android Developers Blog, 2021-10-18](https://android-developers.googleblog.com/2021/10/launching-data-safety-in-play-console.html)
  **[vendor]**).
- **Privacy manifests.** From 2024-05-01, apps adding a listed third-party SDK
  need privacy manifests, declared "required reasons" for certain APIs, and valid
  signatures ([Apple developer news, 2024-04-26](https://developer.apple.com/news/?id=pvszzano)
  **[vendor]**).
- **Age assurance, 2026.** US state App Store Accountability Acts require Apple
  and Google to expose age-verification and parental-consent APIs, with Texas's
  law effective 2026-01-01 (analysis at
  [Frankfurt Kurnit technology law blog, 2025-12-15](https://technologylaw.fkks.com/post/102lxsp/countdown-to-jan-1-2026-mobile-developers-must-adopt-apple-google-apis-to-com)
  — **secondary, a law firm's summary; verify against Apple's and Google's own
  API documentation before asserting anything**).

**The pattern is the lesson:** privacy on mobile is not a policy a team adopts.
It is a series of deadlines, set by two companies and increasingly by
legislatures, each of which added a gate between "the code works" and "the app is
in the store."

## B9. CI/CD

fastlane was written by Felix Krause and joined Google in January 2017
([krausefx.com, 2017-01-23](https://krausefx.com/blog/fastlane-is-joining-google));
it is still actively maintained, with v2.236.1 released 2026-06-11
([GitHub releases](https://github.com/fastlane/fastlane/releases)). Apple acquired
TestFlight's owner Burstly in February 2014
([9to5Mac, 2014-02-21](https://9to5mac.com/2014/02/21/apple-acquires-beta-testing-platform-testflight-through-burstly-purchase/)
— **secondary**) and now allows "up to 10,000 external testers per app"
([App Store Connect help](https://www.developer.apple.com/help/app-store-connect/test-a-beta-version/invite-external-testers)
**[vendor]**). Google Play's internal testing track is capped at 100 testers, with
closed testing scaling to lists of up to 2,000
([Play Console help](https://support.google.com/googleplay/android-developer/answer/9845334?hl=en)
**[vendor]**). Xcode Cloud was announced 2021-06-07
([Apple newsroom](https://www.apple.com/newsroom/2021/06/apple-introduces-new-developer-tools-and-technologies-to-create-even-better-apps/)
**[vendor]**).

**The causation is worth stating**, because CI/CD on mobile is not simply CI/CD
applied to a phone. `fastlane` exists because signing, provisioning, metadata,
screenshots and store upload are all separate manual rituals (B2), and automating
them was worth a whole tool. TestFlight and Play's testing tracks exist because
you cannot hand someone a binary (B1). **Every one of these tools is an
automation of a gate that the desktop does not have** — which is why a student's
desktop release in Moduł 9 will be a `git tag` and a file, and their Android
release will be a pipeline.

**Relevant to `research-02` §5.1:** these tester limits are the real constraint on
"a class tests my app", and they are more generous than the Play limited
developer account's 20-device cap that `research-02` already recorded.

> **Further reading for Part B.**
> [Android vitals bad behavior thresholds](https://support.google.com/googleplay/android-developer/answer/9844486?hl=en) — two numbers that decide whether an app is discoverable.
> [Google Play target API level requirements](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en) — the compliance treadmill, with this year's dates on it.
> [Apple's TN3125 on provisioning profiles](https://developer.apple.com/documentation/technotes/tn3125-inside-code-signing-provisioning-profiles) — why "just run my program" is not a thing on a phone.

---

# Part C — Desktop and mobile, side by side

The section Moduł 4a is built from.

## 1. What is genuinely different — with the mechanism

| Difference | Mechanism, not slogan |
| --- | --- |
| The platform owner controls the language | §3.3.1 (2010) prohibited non-Objective-C/C/C++/JS origination outright; today Guideline 2.5.2 forbids downloading executable code, which forces AOT compilation on every managed runtime (A2.1, A2.9) |
| The OS terminates your process | Android kills the *process*, not the Activity, by a published importance hierarchy; ANR at 5 s of unhandled input; iOS watchdog kills with `0x8badf00d` (A2.4, A2.5) |
| A store stands between you and your user | Every fix re-enters review; hence staged rollouts, phased release and remote config as the legal substitute for patching (B1, B3) |
| Permissions are granted at runtime, by the user | Android 6.0, 2015 — a permission became a runtime state your code branches on, not a manifest declaration (B8) |
| Battery and cellular are hard budgets | Doze and background execution limits mean the OS decides when your code runs; a 200 MB Play threshold triggers a mobile-data warning (A2.6) |
| Quality is graded by the platform | 1.09% crash / 0.47% ANR affect discoverability (B7) |

## 2. What is the same, and has been since 1984

Every item here is in `[R03 §"What has not changed since 1984"]`, which sources
each one, and is **not** re-argued: the event loop; the single UI thread; the
frozen window and its five-second timeout; state not belonging in the widget
tree (MVC 1979 → MVP 1996 → MVVM 2005 → MVU, which Research 03 calls "47 years of
re-deriving the same rule"); install / update / uninstall as a user-visible
burden. Mobile did not weaken any of them. It added an enforcer:
the same blocked main thread that produced a spinning cursor on a desktop
produces a *terminated process* on a phone. **That is a difference of consequence,
not of principle — and it is exactly why the principle is worth teaching.**

## 3. Where the two converged, roughly 2019–2026

- **Declarative UI on both sides.** SwiftUI runs on macOS from 2019; Compose
  Multiplatform covered desktop from December 2021; Flutter reached desktop
  stable in 2022 (A3).
- **Single codebases targeting both.** MAUI (2022), Avalonia and Uno
  (`research-02` §2), Flutter, Compose Multiplatform for iOS (May 2025), KMP
  (November 2023).
- **Store-style distribution on the desktop** — and, more consequentially,
  gatekeeping: macOS notarisation has been mandatory for software distributed
  *outside* the Mac App Store since 2020-02-03 (A3).
- **Even the permission model** is converging, with Windows only reaching per-app
  desktop permissions in a 2026 preview build (A3).

## 4. The answer: is "desktop versus mobile" still a real distinction in 2026?

**Yes — but it has moved. It is no longer a distinction about code, and it is now
almost entirely a distinction about who is in charge.**

Take the two halves separately, because that is what makes the answer usable:

**As a technical distinction, it is nearly gone.** In 2026 a student can write one
C# codebase, in one language, with one UI markup, and produce a desktop
application and an Android application (`research-02` §2). The UI paradigm is the
same on both. The concurrency model is the same. The architecture advice — keep
state out of the widget tree — is the same, and was the same in 1995. If
"desktop versus mobile" meant "different code", the honest answer would be that
the distinction has largely dissolved into a build target.

**As a distinction about power, it is sharper than it was in 2010.** On the
desktop the student can compile a binary in any language, put it on a web page,
and a stranger can run it. On mobile, none of those four freedoms is theirs:
the language is constrained by a runtime rule they cannot appeal, the binary must
be signed by a key whose loss is terminal, distribution runs through a reviewer,
and the app stops working if they ignore an annual deadline. **The lines of code
converged; the property rights did not.**

So the answer to give Moduł 4a, in one sentence: **in 2026 the difference between
a desktop app and a mobile app is not what you write, it is what you are allowed
to do with it afterwards.** That formulation has the advantage of being true, of
being demonstrable in class from `research-02` §5 (a GitHub Release costs
nothing; an Android release costs \$25, a key you must never lose, and an
annual migration), and of surviving the next framework.

**The one place a technical distinction genuinely survives** and should be named
rather than waved away: the app lifecycle (A2.5). A desktop process runs until
the user quits it. A mobile process is destroyed and recreated as routine
behaviour. Nothing on the desktop matches that, no cross-platform framework
abstracts it away, and it is the single most likely thing to surprise a student
who ports a working desktop app to a phone in Moduł 7.

---

# Cross-cutting questions

## 1. What caused each transition?

Mobile has a fourth cause the desktop lacks, and the discipline is to say *when
that was actually the reason* rather than reaching for it every time.

| Transition | Real cause |
| --- | --- |
| C/C++ → Java ME | **Hardware and economics.** A managed runtime became affordable on a feature phone, and carriers wanted one distribution format |
| Java ME / Symbian → iOS + Android | **Hardware, then distribution.** Capacitive touch and a real browser first; then a developer-to-user channel that bypassed carriers (B1) |
| Cross-compilers permitted, 2010 | **Platform policy, reversed by pressure.** Apple asserted a language rule and withdrew it in five months (A2.1). Xamarin, and therefore MAUI, exist because of this |
| Objective-C → Swift | **A vendor simply deciding.** No hardware change, no economic pressure, no developer revolt. Apple designed a language and shipped it (2014). This is the clearest case in the document |
| Java → Kotlin on Android | **A vendor deciding, but by steering.** Google never banned Java; it made Compose and new Jetpack APIs Kotlin-first (2019) and let gravity work |
| Imperative → declarative UI | **Language design, following the web.** React (2013) preceded SwiftUI (2019) and Compose (2021), and the only insider account confirms the influence (A2.7) |
| Bitcode required → removed | **A vendor simply deciding**, in both directions, seven years apart (A2.6) |
| Cross-platform's repeated returns | **Economics — team size and hiring**, not technical merit. The Airbnb/Shopify pair is the evidence (A2.8) |

**The honest summary: "a vendor decided" is the true cause about a third of the
time, and it is the cause the desktop story does not have.** But it is not the
cause of the 2007–08 hinge itself, which was hardware, or of the cross-platform
cycle, which is economics.

## 2. What is genuine progress and what is a cycle?

- **Native ↔ cross-platform: a cycle**, and it will recur. Six generations in
  eighteen years (A2.8), each claiming the last had the abstraction in the wrong
  place, and two large companies reaching opposite public conclusions about the
  same framework seven years apart. The variable that decides it is team shape,
  which is not a property of the technology and therefore never stabilises.
- **Imperative ↔ declarative: progress, not a cycle**, and Research 03 reached
  the same verdict independently — "different place… the syntax rhymes; the
  semantics do not" `[R03 §"What is genuine progress and what is a cycle?"]`.
  Markup-plus-designer (XAML 2006, XIB, XML layouts) described a tree you then
  mutated. Reactive declarative UI removes the mutation. That is a different
  place, not a return.
- **Web app ↔ installed app: a cycle, still turning** — see question 4.
- **Memory management: progress.** Nobody is going back to manual
  retain/release, and both major platforms spent a decade making their chosen
  approach cheaper rather than switching (A2.2).
- **Null safety: progress, and finished.** Every language that mattered on mobile
  now has it, and C# joined in 2019 (A2.3).

## 3. What has not changed since 2008?

Short list, deliberately. Everything on it is a candidate for teaching, because
it will outlive the framework in the syllabus.

1. **The platform owner picks the language.** Fifteen years of litigation and two
   regulatory regimes have not touched it (A2.1).
2. **Blocking the main thread is fatal**, and the timeout has not moved: 5
   seconds on Android since the beginning.
3. **Your process is not yours.** The OS terminates it, and the app must be able
   to come back from that.
4. **A store decides whether your users get your fix**, and how fast.
5. **Signing binds identity to a key**, and losing it is unrecoverable.
6. **A phone has a battery**, and everything about background execution follows
   from that.

## 4. What was tried, failed, and came back?

The mobile web versus native argument, treated evenhandedly and with dates,
because it is not settled and presenting it as settled would be teaching a
prejudice.

*Tried, 2007.* Apple's original answer to third-party development was web apps
([Apple, 2007-06-11](https://www.apple.com/newsroom/2007/06/11iPhone-to-Support-Third-Party-Web-2-0-Applications/)).

*Failed, publicly, 2012.* Mark Zuckerberg at TechCrunch Disrupt on 2012-09-11:
"The biggest mistake we've made as a company is betting on HTML5 over native"
([VentureBeat, contemporaneous](https://venturebeat.com/mobile/facebooks-zuckerberg-the-biggest-mistake-weve-made-as-a-company-is-betting-on-html5-over-native)
— **secondary, quoting him directly at the event**).

*Came back, 2015 onward.* Alex Russell and Frances Berriman named progressive web
apps in June 2015
([infrequently.org](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/));
Safari shipped service workers in 11.1, January 2018
([MacRumors](https://www.macrumors.com/2018/01/24/safari-11-1-new-features-ios-macos/)
— **secondary**); web push reached iOS home-screen web apps in 16.4, announced
2023-02-16 ([WebKit blog](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)).
Documented wins exist: Twitter Lite reported "65% increase in pages per session"
at 600 KB versus a 23.5 MB Android app
([web.dev case study, 2017-05-17](https://web.dev/case-studies/twitter)
**[vendor — Google promoting the technology, quoting Twitter's own figures]**).

*And the platform can still switch it off.* In February 2024 Apple confirmed it
would disable home-screen web apps for EU users in iOS 17.4, then reversed on
2024-03-01: "We have received requests to continue to offer support for Home
Screen web apps in iOS, therefore we will continue to offer the existing Home
Screen web apps capability in the EU"
([9to5Mac, quoting Apple's developer statement](https://9to5mac.com/2024/03/01/apple-home-screen-web-apps-ios-17-eu/)
— **secondary; Apple's own page is no longer retrievable**). And fifteen months
after the DMA, Open Web Advocacy reported that "no browser vendor has
successfully ported a competing engine to iOS"
([OWA, 2025-07-14](https://open-web-advocacy.org/blog/apples-browser-engine-ban-persists-even-under-the-dma/)
— **an advocacy group, not a neutral source; Apple's position is that the
capability exists and vendors have chosen not to use it**).

**The evenhanded verdict:** the web's *capabilities* on mobile have improved
continuously since 2015 and are still improving — WebGPU reached iOS 26 and
Chrome on Android
([web.dev, 2025-11-25](https://web.dev/blog/webgpu-supported-major-browsers)
**[vendor]**). What has not changed is that those capabilities are granted by the
same platform owner who competes with them, and can be modified — as the
17.4 episode showed — with two weeks' notice. **The technical argument is closer
than it was in 2012; the governance argument is why it has not resolved.**

---

## What this means for the course

Concrete, in module order. **Teach** / **mention once** / **leave out** are
deliberate, and the third category is the one that saves the year.

### Moduł 4a — *Co to jest aplikacja desktopowa, a co mobilna*

**Teach.** Part C, in its structure: what differs, what has been the same since
1984, what converged, and the answer in §4. The single most useful sentence to
build the lesson around is *"the difference is not what you write, it is what you
are allowed to do with it afterwards"* — because it is demonstrable in ten
minutes: put `research-02` §5.2 (a GitHub Release: free, no gatekeeper) next to
§5.1 (\$25, a key, developer verification, an annual API deadline).

**Teach, as the one surviving technical difference:** the app lifecycle (A2.5).
Rotate the phone, the Activity is destroyed and recreated, the field is gone.
This is the thing that will bite them in Moduł 7 and it cannot be abstracted away
by any framework in `research-02` §2.

**Mention once.** The constrained era. One slide: Symbian C++ needed descriptors,
a cleanup stack and two-phase construction because the device had no room for a
stack unwinder — and that is why almost nobody could hire for it. It makes the
point that constraints shape languages, and then it is done. Do **not** spend a
lesson on Palm OS heap sizes.

**Mention once, because it is genuinely striking and takes thirty seconds:**
Windows only got per-app camera and microphone permissions for ordinary desktop
apps in an Insider preview in **August 2026** — eleven years after Android 6.0
(A3). It lands the "mobile led here" point better than any argument.

**Leave out.** WAP, i-mode, the Symbian Foundation's corporate history, the
Palm OS Cobalt saga. Interesting to me, useless to them.

### Moduł 4b — *Ekosystem .NET*

This module currently asks students to read a framework comparison table
(`research-02` §2). **A6 is the missing paragraph that makes the table readable.**
Three things, in this order:

1. **Why C# is on a phone at all.** Apple's §3.3.1 prohibited it in April 2010;
   Apple withdrew the restriction in September 2010; Xamarin was founded in
   May 2011. A licence clause, not a technical breakthrough. **This is the single
   best story in the whole document for this course** because it makes "the
   platform owner picks the language" concrete, dated and consequential.
2. **What MAUI inherited.** The XAML/C#/MVVM idiom, from Xamarin.Forms (2014),
   which took it from the WPF/Silverlight tradition that died on Windows Phone.
   Show Microsoft's own class-by-class migration table. **Teach the idiom
   lineage; do not claim a codebase lineage — I found no evidence for one.**
3. **What it cost.** Windows Phone asked its developers to rewrite twice in five
   years (Silverlight → WinRT → UWP), and Microsoft's current docs say "UWP is no
   longer under active development." That is the price of backing a platform, and
   it is the honest counterweight to "Microsoft supports MAUI first-party."

**Teach, if iOS is ever discussed:** the Xamarin.iOS limitations page (A2.9). The
chain *Apple's rule → AOT compilation → `System.Reflection.Emit` unavailable →
a specific exception message* is the clearest example in the course of a policy
becoming a compiler error.

**Mention once.** That Objective-C was never formally deprecated, and that the
common claim it was is wrong. Ninety seconds, and it teaches source criticism.

**Leave out.** The full Silverlight → WinRT → UWP → WinUI 3 API archaeology. One
sentence on the three rewrites carries all the teaching value; the namespace
mappings carry none.

### Moduł 4c — *Nasza decyzja*

4c asks students to make a real decision and record it with the alternatives
rejected. **A2.8 gives it the honest frame:** the cross-platform question has been
re-decided six times in eighteen years, and the deciding variable is team shape
rather than technical merit. **Use the Airbnb (2018) / Shopify (2025) pair
directly** — two competent companies, the same framework, opposite conclusions,
both well argued. That is what a real technology decision looks like, and it
inoculates students against the belief that there is a right answer to look up.

Note for the ADR they write: Airbnb's own post records that **63% of its
engineers who used React Native would choose it again**, in the post announcing
they were dropping it. A decision can be correct for an organisation and still
not be a verdict on the technology.

### Semester 2 — Moduł 7, 8, 9

- **Moduł 7 (*Z pulpitu na telefon*)** — the payoff module for A2.5. The reason
  keeping state out of the UI in 5d matters is not tidiness; it is that on
  Android the UI object is destroyed and recreated as normal behaviour. Also
  A2.4: the same blocked main thread that froze a window on the desktop
  *terminates the process* here, at a published 5-second threshold.
- **Moduł 9 (*Wydanie*)** — B2 and B4 are the additions to what `research-02` §5
  already holds. The lost-keystore disaster has no desktop equivalent and should
  be stated plainly. So should the compliance treadmill: an app that is finished
  stops working, and the 2026 dates are in B4.
- **Moduł 6 (*Testy i jakość*)** — B6 and B7. Two specific points: a green suite
  on an emulator is evidence about your logic and almost none about your app; and
  Android vitals means the *platform* sets the crash and ANR thresholds that
  affect whether anyone can find your app. Students used to choosing their own
  quality bar should meet a number somebody else chose.

### One proposal for `course-structure-v1.md` — not made here

`course-structure-v1.md` currently gives Moduł 4 five lessons (4a–4e) and 16
hours, and Moduł 4a carries both "what is a desktop app" and "what is a mobile
app". **Part C is a lesson's worth of material on its own**, and the
platform-power argument in A2.1 is arguably a second. If 4a feels overloaded when
it is written, the natural split is *4a: what the two things are* and a new lesson
on *who controls a platform, and what that means for you* — which would also give
Moduł 9's distribution material somewhere to point back to.

**I am not making that edit** (stop condition). Recording it as a proposal, with
the note that it would push Moduł 4 to six lessons and worsen the schedule tension
already recorded in that file about 4e landing around week 9–10.

**A second, smaller proposal — also not made:** renumber the four research files
in this folder and update `README.md`'s file table, which currently lists none of
them. See the numbering note at the top of this file. Research 03 raises the same
proposal from its side, which means two documents now agree it should happen and
neither has done it.

### What this document deliberately does not settle

The lab OS, whether iOS is reachable at all, and the INF.04 requirements are
`research-02`'s open questions and remain **`TO CONFIRM`**. Nothing in this file
changes them. Note only that if "mobile" in this course means Android (as
`research-02` §2.3 argues it must without Macs), then roughly a third of Part A —
everything about Apple's language control, ARC, Swift and the AOT restriction —
is background the students will never touch directly. **It is still worth
teaching, because it is the clearest evidence for the argument in Part C, but it
should be taught as evidence rather than as skills.**

---

## What rots

This field rots faster than the desktop one. In rough order of how fast:

**Re-check before any lesson is written (months, not years):**

1. **Every store commission, fee tier and regulatory ruling in B1.** Google's
   2026-03-04 changes roll out through September 2027; Epic v. Apple was remanded
   in December 2025 and was still live in 2026. Anything in this file about
   commissions is a snapshot of 2026-08-29.
2. **Target API level and SDK deadlines (B4).** These change every year by
   design. The 2026 numbers — Android 16 / API 36 by 2026-08-31, iOS 26 SDK from
   2026-04-28 — will be wrong for the 2027 school year.
3. **Apple's iOS adoption figures (B4)** — a live dashboard.
4. **Framework versions (A2.8):** React Native 0.87, Flutter 3.47, .NET MAUI 10.
   MAUI 10 is supported to 2027-05-11, which is inside the next school year.
5. **`research-02`'s Android developer-verification timeline**, which this file
   does not restate but which interacts with everything in B1–B2.

**Re-check yearly:**

6. **The App Store Review Guidelines**, especially 2.5.2, 2.5.6 and 4.7 — the
   entire A2.1 and B3 argument depends on their current text.
7. **Whether Apple has ever formally deprecated Objective-C.** My finding is that
   it has not. That could change with any WWDC.
8. **Android vitals thresholds (1.09% / 0.47%)** and whether Apple has begun
   publishing an equivalent.
9. **Whether Google restores a public OS-version distribution dashboard.** It
   currently publishes only Vulkan/OpenGL data.
10. **React Native's bridge removal.** In phased removal since 2024; the interop
    layer still existed as of 0.84 in February 2026.

**Link rot specifically.** Mobile's sources vanish faster than the desktop's, and
this research pass hit it repeatedly:

- **Apple's "Thoughts on Flash" (2010) is a 404.** The text here rests on two
  independent same-day reproductions.
- **Apple's "Common App Rejections" page appears to be gone.**
- **Apple's original 2020 privacy-labels announcement** could not be retrieved.
- **Apple's own March 2024 statement restoring EU home-screen web apps** could
  not be found on apple.com; only a quotation survives.
- **Palm and Symbian developer documentation exists only on mirrors.**
- **archive.org was unreachable from this research environment throughout**, so
  nothing here is backed by an archived capture. **That is the single biggest
  weakness of this document's sourcing**, and the first thing to fix on a re-run:
  re-check the 404'd and mirror-only sources against the Wayback Machine and cite
  captures with dates.

**What will not rot**, and is therefore what the lessons should be built on: the
six items in cross-cutting question 3, and the Part C answer.

---

## Sources

Grouped as a reading list. **Start-here entries are marked ★.** All opened
2026-08-29. Marks: **[P]** primary · **[V]** vendor claim about its own product ·
**[S]** secondary · **[M]** mirror of a document whose original host is gone.

### Start here — the six that best repay opening

- ★ **[P]** [Apple, "Statement by Apple on App Store Review Guidelines", 2010-09-09](https://www.apple.com/newsroom/2010/09/09Statement-by-Apple-on-App-Store-Review-Guidelines/) — three paragraphs that ended the language ban and created the cross-platform industry. The origin of C# on iOS.
- ★ **[P]** [Clang, Automatic Reference Counting specification](https://clang.llvm.org/docs/AutomaticReferenceCounting.html) — ARC stated as what it is: a compile-time transformation with no cycle collector.
- ★ **[P]** [Xamarin.iOS limitations](https://learn.microsoft.com/en-us/previous-versions/xamarin/ios/internals/limitations) — a platform rule becoming a compiler mode becoming an exception message. The best single page for Moduł 4b.
- ★ **[P]** [Airbnb, "Sunsetting React Native", 2018-06-19](https://medium.com/airbnb-engineering/sunsetting-react-native-1868ba28e30a) and **[V]** [Shopify, "Five years of React Native", 2025-01-13](https://shopify.engineering/five-years-of-react-native-at-shopify) — read as a pair; the whole cross-platform argument in two honest documents.
- ★ **[V]** [Android vitals bad behavior thresholds](https://support.google.com/googleplay/android-developer/answer/9844486?hl=en) — two numbers that decide discoverability. The clearest case of a platform setting a team's quality bar.
- ★ **[P]** [SEC press release on App Annie, 2021-09-14](https://www.sec.gov/newsroom/press-releases/2021-176) — why store analytics get named and dated, not quoted as fact.

### The constrained era (A1, A4)

- **[M]** [Palm OS Programmer's Companion (PDF)](https://stuff.mit.edu/afs/sipb/project/pilot/doc/Companion.pdf) — `PilotMain`, the event loop. Supports A1.
- **[M]** [Palm OS memory management chapter](https://www.fuw.edu.pl/~michalj/palmos/Memory.html) — dynamic heap sizes and the 64 KB chunk limit. Medium confidence: mirror only.
- **[M]** [Symbian Developer Library: two-phase construction](https://katastrophos.net/symbian-dev/GUID-48AD5B98-DBA8-4601-A158-12559985BCEB.html) and [descriptors](https://katastrophos.net/symbian-dev/GUID-21627ABC-AA70-4837-89A1-28BD9B2FD4B0.html) — why Symbian C++ was what it was.
- **[P]** [JSR 30 (CLDC 1.0)](https://jcp.org/en/jsr/detail?id=30) · [JSR 37 (MIDP 1.0)](https://jcp.org/en/jsr/detail?id=37) · [JSR 118 (MIDP 2.0)](https://jcp.org/en/jsr/detail?id=118) · [JSR 139 (CLDC 1.1)](https://jcp.org/en/jsr/detail?id=139) — the dates, from the JCP itself.
- **[P]** [Sun, *The K Virtual Machine* white paper, 2000-05-19 (PDF)](https://www.oracle.com/a/tech/docs/java/kvmwp.pdf) — no floating point, no reflection, under 128 KB. The constraints in the vendor's own words.
- **[S]** [NUS device-fragmentation survey, 2008](https://www.comp.nus.edu.sg/~damithch/df/device-fragmentation.htm) — Java ME fragmentation. Low confidence: its primary sources are dead.
- **[S]** [Elop's "burning platform" memo, 2011-02-08](https://www.engadget.com/2011-02-08-nokia-ceo-stephen-elop-rallies-troops-in-brutally-honest-burnin.html) — a platform collapse described from inside.
- **[P/V]** [BlackBerry end-of-life notice](https://www.blackberry.com/us/en/support/devices/end-of-life) — services ended 2022-01-04.
- **[P]** [Jakob Nielsen, "WAP Backlash", July 2000](https://www.nngroup.com/articles/wap-backlash/) — contemporaneous criticism, not a retrospective. *Further reading only; WAP is not taught.*

### The hinge, 2007–2008 (A1)

- **[P]** [Apple, "iPhone to Support Third-Party Web 2.0 Applications", 2007-06-11](https://www.apple.com/newsroom/2007/06/11iPhone-to-Support-Third-Party-Web-2-0-Applications/) — the original web-app position.
- **[P]** [Apple, iPhone SDK beta, 2008-03-06](https://www.apple.com/newsroom/2008/03/06Apple-Announces-iPhone-2-0-Software-Beta/)
- **[P]** [Open Handset Alliance announcement, 2007-11-05](https://www.openhandsetalliance.com/press_110507.html)
- **[P]** [Android 1.0 SDK, 2008-09-23](https://android-developers.googleblog.com/2008/09/announcing-android-10-sdk-release-1.html) · **[P]** [T-Mobile G1, 2008-10-22](https://www.t-mobile.com/news/press/t-mobile-launches-the-highly-anticipatedt-mobile-g1)
- **[P]** [Dan Bornstein, *Dalvik VM Internals*, Google I/O 2008 (PDF)](http://www.kandroid.org/board/data/board/AndroidBeginner/file_in_body/1/2008-05-29-Presentation-Of-Dalvik-VM-Internals.pdf) — the register-machine argument, by its designer. *Excellent further reading.*

### The platform owner picks the language (A2.1)

- **[S]** [§3.3.1 text, 2010-04-11](https://blog.rakeshpai.me/2010/04/section-331-of-iphone-sdk-license.html) and **[S]** [Daring Fireball quoting the old text, 2010-09-09](https://daringfireball.net/2010/09/app_store_guidelines) — the clause, from two independent contemporaneous reproductions. No primary copy exists.
- **[S]** ["Thoughts on Flash" reproduced](https://osxdaily.com/2010/04/29/steve-jobs-posts-his-thoughts-on-flash/) — Apple's original is a 404.
- **[P]** [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) — 2.5.2, 2.5.6 and 4.7 are the load-bearing sections.
- **[V]** [.NET MAUI iOS interpreter documentation](https://learn.microsoft.com/en-us/dotnet/maui/macios/interpreter?view=net-maui-9.0) — Microsoft stating Apple's no-dynamic-code rule from outside.
- **[P]** [Apple, alternative browser engines in the EU](https://developer.apple.com/support/alternative-browser-engines/) — where JIT was granted, and to whom only.
- **[P]** [Google I/O 2017, Kotlin support](https://android-developers.googleblog.com/2017/05/android-announces-support-for-kotlin.html) · **[P]** [Google I/O 2019, "Kotlin-first"](https://android-developers.googleblog.com/2019/05/google-io-2019-empowering-developers-to-build-experiences-on-Android-Play.html) · **[P]** [developer.android.com/kotlin/first](https://developer.android.com/kotlin/first) — steering rather than compelling, written down.
- **[P]** [swift.org, Swift 6.3 with official Android SDK, 2026-03-24](https://www.swift.org/blog/swift-6.3-released/) — the 2026 surprise.
- **[P]** [Ninth Circuit, Epic v. Apple, 2025-12-11 (PDF)](https://cdn.ca9.uscourts.gov/datastore/opinions/2025/12/11/25-2935.pdf) · **[P]** [JFTC MSCA guidelines (PDF)](https://www.jftc.go.jp/file/MSCA_Guidelines_tentative_translation.pdf) — regulation touching distribution and payments, never language.
- **[V]** [Google Security Blog, Rust in Android, 2025-11-13](https://blog.google/security/rust-in-android-move-fast-fix-things/) — Google's own memory-safety figures. *Further reading; a vendor claim worth reading critically.*

### Memory, null safety, concurrency (A2.2–A2.4)

- **[P]** [Apple, "Garbage collection is not available in iOS"](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/GarbageCollection/Introduction.html) · **[P]** [NSGarbageCollector availability](https://developer.apple.com/documentation/foundation/nsgarbagecollector) — 10.5–10.10, correcting the common "removed in 10.13".
- **[P]** [Romain Guy, *Talking Trash: The Evolution of Garbage Collection on Android*](https://speakerdeck.com/romainguy/talking-trash-the-evolution-of-garbage-collection-on-android) — *the best further reading in this section.*
- **[V]** [source.android.com, ART improvements](https://source.android.com/docs/core/runtime/improvements) — Google's own Android 8.0 GC figures.
- **[P]** [Apple, messaging nil](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjectiveC/Chapters/ocObjectsClasses.html) — the silent-failure semantics.
- **[P]** [Hoare, "Null References: The Billion-Dollar Mistake", QCon London 2009](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/) · **[P]** [Kotlin null safety](https://kotlinlang.org/docs/null-safety.html)
- **[V]** [Google, "Fewer crashes and more stability with Kotlin", 2020-10-29](https://medium.com/androiddevelopers/fewer-crashes-and-more-stability-with-kotlin-b606c6a6ac04) — the origin of "20% fewer crashes". No methodology.
- **[P]** [C# nullable reference types](https://learn.microsoft.com/dotnet/csharp/fundamentals/null-safety/nullable-reference-types) — and Microsoft naming Kotlin, TypeScript and Swift as precedent.
- **[P]** [Android ANR](https://developer.android.com/topic/performance/vitals/anr) · **[P]** [Apple, watchdog terminations](https://developer.apple.com/documentation/xcode/addressing-watchdog-terminations)
- **[P]** [Kotlin coroutines KEEP](https://github.com/Kotlin/KEEP/blob/main/proposals/KEEP-0164-coroutines.md) — cites C# three times. **[P]** [SE-0306, Actors](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0306-actors.md) — Swift's one C#/Orleans citation.

### Lifecycle, size, UI, cross-platform, interop (A2.5–A2.9)

- **[P]** [Android Activity lifecycle](https://developer.android.com/guide/components/activities/activity-lifecycle) · **[P]** [Handle configuration changes](https://developer.android.com/guide/topics/resources/runtime-changes) · **[P]** [Loaders (deprecated)](https://developer.android.com/guide/components/loaders) · **[P]** [ViewModel saved state](https://developer.android.com/topic/libraries/architecture/viewmodel/viewmodel-savedstate) — the churn, in the platform's own words.
- **[P]** [Managing your app's life cycle (iOS)](https://developer.apple.com/documentation/uikit/managing-your-app-s-life-cycle)
- **[P]** [Enable multidex](https://developer.android.com/build/multidex) · **[P]** [R8 keep rules](https://developer.android.com/topic/performance/app-optimization/keep-rule-examples) · **[P]** [Xcode 14 release notes (bitcode deprecated)](https://developer.apple.com/documentation/xcode-release-notes/xcode-14-release-notes)
- **[V]** [flutter/flutter#181344, `IconData` and icon tree-shaking](https://github.com/flutter/flutter/issues/181344) — a `const` requirement caused by kilobytes.
- **[P]** [Flutter, Introduction to declarative UI](https://docs.flutter.dev/flutter-for/declarative) · **[P]** [Jetpack Compose 1.0, 2021-07-28](https://android-developers.googleblog.com/2021/07/jetpack-compose-announcement.html) · [Leland Richardson, *React, Meet Compose*](https://speakerdeck.com/lelandrichardson/react-meet-compose) — the only insider acknowledgment of React's influence I could find.
- **[P]** [Apache Cordova, "Goodbye PhoneGap", 2020-08-14](https://cordova.apache.org/announcements/2020/08/14/goodbye-phonegap.html) · [Apache Attic project list](https://attic.apache.org/projects.html) — evidence Cordova is *not* retired.
- **[V]** [Xamarin support policy — support ended 2024-05-01](https://dotnet.microsoft.com/en-us/platform/support/policy/xamarin) · **[V]** [.NET MAUI GA, 2022-05-23](https://devblogs.microsoft.com/dotnet/introducing-dotnet-maui-one-codebase-many-platforms/) · **[V]** [.NET MAUI support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/maui)
- **[V]** [React Native 0.76, New Architecture default, 2024-10-23](https://reactnative.dev/blog/2024/10/23/release-0.76-new-architecture) · **[V]** [React Native 0.84, 2026-02-11](https://reactnative.dev/blog/2026/02/11/react-native-0.84) — the bridge's phased removal.
- **[V]** [JetBrains, Kotlin Multiplatform stable, Nov 2023](https://blog.jetbrains.com/kotlin/2023/11/kotlin-multiplatform-stable/) · **[V]** [Compose Multiplatform for iOS stable, May 2025](https://blog.jetbrains.com/kotlin/2025/05/compose-multiplatform-1-8-0-released-compose-multiplatform-for-ios-is-stable-and-production-ready/)
- **[P]** [Android JNI tips](https://developer.android.com/ndk/guides/jni-tips) · **[P]** [Flutter platform channels](https://docs.flutter.dev/platform-integration/platform-channels) · **[V]** [React Native, why a new architecture](https://reactnative.dev/docs/0.72/the-new-architecture/why)

### The Microsoft lineage (A4, A6) — primary sources for Moduł 4b

- **[P]** [Microsoft, .NET Compact Framework launch, 2003-03-19](https://news.microsoft.com/source/2003/03/19/microsoft-launches-mobile-developer-solution-featuring-net-compact-framework) — the date C# became a mobile language.
- **[P]** [Windows Phone tombstoning and the Silverlight app model](https://learn.microsoft.com/sharepoint/dev/general-development/how-to-store-and-retrieve-sharepoint-list-items-on-a-windows-phone) — Microsoft's documented answer to the lifecycle problem, in C#, in 2010.
- **[V]** [Windows Developer Blog, Silverlight → WinRT XAML migration, 2014-12-17](https://blogs.windows.com/windowsdeveloper/2014/12/17/bring-your-windows-phone-silverlight-apps-to-windows-runtime-xaml-prepare-for-universal-app-development-in-windows-10/) — asking your developers to rewrite, written as good news.
- **[P]** [Windows 10 Mobile end of support, 2019-12-10](https://learn.microsoft.com/en-us/lifecycle/announcements/windows-10-mobile-end-of-support) · **[P]** [Silverlight end of support, 2021-10-12](https://learn.microsoft.com/en-us/lifecycle/announcements/silverlight-end-of-support)
- **[V]** ["UWP is no longer under active development"](https://learn.microsoft.com/windows/apps/develop/ai-assisted/migrate/uwp-to-winui)
- **[V]** [Xamarin.Forms → .NET MAUI migration, API changes](https://learn.microsoft.com/dotnet/maui/migration/multi-project-to-single-project?view=net-maui-10.0) and [layout behaviour changes](https://learn.microsoft.com/dotnet/maui/migration/layouts?view=net-maui-10.0) — the inheritance, class by class.

### Measuring popularity (A5)

- **[V]** [Stack Overflow 2025 methodology](https://survey.stackoverflow.co/2025/methodology) and [technology results](https://survey.stackoverflow.co/2025/technology) — including its own admission of self-selection.
- **[V]** [JetBrains 2025 methodology](https://lp.jetbrains.com/developer-ecosystem-2025-methedology/) — including its own bias correction.
- **[V]** [TIOBE's definition page](https://www.tiobe.com/tiobe-index/programminglanguages_definition/) — it counts search hits. *Worth opening once, as an antidote.*
- **[S]** [Appfigures, cross-platform share of new apps, 2025-03-07](https://appfigures.com/resources/insights/20250307?f=1) — SDK detection, not a registry.
- **[S]** [RedMonk's own disclaimer](https://redmonk.com/sogrady/2016/02/19/language-rankings-1-16/) — the methodological point, made by a ranking publisher.

### The lifecycle (Part B)

- **[V]** [Apple App Review](https://developer.apple.com/distribute/app-review/) · **[V]** [Apple Small Business Program, 2020-11-18](https://www.apple.com/newsroom/2020/11/apple-announces-app-store-small-business-program/) · **[V]** [Google Play 15% tier](https://support.google.com/googleplay/android-developer/answer/10632485?hl=en) · **[V]** [Google, 2026-03-04](https://android-developers.googleblog.com/2026/03/a-new-era-for-choice-and-openness.html)
- **[V]** [Android app signing and Play App Signing](https://developer.android.com/studio/publish/app-signing) · **[P]** [Apple TN3125, provisioning profiles](https://developer.apple.com/documentation/technotes/tn3125-inside-code-signing-provisioning-profiles)
- **[V]** [Apple phased release](https://www.developer.apple.com/help/app-store-connect/update-your-app/release-a-version-update-in-phases) · **[V]** [Play staged rollout and halting](https://support.google.com/googleplay/android-developer/answer/6346149?hl=en) · **[V]** [Firebase Remote Config](https://firebase.google.com/docs/remote-config)
- **[V]** [Play target API level requirements](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en) · **[V]** [Apple SDK requirement, from 2026-04-28](https://developer.apple.com/news/?id=ueeok6yw) · **[V]** [Android dashboards (now Vulkan/OpenGL only)](https://developer.android.com/about/dashboards)
- **[V]** [CocoaPods maintenance mode, 2024-08-13](https://blog.cocoapods.org/CocoaPods-Support-Plans/) · **[V]** [Gradle configuration cache benchmarks, 2025](https://blog.gradle.org/road-to-configuration-cache)
- **[V]** [Firebase Test Lab](https://firebase.google.com/docs/test-lab) · **[S]** [OpenSignal fragmentation, 2015](https://venturebeat.com/mobile/fragmentation-report-there-are-now-24093-distinct-android-devices-up-78-from-last-year)
- **[V]** [Android runtime permissions, 2015-08-27](https://android-developers.googleblog.com/2015/08/building-better-apps-with-runtime.html) · **[V]** [App Tracking Transparency, from 2021-04-26](https://developer.apple.com/news/?id=ecvrtzt2) · **[V]** [Privacy manifests, from 2024-05-01](https://developer.apple.com/news/?id=pvszzano) · **[V]** [Play Data safety, from 2022-07-20](https://android-developers.googleblog.com/2021/10/launching-data-safety-in-play-console.html)
- **[V]** [fastlane joins Google, 2017-01-23](https://krausefx.com/blog/fastlane-is-joining-google) · **[V]** [TestFlight external testers](https://www.developer.apple.com/help/app-store-connect/test-a-beta-version/invite-external-testers) · **[V]** [Play testing tracks](https://support.google.com/googleplay/android-developer/answer/9845334?hl=en)

### Ideas that escaped, and web versus native (A3, cross-cutting Q4)

- **[P]** [JEP 533, Structured Concurrency](https://openjdk.org/jeps/533) — Java crediting Sústrik and Smith, not Kotlin.
- **[P]** [Nathaniel J. Smith, *Notes on structured concurrency*, 2018-04-25](https://vorpus.org/blog/notes-on-structured-concurrency-or-go-statement-considered-harmful/) — *further reading; the essay that named the idea.*
- **[P]** [Apple, Mac App Store opens, 2011-01-06](https://www.apple.com/newsroom/2011/01/06Apples-Mac-App-Store-Opens-for-Business/) · **[P]** [Apple, notarisation required from 2020-02-03](https://developer.apple.com/news/?id=12232019a)
- **[P]** [Windows Insider build 26340.9233, 2026-08-21](https://learn.microsoft.com/windows-insider/release-notes/experimental/preview-build-26340-9233) — per-app desktop permissions on Windows, at last.
- **[S]** [Zuckerberg on HTML5, 2012-09-11](https://venturebeat.com/mobile/facebooks-zuckerberg-the-biggest-mistake-weve-made-as-a-company-is-betting-on-html5-over-native)
- **[P]** [Alex Russell, "Progressive Web Apps: Escaping Tabs Without Losing Our Soul", June 2015](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/) — *further reading; where the term comes from.*
- **[P]** [WebKit, Web Push for web apps on iOS, 2023-02-16](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/) · **[S]** [Apple restores EU home-screen web apps, 2024-03-01](https://9to5mac.com/2024/03/01/apple-home-screen-web-apps-ios-17-eu/) · **[S]** [Open Web Advocacy on the DMA, 2025-07-14](https://open-web-advocacy.org/blog/apples-browser-engine-ban-persists-even-under-the-dma/) — an advocacy group; one side of a live dispute.

### In this repository

- [`research-01-ai-assisted-development.md`](research-01-ai-assisted-development.md) — §6 on why tool names rot, which this file's "What rots" applies.
- [`research-02-stack-tooling-constraints.md`](research-02-stack-tooling-constraints.md) — §2 (the current framework comparison, deliberately not redone here), §3 (INF.04, `TO CONFIRM`), §5 (distribution).
- [`research-03-desktop-app-history.md`](research-03-desktop-app-history.md) — **the sibling document**, written the same day. Cited throughout as `[R03 §…]`. Read its §A2.4 alongside this file's A2.7, and its §B5 alongside this file's B6.
- [`research-03-building-desktop-apps.md`](research-03-building-desktop-apps.md) and [`research-04-building-mobile-apps.md`](research-04-building-mobile-apps.md) — the *other* pair, answering what building an app looks like in 2026 rather than how it got that way. See the numbering note at the top of this file.
- [`course-structure-v1.md`](course-structure-v1.md) — Moduł 4 and the Semester 2 modules this file feeds.
- [`docs/adr/0008-sourcing-content-claims.md`](../adr/0008-sourcing-content-claims.md) — the rule this file is written under.
