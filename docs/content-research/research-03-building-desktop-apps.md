# Research 03 — Building desktop apps in 2026: the state of the field

| | |
| --- | --- |
| Written | 2026-08-29 |
| For | Course structure v1.0 — *Aplikacje desktopowe i mobilne* |
| Status | **Research notes.** Repo-facing English (Article III). |
| Feeds | `course-structure-v1.md` — Moduł 1 (how software is built), Moduł 4 (stack decision), Moduł 5 (first desktop app), and the Semester-2 release lesson |
| Relation to 02 | `research-02` answered *"which .NET stack runs on the lab machines."* This answers the wider question: **what does building a desktop application look like in 2026, at every scale.** .NET appears here as one branch among several, not as the subject. |

> **Article V applies throughout.** Nothing here decides anything about the school,
> the lab, the timetable or the exam. Those are marked **TO CONFIRM**.
>
> **Article II applies too.** This is written for Viktar, not for students. Some of
> it is deliberately more pessimistic than anything that should reach a 4th-year.

> **Not yet double-checked.** Every claim here was read from a primary source once,
> by the pass that wrote it. The independent re-check did not complete — see
> [Verification status](#verification-status--read-before-quoting-this-anywhere)
> before any of this reaches `content/`.

**Link conventions.** Every load-bearing claim carries an inline link to its source.
Each section ends with a **↗ Dig deeper** block: three to six links that are worth
reading in full if the topic turns into a lesson. §12 collects the best of them into
an annotated reading list. Where the evidence is weak, the text says so rather than
linking to something that merely sounds authoritative — a large share of what a
search engine returns for "Tauri vs Electron 2026" is machine-generated and carries
confident numbers with no method behind them. Those sites are named and excluded in §11.

---

## 1. What changed since 2024 — the short version

Nine things. A developer who last shipped a desktop app in 2024 would get each of
these wrong.

1. **An EV certificate no longer buys you past SmartScreen on Windows.** Microsoft
   now says so in its own documentation: *"Paying a premium for EV solely to avoid
   SmartScreen warnings is no longer justified"* — reputation is hash-based and
   accumulates over weeks —
   [SmartScreen reputation for Windows app developers](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation).
2. **Publishing to the Microsoft Store became free.** Individual registration fees
   were dropped on [2025-09-10](https://blogs.windows.com/windowsdeveloper/2025/09/10/free-developer-registration-for-individual-developers-on-microsoft-store/),
   company registration on [2026-05-07](https://blogs.windows.com/windowsdeveloper/2026/05/07/publish-to-microsoft-store-as-a-company-now-with-free-registration-and-faster-onboarding/).
   The Store is now the only zero-cost, zero-warning path onto Windows.
3. **macOS 15 removed the Control-click → Open Gatekeeper bypass.** The decade-old
   escape hatch is gone; users must go to System Settings → Privacy & Security →
   Open Anyway — [Apple](https://support.apple.com/en-us/102445),
   [Michael Tsai's roundup](https://mjtsai.com/blog/2024/07/05/sequoia-removes-gatekeeper-contextual-menu-override/).
4. **macOS 26 changed how every app looks, and the opt-out has an expiry date.**
   Rebuilding against the current SDK opts you into Liquid Glass automatically; the
   `UIDesignRequiresCompatibility` key that restores the old look is
   [ignored from macOS 27 onward](https://developer.apple.com/documentation/BundleResources/Information-Property-List/UIDesignRequiresCompatibility).
5. **The GNOME X11 session is gone** on the two flagship distributions —
   [Ubuntu 25.10](https://documentation.ubuntu.com/release-notes/25.10/) and
   [Fedora 43](https://fedoraproject.org/wiki/Changes/WaylandOnlyGNOME). XWayland
   still runs X11 *apps*; the *session* is what disappeared. Electron followed:
   [Wayland is its Linux default from 38.2](https://www.electronjs.org/blog/tech-talk-wayland).
6. **Google handed Flutter Desktop to Canonical.** Google's own release post:
   *"Canonical will lead the Flutter Desktop roadmap and oversee the maintenance of
   our Linux, Windows, and macOS embedders"* —
   [What's new in Flutter 3.44](https://flutter.dev/blog/whats-new-in-flutter-3-44), 2026-05-20.
7. **Windows 10 reached end of support on 2025-10-14** and roughly three in ten
   Windows desktops still run it —
   [Microsoft](https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/windows-10-support-has-ended-on-october-14-2025),
   [StatCounter, July 2026](https://gs.statcounter.com/os-version-market-share/windows/desktop/worldwide).
8. **On-device AI became a normal platform API.** Windows ML
   [went GA on 2025-09-23](https://blogs.windows.com/windowsdeveloper/2025/09/23/windows-ml-is-generally-available-empowering-developers-to-scale-local-ai-across-windows-devices/);
   Apple's Foundation Models framework shipped with macOS 26 and gives any app a
   local ~3B model [free of charge](https://www.apple.com/newsroom/2025/09/apples-foundation-models-framework-unlocks-new-intelligent-app-experiences/).
9. **The desktop client became a plug-in platform for agents.** Windows now ships an
   OS-level MCP server registry and an isolated "Agent Workspace" —
   [Microsoft Learn](https://learn.microsoft.com/en-us/windows/ai/mcp/overview) — and
   MCP itself was donated to the Linux Foundation's
   [Agentic AI Foundation](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/)
   in December 2025.

The one thing that did **not** change: there is still no single right answer, and
the loudest online arguments are about the least important variable.

---

## 2. The map — four ways to put pixels on a desktop screen

Almost every desktop toolkit alive in 2026 belongs to one of four families. The
family determines more than the specific product does: it decides what the app
weighs, what it looks like, who can be hired to work on it, and how it is tested.

| Family | How the UI is drawn | You get | You pay |
| --- | --- | --- | --- |
| **A. Web-tech shell** | HTML/CSS in a browser engine | The largest talent pool, fastest UI iteration, accessibility nearly free via ARIA, real testability | A browser engine's memory floor, GC pauses, and a look that is nobody's platform |
| **B. One renderer, every platform** | The toolkit draws every pixel itself (Skia, Impeller, its own) | Pixel-identical output everywhere, one codebase, compiled languages | Accessibility and platform conventions have to be re-implemented by the toolkit; you inherit its bugs |
| **C. Native per platform** | The OS's own controls | Correct behaviour, correct look, accessibility for free, smallest binaries | N codebases, or one core with N shells |
| **D. Your own renderer** | Custom shaders on the GPU | Frame-time control nothing else gives | ~8% of your codebase, plus three hand-built accessibility bridges |

### 2.1 Family A — the web-tech shell

Two sub-families, and the difference between them is the whole argument.

**Bundled engine.** [Electron](https://www.electronjs.org/) ships its own Chromium.
Current stable **44.0.0, released 2026-08-25**, carrying Chromium 152 and Node 24 —
[release page](https://releases.electronjs.org/release/v44.0.0). A major every eight
weeks tracking Chromium, with only the
[latest three majors supported](https://www.electronjs.org/docs/latest/tutorial/electron-timelines).
That cadence is the hidden tax: an Electron app is on a permanent upgrade treadmill
or it is shipping an unpatched browser. [NW.js](https://nwjs.io/blog/v0.112.0/) is
the same idea and is not dead (v0.112.0, 2026-05-24); [CEF](https://developer.valvesoftware.com/wiki/Chromium_Embedded_Framework)
is the C++ equivalent, used by Steam and Spotify.

**System engine.** [Tauri](https://tauri.app/) uses whatever webview the OS already
has — WebView2 on Windows, WKWebView on macOS, WebKitGTK on Linux. Current stable
**2.11.5 (2026-07-01)**; there is no Tauri 3 and none announced. The saving is real
and so is the cost: **three different engines with independent release trains**, two
of which are different WebKits. Tauri's own answer is
[Verso](https://v2.tauri.app/blog/tauri-verso-integration/), a bundled Servo-based
runtime — still experimental, and the `verso` crate is **GPL-3.0-only**, which is not
licence-equivalent to using the system's engine. [Slint is doing the same thing
independently](https://slint.dev/blog), which makes "bundle a Rust engine instead of
fighting three webviews" a trend rather than one team's experiment. Servo itself
[made its first crates.io release and cut an LTS in April 2026](https://servo.org/blog/)
under Linux Foundation Europe.

Others in the family: [Wails](https://wails.io/) (Go; v3 in beta, and the first to
default to **GTK4 + WebKitGTK 6.0** on Linux — [v3 beta post](https://v3.wails.io/blog/wails-v3-beta/)),
[Neutralino](https://neutralino.js.org/) (v6.9.0, small),
[`deno desktop`](https://deno.com/blog/v2.9) — genuinely new, shipped 2026-06-25,
experimental, with a choice of system webview or bundled CEF — and
[pywebview](https://pypi.org/project/pywebview/) for Python.
[Photino](https://www.nuget.org/packages/Photino.NET) has had no release in nineteen
months and should be treated as dormant regardless of what its marketing site says.

### 2.2 Family B — one renderer, every platform

| Toolkit | Stable | Renderer | Language | Note |
| --- | --- | --- | --- | --- |
| [Flutter](https://flutter.dev/blog/whats-new-in-flutter-3-47) | 3.47 (2026-08-12) | **Impeller**, now the default across the desktop targets | Dart | Multi-window still [not production-ready](https://flutter.dev/blog/whats-new-in-flutter-3-44); Intel Mac being phased out |
| [Qt 6](https://www.qt.io/blog/qt-6.11-released) | 6.11.2 (2026-08-18) | RHI (D3D/Metal/Vulkan/GL) for Quick; native-ish for Widgets | C++ / QML | Next LTS **6.12, targeted September 2026** ([wiki](https://wiki.qt.io/Qt_6.12_Release)) |
| [Avalonia](https://avaloniaui.net/blog/avalonia-12) | 12.1.1 (2026-07-29) | SkiaSharp today, [Impeller in progress](https://avaloniaui.net/blog/avalonia-partners-with-google-s-flutter-t-eam-to-bring-impeller-rendering-to-net) | C# / XAML | MIT; first .NET framework with [native Linux accessibility (AT-SPI2)](https://avaloniaui.net/blog/avalonia-12) |
| [Uno Platform](https://platform.uno/blog/uno-platform-6-6/) | 6.7.x (2026-08-27) | Skia everywhere (+ Vulkan opt-in) | C# / WinUI XAML | Native AOT across five platforms; the only production WebAssembly answer |
| [Compose Multiplatform](https://kotlinlang.org/docs/multiplatform/whats-new-compose-110.html) | 1.10.3 (2026-03-19) | Skia via Skiko | Kotlin | Desktop marked **Stable**; hot reload on by default |
| [Slint](https://slint.dev/blog/slint-1.17-released) | 1.17.1 (2026-07) | Own (software + GPU) | `.slint` DSL + Rust/C++/JS/Python | [Deprecated its native-looking styles in March 2026](https://slint.dev/blog) — it now commits to its own look |
| [React Native for Desktop](https://microsoft.github.io/react-native-windows/docs/getting-started) | RNW 0.84 / RN-macOS 0.81 | Native controls (Fabric) | JS/TS | Legacy Paper architecture **fully removed** in RNW 0.82 — a hard migration cliff |

The cross-cutting fact: **Impeller is becoming an industry renderer, not a Flutter
internal.** It is now the default on Flutter's desktop targets and is being ported to .NET for
Avalonia in collaboration with Google's own Flutter team. Skia is being displaced
from above.

### 2.3 Family C — native per platform

- **Windows.** [Windows App SDK 2.4.0](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/release-channels)
  (2026-08-13) carries WinUI 3. **WPF is not in maintenance** — a common 2024-era
  belief that is now wrong. The Fluent theme arrived in .NET 9; .NET 10 *extended* it
  to DatePicker, GridSplitter, GridView, GroupBox, Hyperlink, Label, NavigationWindow,
  RichTextBox and TextBox, and added a `Grid ColumnDefinitions="1*, 2*, Auto"`
  shorthand plus a pile of perf work. Microsoft calls Fluent support *still in
  progress* —
  [What's new in WPF for .NET 10](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/whats-new/net100).
  **WinForms promoted dark mode and async forms out of preview in .NET 10** —
  `Application.SetColorMode` is no longer experimental —
  [What's new in WinForms](https://learn.microsoft.com/en-us/dotnet/desktop/winforms/whats-new/net100) —
  which materially changes its viability for new internal tooling.
- **macOS.** SwiftUI + AppKit, now under [Liquid Glass](https://developer.apple.com/documentation/TechnologyOverviews/adopting-liquid-glass).
- **Linux.** [GTK 4.22 + libadwaita 1.9](https://release.gnome.org/50/developers/index.html)
  in GNOME 50; Qt on KDE. No GTK 5 is announced.
- **Cross-platform-but-native-controls:** [wxWidgets](https://www.wxwidgets.org/)
  (3.2.11 stable — note that **dark mode is only in the 3.3 development branch**) and
  [BeeWare's Toga](https://toga.beeware.org/en/stable/), which wraps WinForms, Cocoa
  and GTK/Qt from Python and is still pre-1.0.

### 2.4 Family D — build your own renderer

Rare, expensive, and increasingly visible because the projects that do it are loud.
[Zed's GPUI](https://zed.dev/blog/videogame), [Sublime Text's OpenGL renderer](https://www.sublimetext.com/blog/articles/hardware-accelerated-rendering),
[Warp's Rust UI layer](https://www.warp.dev/blog/how-warp-works) (client
[open-sourced 2026-04-29](https://github.com/warpdotdev/warp)), Blender's
[in-house immediate-mode GUI on its own GPU abstraction](https://developer.blender.org/docs/features/gpu/),
and Figma's WebGL→[WebGPU](https://www.figma.com/blog/figma-rendering-powered-by-webgpu/) canvas.
§5.6 has the rule for when this is justified. It is not "when the app gets big."

The wider Rust GUI field, measured from crates.io on 2026-08-29:
[egui](https://crates.io/crates/egui) 0.36.1 is by far the most used (22.4M
downloads); [iced](https://crates.io/crates/iced) 0.14.0 has had no release in nine
months; [Dioxus](https://dioxuslabs.com/blog) 0.7 added hot-patching and a native
renderer; [Druid is discontinued](https://linebender.org/druid/) with
[Xilem](https://crates.io/crates/xilem) named as its successor; `floem`, `cushy` and
`cacao` are stalled. [GPUI](https://www.gpui.rs/) is published (0.2.2) but remains in
practice Zed's internal framework with an open door.

### 2.5 The branch a vocational course cannot ignore

Because INF.04's public description names WPF and Qt, and because Pascal is still
taught in Polish technical schools:

- **[Lazarus 4.8](https://www.lazarus-ide.org/)** (2026-06-11) with FPC 3.2.2, shipping
  binaries for Windows, Linux DEB/RPM, **Raspberry Pi ARM64**, and macOS on both
  Apple Silicon and Intel. Its LCL wraps native widgetsets, so it looks native.
  Actively released — not a legacy artefact.
- **[RAD Studio 13 Florence](https://blogs.embarcadero.com/)**; Delphi 13 Community
  Edition became available in August 2026, i.e. the free tier is current with the paid
  product. 13.2 previews *"a new generation of Delphi development for Linux Intel
  64-bit."* **TO CONFIRM:** the Community Edition revenue threshold.
- **Python.** [PySide6 6.11.2](https://pypi.org/project/PySide6/) is **LGPL**;
  [PyQt6](https://www.riverbankcomputing.com/software/pyqt/) is GPL-3.0-or-commercial
  and Riverbank states plainly *"PyQt is not available under the LGPL."* **PyQt5 and
  PyQt4 are no longer supported.** Any course still teaching PyQt5 is teaching an
  unsupported library. [Kivy](https://pypi.org/project/Kivy/) has had no release since
  December 2024 despite marketing copy claiming active backing.
  Packaging splits cleanly: [PyInstaller](https://pypi.org/project/pyinstaller/) for
  "one file, works now", [Briefcase](https://pypi.org/project/briefcase/) for
  signed native installers, [Nuitka](https://pypi.org/project/Nuitka/) — **AGPL-3.0** —
  when startup time matters.
- **JVM.** [JavaFX 26](https://gluonhq.com/news/javafx-26-is-now-available/)
  (2026-03-17) replaced OpenGL with **Metal on macOS** and added a headless platform
  for CI. Swing is still what everything else has to interoperate with; JetBrains'
  own IDEs remain Swing, adopting Compose incrementally via
  [Jewel](https://jewel-ui.dev/).

**↗ Dig deeper**
[Electron release timelines](https://www.electronjs.org/docs/latest/tutorial/electron-timelines) ·
[Tauri architecture](https://tauri.app/concept/architecture/) ·
[Flutter & Dart 2026 roadmap](https://flutter.dev/blog/flutter-darts-2026-roadmap) ·
[Qt release cycle & LTS policy](https://www.qt.io/development/qt-framework/release-cycle) ·
[Are we GUI yet? (Rust ecosystem tracker)](https://areweguiyet.com/) ·
[Linebender 2026 Q1 status](https://linebender.org/blog/tmil-25/)

---

## 3. What shipping software actually uses

Assumptions in this area rot fast. Several of the entries below changed in the last
eighteen months, and two are commonly reported wrongly.

| App | UI technology | Verified from |
| --- | --- | --- |
| VS Code | **Electron 42**, TypeScript, no React | [`.npmrc`](https://raw.githubusercontent.com/microsoft/vscode/main/.npmrc) |
| Zed | **Rust + GPUI**, own GPU renderer | [`crates/gpui`](https://github.com/zed-industries/zed) |
| Sublime Text | **Custom C++ UI on OpenGL 4.1** (~9k LoC) | [vendor blog](https://www.sublimetext.com/blog/articles/hardware-accelerated-rendering) |
| JetBrains IDEs | **JVM + Swing**, Compose adopted panel-by-panel via Jewel | [jewel-ui.dev](https://jewel-ui.dev/) |
| Ghostty | **Zig core; Swift/AppKit on macOS, GTK4 on Linux** | [ghostty.org/docs/about](https://ghostty.org/docs/about) |
| Warp | **Rust + own GPU UI framework** | [repo](https://github.com/warpdotdev/warp) |
| Slack, Discord, Signal, Obsidian, Notion, Postman, Docker Desktop | **Electron** | [Signal `package.json`](https://raw.githubusercontent.com/signalapp/Signal-Desktop/main/package.json), [electron/apps registry](https://github.com/electron/apps) |
| **Bitwarden** | **Electron 43 + Angular 21** with Rust N-API modules — **not Tauri**, despite persistent belief | [`package.json`](https://raw.githubusercontent.com/bitwarden/clients/main/package.json), read 2026-08-29 |
| 1Password 8 | **Rust core + web front end in Electron**, on macOS too | [1Password blog](https://1password.com/blog/1password-8-the-story-so-far) |
| Teams 2.x (Windows) | **Native C++/WinUI shell hosting WebView2**, React + Fluent | [Microsoft Learn](https://learn.microsoft.com/en-us/microsoftteams/teams-client-system-requirements) |
| New Outlook for Windows | **WebView2 web app** | [overview](https://en.wikipedia.org/wiki/Outlook_for_Windows) |
| WhatsApp for Windows | **WebView2 wrapper since ~Nov 2025** — it went native, then back | [Daring Fireball](https://daringfireball.net/2025/11/meta_whatsapp_windows_shitty_web_app) |
| Spotify | **C++ container + CEF**, React/TS UI shared with the web player | [Spotify Engineering](https://engineering.atspotify.com/2021/04/building-the-future-of-our-desktop-apps) |
| Steam | **CEF** — the entire UI was moved to web tech in June 2023 | [Valve wiki](https://developer.valvesoftware.com/wiki/Chromium_Embedded_Framework) |
| Figma desktop | **Electron**, canvas is C++→WebAssembly on **WebGPU** | [Figma blog](https://www.figma.com/blog/figma-rendering-powered-by-webgpu/) |
| OBS, qBittorrent, Krita, DaVinci Resolve, Telegram Desktop | **Qt** (Telegram via a bespoke layer on Qt) | [OBS `CMakeLists.txt`](https://github.com/obsproject/obs-studio) |
| GIMP 3 | **GTK3** | [GIMP 3.0 release notes](https://www.gimp.org/release-notes/gimp-3.0.html) |
| Inkscape | GTK3 stable; **GTK4 in the 1.5 development branch** | [Inkscape wiki](https://wiki.inkscape.org/wiki/Release_notes/1.5) |
| **Audacity** | **Migrating off wxWidgets to Qt6/QML** (Muse Framework); 4.0 in beta | [`CMakeLists.txt`](https://github.com/audacity/audacity), [OMG Ubuntu](https://www.omgubuntu.co.uk/2026/06/audacity-4-0-beta) |
| Blender | **Own immediate-mode GUI** on its own GPU abstraction | [Blender dev docs](https://developer.blender.org/docs/features/gpu/) |
| calibre | **Python + Qt 6.10** | [`bypy/sources.json`](https://github.com/kovidgoyal/calibre) |
| Ollama desktop | **Go + the OS webview + React** — not Electron | [`app/webview/webview.go`](https://github.com/ollama/ollama) |
| ChatGPT for Mac | **Fully native**, not Electron, not Catalyst | [OpenAI engineer](https://x.com/Javi/status/1790074965112328538) |
| ChatGPT for Windows, Claude Desktop | **Electron** | [binary inspection](https://www.windowslatest.com/2024/10/18/i-tried-the-official-chatgpt-app-for-windows-11-its-just-an-electron-based-chrome-wrapper/) |

### 3.1 Migrations, both directions

The popular story is a one-way exodus from Electron. The 2025–26 record does not
support it.

**Toward web technology.** WhatsApp for Windows went *native → WebView2* in November
2025, and measured ~1 GB resident afterwards. Steam moved its whole client UI to CEF.
New Outlook is a WebView2 app. 1Password moved *away* from a native Mac app to
Rust + Electron in 2021 and stayed. Teams moved Electron → WebView2 + React and
[claims](https://www.microsoft.com/en-us/microsoft-365/blog/2023/03/27/welcome-to-the-new-era-of-microsoft-teams/)
2× faster launch and 50% less memory — but the measurement is a
[commissioned GigaOm report behind a paywall](https://portal.gigaom.com/report/new-microsoft-teams-performance-benchmark),
so it is a vendor claim, not an independent result.

**Away from it.** The best-documented case is
[Fluxzy Desktop](https://www.fluxzy.io/resources/blogs/electron-to-tauri-migration-fluxzy-desktop):
Electron → Tauri v2, Windows installer **190 MB → 55 MB**, memory and startup
"noticeably" better — alongside an honest list of costs: WebKitGTK hardware
acceleration failing on Wayland, a dialog plugin missing Yes/No/Cancel, and
**incompatible auto-updaters requiring a bridge release**.
[Circleback](https://circleback.ai/blog/how-we-rebuilt-our-electron-recording-engine-in-swift)
rewrote only its recording engine in Swift, because *"a capture engine can't tolerate
GC pauses"* — the app stayed hybrid. Adobe removed embedded Chromium from its plugin
layer, [CEP → UXP](https://developer.adobe.com/photoshop/uxp).

**And a negative result worth as much as either.**
[DoltHub evaluated Tauri and declined](https://www.dolthub.com/blog/2025-11-13-electron-vs-tauri/):
no `.appx`/`.msix` bundling on Windows would have cost them their Store listing, and
macOS universal binaries were a problem. They stayed on Electron.

**The honest summary:** the genuinely new native tier — Zed, Warp, Ghostty — is
*greenfield*, not migration. Nobody with a large shipping Electron app has rewritten
it natively and published the result.

**↗ Dig deeper**
[Slack: rebuilding Slack on the desktop](https://slack.engineering/rebuilding-slack-on-the-desktop-308d6fe94ae4) ·
[Spotify: building the future of our desktop apps](https://engineering.atspotify.com/2021/04/building-the-future-of-our-desktop-apps) ·
[Fluxzy: Electron → Tauri, five months later](https://www.fluxzy.io/resources/blogs/electron-to-tauri-migration-fluxzy-desktop) ·
[DoltHub: why we did *not* migrate](https://www.dolthub.com/blog/2025-11-13-electron-vs-tauri/) ·
[Ghostty's GTK rewrite](https://mitchellh.com/writing/ghostty-gtk-rewrite)

---

## 4. The numbers — and why most published numbers are wrong

This section exists because the single most useful thing a student can learn from
this topic is **how to tell a measurement from a marketing claim.** It is worth a
lesson on its own.

### 4.1 The benchmark everyone cites has two fatal problems

Tauri publishes [continuous benchmarks](https://tauri-apps.github.io/benchmark_results/)
— hyperfine, 3 warm-ups, 10 runs, on CI. Pulled 2026-08-29, the hello-world figures
are: **Tauri 2.95 MB binary vs Electron 166.5 MB**, memory **441 MB vs 476 MB**,
startup **0.741 s vs 0.475 s**.

Three things about that:

1. **The Electron data is from 2023-09-24.** Tauri's series is all August 2026. The
   chart plots current Tauri against three-year-old Electron.
2. **The memory metric is disputed by Tauri's own issue tracker.**
   [tauri-apps/tauri#5889](https://github.com/tauri-apps/tauri/issues/5889) reports
   that on a *real* web app the ordering **inverts** — Tauri 581 MB, Electron 240 MB,
   Chrome 370 MB — because WebKitGTK is heavier than Chromium on real content.
3. **Tauri's own hello world is 56% slower to first paint than Electron's**, which is
   in the same dataset and never quoted.

Also: Electron is benchmarked only on Linux, so **there is no Tauri-vs-Electron data
for Windows or macOS in Tauri's own benchmark at all.**

### 4.2 A measurement that is actually uniform

[Flathub](https://flathub.org/statistics) publishes installed sizes for real
production builds through one packaging system on one host. That is the most
consistent cross-stack size measurement publicly available. Selected values, fetched
2026-08-29 (installed size, excluding the shared runtime):

| App | Stack | Installed |
| --- | --- | ---: |
| GNOME Text Editor | GTK4, **shared** runtime | **2.3 MB** |
| qBittorrent | C++/Qt6 | 19.7 MB |
| Slack | Electron | 255.0 MB |
| VS Code | Electron 42 | 270.8 MB |
| Inkscape | GTK3 | 309.5 MB |
| **Zed** | **Rust/GPUI, no browser engine** | **392.4 MB** |
| Discord | Electron | 594.6 MB |
| Krita | Qt (bundled) | 634.3 MB |
| calibre | Python + Qt6 | 656.2 MB |
| Obsidian | Electron | 661.9 MB |
| Blender | own GPU GUI | 1,139.5 MB |
| IntelliJ IDEA CE | JVM/Swing | 2,730.3 MB |

**Read that table carefully, because it does not say what the marketing says.** Zed —
Rust, no browser engine — installs larger than Slack, VS Code, Inkscape, GIMP and
Telegram. Krita and calibre, both Qt, beat every Electron app on the list except
Obsidian. **Toolkit choice is not the dominant term in application size.** The only
place it shows up cleanly is when the toolkit is *shared*: GNOME Text Editor gets GTK
free from the runtime and lands at 2.3 MB.

### 4.3 The one clean illustration of the actual difference

ChatGPT for Windows (Electron, bundled Chromium) is **~260 MB**; Microsoft's Copilot
app (WebView2 shell over the same category of content) is **under 600 KB** —
[hands-on binary inspection](https://www.windowslatest.com/2024/10/18/i-tried-the-official-chatgpt-app-for-windows-11-its-just-an-electron-based-chrome-wrapper/).
That is roughly 430× on disk, and it is the honest version of the "bundled vs system
engine" argument: it is about *the engine*, not about the app.

### 4.4 What does not exist

- **No rigorous public cross-stack idle-RAM benchmark.** Every framework-comparison
  table with such numbers traces back to sites with no stated hardware, no N and no
  reproducible artefact.
- **No rigorous public cold-start benchmark** for desktop UI stacks. VS Code
  instruments ~50 startup marks and publishes no aggregate figures
  ([issue #112479](https://github.com/microsoft/vscode/issues/112479)).
- **One peer-reviewed study exists** and its result is counterintuitive: Electron apps
  showed higher CPU but their **browser counterparts consumed more energy and memory**
  under various configurations — [Thangadurai et al., QUATIC 2024](https://link.springer.com/chapter/10.1007/978-3-031-70245-7_13).
  Paywalled; only the direction is quotable.
- **The industry stopped measuring framework share.** The Stack Overflow survey's
  "other frameworks" question exists in [2024](https://survey.stackoverflow.co/2024/technology)
  (Flutter 9.4%, Qt 7.3%, Electron 6.5%, MAUI 3.1%, GTK 2.6%, Tauri 2.4%) and was
  **dropped in 2025**. The most recent industry-wide desktop framework data is two
  years old.

One independent benchmark worth citing precisely because it cuts against the
narrative: [moktavizen/terminal-benchmark](https://github.com/moktavizen/terminal-benchmark)
measured, on one machine at default settings, `foot` (plain C) at **43 MB / 15 ms**
input latency against **Ghostty (Zig + native GTK4) at 174 MB / 38 ms**. All of them
are native. Ghostty's own maintainer
[disowns synthetic terminal benchmarks](https://github.com/ghostty-org/ghostty/discussions/4837)
as *"fairly poor measures of real world behaviors"* — which is itself the lesson.

**↗ Dig deeper**
[Tauri's benchmark methodology](https://github.com/tauri-apps/benchmark_results) ·
[The issue disputing its memory metric](https://github.com/tauri-apps/tauri/issues/5889) ·
[Flathub statistics](https://flathub.org/statistics) ·
[Sublime Text's frame-time figures, with method](https://www.sublimetext.com/blog/articles/hardware-accelerated-rendering) ·
[Stack Overflow 2024 framework data](https://survey.stackoverflow.co/2024/technology)

---

## 5. Size changes the answer

This is the part that most framework comparisons omit, and it is the part that
matters most for teaching. A 300-line utility and a 2-million-line application share
a word and almost nothing else.

### 5.1 Five tiers

Line counts below were measured directly on 2026-08-29 — shallow clones, non-blank
source lines, vendored code excluded. The counting rules matter: see §5.8.

| Tier | Size | Example | Who builds it | Calendar |
| --- | --- | --- | --- | --- |
| **0 — Utility** | < 1k lines | a script with a window | one person | days |
| **1 — Tool** | 1k–20k | a tray app, an internal converter | one person | weeks–months |
| **2 — Product** | 20k–150k | [qBittorrent ≈ 114k C++](https://github.com/qbittorrent/qBittorrent) | 1–5 | 1–3 years |
| **3 — Professional** | 150k–1.5M | [Ghostty 376k](https://github.com/ghostty-org/ghostty), [Telegram Desktop 1.04M](https://github.com/telegramdesktop/tdesktop), [Zed 1.47M](https://github.com/zed-industries/zed) | 1–20 | 4–12 years |
| **4 — Platform** | > 1.5M | [VS Code 3.58M](https://github.com/microsoft/vscode), [Blender 3.8M](https://openhub.net/p/blender), [LibreOffice 10.3M](https://openhub.net/p/libreoffice), [Chromium 39.3M](https://openhub.net/p/chrome) | 30–1000+ | a decade+ |

A more useful number than total size is **sustained lines per year**, measured from
full git history:

| Project | Span | Commits | Lines/year | Actual core team |
| --- | ---: | ---: | ---: | --- |
| qBittorrent | 19.9 yr | 13,906 | ~5,700 | 2–3 |
| Telegram Desktop | 12.3 yr | 26,082 | ~84,600 | **2** |
| Ghostty | 4.4 yr | 17,570 | ~85,500 | **~1** |
| Zed | 5.5 yr | 39,754 | ~267,100 | 9–17 core |
| VS Code | 10.8 yr | 164,224 | ~331,500 | 9–14 core |

**≈85k lines/year is what one exceptional developer plus a thin community
sustains. ≈270–330k/year is what a funded team of 10–20 sustains.** A solo developer
planning a million-line application is signing up for a decade — and the two people
in this table who did it declined almost everything in §5.2 to get there.

### 5.2 What appears, and when

| Concern | Tier 0 | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
| --- | --- | --- | --- | --- | --- |
| Architecture | none | one state object + render | **document model + command layer** | versioned observable store | layered, acyclic, N modules |
| Undo/redo | — | — | **must exist** | scoped, multi-context | third parties participate in transactions |
| Autosave / crash recovery | — | — | **must exist** | journal + recovery UI | same |
| Tests | — | a few | real suite | real suite | ⅓ of the codebase |
| i18n | — | — | if you have users abroad | yes | yes |
| Accessibility | free if you used a toolkit | same | same | **hand-built if you drew your own pixels** | same, ×3 platforms |
| Crash reporting | cheap; the *legal* cost is not | yes | yes | yes | yes |
| Plugin API | — | — | — | **only if the domain is unbounded** | usually mandatory |
| Release matrix | one binary | 2–3 artefacts | 6–8 | 12+, signed, 3 stores | dedicated release engineering |

**The single most expensive thing to retrofit is undo/redo**, because it is not a
feature — it is a constraint on every write in the codebase. Once direct mutation is
scattered through the app, finding every mutation site is the expensive part.

Two thresholds are worth naming precisely because they are commonly guessed wrong:

- **String externalisation should start at roughly 5–10k lines**, even if no
  translation is ever commissioned. It is nearly free then and brutal later.
- **A plugin API is triggered by domain unboundedness, not by size.** VS Code
  (languages × debuggers × VCS), Blender (renderers × pipelines) and Photoshop have
  one. Ghostty at 376k lines and Telegram Desktop at 1.04M lines both decline,
  because a terminal and a chat client are bounded problems. Rough band: **below
  ~50k lines a plugin API is almost always premature; above ~500k in an unbounded
  domain it is almost always mandatory; in between it is a product decision.**

### 5.3 What the grown-up features actually cost, measured

| Thing | Where | Lines | Share |
| --- | --- | ---: | ---: |
| Own GUI framework | Zed's `gpui` + 4 platform backends | **115,918** | 8.1% |
| Extension host + API + marketplace | VS Code | **172,766** | 6.8% of `src/` |
| Extension host | Zed | 20,202 | 1.4% |
| Build and release engineering | VS Code `build/` + Azure Pipelines | **58,600** | — |
| CI definitions alone | Zed, 47 workflow files | 7,529 | — |
| Virtualised list/tree | VS Code `base/browser/ui/{list,tree}` | ~10,000 | — |
| Undo/redo platform service | VS Code `platform/undoRedo` | 1,663 | — |
| Cross-platform shells | Ghostty (Swift 32.6k + GTK 20.4k) | 52,977 | **13.7%** |
| Electron-specific code | VS Code (`electron-browser` + `electron-main`) | 96,415 | **3.8% of `src/`** |

Two of these deserve to be read twice.

**VS Code carries more build-and-release code than most successful commercial
desktop applications carry in total.** The driver is not codebase size, it is the
**release matrix**: OS × architecture × packaging format × signing authority ×
update channel. A single-platform app has one column. A modern cross-platform app has
macOS (arm64 + x64, universal, notarised, .dmg + .pkg), Windows (x64 + arm64, signed,
.msi/.msix/winget) and Linux (.deb, .rpm, AppImage, Flatpak, Snap, tarball) — well
over a dozen artefacts, each with its own key and its own way to break.

**VS Code is not, architecturally, "an Electron app."** Its Electron-specific surface
is 3.8% of `src/`, against 1.35M lines of platform-agnostic `browser` code. That
insulation is exactly why the same codebase runs in a browser, over SSH and in
Codespaces. A small Electron app that scatters `ipcRenderer` through its UI has not
paid that cost and cannot make the same move later without a rewrite.

### 5.4 Two things that do *not* scale with size

These are the most interesting results in this research, because they are
counterexamples rather than confirmations.

**Bus factor does not scale with size.** Measured as the minimum number of authors
accounting for 50% of commits:

| Project | Lines | Bus factor (all-time) | Top-5 share, last 12 mo |
| --- | ---: | ---: | ---: |
| Telegram Desktop | 1,041,080 | **1** | **98.6%** |
| Ghostty | 376,395 | **1** | 72.2% |
| qBittorrent | ~114,000 | 3 | 65.7% |
| Zed | 1,469,112 | 9 | 23.4% |
| VS Code | 3,580,622 | 9 | 23.1% |

Telegram Desktop is a **million-line C++ application, twelve years old, with hundreds
of millions of users and a bus factor of one to two.** Contributor counts published
by [Open Hub](https://openhub.net/) — 1,509 for Blender, 2,681 for VS Code — measure
drive-by patches, not capacity.

**Test share does not scale with size either — it scales with toolchain culture.**
Counting both test directories and inline test blocks (`test "…"` in Zig,
`#[cfg(test)]` in Rust):

| Project | Lines | Test lines | Share |
| --- | ---: | ---: | ---: |
| Ghostty (Zig) | 293,286 | 102,980 | **35.1%** |
| Zed (Rust) | 1,436,613 | 495,084 | **34.5%** |
| VS Code (TS) | 2,431,647 | 795,337 | **32.7%** |
| Telegram Desktop (C++) | 1,018,402 | 7,997 | **0.8%** |
| qBittorrent (C++) | 112,336 | 2,186 | **1.9%** |

Flat at about one third across an **eight-fold size range** where the toolchain has a
first-class built-in test runner — and near zero for two C++/Qt projects, including
one of a million lines. The determinant is whether writing a test costs one line of
ceremony or a CMake target. **If you pick a toolchain where testing is not free, you
will not have tests at a million lines either.**

### 5.5 Why cost models mislead here

[Open Hub publishes Basic COCOMO estimates](https://openhub.net/p/blender/estimated_cost)
— Chromium $716M, LibreOffice $174M, Blender $63M — and warns in its own words that
*"COCOMO was created to model large institutional projects, which often don't compare
well with distributed open-source projects."* Reproducing the model at ~$55k per
person-year gives, for our tiers: a 300-line utility ≈ $3.1k, a 5k tool ≈ $60k,
a 50k product ≈ $669k, Ghostty ≈ $5.6M, VS Code ≈ $59M.

Two problems make it unusable as anything but a rough scale intuition:

1. **It is wrong by 12–24× for elite small teams.** It implies 23 FTE for Ghostty,
   whose actual figure is roughly one.
2. **Its exponent is 1.05**, so cost per line rises only from ~$10 at 300 lines to
   ~$19 at 39M — a factor of 1.8 across five orders of magnitude. That is far too
   flat, because everything this section is about — the plugin host, the release
   matrix, the accessibility bridges, the translation pipeline, the compliance
   obligations — is either not lines at all, or is lines the model cannot distinguish
   from a button.

The better instrument is the composition table in §5.3. The maintenance side has one
usable public number: the [Blender Development Fund](https://fund.blender.org/) shows
**$329,935/month (≈$4.0M/year)** from 7,618 individual and 47 corporate supporters —
about **6% of the application's notional replacement cost, per year.** Call it 5–10%
of replacement value annually as a planning heuristic. That number is what kills
ambitious solo projects: they reach 1.0 and cannot fund year three.

### 5.6 Where the stack answer flips

**A webview shell stops being adequate** when *any one* of these becomes true — not
at a line count:

1. Frame time is a product requirement (a dense custom surface above 60 FPS).
2. The app manipulates hundred-megabyte documents in memory with predictable latency.
3. Startup is a competitive feature and the runtime's floor is most of the budget.
4. It must run where a bundled Chromium cannot go.

VS Code proves the shell scales to 2.5M lines and thousands of extensions. Zed proves
that if you need 120 FPS, no amount of webview engineering gets there — *"A random
pause due to garbage collection and we missed a frame"*
([Zed](https://zed.dev/blog/videogame)).

**A cross-platform toolkit stops paying for itself** when per-platform divergence
stops being cosmetic and becomes behavioural: menu semantics, window management,
drag-and-drop conventions, sandbox and entitlement models, background execution,
store review. Measured: Ghostty spends **13.7%** of its source on two hand-written
native shells and considers that a feature; Telegram Desktop spends 1.7%; VS Code
0.1%. **Rule of thumb: a toolkit pays while platform-specific code stays under
~10–15%. Past that you are maintaining a toolkit *and* three native apps.**

**You build your own renderer** when the widget you cannot buy *is* the product —
at any size, and never merely because the app got large. Every verified case shares
this and only this: Zed and Sublime are text grids, Warp is a text grid, Figma is a
vector canvas. Warp and Zed both did it before they had users. The stated reasons are
worth quoting to students:

- Zed: *"no matter how hard we tried, there was always something in the way of
  delivering frames on time"* — [Leveraging Rust and the GPU to render UIs at 120 FPS](https://zed.dev/blog/videogame).
- Sublime Text: *"if you open a copy of Sublime Text 3 on a 4k display you may notice
  that it isn't quite keeping up"* — CPU rendering does not scale with resolution;
  text frame time went **52 ms → 3 ms** — [vendor blog](https://www.sublimetext.com/blog/articles/hardware-accelerated-rendering).
- Warp: *"Many terminals built on Electron are capable tools but can quickly lag"* —
  [How Warp works](https://www.warp.dev/blog/how-warp-works).

The cost is now measurable: **~116k lines, 8% of Zed's codebase**, plus the
accessibility bill in §5.7. Blender, LibreOffice and GIMP draw their own for the same
reason; qBittorrent and Telegram Desktop are both large and correctly use
conventional widgets, because their central surface is a list and a chat log.

**A scripting language becomes a liability** at the point where the thing you cannot
control becomes the thing you must control: GC pause timing, startup, memory ceiling,
distribution size. The stable pattern across every large application measured here is
**a compiled core plus a scripting extension layer** — Blender (C++ + Python), VS Code
(TS core + Node extension host), Zed (Rust + WASM extensions). Blender's API docs even
state *"Python Threads are Not Supported"* — an acceptable restriction for an add-on
and an unacceptable one for a compositor
([Blender API overview](https://docs.blender.org/api/current/info_overview.html)).
The liability is not the language; it is putting the hot path in it.

### 5.7 Two costs the "build it yourself" trend under-prices

**Accessibility is the same decision as the renderer.** Qt, WinUI and AppKit widgets
are accessible by default. Anything that draws its own pixels must hand-build an
accessibility tree per platform — [UI Automation](https://learn.microsoft.com/en-us/windows/win32/winauto/entry-uiauto-win32)
on Windows, `NSAccessibility` on macOS (which [Apple's own docs now mark as a legacy
protocol it does not recommend](https://developer.apple.com/documentation/appkit/nsaccessibility)),
and [AT-SPI2](https://www.freedesktop.org/wiki/Accessibility/AT-SPI2/) on Linux.
Three bridges, three semantics, three screen readers to test against.

This compounds with testing, because **desktop UI automation targets the
accessibility tree, not a DOM**: your app is only testable to the degree it is already
accessible. Add three more structural problems the web does not have — there is no
headless mode for a real desktop app (tests need a display server, a window manager,
DPI settings and a logged-in session); OS-level dialogs sit outside your process; and
there is no equivalent of Playwright's auto-waiting because there is no "network
idle." The tooling reflects it: [WinAppDriver's latest release is v1.2.1 from November
2020](https://github.com/microsoft/WinAppDriver), the practical successor is the
community [appium-windows-driver](https://github.com/appium/appium-windows-driver),
[Playwright's Electron support is officially experimental](https://playwright.dev/docs/api/class-electron),
and [Electron ships no first-party test solution at all](https://www.electronjs.org/docs/latest/tutorial/automated-testing).

**The useful consequence for teaching: accessibility work and UI-test automation are
the same investment.** That is a far better argument for doing accessibility early
than any compliance story.

On the compliance story — the [European Accessibility Act](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32019L0882)
applied from 28 June 2025 and is widely described as covering "apps." Read literally,
**it does not cover general desktop applications.** Its product scope is consumer
hardware and *operating systems*; its service scope is e-commerce, consumer banking,
transport, electronic communications, AV media and e-books. A CAD tool, an image
editor or an IDE is out of scope on the face of the directive; a desktop client that
is the front end to a banking or e-commerce service is plausibly in scope through the
service limb. **TO CONFIRM:** national transposition can go wider than the directive's
minimum, and Poland's implementation has not been checked here.

**Crash reporting** has migrated all the way down the size curve — a Sentry SDK is
a day's work at any scale. The *legal* cost has not. Under GDPR a minidump is personal
data by default: it contains stack memory, which can hold filenames, document
contents, tokens and usernames. The
[Crashpad design](https://chromium.googlesource.com/crashpad/crashpad/+/HEAD/doc/overview_design.md)
is explicit that *"It's critical to safeguard the user's privacy by ensuring that no
crash report is ever uploaded without user consent."* The correct posture for a small
app is opt-in, no automatic upload, and client-side scrubbing.

### 5.8 A methodology warning worth teaching

While measuring for this report, [Open Hub's qBittorrent page](https://openhub.net/p/qbittorrent)
reported **1,332,195 lines, "TypeScript 82%"**. qBittorrent contains no TypeScript.
It contains exactly 122 `.ts` files — Qt Linguist **translation catalogues**, XML
beginning `<!DOCTYPE TS>` — totalling 1,149,650 lines. The actual application is
**~114,000 lines of C++**, roughly a tenth of the published figure.

Any size comparison drawn from Open Hub, GitHub's language bar, or `cloc` defaults
will silently conflate generated code, vendored libraries and translation catalogues
with engineering effort. **If a claim about scale does not state its counting rules,
it is not a measurement.** Also worth knowing: the widely-repeated "600,000 lines of
Rust" figure for Zed is roughly 2.4× too low against a direct count.

### 5.9 The small end, taken seriously

The decisive fact at the bottom of the curve is that **distribution is a fixed cost.**
A 300-line utility and a 3-million-line application pay exactly the same
[$99/year](https://developer.apple.com/support/compare-memberships/), the same
notarisation pipeline, the same hardened-runtime constraints, the same Windows
signing, the same store review. COCOMO says the utility costs $3k to write; the
apparatus around it costs a comparable amount every year, forever.

So every honest small-end recommendation is really a recommendation about how to
avoid that fixed cost.

**(a) A single-file GUI utility.** The best answer is usually **don't ship a desktop
app.** A static HTML file opened from disk gets a full UI toolkit, accessibility via
ARIA, no signing, no notarisation, no installer, no update mechanism, on all three
platforms. If it must touch the filesystem: Python + Tkinter, run from source, not
packaged. **The moment you reach for PyInstaller you have signed up for all of §6** —
that is the decision point, not the code.

**(b) A menu-bar / tray app.** The one case where **native wins outright at tiny
scale**, because menu-bar behaviour is the most platform-idiosyncratic surface in
desktop software: `NSStatusItem` semantics, launch-at-login, background execution
policy, agent-app store rules. A cross-platform menu-bar app usually means writing
per-platform code for the only part that matters while carrying a framework for the
part that doesn't. Budget notarisation from day one — an unnotarised menu-bar app is
an app that doesn't launch.

**(c) A script that needs a GUI.** In order: (1) no GUI — better arguments and a good
`--help`; (2) the OS's own automation layer, where the UI is someone else's problem —
Shortcuts on macOS, PowerShell with `Out-GridView` on Windows; (3) a local web app:
have the script serve `localhost` and open a browser; (4) only then a GUI framework.
AppleScript should not be started fresh in 2026.

**(d) An internal tool for twenty colleagues.** Almost always a local web app or a
small server they hit in a browser — not for technical reasons but because owning
signing, updates and support across three platforms for twenty users is an absurd
cost ratio. If it must be desktop:
[.NET single-file publish](https://learn.microsoft.com/en-us/dotnet/core/deploying/single-file/overview)
on a Windows fleet (one file, no runtime install — mind that `Assembly.Location`
returns empty and `Assembly.GetFile` throws), or Tauri on a mixed fleet if the team
already writes web front ends. Deploy by dropping the binary on a share; skip the
installer.

> **The general rule for everything below ~5k lines:** the question is not "which GUI
> framework" but **"can I avoid being a desktop application at all?"** — because the
> framework is a week and the distribution apparatus is forever.

**↗ Dig deeper**
[Zed: leveraging Rust and the GPU](https://zed.dev/blog/videogame) ·
[VS Code extensibility principles](https://vscode-docs1.readthedocs.io/en/latest/extensionAPI/patterns-and-principles/) and [the extension host](https://code.visualstudio.com/api/advanced-topics/extension-host) ·
[Crashpad design overview](https://chromium.googlesource.com/crashpad/crashpad/+/HEAD/doc/overview_design.md) ·
[Directive (EU) 2019/882 — full text](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32019L0882) ·
[Blender Development Fund — live figures](https://fund.blender.org/) ·
[Qt accessibility guide](https://doc.qt.io/qt-6/accessible.html)

---

## 6. Distribution — the part that is actually hard

The gap between "it compiles" and "a stranger is running it" is where most student
projects, and a great many real ones, quietly die.

### 6.1 Windows — the rules changed and nobody announced it loudly

**An EV certificate no longer buys anything for SmartScreen.** Microsoft's own words:

> *"EV certificates no longer bypass SmartScreen. Years ago, signing files with an
> Extended Validation (EV) code signing certificate would result in positive
> SmartScreen reputation by default, but this behavior no longer exists… Paying a
> premium for EV solely to avoid SmartScreen warnings is no longer justified."*
> — [SmartScreen reputation for Windows app developers](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation)

Reputation is now hash-based and accrues over time regardless of certificate type.
There is *no* purchasable path to a clean first-run experience other than the
Microsoft Store, where Microsoft re-signs the MSIX. Otherwise it takes *"several weeks
and hundreds of clean installs from a wide audience."*

What signing still costs and buys:

| Option | Price | Notes |
| --- | --- | --- |
| [Azure Artifact Signing](https://learn.microsoft.com/en-us/azure/trusted-signing/quickstart) (formerly Trusted Signing) | **~$9.99/month** | No hardware token; signs from CI. Certificates renew daily, valid 72 h, so timestamping is load-bearing. Requires a paid Azure subscription. **Individuals: USA and Canada only.** |
| OV certificate from a CA | $150–300/yr | Since **June 2023** the private key must live on an HSM or hardware token — the era of a PFX in CI is over |
| EV certificate | $400+/yr | Hardware always required; still useful for enterprise procurement, useless for SmartScreen |
| [SignPath Foundation](https://signpath.io) | free | OV-level signing for qualifying open-source projects |

Windows 11 adds an escalation most 2024-era guidance misses: **Smart App Control can
block unsigned executables outright**, and its checks apply to all executables, not
only downloaded ones.

Also worth knowing before promising one-click installs: the `ms-appinstaller:` URI
protocol has been **disabled by default since December 2023** after Emotet abuse. Web
one-click MSIX install is gone for consumers.

### 6.2 macOS — four requirements, and the escape hatch is closed

[Notarization](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution)
requires all of: every executable code-signed, a **Developer ID** certificate
specifically, the **hardened runtime**, and a **secure timestamp**. `altool` stopped
being accepted on 1 November 2023 — it is `notarytool` or the REST API now.

Stapling has sharp edges worth teaching once: you **cannot staple to a ZIP** (staple
the items inside, then re-zip); standalone binaries cannot be stapled at all; a
third-party installer needs two rounds (notarise payload → staple → package →
notarise installer); the daily limit is 75 notarisations.

For an unsigned app the user now sees *"Apple cannot check … for malicious software"*
with Move to Trash / Done, and must go to System Settings → Privacy & Security →
Open Anyway. **macOS 15 removed the Control-click → Open shortcut** that had been the
standard bypass for a decade.

**A plugin API permanently weakens the host's security posture on macOS.** Plugins
inherit the host's entitlements rather than declaring their own, so a host that lets
plugins run a JavaScript engine must itself declare `com.apple.security.cs.allow-jit`,
and one loading unsigned third-party plugins needs `disable-library-validation`. This
is a real cost of extensibility that nobody puts in the pitch deck.

### 6.3 Linux — no gate, but a channel

Nothing stops an executable from running. Trust is delegated to the distribution
channel: apt/dnf/Flatpak repositories are GPG-signed at the *repository* level, not
per app. [Flathub verification](https://docs.flathub.org/docs/for-app-authors/verification)
is identity attestation (a well-known URL, a DNS TXT record, or an authenticated
source-hosting account), **not** code signing; its publishing requirements instead
demand that *"static permissions must be kept to an absolute minimum"* and that apps
rely on XDG Portals. Sandbox permissions, not signatures, are the trust surface.

Scale, for context: [Flathub](https://flathub.org/statistics) carries **3,631 desktop
apps, 2,165 verified, 4.6 billion downloads** since 2018. **Flathub still supports
neither paid apps nor donations** as of August 2026, despite years of announcements —
the last substantive status update is from [October 2024](https://discourse.flathub.org/t/when-are-paid-applications-supported/7757).

### 6.4 Packaging and updates

Microsoft's [own recommendation hierarchy](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/choose-distribution-path)
is Store MSIX first — the only path with free signing *and* managed updates. The Store
now also accepts MSI/EXE installers you host yourself, but that path gets neither.
NSIS remains the de facto default for cross-platform toolkits (both Tauri and
electron-builder emit it), and **Squirrel.Windows is effectively stalled** — [last
release September 2020, README asking for maintainers](https://github.com/Squirrel/Squirrel.Windows).

The accepted update patterns, which have converged on *signed manifests over enforced
TLS with per-artefact signatures independent of the OS signing chain*:

| Mechanism | Platform | Note |
| --- | --- | --- |
| [`update.electronjs.org`](https://www.electronjs.org/docs/latest/tutorial/updates) | Win, macOS | Free, Electron-team-run; needs a public GitHub repo and macOS code signing |
| [electron-builder / electron-updater](https://www.electron.build/) | all | Differential updates, staged rollouts, signing and notarisation built in |
| [Sparkle 2](https://sparkle-project.org/) | macOS | The non-Store standard; **EdDSA** signatures, sandbox-compatible |
| [Tauri updater](https://v2.tauri.app/plugin/updater/) | all | *"Tauri's updater needs a signature… This cannot be disabled."* The strictest of the set |
| MSIX `.appinstaller` | Windows | Works, but Visual Studio still emits a 2017 schema that silently ignores update-policy attributes |
| [Chromium updater](https://chromium.googlesource.com/chromium/src/+/main/chrome/updater/README.md) | all | Omaha's successor, embeddable by third parties |

### 6.5 The Microsoft Store is now free, and that changes the arithmetic

Registration fees were removed for [individuals in September 2025](https://learn.microsoft.com/en-us/windows/apps/publish/whats-new-individual-developer)
and [companies in May 2026](https://learn.microsoft.com/en-us/windows/apps/publish/whats-new-company-developer).
Microsoft's account documentation now reads *"there are no registration fees for
either account type."* Non-gaming apps may use their own commerce and
[keep 100% of revenue](https://learn.microsoft.com/en-us/windows/apps/publish/publish-your-app/why-distribute-through-store),
or 15% through Microsoft's. For a student or a small vendor, the Store is now
*strictly* cheaper than any signing certificate.

For comparison: the [Mac App Store](https://developer.apple.com/app-store/small-business-program/)
is 30%, or 15% under the Small Business Program (≤$1M proceeds).
[Setapp added single-app purchases and per-app subscriptions in March 2026](https://www.prnewswire.com/news-releases/macpaw-launches-new-purchase-options-on-setapp-introducing-single-app-purchases-and-subscription-plans-302700175.html),
its first structural change in years — though the revenue share is described only as
"competitive" and is not disclosed.

**↗ Dig deeper**
[Code signing options for Windows app developers](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/code-signing-options) ·
[Current status of Windows app distribution features](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/distribution-feature-status) ·
[Customizing the notarization workflow](https://developer.apple.com/documentation/security/customizing-the-notarization-workflow) ·
[Flathub publishing requirements](https://docs.flathub.org/docs/for-app-authors/requirements) ·
[Sparkle project](https://sparkle-project.org/)

---

## 7. The platforms moved under everyone's feet

### 7.1 Windows 10 is out of support and still on a third of desktops

Support ended [2025-10-14](https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/windows-10-support-has-ended-on-october-14-2025).
Commercial ESU runs three years to October 2028 at
[$61 / $122 / $244 per device per year, doubling and cumulative](https://learn.microsoft.com/en-us/windows/whats-new/extended-security-updates).
Consumer ESU was quietly [extended to 2027-10-12](https://www.microsoft.com/en-us/windows/extended-security-updates)
— free by syncing settings, or 1,000 Rewards points, or $30 once.

[StatCounter, July 2026](https://gs.statcounter.com/os-version-market-share/windows/desktop/worldwide):
**Windows 11 68.93%, Windows 10 29.83%.** Dropping Windows 10 in 2026 is a business
decision, not a technical inevitability — and MSIX sharpens it, since shared package
containers, mutable package directories and MSIX persistent identity are
Windows 11-only and were never backported.
[Windows 11 is 64-bit only](https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements),
so x86 is now a legacy target.

### 7.2 macOS 26 changed how every app looks, on a timer

[Liquid Glass](https://developer.apple.com/documentation/TechnologyOverviews/adopting-liquid-glass)
arrived with macOS 26. Three consequences developers actually hit:

- **Rebuilding against the latest SDK is the opt-in.** There is no separate flag.
- **Custom chrome on bars, toolbars, split views and sidebars is now actively
  harmful** — it interferes with the system material. The guidance is to *remove*
  custom chrome, inverting a decade of habit.
- **App icons must be re-authored as layered artwork** in the new Icon Composer, with
  default/dark/clear/tinted variants; the system applies reflection and shadow, so you
  must not bake them in. This is what caused the visible churn across third-party Mac
  apps through late 2025.

And the deadline: `UIDesignRequiresCompatibility` restores the old look, but Apple
states the system **ignores it when you build for macOS 27 or later**. With macOS 27
expected in September 2026, compatibility mode has about one release cycle left.

**The consequence for this report's framework question:** every non-native toolkit —
Electron, Tauri, Flutter, Qt, Avalonia, Uno, Compose — now visibly diverges from macOS
system chrome unless it explicitly re-themes. That is a stronger argument for
native-on-macOS than existed in 2024.

### 7.3 Linux: the X11 *session* is gone from GNOME on the two flagships

[Ubuntu 25.10](https://documentation.ubuntu.com/release-notes/25.10/) removed it —
*"The Ubuntu on X.org session is no longer available because GNOME Shell can no longer
run as an X.org session"* — and [Fedora 43](https://fedoraproject.org/wiki/Changes/WaylandOnlyGNOME)
dropped `gnome-session-xsession`. [Ubuntu 26.04 LTS](https://documentation.ubuntu.com/release-notes/26.04/changes-since-previous-interim/)
ships GNOME 50 with further X11 cleanup.

**This does not break X11 applications.** Per the [GNOME maintainer's FAQ](https://blogs.gnome.org/alatiera/2025/06/23/x11-session-removal-faq/),
Xorg is still maintained and *"XWayland will be around with us for decades."* What
changed is what an app can *assume*: no arbitrary window positioning, no global screen
coordinates, tighter screen-recording and global-shortcut rules, and client-side
decorations for frameless windows. Electron documents all of this in
[How Electron went Wayland-native](https://www.electronjs.org/blog/tech-talk-wayland) —
the best single explanation of what Wayland costs an application.

### 7.4 ARM64 is now a default, and Rosetta is ending

On Windows, [Arm64EC](https://learn.microsoft.com/en-us/windows/arm/arm64ec) lets
native Arm64 and existing x64 code mix in one binary for incremental porting; Visual
Studio, VS Code and .NET 8+ all ship native Arm64 builds
([overview](https://learn.microsoft.com/en-us/windows/arm/overview)).

On macOS, Apple documents the wind-down in developer docs:
*"Rosetta … **will be available through macOS 27** … Beyond this timeframe, we will
keep a subset of Rosetta functionality aimed at supporting older unmaintained gaming
titles"* — [About the Rosetta translation environment](https://developer.apple.com/documentation/apple-silicon/about-the-rosetta-translation-environment).
macOS 26 is the last release for Intel Macs. Universal binaries make sense for one
more cycle; Apple-silicon-only is defensible now and becomes the default next year.

**↗ Dig deeper**
[How Electron went Wayland-native](https://www.electronjs.org/blog/tech-talk-wayland) ·
[GNOME X11 session removal FAQ](https://blogs.gnome.org/alatiera/2025/06/23/x11-session-removal-faq/) ·
[Adopting Liquid Glass](https://developer.apple.com/documentation/TechnologyOverviews/adopting-liquid-glass) ·
[Windows on Arm overview](https://learn.microsoft.com/en-us/windows/arm/overview) ·
[Extended Security Updates explained](https://learn.microsoft.com/en-us/windows/whats-new/extended-security-updates)

---

## 8. AI, and what it did to the desktop

This section overlaps `research-01`, which covers AI-assisted *development*. What
follows is the part specific to desktop applications: AI as a **platform capability**
and as the **reason the desktop client came back**.

### 8.1 On-device inference is now a normal platform API

**Windows.** [Windows ML went GA on 2025-09-23](https://blogs.windows.com/windowsdeveloper/2025/09/23/windows-ml-is-generally-available-empowering-developers-to-scale-local-ai-across-windows-devices/):
ONNX Runtime shipped and serviced *by the OS*, consumed through the Windows App SDK,
with GA execution providers from AMD, Intel, NVIDIA and Qualcomm
([EP table](https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/supported-execution-providers)).
**DirectML is in maintenance** — Microsoft's own repository title says so.
[Foundry Local went GA on 2026-04-09](https://devblogs.microsoft.com/foundry/foundry-local-ga/)
and is, notably, **cross-platform** — Windows, macOS on Apple Silicon, Linux x64 —
with automatic GPU/NPU/CPU fallback and an OpenAI-compatible API.

One caution worth carrying into any lesson: **Phi Silica, the headline on-device
language model API, is being retired.** Microsoft's own docs schedule
[Aion Instruct](https://learn.microsoft.com/en-us/windows/ai/apis/phi-silica) to
replace it, with Phi Silica removed at retail in November 2026. It is also Limited
Access, Copilot+ NPU-gated and unavailable in China. Build against **Windows ML** and
**Foundry Local**, not against Phi Silica.

**Apple.** The [Foundation Models framework](https://developer.apple.com/documentation/foundationmodels)
shipped with macOS 26 and gives any app a **~3-billion-parameter on-device model,
free, offline** — [Apple Newsroom, 2025-09-29](https://www.apple.com/newsroom/2025/09/apples-foundation-models-framework-unlocks-new-intelligent-app-experiences/).
WWDC26 announced a larger revision for macOS 27 — a rebuilt 3B core with an 8,192-token
context, a 20B sparse variant, on-device vision, Private Cloud Compute opened to third
parties, and a `LanguageModel` protocol that lets **any provider** plug in
([model report](https://machinelearning.apple.com/research/introducing-third-generation-of-apple-foundation-models)).
That protocol is the structurally larger change: it converts Apple's on-device API
from a walled model into a model-agnostic abstraction layer.

**Cross-platform.** [llama.cpp](https://github.com/ggml-org/llama.cpp) remains the
portability layer — CUDA, HIP, Metal, Vulkan, SYCL, CANN, OpenCL, WebGPU. Ollama
[shipped a desktop GUI in July 2025](https://ollama.com/blog/new-app);
[LM Studio 0.4.0 added a headless daemon in January 2026](https://lmstudio.ai/blog/0.4.0)
— the arc runs in both directions once the app is a platform.
[WebNN is still only a Candidate Recommendation Draft](https://www.w3.org/TR/webnn/)
and names no shipping implementations.

**NPUs: not yet a defensible product gate.** [Copilot+ requires a 40+ TOPS NPU](https://learn.microsoft.com/en-us/windows/ai/npu-devices/).
Counterpoint [projects ~59% of 2026 shipments](https://counterpointresearch.com/en/reports/ai-advanced-pcs-to-surpass-half-of-global-shipments-in-2026)
will clear that bar — but IDC projects the 2026 PC market itself
[contracting 11.3%](https://www.idc.com/resource-center/blog/pc-market-enters-volatile-territory-as-memory-shortage-persists-through-2027/)
on a memory shortage, so the *absolute* number of new Copilot+ machines is far below
what the percentage suggests, and **no installed-base figure is published at all.**
The strongest evidence is Microsoft's own API design: Windows ML abstracts NPU/GPU/CPU
precisely so you *don't* target the NPU, and Foundry Local advertises fallback "with
zero detection code required." The platform vendor's revealed preference is
hardware-agnostic dispatch.

### 8.2 Why AI products ship desktop clients

Four capability classes require a local process, and the vendors say so in their own
words:

- **OS-level introspection.** ChatGPT for macOS's "Work with Apps" uses the
  [macOS Accessibility API](https://help.openai.com/en/articles/10119604-work-with-apps-on-macos)
  to read open panes in editors and terminals and apply reviewable diffs in IDEs.
- **Filesystem, sandboxing and process orchestration.** OpenAI on the
  [Codex app](https://openai.com/index/introducing-the-codex-app/): *"existing IDEs
  and terminal-based tools are not built to support this way of working."*
- **The desktop as a persistent host.** Anthropic on
  [Cowork's built-in browser](https://claude.com/blog/cowork-built-in-browser):
  *"The built-in browser lives in the desktop app. From the web or your phone, Claude
  can still drive it as long as your desktop app is open and online."* The desktop
  machine is the runtime; the phone is a remote control.
- **Local models.** Apple, WWDC26: *"the entire loop can run locally. Your data stays
  on your machine … and there are no usage costs."*

### 8.3 MCP went into the operating system

This is the strongest single piece of evidence that the desktop client became a
platform. [MCP was donated to the Agentic AI Foundation](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/)
— a Linux Foundation directed fund — in December 2025, founded by Anthropic, Block and
OpenAI with Google, Microsoft and AWS supporting. Tier-1 SDK downloads
[exceeded 500M/month by July 2026](https://blog.modelcontextprotocol.io/posts/2026-07-28/).

Windows then shipped an **On-device Agent Registry** — OS-level discovery and
management of local MCP servers, with a File Explorer server and a Settings connector
in the box, and **adopting Anthropic's `.mcpb` bundle format** —
[Microsoft Learn](https://learn.microsoft.com/en-us/windows/ai/mcp/overview). Alongside
it, an [Agent Workspace](https://learn.microsoft.com/en-us/windows/security/book/operating-system-agentic-security):
*"a contained environment where agents can work in parallel with a human user … the
agent with capabilities like its own desktop while limiting the visibility and access
the agent has to the user's desktop activity."* Both are preview, but the direction is
unambiguous: the platform vendor conceded the protocol.

The [July 2026 specification revision](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
is the largest since launch — a stateless core, header-based routing, cacheable list
results, and the deprecation of Roots, Sampling and Logging on a ≥12-month window.
**Sampling's deprecation matters for desktop clients specifically**: it was the
primitive by which a desktop host lent its model to a server.

### 8.4 The honest evidence on AI-assisted development

`research-01` covers this in depth; two 2026 updates change what can be claimed and
belong here because they are directly about *learning an unfamiliar toolkit*, which is
the whole question for a course.

**METR published the limits of its own famous result.** The [July 2025 RCT](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
found experienced developers **19% slower** with AI while believing they were 20%
faster. In [February 2026](https://metr.org/blog/2026-02-24-uplift-update/) METR
published that its design cannot support the inference people draw from it — recruitment
bias, task-selection bias (*"Thirty to fifty percent of developers deliberately
avoided submitting tasks they believed AI would dramatically accelerate"*), and
measurement breakdown from multi-agent use. Their late-2025 follow-up point estimates
flip toward speedup with confidence intervals crossing zero. **The 19% figure should
not be cited as current, in either direction.**

**And there is direct counter-evidence on the specific claim a course cares about.**
Anthropic's [January 2026 RCT](https://www.anthropic.com/research/AI-assistance-coding-skills)
had 52 mostly-junior engineers learn an unfamiliar Python library with or without AI.
The AI group scored **17 percentage points lower** on comprehension — 50% vs 67%,
*"the equivalent of nearly two letter grades"* — with the largest gap on debugging,
for a time saving of about two minutes that was not statistically significant. High
scorers used AI for *conceptual questions*; low scorers delegated code generation and
debugging wholesale.

The honest framing for a desktop course: **AI reduces the cost of *shipping against* an
unfamiliar toolkit. There is direct experimental evidence that it does not reduce —
and may raise — the cost of *understanding* one.** That distinction is the entire
pedagogical problem of teaching desktop development in 2026, and it should be said
out loud in Moduł 1 rather than discovered in May.

**↗ Dig deeper**
[Windows ML supported execution providers](https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/supported-execution-providers) ·
[Apple Foundation Models framework](https://developer.apple.com/documentation/foundationmodels) ·
[Windows MCP / On-device Agent Registry](https://learn.microsoft.com/en-us/windows/ai/mcp/overview) ·
[MCP July 2026 specification](https://blog.modelcontextprotocol.io/posts/2026-07-28/) ·
[Anthropic: AI assistance and coding skills (RCT)](https://www.anthropic.com/research/AI-assistance-coding-skills) ·
[METR's own update on its 19% result](https://metr.org/blog/2026-02-24-uplift-update/)

---

## 9. Local-first — the other reason desktop software is interesting again

The founding text is Ink & Switch's
[*Local-first software: You own your data, in spite of the cloud*](https://www.inkandswitch.com/local-first/)
(2019) with its seven ideals: fast, multi-device, offline, collaborative, durable,
private, user-controlled. In 2026 the substrate is real:

- [Automerge 3](https://www.inkandswitch.com/newsletter/dispatch-012/) cut memory
  *"over 10x, sometimes dramatically more."*
- [Yjs](https://github.com/yjs/yjs) is in production at Linear, Evernote, JupyterLab,
  Proton Docs and GitBook, with bindings for every major editor.
- [Rocicorp's Zero reached 1.0 on 2026-06-08](https://www.infoq.com/news/2026/06/zero-version-1/)
  — queries run against a local cache first, results next frame, sync behind.
- [Turso](https://turso.tech/blog/we-are-a-year-into-rewriting-sqlite), SQLite
  rewritten in Rust, has concurrent writes, native vector search and browser
  persistence working. Its stated motivation is explicitly agentic:
  *"the shape of SQLite (database-in-a-file) was the only architecture capable of
  meeting the needs of the next 10 years of agentic workloads."*
- FOSDEM 2026 ran [a dedicated local-first track](https://fosdem.org/2026/schedule/track/local-first/) —
  22 talks in one room.

**A caution against a tempting narrative.** Local-first (2019, motivated by data
ownership and offline collaboration, built on CRDTs) and the AI-desktop wave
(2024–26, motivated by giving an agent a process with filesystem and local inference)
are two different movements that share a substrate — SQLite, local storage, a resident
process. One primary source explicitly links them. **No survey or telemetry
establishing that local-first adoption is being driven by AI was found.** Say
"convergent," not "caused."

**↗ Dig deeper**
[Ink & Switch: local-first software](https://www.inkandswitch.com/local-first/) ·
[Yjs](https://github.com/yjs/yjs) · [Automerge](https://automerge.org/) ·
[Turso: a year into rewriting SQLite](https://turso.tech/blog/we-are-a-year-into-rewriting-sqlite) ·
[FOSDEM 2026 local-first track](https://fosdem.org/2026/schedule/track/local-first/)

---

## 10. What this forces in the course

Nothing here authorises an app change (Article IX) or asserts an institutional fact
(Article V). These are proposals against `course-structure-v1.md`.

### 10.1 The three claims that should survive into student-facing content

1. **"Which framework?" is the least interesting question, and it is the only one the
   internet argues about.** §4 is the evidence: the size table shows toolkit choice is
   not the dominant term in app size; the migration record shows traffic in both
   directions; the most-cited benchmark compares 2026 software to 2023 software. A
   student who leaves this course able to *dismantle a framework comparison* has
   learned something durable. A student who leaves knowing that "Tauri is smaller than
   Electron" has learned a slogan with a three-year-old measurement behind it.
2. **Scale changes the answer.** The same project done at 300 lines, 5,000 lines and
   50,000 lines needs three different sets of decisions, and the tier table in §5.1
   makes that concrete without hand-waving.
3. **Distribution is where projects die, and it is a fixed cost.** §6 is the section a
   4th-year has never been taught and will need within a year of leaving.

### 10.2 Concrete proposals, by module

- **Moduł 1 — *Jak dziś powstaje oprogramowanie*.** Add the §8.4 pair: METR's retraction
  and Anthropic's learning RCT. It is the most honest thing available on what an AI
  assistant does to a *learner* specifically, and it is from the vendor.
- **Moduł 4 — *Aplikacje desktopowe i mobilne*.** Restructure the stack discussion
  around the **four families** (§2) rather than a product list. The families are
  stable; product names rot in months. Keep `research-02`'s .NET decision as the
  course's own answer, but teach it as *one branch of a map the student can read*.
- **New candidate lesson — "Ile waży aplikacja"** (working title). Take §4 as-is: hand
  students the Tauri benchmark and the Flathub table, and ask why Zed installs larger
  than Slack. It teaches measurement literacy, is completely concrete, requires no
  installation, and is the single most transferable hour in the whole topic.
- **Moduł 5 — *Pierwsza aplikacja desktopowa*.** §5.9 argues that the honest first
  answer for a small tool is often "don't ship a desktop app." That is not a defeat —
  it is the correct engineering judgement, and stating it before the first project
  prevents a semester of installer misery. Keep the desktop app as the exercise; make
  the *justification* part of the exercise.
- **Moduł 6 — *Testy, jakość i przegląd kodu*.** §5.4's test-share table and §5.7's
  point that **desktop UI automation targets the accessibility tree** give this module
  a desktop-specific spine it otherwise lacks. The link between accessibility and
  testability is the strongest argument available for doing either.
- **Semester 2, release lesson.** §6 is the source material, and most of it did not
  exist in this form eighteen months ago. The Microsoft Store being free (§6.5) is the
  single most useful fact for a student who wants a stranger to run their app.

### 10.3 What this changes about the .NET decision in `research-02`

Nothing decisive, and that is worth stating. Three refinements:

- **WPF is not in maintenance.** §2.3 — .NET 10 shipped substantial WPF and WinForms
  feature work. If INF.04 names WPF, that is less of a compromise than it looked.
- **Avalonia's position strengthened** through the period: MIT, Devolutions-funded,
  first .NET framework with native Linux accessibility, and now bound to Impeller in
  collaboration with Google's Flutter team.
- **MAUI reaches Linux and WebAssembly only through Avalonia's backend**
  ([announcement](https://avaloniaui.net/blog/net-maui-is-coming-to-linux-and-the-browser-powered-by-avalonia)).
  That is a strange and genuinely relevant fact for a course choosing between them.

### 10.4 TO CONFIRM

| # | Question | Blocks |
| --- | --- | --- |
| 1 | Does Poland's EAA transposition extend accessibility duties to general desktop applications? | Whether §5.7 can be stated as fact in a lesson |
| 2 | Delphi 13 Community Edition revenue threshold and licence terms | Whether Lazarus/Delphi can be offered as a student option |
| 3 | Whether the lab network reaches NuGet, crates.io, npm and model APIs | Everything in §2 that requires an SDK download |
| 4 | Whether students can obtain an Apple Developer account (they almost certainly cannot) | Whether §6.2 is taught as theory or practice |

---

## 11. What could not be verified

Listed so the next reader does not re-walk the same ground, and so nothing here is
mistaken for settled.

- **Azure Artifact Signing Premium pricing** — the public pricing page renders both
  base prices as placeholders. Only the ~$9.99/month Basic tier is documented.
- **The three-year business-age requirement** for organisational identity validation —
  corroborated by multiple user reports on Microsoft's own Q&A platform, absent from
  all current documentation. Microsoft's own docs also **disagree with each other** on
  geographic eligibility (four regions vs twelve).
- **Qt commercial pricing** and **which Qt modules are GPL-only** — both acknowledged
  to exist by Qt's documentation, neither enumerated on any reachable page.
- **Qt LTS access** — [one Qt page](https://www.qt.io/development/qt-framework/qt-lts)
  says LTS is a commercial benefit, [another](https://www.qt.io/development/qt-framework/release-cycle)
  frames it as differing maintenance periods. The evidence-backed reading is that
  open-source users get the initial LTS release and early patches; the long tail is
  commercial. Say that carefully to students.
- **AppImage's supposed decline** — asserted only by content-farm articles. No primary
  evidence found. Likewise **no decisive 2025–26 Flatpak-vs-Snap development**: the
  "unified backend" proposal circulating in search results is a community forum post,
  not a Canonical roadmap item.
- **Linear's and LM Studio's UI stacks** — no first-party statement exists for either.
- **Figma's rendering rationale** — the canonical blog post is robots.txt-blocked;
  cite it directly before quoting.
- **Indie desktop developer revenue data** — none obtainable.
- **Open Hub analysis dates are inconsistent** (Audacity's is from January 2024, VS
  Code's from September 2025). Do not present its figures as a same-date snapshot, and
  see §5.8 for a worked example of it being outright wrong.

**Sources deliberately excluded**, and recommended for exclusion from anything
student-facing: `tech-insider.org`, `pkgpulse.com`, `kanopylabs.com`, `rustify.rs`,
`buildmvpfast.com`, `desktopcore.com`, `techloghub.com`, `forasoft.com`, and the
DEV.to/Medium framework-comparison genre. Every one carries confident numbers with no
methodology, no hardware and no reproducible artefact. Several of them are the top
results for the obvious queries, which is itself a teachable moment.

---

## 12. Further reading, annotated

Grouped by what a reader would want next. Everything here is a primary source or a
first-hand engineering account.

**If you read only five things**

1. [Zed — Leveraging Rust and the GPU to render user interfaces at 120 FPS](https://zed.dev/blog/videogame) — the clearest statement anywhere of why a team abandons a toolkit, with the frame-budget arithmetic.
2. [Sublime Text — Faster Rendering Using Hardware Acceleration](https://www.sublimetext.com/blog/articles/hardware-accelerated-rendering) — vendor-published numbers **with method**, which is rare. 52 ms → 3 ms.
3. [Fluxzy — Electron to Tauri, five months later](https://www.fluxzy.io/resources/blogs/electron-to-tauri-migration-fluxzy-desktop) — the only well-documented migration with both the win and the bill.
4. [Microsoft — SmartScreen reputation for Windows app developers](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/smartscreen-reputation) — a vendor telling you its own paid product no longer solves your problem.
5. [Ink & Switch — Local-first software](https://www.inkandswitch.com/local-first/) — the essay that gave the whole movement its vocabulary.

**Framework landscape**
[Electron release timelines](https://www.electronjs.org/docs/latest/tutorial/electron-timelines) ·
[Electron blog](https://www.electronjs.org/blog) ·
[Tauri architecture](https://tauri.app/concept/architecture/) ·
[Tauri × Verso](https://v2.tauri.app/blog/tauri-verso-integration/) ·
[Servo blog](https://servo.org/blog/) ·
[Wails v3 beta](https://v3.wails.io/blog/wails-v3-beta/) ·
[Flutter 3.47](https://flutter.dev/blog/whats-new-in-flutter-3-47) and [the 2026 roadmap](https://flutter.dev/blog/flutter-darts-2026-roadmap) ·
[Qt release cycle](https://www.qt.io/development/qt-framework/release-cycle) ·
[Avalonia 12](https://avaloniaui.net/blog/avalonia-12) ·
[Uno Platform 6.6](https://platform.uno/blog/uno-platform-6-6/) ·
[Compose Multiplatform 1.10](https://kotlinlang.org/docs/multiplatform/whats-new-compose-110.html) ·
[GNOME 50 developer notes](https://release.gnome.org/50/developers/index.html) ·
[Are we GUI yet?](https://areweguiyet.com/)

**Architecture at scale**
[VS Code extension host](https://code.visualstudio.com/api/advanced-topics/extension-host) ·
[VS Code extensibility principles](https://vscode-docs1.readthedocs.io/en/latest/extensionAPI/patterns-and-principles/) ·
[Blender Python API overview](https://docs.blender.org/api/current/info_overview.html) ·
[Adobe UXP](https://developer.adobe.com/photoshop/uxp) ·
[Crashpad design](https://chromium.googlesource.com/crashpad/crashpad/+/HEAD/doc/overview_design.md) ·
[Ghostty's GTK rewrite](https://mitchellh.com/writing/ghostty-gtk-rewrite)

**Shipping, signing and distribution**
[Choose a distribution path (Windows)](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/choose-distribution-path) ·
[Code signing options](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/code-signing-options) ·
[Distribution feature status](https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/distribution-feature-status) ·
[Notarizing macOS software](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution) ·
[Customizing the notarization workflow](https://developer.apple.com/documentation/security/customizing-the-notarization-workflow) ·
[Flathub for app authors](https://docs.flathub.org/docs/for-app-authors/requirements) ·
[Sparkle](https://sparkle-project.org/) ·
[Tauri updater](https://v2.tauri.app/plugin/updater/) ·
[electron-builder](https://www.electron.build/)

**Platform change**
[Adopting Liquid Glass](https://developer.apple.com/documentation/TechnologyOverviews/adopting-liquid-glass) ·
[UIDesignRequiresCompatibility](https://developer.apple.com/documentation/BundleResources/Information-Property-List/UIDesignRequiresCompatibility) ·
[About Rosetta](https://developer.apple.com/documentation/apple-silicon/about-the-rosetta-translation-environment) ·
[GNOME X11 session removal FAQ](https://blogs.gnome.org/alatiera/2025/06/23/x11-session-removal-faq/) ·
[Electron goes Wayland-native](https://www.electronjs.org/blog/tech-talk-wayland) ·
[Windows 11 requirements](https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements) ·
[Extended Security Updates](https://learn.microsoft.com/en-us/windows/whats-new/extended-security-updates) ·
[Arm64EC](https://learn.microsoft.com/en-us/windows/arm/arm64ec)

**Accessibility and testing**
[UI Automation (Windows)](https://learn.microsoft.com/en-us/windows/win32/winauto/entry-uiauto-win32) ·
[NSAccessibility (Apple)](https://developer.apple.com/documentation/appkit/nsaccessibility) ·
[AT-SPI2](https://www.freedesktop.org/wiki/Accessibility/AT-SPI2/) ·
[Qt accessibility](https://doc.qt.io/qt-6/accessible.html) ·
[Directive (EU) 2019/882](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32019L0882) ·
[Electron automated testing](https://www.electronjs.org/docs/latest/tutorial/automated-testing) ·
[Playwright Electron (experimental)](https://playwright.dev/docs/api/class-electron)

**AI on the desktop**
[Microsoft Foundry on Windows — overview](https://learn.microsoft.com/en-us/windows/ai/overview) ·
[Windows ML GA](https://blogs.windows.com/windowsdeveloper/2025/09/23/windows-ml-is-generally-available-empowering-developers-to-scale-local-ai-across-windows-devices/) ·
[Foundry Local GA](https://devblogs.microsoft.com/foundry/foundry-local-ga/) ·
[Apple Foundation Models](https://developer.apple.com/documentation/foundationmodels) ·
[Apple's third-generation foundation models](https://machinelearning.apple.com/research/introducing-third-generation-of-apple-foundation-models) ·
[llama.cpp](https://github.com/ggml-org/llama.cpp) ·
[MCP joins the Agentic AI Foundation](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/) ·
[Windows On-device Agent Registry](https://learn.microsoft.com/en-us/windows/ai/mcp/overview) ·
[Windows agentic security](https://learn.microsoft.com/en-us/windows/security/book/operating-system-agentic-security)

**Evidence on AI-assisted development**
[METR's original RCT](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) ·
[METR's 2026 update walking it back](https://metr.org/blog/2026-02-24-uplift-update/) ·
[Anthropic: AI assistance and coding skills](https://www.anthropic.com/research/AI-assistance-coding-skills) ·
[DORA 2025](https://blog.google/innovation-and-ai/technology/developers-tools/dora-report-2025/) ·
[Stack Overflow 2025 — AI section](https://survey.stackoverflow.co/2025/ai) ·
[GitHub Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)

**Local-first**
[Ink & Switch](https://www.inkandswitch.com/local-first/) ·
[Automerge](https://automerge.org/) ·
[Yjs](https://github.com/yjs/yjs) ·
[Rocicorp Zero 1.0](https://www.infoq.com/news/2026/06/zero-version-1/) ·
[Turso](https://turso.tech/blog/we-are-a-year-into-rewriting-sqlite) ·
[FOSDEM 2026 local-first track](https://fosdem.org/2026/schedule/track/local-first/)

**Measurement, when you want to check a number yourself**
[Tauri benchmark results](https://tauri-apps.github.io/benchmark_results/) and [its methodology](https://github.com/tauri-apps/benchmark_results) ·
[the issue disputing its memory metric](https://github.com/tauri-apps/tauri/issues/5889) ·
[Flathub statistics](https://flathub.org/statistics) ·
[Open Hub](https://openhub.net/) *(read §5.8 first)* ·
[StatCounter Windows version share](https://gs.statcounter.com/os-version-market-share/windows/desktop/worldwide) ·
[Stack Overflow 2024 framework data](https://survey.stackoverflow.co/2024/technology) *(the last year the question was asked)*

---

## Verification status — read before quoting this anywhere

**This report was compiled from primary sources (see Method below), but an
independent re-check of its load-bearing claims could not be completed**: the
session's web-search budget was exhausted during the research pass, and the fetch
proxy was rate-limited when the verification pass ran. Every claim below was read
from a primary source once, by the pass that wrote it. None was read twice.

That is not good enough for anything student-facing. Before any of this reaches
`content/`, re-check at minimum:

| # | Claim | Why it is on this list |
| --- | --- | --- |
| 1 | Windows 10 **consumer** ESU extended to **2027-10-12** (§7.1) | Earlier guidance said October 2026. This is a 2026 change and the most likely single error in the report. |
| 2 | Canonical leads the **whole** Flutter Desktop roadmap incl. Windows and macOS embedders (§1, §2.2) | Quoted verbatim from Google's release post, but it is a large escalation over the earlier Linux-only partnership. |
| 3 | Impeller became default on **macOS** in 3.47 (§2.2) | macOS may have flipped in an earlier release; the wording here has been softened but not verified. |
| 4 | The Anthropic learning-RCT URL (§8.4) | Unusual capitalisation for anthropic.com/research; confirm it resolves. |
| 5 | Every version number in §2 | Registry-sourced on 2026-08-29 and **guaranteed to rot**. Re-query before teaching, never re-quote. |
| 6 | Anything in §6 about signing prices and eligibility | Microsoft's own docs contradict each other on Artifact Signing geography; prices are partly masked. |

Everything already marked **TO CONFIRM** (§10.4) or listed in §11 is *known* to be
unverified and is separate from the list above.

## Method

Compiled 2026-08-29. Framework versions come from package registries queried directly
— crates.io, npm, PyPI, NuGet — and from official release pages, not from summaries.
Application stacks were verified from the projects' own `package.json`, `Cargo.toml`,
`CMakeLists.txt` and `.npmrc` where those exist, and from first-party engineering
posts otherwise. Size, contributor and test figures in §5 were measured directly from
shallow clones on the same date, counting non-blank lines in recognised source
extensions with vendored directories excluded; inline test blocks (`test "…"`,
`#[cfg(test)]`) are counted alongside test directories. Install sizes come from
Flathub's own OSTree metadata, which is the most uniform public cross-stack
measurement available. Where a claim rests on a vendor's own marketing, it is labelled
as such. Where no rigorous public measurement exists, the report says so rather than
citing one that does not deserve the weight.

## Changelog

| Date | Change |
| --- | --- |
| 2026-08-29 | v1.0 — first version. Research pass complete; **independent verification pass incomplete** (see Verification status). |
