# Research 04 — Building mobile apps in 2026: the state of the field, by size of app

| | |
| --- | --- |
| Written | 2026-08-29 |
| For | Course structure v1.0 — *Aplikacje desktopowe i mobilne* |
| Status | **Research notes.** Repo-facing English (Article III). Not course content, not law. |
| Question asked | What does building a mobile app actually look like right now — and how does the answer change with the size of the app? |
| Feeds | `course-structure-v1.md` — **Moduł 4a** (what a mobile app is), **4b/4c** (the stack decision), **Moduł 7** (desktop → phone), **Moduł 9** (release) |
| Sibling of | ★ [`research-03-building-desktop-apps.md`](research-03-building-desktop-apps.md) — the desktop half of the same question, same shape, written the same day. **Read them as a pair.** |
| Relation to 02 | [`research-02`](research-02-stack-tooling-constraints.md) holds the .NET framework comparison and the lab constraint. **This file does not redo it**, and sharpens it in three marked places. |

> **ADR-0008 applies throughout.** Every checkable assertion below carries a link
> and the date it was checked. Where a claim could not be sourced, it is not made —
> and the gap is named instead. Vendor-published numbers are labelled as vendor
> claims, because in this field most of the available writing was produced by
> someone selling a framework.
>
> **Article V applies too.** Nothing here asserts anything about the school, the
> lab, the timetable or the INF.04 scope. Where the course would need such a fact,
> it is marked **TO CONFIRM**.

---

## Framing: what this document is, and what it is not

Three notes before the argument starts.

**This is a snapshot, not a history.** Two deep-research briefs sit unrun in
[`docs/_prompts/`](../_prompts/) — `research-03-desktop-app-history.md` and
`research-04-mobile-app-history.md` — which cover *how mobile development got here*
across 1996–2026, weighted 60 % toward programming languages. This file deliberately
does not do that job. It answers a different question: **what is true today, on
2026-08-29, for someone about to start.** Where history is needed to explain a
present-day constraint, it appears in one sentence, not one section.

**It is the mobile half of a pair.** `research-03-building-desktop-apps.md` was
written the same day and asks exactly this question about the desktop. Where it has
already made an argument — on why published framework benchmarks are untrustworthy,
on how size changes the answer, on on-device AI, on the evidence for AI-assisted
development — **this file cites it rather than remaking it**, and says so at the
point of use. Where the two disagree, the disagreement is stated. One such
disagreement matters for a lesson and is recorded in *What this means for the
course*.

**It does not redo `research-02` §2.** The .NET MAUI / Avalonia / Uno comparison,
the Linux-lab constraint and the .NET version choice are settled there. This file
adds the wider mobile context those choices sit inside — and, in three places,
**corrects or sharpens something `research-02` says**. Those places are marked
**⚠ updates `research-02`**.

**The organising idea is size, because the user of this research asked for it —
and because it turns out to be the right frame anyway.** The argument the evidence
supports is this:

> **In 2026 the mobile platforms impose a fixed floor of obligatory work that costs
> roughly the same whether one person or two hundred are doing it.** A solo
> developer and a large company face the same target-API deadline, the same SDK
> mandate, the same review queue, the same privacy declarations, the same crash-rate
> threshold. Below that floor there is no such thing as a "small" mobile app in the
> sense that there are small desktop apps. **Size does not change the floor. It
> changes which problem above the floor is the one that hurts.**

That is the spine. Parts B, C and D take the three different things "size" can
mean — the size of the *team*, the size of the *binary*, and the size of the
*problem* — and show what each one actually changes.

---

## 1. One table: the floor, and what it costs to stand on it

Every app in the stores, at every size, satisfies all of this. Dates are the ones
that matter for a course starting 2026-09-01.

| Obligation | The rule right now | Deadline | Source |
| --- | --- | --- | --- |
| **Android target API** | New apps *and updates* must target API 36 (Android 16); existing apps need API 35 to stay visible to new users on newer devices | **2026-08-31**, extension to 2026-11-01 | [Play target API requirements](https://developer.android.com/google/play/requirements/target-sdk) |
| **iOS build SDK** | Every new submission *and update* must be built with the iOS 26 SDK (Xcode 26+) | **2026-04-28 — already in force** | [Apple developer news](https://developer.apple.com/news/?id=ueeok6yw) |
| **Android 16 KB pages** | Native libraries must be 16 KB-aligned or updates are blocked | **2027-02-01** | [Support 16 KB page sizes](https://developer.android.com/guide/practices/page-sizes) |
| **Crash rate** | ≥ 1.09 % user-perceived crashes (or ≥ 8 % on one phone model) hurts store visibility | continuous | [Android vitals](https://developer.android.com/topic/performance/vitals) |
| **ANR rate** | ≥ 0.47 % user-perceived ANRs (≥ 8 % per phone model) | continuous | [Android vitals](https://developer.android.com/topic/performance/vitals) |
| **Memory / DEX vitals** | RSS+swap caps by RAM tier; apps with > 10 MB DEX must hold ≥ 25 % AOT optimisation | **from 2027-02** | [Android vitals](https://developer.android.com/topic/performance/vitals) |
| **Apple privacy manifest** | App *and every third-party SDK* must declare an approved reason for each "required reason" API | in force since 2024-05-01 | [Apple news](https://developer.apple.com/news/?id=3d8a9yyh) |
| **Play Data safety** | Mandatory disclosure form for every listing, including apps that collect nothing | continuous | [Play Data safety](https://support.google.com/googleplay/android-developer/answer/10787469) |
| **New personal Play account** | Closed test with **≥ 12 testers opted in continuously for ≥ 14 days** before production access | continuous, for accounts made after 2023-11-13 | [Play Console requirement](https://support.google.com/googleplay/android-developer/answer/14151465) |
| **Android developer verification** | Identity-verified developer required for installs from participating stores | **2026-09-30**, in BR / ID / SG / TH first | [Developer verification guide](https://developer.android.com/developer-verification/guides) |

*All rows checked 2026-08-29.*

Read the table as a calendar rather than a checklist. **Four of those eleven rows
have a hard date inside the school year**, and two of them fall inside the first
fortnight of it. That property — the platform sets deadlines you did not agree to —
is the single cleanest difference between mobile and desktop development, and it
is the thing to build Moduł 4a around.

> **⚠ updates `research-02`.** §5.1 lists the routes onto a phone (direct APK,
> $25 Play account, free limited account capped at 20 devices, Firebase App
> Distribution) and is correct. What it does not mention is the **12-testers /
> 14-days closed-test gate** on new personal Play accounts. For a class, that is not
> a footnote: it means a student who registers a personal Play account in, say,
> April cannot reach production before roughly the end of the school year without
> organising twelve testers first. It reinforces `research-02`'s own recommendation
> — Firebase App Distribution for the class, the Play account as the story of what a
> real release costs.

**Further reading — the floor.**
[Play policy announcement archive](https://support.google.com/googleplay/android-developer/announcements/13412212) — dated feed of every Play policy change, the fastest way to see the cadence (roughly every one to four months, each with a ≥ 30-day grace period).
[Apple developer news and updates](https://developer.apple.com/news/) — where the SDK mandates and guideline changes appear first.
[Android vitals overview](https://developer.android.com/topic/performance/vitals) — the actual numeric thresholds, in one page, with the February 2027 additions already published.

---

# Part A — The platform floor

## A1. Both platform owners have now picked your UI toolkit

The structural fact that separates mobile from desktop is that the platform owner
can decide what you write in. In 2026 both of them have exercised it, but with
strikingly different bluntness.

**Google has been explicit.** In May 2026 Android declared UI development
"Compose First" and put the View system into **maintenance mode** — the wording on
Google's own page is that the View toolkit "will only receive highly critical
fixes", that "any new Android Studio UI tools will be built for Jetpack Compose
only", and that 24-plus View-based Jetpack libraries (Fragment, RecyclerView,
Navigation, ConstraintLayout, ViewPager among them) are likewise complete and
receiving critical bugfixes only
([developer.android.com/develop/ui/compose/first](https://developer.android.com/develop/ui/compose/first),
checked 2026-08-29; announced at
[android-developers.googleblog.com](https://android-developers.googleblog.com/2026/05/android-ui-development-is-compose-first.html)).
Google states it does not plan to remove the View classes. It does not need to:
declaring the tooling one-sided is enough.

**Apple has not made an equivalent statement.** Searching Apple's own developer
site turns up abundant SwiftUI material — the WWDC26 SwiftUI guide, the full
[UIKit-integration documentation](https://developer.apple.com/documentation/swiftui/uikit-integration)
showing both directions of embedding (checked 2026-08-29) — but **no page saying
"use SwiftUI, not UIKit"** and no published list of where SwiftUI is still weak.
Every source that argues that case is third-party. **Confidence: this is a sourced
absence, not a gap in the search.** It is worth teaching as a contrast: Google
published a policy, Apple published a direction of travel and let people infer it.

The practical consequence for anyone choosing a stack in 2026 is that **the
declarative-UI question is closed on Android and merely settled-in-practice on
iOS.** Jetpack Compose is currently at the `2026.08.00` BOM ("Compose 1.12 across
core modules",
[developer.android.com/develop/ui/compose/bom](https://developer.android.com/develop/ui/compose/bom),
checked 2026-08-29). Strong skipping — the change that removed most of the manual
`@Stable` annotation work — has been on by default since Kotlin 2.0.20
([stability/strongskipping](https://developer.android.com/develop/ui/compose/performance/stability/strongskipping),
checked 2026-08-29).

*(Google's August 2026 release notes claim a keyed `SideEffect` overload is "up to
90 % faster than `LaunchedEffect`" and that Compose now reaches "Time to Initial
Display comparable to Views" — **both are Google-published benchmark claims,
unverified here**;
[android-developers.googleblog.com](https://android-developers.googleblog.com/2026/08/jetpack-compose-august-2026-release.html),
checked 2026-08-29.)*

**Further reading — the UI toolkit question.**
[Compose First](https://developer.android.com/develop/ui/compose/first) — read the list of libraries put into maintenance; it is more informative than the headline.
[SwiftUI ↔ UIKit integration](https://developer.apple.com/documentation/swiftui/uikit-integration) — Apple's answer to "must I choose?", which is: no, and here are six ways not to.

## A2. The compliance treadmill: a calendar you do not control

Desktop software can be finished. Mobile software cannot, and the mechanism is
worth being precise about rather than gesturing at.

Google Play's target API rule is the clearest example. As of **2026-08-31**, new
apps *and updates* must target API 36, and — the part people miss — **existing,
already-published apps** must target at least API 35 or they become invisible to
new users on devices running newer Android than the app targets
([target-sdk requirements](https://developer.android.com/google/play/requirements/target-sdk),
checked 2026-08-29, quoting the page directly). An app nobody has touched for two
years does not merely stagnate; it disappears from the store for most of the people
who might install it. There is an extension route to 2026-11-01, requested in Play
Console.

Apple runs the same treadmill on a different track. Since **2026-04-28**, every
new submission and every update must be built with the iOS 26 SDK, i.e. Xcode 26 or
later ([developer.apple.com/news](https://developer.apple.com/news/?id=ueeok6yw),
checked 2026-08-29). That deadline has passed, which means every actively
maintained App Store app is now necessarily on an Xcode 26+ toolchain — and Xcode 27
(currently in beta) **drops Intel Mac support entirely**, so the next round of this
will also be a hardware deadline for some teams (reported at
[mjtsai.com](https://mjtsai.com/blog/2026/06/09/xcode-27-announced/), SECONDARY,
checked 2026-08-29).

A third instance, and the most expensive one for anyone shipping native code:
Android's 16 KB memory page requirement. Google's own page now states plainly:
*"Starting February 1, 2027, if your app updates don't support 16 KB memory page
sizes, you won't be able to release these updates"*
([page-sizes](https://developer.android.com/guide/practices/page-sizes), checked
2026-08-29). **The date on this one has moved more than once**, which is itself the
lesson: a platform deadline is a real constraint and a moving one, and the correct
response is to check the page rather than to remember the number.

**This is the mobile-specific cost that has no desktop equivalent**, and it is
size-invariant. A one-screen app and a two-hundred-engineer app both owe the
platform the same migrations on the same days. What differs is who absorbs the cost:
a large team has a platform group whose job this is; a solo developer spends a
weekend of the only development time they have.

**Further reading — the treadmill.**
[Android 17 behaviour changes](https://developer.android.com/about/versions/17/changes/ff-restrictions-ignored) — for apps targeting API 37+, orientation and aspect-ratio restrictions are simply ignored on screens ≥ 600 dp (games excepted): a forced adaptive-layout migration, published in advance.
[AGP roadmap](https://developer.android.com/build/releases/gradle-plugin-roadmap) — Google's own migration map from the eager `applicationVariants` API to `androidComponents { onVariants }`, which becomes mandatory in AGP 10.

## A3. The store is still the gate — but the gate is now regional

The single largest change in mobile distribution since the last time anyone wrote a
syllabus is that **there is no longer one answer to "what does the store charge?"**
The answer is now a function of where the user is, which regulator won which case,
and what month it is.

**Apple, EU.** On 2026-08-18 Apple announced a restructuring effective
**2026-10-01**: EU App Store commission drops from 30 % to **26 %** with Apple's own
IAP (15 % for qualifying small developers); **20 %/10 %** with alternative payment
processing; **15 %/10 %** when linking out to the web; and the per-install **Core
Technology Fee is abolished**, replaced by a flat **5 % Core Technology Commission**
on digital transactions in apps distributed outside the App Store
([Apple Newsroom](https://www.apple.com/newsroom/2026/08/apple-announces-changes-for-apps-in-the-european-union/),
checked 2026-08-29, quoted directly). **Note the state of the record:** as of the
date of this file, Apple's own
[DMA compliance page](https://developer.apple.com/support/dma-and-apps-in-the-eu/)
still describes the *pre-October* terms (checked 2026-08-29). Two Apple pages
disagree because one describes today and the other describes 1 October. That is
normal in this field and a good thing to show students once.

**Apple, worldwide.** Standard terms remain 30 % / 15 % after year one on
subscriptions — this is the binding legal text in Schedule 2 §3.4(a), version 126,
dated 2025-12-17
([Schedule 2 and 3 PDF](https://developer.apple.com/support/downloads/terms/schedules/Schedule-2-and-3-English.pdf),
checked 2026-08-29) — with 15 % under the
[Small Business Program](https://developer.apple.com/app-store/small-business-program/)
for developers under $1 M prior-year proceeds.

**Apple, United States: genuinely unresolved.** Following the 2025 contempt
finding in *Epic v. Apple*, Apple is currently charging **0 %** on external
link-out purchases in the US while the District Court determines a lawful rate;
Justice Kagan declined to pause those proceedings in August 2026
([Courthouse News](https://www.courthousenews.com/apples-fight-over-commissions-for-linked-out-app-store-purchases-continues-in-federal-court/),
SECONDARY, checked 2026-08-29). Apple has proposed 15 % / 10 % / 5 % tiers. **No
final US rate exists.** Anything taught about it in September 2026 must be taught as
pending, with the docket named, not as a number.

**Google Play.** Since **2026-06-30** in the US, UK and EEA: **10 % service fee +
5 % billing fee** on auto-renewing subscriptions and on the first $1 M of annual
earnings; 20 %+5 % or 15 %+5 % under the Level Up / Experience programmes for new
installs; the 5 % billing fee is **zero** when using alternative billing or an
external web purchase
([service fee page](https://support.google.com/googleplay/android-developer/answer/112622),
[rollout schedule](https://support.google.com/googleplay/android-developer/answer/16954621),
both checked 2026-08-29). The rest of the world is on a staged schedule —
Australia and Japan from **2026-09-30**, South Korea from **2026-12-31**, everywhere
else not until **2027-09-30**. Poland is in the EEA, so **the EEA rates are the ones
that describe a Polish developer's situation** — though a course should not turn
that into advice.

**And rival stores are now inside Play.** Since 2026-07-22, following the *Epic v.
Google* remedies, third-party Android app stores appear inside the Google Play app
for US users, with a Play Catalog Access Program (enrolled stores pay $5,000/year,
must operate in the US, must keep malware install rates under 1 %)
([Play catalog access](https://support.google.com/googleplay/android-developer/answer/17117200),
checked 2026-08-29). The caveat matters more than the headline: **every install
still routes through Google's own inline-install API and Play Protect scanning, at
Google's fee rates** (reported at
[TechTimes](https://www.techtimes.com/articles/321269/20260722/google-play-now-hosts-rival-android-stores-still-controls-every-download.htm),
SECONDARY, checked 2026-08-29).

**Does any of it get used?** The one piece of measured evidence found is an Ipsos
survey of 3,500 consumers across seven EU countries (July 2025) reporting that
**over 60 % had not noticed** that alternative installation existed at all, published
by ECIPE — a Brussels think tank with a discernible policy lean, so treat the
framing as advocacy and the underlying survey as reasonable
([ecipe.org](https://ecipe.org/publications/consumer-response-to-the-digital-markets-act/),
SECONDARY, checked 2026-08-29). No Apple- or EU-published usage figures for
alternative marketplaces could be found. **Confidence: low, and the absence is the
finding** — two years of regulatory upheaval have produced very little public data
on whether users care.

**Further reading — the gate.**
[EU DMA case tracker](https://digital-markets-act.ec.europa.eu/) — the Commission's own record, including the €500 M Apple anti-steering decision of 2025-04-23.
[App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) — worth reading once end to end; §2.5.2 (no downloading executable code) is the rule that governs every over-the-air update scheme in Part E.
[Play Console: how rival stores are listed](https://support.google.com/googleplay/android-developer/answer/17117200) — the mechanics of a remedy actually being implemented, which is rarer than reporting about one.

## A4. Quality is measured by the platform, not by the team

Android publishes numeric thresholds and enforces them with store visibility. The
current "bad behaviour" lines are: **user-perceived crash rate 1.09 %** overall or
**8 %** on any single phone model; **user-perceived ANR rate 0.47 %** overall or
**8 %** per phone model; excessive partial wake locks **5 %**; excessive battery
**1 %**; bitmap memory 200 MB foreground / 400 MB cached; and RSS+swap caps by RAM
tier (a 6 GB device: 2.25 GB foreground, 1.25 GB background). Judgement is on a
**28-day rolling average**, with emerging issues flagged after 7 days — so a team
has roughly 21 days to fix something before it counts
([Android vitals](https://developer.android.com/topic/performance/vitals), checked
2026-08-29, figures quoted from the page).

Apple does the opposite. It ships the measurement APIs — MetricKit's
`MXAppLaunchMetric`, hitch-time metrics, the Xcode Organizer's crash and energy
reports ([MetricKit](https://developer.apple.com/documentation/metrickit), checked
2026-08-29) — and publishes qualitative guidance: the Human Interface Guidelines say
only that people "don't want to wait more than a couple of seconds"
([HIG: Launching](https://developer.apple.com/design/human-interface-guidelines/launching),
checked 2026-08-29). **There is no Apple equivalent of the vitals threshold table.**

That asymmetry is itself a teachable finding, and it is not a small one: on Android,
a quality bar is a published number that the store enforces against you; on iOS it
is a norm. A team shipping to both gets the worst of the arrangement — it must
satisfy Google's numbers and infer Apple's.


## A5. Privacy is a stage of shipping, not a policy document

Since **2024-05-01** an App Store submission fails unless the app *and every
third-party SDK it embeds* declares an approved reason for each "required reason"
API it calls ([Apple news](https://developer.apple.com/news/?id=3d8a9yyh);
mechanics in
[TN3183](https://developer.apple.com/documentation/technotes/tn3183-adding-required-reason-api-entries-to-your-privacy-manifest),
both checked 2026-08-29). The clause that changes engineering behaviour is *"and
every third-party SDK"*: a dependency you did not write can block your release. That
converts privacy from a legal review into a build-time dependency problem.

On the Android side, the Data safety form is mandatory for every listing — including
apps that collect nothing, which must still submit the form and a privacy-policy
link ([Play Data safety](https://support.google.com/googleplay/android-developer/answer/10787469),
checked 2026-08-29). Android 16 (API 36) also replaced `BODY_SENSORS` with granular
`android.permissions.health` permissions and added an opt-in **Local Network
Permission** gating LAN sockets
([Android 16 behaviour changes](https://developer.android.com/about/versions/16/behavior-changes-16),
checked 2026-08-29) — a good, small, concrete example of a permission model getting
finer-grained rather than looser.

Apple's App Tracking Transparency is still in force, and is being reworked in the EU
under pressure from Germany's Bundeskartellamt — reportedly eight changes to the
prompt including removing the word "track" and relabelling the buttons
([9to5Mac](https://9to5mac.com/2026/08/18/the-eight-changes-apple-is-making-to-app-tracking-transparency-in-europe/),
SECONDARY, checked 2026-08-29). **No effective date was sourced; do not assert one.**

**Further reading — privacy as a build step.**
[Privacy manifest files](https://developer.apple.com/documentation/bundleresources/privacy-manifest-files) — the file format itself; short, and it makes the SDK-dependency problem obvious.
[Android privacy and security in 2026](https://blog.google/security/whats-new-in-android-security-privacy-2026/) — Google's own preview of the Android 17 restrictions (accessibility-service scope, one-time location, SMS OTP hiding), i.e. next year's work, published now.

---

# Part B — Size axis 1: the team and the project

This is the axis most people mean by "different sizes of app". The claim of this
section is that the tiers differ **less in what they must do** (Part A is the same
for everyone) **and more in what they can afford to do about it**.

## B1. Solo — one person, one app

**What it costs to exist.** Apple Developer Program **$99/year**
([developer.apple.com/programs](https://developer.apple.com/programs/)); Google Play
registration **$25 one-time**
([Play Console registration](https://support.google.com/googleplay/android-developer/answer/6112435));
both checked 2026-08-29. Android also now offers a free **Limited Distribution**
account with no identity check, capped at 20 devices — explicitly aimed at students
and hobbyists
([verification FAQ](https://developer.android.com/developer-verification/guides/faq),
checked 2026-08-29), which is exactly the tier `research-02` §5.1 recommends for a
classroom.

**What CI costs at this tier: plausibly nothing.** Expo EAS Build's free tier gives
15 Android + 15 iOS builds a month
([expo.dev/pricing](https://expo.dev/pricing)); Codemagic's free plan gives 500
minutes a month on macOS M2 runners
([docs.codemagic.io/billing/pricing](https://docs.codemagic.io/billing/pricing/));
Xcode Cloud includes **25 compute hours a month** with any Apple Developer Program
membership ([developer.apple.com/xcode-cloud](https://developer.apple.com/xcode-cloud/));
GitHub Actions gives 2,000 free minutes a month on the free plan and is free
entirely on public repositories, though **macOS runners bill at $0.062/minute**,
roughly ten times a Linux runner
([GitHub Actions billing](https://docs.github.com/en/billing/managing-billing-for-your-products/managing-billing-for-github-actions/about-billing-for-github-actions)).
All checked 2026-08-29. **For a course, the relevant one is the
[GitHub Student Developer Pack](https://github.com/education/students)**, which
gives verified students GitHub Pro with 3,000 Actions minutes a month (checked
2026-08-29) — **TO CONFIRM** whether this school's students can complete GitHub's
verification, since it is an identity process, not a switch.

**Crash reporting is free.** Firebase Crashlytics is listed as *No-cost* on both the
Spark and Blaze plans ([firebase.google.com/pricing](https://firebase.google.com/pricing),
checked 2026-08-29). Sentry's Developer tier is $0 for one user and 5,000
errors/month ([sentry.io/pricing](https://sentry.io/pricing/), checked 2026-08-29).

**So what actually hurts a solo developer?** Not money — the whole apparatus above
costs $124 in year one. It is **Part A**. The target-API migration, the SDK mandate,
the 16 KB rebuild, the privacy manifest for every dependency, the review rejection,
the 12-testers gate. Each is a fixed cost, none of them scales down, and together
they consume a meaningful share of the only resource a solo developer has. **This is
the honest answer to "can one person still ship a mobile app in 2026": yes, and the
hard part is not the code.**

One more thing worth knowing at this tier: Apple tightened Guideline 4.3(b) on
**2026-06-09** against "mediocre, low-quality, or low-effort" apps that "do not add
value", naming dating, flashlight, sound-effect, wallpaper, simple-timer,
fortune-telling and novelty apps specifically, with repeated submissions risking
Developer Program removal
([9to5Mac](https://9to5mac.com/2026/06/09/apple-tightens-app-review-guidelines-against-apps-that-do-not-add-value-to-the-app-store/),
SECONDARY, checked 2026-08-29; the
[Guidelines](https://developer.apple.com/app-store/review/guidelines/) themselves are
the PRIMARY text). The class of app a beginner most naturally builds first is now the
class of app Apple is most explicitly filtering.

## B2. Small team — a product, two to eight people

The first tier where the constraint stops being time and starts being **coordination
plus cash burn**. Three things change:

**A second concurrency becomes worth paying for.** Bitrise Starter is from $89/month
annually with three concurrent builds
([bitrise.io/pricing](https://bitrise.io/pricing)); Expo's Production plan is
$199/month with two concurrent builds
([expo.dev/pricing](https://expo.dev/pricing)); Codemagic pay-as-you-go is
$0.095/minute on macOS M2 (same page as above). All checked 2026-08-29. The number
to watch is not the monthly fee but **macOS minutes**, which are the expensive
resource on every platform in this list.

**Real devices become unavoidable.** Firebase Test Lab is $1/hour per virtual device
and **$5/hour per physical device** on Blaze, with a free Spark tier of 10 virtual /
5 physical runs a day
([Test Lab pricing](https://firebase.google.com/docs/test-lab/usage-quotas-pricing));
AWS Device Farm is $0.17/device-minute with 1,000 free minutes once
([AWS pricing](https://aws.amazon.com/device-farm/pricing)); BrowserStack App
Automate starts at $199/month for one parallel test
([browserstack.com/pricing](https://www.browserstack.com/pricing)); Sauce Labs' Real
Device Cloud is $199/month annually
([saucelabs.com/pricing](https://saucelabs.com/pricing)). All checked 2026-08-29.
**Roughly $200/month is the entry price for automated testing on real hardware**,
which is why so many small teams do not do it.

**Release becomes a process rather than an event.** TestFlight allows 100 internal
and 10,000 external testers, with builds expiring after 90 days
([TestFlight overview](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/));
Play's tracks allow 100 internal testers, closed lists of 2,000 each up to 50 lists,
and unlimited open testing
([Play testing tracks](https://support.google.com/googleplay/android-developer/answer/9845334)).
Both checked 2026-08-29.

## B3. Mid-size — a product organisation, tens of engineers

The defining problem here is that **you cannot patch a shipped binary**, and the
whole tier is organised around that fact.

The mitigations are all first-party and all documented. Play **staged rollouts**
release to a chosen percentage of randomly selected users and can be halted — and,
since a 2026 change, **a release already at 100 % can be halted**, with the previous
version automatically substituted back in
([halting a full rollout](https://support.google.com/googleplay/android-developer/answer/16285429),
checked 2026-08-29). Apple's **phased release** runs a fixed seven-day ramp — 1 %,
2 %, 5 %, 10 %, 20 %, 50 %, 100 % — of automatic-update-eligible users, pausable for
up to 30 cumulative days
([phased release](https://developer.apple.com/help/app-store-connect/update-your-app/release-a-version-update-in-phases/),
checked 2026-08-29). Play's **in-app updates API** offers a *flexible* (background)
and an *immediate* (blocking) flow
([in-app updates](https://developer.android.com/guide/playcore/in-app-updates),
checked 2026-08-29).

Remote config and feature flags exist for the same reason — and one of them just
changed price. **Firebase Remote Config leaves free-forever pricing on
2026-09-01**: free to 100,000 fetches/day, then $0.06 per 10,000 requests up to
10 M/day ([Remote Config pricing](https://firebase.google.com/docs/remote-config/pricing),
checked 2026-08-29). LaunchDarkly's Developer tier is $0 forever with unlimited
seats and 1,000 client-side MAU
([launchdarkly.com/pricing](https://launchdarkly.com/pricing/), checked 2026-08-29).

**The over-the-air update question deserves precision, because it is widely
misstated.** Apple's Guideline **2.5.2** forbids an app to "download, install, or
execute code which introduces or changes features or functionality of the app"
([App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)).
Google Play's Device and Network Abuse policy says an app "may not download
executable code … from a source other than Google Play" — **except** code running in
"a virtual machine or an interpreter where either provides indirect access to
Android APIs (such as JavaScript in a webview or browser)"
([Device and Network Abuse](https://support.google.com/googleplay/android-developer/answer/16559646)).
Both checked 2026-08-29. **That interpreter exception is the entire legal basis of
the React Native / Expo / Cordova over-the-air update ecosystem.** Meanwhile
Microsoft's CodePush is gone: App Center was retired 2025-03-31 and the repository
was archived 2025-05-20
([microsoft/react-native-code-push](https://github.com/microsoft/react-native-code-push),
checked 2026-08-29).

## B4. Large scale — build times, modularity, and a platform team

At this tier the app itself stops being the bottleneck and **the build** becomes it.
Google's own [modularization guide](https://developer.android.com/topic/modularization)
(checked 2026-08-29) documents the reasoning — reusability, encapsulation,
ownership, incremental and parallel builds — but publishes **no numbers**. Play
Feature Delivery does publish one useful ceiling: installing "50 or more feature
modules on a single device … might lead to performance issues", with a recommendation
of ten or fewer install-time-removable modules
([feature delivery](https://developer.android.com/guide/playcore/feature-delivery),
checked 2026-08-29).

**Here the evidence is genuinely thin, and saying so is part of the finding.**
Searching for a 2024–2026 engineering post from a large consumer-app team with
concrete modularization build-time or app-size metrics turned up nothing citable.
The two real examples found both predate the window: Reddit's Android platform team
reported a *"46.4 % total file count reduction and 54.3 % total line count
reduction"* in its monolithic `:app` module
([r/RedditEng](https://www.reddit.com/r/RedditEng/comments/vwrrrf/android_modularization/),
VENDOR, ~2022), and Yelp reported single-module change builds falling from roughly
47 s to about 12 s after modularization
([Yelp Engineering](https://engineeringblog.yelp.com/2018/06/how-yelp-modularized-the-android-app.html),
VENDOR, 2018). Both checked 2026-08-29. **Confidence: the practice is
well-documented; the payoff at 2026 scale is not publicly quantified.** Anyone
repeating a "modularization cut our build by N %" figure should be asked for the
post.

One 2024–2026 case that *is* solid: Shopify's engineering blog states *"over the
past 5 years, we have migrated all our apps to React Native"*, reporting sub-500 ms
P75 screen loads and >99.9 % crash-free sessions — while explicitly cautioning that
*"100 % React Native should be an anti-goal"*
([shopify.engineering](https://shopify.engineering/five-years-of-react-native-at-shopify),
2025-01-13, VENDOR — it is Shopify's own account of Shopify's decision, checked
2026-08-29). That last clause is the more valuable half of the post.

## B5. What actually changes across the tiers

| | Solo | Small team | Mid-size | Large |
| --- | --- | --- | --- | --- |
| **Binding constraint** | the developer's own hours | macOS CI minutes and cash | you cannot patch a shipped binary | build time and coordination |
| **Money per month** | ~$0–10 | ~$100–500 | thousands | a platform team's salaries |
| **Testing** | the developer's own phone | emulators + a shared device or two | device farm, screenshot tests | device lab, staged rollout as a test |
| **Release** | when it is ready | when it is ready | release train, staged rollout | release train, feature flags, kill switches |
| **Part A obligations** | **identical** | **identical** | **identical** | **identical** |
| **Who absorbs Part A** | the only developer | whoever is free | a designated owner | a platform team |

The bottom two rows are the argument of this whole part.

**Compare with the desktop.** [`research-03`](research-03-building-desktop-apps.md)
§5 runs the same exercise for desktop applications and arrives at five tiers rather
than four, with a section (§5.4) on the two things that *do not* scale with size.
**The structural difference between the two documents is the one worth teaching:**
on the desktop, the small tier is genuinely small — the obligations mostly appear as
the app grows. On mobile they are present at tier one. That contrast is Part A of
this file and §5.9 of that one, and it is the sharpest version of "what is different
about mobile" available anywhere in this repo.

---

# Part C — Size axis 2: the technical footprint

The second meaning of "size": how many bytes, how much memory, how many
milliseconds. This axis is **weakly correlated with team size** — a solo developer
shipping a game hits these limits; a large company shipping an internal tool does
not.

## C1. The hard limits, as published

**Google Play.** An app bundle without Play Feature or Asset Delivery is limited to
a **200 MB compressed download**
([reduce-apk-size](https://developer.android.com/topic/performance/reduce-apk-size);
[Play limits](https://support.google.com/googleplay/android-developer/answer/9859152)).
With the delivery machinery: base module 500 MB, each feature module 500 MB, each
asset pack 1.5 GB, cumulative install-time total 4 GB, on-demand asset packs 30 GB,
**maximum total 34 GB**, at most 100 asset packs
([bundle size limits](https://support.google.com/googleplay/android-developer/answer/9859372)).
Apps over 200 MB trigger a non-blocking large-download warning to the user. All
checked 2026-08-29.

**Apple.** Maximum uncompressed app size is **4 GB** on iOS/iPadOS/tvOS/visionOS,
200 GB on macOS, 75 MB on watchOS; the `__TEXT` executable limit is 500 MB total
across all sections on iOS 9+; App Clips are capped at 100 MB on iOS 17+
([maximum build file sizes](https://developer.apple.com/help/app-store-connect/reference/maximum-build-file-sizes),
checked 2026-08-29).

**The cellular download limit is a good example of a fact that has rotted.** Apple
raised it from 100 MB to 150 MB in 2017
([Apple news](https://developer.apple.com/news/?id=09192017b), PRIMARY) and to
200 MB in 2019 (reported at
[9to5Mac](https://9to5mac.com/2019/05/31/apple-iphone-cellular-limit-increased/),
SECONDARY — no Apple-authored announcement of the second increase was found). Since
iOS 13 the user can set *Always Allow* and remove the cap for their own device.
Apple's current documentation describes the limit conceptually — *"the App Store
limits the size of the apps they can install over a mobile connection"* — but
**states no number**
([reducing-your-app-s-size](https://developer.apple.com/documentation/xcode/reducing-your-app-s-size),
checked 2026-08-29). **Confidence: do not assert a current figure.** The best
defensible statement is "roughly 200 MB, per 2019 reporting, and user-overridable."

**The 64K method limit is effectively dead.** The 65,536 method-reference ceiling per
DEX file is real, but multidex has been automatic since API 21, so it constrains
only apps supporting API ≤ 20
([multidex](https://developer.android.com/build/multidex), checked 2026-08-29 — the
page itself was last updated 2026-08-14). Worth a sentence of history and no more.

## C2. The machinery for getting under the limits

Android: **R8** code and resource shrinking, where Google documents *"measured
improvements of over 50 % in app size"* for apps sharing substantial code across
form-factor variants ([shrink-code](https://developer.android.com/build/shrink-code),
PRIMARY but a Google-published measurement, checked 2026-08-29); **Play Feature
Delivery** for install-time, conditional, on-demand and instant modules; **Play Asset
Delivery** for games above 200 MB
([asset delivery](https://developer.android.com/guide/playcore/asset-delivery)).
**Baseline profiles** are the speed side of the same tooling: Google states they
*"improve code execution speed by about 30 % from the first launch"*, with the
compiled `baseline.prof` required to stay under 1.5 MB
([baseline profiles](https://developer.android.com/topic/performance/baselineprofiles/overview),
VENDOR measurement, checked 2026-08-29).

iOS: **app thinning / slicing** so the delivered bundle carries only what the target
device needs, plus **On-Demand Resources** for assets excluded from the initial
install ([advanced optimization](https://developer.apple.com/documentation/xcode/doing-advanced-optimization-to-further-reduce-your-app-s-size),
checked 2026-08-29). Apple publishes no blanket percentage; its worked example shows
one app at *"6.7 MB compressed, 18.6 MB uncompressed"*.

## C3. Does size actually matter? The evidence is real, and nine years old

The number everyone quotes comes from one place: Sam Tolomei of the Google Play team,
*Shrinking APKs, growing installs*, **2017-11-20** — *"For every 6 MB increase to an
APK's size, we see a decrease in the install conversion rate of 1 %"*
([medium.com/googleplaydev](https://medium.com/googleplaydev/shrinking-apks-growing-installs-5d3fcba23ce2),
VENDOR, checked 2026-08-29). The same post reports a ~10 MB app converting ~30 %
better than a 100 MB one, and much stronger size sensitivity in India and Indonesia
than in developed markets.

**No newer Google-published refresh of that statistic could be found.** It is
therefore a nine-year-old vendor figure, from before app bundles were mandatory,
still being cited as current across the industry. **That is worth teaching as a
worked example of how a number becomes folklore** — the finding is not that the
number is wrong, but that nobody has re-measured it in public and everybody repeats
it anyway.

## C4. Startup and runtime budgets

Android publishes exact numbers: a **cold start ≥ 5 s**, warm ≥ 2 s or hot ≥ 1.5 s
counts as excessive
([launch-time vitals](https://developer.android.com/topic/performance/vitals/launch-time));
a frame is slow above the **16 ms** budget at 60 fps (11 ms at 90, 8 ms at 120) and
**frozen above 700 ms**
([render vitals](https://developer.android.com/topic/performance/vitals/render));
an app becomes ANR-eligible after **5 s** of main-thread unresponsiveness. All
checked 2026-08-29.

Apple, again, publishes tooling rather than thresholds. Its watchdog documentation
shows a worked crash-log example of a foreground scene-create transgression at
*"exhausted real (wall clock) time allowance of 19.97 seconds"*
([addressing watchdog terminations](https://developer.apple.com/documentation/xcode/addressing-watchdog-terminations),
checked 2026-08-29) — but that is an illustrative sample in a document about reading
crash reports, **not a stated policy limit**, and should not be quoted as "iOS gives
you 20 seconds".

## C5. What a framework costs in bytes — and why nobody can tell you

This is the question every student asks, and **the honest answer is that there is no
credible public benchmark.**

- **Flutter** is the only framework with an official docs page on the subject, and
  the only concrete figure on it is captioned as *"the default demo app in Flutter
  1.17"* on iOS 13 — 5.4 MB compressed, 13.7 MB uncompressed
  ([docs.flutter.dev/perf/app-size](https://docs.flutter.dev/perf/app-size), checked
  2026-08-29). That is roughly six years stale and not a hello-world.
- **React Native, native Android/Kotlin, .NET MAUI and Capacitor publish no
  reference size at all.** Microsoft's
  [MAUI trimming docs](https://learn.microsoft.com/dotnet/maui/deployment/trimming)
  explain the `TrimMode` mechanism and give **zero size numbers** (checked
  2026-08-29).
- Every actual megabyte figure in circulation comes from blogs, forum posts and
  GitHub issues with unstated or inconsistent build settings — debug versus release,
  minification on or off, ABI splitting, framework version. They disagree by factors
  of five.

**Confidence: low, and structurally so.** The correct answer to "how big is a Flutter
app" is "measure it, in release configuration, for your app" — which is a better
lesson than any number would have been. [`research-03`](research-03-building-desktop-apps.md)
§4 and §5.8 make the same case for the desktop at more length, including which
comparison sites to distrust and why; **that argument is not repeated here, and it is
the better of the two write-ups.** The finding is the same on both sides of the pair,
which is itself worth noting: the framework-comparison numbers circulating for
desktop and for mobile are unreliable for the same reason, and neither ecosystem has
fixed it. Emerge Tools' teardown of one real app
illustrates why the published numbers diverge: the App Store listing shows 88.3 MB
against Play's 9.52 MB for the same product, but their own download-size measurement
narrows that to 33.6 MB vs 9.52 MB, and installed-and-AOT-compiled to 87.6 MB vs
56.08 MB
([emergetools.com](https://www.emergetools.com/blog/posts/are-android-apps-really-that-much-smaller-than-ios),
VENDOR — an app-size analytics company, single app, checked 2026-08-29). **Three
defensible definitions of "size", three different answers, one app.**

**Further reading — footprint.**
[Reduce your app size](https://developer.android.com/topic/performance/reduce-apk-size) — Google's consolidated playbook, the one page to read if only one.
[Now in Android](https://github.com/android/nowinandroid) — Google's own actively maintained sample app; the modularization guidance in working code rather than prose.
[Shrinking APKs, growing installs](https://medium.com/googleplaydev/shrinking-apks-growing-installs-5d3fcba23ce2) — read it *and* note its date; it is the source of a statistic the whole industry still quotes.


---

# Part D — Size axis 3: the complexity of the app itself

The third meaning of size, and the one that most directly decides the stack. Four
rungs, each defined by the first constraint it adds that the rung below did not have.

**D1. A single-screen utility.** No backend, no accounts, no background work. Every
framework in `research-02` §2 handles this, and the choice is decided entirely by
what the team already knows. **This is the only rung where "which framework?" is a
low-stakes question** — which is worth saying to students explicitly, because it is
the rung they will build on and the rung from which framework arguments are least
transferable.

**D2. CRUD with a backend.** Adds networking, serialisation, error states, a token
to store, and a first encounter with the fact that the phone's network is
intermittent by default. The new constraint is the **UI thread**: work moved off it,
or Android's 5-second ANR boundary
([vitals](https://developer.android.com/topic/performance/vitals), checked
2026-08-29) turns a slow endpoint into a store-visibility problem. This is where the
desktop lesson about keeping state out of the widget tree stops being an opinion.

**D3. Offline-first, with sync.** The rung where mobile stops resembling desktop.
Two constraints arrive together. First, **the OS terminates your process**: Android
apps must survive process death and configuration change, which is why the Android
API churned for a decade (AsyncTask → Loaders → ViewModel → lifecycle-aware
components) — treat that churn as evidence about how hard the problem is, not as a
list of deprecations. Second, **conflict resolution is now the app's problem**, and
no framework supplies it. This rung is where cross-platform code sharing pays best,
because the sync logic is pure logic and identical on both platforms — which is
precisely the case Kotlin Multiplatform is built for, and the reason KMP shares
business logic while leaving UI native
([KMP](https://kotlinlang.org/docs/multiplatform.html), checked 2026-08-29).

**D4. Real-time, media, or on-device ML.** Adds hard budgets: memory (a 6 GB device
allows 2.25 GB foreground RSS+swap before Play flags it), battery (the 1 % excessive
battery threshold), frame timing (16 ms), and — for anything with native libraries —
the **16 KB page alignment** deadline of 2027-02-01. All from
[Android vitals](https://developer.android.com/topic/performance/vitals) and
[page-sizes](https://developer.android.com/guide/practices/page-sizes), checked
2026-08-29. This is the rung where the cross-platform question genuinely reopens,
because a rendering-canvas framework and a native-controls framework behave
differently under exactly these budgets.

**The point of the three axes together:** they are independent. A solo developer can
sit at D4 (a game). A large organisation can sit at D1 (an internal tool). Asking
"how big is this app?" without saying *which* size is being asked about produces the
wrong stack decision.

---

# Part E — The toolchain, as of August 2026

## E1. Build

Android: **AGP 9.3.0** (July 2026) requires and defaults to **Gradle 9.5.0** and
**JDK 17**, supports up to API 37
([AGP release notes](https://developer.android.com/build/releases/gradle-plugin),
checked 2026-08-29); Gradle itself is at 9.7.1 (2026-08-19,
[release notes](https://docs.gradle.org/current/release-notes.html)). Version
catalogs (`gradle/libs.versions.toml`) are current standard practice
([version catalogs](https://docs.gradle.org/current/userguide/version_catalogs.html)).
**AGP 9.0 broke the old Variant/DSL APIs**: the eager `applicationVariants.all { }`
pattern is deprecated in favour of `androidComponents { onVariants { } }`, and
becomes *required* in AGP 10
([AGP roadmap](https://developer.android.com/build/releases/gradle-plugin-roadmap),
checked 2026-08-29).

iOS: **Xcode 26.6** is current stable (2026-06-25), carrying Swift 6.3; Xcode 27 is
in beta with Swift 6.4 and drops Intel Mac support
([Xcode release notes](https://developer.apple.com/documentation/xcode-release-notes),
checked 2026-08-29). **CocoaPods is in maintenance mode by its maintainers' own
statement** — "We're still keeping it ticking, but we're being more up-front that
CocoaPods is in maintenance mode", with commitments limited to security fixes and
two releases a year for Xcode compatibility, and the Specs repo possibly going
read-only "on a very long, multi-year basis"
([blog.cocoapods.org](https://blog.cocoapods.org/CocoaPods-Support-Plans/),
PRIMARY, published 2024-08-13, checked 2026-08-29). Swift Package Manager is where
the ecosystem is going — Capacitor 8 moved its iOS dependencies to SPM
([Capacitor 8](https://ionic.io/blog/announcing-capacitor-8)), and Flutter has
announced the same move
([flutter.dev](https://flutter.dev/blog/saying-goodbye-to-cocoapods-swift-package-manager-is-soon-the-default-in-flutter));
both checked 2026-08-29. **No dated Apple statement declaring SPM the default over
CocoaPods was found** — the migration is real, the official pronouncement is not.

## E2. The cross-platform landscape, briefly — and who owns it

`research-02` §2 holds the .NET comparison and is not repeated. What belongs here is
**the state of the wider field and, more usefully, its governance**, because in 2026
several of these projects changed hands.

| Framework | Current stable | Renders via | Note |
| --- | --- | --- | --- |
| **Flutter** | 3.47.0, 2026-08-12 | own canvas (Impeller) | Impeller is now default on desktop too; min iOS raised to 15 |
| **React Native** | 0.87.1, 2026-08-10 | native views (Fabric) | New Architecture is now the *only* architecture |
| **Compose Multiplatform** | 1.12.0, 2026-08-28 | own canvas (Skia) | iOS stable since 1.8.0 (2025-05) |
| **.NET MAUI** | 10, with .NET 10 | native controls (handlers) | MAUI 11 in preview for ~Nov 2026 |
| **Capacitor** | 8, GA 2025-12-08 | system WebView | requires iOS 15 / Android 7.0 |
| **Expo** | SDK 57, 2026-06-30 | React Native | bundles RN 0.86, React 19.2 |

*Sources, all checked 2026-08-29:*
[Flutter 3.47](https://flutter.dev/blog/whats-new-in-flutter-3-47) ·
[RN 0.82 "New Architecture only"](https://reactnative.dev/blog/2025/10/08/react-native-0.82) ·
[Compose Multiplatform 1.12.0](https://blog.jetbrains.com/kotlin/2026/08/compose-multiplatform-1-12-0/) ·
[MAUI 10](https://learn.microsoft.com/dotnet/maui/whats-new/dotnet-10) ·
[Capacitor 8](https://ionic.io/blog/announcing-capacitor-8) ·
[Expo SDK 57](https://expo.dev/changelog/sdk-57)

**Governance moved in 2025–2026, and it is the more interesting story.** Meta placed
React and React Native under an independent **React Foundation** on 2025-10-07, with
founding members including Amazon, Callstack, Expo, Meta, Microsoft, Software Mansion
and Vercel ([react.dev](https://react.dev/blog/2025/10/07/introducing-the-react-foundation),
PRIMARY, checked 2026-08-29). Kotlin sits under the **Kotlin Foundation**, whose
seven-seat board includes JetBrains (2), Google (2), Touchlab, **Meta**, and one
independent director ([kotlinfoundation.org/structure](https://kotlinfoundation.org/structure/),
PRIMARY, checked 2026-08-29). Expo raised a $45 M Series B in April 2026
([SiliconANGLE](https://siliconangle.com/2026/04/16/developer-tooling-startup-expo-nabs-45m-investment/),
SECONDARY); Uno Platform raised $3.5 M and now sells a commercial product alongside
the open-source project
([BetaKit](https://betakit.com/uno-platform-raises-3-5-million-to-bring-pragmatic-vibe-coding-to-enterprises/),
SECONDARY); both checked 2026-08-29. And **Google handed Flutter Desktop to Canonical** — Google's own release post
states *"Canonical will lead the Flutter Desktop roadmap and oversee the maintenance
of our Linux, Windows, and macOS embedders"*
([What's new in Flutter 3.44](https://flutter.dev/blog/whats-new-in-flutter-3-44),
2026-05-20, PRIMARY). That claim was found here only in secondary reporting and is
sourced properly in
[`research-03`](research-03-building-desktop-apps.md) §1, which also flags it as a
large escalation over the earlier Linux-only partnership and worth re-reading before
it is taught. **It does not affect Flutter on mobile**, which Google retains.

The reason governance belongs in a course at all: **"who maintains this, and what
happens if they stop" is a question a student can actually ask about any dependency**,
and it has a checkable answer. It generalises where a framework comparison table does
not.

**On adoption numbers — treat all of them as weak.** The most usable dataset found is
AppBrain's live teardown of apps on Google Play, which as of 2026-08-28 shows React
Native in 6.71 % of apps but 4.20 % of installs, Cordova 5.97 % / 0.68 %, Flutter
5.40 % / 2.09 %, Ionic 2.73 % / 0.18 %, Xamarin 1.98 % / 0.10 %, Capacitor 1.16 % /
0.14 %
([appbrain.com](https://www.appbrain.com/stats/libraries/tag/app-framework/app-development-framework),
SECONDARY, checked 2026-08-29). **The gap between the two columns is the finding**:
in every row, the framework's share of *apps* is far larger than its share of
*installs*, meaning these frameworks cluster in smaller and less-downloaded apps.
AppBrain does not document its detection methodology, so even this should be quoted
as a signal rather than a measurement. Figures circulating as "Stack Overflow 2025
says Flutter 9.12 %, React Native 8.43 %" **could not be corroborated against Stack
Overflow's own site** and should not be repeated.

> **⚠ updates `research-02`.** Two things worth adding to §2.4's runtime-version
> reasoning. First, **.NET 9 reached end of support on 2026-05-12** — already past —
> per Microsoft's lifecycle tracker and the MAUI support-policy page, while a
> general Microsoft conceptual page still says "November 2026"; **two Microsoft
> pages disagree and the lifecycle page is the more specific one**
> ([MAUI support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/maui),
> checked 2026-08-29). Second, and more consequential for the course:
> **.NET MAUI's own support window is only six months after its successor ships** —
> the page's own example is *"NET MAUI 9.0 will receive support for 6 months after
> .NET MAUI 10.0 ships"* — explicitly because MAUI can be installed independently of
> the .NET SDK so that it can respond to externally-paced Xcode and Android SDK
> releases. The dates it publishes: **MAUI 9 ended support 2026-05-12** and
> **MAUI 10 ends support 2027-05-11** (same page, checked 2026-08-29). So pinning
> the course to .NET 10 buys three years of *runtime* support and **MAUI support
> only to May of the following school year.** That does not change `research-02`'s
> recommendation — pin to .NET 10, do not chase 11 mid-year — but it sharpens the
> reason: the risk is not the runtime, it is the UI framework's shorter clock, and
> the date falls inside the course's own second year rather than safely beyond it.

## E3. Testing

Compose has **its own testing API** rather than reusing Espresso; Google's page says
plainly that Espresso is "intended for View-based UIs"
([Compose testing](https://developer.android.com/develop/ui/compose/testing), checked
2026-08-29). On Apple's side, **Swift Testing** (`@Test`, `#expect`) ships inside
Swift 6 toolchains with no package dependency and has an official
[migration guide from XCTest](https://developer.apple.com/documentation/testing)
(checked 2026-08-29); XCUITest remains the separate UI-driving layer.

Third-party: **Maestro** CLI 2.6.0 (2026-05-21,
[github.com/mobile-dev-inc/maestro](https://github.com/mobile-dev-inc/maestro)) and
**Appium** 3.5.0 (2026-05-31,
[github.com/appium/appium/releases](https://github.com/appium/appium/releases)) are
both actively released. **Detox is ambiguous**: the repository shows ongoing commit
activity and a README claiming support up to RN 0.84.x, but its most recent *tagged
release* is 20.51.3 from **2024-05-30**
([github.com/wix/Detox/releases](https://github.com/wix/Detox/releases), checked
2026-08-29). **Confidence: uncertain — do not describe Detox as either actively
maintained or abandoned without checking the tags.** Screenshot testing: **Paparazzi**
2.0.0-alpha05 (2026-05-20,
[github.com/cashapp/paparazzi](https://github.com/cashapp/paparazzi)) and Google's
own [Compose Preview Screenshot Testing](https://developer.android.com/studio/preview/compose-screenshot-testing).

**The old argument that UI testing is hard survives intact**, and the mobile-specific
reason is that emulators cannot reproduce device-specific failure — which is why the
per-device-model vitals thresholds (8 % crash rate on a single phone model) exist at
all, and why device farms cost what Part B2 says they cost.

## E4. After release

Crashlytics is free on both Firebase plans, and gained **MCP tools for conversational
crash debugging** in November 2025
([firebase.blog](https://firebase.blog/posts/2025/11/crashlytics-mcp-with-gemini-cli/),
VENDOR) plus Gemini-powered dashboard insights that are still labelled
**"early-stage technology"**, limited to crashes and ANRs
([AI assistance in the Crashlytics dashboard](https://firebase.google.com/docs/crashlytics/ai-assistance-in-dashboard),
PRIMARY, page last updated 2026-08-27); both checked 2026-08-29. Deprecations that
forced real work recently: **Firebase Dynamic Links shut down 2025-08-25**
([FAQ](https://firebase.google.com/support/dynamic-links-faq)) and **App Center
retired 2025-03-31**, with only Analytics & Diagnostics extended to 2027-03-31
([retirement notice](https://learn.microsoft.com/en-us/appcenter/retirement));
both checked 2026-08-29.

## E5. AI inside the mobile toolchain

Two distinct things get called "AI in mobile development", and conflating them is the
most common error in current writing about this.

**(a) AI that writes the app.** `research-01` holds the evidence on this and is not
repeated here — the METR RCT (experienced developers 19 % slower while estimating
20 % faster), the Stanford greenfield/brownfield split, the Microsoft
juniors-versus-seniors figures, and the education research on scaffolding versus
offloading loops. See
[`research-01-ai-assisted-development.md`](research-01-ai-assisted-development.md) §2
and §5. **What is new and mobile-specific is that the assistants are now inside the
first-party IDEs.** Xcode 26.6 added **Google Gemini** as a selectable model provider
in its built-in coding assistant, alongside ChatGPT, Claude, local Apple-silicon
models and any Chat-Completions-compatible provider, plus Agent Client Protocol
support ([Xcode 26.6 release notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-26_6-release-notes),
PRIMARY, checked 2026-08-29). Apple shipping a competitor's model inside its own IDE
is a notable piece of vendor-neutrality, and a good concrete example for Moduł 1.

**(b) AI that runs inside the shipped app.** The desktop side of this is covered in
[`research-03`](research-03-building-desktop-apps.md) §8.1, which argues that
on-device inference has become a normal platform API rather than a specialism; the
mobile picture below is the same development seen from the other platform. Both
platforms now offer the same two-layer shape:

| | Apple | Google |
| --- | --- | --- |
| High-level task API over a small on-device model | **Foundation Models framework** — guided generation into typed Swift structs, tool calling, session transcripts | **ML Kit GenAI APIs** over **Gemini Nano** in AICore — summarise, proofread, rewrite, describe image |
| Lower-level "bring your own model" runtime | **Core AI** (new at WWDC 2026) and **Core ML** | **LiteRT / LiteRT-LM** |

Apple's on-device model is documented as a **3-billion-parameter, 2-bit-quantised
"device-scale" model** explicitly *not* designed for world knowledge or heavy
reasoning, with Private Cloud Compute as the escape hatch for anything bigger
([Foundation Models](https://developer.apple.com/documentation/foundationmodels);
[WWDC25 session 286](https://developer.apple.com/videos/play/wwdc2025/286/)). It runs
only where Apple Intelligence runs — **iPhone 15 Pro or newer, iPad with A17 Pro or
M1+, Apple-silicon Macs**
([support.apple.com/121115](https://support.apple.com/en-us/121115)). **Core AI**, new
in 2026, runs arbitrary neural-network models on Apple silicon via a zero-copy Swift
API with an `.aimodel` format and PyTorch conversion tooling, and Apple's own doc is
explicit that it does *not* replace Core ML for non-neural model types
([developer.apple.com/documentation/coreai](https://developer.apple.com/documentation/coreai)).
Google's side is [Gemini Nano via ML Kit](https://developer.android.com/ai/gemini-nano),
with a Gemma 4 / Gemini Nano 4 **Developer Preview** announced April 2026 carrying
vendor performance claims ("up to 4x faster… up to 60 % less battery") that are
**unverified marketing figures**
([android-developers.googleblog.com](https://android-developers.googleblog.com/2026/04/AI-Core-Developer-Preview.html)).
All checked 2026-08-29.

**The size-relevant point:** on-device inference has **no per-request cost and no
server**, which is precisely what makes it reachable for a solo developer or a
student project — but it is gated on recent, higher-end hardware on both platforms,
so it is a feature a small team can build and a large fraction of users cannot run.
That trade — free to operate, unavailable to many — is new, specific to 2025–2026,
and is a better example of "engineering is trade-offs" than most textbook ones.


---

# Part F — The cross-cutting questions

**1. What actually decides the stack in 2026?**
Not language merit. In order of force: (a) **what the platform owner has decided** —
Compose on Android is not a preference any more; (b) **what hardware the team has** —
iOS requires a Mac, and Xcode 27 requires an Apple-silicon one; (c) **what the team
already knows**; (d) **the complexity rung from Part D**. Framework benchmarks come
fifth at best, and the byte-size arguments people conduct them with are not
reproducible (Part C5).

**2. Is cross-platform winning?**
The question does not have the shape people give it. The measurable signal —
AppBrain's app-share versus install-share gap (Part E2) — suggests cross-platform
frameworks cluster in smaller and less-downloaded apps, and Shopify's own account
explicitly warns that *"100 % React Native should be an anti-goal"*. The better
formulation is that **cross-platform has stopped being a bet and become a normal
option with known costs**, and that the costs are still paid at the same place they
were always paid: the boundary with platform APIs. Every one of these frameworks has
a named leak — platform channels in Flutter, TurboModules in React Native,
`expect`/`actual` in KMP, handlers exposing `PlatformView` in MAUI.

**3. What has not changed?**
The single UI thread. The event loop. Keeping state out of the widget tree. The
frozen-UI problem — now with teeth, because Android turns it into an ANR statistic
that affects store visibility. Install/update/uninstall as a user-visible burden. **A
lesson built on any of these will still be true when every framework in this document
is dead**, which is the argument for teaching them rather than the current tool.

**4. Where is the public evidence weakest?**
Three places, and they are worth naming because each is a place where confident
writing is available and confident knowledge is not: **framework binary sizes**
(no reproducible benchmark exists); **the size-to-conversion relationship** (one
vendor post from 2017, never publicly refreshed); and **whether anyone uses
alternative app distribution** (one third-party consumer survey, no platform data,
after two years of regulation). In all three, the volume of published opinion is
inversely proportional to the amount of measurement behind it.

---

## What this means for the course

**For Moduł 4a — *Co to jest aplikacja desktopowa, a co mobilna***

The mobile half of that lesson has an answer that does not require any history: **a
mobile app is an application whose owner sets your deadlines.** Build it from the
table in §1. Three mechanisms, each with a live 2026 date the students can check
themselves:

1. **The target-API rule** ([source](https://developer.android.com/google/play/requirements/target-sdk)) — an app nobody updates stops being installable by new users. Contrast with a desktop `.exe` from 2015 that still runs.
2. **The store as a gate** — review, rejection, and a commission that in 2026 depends on which country the user is in.
3. **The OS terminates your process** — and Android publishes the exact percentage of crashes at which it will start hiding your app.

**And here the naive contrast is wrong, which is worth catching before it reaches a
lesson.** `research-02` §5.2 sets up the desktop side as "a GitHub Release, no fee,
no gatekeeper, no verification." That was true when it was written and is no longer
the whole picture. [`research-03`](research-03-building-desktop-apps.md) §6
documents what actually happens on the desktop in 2026: on Windows, SmartScreen
reputation is hash-based and **cannot be bought** — Microsoft's own words are that
*"paying a premium for EV solely to avoid SmartScreen warnings is no longer
justified"* — so an unsigned or new binary warns users for weeks; on macOS,
notarization requires a Developer ID certificate, the hardened runtime and a secure
timestamp, and **macOS 15 removed the Control-click bypass** that was the standard
escape for a decade; only Linux has no gate at all.

So the honest 4a contrast is not *gate versus no gate*. It is:

> **Mobile has one mandatory gate. Desktop has several optional ones, and the cost of
> skipping them is paid by the user in friction rather than by the developer in
> submission.**

That formulation is sourced on both sides, survives next year, and is a sharper thing
to say than either document alone would give you. **Run side-by-side in one lesson,
it is the whole of 4a.** It needs no framework table.

One item that makes it concrete and cuts the other way: **publishing to the Microsoft
Store is now free** for individuals (2025-09) and companies (2026-05), with non-gaming
apps able to keep 100 % of revenue using their own commerce
([`research-03`](research-03-building-desktop-apps.md) §6.5). So in 2026 the *desktop*
store is cheaper to enter than either mobile store — the opposite of what a student
would guess, and a good hook.

**For Moduł 4b / 4c — the stack decision**

Nothing here overturns `research-02` §2; two things sharpen it:

- **Add the MAUI support-clock finding** (Part E2) to the 4c decision record. It is a
  real cost of choosing MAUI that the .NET LTS story hides.
- **Add governance as a decision criterion.** "Who maintains this and what happens if
  they stop" is answerable for every option on the table and teaches a transferable
  habit. It is also the only criterion in the comparison that a student can research
  themselves in ten minutes.

**For Moduł 7 — *Z pulpitu na telefon***

Part D is the spine of this module. The lesson is not "the same code, a smaller
screen" — it is the list of constraints that appear at the D2/D3 boundary and have no
desktop equivalent: the UI thread with an enforced 5-second limit, process death,
runtime permissions, and a battery budget. The payoff for having kept state out of
the UI in 5d lands exactly here, and can be stated as a prediction in 5d and cashed in
Moduł 7.

**For Moduł 9 — *Wydanie***

Three corrections and additions to what `research-02` §5.1 sets up:

- **The 12-testers / 14-days gate is the practical blocker** for any student who
  registers a personal Play account, and it is not in `research-02`. Firebase App
  Distribution remains the right classroom route; the Play account is the story.
- **Developer verification lands 2026-09-30**, in Brazil, Indonesia, Singapore and
  Thailand — the week the course starts. It is the cleanest live example available of
  a platform decision changing what a developer is allowed to do, and `research-02`
  already identified it as such. It is now three days out rather than hypothetical.
- **Commission is no longer one number.** If a lesson mentions "30 %", it is wrong for
  the EEA from 2026-10-01 and unresolved in the US. Either give the date and the
  region, or say "it depends on where your user is, and here is where to check" —
  which is the more useful lesson anyway.

**Mention once, then drop**

Alternative app marketplaces and the DMA; the Epic litigation; on-device AI SDKs;
the AppBrain adoption figures. Each is one sentence of context and a link. None
survives contact with a 4th-year timetable as its own lesson.

**Leave out entirely**

Gradle and AGP version tables; CocoaPods versus SPM; the Compose BOM; device-farm
pricing; Detox's release-tag ambiguity; the memory-vitals RSS table. All of it is in
this document so that it exists somewhere, and none of it belongs in front of a
student. **A course that teaches the shape of the calendar does not need the entries
in it.**

**One proposal, not an edit** (per the stop condition in the sibling briefs and
Article IX): `course-structure-v1.md` Moduł 9's gate could usefully be re-worded from
*"Moduł 8 has something worth releasing"* to include the lead time the Play account
route now requires. **Not changed here.**

---

## What rots

This document has a shorter shelf life than either sibling. Specifically:

| Claim | Why it will move | Re-check before |
| --- | --- | --- |
| Every commission rate in A3 | Apple's EU terms change 2026-10-01; the US rate is *sub judice*; Play's rollout runs to 2027-09-30 | any lesson naming a percentage |
| Target API 36 | The next annual bump will be announced during the school year | Moduł 9 |
| 16 KB page deadline | It has already moved more than once | any mention of it |
| Every version number in Part E | Monthly cadence on all of them | never quote them in a lesson |
| Every price in Part B | CI, device farms and Firebase Remote Config all repriced within the last year | any lesson costing something out |
| Developer verification scope | Global expansion is stated only as "2027 and beyond" | Moduł 9, next year |
| Apple's cellular download limit | Apple no longer publishes a number | do not assert it at all |
| Canonical / Flutter desktop | One secondary source | do not use without a primary |
| Detox's maintenance status | Contradictory signals in the repo itself | before recommending it |

And one structural warning: **the two most-cited numbers in this whole field are
weak.** The "6 MB costs 1 % conversion" figure is a 2017 vendor post nobody has
refreshed, and the framework binary-size comparisons everyone quotes have no
reproducible methodology behind them. Both are excellent material for a
`Rozbierz to` exercise — *here is a number the whole industry repeats; find out who
measured it, when, and on what.*

---

## Sources

Grouped by what they support. **Start with the four marked ★** — they carry most of
the argument. Everything checked **2026-08-29**.

**The platform floor — start here**

- ★ [Google Play target API level requirements](https://developer.android.com/google/play/requirements/target-sdk) — the API 36 rule and the 2026-08-31 / 2026-11-01 dates. PRIMARY.
- ★ [Android vitals](https://developer.android.com/topic/performance/vitals) — every numeric quality threshold Google enforces, plus the February 2027 additions. PRIMARY.
- [Apple: iOS 26 SDK required for submissions](https://developer.apple.com/news/?id=ueeok6yw) — the 2026-04-28 mandate. PRIMARY.
- [Support 16 KB page sizes](https://developer.android.com/guide/practices/page-sizes) — the 2027-02-01 deadline, in Google's own words. PRIMARY.
- [Android vitals: launch time](https://developer.android.com/topic/performance/vitals/launch-time) · [rendering](https://developer.android.com/topic/performance/vitals/render) — the 5 s / 2 s / 1.5 s and 16 ms / 700 ms budgets. PRIMARY.

**The UI-toolkit decision**

- ★ [Android UI development is Compose First](https://developer.android.com/develop/ui/compose/first) — the maintenance-mode declaration and the list of affected libraries. PRIMARY.
- [Compose First announcement](https://android-developers.googleblog.com/2026/05/android-ui-development-is-compose-first.html) — the same policy as a blog post. PRIMARY/vendor.
- [SwiftUI ↔ UIKit integration](https://developer.apple.com/documentation/swiftui/uikit-integration) — Apple's non-answer to the same question. PRIMARY.
- [Strong skipping mode](https://developer.android.com/develop/ui/compose/performance/stability/strongskipping) — why Compose stability annotations mostly stopped being manual work. PRIMARY.

**Stores, commission and regulation**

- ★ [Apple: changes for apps in the EU](https://www.apple.com/newsroom/2026/08/apple-announces-changes-for-apps-in-the-european-union/) — the 2026-10-01 restructuring, 26 %/20 %/15 % and the end of the Core Technology Fee. PRIMARY.
- [Apple Schedule 2 and 3 (PDF)](https://developer.apple.com/support/downloads/terms/schedules/Schedule-2-and-3-English.pdf) — the binding worldwide 30 %/15 % text, version 126. PRIMARY, legal text.
- [Apple DMA compliance page](https://developer.apple.com/support/dma-and-apps-in-the-eu/) — still describes the *pre*-October terms; useful precisely as an example of two vendor pages disagreeing. PRIMARY.
- [Google Play service fees](https://support.google.com/googleplay/android-developer/answer/112622) · [regional rollout schedule](https://support.google.com/googleplay/android-developer/answer/16954621) — the 10 %+5 % model and which countries have it when. PRIMARY.
- [Play catalog access for rival stores](https://support.google.com/googleplay/android-developer/answer/17117200) — the *Epic v. Google* remedy as implemented. PRIMARY.
- [EU DMA case tracker](https://digital-markets-act.ec.europa.eu/) — the Commission's own record. PRIMARY.
- [Consumer response to the DMA (ECIPE / Ipsos)](https://ecipe.org/publications/consumer-response-to-the-digital-markets-act/) — the only measured evidence found on whether anyone uses alternative distribution. SECONDARY, with a policy lean.
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) — §2.5.2 governs every over-the-air update scheme. PRIMARY.
- [Play Device and Network Abuse policy](https://support.google.com/googleplay/android-developer/answer/16559646) — the interpreter exception the OTA ecosystem depends on. PRIMARY.

**Accounts, verification and getting an app to a person**

- ★ [Android developer verification](https://developer.android.com/developer-verification/guides) — the 2026-09-30 date, the four countries, the account tiers. PRIMARY.
- [Verification FAQ](https://developer.android.com/developer-verification/guides/faq) — the free Limited Distribution tier and its 20-device cap. PRIMARY.
- [Play Console: 12 testers / 14 days](https://support.google.com/googleplay/android-developer/answer/14151465) — the gate on new personal accounts. PRIMARY.
- [Apple Developer Program](https://developer.apple.com/programs/) ($99/yr) · [Play registration](https://support.google.com/googleplay/android-developer/answer/6112435) ($25 once). PRIMARY.
- [TestFlight limits](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/) · [Play testing tracks](https://support.google.com/googleplay/android-developer/answer/9845334). PRIMARY.

**Size, footprint and performance**

- [Google Play bundle size limits](https://support.google.com/googleplay/android-developer/answer/9859372) — the 200 MB / 500 MB / 4 GB / 34 GB ladder. PRIMARY.
- [Apple maximum build file sizes](https://developer.apple.com/help/app-store-connect/reference/maximum-build-file-sizes) — 4 GB, and the `__TEXT` limits. PRIMARY.
- [Reduce your app size](https://developer.android.com/topic/performance/reduce-apk-size) — the consolidated Android playbook. PRIMARY.
- [Shrinking APKs, growing installs](https://medium.com/googleplaydev/shrinking-apks-growing-installs-5d3fcba23ce2) — the "6 MB = 1 %" figure. **VENDOR, 2017-11-20, never publicly refreshed.** Read the date as part of the claim.
- [Flutter app size](https://docs.flutter.dev/perf/app-size) — the only official framework size page, and its only number is from Flutter 1.17. PRIMARY but stale.
- [Are Android apps really that much smaller than iOS?](https://www.emergetools.com/blog/posts/are-android-apps-really-that-much-smaller-than-ios) — one app measured three ways, three different answers. VENDOR, but the methodology is the point.
- [Multidex](https://developer.android.com/build/multidex) — the 64K limit, and why it stopped mattering. PRIMARY.

**Frameworks and their governance**

- [Flutter 3.47](https://flutter.dev/blog/whats-new-in-flutter-3-47) · [React Native 0.82 — New Architecture only](https://reactnative.dev/blog/2025/10/08/react-native-0.82) · [Compose Multiplatform 1.12.0](https://blog.jetbrains.com/kotlin/2026/08/compose-multiplatform-1-12-0/) · [Capacitor 8](https://ionic.io/blog/announcing-capacitor-8) · [Expo SDK 57](https://expo.dev/changelog/sdk-57). All PRIMARY release notes.
- [.NET MAUI support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/maui) — **the six-month window, and MAUI 10's 2027-05-11 end of support; the most course-relevant single fact in this group.** PRIMARY.
- [Xamarin end of support](https://dotnet.microsoft.com/en-us/platform/support/policy/xamarin) (2024-05-01) · [MAUI migration guide](https://learn.microsoft.com/dotnet/maui/migration/). PRIMARY.
- [The React Foundation](https://react.dev/blog/2025/10/07/introducing-the-react-foundation) · [Kotlin Foundation structure](https://kotlinfoundation.org/structure/) — who actually owns the thing you are depending on. PRIMARY.
- [Five years of React Native at Shopify](https://shopify.engineering/five-years-of-react-native-at-shopify) — the best-sourced migration account in the 2024–2026 window, including its own caveat. VENDOR.
- [AppBrain framework statistics](https://www.appbrain.com/stats/libraries/tag/app-framework/app-development-framework) — live app-share vs install-share. SECONDARY, undocumented methodology.

**Toolchain**

- [AGP release notes](https://developer.android.com/build/releases/gradle-plugin) · [AGP roadmap](https://developer.android.com/build/releases/gradle-plugin-roadmap) · [Gradle release notes](https://docs.gradle.org/current/release-notes.html). PRIMARY.
- [Xcode release notes](https://developer.apple.com/documentation/xcode-release-notes) — including Gemini in the coding assistant at 26.6. PRIMARY.
- [CocoaPods support plans](https://blog.cocoapods.org/CocoaPods-Support-Plans/) — the maintainers saying "maintenance mode" in their own words. PRIMARY.
- [Compose testing](https://developer.android.com/develop/ui/compose/testing) · [Swift Testing](https://developer.apple.com/documentation/testing). PRIMARY.
- [GitHub Actions billing](https://docs.github.com/en/billing/managing-billing-for-your-products/managing-billing-for-github-actions/about-billing-for-github-actions) · [Xcode Cloud](https://developer.apple.com/xcode-cloud/) · [Expo pricing](https://expo.dev/pricing) · [Codemagic pricing](https://docs.codemagic.io/billing/pricing/) · [Bitrise pricing](https://bitrise.io/pricing) — the macOS-minute problem, priced. PRIMARY.
- [Firebase Test Lab pricing](https://firebase.google.com/docs/test-lab/usage-quotas-pricing) · [AWS Device Farm](https://aws.amazon.com/device-farm/pricing) · [BrowserStack](https://www.browserstack.com/pricing) · [Sauce Labs](https://saucelabs.com/pricing). PRIMARY.
- [Play staged rollouts](https://support.google.com/googleplay/android-developer/answer/6346149) · [halting a full rollout](https://support.google.com/googleplay/android-developer/answer/16285429) · [Apple phased release](https://developer.apple.com/help/app-store-connect/update-your-app/release-a-version-update-in-phases/). PRIMARY.
- [Firebase Remote Config pricing](https://firebase.google.com/docs/remote-config/pricing) — free-forever ends 2026-09-01. PRIMARY.
- [App Center retirement](https://learn.microsoft.com/en-us/appcenter/retirement) · [react-native-code-push (archived)](https://github.com/microsoft/react-native-code-push) · [Firebase Dynamic Links FAQ](https://firebase.google.com/support/dynamic-links-faq) — three dead things people still recommend. PRIMARY.

**Privacy**

- [Apple privacy manifests required](https://developer.apple.com/news/?id=3d8a9yyh) · [TN3183 required-reason APIs](https://developer.apple.com/documentation/technotes/tn3183-adding-required-reason-api-entries-to-your-privacy-manifest) · [Play Data safety](https://support.google.com/googleplay/android-developer/answer/10787469) · [Android 16 behaviour changes](https://developer.android.com/about/versions/16/behavior-changes-16). PRIMARY.

**On-device AI**

- [Apple Foundation Models](https://developer.apple.com/documentation/foundationmodels) · [WWDC25 session 286](https://developer.apple.com/videos/play/wwdc2025/286/) · [Core AI](https://developer.apple.com/documentation/coreai) · [Apple Intelligence device requirements](https://support.apple.com/en-us/121115). PRIMARY.
- [Gemini Nano via ML Kit](https://developer.android.com/ai/gemini-nano) · [Gemma 4 / Gemini Nano 4 Developer Preview](https://android-developers.googleblog.com/2026/04/AI-Core-Developer-Preview.html) — the second carries unverified vendor performance claims. PRIMARY / VENDOR.

**In this repo**

- [`research-01-ai-assisted-development.md`](research-01-ai-assisted-development.md) — the AI-productivity evidence, not repeated here.
- [`research-02-stack-tooling-constraints.md`](research-02-stack-tooling-constraints.md) — the .NET framework comparison and the lab constraint; three findings above sharpen it.
- [`docs/_prompts/research-04-mobile-app-history.md`](../_prompts/research-04-mobile-app-history.md) — the unrun history brief that is this file's proper sibling.

---

## Changelog

- **v1.1 — 2026-08-29.** Renumbered from `research-05` to `research-04` and renamed
  to sit beside `research-03-building-desktop-apps.md`, which appeared in this folder
  the same morning and is this file's true sibling. Cross-references added at the five
  points where 03 already makes the argument (benchmark methodology, size tiers,
  on-device AI, AI-productivity evidence, desktop distribution). Two corrections from
  reading it: the Flutter/Canonical claim is upgraded from low-confidence to
  primary-sourced, and the desktop half of the Moduł 4a contrast is rewritten, because
  "desktop has no gatekeeper" is no longer true on Windows or macOS.
  **Numbering note for Viktar:** `docs/_prompts/` still reserves 03 and 04 for the two
  *history* briefs, which are unrun. Both numbers are now taken by present-state
  documents. Worth resolving deliberately rather than by accident.
- **v1.0 — 2026-08-29.** First pass. Written from six parallel research sweeps; the
  scale-and-AI sweep was cut short by a search quota, so Part E5(a) cites
  `research-01` rather than re-deriving the productivity evidence, and Part B's
  large-scale tier is thinner than the others — the gap is named in B4 rather than
  padded. Three claims are marked low-confidence and should not be taught as they
  stand: Flutter desktop stewardship, Detox's maintenance status, and Apple's current
  cellular download limit.
