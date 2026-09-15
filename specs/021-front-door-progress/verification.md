# verification.md — 021-front-door-progress

Evidence for every acceptance criterion in `spec.md`. Criterion 11 is Viktar's
and is marked as such.

The "before" build is commit `f55c0e9`, which carries the pre-slice code. It was
built minutes before the slice's code changed, and `git status content/` was
empty after the slice's own build, so both builds saw one content tree. `plan.md`
asked for the old files to be restored and rebuilt back to back; that would have
rebuilt a tree that had not changed, and produced the same comparison.

---

## 1. Build and lint

```
✓ Compiled successfully
✓ Generating static pages using 9 workers (55/55)
┌ ○ /
├ ○ /postep
└ ○ /styleguide
```

`npm run lint` produces no output.

## 2. The hero has exactly one button

From the prerendered home page:

```
buttons in hero: [{"tag":"<a class=\"button\" href=\"/postep\">","text":"Postęp grup"}]
hero children: h1, p, a
```

One element carrying the bordered-button style, its text exactly „Postęp grup",
its target `/postep`.

## 3. „Zacznij kurs" is gone from the home page

```
Zacznij kurs anywhere in the home file: false
```

Searched across the whole prerendered file, including the embedded React data,
not only the visible markup.

## 4. The old link text is gone

```
gdzie jest twoja grupa anywhere in the home file: false
```

## 5. Clicking the button lands on the progress page

Clicked live in the browser:

```
location.pathname: "/postep"
h1: "Postęp grup"
```

The address is the check, not the heading: the progress page's title and the
button's label are the same two words, so finding the text would prove nothing.

## 6. The module grid is unchanged

```
module grid markup identical: true
```

Its `<ul>` compared byte for byte between the two builds. It still lists eight
modules, `00-start` through `07-testy-i-jakosc`, in the same order with the same
targets.

## 7. The hero does not move sideways

Measured live at 1280 px, before and after:

| box | left before | left after | width before | width after |
| --- | ---: | ---: | ---: | ---: |
| title | 464 | 464 | 624 | 624 |
| lede | 464 | 464 | 522 | 522 |
| button | 464 | 464 | 162 | 152 |
| module grid | 464 | 464 | 624 | 624 |

Every left edge holds. The button is ten pixels narrower because „Postęp grup"
is one character shorter than „Zacznij kurs"; its font, padding and border are
unchanged, which is how the plan read the spec's "keeps its size". The module
grid moves up from 408 to 362 px, by the removed paragraph and one grid gap,
which is vertical and expected.

`scrollWidth − clientWidth` on the home page: **0 at 1280, 375 and 320 px**.

## 8. No other page changed

```
pages before: 55  after: 55
differing pages: ["index.html","styleguide.html"]
```

Fifty-three pages byte-identical once the per-build id is normalised. The two
that differ are the two this slice changes.

## 9. The reference page changed in exactly one label

```
old reference page with the label swapped equals the new one: true
```

Every „Zacznij kurs" in the old prerendered reference page was replaced with
„Postęp grup", and the result equals the new page byte for byte. The label
appears twice in that file, once in the markup and once in the embedded React
data, and both are covered. The source diff is one line:

```
-              Zacznij kurs
+              Postęp grup
```

## 10. No dependency, token, colour or client behaviour

```
files changed by the slice's code commits:
  app/page.tsx
  app/styleguide/page.tsx
package.json / package-lock.json changed: no
any stylesheet changed: no
use client in app/page.tsx: 0
```

## 11. Human eye — NOT MET, and not this run's to meet

Whether a student who opens the site wanting a lesson, rather than their group's
progress, finds the module grid now that „Zacznij kurs" is gone. The grid starts
46 px higher than it did, directly under the button.

## 12. Fresh-context review

See the closing report.
