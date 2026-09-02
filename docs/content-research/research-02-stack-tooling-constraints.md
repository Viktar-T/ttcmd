# Research 02 — Stack, tooling and the constraints that actually decide

| | |
| --- | --- |
| Written | 2026-08-28 |
| For | Course structure v1.0 — *Aplikacje desktopowe i mobilne* |
| Status | **Research notes.** Repo-facing English (Article III). |
| Feeds | `course-structure-v1.md`, module 4 (stack decision) and module 9 (release) |

> **Article V applies throughout.** The exam scope, the lab machines, the timetable
> and the school's rules are **not settled and not this repo's to decide**. Every
> such item below is marked **TO CONFIRM** and must be verified before it appears
> anywhere student-facing. Findings here are from public sources, not from the school.

---

## 1. The constraint that decides almost everything: what the lab machines run

The daily note contains the line *"build the list what to install on **Ubuntu** TTC."*
If that is right, it is the single highest-leverage fact in this document, because
of one asymmetry:

> **.NET MAUI has no Linux support and Microsoft has explicitly stated there is no
> roadmap for it. Avalonia and Uno both support Linux desktop as a first-class target.**

So the obvious answer — "C#, so MAUI, because Microsoft" — **does not run on the
machines the students sit at**, if those machines are Ubuntu. Everything downstream
(which framework, which IDE, what a "desktop app" even looks like in this room)
follows from confirming this one fact.

**TO CONFIRM, before Module 4 is written:**

| # | Question | Why it decides something |
| --- | --- | --- |
| 1 | Lab OS: Ubuntu, Windows, or dual-boot? Which version? | MAUI in or out |
| 2 | Admin rights — can students install SDKs and workloads? | Whether setup is a lesson or a pre-installed image |
| 3 | Are Android phones available, or only an emulator? | Emulator needs RAM + nested virtualisation |
| 4 | RAM / CPU of the lab machines | An Android emulator on 8 GB alongside an IDE is painful |
| 5 | Is the school network filtered? Does it reach model APIs, GitHub, NuGet? | An AI-assisted course on a network that blocks the APIs is not a course |
| 6 | Can students use personal laptops / phones? | Changes the whole tooling answer |

## 2. The .NET desktop + mobile landscape, August 2026

### 2.1 The three real candidates

| | **.NET MAUI 11** | **Avalonia 11.3** | **Uno Platform 6** |
| --- | --- | --- | --- |
| Windows | ✅ | ✅ | ✅ |
| **Linux desktop** | ❌ **no roadmap** | ✅ (X11, Wayland) | ✅ |
| macOS | Mac Catalyst only | ✅ native Cocoa | ✅ AppKit |
| Android | ✅ | ✅ | ✅ |
| iOS | ✅ | ✅ | ✅ |
| Browser / WASM | ❌ | 🟡 preview | ✅ **production** |
| Rendering | Wraps **native** controls | **Skia** — pixel-identical everywhere | Native by default, Skia optional |
| Licence | MIT + Microsoft first-party support | MIT (+ commercial "Accelerate") | Apache 2.0 (+ nventive support) |
| Comes from | WPF / XAML | WPF-shaped; easiest for WPF people | WinUI 3 XAML compatible |

### 2.2 What that means for this course

- **Windows lab → MAUI is defensible.** Native controls, first-party support, one
  codebase for desktop + Android, and it is the path the .NET ecosystem documents best.
- **Ubuntu lab → Avalonia is the answer.** One codebase covering **Linux desktop +
  Windows desktop + Android**, from machines that run Linux. Its WPF lineage also
  keeps it close to whatever the exam expects (§3).
- **Uno** is the only production-grade WebAssembly option, which would let a student
  hand someone a *link* instead of an installer — genuinely attractive for the
  "someone actually uses it" goal (§5). It is also the largest surface area to
  learn. **Not recommended as the teaching default; worth naming as the answer to
  "can it run in a browser?"**

### 2.3 iOS is out, and should be said out loud once

Building and signing for iOS requires macOS and an Apple Developer account. Unless
the school has Macs, **"mobile" in this course means Android.** Better to state
that in week one than to discover it in April.

### 2.4 Runtime version

- **.NET 10 — LTS**, shipped November 2025. Three years of support. The safe
  teaching baseline for a school year starting September 2026.
- **.NET 11 — STS**, releasing **2026-11-10**, supported only until **2028-11-09**,
  shipping **C# 15** (union types, closed hierarchies, collection expression
  arguments, labeled `break`/`continue`). Avalonia's mobile targets require .NET 10+.

Microsoft's cadence: a major version every November, **even years LTS (3 years),
odd years STS (2 years)**. So .NET 11 arrives mid-course *and* is the shorter-lived
of the two — which settles the question below rather than complicating it.

**Recommendation: pin the course to .NET 10 and do not chase .NET 11 mid-year.** A
runtime bump in February costs a week of everyone's time and teaches nothing. Note
the release in the "staying current" lesson instead.

## 3. INF.04 — what public sources say (**TO CONFIRM against CKE**)

The qualification is split into 11 units of learning outcomes. Two are directly
this course:

- **INF.04.5 — Aplikacje desktopowe**
- **INF.04.6 — Aplikacje mobilne**

with **INF.04.4 (programowanie obiektowe)** underneath and **INF.04.8 (testowanie i
dokumentowanie)** on top.

Languages named in the public description: **C++, C#, Java, Python, JavaScript,
Visual Basic**. Technologies named: **WPF, Qt** for desktop; **Visual Studio,
Android Studio, XCode** with **Objective-C, Swift, Java, C#** for mobile; **Git**
throughout.

### What this does and does not settle

- ✅ **C# is squarely in scope** for both desktop and mobile. Choosing it does not
  put students at a disadvantage in the exam.
- ⚠️ **The named desktop technology is WPF, not MAUI and not Avalonia.** WPF is
  Windows-only and effectively in maintenance. Avalonia is close enough to WPF in
  concepts and XAML that the transfer is real — but *that claim needs checking
  against an actual recent arkusz*, not assumed.
- ⚠️ **The named tools are Visual Studio / Android Studio / XCode**, none of which
  is the obvious choice on Ubuntu.
- ❌ **This is a secondary source.** Article V forbids asserting exam scope on the
  site. Verify against the official *podstawa programowa* and the CKE *informator*,
  and look at two or three recent practical arkusze to see what is really asked.

**This is the single most important thing to confirm before Module 4 is finalised**,
because it is the one place where "the right modern choice" and "what the exam
rewards" can genuinely diverge — and if they do, that is a decision for Viktar and
the school, not for a course structure document.

## 4. Tooling for a classroom

### 4.1 IDEs and licences

| Tool | Linux | Cost for a school | Note |
| --- | --- | --- | --- |
| **JetBrains Rider** | ✅ | **Free for non-commercial use**; free educational licences for students and teachers | The strongest Avalonia experience; JetBrains ships an Avalonia plugin and dedicated docs |
| **VS Code + C# Dev Kit** | ✅ | C# Dev Kit is licensed like Visual Studio Community — free for classroom/academic use, **not fully free for commercial use** | Read the licence before standardising on it |
| **Visual Studio 2026 Community** | ❌ Windows only | Free for education | Only relevant if the lab is Windows |
| **Google Antigravity** | ✅ | Free tier | AI-first; see §4.2 |
| **Cursor** | ✅ | Free tier is thin | See §4.2 |

### 4.2 The AI tooling question — and the honest reading of the free tiers

The daily note already contains the right analysis, and the research supports it:

> *"Do not make Cursor Hobby the class standard if SDD + MCP is the method. On
> Hobby, Agent dies fast and MCP is the wrong dependency."*

Public 2026 figures, all of which move constantly:

| Tool | Free tier as reported | Fit for a class of ~30 |
| --- | --- | --- |
| **Google Antigravity** | Public preview, high usage limits; Gemini 3 Pro + Claude Sonnet; agent + planning artifacts | **Best free fit today.** Also the biggest risk: preview terms change without notice |
| **GitHub Copilot** | ~2,000 completions + 50 chats/month free; **free Pro via GitHub Education verification** | The most *institutionally stable* option — and student verification is a real, repeatable process |
| **Cursor** | ~2,000 completions/month, limited agent | Fine as a second window, weak as the class standard |
| **Cline / Roo / Kilo** | Open source, unlimited — but you supply an API key **or run local models via Ollama** | The only option with **zero per-student cost and no account**, if a local model is acceptable |
| **CLI agents** (Claude Code, Codex CLI, Gemini CLI, Qwen Code…) | Vary | Terminal-native; good for the SDD loop; needs comfort with a shell |

**Three recommendations:**

1. **Standardise on one tool, name a second.** Two IDEs open is normal professional
   practice (and the corpus recommends it), but a class needs one answer to
   "which button do I press."
2. **GitHub Copilot via GitHub Education is the most defensible institutional
   choice**, because it survives a vendor changing its preview terms in November.
   Antigravity is the better *capability* today; Copilot is the better *dependency*.
3. **Have a no-account fallback ready.** Cline + a local model via Ollama needs no
   sign-up at all. Which matters because of §4.3.

### 4.3 The accounts problem — flag early, decide with the school

Most frontier AI tools require an account, and many require the user to be 18+.
Fourth-year technikum students are typically 18–19, but **not all of them will be**,
and this is a real blocker rather than a formality.

**TO CONFIRM with the school**, before any lesson tells a student to sign up:
whether students may create third-party accounts for classwork, whether parental
consent is needed for those under 18, and whether school e-mail addresses may be
used. Article IV means the answer never gets written into this repo — but the
*course* has to have one.

## 5. Getting a finished app into someone's hands

The note sets the bar: *"It should be the App that will be used by at least one
person (student himself)."* Distribution is therefore part of the course, not an
afterthought — and Android distribution changed in 2026.

### 5.1 Android

| Route | Cost | Limit | Note |
| --- | --- | --- | --- |
| **Direct APK** (signed, sideloaded) | Free | You handle updates yourself | Still works — **but see the verification change below** |
| **Google Play, full account** | **$25 one-time** | Unlimited apps/installs; requires a D-U-N-S number | The "real" route |
| **Google Play, limited account** | **Free** | **Capped at 20 devices**; no government ID | Fits a classroom almost exactly |
| **Firebase App Distribution** | Free | 500 named testers per project | Best fit for "my class tests my app" |
| Alternative stores (Samsung Galaxy Store etc.) | Varies | — | Not worth class time |

**The 2026 change students must know about:** Google is rolling out **mandatory
developer verification**. Verification opened to all developers **2026-03-30**; from
**2026-09-30**, apps from participating stores must be registered by a verified
developer to install on certified devices in **Brazil, Indonesia, Singapore and
Thailand**, with global rollout expected **from 2027**. Unregistered apps remain
installable via ADB or an advanced flow with a one-time risk acknowledgement.
F-Droid published an open letter opposing this (2026-02-24).

**Why this belongs in the course:** it is the cleanest available example of a
platform decision reshaping what a developer is allowed to do — concrete, current,
and it lands on the students' own project. Also, practically: **Firebase App
Distribution (500 testers, free) is the recommended route** for a class, with the
$25 Play account presented as what a real release costs.

### 5.2 Desktop

Far simpler, and worth the contrast: a self-contained build, a **GitHub Release**
with the artifact attached, a README. No store, no fee, no verification. Students
should feel that difference.

### 5.3 The web piece

The note asks: *"in Vercel. What tech stack to build the web app to choose?"*

For **ttcmd itself** this is already settled — Next.js App Router on Vercel
(Article VIII), and it is not open for re-litigation.

For **student projects**, if a web surface is wanted, there are two honest answers,
and they should not be blended: **Uno Platform / WASM** keeps everything in C# and
one codebase (§2.2), while a separate small web front end means a second language
and a second thing to learn. **Recommendation: keep student projects to
desktop + Android in v1.0.** A web target is a Semester 2 stretch for the students
who finish early, not a baseline.

## 6. The install list for the lab — draft, pending §1

**Do not treat this as final.** It assumes Ubuntu + Avalonia + Android, which is a
hypothesis until question 1 is answered.

```
# Runtime and build
.NET SDK 10 (LTS baseline)
Android workload:      dotnet workload install android
Avalonia templates:    dotnet new install Avalonia.Templates
Java JDK 17            (required by the Android toolchain)
Android SDK + platform-tools (adb) + one emulator image

# Editing
JetBrains Rider        (free non-commercial / educational licence)
  + Avalonia plugin
VS Code + C# Dev Kit   (second window; check the licence)

# Version control
git, GitHub CLI (gh)

# AI layer  -- ONE of these is the class standard, decided in Module 4
GitHub Copilot (via GitHub Education)     <- most stable institutional choice
Google Antigravity                        <- strongest free capability today
Cline + Ollama + a local model            <- no-account fallback

# SDD layer
Spec Kit:   uv tool install specify-cli
  or Spec Workflow MCP, if the chosen tool has no native SDD
```

**Verify on one machine before the first class**, in this order, because each step
can fail independently: `dotnet --version` → create and run an Avalonia desktop app
→ `adb devices` sees the emulator or a phone → an Android build deploys → the
chosen AI tool authenticates on the school network.

## 7. Open questions this document cannot close

1. **Lab OS and admin rights** (§1) — blocks the framework choice.
2. **Real INF.04 requirements** (§3) — blocks the "is Avalonia acceptable" answer.
3. **Accounts and age** (§4.3) — blocks any lesson that says "sign up."
4. **Network filtering** (§1, Q5) — blocks the entire AI layer if the answer is bad.
5. **Phones or emulator** (§1, Q3) — changes how Module 7 is taught.
6. **Whether the school is named on the site** — already open in `README.md`.

Nothing in `course-structure-v1.md` should harden until 1–3 are answered. The
structure is deliberately written so those answers change *content*, not *shape*.

---

## Sources

- [MAUI vs Avalonia vs Uno Platform: which should you pick in 2026? — Start Debugging](https://startdebugging.net/2026/05/maui-vs-avalonia-vs-uno-in-2026/)
- [Supported platforms — Avalonia Docs](https://docs.avaloniaui.net/docs/supported-platforms) · [Avalonia for Mobile](https://avaloniaui.net/avalonia/mobile) · [Developing with Avalonia for Android](https://docs.avaloniaui.net/docs/platform-specific-guides/android/)
- [What's new in .NET 11 — Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-11/overview)
- [.NET 11: The STS Release With C# 15 Union Types and Runtime-Async — Daily DevOps & .NET](https://daily-devops.net/posts/dotnet-11-roadmap/)
- [The official .NET MAUI support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/maui) · [dotnet/maui roadmap](https://github.com/dotnet/maui/wiki/roadmap)
- [INF.04 Projektowanie, programowanie i testowanie aplikacji — zawodowe.edu.pl](https://zawodowe.edu.pl/kwalifikacje-w-zawodzie/inf-04/) *(secondary source — verify against CKE)*
- [Arkusze egzaminacyjne INF.04 — arkusze.pl](https://arkusze.pl/egzamin-zawodowy-kwalifikacja-inf-04/) · [egzamin-programista.pl — arkusze praktyczne INF.04](https://egzamin-programista.pl/arkusze-praktyczne-inf04-projektowanie-programowanie-testowanie-aplikacji/)
- [Get started with Avalonia in Rider — JetBrains](https://www.jetbrains.com/help/rider/Avalonia.html) · [Free educational licences — JetBrains](https://sales.jetbrains.com/hc/en-gb/articles/207241195-Do-you-offer-free-educational-licenses-for-students-and-teachers)
- [C# Dev Kit FAQ — VS Code](https://code.visualstudio.com/docs/csharp/cs-dev-kit-faq) · [C# Dev Kit licence](https://marketplace.visualstudio.com/items/ms-dotnettools.csdevkit/license)
- [Best Free AI Coding Tools for Students 2026](https://aitoolranked.com/blog/free-ai-coding-tools-students-2026)
- [Distribute Android Apps Without Google Play: 4 Methods in 2026 — Fora Soft](https://www.forasoft.com/blog/article/distribute-android-app-without-google-play)
- Local notes: `D:\EXOCORTEX\10_log\daily\2026-08-25.md`, `#idea` section (Antigravity vs Cursor free-plan table)
