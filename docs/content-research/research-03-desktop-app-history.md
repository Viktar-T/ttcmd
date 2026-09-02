# Research 03 — How building a desktop application changed, 1970s → 2026

| | |
| --- | --- |
| Written | 2026-08-29 |
| For | Course structure v1.0 — *Aplikacje desktopowe i mobilne* |
| Status | **Research notes.** Repo-facing English (Article III). Not lesson text. |
| Feeds | `course-structure-v1.md` — **Moduł 4a first**, then 4b, 4c, 5c, 5d, Moduł 6, Moduł 9, and one proposal for Moduł 1e |
| Note on numbering | A different `research-03-building-desktop-apps.md` already exists in this folder and is **not** superseded by this file: that one answers *what building a desktop app looks like in 2026*, this one answers *how it got that way and why*. Two files now share the number 03 and the README's file table does not list this one — **renumbering is proposed, not done** (this document edits nothing outside itself). |

> **ADR-0008 applies throughout.** Every statement here about what a tool does, what
> it cost, what a benchmark measured or what a platform requires carries a link and
> the date it was checked, inline, on the claim. Explanations of concepts carry no
> citation and need none. Where the record is folklore or the sources disagree, that
> is written down instead of being tidied away — **"widely repeated, poorly sourced"
> is a finding.** Everything was checked on **2026-08-29** unless a different date is
> given.
>
> **Article V still applies too.** Nothing here asserts anything about the school,
> the timetable, the lab machines or the INF.04 scope. Where such a fact would be
> needed it is marked `TO CONFIRM` and left open.

---

## Orientation — one table

The prose carries the argument. This table exists only so a reader can find their
place in it.

| Era | Dominant language(s) for a GUI app | How the UI was described | How it shipped |
| --- | --- | --- | --- |
| **1973–1983** research machines | BCPL, Mesa, Smalltalk-80 | Code. Objects sending messages; MVC appears 1979 | It mostly didn't — Alto never sold, Star sold badly |
| **1984–1990** first mass GUI | 68000 assembly + Pascal (Mac); C (Windows) | Imperative widget construction + resource files | Floppies, shrink-wrap, boxed retail |
| **1990–1995** platform API + frameworks | C, then C++ (OWL 1991, MFC 1992) | Resource scripts, dialog editors, message maps | Floppies → CD-ROM, retail channel |
| **1991–2000** the RAD years | Visual Basic, Object Pascal/Delphi, PowerBuilder | **Form designer + property sheet**; drag-drop components | CD, InstallShield, then MSI |
| **2002–2010** managed runtimes | C#, Java | Designer-generated code (WinForms) → **markup** (XAML, 2006) | Download, MSI, ClickOnce, first auto-updaters |
| **2005–2015** the web eclipse | JavaScript in a browser; Objective-C on Mac | HTML+CSS; XIB/Storyboard | A URL. Then the Mac App Store (2011) |
| **2013–2020** web stack returns to the desktop | JavaScript, TypeScript (Electron) | HTML+CSS + React's declarative model | Squirrel-class auto-update, code signing, notarization |
| **2019–2026** declarative + systems revival | Swift, Kotlin, Dart, C#, Rust | **Declarative code-as-UI** (SwiftUI, Compose, Flutter) alongside the XAML family | winget / Homebrew / Flatpak, stores, MSIX, notarization |

The batch and mainframe era is context, not a row. It matters here only as the thing
the personal machine broke away from: on a mainframe the program owns the schedule
and the user waits their turn; on a personal machine the *user* owns the schedule and
the program waits for them. That inversion is what created the event loop, and the
event loop is the one structure in this whole document that never goes away.

---

# Part A — Languages

## A1. The eras, and the language each one made obvious

This section is scaffolding for A2, not the deliverable. Each era is here to answer
three questions: what was the obvious choice, what did it make easy that the previous
one did not, and what did it give up.

**The research machines chose the language that could describe a machine.** The Xerox
Alto's system software was written mainly in **BCPL**, with Mesa arriving later as the
systems language; the report says outright that "very little assembly language code
has been written for the Alto"
([Thacker et al., *Alto: A Personal Computer*, Xerox PARC CSL-79-11, 7 August 1979](http://www.bitsavers.org/pdf/xerox/parc/techReports/CSL-79-11_Alto_A_Personal_Computer.pdf)).
The Xerox Star (1981) was built in **Mesa**. What Smalltalk-80 added on the same
hardware was not a better systems language but a different idea of what a program
*is*: a live graph of objects sending each other messages, edited from inside itself.
Alan Kay's own account is the primary source
([*The Early History of Smalltalk*, HOPL-II, 1993](https://worrydream.com/EarlyHistoryOfSmalltalk/)),
and Dan Ingalls' *Design Principles Behind Smalltalk* is the compressed version
([BYTE, August 1981](http://l3dswiki.cs.colorado.edu/dlc-2006/uploads/116/Design%20Principles%20Behind%20Smalltalk.pdf);
the whole issue is free at [archive.org](https://archive.org/details/byte-magazine-1981-08)).
It made *changing a running system* easy. It gave up everything the rest of the
industry was built on: files, text, separate compilation, and the ability to hand
someone a binary.

**The first mass-market GUI machines chose Pascal because a compiler was finally
affordable, and assembly because it still wasn't quite.** The Apple Lisa/Macintosh
codebase released by the Computer History Museum in 2023 has been counted: of 1,092
plain-text source files, 614 are Pascal and about 203 are MC68000 assembler — 408
kSLOC of Pascal against 45 kSLOC of assembler, roughly 89% / 10%
([rochus-keller/LisaPascal analysis of the CHM release](https://github.com/rochus-keller/LisaPascal);
the [CHM release itself, 19 January 2023](https://computerhistory.org/press-releases/chm-makes-apple-lisa-source-code-available-to-the-public-as-a-part-of-its-art-of-code-series/),
does not break down languages). Larry Tesler's object-oriented Pascal dialect
**Clascal** carried the Lisa Toolkit and later fed into Object Pascal
([CHM, *The Lisa: Apple's Most Influential Failure*](https://computerhistory.org/blog/the-lisa-apples-most-influential-failure/)).
The Toolbox's Pascal calling convention outlived the language
([Apple, *Pascal Calling Conventions*](https://developer.apple.com/library/archive/documentation/mac/runtimehtml/RTArch-133.html)).
*Confidence:* the much-repeated claim that the Mac ROM Toolbox is internally 68000
assembly exposed through a Pascal convention is everywhere in developer retrospectives
and I could not pin one primary sentence asserting both halves — treat as widely
repeated, thinly sourced.

**Windows chose C, and the shape of C-plus-a-platform-API defined the next fifteen
years.** The message loop — `GetMessage` / `TranslateMessage` / `DispatchMessage`,
dispatching to a `WndProc` — is still documented in the same terms today
([Microsoft Learn, *About Messages and Message Queues*](https://learn.microsoft.com/windows/win32/winmsg/about-messages-and-message-queues#message-handling)).
Charles Petzold's *Programming Windows* ran from the 1988 first edition through a 1996
fourth edition for the 32-bit API and threading, to a 2012 sixth edition in C# and XAML
([Petzold's own edition history](https://www.charlespetzold.com/pw5/ProgWinEditions.html)) —
one book's spine is a decent proxy for the whole era. C made the platform reachable
and gave up every abstraction: you managed memory, you managed the loop, you managed
the window.

**C++ frameworks wrapped the API and invented the macro-language problem.** Borland's
OWL shipped with Borland C++ 3.0 in 1991
([Borland C++ 3.0 User's Guide, 1991, bitsavers scan](https://archive.org/details/bitsavers_borlandborn3.0UsersGuide1991_9307755));
Microsoft's MFC "saw the light of day on February 26th 1992" with Microsoft C/C++ 7.0
([Microsoft C++ Team Blog, *Happy 25th Birthday MFC*](https://devblogs.microsoft.com/cppblog/happy-25th-birthday-mfc/)).
Both had to solve the same problem, and both solved it the same ugly way: Win32's
callback contract is C, with no room for an implicit `this`, so every C++ framework
thunks through a static gateway
([Raymond Chen, *How can I make a WNDPROC or DLGPROC a member of my C++ class?*, 3 February 2014](https://devblogs.microsoft.com/oldnewthing/20140203-00/?p=1893)).
MFC's message maps are a hand-rolled dispatch table built from macros, chosen over
virtual functions for space and speed
([Microsoft Learn, *TN006: Message Maps*](https://learn.microsoft.com/cpp/mfc/tn006-message-maps?view=msvc-170)).
C++ made reuse possible and gave up legibility: the framework became a second language
you also had to learn.

**The RAD years replaced the language question with a tooling question, and won.**
Visual Basic 1.0 shipped in May 1991, launched at Comdex/Windows World in Atlanta
([Wikipedia, *Visual Basic (classic)*](https://en.wikipedia.org/wiki/Visual_Basic_(classic)) —
tertiary, but the date is consistent across every source checked). Its visual shell came
from outside Microsoft:
Alan Cooper's "Ruby" prototype — "We could start with a window and put push buttons on
it… you could wire it together" — was bought by Microsoft in 1988 and married to
QuickBASIC
([Cooper interview, YourStory, 2017](https://yourstory.com/2017/06/techie-tuesdays-alan-cooper);
[CHM's profile](https://computerhistory.org/blog/2017-chm-fellow-alan-cooper-father-of-visual-basic/)).
Delphi 1.0 launched on 14 February 1995 with Anders Hejlsberg as lead architect and
the VCL
([Embarcadero's own corporate history](https://blogs.embarcadero.com/delphi-and-turbo-pascal-43-years-of-continuous-innovation/)),
and Hejlsberg put **properties and method pointers** into Object Pascal itself
([Object Pascal, with the ISO-working-draft attribution](https://en.wikipedia.org/wiki/Object_Pascal)) —
which is the language-level move that made the property sheet possible. PowerBuilder
(1.0, July 1991) did the same for client/server business applications and was bought
by Sybase in a deal announced 15 November 1994
([PowerBuilder history](https://en.wikipedia.org/wiki/Powerbuilder)); it still ships,
now from Appeon, with a release bulletin last revised 14 April 2026
([Appeon release bulletin](https://docs.appeon.com/pb/release_bulletin_for_pb/)).
What RAD made easy was the part that had cost the most: laying out a window. What it
gave up was structure — the code that ran when you double-clicked a button had nowhere
to live except behind that button.

**Managed runtimes traded control for safety and portability, twice.** Java's AWT
wrapped native "peer" widgets; Swing replaced them with lightweight components drawn
by Java itself — Oracle still states the distinction in exactly those terms
([*Mixing Heavyweight and Lightweight Components*](https://www.oracle.com/technical-resources/articles/java/mixing-components.html)).
On Windows, Windows Forms arrived with .NET Framework 1.0 in 2002 and was pitched
directly at VB developers as the replacement for VB forms
([Microsoft, January 2002](https://learn.microsoft.com/en-us/previous-versions/dotnet/articles/ms973856(v=msdn.10))).
WPF followed with .NET Framework 3.0 on 7 November 2006
([Microsoft's own release announcement](https://devblogs.microsoft.com/setup/microsoft-net-framework-3-0-released/)),
bringing XAML, a dependency-property system, a data-binding engine, and retained-mode
rendering through DirectX
([WPF Architecture: "All display in WPF is done through the DirectX engine"](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/wpf-architecture);
[WPF graphics rendering: "WPF uses a retained mode system"](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/graphics-multimedia/wpf-graphics-rendering-overview)).
Both made memory safety and rich libraries normal; both gave up startup time, binary
size and — for a decade — the feeling of a native application.

**The dynamic languages arrived on the desktop through a side door and stayed.** John
Ousterhout began Tcl in 1988 and Tk in late 1988
([tcl-lang.org history](https://www.tcl-lang.org/about/history.html);
[the original 1990 USENIX paper](https://web.stanford.edu/~ouster/cgi-bin/papers/tcl-usenix.pdf)),
and later wrote the canonical argument for why a scripting language is a different
tool rather than a worse one
([*Scripting: Higher-Level Programming for the 21st Century*, IEEE Computer, March 1998](https://www.tcl-lang.org/doc/scripting.html)).
Tk is why `tkinter` is in Python's standard library to this day
([Python docs](https://docs.python.org/3/library/tkinter.html)) — and it is the only
GUI toolkit there, which is why every serious Python desktop app reaches for Qt
([Qt for Python / PySide](https://www.qt.io/qt-for-python)) or PyQt, whose licence is
GPL-or-commercial and notably *not* LGPL
([Riverbank Computing](https://riverbankcomputing.com/software/pyqt/)) — a licensing
detail that has decided more student projects than any technical property. Qt itself
began at Trolltech in 1995, went GPL in 2000 and added LGPL under Nokia in January
2009, and remains dual-licensed today
([Qt licensing, checked 2026-08-29](https://www.qt.io/licensing/)).

**Objective-C and then Swift is the one lineage decided almost entirely by a single
vendor.** Objective-C came from grafting Smalltalk's message/object model onto C
([Cox, Naroff & Hsu, *The Origins of Objective-C at PPI/Stepstone and Its Evolution at NeXT*, HOPL IV, 2020](https://dl.acm.org/doi/10.1145/3386332)
— open access since ACM opened the whole Digital Library in January 2026;
a [free mirror](https://www.academia.edu/50810695/The_Origins_of_Objective_C_at_PPI_Stepstone_and_Its_Evolution_at_NeXT)
exists if the DOI is unreachable). Swift was announced at WWDC on 2 June 2014 and
open-sourced on 3 December 2015
([Apple Newsroom](https://www.apple.com/newsroom/2015/12/03Apple-Releases-Swift-as-Open-Source/)),
and declared ABI-stable on Apple platforms with Swift 5 on 25 March 2019
([swift.org](https://www.swift.org/blog/swift-5-released/)) — the rare case of a
language paying the full cost of a stable binary interface (see A2, *Interop*).

**JavaScript arrived on the desktop by carrying its whole runtime with it.** Electron
began as GitHub's "Atom Shell" — first repo commit 13 March 2013 — and was renamed
Electron on 23 April 2015
([Electron's rename post](https://www.electronjs.org/blog/electron);
[*10 Years of Electron*](https://electronjs.org/blog/10-years-of-electron)). It made
one codebase across three desktop platforms easy, and gave up memory, binary size and
any pretence of being native.

**The systems revival is a reaction to that give-up.** Tauri 2.0 stable landed on
2 October 2024, pairing a Rust backend with the operating system's own webview
([Tauri blog](https://v2.tauri.app/blog/tauri-20/)). Rust's case rests on evidence
that is unusually good for this field: Google reports Android's memory-safety
vulnerabilities falling from 76% of the total in 2019 to 24% in 2024
([Google Security Blog, 25 September 2024](https://security.googleblog.com/2024/09/eliminating-memory-safety-vulnerabilities-Android.html);
the [2022 post](https://security.googleblog.com/2022/12/memory-safe-languages-in-android-13.html)
gives the earlier 76%→35% step and "zero memory safety vulnerabilities" in Android's
Rust code to that date), and Microsoft's MSRC put the same class at ~70% of its own
CVEs while naming Rust
([MSRC, 18 July 2019](https://www.microsoft.com/en-us/msrc/blog/2019/07/we-need-a-safer-systems-programming-language)).
Go, by contrast, is marginal on the desktop and it is worth saying so: the official Go
FAQ does not mention GUI work at all
([go.dev/doc/faq](https://go.dev/doc/faq)), and the leading toolkit, Fyne (v2.8.1,
22 August 2026, [pkg.go.dev](https://pkg.go.dev/fyne.io/fyne/v2)), is community-run.
Modern C++ on the desktop today means Qt, or Dear ImGui (v1.92.8, 12 May 2026,
[GitHub](https://github.com/ocornut/imgui)), or JUCE 9 — now AGPLv3-or-commercial,
released 21 July 2026
([JUCE forum announcement](https://forum.juce.com/t/juce-9-is-available-now/69175)).

**And the current cross-platform declarative set is where the course actually sits.**
Flutter 1.0 shipped 4 December 2018
([Google Developers Blog](https://developers.googleblog.com/flutter-10-googles-portable-ui-toolkit/)),
its desktop targets reached stable with Flutter 3 on 11 May 2022
([Flutter blog](https://flutter.dev/blog/whats-new-in-flutter-3)), and 3.47 is current
as of 12 August 2026
([Flutter blog](https://flutter.dev/blog/whats-new-in-flutter-3-47)). Kotlin
Multiplatform was declared stable in November 2023 with Kotlin 1.9.20
([JetBrains](https://blog.jetbrains.com/kotlin/2023/11/kotlin-multiplatform-stable/)),
and Compose Multiplatform for iOS became stable with 1.8.0 in May 2025
([JetBrains](https://blog.jetbrains.com/kotlin/2025/05/compose-multiplatform-1-8-0-released-compose-multiplatform-for-ios-is-stable-and-production-ready/)).
The C# side of that set — MAUI, Avalonia, Uno — is compared as *frameworks* in
`research-02` §2 and is not re-argued here. The **language** point is worth one
paragraph, because it is different from the framework point and it is the one that
matters for A6. C# in 2026 is unusual in this list: it is the only language that reaches
every one of these eras' answers without changing language. The same C# writes an
imperative WinForms handler, a XAML-plus-binding WPF or Avalonia application, and —
through MAUI's Blazor hybrid or Uno's WebAssembly target — a web-rendered one; it
compiles to bytecode, to ReadyToRun, or ahead-of-time to native (A2.5); it garbage
collects but has `IDisposable` for deterministic release (A2.1); and it has both dynamic
binding (the `dynamic` keyword, added in C# 4.0 with Visual Studio 2010 —
[Microsoft Learn, *The history of C#*](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-version-history))
and gradually-adopted null-aware static typing (A2.2). That
breadth is the reason it is a defensible teaching language and also the reason it is
confusing to learn: **almost every historical answer in this document is still present
somewhere in the C# surface area, and nothing in the IDE labels which era a feature came
from.** Naming the eras is therefore not decoration; it is how a student navigates the
language they have actually been given.

> **Going deeper here:** the [Alto report (1979)](http://www.bitsavers.org/pdf/xerox/parc/techReports/CSL-79-11_Alto_A_Personal_Computer.pdf)
> is short and readable and shows how few pages a whole personal computer used to take;
> [Kay's *Early History of Smalltalk*](https://worrydream.com/EarlyHistoryOfSmalltalk/)
> is the best thing ever written about why anyone bothered; and
> [folklore.org](https://folklore.org/3rd_Party_Developers_and_Macintosh_Development.html)
> is the Macintosh as the people building it remember it — first-person, unreliable,
> and worth every minute.

## A2. The forces that actually moved the language

A1 is a sequence. This is the argument. Six threads run the whole length of the
period, none of them era-shaped, and between them they explain most of what A1
describes. Read this section as the answer to "why did the language change", and A1 as
the evidence.

### A2.1 Memory management: manual → counted → traced → owned

The desktop is where memory management became *visible*, because it is the only place
where the cost of getting it wrong is a person watching.

Manual is where everyone started: the Mac's Memory Manager with its handles, C's
`malloc`/`free`, Pascal's `New`/`Dispose`. **Reference counting** was the first
automation, and it arrived not as a language feature but as a protocol: COM's rules
require `AddRef` for every new copy of an interface pointer and `Release` for every
destruction
([Microsoft Learn, *Rules for Managing Reference Counts*](https://learn.microsoft.com/en-us/windows/win32/com/rules-for-managing-reference-counts)),
and Objective-C's `retain`/`release` was the same discipline by hand until Apple
automated it as ARC with Xcode 4.2 / OS X Lion / iOS 5 in 2011
([Apple, *Transitioning to ARC Release Notes*](https://developer.apple.com/library/archive/releasenotes/ObjectiveC/RN-TransitioningToARC/Introduction/Introduction.html)).
What counting bought was *determinism*: the object dies at a knowable moment, which is
exactly what you want for a file handle or a window. What it could not do is cycles —
the clang specification says so outright: ARC "does not provide a cycle collector;
users must explicitly manage the lifetime of their objects, breaking cycles manually
or with weak or unsafe references"
([clang, *Automatic Reference Counting*](https://clang.llvm.org/docs/AutomaticReferenceCounting.html)).
A retain cycle in a view controller is a leak that no tool will find for you, and that
is the price.

**Tracing garbage collection** solved cycles and gave up determinism. .NET's collector
is generational, with a large-object heap treated as "generation 3"
([Microsoft Learn, *Fundamentals of garbage collection*](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/fundamentals)),
and the existence of a whole documented API surface for *latency* —
`SustainedLowLatency`, `LowLatency`, `Batch`, `Interactive`
([*Latency modes*](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/latency)) —
plus a workstation-versus-server distinction
([*Workstation and server GC*](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/workstation-server-gc))
is itself the evidence for the argument. Nobody builds a latency-mode API for a batch
job. The GC has knobs because a 200 ms pause is nothing on a server and a visible
stutter in a window. The work has not stopped: DATAS, which adapts heap behaviour to
application size, was opt-in in .NET 8 and is on by default in .NET 9
([Microsoft Learn, *DATAS*](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/datas)).

The second cost of a runtime is *size*, and it is a desktop and mobile cost rather
than a server one. Microsoft's own figures, from the .NET 5 trimming work: a sample
self-contained deployment fell from 78.9 MB untrimmed to 39.7 MB with assembly-level
trimming and 31.5 MB with member-level trimming, and a Hello World went from about
10.5 MB to about 2.2 MB
([.NET Blog, *App trimming in .NET 5*, 31 August 2020](https://devblogs.microsoft.com/dotnet/app-trimming-in-net-5/) —
note that the current [trimming docs](https://learn.microsoft.com/en-us/dotnet/core/deploying/trimming/trim-self-contained)
explain the mechanism but carry no numbers, so this dated post is the citable source).

**Ownership and borrowing** is the newest answer and the first to refuse the trade
entirely: Rust's compile-time ownership rules give memory safety "with no runtime or
garbage collector"
([rust-lang.org](https://www.rust-lang.org/); the rules themselves are
[The Rust Book, ch. 4](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)).
What it buys is determinism *and* safety; what it costs is that the programmer now
proves lifetime properties to a compiler, which is a genuinely harder job than either
`free()` or nothing.

The shape of the whole thread: **each step moved work from the programmer to the
machine, and each step paid for it in a currency the desktop can feel** — first
correctness (manual), then cycles (counting), then latency and size (tracing), then
difficulty (ownership). Nobody won. The industry now runs all four at once, and picks
per component.

> **Going deeper:** [clang's ARC spec](https://clang.llvm.org/docs/AutomaticReferenceCounting.html)
> is the clearest short document on what reference counting can and cannot do;
> [.NET's GC latency modes](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/latency)
> read as a list of things people needed badly enough to get an API for.

### A2.2 Type systems: dynamic, static, and the day null became a language problem

The desktop hosted both extremes at once for most of its history. Smalltalk and Tcl
were fully dynamic; C and Pascal were statically typed; Visual Basic's `Variant`
straddled the two and made the straddle famous.

It is worth asking why the productive desktop languages leaned dynamic. A form designer
has to instantiate a control the programmer names at design time, set properties by
name, and wire an event by name — all of which are naturally late-bound operations, and
all of which VB and Delphi supported through mechanisms (VBX/OCX, published properties)
that are essentially runtime reflection with a graphical front end (A3). The dynamism
was not laziness; it was what made the tooling possible. The cost arrived at scale,
which is exactly the point at which the industry started buying it back.

Because the interesting movement is not between the poles but the third thing that
appeared around 2012: **gradual typing**, where types are optional, added to an existing
dynamic language, and checked before the program runs rather than while it does.

TypeScript is the canonical case. Microsoft announced it on 1 October 2012 with a
specific and narrow problem statement — "getting JavaScript development to scale"
([Somasegar's announcement, archived on Microsoft Learn](https://learn.microsoft.com/en-us/archive/blogs/somasegar/typescript-javascript-development-at-application-scale)) —
and its type system is structural, not nominal
([TypeScript handbook, *Type Compatibility*](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)),
which is what lets it describe code that was written without it. Python arrived at the
same place from the other direction: PEP 3107 added annotation *syntax* with no meaning
in 2006 ([peps.python.org](https://peps.python.org/pep-3107/)); PEP 484, created 29
September 2014 and targeting Python 3.5, gave that syntax a type meaning and said
plainly that "no type checking happens at runtime"
([PEP 484](https://peps.python.org/pep-0484/)). Both are the same bet: the value of
types is mostly in tooling and review, and can therefore be collected without changing
what the program does.

**Nullability is the sharper story, because it is where the industry decided that a
discipline problem was actually a language problem.** Tony Hoare named his own 1965
introduction of null references in ALGOL W a "billion-dollar mistake" at QCon London
in 2009 ([InfoQ, posted 25 August 2009](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/)).
The languages that came after took him at his word: Kotlin's own docs open its null-safety
page by naming "The Billion-Dollar Mistake"
([kotlinlang.org](https://kotlinlang.org/docs/null-safety.html)), and Swift's optionals
make absence a distinct type rather than a distinct value.

C# is the instructive case because it could not do that. Nullable reference types
arrived in C# 8, shipped September 2019 with .NET Core 3.0
([Microsoft Learn, *What's new in C# 8*](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-8);
[the feature docs](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-reference-types)),
and Mads Torgersen's design post from 15 November 2017 is explicit that the feature had
to be **opt-in, warning-based and compile-time only**, because eighteen years of
existing C# assumes every reference can be null
([.NET Blog, *Introducing Nullable Reference Types in C#*](https://devblogs.microsoft.com/dotnet/nullable-reference-types-in-csharp/)).
So a C# student in 2026 will meet a null-safety feature that produces warnings rather
than errors and offers no runtime guarantee — and the reason is not that the designers
were timid. It is that C# has to keep compiling code written in 2002.

Why did this become a *language* problem rather than a discipline one? Because
discipline does not survive contact with code you did not write. A convention holds
inside one team and one codebase; a type holds across a package boundary, a NuGet
restore and a decade. The move from "always check for null" to "the compiler knows
which things can be null" is the same move as from "always call `Release`" to ARC: a
rule that everyone agreed with and nobody could keep, promoted into the machine.

> **Going deeper:** [Torgersen's 2017 post](https://devblogs.microsoft.com/dotnet/nullable-reference-types-in-csharp/)
> is the best short read on what backward compatibility costs a language designer;
> [PEP 484](https://peps.python.org/pep-0484/) is worth opening just for how carefully
> it limits its own claims.

### A2.3 Concurrency and the frozen window

This is the thread with the strongest claim in the document: **a problem that has not
changed since 1984 produced, in 2012, the concurrency syntax that the entire industry
now uses for everything else.**

The constant first. Three vendors, three platforms, one rule.

- Windows: "Windows allows UI elements to be accessed only by the thread that created
  them" ([Microsoft Learn, *WPF threading model*](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/threading-model)),
  and at the Win32 level a thread's input messages go to the queue of the thread that
  created the destination window
  ([*About Messages and Message Queues*](https://learn.microsoft.com/windows/win32/winmsg/about-messages-and-message-queues#message-routing)).
- Android: "the Android UI toolkit is not thread-safe… 1. Don't block the UI thread.
  2. Don't access the Android UI toolkit from outside the UI thread"
  ([developer.android.com, *Processes and threads*](https://developer.android.com/guide/components/processes-and-threads)).
- Apple: "NSView and all of its descendants… must be used only from the main thread of
  an application"
  ([Apple, *Thread Safety Summary*](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Multithreading/ThreadSafetySummary/ThreadSafetySummary.html)),
  now expressed in Swift as `@MainActor`.

And the consequence is mechanical, dated and checkable, which makes it the single best
teaching artefact in this whole document: if a Windows UI thread does not pump messages
for **five seconds**, the desktop window manager decides the application is hung, hides
the real window and substitutes a bitmap "ghost" with *Not Responding* in the title.
`DisableProcessWindowsGhosting` turns the behaviour off — after which the user cannot
even close the application
([Microsoft Learn, *Preventing Hangs in Windows Applications*](https://learn.microsoft.com/en-us/previous-versions/windows/win32/win7appqual/preventing-hangs-in-windows-applications);
the same five-second timeout governs
[`IsHungAppWindow`](https://learn.microsoft.com/windows/win32/api/winuser/nf-winuser-ishungappwindow)).
Every student has seen this. Almost none of them know it is a *number in a
specification*.

The responses, in order: pump the message loop yourself inside a long operation (and
re-enter your own code, with all the bugs that implies); spawn a thread and marshal
results back; wrap that in a `BackgroundWorker`; and finally, change the language.
`async`/`await` shipped in C# 5 with Visual Studio 2012, and it was aimed squarely at
this problem — Stephen Toub's FAQ from 12 April 2012 ties the feature to "maintain[ing]
the responsiveness of your UI thread"
([.NET Blog, *Async/Await FAQ*](https://devblogs.microsoft.com/dotnet/asyncawait-faq/)),
and the mechanism that makes it work on the desktop is `SynchronizationContext`, which
posts the continuation back onto the UI thread so that the code after `await` is legal
to run there
([Toub, *How Async/Await Really Works in C#*, 16 March 2023](https://devblogs.microsoft.com/dotnet/how-async-await-really-works/)).
Eric Lippert was blogging the design in November 2010
([*Asynchrony in C# 5*, archived](https://learn.microsoft.com/en-us/archive/blogs/ericlippert/asynchrony-in-c-5-part-six-whither-async)),
and the semantics were later formalised academically
([Bierman, Russo, Mainland, Meijer & Torgersen, *Pause 'n' Play: Formalizing Asynchronous C#*, ECOOP 2012](https://gavinbierman.github.io/assets/pdf/ecoop2012.pdf)).
The direct ancestor is F#'s asynchronous workflows
([Syme et al., *The F# Asynchronous Programming Model*, PADL 2011](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/async-padl-revised-v2.pdf);
the [HOPL IV F# history](https://fsharp.org/history/hopl-final/hopl-fsharp.pdf) puts it
in context).

Then it escaped. Python 3.5 in 2015 ([PEP 492](https://peps.python.org/pep-0492/)),
JavaScript in ES2017 ([TC39 spec, §14.6](https://tc39.es/ecma262/2017/)), Kotlin 1.3 on
29 October 2018 ([JetBrains](https://kotlinlang.org/docs/whatsnew13.html)), Rust 1.39 on
7 November 2019 ([release](https://github.com/rust-lang/rust/releases/tag/1.39.0)),
Swift 5.5 on 20 September 2021 ([swift.org](https://www.swift.org/blog/swift-5.5-released/)).
Most of that use is server-side I/O. The syntax was designed against a window that
must not freeze, and it is now mostly used to wait for a database.

The thread has not ended. Structured concurrency — the argument that spawning a task
with no defined scope is the `goto` of concurrency — was made by Martin Sústrik in 2016
([250bpm](https://www.250bpm.com/p/structured-concurrency)) and Nathaniel J. Smith in
2018 ([*Notes on structured concurrency, or: Go statement considered harmful*](https://vorpus.org/blog/notes-on-structured-concurrency-or-go-statement-considered-harmful/)).
Swift adopted it in 5.5 ([SE-0304](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0304-structured-concurrency.md));
Kotlin's `coroutineScope` enforces it
([kotlinlang.org](https://kotlinlang.org/docs/coroutines-basics.html)); Java is still
previewing it — JEP 525 was the *sixth* preview, delivered for JDK 26, and JEP 533, the
seventh, is integrated for JDK 27
([JEP 525](https://openjdk.org/jeps/525); [Inside.java on JEP 533, 11 May 2026](https://inside.java/2026/05/11/jep533-target-jdk27/)).
Seven previews is a fact worth teaching on its own: this is hard, and the people doing
it are not fools.

> **Going deeper:** [*Preventing Hangs in Windows Applications*](https://learn.microsoft.com/en-us/previous-versions/windows/win32/win7appqual/preventing-hangs-in-windows-applications)
> is the whole frozen-window problem in one page, written by the people who built the
> ghost window; [Toub's *How Async/Await Really Works*](https://devblogs.microsoft.com/dotnet/how-async-await-really-works/)
> is long, current, and the best explanation of what the compiler actually generates;
> [Smith's structured-concurrency essay](https://vorpus.org/blog/notes-on-structured-concurrency-or-go-statement-considered-harmful/)
> is the one to hand a student who asks "why can't I just start a thread".

### A2.4 How the UI gets described — and whether 2026 is 1985 again

Four stages, and the question at the end is the one worth arguing.

**Stage one: imperative construction in code.** Smalltalk built its views by sending
messages to objects; Win32 builds windows with `CreateWindow` and paints them in
response to messages; the Mac Toolbox does the same through the Event Manager. The
window exists because your code made it exist, statement by statement.

**Stage two: resource files and form designers.** Windows resource scripts and dialog
templates, Mac `.rsrc`, VB's forms, Delphi's `.dfm`, NeXT's Interface Builder and its
`.nib` files — the filename extension still carries the acronym for *NeXTSTEP Interface
Builder*
([Apple, *Interface Builder User Guide*](https://developer.apple.com/library/archive/documentation/DeveloperTools/Conceptual/IB_UserGuide/Introduction/Introduction.html)).
What all of these produce is the same thing: a **serialized graph of widget instances**
that the runtime deserializes and hands to you, after which you mutate it. Interface
Builder was in NeXTStep 0.8 in October 1988
([betawiki](https://betawiki.net/wiki/NeXTStep_0.8) — community wiki, reasonable for
version detail, not an institutional source; note also that
[Jean-Marie Hullot's biography](https://en.wikipedia.org/wiki/Jean-Marie_Hullot)
dates the tool to 1985, and I found no source reconciling the two — flag it).

**Stage three: markup.** XAML with WPF in 2006, Android's XML layouts, Qt's QML. This
looks like a change of kind and mostly is not. Microsoft's own XAML overview is careful
to say XAML "is a larger language concept than WPF"
([Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/xaml/)), and
what a XAML file *is* remains an object graph — one whose elements you then keep in
sync with your data through a binding engine and `INotifyPropertyChanged`
([*Data binding overview*](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data/))
and whose properties live in a dedicated dependency-property system built precisely to
support binding, styling and animation
([*Dependency properties overview*](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/properties/dependency-properties-overview)).
Markup moved the *construction* out of code. The **mutation stayed**.

**Stage four: declarative, re-runnable UI.** React's original 2013 post already frames
components as a render function over state
([*Why did we build React?*, 5 June 2013](https://legacy.reactjs.org/blog/2013/06/05/why-react.html)),
and today's React docs put the contrast in one line: "Declarative programming means
describing the UI for each visual state rather than micromanaging the UI (imperative)"
([react.dev](https://react.dev/learn/reacting-to-input-with-state)). SwiftUI was
announced at WWDC on 3 June 2019 as "an innovative new way to build user interfaces…
With a declarative Swift syntax"
([Apple](https://developer.apple.com/news/?id=06032019b)). Jetpack Compose hit 1.0 on
28 July 2021 ([Android Developers Blog](https://android-developers.googleblog.com/2021/07/jetpack-compose-announcement.html)),
and Google's own mental-model page states the mechanism exactly: the industry is
"regenerating the entire screen from scratch, then applying only the necessary changes"
([developer.android.com, *Thinking in Compose*](https://developer.android.com/develop/ui/compose/mental-model)).

**So: is this a return to 1985 with better tooling, or a different place?**

**It is a different place, and the difference is not the syntax.** A 1985 form designer
and a 2026 `@Composable` both let you say what the window contains without writing
`CreateWindow`. They differ on what happens next. The designer produces a mutable
instance graph and hands you a reference to it; every later change is a statement that
mutates a widget, and the current truth about what the user sees lives *in the widget
tree*. The declarative model produces a **function from state to a description**, and
re-runs it; the current truth lives in your state, and the widget tree is a cache the
framework maintains. Markup — XAML, XML layouts — sits in the middle, which is exactly
why MVVM had to be invented on top of it (B2): the binding engine is a mechanism for
keeping a mutable tree in sync with state that lives elsewhere. Declarative UI removes
the need for that mechanism by removing the mutable tree from your side of the boundary.

Two honest caveats. First, the conclusion was reached twice, independently, from
different directions: Casey Muratori argued in 2005 that retained GUI trees were the
problem and immediate-mode rendering the answer
([caseymuratori.com/blog_0001](https://caseymuratori.com/blog_0001); the page carries a
2016 republish date for a 2005 talk, both stated on the page), and Dear ImGui
[credits him directly](https://github.com/ocornut/imgui). The games industry and the
application industry converged on "do not keep mutable state in the widget tree" a
decade apart without talking to each other, which is decent evidence that the rule is
about the problem rather than about fashion. Second, the cost is real: re-running a
description means the framework must diff it, and diffing is a performance model
students will meet as "why does my list stutter".

> **Going deeper:** [Thinking in Compose](https://developer.android.com/develop/ui/compose/mental-model)
> is the single clearest statement of the imperative→declarative shift by a vendor;
> [Muratori's 2005 piece](https://caseymuratori.com/blog_0001) is the same argument made
> before anyone was ready for it.

### A2.5 Compilation and distribution: native → bytecode → JIT → native again

The return trip is the interesting part, and the reason for it is a desktop and mobile
reason.

Java (1995) and .NET (2002) both replaced "compile to this machine" with "compile to a
bytecode, then compile again on the machine". The second compile got sophisticated:
HotSpot's tiered compilation profiles with a fast compiler first and recompiles hot
methods with an optimising one
([Oracle, *HotSpot performance enhancements*](https://docs.oracle.com/en/java/javase/21/vm/java-hotspot-virtual-machine-performance-enhancements.html)),
and the CLR JITs each method on first call
([Microsoft Learn, *Managed Execution Process*](https://learn.microsoft.com/dotnet/standard/managed-execution-process)).
The gains are real and they are all *steady-state* gains — the JIT knows the actual CPU
and the actual call patterns.

What it costs is the first second, and the first second is the whole experience of a
desktop or phone application. So the industry walked it back, carefully:

- **ReadyToRun** (.NET Core 3.0) precompiles ahead of time to reduce JIT work at
  startup, and Microsoft states the price in its own docs: "the size of an assembly
  will grow to between two to three times larger"
  ([Microsoft Learn, *ReadyToRun*](https://learn.microsoft.com/dotnet/core/deploying/ready-to-run#impact-of-using-the-readytorun-feature)).
- **Native AOT** goes all the way — no IL, no JIT — supported for console apps in
  .NET 7 and extended to ASP.NET Core in .NET 8
  ([*What's new in .NET 7*](https://learn.microsoft.com/dotnet/core/whats-new/dotnet-7);
  [*Native AOT deployment*](https://learn.microsoft.com/dotnet/core/deploying/native-aot/)),
  with sizes that Microsoft publishes: a Hello World on Linux x64 fell from 3.76 MB on
  .NET 7 to 1.84 MB on .NET 8, and on Windows x64 from 2.85 MB to 1.77 MB
  ([*What's new in .NET 8 — runtime*](https://learn.microsoft.com/dotnet/core/whats-new/dotnet-8/runtime#native-aot-support)).
- What it gives up is documented in the same place and matters for a UI framework: "No
  dynamic loading, for example, `Assembly.LoadFile`", "No runtime code generation, for
  example, `System.Reflection.Emit`", and on Windows "No built-in COM"
  ([*Limitations of Native AOT deployment*](https://learn.microsoft.com/dotnet/core/deploying/native-aot/#limitations-of-native-aot-deployment)).
  Which is why the desktop UI frameworks are the laggards: MAUI lists Native AOT as
  stable only for iOS and Mac Catalyst on .NET 9+, experimental on Android, and does
  not list Windows at all
  ([*.NET MAUI compilation strategies*, checked 2026-08-29](https://learn.microsoft.com/dotnet/maui/deployment/runtimes-compilation?view=net-maui-10.0#compilation-strategies)).
  *Confidence:* I could not find a single Microsoft page stating WinForms/WPF Native
  AOT status outright; the reading above is inference from the limitation list and the
  MAUI table, not a quoted position.

Android walked the same road **in the opposite direction**, which is the detail that
makes this a convergence rather than a fashion. Dalvik interpreted; ART compiled ahead
of time at install; and Android 7.0 added a JIT back, with profile-guided compilation
deciding per application what to compile when — Google's own words: "The JIT compiler
complements ART's current Ahead of Time (AOT) compiler… Profile-guided compilation lets
ART manage the AOT/JIT compilation for each app according to its actual usage"
([developer.android.com, Android 7.0 for developers](https://developer.android.com/about/versions/nougat/android-7.0.html);
[AOSP, *JIT compiler*](https://source.android.com/docs/core/runtime/jit-compiler)).
One side started at bytecode-and-JIT and added AOT; the other started at AOT and added
JIT. **Both ended up hybrid, because the constraints — startup latency, install size,
storage — are the same constraints.**

The newest bytecode target is WebAssembly, and one detail is worth correcting because
it is commonly misstated: Wasm 1.0 is a W3C Recommendation (5 December 2019), but the
**2.0 core spec is still a Candidate Recommendation Draft**, dated 16 June 2025
([webassembly.org/specs](https://webassembly.org/specs/);
[W3C](https://www.w3.org/TR/wasm-core-2/)). And the size trade shows up again in exactly
the same shape: Blazor's AOT-compiled WebAssembly apps are "about twice the size of
their IL-compiled versions"
([Microsoft Learn](https://learn.microsoft.com/aspnet/core/blazor/webassembly-build-tools-and-aot?view=aspnetcore-10.0#ahead-of-time-aot-compilation)).

> **Going deeper:** [*Limitations of Native AOT*](https://learn.microsoft.com/dotnet/core/deploying/native-aot/#limitations-of-native-aot-deployment)
> is a short list that explains a great deal about why reflection-heavy frameworks are
> slow to adopt it; [Android's JIT compiler doc](https://source.android.com/docs/core/runtime/jit-compiler)
> shows the same problem solved from the other end.

### A2.6 Interop, and why "just call the platform" is where the bleeding happens

Every cross-platform framework in the course's future has an escape hatch, and every
escape hatch exists for the same reason: **there is no portable way for two compiled
things to agree on how to talk.**

C++ is the sharpest illustration, because it is the language you would expect to
manage it. Microsoft says it plainly: "C++ doesn't have a stable application binary
interface (ABI)… while the C++ ABI isn't stable, the C ABI and the subset of the C++
ABI required for COM are stable"
([Microsoft Learn, *Overview of potential upgrade issues*](https://learn.microsoft.com/cpp/porting/overview-of-potential-upgrade-issues-visual-cpp?view=msvc-170#library-and-build-tools-dependencies)),
and .NET's own interop documentation reaches the same conclusion: "The C++ language has
no defined ABI across all .NET supported platforms and the most popular C++ compiler
implementations (MSVC, clang, GCC)… The recommended way to interoperate with C++ is to
export functions marked with `extern "C"`"
([*ABI support*](https://learn.microsoft.com/dotnet/standard/native-interop/abi-support)).
There *is* a cross-vendor specification — the Itanium C++ ABI, used by GCC and Clang —
and it disclaims universality in its own text: "This document is not an authoritative
definition of the C++ ABI for any particular platform"
([itanium-cxx-abi.github.io](https://itanium-cxx-abi.github.io/cxx-abi/abi.html)).

COM is what Windows built on top of that gap: "a binary interoperability standard for
creating reusable software libraries that interact at run time… independent of
implementation language", introduced in 1993 for OLE 2.0
([Microsoft Learn, *COM Technical Overview*](https://learn.microsoft.com/windows/win32/com/com-technical-overview);
[*Using COM in Your Windows Program*](https://learn.microsoft.com/windows/win32/learnwin32/module-2--using-com-in-your-windows-program)).
*Confidence:* Wikipedia dates COM to OLE 2 in 1992; where they disagree, prefer
Microsoft's 1993.

The managed languages each grew their own bridge, and each bridge has a cost that is
now visible. .NET's P/Invoke historically generated a marshalling stub at runtime —
which is why it collides with AOT: "Since this IL stub is generated at runtime, it
isn't available for ahead-of-time (AOT) compiler or IL trimming scenarios… Using
`DllImport` isn't an option for platforms that require full Native AOT scenarios"
([Microsoft Learn, *P/Invoke source generation*](https://learn.microsoft.com/dotnet/standard/native-interop/pinvoke-source-generation)),
hence the `LibraryImport` source generator in .NET 7. Java's JNI has been superseded by
the Foreign Function & Memory API, finalised in JDK 22 via JEP 454
([GraalVM docs stating the finalisation](https://docs.oracle.com/en/graalvm/jdk/22/docs/reference-manual/native-image/native-code-interoperability/foreign-interface/)).

And then the frameworks. Every current cross-platform toolkit documents its own hole in
the abstraction, which is the honest evidence that the hole is structural rather than a
bug:

- **Flutter** — platform channels, because Dart cannot call the platform directly
  ([docs.flutter.dev](https://docs.flutter.dev/platform-integration/platform-channels)).
- **.NET MAUI** — partial classes per platform for APIs MAUI does not abstract, plus
  handler `PlatformView` access
  ([*Invoke platform code*](https://learn.microsoft.com/dotnet/maui/platform-integration/invoke-platform-code?view=net-maui-10.0)).
- **Electron** — native Node modules must be rebuilt, because "Electron has a different
  application binary interface (ABI) from a given Node.js binary (due to differences
  such as using Chromium's BoringSSL instead of OpenSSL)"
  ([electronjs.org](https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules)).
  The ABI problem, one layer up, in a framework that was supposed to be above all this.
- **React Native** — the whole New Architecture exists to replace a serializing bridge
  with JSI so JavaScript can "hold a reference to a C++ object and vice-versa"
  ([reactnative.dev](https://reactnative.dev/architecture/landing-page)).

Swift is the counter-example that proves the cost: Apple declared ABI stability with
Swift 5 on 25 March 2019, and the payoff was that the Swift runtime libraries could
finally ship *inside the operating system* rather than inside every app
([swift.org](https://www.swift.org/blog/swift-5-released/)). That is what a stable ABI
is worth, and it took a single vendor controlling the whole platform to get one.

> **Going deeper:** [.NET's ABI support page](https://learn.microsoft.com/dotnet/standard/native-interop/abi-support)
> is two screens long and explains why every FFI in existence looks the way it does;
> [Electron's native-modules page](https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules)
> is the same problem biting a framework four abstraction layers away from the metal.

## A3. Ideas born on the desktop that escaped it

Five ideas that a student will meet in web, server or mobile work, all of which were
invented to solve a problem that only exists when a person is looking at a window.

**MVC came out of Smalltalk-80 at PARC in 1979.** Trygve Reenskaug's own account is the
primary source and lives on his university pages
([`heim.ifi.uio.no/~trygver/themes/mvc/mvc-index.html`](http://heim.ifi.uio.no/~trygver/themes/mvc/mvc-index.html) —
*flag: I could not fetch this page in this session; SSL and bot-blocking, not evidence
of absence. The citable, openable primary-era document is*
[Krasner & Pope, *A Cookbook for Using the Model-View-Controller User Interface Paradigm in Smalltalk-80*, JOOP, August/September 1988](https://www.ics.uci.edu/~redmiles/ics227-SQ04/papers/KrasnerPope88.pdf)).
Where it lives now: the letters MVC appear in server frameworks that have no views, no
controllers and no user interface in Reenskaug's sense. The concept escaped; the
definition did not survive the trip.

**Event-driven programming is the desktop's native shape and is now everyone's.** The
Win32 message loop and the Mac's Event Manager both invert control: your program does
not run, it *is called*. That inversion is now the default model of Node.js, of every
UI framework, and of most cloud runtimes. The canonical description is still
[Microsoft's message-queue documentation](https://learn.microsoft.com/windows/win32/winmsg/about-messages-and-message-queues#message-handling),
and a student who reads it will recognise `addEventListener` immediately.

**The component/property/event model came out of VB and Delphi.** A VBX and later an
OCX was a binary you dropped on a form, whose properties you edited in a grid and whose
events you handled by name
([Microsoft's own VB documentation of the flow](https://learn.microsoft.com/windows/win32/com/adding-a-component-to-a-visual-basic-project);
[the VBX→ActiveX migration list, archived MSDN](https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-basic-6/aa231208(v=vs.60))),
and Hejlsberg put properties and method pointers into Object Pascal so Delphi's designer
could do the same
([Object Pascal](https://en.wikipedia.org/wiki/Object_Pascal)). The Windows Forms
designer documents an identical interaction three decades later — drag from the Toolbox,
edit the Properties window, "double-click a control on the form and write code for the
control's default event"
([Microsoft Learn, *Windows Forms Designer overview*](https://learn.microsoft.com/visualstudio/designers/windows-forms-designer-overview?view=visualstudio)).
**Confidence, and this matters:** the *mechanics* are demonstrably identical, and the
lineage from VB to WinForms is documented by Microsoft's own 2002 migration article
([here](https://learn.microsoft.com/en-us/previous-versions/dotnet/articles/ms973856(v=msdn.10))).
The wider claim — that Interface Builder, Qt Designer and Android's layout editor
inherit from the same source — is **not sourced**. I looked; Qt's own retrospective on
Designer does not mention VB, Delphi or RAD at all
([*Evolution of Qt Designer*](https://doc.qt.io/archives/qq/qq14-designer.html)).
Convergent design is at least as likely as descent. Do not teach a lineage here.

**Data binding: the record is genuinely unclear, and that is the finding.** No
authoritative source establishes who first shipped two-way binding between a widget and
a data field. Developer lore points at VB3's data control (1993) and Delphi's
data-aware VCL controls (1995); Wikipedia's data-binding articles do not address origin
at all. What *is* documented is the modern lineage: WPF's binding engine and
`INotifyPropertyChanged`
([Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data/)), which
MVVM was designed around and which WinForms' own .NET 8 binding rework was explicitly
"modeled after"
([*What's new in Windows Forms in .NET 8*](https://learn.microsoft.com/en-us/dotnet/desktop/winforms/whats-new/net80)).
State the modern lineage; mark the origin unknown.

**`async`/`await` is the clearest case of escape in the document.** Designed against a
UI thread that must not block (A2.3), it is now the concurrency syntax of JavaScript,
Python, Rust, Kotlin and Swift, used overwhelmingly for network and database I/O on
servers that have no windows at all.

**Declarative UI ran the other way — and that is worth noticing.** React was a web idea
(2013) that native desktop and mobile frameworks adopted: SwiftUI 2019, Compose 2021,
Flutter throughout. The desktop exported MVC, events, components and `async`; it
imported its current UI model. A course that only tells the first story is telling half
of it.

> **Going deeper:** [Krasner & Pope (1988)](https://www.ics.uci.edu/~redmiles/ics227-SQ04/papers/KrasnerPope88.pdf)
> is what MVC actually meant before the word got loose;
> [Fowler's *GUI Architectures*](https://www.martinfowler.com/eaaDev/uiArchs.html) traces
> the whole family in one essay.

## A4. The languages that lost, and honestly why

The rule for this section: separate the technical reason from the commercial and
ecosystem reasons, and where the evidence points at the second, say so. No "X killed Y"
without a cited mechanism.

**Delphi / Object Pascal — commercial, not technical, and the price is checkable.**
The technical case against Delphi is weak: it shipped a native compiler, a component
model that everyone copied, and it is still shipping. RAD Studio 13.1 "Florence" is
current, with Embarcadero's own store listing perpetual licences at **$2,000
(Professional), $3,400 (Enterprise) and $4,416 (Architect)**, plus a free Community
Edition ([Embarcadero store, checked 2026-08-29](https://www.embarcadero.com/app-development-tools-store/rad-studio);
[RAD Studio FAQ](https://www.embarcadero.com/products/rad-studio/faq)). The commercial
story is much stronger. Borland renamed itself Inprise, effective 28 April 1998,
explicitly to shed a "struggling tools developer" image and chase enterprise
([Computer Business Review, 29 April 1998](https://www.techmonitor.ai/technology/borland_becomes_inprise_as_it_shifts_to_the_enterprise/)),
later reverted, and finally sold the IDE business: CodeGear went to Embarcadero in a
deal announced 7 May 2008 for **$23m** per The Register — against an initial $150m ask
in 2006 and $75.7m of CodeGear revenue that year
([The Register](https://www.theregister.com/2008/05/07/codegear_embarcadero/)) — or
about **$24.5m** per [Wikipedia's CodeGear article](https://en.wikipedia.org/wiki/CodeGear).
*The two figures disagree; both are sourced; do not pick the tidier one.* And Hejlsberg
had left for Microsoft years earlier. **Mechanism:** a tool with a four-figure entry
price, sold by a company that publicly repositioned away from tools, against a free SDK.
That is a distribution and pricing story.

**Visual Basic 6 → VB.NET — a compatibility break with no automated path.** VB6 shipped
in 1998; VB.NET (2002) was not source-compatible. In March 2005 more than 100 Microsoft
MVPs signed a petition asking for a COM-based continuation
([eWeek, 9 March 2005](https://www.eweek.com/development/microsoft-mvps-say-they-want-old-vb-back/);
one MVP's dissent, [Dan Appleman, 8 March 2005](https://danappleman.com/2005/03/08/the-revolt-of-the-vb-mvps-an-alternate-recommendation/),
is the best contemporaneous read). Microsoft answered twice within a week
([Somasegar, 16 March 2005](https://learn.microsoft.com/en-us/archive/blogs/somasegar/rumors-of-my-vb6-demise);
[Jay Roxe's open letter, 17 March 2005](https://learn.microsoft.com/nl-nl/archive/blogs/jroxe/an-open-letter-to-the-community)).
The IDE went out of support on 8 April 2008
([Microsoft lifecycle announcement](https://learn.microsoft.com/en-us/lifecycle/announcements/visual-basic-6-support-announcement)),
the **runtime is still supported in Windows 10 and Windows 11**
([Microsoft's VB6 support policy, checked 2026-08-29](https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-basic-6/visual-basic-6-support-policy)),
and on 11 March 2020 Microsoft stated of the successor: "Going forward, we do not plan
to evolve Visual Basic as a language"
([.NET Blog](https://devblogs.microsoft.com/vbteam/visual-basic-support-planned-for-net-5-0/)).
**Mechanism:** the migration cost was paid by the population least equipped to pay it —
people whose whole reason for using VB was not being systems programmers. Note also the
epilogue for A5: TIOBE still ranks Visual Basic **7th, at 2.18%, in August 2026**
([TIOBE](https://www.tiobe.com/tiobe-index/)) — above Rust, above Go. An index that
does that is telling you about itself.

**Java on the desktop — platform, then policy, and "lost" needs qualifying.**
Technically: AWT's peer widgets looked wrong everywhere, Swing's lightweight components
looked wrong everywhere consistently
([Oracle on the distinction](https://www.oracle.com/technical-resources/articles/java/mixing-components.html)),
and shipping a JRE was a distribution problem nobody solved. Then the delivery channels
closed: the Applet API was deprecated in Java 9 because "web-browser vendors remove
support for Java browser plug-ins"
([JEP 289](https://openjdk.org/jeps/289)), and Oracle's March 2018 client roadmap states
that "Oracle will not include Java Web Start in Java SE 11 (18.9 LTS) and later"
([*Java Client Roadmap Update*, PDF](https://www.oracle.com/docs/tech/java/javaclientroadmapupdate2018mar.pdf)),
while JavaFX was unbundled to OpenJFX/Gluon at the same release
([openjfx.io](https://openjfx.io/);
[Gluon, 21 August 2018](https://gluonhq.com/news/javafx-11-release-and-support-plans/)).
**But**: Oracle's own engineers wrote on 3 May 2026 that "The Swing UI toolkit… remains
a core part of the JDK", "far from being legacy"
([Inside.java](https://inside.java/2026/05/03/jdk-client-desktop/)). So "Java lost the
desktop" is true about share and false about support. Precision here is a small lesson
in itself.

**Smalltalk — the honest answer is that the record is contested.** It produced MVC, the
refactoring browser, the unit-test framework and much of what "object-oriented" means,
and it is not what anyone writes desktop applications in. The usual explanations —
price, the closed image model versus files and the Unix text toolchain, and the arrival
of C++ offering objects without abandoning your existing compiler — are plausible and
widely repeated, and I found **no source that establishes a mechanism** the way the
Delphi and VB6 stories can be established. Kay's own HOPL II paper
([here](https://worrydream.com/EarlyHistoryOfSmalltalk/)) is the primary account of the
rise and does not settle the fall. Recording that as unresolved is more useful than
choosing a story.

**Objective-C — retired by a platform owner, not defeated.** It still works and is still
documented: the [Objective-C runtime reference](https://developer.apple.com/documentation/objectivec)
is live. But Apple's conceptual Objective-C guide is stamped "Retired Document… may not
represent best practices for current development", last updated 6 April 2018
([Apple](https://developer.apple.com/library/archive/documentation/General/Conceptual/DevPedia-CocoaCore/ObjectiveC.html)),
and the frameworks that came after — SwiftUI above all — are Swift-only. *Confidence:*
I could not find an Apple sentence stating "Swift is the recommended language"; Apple's
own framing is coexistence ("Swift code coexists alongside your Objective-C and C++
files in the same project", [swift page](https://developer.apple.com/swift/)). The
"recommended" reading is inference from the retired document plus the Swift-only
frameworks. **Mechanism worth naming, because it is the one that will affect these
students' careers:** a single platform owner can retire a language without ever
deprecating it, simply by making the new frameworks unavailable to it.

> **Going deeper:** [Appleman's 2005 post](https://danappleman.com/2005/03/08/the-revolt-of-the-vb-mvps-an-alternate-recommendation/)
> is what it looks like from inside a community losing its language, written the week it
> happened; [Oracle's 2018 client roadmap](https://www.oracle.com/docs/tech/java/javaclientroadmapupdate2018mar.pdf)
> is a vendor writing down, in flat corporate prose, the end of a decade of everyone's
> deployment strategy.

## A5. Measuring popularity, and why to distrust it

A course that teaches students to read evidence cannot itself launder a search-engine
ranking into a fact about the world. So: four indices, four different answers, all
correct by their own methods.

| Index | As of | Its #1 | Where C# sits | Where JavaScript sits |
| --- | --- | --- | --- | --- |
| **TIOBE** | August 2026 | Python, 18.53% | **#5**, 4.09% | #6, 2.63% |
| **Stack Overflow Developer Survey** | fielded 29 May – 23 Jun 2025 | JavaScript, 66% | 27.8% (no ordinal published) | **#1**, 66% |
| **GitHub Octoverse** (monthly unique contributors) | Aug 2025 data, published 28 Oct 2025 | TypeScript, 2,636,006 | **#5**, ~714,735 | #3, 2,165,859 |
| **IEEE Spectrum** | published 23 Sept 2025 | Python | *not verifiable — see below* | fell from #3 to #6 |

**TIOBE** ([tiobe.com/tiobe-index](https://www.tiobe.com/tiobe-index/), checked
2026-08-29) counts search-engine hits for the query `+"<language> programming"` across
25 engines, weighted and renormalised
([TIOBE's own definition page](https://www.tiobe.com/tiobe-index/programming-languages-definition/)).
It says so itself, on the index page: "the TIOBE index is not about the best programming
language or the language in which most lines of code have been written." **What it
cannot see:** how many people write the language, how much of it is written, or whether
a search result is praise or a complaint. The best short critique is Krishna Sundarram's
([*Please Stop Citing TIOBE*, 28 July 2022](https://nindalf.com/posts/stop-citing-tiobe/)),
which notes among other things that Visual Basic went from 0.77% to 4.72% in a single
month in March 2020 with no corroboration anywhere else — and that "25 useless sources
isn't any better than 1 useless source."

**Stack Overflow 2025** ([results](https://survey.stackoverflow.co/2025/technology);
[methodology](https://survey.stackoverflow.co/2025/methodology)): 49,009 respondents in
177 countries; JavaScript 66%, Python 57.9%, TypeScript 43.6%, C# 27.8%, Rust 14.8%;
Rust "yet again the most admired programming language" at 72%. **What it cannot see:**
anyone who does not use Stack Overflow — its own methodology says respondents were
"recruited primarily through channels owned by Stack Overflow" and that "highly-engaged
users… were more likely to notice the prompts." A self-selected sample of one site's
population.

**GitHub Octoverse 2025** ([report](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/),
covering 1 Sept 2024 – 31 Aug 2025): "August 2025 marks the first time TypeScript
emerged as the most used language on GitHub, surpassing Python by ~42k contributors."
**What it cannot see:** anything not on GitHub — GitLab, self-hosted, and the enormous
volume of corporate desktop code that never leaves a private network. GitHub's own
methodology concedes that "public-only views undercount private activity."

**IEEE Spectrum 2025** ([article](https://spectrum.ieee.org/top-programming-languages-2025);
[methodology](https://spectrum.ieee.org/top-programming-languages-methodology-2025))
combines Google, Stack Overflow tags, IEEE Xplore, job sites, GitHub and more, and says
of its own weights that "while these weights are subjective." **Honest note:** its
ranking table is rendered client-side and I could not read C#'s position out of it. I am
recording that rather than supplying a remembered number, because the point of this
section is that "I checked" has to mean something.

And one finding that makes this current rather than historical: IEEE Spectrum's 2025
edition observes that "with less signal in publicly available metrics, it becomes harder
to track popularity" — attributing the loss to AI assistants absorbing the public
question-and-answer traffic these indices were built on. **Every index in this table is
getting worse at its job, for the reason `research-01` is about.** That is a better
20-minute lesson than any ranking in it.

For desktop share specifically, the best available figure is a vendor survey and a year
stale: JetBrains' *State of Developer Ecosystem 2024* (23,262 respondents, fielded
May–June 2024) reported desktop development at 53% of respondents, "surpass[ing] mobile
by 6 percentage points"
([JetBrains 2024](https://www.jetbrains.com/lp/devecosystem-2024/)). The
[2025 edition](https://blog.jetbrains.com/research/2025/10/state-of-developer-ecosystem-2025/)
(24,534 respondents, published 21 October 2025) says only that "desktop and mobile
development work remains significant" and publishes no retrievable percentage. JetBrains
sells IDEs; the sample is its own audience.

> **Going deeper:** [*Please Stop Citing TIOBE*](https://nindalf.com/posts/stop-citing-tiobe/)
> is the one to hand a student; [Stack Overflow's methodology page](https://survey.stackoverflow.co/2025/methodology)
> is a model of a survey being honest about its own sample, and reads in five minutes.

## A6. What this arc means for a student writing C# in 2026

Short, because it is the payload for Moduł 4a and not a summary of the above.

**Met by name in the first month:** the UI thread, the event handler, XAML, data
binding, `async`/`await`, NuGet, `.csproj`. Every one of them has a date and a reason in
this document, and every one is more memorable with it.

**Fossils they will type without being told they are fossils:**

| What they type | What it actually is |
| --- | --- |
| `object sender, EventArgs e` | The Win32 message loop wearing a suit — a callback with the window handle and the message payload, renamed |
| `partial class` + `InitializeComponent()` | The 1990s designer-generated-code split, invented so a form designer could rewrite half your file without touching the other half |
| `Dispatcher.Invoke` / `MainThread.BeginInvokeOnMainThread` | The single-UI-thread rule of 1984, still enforced |
| `async` / `await` | A 2012 answer to that same 1984 problem, now used mostly for databases |
| `INotifyPropertyChanged` | The seam MVVM needs because XAML gives you a mutable object graph (A2.4) |
| `string?` and nullable warnings | A 1965 mistake being paid off in instalments, warnings-only because C# must still compile 2002 code |
| `IDisposable` / `using` | Deterministic release surviving *inside* a garbage-collected language — the last visible descendant of manual memory management |
| `.csproj` | An MSBuild XML file (B3), which is why it has elements and not settings |

**What they can safely never learn:** COM apartment models, the GAC, binding redirects,
the Itanium ABI. Name them once as "the reason things look like this", never as
material.

The single sentence that carries the most weight into Moduł 5 and 7: **the framework in
the syllabus will be dead before their career is; the event loop, the one UI thread and
the rule that state does not live in the widget tree will not be.**

> **Going deeper — and this is the list to hand a student who asks:**
> [*The history of C#*](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-version-history)
> is one page and turns the language into a sequence of decisions with dates;
> [Stephen Toub, *How Async/Await Really Works*](https://devblogs.microsoft.com/dotnet/how-async-await-really-works/)
> is the deep end of the one feature they will use most; and
> [Microsoft's *Preventing Hangs in Windows Applications*](https://learn.microsoft.com/en-us/previous-versions/windows/win32/win7appqual/preventing-hangs-in-windows-applications)
> explains a window they have all sworn at.

---

# Part B — The rest of the lifecycle

Same rule as Part A: an argument, not a timeline. This material is real and it is
subordinate — it is here because a language choice made in 2026 is downstream of how
software gets specified, built, versioned, tested, shipped and watched.

## B1. Requirements and specification — waterfall as practised, not as caricatured

**Royce's 1970 paper does not say what it is famous for saying.** Winston Royce's
*Managing the Development of Large Software Systems* (Proc. IEEE WESCON, August 1970)
draws the sequential diagram everyone reproduces, and then, on the very next page,
writes: **"I believe in this concept, but the implementation described above is risky
and invites failure."** He then spends the rest of the paper adding feedback loops, and
his third recommendation is a section headed **"STEP 3: DO IT TWICE"** — build a pilot
version you intend to discard before the one you deliver
([free PDF](https://managewell.net/class/spring2003/cmsc838p/Process/waterfall.pdf);
mirrors at [praxisframework.org](https://www.praxisframework.org/files/royce1970.pdf)).
**The word "waterfall" does not appear anywhere in the paper** — verified by full-text
search of that PDF.

Where the word came from is folklore-adjacent and should be labelled as such. Bell and
Thayer's ICSE '76 paper uses it — and uses it as an *already existing* term, in quotes,
credited to Royce's diagram: he "introduced the concept of the 'waterfall' of
development activities"
([free copy](https://static.aminer.org/pdf/PDF/000/361/405/software_requirements_are_they_really_a_problem.pdf);
[ACM DL record](https://dl.acm.org/doi/10.5555/800253.807650)). So Bell & Thayer are the
earliest attestation commonly cited, not demonstrably the coiners, and Larman & Basili's
serious historical treatment does not connect them to the term at all
([*Iterative and Incremental Development: A Brief History*, IEEE Computer, June 2003](https://www.cs.umd.edu/~basili/publications/journals/J90.pdf)).
**Confidence: widely repeated, not established.**

What *did* institutionalise the sequential model was procurement. DOD-STD-2167A, dated
29 February 1988 ([everyspec](https://everyspec.com/DoD/DoD-STD/DOD-STD-2167A_8470/)),
made document-gated sequential development the shape of US defence software contracts;
MIL-STD-498, dated 5 December 1994
([everyspec](https://everyspec.com/MIL-STD/MIL-STD-0300-0499/MIL-STD-498_25500/)),
replaced it and explicitly permitted iteration — "software development in one or more
incremental builds… The process steps are repeated for each build, and within each
build, steps may be overlapping and iterative" (quoted in Larman & Basili, in a section
literally titled *Removing the Waterfall Bias*). **The mechanism is worth naming
plainly: waterfall was not a belief, it was a contracting instrument.** You cannot
invoice against an iteration you have not defined.

Then the counter-movement. RUP kept the phases but made them iterative — Inception,
Elaboration, Construction, Transition
([IBM Rational whitepaper TP026B](https://public.dhe.ibm.com/software/rational/web/whitepapers/2003/rup_bestpractices.pdf)).
XP came out of a real, failed project: Chrysler's C3 payroll system, rebooted under Kent
Beck in 1996, live in 1997 paying around ten thousand people, development stopped in
1999 — the account is from Martin Fowler, who was there
([martinfowler.com/bliki/C3.html](https://www.martinfowler.com/bliki/C3.html); the
[c2 wiki page](https://wiki.c2.com/?ChryslerComprehensiveCompensation) dates the formal
termination to February 2000). The Agile Manifesto followed at Snowbird, Utah,
11–13 February 2001, seventeen signatories
([agilemanifesto.org](https://agilemanifesto.org/);
[history](https://agilemanifesto.org/history.html);
[principles](https://agilemanifesto.org/principles.html)).

Twenty-five years on, adoption is patchier than the vocabulary suggests: Digital.ai's
18th State of Agile Report (survey window 11 July – 20 August 2025, n=349) found only
**13%** describing agile as "deeply embedded" across business, technology and support
functions ([digital.ai](https://digital.ai/resource-center/analyst-reports/18th-state-of-agile-report/)).
**Vendor-published** — Digital.ai sells agile tooling — and a small sample. Cite it as
what the industry says about itself, not as a measurement.

Where AI-assisted and spec-driven development sit is `research-01` §4 and is not
repeated here. One connection is worth adding, marked as interpretation rather than
sourced fact: **the SDD loop is Royce's "do it twice" with the cost of the discard
driven to near zero.** Royce's argument for a throwaway pilot was that you cannot know
the design until you have built it once, and that most projects cannot afford to. When
the first build takes an afternoon, the argument stops being aspirational. That is a
better frame for Moduł 3 than "agile, but with a robot."

> **Going deeper:** [Royce 1970](https://managewell.net/class/spring2003/cmsc838p/Process/waterfall.pdf)
> is eleven pages and every software person should read it once, if only for the shock
> of the fourth page; [Larman & Basili 2003](https://www.cs.umd.edu/~basili/publications/journals/J90.pdf)
> is the peer-reviewed history that shows iterative development was normal decades before
> it had a manifesto.

## B2. Architecture patterns for UI — why the desktop generated so many

MVC (1979) → MVP (1996) → Presentation Model (2004) → MVVM (2005) → MVU / unidirectional
data flow (2010s). Five patterns for one problem in four decades is not fashion; it is a
problem that resists.

**Why the desktop specifically?** Because it is the only place where the same value is
simultaneously (a) displayed in more than one widget, (b) editable by the user at any
moment, and (c) changeable by the program while the user is looking at it. The question
"where does the current truth live" has no free answer, and every one of these patterns
is a different answer to it.

Each successor's claim about its predecessor is worth stating precisely, because each is
a real critique and not a rebrand:

- **MVP** (Mike Potel, Taligent, 1996 — [free PDF](https://www.wildcrest.com/Potel/Portfolio/mvp.pdf))
  said that in real toolkits the Controller and View are not separable: the widget
  already handles its own input. So it collapsed them and put the logic in a Presenter
  that the View talks to.
- **Presentation Model** (Martin Fowler, 19 July 2004 —
  [martinfowler.com](https://www.martinfowler.com/eaaDev/PresentationModel.html)) said
  the presenter should be a *model of the view's state*, testable without a view at all.
  Fowler's own page now notes that "it is increasingly known as MVVM."
- **MVVM** (John Gossman, 8 October 2005 — the original post is still hosted by
  Microsoft: [learn.microsoft.com archive](https://learn.microsoft.com/en-us/archive/blogs/johngossman/introduction-to-modelviewviewmodel-pattern-for-building-wpf-apps))
  said the hand-written synchronisation code in a Presenter is exactly what a binding
  engine can do declaratively. Gossman's own wording is the giveaway: the pattern
  "relies on one more thing: a general mechanism for data binding." **MVVM is downstream
  of a platform feature.** It exists because WPF shipped binding and dependency
  properties in 2006 (A2.4), and it spread to every XAML framework because they
  inherited the same engine. Microsoft's current guidance is still the same pattern,
  now packaged: [CommunityToolkit.Mvvm](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/).
- **MVU / unidirectional flow** said all of the above still keep mutable state inside
  the view tree, and removed it — the same argument as A2.4, arriving as an architecture
  rather than as a language feature. React's own docs make the one-way flow explicit
  ([*Thinking in React*](https://react.dev/learn/thinking-in-react)).

The teachable version: **each pattern moved the mutable state one step further from the
widget, and the current answer is to not have any there at all.** Martin Fowler's
[*GUI Architectures*](https://www.martinfowler.com/eaaDev/uiArchs.html) traces the whole
family in one essay and is the single best thing to read on this.

> **Going deeper:** [Gossman's 2005 post](https://learn.microsoft.com/en-us/archive/blogs/johngossman/introduction-to-modelviewviewmodel-pattern-for-building-wpf-apps)
> is four paragraphs long and invented a pattern the students will use all year;
> [Fowler's *GUI Architectures*](https://www.martinfowler.com/eaaDev/uiArchs.html) is
> the long version with the diagrams.

## B3. Build and dependencies, and what DLL Hell actually was

**Build.** Stuart Feldman's `make` (Bell Labs, published in *Software: Practice and
Experience* 9(4), 1979 — [free PDF](https://pages.cs.wisc.edu/~horwitz/make/make.pdf))
established the model that survives in every build system since: declare targets,
declare dependencies, let the tool work out the order. Feldman's own oral history is
free and worth reading
([TUHS, interviewed 20 September 1989](https://www.tuhs.org/Archive/Documentation/OralHistory/transcripts/feldman.htm)).
The famous tab rule — that a recipe line must begin with a tab — is explained by Feldman
himself as an accident he did not fix: he was learning Lex, "I just did something simple
with the pattern newline-tab. It worked, it stayed." *Confidence:* that quote is carried
by [Wikipedia](https://en.wikipedia.org/wiki/Make_(software)) sourced to Raymond's *The
Art of Unix Programming*; the 1989 oral history does not mention tabs at all. Widely
repeated, second-hand.

From there: IDE project files, then MSBuild — where a `.csproj` simply *is* an XML build
file ([Microsoft Learn](https://learn.microsoft.com/visualstudio/msbuild/msbuild?view=visualstudio)) —
and then the SDK-style project introduced with .NET Core tooling and Visual Studio 2017,
which shrank that file from hundreds of lines to about five
([Microsoft Learn, *.NET project SDKs*](https://learn.microsoft.com/dotnet/core/project-sdk/overview)).

**DLL Hell — what it actually was.** Not "DLLs are bad". The mechanism was a *shared,
single-version-per-machine namespace for binaries*: `\Windows\System32\foo.dll` was one
file, so installing application B could replace the copy application A depended on.
Microsoft's own description: "applications were unable to distinguish between
incompatible versions… A new version of a component could overwrite an older version and
break applications"
([Microsoft Learn, *Side-by-side execution*](https://learn.microsoft.com/dotnet/framework/deployment/side-by-side-execution)).

The useful part is **which mechanism solved which part**, because they are usually
listed as though they were one answer:

| Mechanism | The part it solved | The part it did not |
| --- | --- | --- |
| **Assembly identity + strong naming** ([docs](https://learn.microsoft.com/dotnet/standard/assembly/strong-named)) | Made version and publisher part of a binary's *identity*, so two versions are distinguishable | Which one actually loads |
| **The GAC** | Let several versions coexist machine-wide | Deployment, permissions, and "works on my machine". **Abandoned:** "The global assembly cache (GAC) does not exist as a concept in .NET Core and .NET 5 and later versions" ([Microsoft Learn](https://learn.microsoft.com/dotnet/core/compatibility/core-libraries/5.0/global-assembly-cache-apis-obsolete)) |
| **Binding redirects** ([docs](https://learn.microsoft.com/dotnet/framework/configure-apps/redirect-assembly-versions)) | Patched resolution when strict identity matching found the wrong version | It existed *because* strong naming made matching strict — a fix for a fix. Not needed in .NET Core+, which loads differently ([docs](https://learn.microsoft.com/dotnet/core/dependency-loading/overview)) |
| **WinSxS + manifests** ([docs](https://learn.microsoft.com/windows/win32/sbscs/using-side-by-side-assemblies)) | The same versioned-identity idea for unmanaged DLLs | Same limits, plus a famously large folder |
| **App-local / self-contained deployment** ([docs](https://learn.microsoft.com/dotnet/core/deploying/#publish-as-self-contained)) | All of it — every app carries its own copy | Disk, download size, and patching a shared vulnerability everywhere |
| **Containers** | The same trade, one level up | Same |

**The honest summary, and it is a finding rather than a summary: DLL Hell was solved by
giving up on sharing, not by getting better at versioning.** Every mechanism that tried
to make sharing safe was eventually abandoned or made unnecessary; the answer that stuck
was to spend disk instead. Disk got cheap; correctness did not.

**Dependencies then moved up a layer, and the problem came with them.** NuGet — renamed
from NuPack on 21 October 2010
([Phil Haack's own post](https://haacked.com/archive/2010/10/21/renaming-nupack.aspx/)) —
resolves the diamond case by nearest-wins, "direct dependency wins"
([Microsoft Learn](https://learn.microsoft.com/nuget/concepts/dependency-resolution#direct-dependency-wins)),
which is a policy, not a solution. npm chose the opposite policy: nest, and let the same
package exist many times in `node_modules`
([npm docs](https://docs.npmjs.com/cli/v10/configuring-npm/folders)). Both policies made
builds non-reproducible until lockfiles arrived
([`package-lock.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json);
[`packages.lock.json`](https://learn.microsoft.com/nuget/consume-packages/package-references-in-project-files#locking-dependencies)),
and the ceiling on that ambition is the Reproducible Builds definition: "given the same
source code, build environment and build instructions, any party can recreate bit-by-bit
identical copies of all specified artifacts"
([reproducible-builds.org](https://reproducible-builds.org/docs/definition/)).

And then the failure mode changed from *accidental breakage* to *deliberate attack*.
The canonical accident is left-pad, 23 March 2016, documented by npm itself
([npm blog](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm)). The
canonical attacks are `event-stream` (November 2018 —
[the original issue](https://github.com/dominictarr/event-stream/issues/116)) and the
xz-utils backdoor, disclosed by Andres Freund on 29 March 2024 and scored CVSS 10.0
([openwall oss-security](https://www.openwall.com/lists/oss-security/2024/03/29/4);
[NVD CVE-2024-3094](https://nvd.nist.gov/vuln/detail/CVE-2024-3094)). It is not history:
the self-propagating "Shai-Hulud" npm worm compromised 500+ packages in September 2025
([StepSecurity analysis, 15 September 2025](https://www.stepsecurity.io/blog/ctrl-tinycolor-and-40-npm-packages-compromised)),
and a successor campaign hit 400+ packages via a compromised maintainer account, analysed
7 August 2026 ([Veracode](https://www.veracode.com/blog/chaindrop-npm-supply-chain-worm/)).
The current countermeasures are SBOMs ([CISA](https://www.cisa.gov/sbom)) and build
provenance ([npm provenance](https://docs.npmjs.com/generating-provenance-statements);
[GitHub's announcement, 19 April 2023](https://github.blog/security/supply-chain-security/introducing-npm-package-provenance/)).

> **Going deeper:** [npm's own left-pad postmortem](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm)
> is a registry explaining in public why it broke the internet;
> [Freund's xz disclosure](https://www.openwall.com/lists/oss-security/2024/03/29/4) is
> what world-class debugging looks like written up in an hour.

## B4. Version control — from nothing to the pull request

The through-line: **each generation widened the unit that could be safely worked on in
parallel** — a file, then a directory tree, then a whole repository, then a proposed
change.

Nothing, then shared folders and a talking stick. **SCCS** (Marc Rochkind, *The Source
Code Control System*, IEEE TSE SE-1(4):364–370, December 1975 —
[ACM record, paywalled](https://dl.acm.org/doi/10.1109/TSE.1975.6312866)) and **RCS**
(Walter Tichy, *Software: Practice and Experience* 15(7):637–654, July 1985 —
[free PDF via the FreeBSD documentation archive](https://docs-archive.freebsd.org/44doc/psd/13.rcs/paper.pdf))
versioned one file at a time, with locks: you checked a file out and nobody else could
touch it. **CVS** made the tree the unit and replaced locking with merging. Dick Grune's
own page is the primary source and corrects a common date: he wrote the original shell
scripts between roughly July 1984 and August 1985 — "I started to clean up the shell
scripts of `cmt`… and I called the system CVS" — and *published* them to
`comp.sources.unix` on 23 June 1986
([dickgrune.com](https://dickgrune.com/Programs/CVS.orig/)). The commonly cited "1986"
is the publication, not the writing.

**Subversion** did not try to be new. The project's own book says so: "They didn't want
to break new ground in version control methodology, they just wanted to fix CVS"
([svnbook](https://svnbook.red-bean.com/en/1.7/svn.intro.whatis.html)); 1.0 released
23 February 2004. The widely quoted phrase "CVS done right" is a paraphrase in
circulation, not svnbook's own wording — cite it as such.

**Git** came from a licensing crisis, not a design programme. Linus Torvalds posted
*"Kernel SCM saga.."* to LKML on 6 April 2005, describing the breakdown over BitKeeper
([archived copy](https://www.krsaborio.net/linux-kernel/research/2005/0406.html); the
[marc.info archive](https://marc.info/?l=linux-kernel&m=111280216717070&w=4) is the more
canonical host), and committed
[`e83c516`](https://github.com/git/git/commit/e83c5163316f89bfbde7d9ab23ca2e25604af290)
the next day, 7 April 2005, with the message *"Initial revision of 'git', the information
manager from hell."* Git's own history page tells the story the same way
([git-scm.com](https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git)).

**The pull request made the unit of work a proposed change rather than a commit**, and
that is the change students actually inherit. GitHub's current documentation calls it
"GitHub's foundational collaboration feature, letting you discuss and review changes
before merging them"
([docs.github.com](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)),
and the 31 August 2010 "Pull Requests 2.0" post says the feature existed "on day one"
([github.blog](https://github.blog/2010-08-31-pull-requests-2-0/)). *Confidence:* I could
not pin a dated 2008 launch post; the 2008 origin is an inference from GitHub's own
launch date plus that sentence.

What review is actually for is measurable, and the answer is not what people say. In
Bacchelli and Bird's study of Microsoft's review practice, **383 of 873 surveyed
developers (44%) ranked "finding defects" as their top motivation** — while the observed
review discussion was dominated by other things entirely
([*Expectations, Outcomes, and Challenges of Modern Code Review*, ICSE 2013, §IV.A —
free Microsoft Research PDF](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/ICSE202013-codereview.pdf)).
That gap between what people expect from review and what review delivers is directly
useful to Moduł 6c, where the reviewer is a model.

> **Going deeper:** [Grune's own CVS page](https://dickgrune.com/Programs/CVS.orig/) is
> one man explaining a tool the whole industry used for twenty years;
> [Bacchelli & Bird](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/ICSE202013-codereview.pdf)
> is the paper to read before believing anything about what code review achieves.

## B5. Testing — and why automating a desktop UI stayed hard for thirty years

**The tooling lineage is short and it runs through the desktop.** Kent Beck built a
testing framework in Smalltalk and wrote it up as *Simple Smalltalk Testing: With
Patterns* (*The Smalltalk Report* 4(2):16–18, 1994; the framework itself dates to about
1989 — the canonical URL `xprogramming.com/testfram.htm` was unreachable when checked on
2026-08-29, and the paper is cited from it by, among others,
[Python's own `unittest` documentation](https://docs.python.org/3/library/unittest.html)).
JUnit followed, by Beck and Erich Gamma, and became the template for the whole xUnit
family — Martin Fowler's [*Xunit*](https://martinfowler.com/bliki/Xunit.html) page is the
canonical account, and states that "the origins of these frameworks actually started in
Smalltalk." NUnit began as a JUnit port and xUnit.net was written by NUnit v2's author
([Microsoft Learn, *Testing in .NET*](https://learn.microsoft.com/dotnet/core/testing/);
[xunit.net](https://xunit.net/)). *Confidence:* the much-loved story that JUnit was
written on a flight to OOPSLA 1997 rests on **one source** — Fowler's own second-hand
retelling, dated 17 January 2006, on the page above. Well-attested folklore, not a
primary account by Beck or Gamma.

**The evidence about TDD is mixed and should be taught that way**, exactly as
`research-01` §2.3 handles the METR result. In favour: Nagappan et al. studied three
Microsoft teams and one IBM team and found pre-release defect density down **40–90%**,
with initial development time up **15–35%**
([*Realizing Quality Improvement Through Test Driven Development*, Empirical Software
Engineering 13 (2008)](https://www.microsoft.com/en-us/research/wp-content/uploads/2009/10/Realizing-Quality-Improvement-Through-Test-Driven-Development-Results-and-Experiences-of-Four-Industrial-Teams-nagappan_tdd.pdf)).
Against: a formal meta-analysis of twelve experiments found that "TDD novices achieve a
slightly higher code quality with iterative test-last development"
([Santos et al., *A Family of Experiments on Test-Driven Development*, arXiv 2011.11942, 2020](https://arxiv.org/abs/2011.11942)),
and a six-month longitudinal study concluded that "TDD affects neither the external
quality of software products nor developers' productivity"
([Baldassarre et al., arXiv 2105.03312, 2021](https://arxiv.org/abs/2105.03312)).

**Continuous integration** came out of XP: Martin Fowler's article was first published
10 September 2000 and last revised 18 January 2024, and credits the practice to Kent
Beck ([martinfowler.com](https://martinfowler.com/articles/continuousIntegration.html)).
CruiseControl, the first widely used CI server, was released by ThoughtWorks on
30 March 2001 ([project site](https://cruisecontrol.sourceforge.net/)); Hudson became
Jenkins in a rename proposed 11 January 2011 over an Oracle trademark dispute
([jenkins.io](https://www.jenkins.io/blog/2011/01/11/hudsons-future/)); GitHub Actions
added CI/CD on 8 August 2019, generally available 13 November 2019, free for public
repositories ([github.blog](https://github.blog/news-insights/product-news/github-actions-now-supports-ci-cd/)).

### Why automating a desktop UI stayed hard — and still is

This is the part Moduł 6 needs, and it is sourceable rather than opinion.

**1. There is no seam.** A desktop application's visible state lives in a native widget
tree owned by the operating system, not in your process's data structures. To assert
that "the total shows 42", something has to ask the OS what it is displaying.

**2. The only general answer was the accessibility layer — and it is opt-in, per
control.** Microsoft's UI Automation exists to let "assistive technology applications
*and automated testing tools*" reach another application's controls
([Microsoft Learn, *UI Automation overview*, page updated 14 July 2025](https://learn.microsoft.com/en-us/windows/win32/winauto/entry-uiautocore-overview)),
and a custom control only becomes testable if its author writes an automation peer and
overrides `GetPatternCore` — unsupported patterns simply return null
([*Custom automation peers*](https://learn.microsoft.com/windows/apps/design/accessibility/custom-automation-peers);
the same requirement in WPF terms,
[here](https://learn.microsoft.com/dotnet/desktop/wpf/controls/ui-automation-of-a-wpf-custom-control)),
plus stable `AutomationId`s
([*Using UI Automation for Automated Testing*](https://learn.microsoft.com/windows/win32/winauto/uiauto-usefortesting)).
Apple's XCUITest rests on exactly the same foundation: "UI testing rests upon two core
technologies: the XCTest framework and Accessibility"
([Apple, *Testing with Xcode*](https://developer.apple.com/library/archive/documentation/DeveloperTools/Conceptual/testing_with_xcode/chapters/09-ui_testing.html)).
**So testability is a property somebody else has to have provided, and for custom
controls they routinely have not.**

**3. Flakiness is structural, not sloppiness.** Timing, focus, animation, screen size,
locale, and a machine that is also doing something else. Google's published numbers, for
its whole test corpus: **about 1.5% of all test runs report a flaky result, almost 16%
of tests have some level of flakiness, and about 84% of observed pass→fail transitions
involve a flaky test**
([Google Testing Blog, *Flaky Tests at Google and How We Mitigate Them*, 27 May 2016](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html)).
UI tests are the bad end of that distribution.

**4. The tooling itself is unstable — and this is checkable today, which makes it the
best evidence in the section.** WinAppDriver's last release is **v1.2.1, 5 November
2020**, with over a thousand open issues
([GitHub](https://github.com/microsoft/WinAppDriver)); Microsoft's own current
documentation says it "is no longer under active development" and points at Appium
([Microsoft Learn, *Test WinUI apps*](https://learn.microsoft.com/windows/apps/develop/testing/#ui-test-automation));
Appium's Windows driver README says "WinAppDriver server has not been maintained by
Microsoft for years" — **and still proxies to it**
([GitHub](https://github.com/appium/appium-windows-driver)); and .NET MAUI's own UI
testing documentation instructs you to "use WinAppDriver version 1.2.1 specifically.
Other versions may not work correctly"
([Microsoft Learn, checked 2026-08-29](https://learn.microsoft.com/dotnet/maui/deployment/ui-testing?view=net-maui-10.0)).
A five-year-abandoned binary, pinned by version, is the current recommended path for
testing a Windows UI in 2026. Students can verify every link in that chain in five
minutes, which makes it a better exercise than any assertion from a teacher.

**5. Which is why the test pyramid is a cost curve and not a preference.** The shape
comes from Mike Cohn's *Succeeding with Agile* (2009) via Martin Fowler
([*TestPyramid*, 1 May 2012](https://martinfowler.com/bliki/TestPyramid.html)).

**The implication for Moduł 6 is one sentence: test the model, not the window** — which
is the same conclusion as 5d ("keep state out of the UI"), arriving from the opposite
direction. If the state is in a plain class, it is testable with xUnit and no
accessibility layer at all. If it is in the widget, it is testable only through the
chain described above. That is the strongest practical argument for MVVM that the course
can make, and it is not an aesthetic one. If the course lands on Avalonia, the concrete
route is its headless testing platform, which runs "the full Avalonia control tree,
layout, styling, and data binding" without a window
([Avalonia docs](https://docs.avaloniaui.net/docs/concepts/headless/)).

**And on AI-generated tests**, since Moduł 6 will be asked: there is dated 2025 evidence
that they can be good — chain-of-thought prompting reached "up to 96.3% branch coverage"
and a 57% average mutation score in one evaluation of general-purpose LLMs
([Walczak et al., arXiv 2507.14256, 18 July 2025](https://arxiv.org/abs/2507.14256)) —
and the obvious failure mode has a name in the literature too: a generated test can
simply encode the bug as expected behaviour
([*When AI-Generated Unit Tests Validate Bugs*, IEEE, January 2026](https://www.computer.org/csdl/magazine/so/2026/01/11122545/2965OYHXMsw) —
**paywalled, and I verified only its title and venue**). That is `research-01`'s
Novice's Dilemma with extra steps: the student cannot tell a passing test from a
correct one without the expertise the exercise was supposed to build.

> **Going deeper:** [Google's flaky-tests post](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html)
> has the only public numbers anyone cites on this; the
> [WinAppDriver repo](https://github.com/microsoft/WinAppDriver) and
> [Appium's Windows driver](https://github.com/appium/appium-windows-driver) read
> together are a five-minute lesson in what "the ecosystem" actually means.

## B6. Release and distribution — and the release *cycle* underneath it

**The mechanism first.** Floppies and shrink-wrap; then CD-ROM and boxed retail; then
downloads; then installers, auto-updaters, stores and package managers. InstallShield
was the authoring tool of the 1990s and still exists, now under Revenera/Flexera
([product page, © 2026](https://www.revenera.com/install/products/installshield)).
Windows Installer standardised the format — and has not had a version since 5.0 shipped
with Windows 7 in 2009; Microsoft's current packaging documentation treats MSI as a
"legacy installer" to migrate away from
([*Windows Installer portal*](https://learn.microsoft.com/windows/win32/msi/windows-installer-portal);
[*Packaging*, migration section](https://learn.microsoft.com/windows/apps/package-and-deploy/packaging/#migrating-to-msix-from-legacy-installers)).
*Confidence:* "MSI is in maintenance" is an inference from those two facts, **not** a
Microsoft statement — I looked for one and did not find it. MSIX is the current answer,
and its pitch is precisely the DLL-Hell lesson applied to installation: "a reliable,
clean install and uninstall" with "no leftover files or registry entries", achieved by
virtualising or redirecting file-system and registry writes
([Microsoft Learn, *MSIX overview*, checked 2026-08-29](https://learn.microsoft.com/en-us/windows/msix/overview)).
ClickOnce is still documented and still supports WPF and WinForms on modern .NET — and
explicitly does **not** support WinUI 3
([Microsoft Learn](https://learn.microsoft.com/windows/apps/package-and-deploy/publish-first-app#step-4b-distribute-directly-alternative-path)).

**Auto-update turned a release from an event into a background process.** Sparkle is
still the macOS standard (v2.9.3, 8 June 2026 —
[GitHub](https://github.com/sparkle-project/Sparkle)). On Windows the Electron world
runs on Squirrel, which is in an awkward state worth stating precisely: an Electron
maintainer wrote in 2019 that Squirrel.Windows "is no longer maintained, pull requests
are no longer being reviewed or merged"
([electron/electron#17722](https://github.com/electron/electron/issues/17722)), the repo
is **not** archived and its README asks for maintainers
([GitHub](https://github.com/Squirrel/Squirrel.Windows)), and Electron's own
`autoUpdater` still builds on Squirrel.Mac and Squirrel.Windows
([Electron docs](https://www.electronjs.org/docs/latest/api/auto-updater)). The same
pattern as WinAppDriver: the load-bearing component is unmaintained and still in use.

**Signing and notarization are where distribution stopped being free**, and two dates
matter. Apple requires notarization for Developer ID software: "Beginning in macOS
10.15, all software built after June 1, 2019, and distributed with Developer ID must be
notarized"
([Apple, *Notarizing macOS software before distribution*](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution)) —
**note that the commonly cited "2023" date is wrong**; what changed on 1 November 2023
was that Apple stopped accepting uploads from `altool` and Xcode 13 or earlier, a
tooling change. On Windows, the CA/Browser Forum's Code Signing Baseline Requirements
state that "Effective June 1, 2023… the Subscriber's Private Key is generated, stored,
and used in a suitable Hardware Crypto Module"
([CA/Browser Forum](https://cabforum.org/working-groups/code-signing/requirements/);
Microsoft says the same in
[its own docs](https://learn.microsoft.com/windows/apps/package-and-deploy/code-signing-options)) —
which is the change that made signing a Windows binary a hardware purchase rather than a
file download. And Microsoft's SmartScreen no longer grants EV certificates an instant
reputation bypass, "Behavior changed in 2024"
([Microsoft Learn](https://learn.microsoft.com/windows/apps/package-and-deploy/distribution-feature-status#smartscreen-reputation-ev-certificates-no-longer-grant-instant-bypass)).

**Stores added a gatekeeper and a sandbox.** The Mac App Store opened 6 January 2011
([Apple Newsroom](https://www.apple.com/newsroom/2011/01/06Apples-Mac-App-Store-Opens-for-Business/)),
and App Sandbox became mandatory for new submissions — announced 2 November 2011 with a
1 March 2012 deadline
([Apple developer news](https://developer.apple.com/news/?id=11022011a)), later extended
to 1 June 2012 per contemporaneous trade press (*secondary source only; both dates are
in the record*). Microsoft moved the other way: the Store has accepted unpackaged
EXE/MSI Win32 apps "since June 2021"
([Microsoft Learn](https://learn.microsoft.com/windows/apps/publish/publish-your-app/msi/app-package-requirements)),
and on 28 September 2021 announced it "no longer requires app developers to share
revenue with Microsoft, when apps manage their own in-app payment systems"
([Windows Developer Blog](https://blogs.windows.com/windowsdeveloper/2021/09/28/microsoft-store-more-apps-more-open/)).
Apple's Small Business Program (announced 18 November 2020, effective 1 January 2021)
cut its commission to 15% below $1M of proceeds
([Apple Newsroom](https://www.apple.com/newsroom/2020/11/apple-announces-app-store-small-business-program/)),
and on 23 April 2025 the European Commission fined Apple €500 million under the DMA for
anti-steering restrictions
([European Commission](https://digital-strategy.ec.europa.eu/en/news/commission-finds-apple-and-meta-breach-digital-markets-act)).

**Package managers are the desktop's belated answer to `apt`.** winget's preview was
announced at Build on 19 May 2020
([Windows Command Line blog](https://devblogs.microsoft.com/commandline/windows-package-manager-preview/));
Homebrew was created by Max Howell ([brew.sh](https://brew.sh) — its founding date is not
stated on the official pages, so this document does not give one); Flatpak describes
itself as "developed by an independent community, with no lock-in to a single vendor"
([flatpak.org](https://flatpak.org/)) while the Snap Store is "hosted and managed by
Canonical" ([Ubuntu docs](https://ubuntu.com/core/services/guide/snaps-intro)). *The
widely repeated claim that the Snap Store's server side is proprietary is community-
sourced only — including on Canonical's own forum — and I found no first-party
confirmation. Do not assert it.*

**The cycle underneath the mechanism is the part that matters for the course.** The
trend is legible and datable: Microsoft's own documentation contrasts the old model of
"major revisions… every few years" plus service packs with today's annual feature
updates and monthly cumulative quality updates
([*Windows as a service*](https://learn.microsoft.com/windows/deployment/update/waas-overview));
Chrome has shipped a milestone every four weeks since 2021 and moves to **two weeks from
8 September 2026** (Chrome 153)
([Chrome for Developers](https://developer.chrome.com/blog/chrome-two-week-release));
.NET ships a major version every November, even years LTS, odd years STS
([Microsoft Learn, *.NET versions*](https://learn.microsoft.com/dotnet/core/versions/)) —
the same cadence `research-02` §2.4 uses to argue for pinning the course to .NET 10.

**And the economic argument that ties the mechanism to the cycle** — stated as an
argument, not as a sourced fact: when the medium was a pressed disc in a box in a
warehouse, a shipped bug was a recall, and the only available fix was to not ship it.
That is why QA departments were large, why release cycles were multi-year, and why
"service pack" existed as a product with a name. When the medium became a download, the
cost of a bug collapsed and the cost of *not shipping* rose. Everything else in this
section — auto-update, four-week Chrome, monthly cumulative updates, continuous
deployment — follows from that one change in the price of a mistake. No nostalgia is
required to find this interesting; the causal chain is the whole point.

> **Going deeper:** [Apple's notarization page](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution)
> and the [CA/Browser Forum's code-signing requirements](https://cabforum.org/working-groups/code-signing/requirements/)
> together explain, in about fifteen minutes, why shipping a desktop app costs money now;
> [*Windows as a service*](https://learn.microsoft.com/windows/deployment/update/waas-overview)
> is a vendor describing its own abandonment of the boxed release.

## B7. Feedback after release — a lifecycle stage that did not exist in 1990

In 1990 a shipped program was gone. What the developer learned came from support calls,
which is to say from whoever complained loudest. Windows Error Reporting replaced Dr.
Watson and changed that
([Microsoft Learn, *WER*](https://learn.microsoft.com/windows-hardware/drivers/debugger/windows-error-reporting);
[*About WER*](https://learn.microsoft.com/windows/win32/wer/about-wer)), and the paper
Microsoft published about it is the best single piece of evidence in Part B:

- **"a bug reported by WER is 4.5 to 5.1 times more likely to be fixed than a bug
  reported directly by a human"** (§6.2, p. 10)
- for Office 2010 applications, "the last quartile of error reports account for 88% to
  93% of the buckets" (Fig. 13, p. 10) — a few crashes account for most of the pain
- Windows Vista programmers fixed 5,000 bugs isolated by WER in beta releases alone
  (p. 2), against static analysis having found "over 100,000 bugs"
- and the team's own summary of what changed: fix the bugs "that affect the most users,
  not just the bugs hit by the loudest customers" — **"data not decibels"** (p. 2)

([Glerum et al., *Debugging in the (Very) Large: Ten Years of Implementation and
Experience*, SOSP 2009 — free PDF from ACM SIGOPS](https://www.sigops.org/s/conferences/sosp/2009/papers/glerum-sosp09.pdf))

**And the argument it created.** Telemetry is the first lifecycle stage where the
developer's interest and the user's interest are structurally opposed: the more the
developer learns, the more the user has given away. Microsoft documents four diagnostic
data levels — off/Security, Required, Enhanced (legacy), Optional — with full crash
dumps only at the higher ones
([Microsoft Learn](https://learn.microsoft.com/windows/privacy/configure-windows-diagnostic-data-in-your-organization)).
Regulators pushed back: the Dutch DPA investigated Windows 10 telemetry
([Autoriteit Persoonsgegevens report, PDF](https://www.autoriteitpersoonsgegevens.nl/uploads/imported/public_version_dutch_dpa_informal_translation_summary_of_investigation_report.pdf) —
*URL confirmed on the regulator's own domain; I could not fetch the body*), and France's
CNIL served Microsoft a formal notice on 20 July 2016 over collection "not directly
necessary for the system to operate" (*secondary source:*
[Hunton privacy blog](https://www.hunton.com/privacy-and-cybersecurity-law-blog/cnil-serves-formal-notice-to-microsoft-to-comply-with-french-data-protection-law);
*I could not locate CNIL's own page*). The legal frame in the EU is GDPR Article 6 —
consent under 6(1)(a), legitimate interests under 6(1)(f)
([Regulation (EU) 2016/679, eur-lex](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679)).
Today's equivalents are commercial: Sentry states that "No personal data is required to
use Sentry" and distributes its SDKs as source so the data sent can be checked
([Sentry docs](https://docs.sentry.io/data-management/data-collected/)), and Firebase
Crashlytics collects stack frames, exception messages and error codes to group crashes
into issues ([Firebase docs](https://firebase.google.com/docs/crashlytics)).

This is the cleanest ethics case the course has that is not about AI, and it is
concrete: the students will ship an application, and they will have to decide whether it
phones home.

> **Going deeper:** [the SOSP 2009 WER paper](https://www.sigops.org/s/conferences/sosp/2009/papers/glerum-sosp09.pdf)
> is readable, free, and changes how you think about which bugs matter.

## B8. The desktop's boom, eclipse and return

**The eclipse was called correctly and early.** Joel Spolsky, 13 June 2004: "Web
applications don't require Windows… the new API is HTML, and the new winners in the
application development marketplace will be the people who can make HTML sing"
([*How Microsoft Lost the API War*](https://www.joelonsoftware.com/2004/06/13/how-microsoft-lost-the-api-war/)).
The dated markers around it: Gmail, 1 April 2004
([Google press](http://googlepress.blogspot.com/2004/04/google-gets-message-launches-gmail.html));
Google Docs & Spreadsheets, 11 October 2006
([Google press](http://googlepress.blogspot.com/2006/10/google-announces-google-docs_11.html));
Chrome, 2 September 2008
([Google press](https://googlepress.blogspot.com/2008/09/google-chrome-new-take-on-browser_02.html));
the first Chromebooks, 11 May 2011
([Chrome blog](https://chrome.googleblog.com/2011/05/new-kind-of-computer-chromebook.html)).
*I could not find a single credible dated statistic quantifying the overall shift, and
am not supplying one.*

**The strongest evidence for both the eclipse and the return is Microsoft's own
behaviour.** Windows 8 and WinRT (2012), then UWP (2015), were attempts to replace Win32
with a store-delivered, sandboxed model. Project Reunion, announced 19 May 2020
(*the original Windows Developer Blog post could not be fetched in this session; its
existence, date and content are corroborated by* [The Verge's contemporaneous report](https://www.theverge.com/2020/5/19/21258697/microsoft-windows-project-reunion-win32-uwp-apps-apis-build)),
reversed the direction, and the 0.5 announcement of 29 March 2021 states the goal as
"making Desktop apps easy to build again"
([Windows Developer Blog](https://blogs.windows.com/windowsdeveloper/2021/03/29/announcing-project-reunion-0-5/)).
Today's Windows App SDK documentation puts Win32 back among first-class citizens: it
"brings the latest Windows platform features to both WinUI 3 and **existing desktop app
frameworks such as WPF, Windows Forms, or Win32**"
([Microsoft Learn, page updated 20 December 2025, checked 2026-08-29](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/)).
A platform owner spending eight years trying to replace its own desktop API and then
formally un-replacing it is a harder fact than any market-share chart.

**Electron, evenhandedly.** The cost is real. The best dated measurement I could find is
a third-party comparison of the *same demo application* built both ways: Tauri at about
**172 MB** resident against Electron's **409 MB** with six windows open, and a bundle of
**8.6 MiB** against **244 MiB**
([Hopp, 9 April 2025](https://www.gethopp.app/blog/tauri-vs-electron)) — published by a
company building its own product, so not neutral, but dated, numeric and
methodologically disclosed, which is more than most of the genre. Two things I could
*not* source and am therefore not claiming: Slack's July 2019 desktop rebuild post
[does have](https://slack.engineering/rebuilding-slack-on-the-desktop/) a memory
comparison chart, but the figure exists only inside the image and I could not read it;
and Tauri's "as little as 600KB" ([v2.tauri.app](https://v2.tauri.app/)) is a **vendor
claim** on a marketing page.

And the case for it is equally real, made by teams who could afford native and chose
otherwise. VS Code's own documentation gives web technology plus cross-platform reach as
the reason ([code.visualstudio.com](https://code.visualstudio.com/docs/editor/whyvscode)).
Slack's engineering blog, 25 October 2016, explains that a system WebView tied its
rendering to the OS's Safari version, so Electron bought one predictable codebase across
Mac, Windows and Linux
([slack.engineering](https://slack.engineering/building-hybrid-applications-with-electron/)).
And 1Password's account of rebuilding version 8 is the most useful of the three, because
it separates the two decisions cleanly: a Rust core shared across every platform,
Electron for the desktop UI *because it could "cover all of our supported Mac operating
systems"*, and SwiftUI reserved for iOS alone
([1Password, 12 August 2021](https://1password.com/blog/1password-8-the-story-so-far)).

**The honest reading: Electron's cost is technical and its benefit is organisational.**
It buys one team instead of three, one hiring pool instead of three, and one release
instead of three. That is an economics answer to a technical question, which is the
recurring shape of this entire document — and it is the single most useful thing to say
about it in Moduł 4a, because the students' instinct will be to argue about megabytes.

> **Going deeper:** [Spolsky's 2004 essay](https://www.joelonsoftware.com/2004/06/13/how-microsoft-lost-the-api-war/)
> is a twenty-two-year-old prediction that reads like it was written last week;
> [1Password's version 8 post](https://1password.com/blog/1password-8-the-story-so-far)
> is a team showing its working on exactly the decision Moduł 4c asks students to make.

---

# The cross-cutting questions

These four are the part a lesson is actually built from.

## 1. What caused each transition — hardware, economics, distribution, or language design?

| Transition | What actually decided it |
| --- | --- |
| Assembly → Pascal/C on the first GUI machines | **Hardware, then economics.** A 68000 with 128 KB could barely afford a compiler; once it could, programmer time cost more than cycles. The Lisa source is 89% Pascal by line count ([A1](#a1-the-eras-and-the-language-each-one-made-obvious)) |
| C + API → C++ + framework | **Language design**, plus the sheer size of the platform API. MFC and OWL exist because Win32 was too big to call by hand |
| Frameworks → RAD | **Economics of developer time.** The form designer removed the single largest cost in building a window, and the market responded immediately |
| RAD → managed runtimes | **A vendor's platform strategy.** Not a market verdict: VB6 was not superseded, it was discontinued, and Microsoft said so in 2005 and again in 2020 (A4) |
| Managed desktop → the web | **The distribution channel.** A URL beat an installer. Spolsky named the mechanism in 2004 and was right (B8) |
| Web → Electron on the desktop | **Labour economics.** One codebase, one hiring pool, one release — 1Password's own account (B8) |
| Imperative/markup UI → declarative | **Language design**, driven by the failure of mutable widget trees at scale (A2.4) |
| JIT → AOT, and Android's AOT → hybrid | **A user-visible hardware/UX constraint**: startup latency and install size (A2.5) |

**Stated plainly, because the brief asks for it: at least three of these were decided by
economics or by one company's strategy rather than by technical merit.** VB6 and Delphi
are the clearest — a language ended by a compatibility break its own community could not
absorb, and a language priced at $2,000 a seat by a company that had publicly
repositioned away from selling tools. Neither lost an argument about language design.
Teaching that honestly is more useful than any ranking in A5, because it is the part
that will still be true when today's frameworks are gone.

## 2. What is genuine progress and what is a cycle?

- **Thin ↔ fat client — a cycle, but the axis moved.** In 1995, "thin" meant the compute
  was elsewhere. In 2026 the compute is emphatically local (an Electron app is a browser
  engine on your machine) and it is the *state* that lives elsewhere. Same oscillation,
  different quantity oscillating. **Different place.**
- **Interpreted ↔ compiled — progress disguised as a cycle.** Nobody went back. Both ends
  converged on the middle and stayed: tiered JIT, ReadyToRun, Native AOT, and Android
  arriving at the identical hybrid from the opposite direction (A2.5). When two
  ecosystems with opposite starting points and no shared code end up at profile-guided
  hybrid compilation, that is a result, not a fashion. **Genuine progress.**
- **Imperative ↔ declarative — different place**, and the argument is in A2.4: a 1985
  designer produced a mutable instance graph, a 2026 `@Composable` produces a function
  from state to a description. The syntax rhymes; the semantics do not. **The strongest
  evidence is that two communities reached it independently** — application frameworks
  through React, and the games industry through immediate-mode GUI a decade earlier.
- **Monolith ↔ modular — a cycle, and the underlying problem is unsolved.** DLL Hell,
  then binding redirects, then transitive npm trees, then microservice version skew:
  the same problem wearing different clothes. And the answer that keeps winning is the
  same one every time — **stop sharing**. App-local deployment, containers, vendored
  dependencies. Real progress in mechanism; **no progress at all** on the underlying
  question of how independently-versioned components safely compose (B3).

## 3. What has not changed since 1984?

Everything on this list is a candidate for lesson time, because it will still be true
when the framework in the syllabus is dead.

| Constant | Evidence |
| --- | --- |
| **The event loop.** The program does not run; it is called. | [Win32 message queues](https://learn.microsoft.com/windows/win32/winmsg/about-messages-and-message-queues#message-handling); the Mac Event Manager in [Inside Macintosh](https://archive.org/details/inside-macintosh-1992-1994/1992-macintosh_toolbox_essentials) |
| **One UI thread.** | Three vendors, same rule: [WPF](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/threading-model), [Android](https://developer.android.com/guide/components/processes-and-threads), [Apple](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Multithreading/ThreadSafetySummary/ThreadSafetySummary.html) |
| **The frozen window**, and its five-second timeout. | [*Preventing Hangs in Windows Applications*](https://learn.microsoft.com/en-us/previous-versions/windows/win32/win7appqual/preventing-hangs-in-windows-applications) |
| **State does not belong in the widget tree.** | MVC 1979 → MVP 1996 → MVVM 2005 → MVU: 47 years of re-deriving the same rule (B2) |
| **Install / update / uninstall is a user-visible burden.** | The existence of MSIX, notarization, hardware-backed signing keys, four competing Linux package formats and a store per platform (B6) is the proof that it is not solved |
| **The gap between what a user does and what the program models.** | Royce named it in 1970 (B1) and every requirements method since has been an attempt on it |

## 4. What was tried, failed, and came back?

| Idea | Why it failed the first time | What changed |
| --- | --- | --- |
| **Ahead-of-time compilation** | Shipping a build per target was expensive, and a JIT could specialise for the actual machine | Startup latency and download size became user-visible on phones and in stores. Now: [R2R](https://learn.microsoft.com/dotnet/core/deploying/ready-to-run#impact-of-using-the-readytorun-feature), [Native AOT](https://learn.microsoft.com/dotnet/core/deploying/native-aot/), Android's profile-guided hybrid |
| **Declarative UI descriptions** | Markup produced a mutable instance graph you then had to keep in sync by hand — which is why MVVM and binding engines exist | Reactive re-rendering made the description *re-runnable*, so the mutable tree moved to the framework's side ([Compose's mental model](https://developer.android.com/develop/ui/compose/mental-model)) |
| **Reference counting** | Cycles, and the cost of doing it by hand (COM's `AddRef`/`Release`) | The counting got automated ([ARC, 2011](https://clang.llvm.org/docs/AutomaticReferenceCounting.html)) and determinism turned out to matter more than the theoretical elegance of tracing GC where latency is visible |
| **Application-local, self-contained deployment** | Disk was expensive; sharing a DLL was the whole point | Disk got cheap and correctness did not. The oldest answer won (B3) |
| **Structured control flow, applied to concurrency** | Threads-with-join was too coarse; callbacks and free-running tasks were more convenient | Languages grew the constructs — [Swift SE-0304](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0304-structured-concurrency.md), Kotlin's `coroutineScope` — and Java is on its [seventh preview](https://inside.java/2026/05/11/jep533-target-jdk27/), which is how hard it is |
| **The web stack as a desktop application platform** | The engines were too slow and there was no ecosystem to draw on | V8-class engines and npm. *Interpretation, not a sourced mechanism* — but Spolsky predicted the destination in 2004 (B8) and it took roughly a decade of engine work to arrive |

---

## What this means for the course

Written to be acted on, not to summarise. Ordered by module.

### Moduł 4a — *Co to jest aplikacja desktopowa, a co mobilna*

**Open with the frozen window, not with a definition.** Write a button that blocks the
UI thread for six seconds, run it, and let Windows put a ghost window over the
application with *Not Responding* in the title. Then show them that the five-second
threshold is [written down in Microsoft's documentation](https://learn.microsoft.com/en-us/previous-versions/windows/win32/win7appqual/preventing-hangs-in-windows-applications),
and has been for decades. Thirty students have all seen that window; none of them know
it is a number in a specification. That is the lesson's hook and it costs ten minutes.

**Then define the thing operationally, because the usual definition is useless.** "A
desktop application is a program that owns a window, an event loop and one UI thread" is
checkable and leads somewhere. "A program that runs on a computer" is not and does not.

**Teach the three-way choice with one honest number and one honest reason on each side.**
Native / cross-platform / web-wrapped is a trade, and the two halves of the honest answer
are both sourced: the cost side is the [Tauri-vs-Electron measurement of 9 April 2025](https://www.gethopp.app/blog/tauri-vs-electron)
(172 MB vs 409 MB, 8.6 MiB vs 244 MiB bundles — with the caveat about who published it,
said out loud), and the benefit side is [1Password's own account](https://1password.com/blog/1password-8-the-story-so-far)
of choosing Electron with a Rust core. **Say the conclusion explicitly: the cost is
technical, the benefit is organisational.** Students will want to argue about megabytes;
the professional answer is about team size.

**Mention once and move on:** iOS needs macOS and an Apple account (`research-02` §2.3),
and Apple retired Objective-C without ever deprecating it, by making the new frameworks
Swift-only (A4) — one sentence on what a platform owner can do to a language.

### Moduł 4b — *Ekosystem .NET*: why every .NET UI framework speaks XAML

The answer is not "XAML is good." It is a lineage, and it takes ninety seconds:

> WPF shipped in November 2006 with three things bundled together — a markup language, a
> dependency-property system, and a **data-binding engine**. MVVM was invented the year
> before to use that engine, and every later .NET UI framework inherited the whole
> package, because taking the markup without the binding would have meant re-inventing
> the pattern too.

Then the sentence that prevents a year of confusion: **a XAML file is a serialization
format for an object graph, plus a binding engine to keep that graph in sync with state
that lives elsewhere.** It is not a declarative UI in the SwiftUI or Compose sense
(A2.4), and students who believe it is will misunderstand every `INotifyPropertyChanged`
they write. Sources to have open: [WPF's data binding overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data/),
[dependency properties](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/properties/dependency-properties-overview),
[Gossman's original 2005 MVVM post](https://learn.microsoft.com/en-us/archive/blogs/johngossman/introduction-to-modelviewviewmodel-pattern-for-building-wpf-apps).

One line to defuse a predictable question: Avalonia's `.axaml` is the same language, and
the different extension exists "due to technical issues integrating with Visual Studio",
per [Avalonia's own docs](https://docs.avaloniaui.net/docs/fundamentals/avalonia-xaml).

### Moduł 4c — *Nasza decyzja*: the decision lesson gets its case study from A4

**Delphi is the case study**, and it is better than any hypothetical. A technically
strong product, a component model everyone copied, and it lost — while shipping. Give
them the two facts side by side: [RAD Studio's current price list](https://www.embarcadero.com/app-development-tools-store/rad-studio)
($2,000 / $3,400 / $4,416, checked 2026-08-29) and [Borland renaming itself Inprise in
April 1998](https://www.techmonitor.ai/technology/borland_becomes_inprise_as_it_shifts_to_the_enterprise/)
to move away from selling tools. The learning objective: **a student should leave able
to say "the language did not lose on merit", and cite the price.** That is exactly the
kind of reasoning 4c asks them to apply to their own stack choice — and it makes the
`research-02` framework table a decision with stakes rather than a feature comparison.

### Moduł 5c — *Okno, układ, zdarzenia*

Ten minutes of fossil-naming, from the table in A6. `object sender, EventArgs e` is the
Win32 message loop; `partial class` plus `InitializeComponent()` is the designer split;
`Dispatcher.Invoke` is the 1984 rule still being enforced. Students remember things that
have a reason. They do not remember conventions.

### Moduł 5d — *Dane i stan aplikacji*: the load-bearing lesson, and history is the argument

This is the lesson the whole year rests on, and the historical case for it is stronger
than the design case. **MVC (1979) → MVP (1996) → Presentation Model (2004) → MVVM
(2005) → MVU: forty-seven years of intelligent people re-deriving "do not keep your state
in the widget tree."** Present it as a dated lineage with five names and one rule.
Two things follow for free:

- **Moduł 7 becomes a payoff rather than a new topic.** If the state is not in the
  window, moving to Android is changing the shell.
- **Moduł 6 gets its argument in advance** (below).

### Moduł 6 — *Testy, jakość i przegląd kodu*

Two concrete additions.

**First, an exercise that teaches evidence-reading and costs nothing.** Ask students to
establish, from primary sources, what the recommended way to automate a Windows UI test
is in 2026. They will find that [Microsoft says WinAppDriver "is no longer under active
development"](https://learn.microsoft.com/windows/apps/develop/testing/#ui-test-automation),
that [its last release was v1.2.1 in November 2020](https://github.com/microsoft/WinAppDriver),
that [Appium's driver says the same and proxies to it anyway](https://github.com/appium/appium-windows-driver),
and that [.NET MAUI's docs pin that exact version](https://learn.microsoft.com/dotnet/maui/deployment/ui-testing?view=net-maui-10.0).
Five minutes of clicking, and they have discovered the state of an industry themselves.
Then the conclusion — **test the model, not the window** — is theirs rather than mine,
and it is the same conclusion as 5d.

**Second, pair the TDD evidence the way `research-01` pairs Stanford with METR.**
[Nagappan 2008](https://www.microsoft.com/en-us/research/wp-content/uploads/2009/10/Realizing-Quality-Improvement-Through-Test-Driven-Development-Results-and-Experiences-of-Four-Industrial-Teams-nagappan_tdd.pdf)
(40–90% fewer defects, 15–35% slower) next to
[Santos 2020](https://arxiv.org/abs/2011.11942) (novices slightly better test-last). Same
pedagogy as Moduł 1b, second data point, and it inoculates students against the idea that
a practice with a name is a practice with evidence.

For 6c specifically: [Bacchelli & Bird](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/ICSE202013-codereview.pdf)
found 44% of developers name defect-finding as review's main purpose while the actual
discussion is mostly other things. That is the frame for "AI does code review": the gap
between what review is *for* and what it *does* predates the model.

### Moduł 9 — *Wydanie*

The release lesson now has a spine: **the shift from "a bug is a recall" to "a bug is a
patch on Tuesday", and everything that follows from the price of a mistake collapsing**
(B6). Three current, dated hooks that make it 2026 rather than history: notarization has
been required for Developer ID software [since 1 June 2019](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution);
code-signing private keys must live in hardware [since 1 June 2023](https://cabforum.org/working-groups/code-signing/requirements/),
which is why signing a Windows binary now costs money; and the npm supply chain was
attacked by self-propagating worms in [September 2025](https://www.stepsecurity.io/blog/ctrl-tinycolor-and-40-npm-packages-compromised)
and [August 2026](https://www.veracode.com/blog/chaindrop-npm-supply-chain-worm/). These
pair with the Android developer-verification change already in `research-02` §5.1.

### Moduł 1e — *Jak nie wypaść z obiegu*: move A5 here

The four-indices table in A5 is a complete twenty-minute lesson with no C# in it: four
reputable sources, four different "most popular language", every one correct by its own
method. And it is current rather than historical because [IEEE Spectrum itself observed
in September 2025](https://spectrum.ieee.org/top-programming-languages-2025) that AI
assistants are eroding the public signal these indices are built on — which ties it
straight back to Moduł 1. This is the cheapest high-value lesson identified in this
document.

### Proposals for `course-structure-v1.md` — **not edits**

Three, in order of confidence:

1. **Add a post-release-feedback lesson to Moduł 9.** Nothing in the current structure
   covers crash reporting and telemetry, and the [SOSP 2009 WER paper](https://www.sigops.org/s/conferences/sosp/2009/papers/glerum-sosp09.pdf)
   makes it a 45-minute lesson with real numbers and a genuine ethics argument that is
   not about AI — the first lifecycle stage where the developer's interest and the
   user's are structurally opposed. Suggested as **9d**, or folded into 9c.
2. **Add a `Zadanie` to Moduł 1e built on A5** (the four-indices comparison). Costs no
   new hours; replaces a generic "read release notes" exercise with a checkable one.
3. **Consider moving one hour from 4e to 4a.** The frozen-window opener plus the
   operational definition plus the three-way trade is more than the current 4a budget
   comfortably holds, and 4e's brainstorm is deliberately loose.

### What to leave out, because it is interesting to me and useless to them

COM apartment models. The Global Assembly Cache. Binding redirects. The Itanium C++ ABI.
The full HOPL bibliography. Smalltalk's commercial decline (A4 records that the record is
contested — that is a note for Viktar, not a lesson). Waterfall beyond the single Royce
quote. The Bell & Thayer attribution question. Anything about Delphi that is not the
price.

---

## What rots

Ordered by how fast. Everything here should be re-checked before a lesson built on it is
written, and the check is cheap because every claim above carries its link.

| Claim | Shelf life | Re-check |
| --- | --- | --- |
| **TIOBE / Stack Overflow / Octoverse / IEEE Spectrum figures** (A5) | **Weeks to a year.** TIOBE moves monthly | All four, before Moduł 1e is taught. The *argument* — that four indices give four answers — is stable; every number in the table is not |
| **RAD Studio prices** (A4, 4c) | Months | [Embarcadero's store](https://www.embarcadero.com/app-development-tools-store/rad-studio). The argument survives a price change; the figure does not |
| **Framework version/stability status** — Flutter 3.47, Compose Multiplatform, KMP, MAUI AOT support (A1, A2.5) | Months | Vendor release notes. `research-02` §2 has the same problem and the same answer |
| **WinAppDriver / Appium / MAUI UI-testing situation** (B5, Moduł 6) | Months — and this one *should* change | The four links in B5. If Microsoft ships a successor, the exercise gets better, not worse: the students then discover a resolution instead of a stalemate |
| **Squirrel.Windows maintenance status** (B6) | Months | [The repo](https://github.com/Squirrel/Squirrel.Windows). Currently unmaintained-but-not-archived, which is unstable in both directions |
| **App-store commissions and DMA consequences** (B6) | Months. Actively litigated | Apple Newsroom, the European Commission. The €500m fine of 23 April 2025 may have successors |
| **Code-signing and notarization requirements** (B6, Moduł 9) | A year or two | CA/Browser Forum ballots, Apple developer news. These tighten; they do not loosen |
| **npm/NuGet supply-chain incidents** (B3) | **Continuous.** Two major campaigns in twelve months | Take the newest one at the time of writing; the 2025 and 2026 worms will be superseded |
| **Java structured concurrency preview count** (A2.3) | One JDK cycle | [openjdk.org/jeps](https://openjdk.org/jeps/533). "Seventh preview" is a good line only while it is true |
| **WPF/WinForms "still supported"** (A1, A4) | Years, but check | [The Windows developer FAQ](https://learn.microsoft.com/en-us/windows/apps/get-started/windows-developer-faq). Note the [dotnet/wpf roadmap](https://github.com/dotnet/wpf/blob/main/roadmap.md) was itself last substantively updated around .NET 9 — a stale roadmap is a signal, not a fact |
| **The historical material** — HOPL papers, Royce, MVC, DLL Hell, WER | **Does not rot.** | Only the URLs do. Three links in this document were already unreachable when checked (the `xprogramming.com` SUnit paper, Reenskaug's MVC pages, the original Project Reunion post); expect one or two more each year |

**The structural point, same as `research-01` §6:** the arguments in this document are
built to survive; the numbers in it are not. A lesson that teaches "the event loop, one
UI thread, state out of the widget tree" is good for a decade. A lesson that teaches
"C# is the fifth most popular language" is wrong within a year and was never right.

---

## Sources

**All URLs checked 2026-08-29** unless a different date is given in the text. Markers:
**[START]** = read this one first; *primary* = written by the people who did the thing;
*secondary* = someone else's account; *paywalled* / *archived* as noted. Entries marked
**[door]** are further reading — they are not evidence for a claim in this document, they
are places to keep going.

### Start here — the seven that repay reading most

1. **[START]** *primary* — [Alan Kay, *The Early History of Smalltalk*, HOPL-II, 1993](https://worrydream.com/EarlyHistoryOfSmalltalk/) — where the whole idea of a personal computer with a graphical interface came from, by the person who had it. Free mirror of ACM-copyrighted text.
2. **[START]** *primary* — [Winston Royce, *Managing the Development of Large Software Systems*, 1970 (PDF)](https://managewell.net/class/spring2003/cmsc838p/Process/waterfall.pdf) — eleven pages; the paper that says the opposite of what it is famous for. B1.
3. **[START]** *primary* — [Microsoft, *Preventing Hangs in Windows Applications*](https://learn.microsoft.com/en-us/previous-versions/windows/win32/win7appqual/preventing-hangs-in-windows-applications) — the frozen window, the five-second timeout and the ghost window, from the people who built them. A2.3, Moduł 4a.
4. **[START]** *primary* — [Glerum et al., *Debugging in the (Very) Large*, SOSP 2009 (PDF)](https://www.sigops.org/s/conferences/sosp/2009/papers/glerum-sosp09.pdf) — "data not decibels": what telemetry did to which bugs get fixed. B7.
5. **[START]** *primary* — [Joel Spolsky, *How Microsoft Lost the API War*, 13 June 2004](https://www.joelonsoftware.com/2004/06/13/how-microsoft-lost-the-api-war/) — a prediction made in 2004 that explains 2026. B8.
6. **[START]** *secondary* — [Martin Fowler, *GUI Architectures*](https://www.martinfowler.com/eaaDev/uiArchs.html) — MVC, MVP and Presentation Model in one essay. B2.
7. **[START]** *secondary* — [Krishna Sundarram, *Please Stop Citing TIOBE*, 28 July 2022](https://nindalf.com/posts/stop-citing-tiobe/) — the short, sharp critique to hand a student. A5.

### The early machines and the first GUI languages (A1)

- *primary* — [Thacker et al., *Alto: A Personal Computer*, Xerox PARC CSL-79-11, 7 Aug 1979 (PDF)](http://www.bitsavers.org/pdf/xerox/parc/techReports/CSL-79-11_Alto_A_Personal_Computer.pdf) — BCPL and Mesa; "very little assembly language code has been written for the Alto."
- *primary* — [Dan Ingalls, *Design Principles Behind Smalltalk*, BYTE, Aug 1981 (PDF)](http://l3dswiki.cs.colorado.edu/dlc-2006/uploads/116/Design%20Principles%20Behind%20Smalltalk.pdf) — hosted on a course wiki; stable enough, not institutional.
- *archived* — [BYTE, August 1981 — the Smalltalk issue](https://archive.org/details/byte-magazine-1981-08) — free, downloadable, the whole issue.
- *primary* — [Johnson et al., *The Xerox Star: A Retrospective*, IEEE Computer, Sept 1989 (PDF)](https://worrydream.com/refs/Johnson_1989_-_The_Xerox_Star,_a_Retrospective.pdf) — the Star's design, by its designers.
- *primary* — [Computer History Museum, Xerox Alto source release, 21 Oct 2014](https://computerhistory.org/press-releases/xerox-alto/) and [the archive itself](https://xeroxalto.computerhistory.org/xerox_alto_file_system_archive.html) — BCPL, Mesa, Smalltalk and Interlisp source.
- *primary* — [CHM, Apple Lisa source release, 19 Jan 2023](https://computerhistory.org/press-releases/chm-makes-apple-lisa-source-code-available-to-the-public-as-a-part-of-its-art-of-code-series/); *secondary* — [rochus-keller/LisaPascal](https://github.com/rochus-keller/LisaPascal) for the language counts (614 Pascal files vs ~203 assembler; 408 vs 45 kSLOC).
- *secondary* — [CHM, *The Lisa: Apple's Most Influential Failure*](https://computerhistory.org/blog/the-lisa-apples-most-influential-failure/) — Tesler, Clascal, and the road to Object Pascal.
- *primary* — [folklore.org, *3rd Party Developers and Macintosh Development*](https://folklore.org/3rd_Party_Developers_and_Macintosh_Development.html) — first-person Pascal-and-assembly recollection. Folklore by design.
- *archived* — [Inside Macintosh, 1992–1994 series](https://archive.org/details/inside-macintosh-1992-1994/1992-macintosh_toolbox_essentials) — the Toolbox and the event loop, free (the single-volume 1985 scan is borrow-only).
- *primary* — [Microsoft, *About Messages and Message Queues*](https://learn.microsoft.com/windows/win32/winmsg/about-messages-and-message-queues#message-handling) — the message loop, still documented in the same terms.
- *primary* — [Charles Petzold's own edition history of *Programming Windows*](https://www.charlespetzold.com/pw5/ProgWinEditions.html) — 1988 to 2012 in one page.
- *primary* — [Microsoft C++ Team, *Happy 25th Birthday MFC*](https://devblogs.microsoft.com/cppblog/happy-25th-birthday-mfc/) — MFC's 26 Feb 1992 date; and [TN006: Message Maps](https://learn.microsoft.com/cpp/mfc/tn006-message-maps?view=msvc-170) for why the macros exist.
- *archived* — [Borland C++ 3.0 User's Guide, 1991](https://archive.org/details/bitsavers_borlandborn3.0UsersGuide1991_9307755) — OWL's release vehicle, scanned.
- *primary* — [Raymond Chen, *How can I make a WNDPROC a member of my C++ class?*, 3 Feb 2014](https://devblogs.microsoft.com/oldnewthing/20140203-00/?p=1893) and **[door]** [*How are window manager handles determined in 16-bit Windows and Windows 95?*, 16 July 2007](https://devblogs.microsoft.com/oldnewthing/20070716-00/?p=26003) — Win32 design decisions, from inside. *(Note: the popular SimCity backward-compatibility anecdote traces to Spolsky's 2004 essay, not to Chen — do not misattribute it.)*
- *secondary* — [Alan Cooper interview, YourStory, 2017](https://yourstory.com/2017/06/techie-tuesdays-alan-cooper) — the "Ruby" shell in Cooper's own words; [CHM's profile](https://computerhistory.org/blog/2017-chm-fellow-alan-cooper-father-of-visual-basic/). *The name "Tripod" is widely repeated in retro-computing writing and I could not confirm it in a primary source.*
- *primary* — [Embarcadero, *Delphi and Turbo Pascal: 43 years*](https://blogs.embarcadero.com/delphi-and-turbo-pascal-43-years-of-continuous-innovation/) — Delphi 1's 14 Feb 1995 launch, Hejlsberg as lead architect, the VCL.
- *primary* — [Microsoft, *Adding a Component to a Visual Basic Project*](https://learn.microsoft.com/windows/win32/com/adding-a-component-to-a-visual-basic-project) and [the archived VBX→ActiveX migration list](https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-basic-6/aa231208(v=vs.60)) — the component model as Microsoft documented it.
- *primary* — [Ousterhout, *Tcl: An Embeddable Command Language*, USENIX Winter 1990 (PDF)](https://web.stanford.edu/~ouster/cgi-bin/papers/tcl-usenix.pdf); [*Scripting: Higher-Level Programming for the 21st Century*, IEEE Computer, March 1998](https://www.tcl-lang.org/doc/scripting.html); [Tcl history](https://www.tcl-lang.org/about/history.html).
- *primary* — [Cox, Naroff & Hsu, *The Origins of Objective-C…*, HOPL IV, 2020](https://dl.acm.org/doi/10.1145/3386332) — open access since ACM opened the DL in January 2026; [free mirror](https://www.academia.edu/50810695/The_Origins_of_Objective_C_at_PPI_Stepstone_and_Its_Evolution_at_NeXT) if the DOI is blocked.
- *primary* — [Apple, *Apple Releases Swift as Open Source*, 3 Dec 2015](https://www.apple.com/newsroom/2015/12/03Apple-Releases-Swift-as-Open-Source/); [Swift 5 / ABI stability, 25 Mar 2019](https://www.swift.org/blog/swift-5-released/).
- *primary* — [Electron, *10 Years of Electron*](https://electronjs.org/blog/10-years-of-electron) and [the 23 April 2015 rename post](https://www.electronjs.org/blog/electron).
- *primary* — [Tauri 2.0 stable, 2 Oct 2024](https://v2.tauri.app/blog/tauri-20/); [Flutter 1.0, 4 Dec 2018](https://developers.googleblog.com/flutter-10-googles-portable-ui-toolkit/); [Flutter 3 desktop stable, 11 May 2022](https://flutter.dev/blog/whats-new-in-flutter-3); [Flutter 3.47, 12 Aug 2026](https://flutter.dev/blog/whats-new-in-flutter-3-47); [KMP stable, Nov 2023](https://blog.jetbrains.com/kotlin/2023/11/kotlin-multiplatform-stable/); [Compose Multiplatform for iOS stable, May 2025](https://blog.jetbrains.com/kotlin/2025/05/compose-multiplatform-1-8-0-released-compose-multiplatform-for-ios-is-stable-and-production-ready/).

### Memory, types and concurrency (A2.1–A2.3)

- *primary* — [clang, *Automatic Reference Counting*](https://clang.llvm.org/docs/AutomaticReferenceCounting.html) — ARC "does not provide a cycle collector"; [Apple's ARC transition notes](https://developer.apple.com/library/archive/releasenotes/ObjectiveC/RN-TransitioningToARC/Introduction/Introduction.html) *(archived)*.
- *primary* — [Microsoft, *Rules for Managing Reference Counts*](https://learn.microsoft.com/en-us/windows/win32/com/rules-for-managing-reference-counts) — reference counting as a protocol rather than a language feature.
- *primary* — .NET GC: [fundamentals](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/fundamentals), [latency modes](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/latency), [workstation vs server](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/workstation-server-gc), [DATAS](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/datas).
- *primary* — [.NET Blog, *App trimming in .NET 5*, 31 Aug 2020](https://devblogs.microsoft.com/dotnet/app-trimming-in-net-5/) — the only sourced size figures found (78.9 → 39.7 → 31.5 MB; 10.5 → 2.2 MB).
- *primary* — [The Rust Book, ch. 4: ownership](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html); [rust-lang.org](https://www.rust-lang.org/) for "no runtime or garbage collector."
- *primary* — [Tony Hoare, *Null References: The Billion Dollar Mistake*, QCon London 2009](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/).
- *primary* — [Mads Torgersen, *Introducing Nullable Reference Types in C#*, Nov 2017](https://devblogs.microsoft.com/dotnet/nullable-reference-types-in-csharp/); [C# 8 release, Sept 2019](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-8); [Kotlin null safety](https://kotlinlang.org/docs/null-safety.html).
- *primary* — [TypeScript announcement, 1 Oct 2012](https://learn.microsoft.com/en-us/archive/blogs/somasegar/typescript-javascript-development-at-application-scale) *(archived)*; [PEP 484](https://peps.python.org/pep-0484/); [PEP 3107](https://peps.python.org/pep-3107/).
- *primary* — the single-UI-thread rule, three vendors: [WPF threading model](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/threading-model), [Android processes and threads](https://developer.android.com/guide/components/processes-and-threads), [Apple thread-safety summary](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Multithreading/ThreadSafetySummary/ThreadSafetySummary.html) *(archived)*.
- *primary* — [Stephen Toub, *Async/Await FAQ*, 12 Apr 2012](https://devblogs.microsoft.com/dotnet/asyncawait-faq/) and **[door]** [*How Async/Await Really Works in C#*, 16 Mar 2023](https://devblogs.microsoft.com/dotnet/how-async-await-really-works/) — the long, current explanation.
- *primary* — [Bierman et al., *Pause 'n' Play: Formalizing Asynchronous C#*, ECOOP 2012 (PDF)](https://gavinbierman.github.io/assets/pdf/ecoop2012.pdf); [Syme et al., *The F# Asynchronous Programming Model*, PADL 2011 (PDF)](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/async-padl-revised-v2.pdf); **[door]** [*The Early History of F#*, HOPL IV 2020 (free PDF)](https://fsharp.org/history/hopl-final/hopl-fsharp.pdf).
- *primary* — async/await elsewhere: [PEP 492](https://peps.python.org/pep-0492/), [ES2017 spec](https://tc39.es/ecma262/2017/), [Kotlin 1.3](https://kotlinlang.org/docs/whatsnew13.html), [Rust 1.39](https://github.com/rust-lang/rust/releases/tag/1.39.0), [Swift 5.5](https://www.swift.org/blog/swift-5.5-released/).
- *primary* — structured concurrency: [Sústrik, 2016](https://www.250bpm.com/p/structured-concurrency), [Smith, 2018](https://vorpus.org/blog/notes-on-structured-concurrency-or-go-statement-considered-harmful/), [Swift SE-0304](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0304-structured-concurrency.md), [Kotlin coroutines basics](https://kotlinlang.org/docs/coroutines-basics.html), [JEP 525](https://openjdk.org/jeps/525), [Inside.java on JEP 533, 11 May 2026](https://inside.java/2026/05/11/jep533-target-jdk27/).

### UI description, compilation and interop (A2.4–A2.6)

- *primary* — [WPF overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/overview/), [XAML overview](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/xaml/), [data binding](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/data/), [dependency properties](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/properties/dependency-properties-overview), [WPF architecture](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/wpf-architecture), [retained-mode rendering](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/graphics-multimedia/wpf-graphics-rendering-overview), [.NET Framework 3.0 release, 7 Nov 2006](https://devblogs.microsoft.com/setup/microsoft-net-framework-3-0-released/).
- *primary* — [React, *Why did we build React?*, 5 June 2013](https://legacy.reactjs.org/blog/2013/06/05/why-react.html); [react.dev on imperative vs declarative](https://react.dev/learn/reacting-to-input-with-state); [Apple's SwiftUI announcement, 3 June 2019](https://developer.apple.com/news/?id=06032019b); [Jetpack Compose 1.0, 28 July 2021](https://android-developers.googleblog.com/2021/07/jetpack-compose-announcement.html); [*Thinking in Compose*](https://developer.android.com/develop/ui/compose/mental-model).
- *primary* — **[door]** [Casey Muratori, *Immediate-Mode Graphical User Interfaces* (2005)](https://caseymuratori.com/blog_0001) and [Dear ImGui](https://github.com/ocornut/imgui) — the same conclusion reached from the games side, a decade early.
- *primary* — [ReadyToRun](https://learn.microsoft.com/dotnet/core/deploying/ready-to-run#impact-of-using-the-readytorun-feature) ("two to three times larger"), [Native AOT](https://learn.microsoft.com/dotnet/core/deploying/native-aot/) and [its limitations](https://learn.microsoft.com/dotnet/core/deploying/native-aot/#limitations-of-native-aot-deployment), [.NET 8 AOT size table](https://learn.microsoft.com/dotnet/core/whats-new/dotnet-8/runtime#native-aot-support), [MAUI compilation strategies](https://learn.microsoft.com/dotnet/maui/deployment/runtimes-compilation?view=net-maui-10.0#compilation-strategies).
- *primary* — [Android 7.0: JIT added back to ART](https://developer.android.com/about/versions/nougat/android-7.0.html); [AOSP JIT compiler](https://source.android.com/docs/core/runtime/jit-compiler); [Oracle HotSpot tiered compilation](https://docs.oracle.com/en/java/javase/21/vm/java-hotspot-virtual-machine-performance-enhancements.html); [.NET managed execution](https://learn.microsoft.com/dotnet/standard/managed-execution-process).
- *primary* — [WebAssembly specs status](https://webassembly.org/specs/) — 2.0 is a Candidate Recommendation Draft (16 June 2025), **not** a Recommendation.
- *primary* — the ABI problem: [Microsoft on C++ ABI instability and COM](https://learn.microsoft.com/cpp/porting/overview-of-potential-upgrade-issues-visual-cpp?view=msvc-170#library-and-build-tools-dependencies), [.NET ABI support](https://learn.microsoft.com/dotnet/standard/native-interop/abi-support), [Itanium C++ ABI](https://itanium-cxx-abi.github.io/cxx-abi/abi.html), [COM technical overview](https://learn.microsoft.com/windows/win32/com/com-technical-overview), [P/Invoke source generation](https://learn.microsoft.com/dotnet/standard/native-interop/pinvoke-source-generation).
- *primary* — where frameworks bleed: [Flutter platform channels](https://docs.flutter.dev/platform-integration/platform-channels), [MAUI platform code](https://learn.microsoft.com/dotnet/maui/platform-integration/invoke-platform-code?view=net-maui-10.0), [Electron native modules and the ABI](https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules), [React Native's New Architecture](https://reactnative.dev/architecture/landing-page).

### The languages that lost (A4)

- *primary* — [Microsoft VB6 support policy](https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-basic-6/visual-basic-6-support-policy) (runtime still supported on Windows 10/11); [IDE end of support, 8 Apr 2008](https://learn.microsoft.com/en-us/lifecycle/announcements/visual-basic-6-support-announcement); [".NET 5.0 — we do not plan to evolve Visual Basic as a language", 11 Mar 2020](https://devblogs.microsoft.com/vbteam/visual-basic-support-planned-for-net-5-0/).
- *primary/contemporaneous* — [Somasegar, 16 Mar 2005](https://learn.microsoft.com/en-us/archive/blogs/somasegar/rumors-of-my-vb6-demise); [Jay Roxe's open letter, 17 Mar 2005](https://learn.microsoft.com/nl-nl/archive/blogs/jroxe/an-open-letter-to-the-community); *secondary* — [eWeek, 9 Mar 2005](https://www.eweek.com/development/microsoft-mvps-say-they-want-old-vb-back/); **[door]** [Dan Appleman's dissent, 8 Mar 2005](https://danappleman.com/2005/03/08/the-revolt-of-the-vb-mvps-an-alternate-recommendation/).
- *primary* — [Embarcadero RAD Studio store](https://www.embarcadero.com/app-development-tools-store/rad-studio) (prices, checked 2026-08-29); *contemporaneous* — [Borland → Inprise, 29 Apr 1998](https://www.techmonitor.ai/technology/borland_becomes_inprise_as_it_shifts_to_the_enterprise/); [The Register on the CodeGear sale, 7 May 2008](https://www.theregister.com/2008/05/07/codegear_embarcadero/) ($23m) vs [Wikipedia's CodeGear article](https://en.wikipedia.org/wiki/CodeGear) (~$24.5m) — *the figures disagree; both are recorded*.
- *primary* — [JEP 289, applet deprecation](https://openjdk.org/jeps/289); [Oracle *Java Client Roadmap Update*, March 2018 (PDF)](https://www.oracle.com/docs/tech/java/javaclientroadmapupdate2018mar.pdf); [openjfx.io](https://openjfx.io/); [Gluon, 21 Aug 2018](https://gluonhq.com/news/javafx-11-release-and-support-plans/); [Oracle's Inside.java on Swing, 3 May 2026](https://inside.java/2026/05/03/jdk-client-desktop/).
- *primary* — [Apple's retired Objective-C conceptual guide](https://developer.apple.com/library/archive/documentation/General/Conceptual/DevPedia-CocoaCore/ObjectiveC.html) *(archived)* vs [the live runtime reference](https://developer.apple.com/documentation/objectivec).

### Measuring popularity (A5)

- *primary* — [TIOBE index](https://www.tiobe.com/tiobe-index/) (August 2026 figures) and [its methodology page](https://www.tiobe.com/tiobe-index/programming-languages-definition/).
- *primary* — [Stack Overflow Developer Survey 2025 — technology](https://survey.stackoverflow.co/2025/technology) and [methodology](https://survey.stackoverflow.co/2025/methodology).
- *primary* — [GitHub Octoverse 2025, published 28 Oct 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/).
- *primary* — [IEEE Spectrum, *Top Programming Languages 2025*, 23 Sept 2025](https://spectrum.ieee.org/top-programming-languages-2025) and [its methodology](https://spectrum.ieee.org/top-programming-languages-methodology-2025).
- *vendor survey* — [JetBrains *State of Developer Ecosystem 2024*](https://www.jetbrains.com/lp/devecosystem-2024/) (desktop at 53%) and [the 2025 edition](https://blog.jetbrains.com/research/2025/10/state-of-developer-ecosystem-2025/) (no retrievable desktop percentage).

### Process, patterns and version control (B1, B2, B4)

- *primary* — [Royce 1970 (PDF)](https://managewell.net/class/spring2003/cmsc838p/Process/waterfall.pdf); [Bell & Thayer 1976, free copy (PDF)](https://static.aminer.org/pdf/PDF/000/361/405/software_requirements_are_they_really_a_problem.pdf) and its [ACM record](https://dl.acm.org/doi/10.5555/800253.807650) *(paywalled)*; **[door]** [Larman & Basili, *Iterative and Incremental Development: A Brief History*, IEEE Computer, June 2003 (PDF)](https://www.cs.umd.edu/~basili/publications/journals/J90.pdf) — the peer-reviewed correction to the whole waterfall story.
- *primary* — [DOD-STD-2167A, 29 Feb 1988](https://everyspec.com/DoD/DoD-STD/DOD-STD-2167A_8470/); [MIL-STD-498, 5 Dec 1994](https://everyspec.com/MIL-STD/MIL-STD-0300-0499/MIL-STD-498_25500/); [IBM Rational RUP whitepaper (PDF)](https://public.dhe.ibm.com/software/rational/web/whitepapers/2003/rup_bestpractices.pdf).
- *primary* — [agilemanifesto.org](https://agilemanifesto.org/), [principles](https://agilemanifesto.org/principles.html), [history](https://agilemanifesto.org/history.html); *secondary* — [Fowler on the C3 project](https://www.martinfowler.com/bliki/C3.html); *vendor* — [Digital.ai 18th State of Agile Report](https://digital.ai/resource-center/analyst-reports/18th-state-of-agile-report/).
- *primary* — [Potel, *MVP: Model-View-Presenter*, Taligent 1996 (PDF)](https://www.wildcrest.com/Potel/Portfolio/mvp.pdf); [Fowler, *Presentation Model*, 19 July 2004](https://www.martinfowler.com/eaaDev/PresentationModel.html); [Gossman, MVVM, 8 Oct 2005](https://learn.microsoft.com/en-us/archive/blogs/johngossman/introduction-to-modelviewviewmodel-pattern-for-building-wpf-apps); [Krasner & Pope, MVC cookbook, 1988 (PDF)](https://www.ics.uci.edu/~redmiles/ics227-SQ04/papers/KrasnerPope88.pdf); [CommunityToolkit.Mvvm](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/).
- *primary* — [Tichy, *RCS — A System for Version Control*, 1985 (free PDF)](https://docs-archive.freebsd.org/44doc/psd/13.rcs/paper.pdf); [Rochkind, SCCS, 1975](https://dl.acm.org/doi/10.1109/TSE.1975.6312866) *(paywalled)*; [Dick Grune's own CVS page](https://dickgrune.com/Programs/CVS.orig/); [svnbook on Subversion's goal](https://svnbook.red-bean.com/en/1.7/svn.intro.whatis.html); [Git's first commit, 7 Apr 2005](https://github.com/git/git/commit/e83c5163316f89bfbde7d9ab23ca2e25604af290); [LKML "Kernel SCM saga..", 6 Apr 2005 (archived)](https://www.krsaborio.net/linux-kernel/research/2005/0406.html); [git-scm history](https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git).
- *primary* — [Bacchelli & Bird, *Expectations, Outcomes, and Challenges of Modern Code Review*, ICSE 2013 (free MSR PDF)](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/ICSE202013-codereview.pdf); [GitHub, *Pull Requests 2.0*, 31 Aug 2010](https://github.blog/2010-08-31-pull-requests-2-0/).

### Build, dependencies and supply chain (B3)

- *primary* — [Feldman, *Make*, 1979 (free PDF)](https://pages.cs.wisc.edu/~horwitz/make/make.pdf) and **[door]** [his 1989 oral history](https://www.tuhs.org/Archive/Documentation/OralHistory/transcripts/feldman.htm); [MSBuild](https://learn.microsoft.com/visualstudio/msbuild/msbuild?view=visualstudio); [SDK-style projects](https://learn.microsoft.com/dotnet/core/project-sdk/overview).
- *primary* — DLL Hell mechanisms: [side-by-side execution](https://learn.microsoft.com/dotnet/framework/deployment/side-by-side-execution), [strong naming](https://learn.microsoft.com/dotnet/standard/assembly/strong-named), [the GAC does not exist in .NET Core+](https://learn.microsoft.com/dotnet/core/compatibility/core-libraries/5.0/global-assembly-cache-apis-obsolete), [binding redirects](https://learn.microsoft.com/dotnet/framework/configure-apps/redirect-assembly-versions), [WinSxS assemblies](https://learn.microsoft.com/windows/win32/sbscs/using-side-by-side-assemblies), [self-contained deployment](https://learn.microsoft.com/dotnet/core/deploying/#publish-as-self-contained), [.NET Core dependency loading](https://learn.microsoft.com/dotnet/core/dependency-loading/overview).
- *primary* — [Phil Haack, NuPack → NuGet, 21 Oct 2010](https://haacked.com/archive/2010/10/21/renaming-nupack.aspx/); [NuGet dependency resolution](https://learn.microsoft.com/nuget/concepts/dependency-resolution#direct-dependency-wins); [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders); [package-lock.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json); [Reproducible Builds definition](https://reproducible-builds.org/docs/definition/).
- *primary* — [npm on left-pad, 23 Mar 2016](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm); [event-stream issue #116, Nov 2018](https://github.com/dominictarr/event-stream/issues/116); [Freund's xz disclosure, 29 Mar 2024](https://www.openwall.com/lists/oss-security/2024/03/29/4); [NVD CVE-2024-3094](https://nvd.nist.gov/vuln/detail/CVE-2024-3094); *secondary* — [Shai-Hulud worm, 15 Sept 2025](https://www.stepsecurity.io/blog/ctrl-tinycolor-and-40-npm-packages-compromised), [ChainDrop, 7 Aug 2026](https://www.veracode.com/blog/chaindrop-npm-supply-chain-worm/); [CISA SBOM](https://www.cisa.gov/sbom); [npm provenance, 19 Apr 2023](https://github.blog/security/supply-chain-security/introducing-npm-package-provenance/).

### Testing (B5)

- *secondary* — [Fowler, *Xunit*](https://martinfowler.com/bliki/Xunit.html) — the SUnit → JUnit → xUnit lineage, and the sole source for the OOPSLA-flight story; [Fowler, *TestPyramid*, 1 May 2012](https://martinfowler.com/bliki/TestPyramid.html); [Fowler, *Continuous Integration*, first published 10 Sept 2000, revised 18 Jan 2024](https://martinfowler.com/articles/continuousIntegration.html).
- *primary* — [Nagappan et al., TDD at Microsoft and IBM, 2008 (free MSR PDF)](https://www.microsoft.com/en-us/research/wp-content/uploads/2009/10/Realizing-Quality-Improvement-Through-Test-Driven-Development-Results-and-Experiences-of-Four-Industrial-Teams-nagappan_tdd.pdf); [Santos et al., meta-analysis, arXiv 2020](https://arxiv.org/abs/2011.11942); [Baldassarre et al., longitudinal study, arXiv 2021](https://arxiv.org/abs/2105.03312).
- *primary* — [Google Testing Blog, *Flaky Tests at Google*, 27 May 2016](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html) — 1.5% / 16% / 84%.
- *primary* — [Microsoft UI Automation overview](https://learn.microsoft.com/en-us/windows/win32/winauto/entry-uiautocore-overview); [custom automation peers](https://learn.microsoft.com/windows/apps/design/accessibility/custom-automation-peers); [UIA for automated testing](https://learn.microsoft.com/windows/win32/winauto/uiauto-usefortesting); [Apple, *UI Testing in Xcode*](https://developer.apple.com/library/archive/documentation/DeveloperTools/Conceptual/testing_with_xcode/chapters/09-ui_testing.html) *(archived)*.
- *primary* — the current state of Windows UI automation, four links that should be read together: [Microsoft's testing guidance](https://learn.microsoft.com/windows/apps/develop/testing/#ui-test-automation), [WinAppDriver](https://github.com/microsoft/WinAppDriver), [appium-windows-driver](https://github.com/appium/appium-windows-driver), [.NET MAUI UI testing](https://learn.microsoft.com/dotnet/maui/deployment/ui-testing?view=net-maui-10.0); plus [Avalonia headless testing](https://docs.avaloniaui.net/docs/concepts/headless/).
- *primary* — [Walczak et al., LLM unit-test generation, arXiv 2507.14256, 18 July 2025](https://arxiv.org/abs/2507.14256); [*When AI-Generated Unit Tests Validate Bugs*, IEEE, Jan 2026](https://www.computer.org/csdl/magazine/so/2026/01/11122545/2965OYHXMsw) *(paywalled — title and venue verified only)*.

### Release, distribution and telemetry (B6, B7)

- *primary* — [MSIX overview](https://learn.microsoft.com/en-us/windows/msix/overview); [Windows Installer portal](https://learn.microsoft.com/windows/win32/msi/windows-installer-portal); [packaging / migrating from legacy installers](https://learn.microsoft.com/windows/apps/package-and-deploy/packaging/#migrating-to-msix-from-legacy-installers); [ClickOnce (not supported for WinUI 3)](https://learn.microsoft.com/windows/apps/package-and-deploy/publish-first-app#step-4b-distribute-directly-alternative-path); [InstallShield today](https://www.revenera.com/install/products/installshield).
- *primary* — [Sparkle](https://github.com/sparkle-project/Sparkle); [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) and [the 2019 "no longer maintained" statement](https://github.com/electron/electron/issues/17722); [Electron autoUpdater](https://www.electronjs.org/docs/latest/api/auto-updater).
- *primary* — [Apple notarization requirements](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution); [CA/Browser Forum code-signing requirements](https://cabforum.org/working-groups/code-signing/requirements/); [Microsoft code-signing options](https://learn.microsoft.com/windows/apps/package-and-deploy/code-signing-options); [SmartScreen EV change, 2024](https://learn.microsoft.com/windows/apps/package-and-deploy/distribution-feature-status#smartscreen-reputation-ev-certificates-no-longer-grant-instant-bypass).
- *primary* — [Mac App Store opening, 6 Jan 2011](https://www.apple.com/newsroom/2011/01/06Apples-Mac-App-Store-Opens-for-Business/); [App Sandbox deadline announcement, 2 Nov 2011](https://developer.apple.com/news/?id=11022011a); [Microsoft Store opens to EXE/MSI and drops its revenue share, 28 Sept 2021](https://blogs.windows.com/windowsdeveloper/2021/09/28/microsoft-store-more-apps-more-open/) and [the packaging requirement page](https://learn.microsoft.com/windows/apps/publish/publish-your-app/msi/app-package-requirements); [Apple Small Business Program, 18 Nov 2020](https://www.apple.com/newsroom/2020/11/apple-announces-app-store-small-business-program/); [European Commission DMA decision, 23 Apr 2025](https://digital-strategy.ec.europa.eu/en/news/commission-finds-apple-and-meta-breach-digital-markets-act).
- *primary* — [winget preview, 19 May 2020](https://devblogs.microsoft.com/commandline/windows-package-manager-preview/); [Homebrew](https://brew.sh); [Flatpak](https://flatpak.org/); [Snap Store hosted by Canonical](https://ubuntu.com/core/services/guide/snaps-intro).
- *primary* — release cadence: [Windows as a service](https://learn.microsoft.com/windows/deployment/update/waas-overview); [Chrome moving to two-week releases, from 8 Sept 2026](https://developer.chrome.com/blog/chrome-two-week-release); [.NET versions and cadence](https://learn.microsoft.com/dotnet/core/versions/).
- *primary* — [Glerum et al., SOSP 2009 (PDF)](https://www.sigops.org/s/conferences/sosp/2009/papers/glerum-sosp09.pdf); [WER documentation](https://learn.microsoft.com/windows/win32/wer/about-wer); [Windows diagnostic data levels](https://learn.microsoft.com/windows/privacy/configure-windows-diagnostic-data-in-your-organization); [GDPR, Regulation (EU) 2016/679](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679); [Sentry, data collected](https://docs.sentry.io/data-management/data-collected/); [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics).

### The eclipse and the return (B8)

- *primary* — [Spolsky, 13 June 2004](https://www.joelonsoftware.com/2004/06/13/how-microsoft-lost-the-api-war/); [Gmail, 1 Apr 2004](http://googlepress.blogspot.com/2004/04/google-gets-message-launches-gmail.html); [Google Docs, 11 Oct 2006](http://googlepress.blogspot.com/2006/10/google-announces-google-docs_11.html); [Chrome, 2 Sept 2008](https://googlepress.blogspot.com/2008/09/google-chrome-new-take-on-browser_02.html); [Chromebooks, 11 May 2011](https://chrome.googleblog.com/2011/05/new-kind-of-computer-chromebook.html).
- *primary* — [Project Reunion 0.5, 29 Mar 2021](https://blogs.windows.com/windowsdeveloper/2021/03/29/announcing-project-reunion-0-5/); [Windows App SDK docs, page updated 20 Dec 2025](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/); *secondary* — [The Verge on the original Project Reunion announcement, 19 May 2020](https://www.theverge.com/2020/5/19/21258697/microsoft-windows-project-reunion-win32-uwp-apps-apis-build).
- *primary* — [VS Code, *Why VS Code?*](https://code.visualstudio.com/docs/editor/whyvscode); [Slack Engineering on choosing Electron, 25 Oct 2016](https://slack.engineering/building-hybrid-applications-with-electron/); [1Password 8, 12 Aug 2021](https://1password.com/blog/1password-8-the-story-so-far); [Slack's 2019 desktop rebuild](https://slack.engineering/rebuilding-slack-on-the-desktop/) *(chart only — no extractable figure)*.
- *third-party measurement* — [Hopp, Tauri vs Electron, 9 Apr 2025](https://www.gethopp.app/blog/tauri-vs-electron) — dated and numeric, published by an interested party; *vendor claim* — [Tauri's "as little as 600KB"](https://v2.tauri.app/).
- *primary* — Rust's security case: [Google, Android memory safety, 25 Sept 2024](https://security.googleblog.com/2024/09/eliminating-memory-safety-vulnerabilities-Android.html) and [the 2022 post](https://security.googleblog.com/2022/12/memory-safe-languages-in-android-13.html); [Microsoft MSRC, 18 July 2019](https://www.microsoft.com/en-us/msrc/blog/2019/07/we-need-a-safer-systems-programming-language).

### Checked and could not be verified — recorded so nobody re-does the work

- **Reenskaug's own MVC pages** ([heim.ifi.uio.no](http://heim.ifi.uio.no/~trygver/themes/mvc/mvc-index.html), [folk.universitetetioslo.no](https://folk.universitetetioslo.no/trygver/themes/mvc/mvc-index.html)) — SSL and bot-blocking; the pages are heavily cited and almost certainly fine. Use Krasner & Pope in the meantime.
- **Kent Beck's *Simple Smalltalk Testing*** (`xprogramming.com/testfram.htm`) — unreachable; the citation is solid across many sources, the canonical copy is not currently openable.
- **The original Project Reunion post** (Windows Developer Blog, 19 May 2020) — redirect loop; corroborated by contemporaneous press.
- **Slack's 2019 memory figure** — the number is inside an image in [the post](https://slack.engineering/rebuilding-slack-on-the-desktop/), not in text. No figure is claimed here.
- **C#'s exact IEEE Spectrum 2025 position** — the table is client-side rendered and did not resolve. No number is given.
- **The lineage from VB/Delphi's component model to Interface Builder, Qt Designer or Android's layout editor** — no source found in either direction; [Qt's own Designer retrospective](https://doc.qt.io/archives/qq/qq14-designer.html) does not mention VB or Delphi at all. Convergence is as likely as descent. **Not claimed.**
- **The origin of two-way data binding** — no authoritative account found. Not claimed.
- **"Windows Installer is in maintenance mode"** — inference from a 2009 last version plus current migration guidance, not a Microsoft statement. Not asserted.
- **"The Snap Store back end is proprietary"** — community-sourced only, including on Canonical's own forum. Not asserted.
- **"ART replaced Dalvik in Android 5.0 (2014)"** — could not be confirmed against a Google primary source; the Android 7.0 hybrid claim (which is what the argument needs) is fully sourced.

### Related repo documents

- [`research-01-ai-assisted-development.md`](research-01-ai-assisted-development.md) — AI-assisted development, SDD, and the education research. **This document does not repeat it**; B1 and B5 link into it.
- [`research-02-stack-tooling-constraints.md`](research-02-stack-tooling-constraints.md) — the .NET desktop/mobile landscape, the lab-machine constraint, INF.04, and distribution. A1's closing paragraph and Moduł 4b/4c above defer to it entirely.
- [`course-structure-v1.md`](course-structure-v1.md) — the proposal this feeds. Three changes are **proposed** in *What this means for the course*; none is made here.
- [`../adr/0008-sourcing-content-claims.md`](../adr/0008-sourcing-content-claims.md) — the rule this document is written under.
