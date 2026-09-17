import type { ReactElement, ReactNode } from "react";

/**
 * The drawings — eight module marks and the course's own.
 *
 * ADR-0015 reversed `docs/design-reference.md`'s "no illustrations". What it
 * kept is the ban on filler, and the test it kept it with: a drawing earns its
 * place by depicting a subject traceable to a lesson in the module it marks.
 * Every subject below has that trace written down in
 * `specs/024-module-marks/spec.md`; if a drawing is ever changed, the trace
 * changes with it or the drawing does not belong here.
 *
 * Outline line art, one square box for all eight, and **no colour anywhere**:
 * `stroke="currentColor"` makes every stroke follow the CSS `color` of the svg,
 * which is what lets one declaration in `app/nav.css` recolour a whole drawing
 * on hover and on keyboard focus, and what makes "does it work on both themes"
 * a question with no second answer. The stroke weight, the caps and the joins
 * live in that stylesheet too — nine drawings is too many places to keep a
 * number that will be adjusted by eye.
 *
 * Inline, not files: an `<img>` or a `background-image` costs a request per
 * card and puts the strokes inside a document the page's CSS cannot reach.
 *
 * `data-bg` is the one exception to "no fill". It fills a shape with the page
 * background so it **occludes** what is drawn before it — a phone in front of a
 * monitor, a window in front of a cogwheel. Without it, overlapping outlines
 * read as a tangle rather than as one thing in front of another. It is still
 * not a colour: `var(--bg)` is the theme's, set in `app/nav.css`.
 */

/** The box every module mark is drawn in. */
const MODULE_BOX = 48;

/**
 * Keyed by **folder slug**, not by module number, and that is load-bearing:
 * `app/styleguide/page.tsx` renders this grid from two invented specimen
 * modules numbered 7 and 8. Under number matching they would borrow the
 * drawings of real modules onto cards whose whole purpose is to be
 * unmistakably not content. Under slug matching they fall back — which makes
 * the styleguide a live exercise of the fallback path with no fixture written.
 *
 * A `Map` rather than a record on purpose. `tsconfig.json` does not set
 * `noUncheckedIndexedAccess`, so `record[slug]` would typecheck as
 * always-present while still being `undefined` at runtime, and the fallback
 * branch below would be unreachable to the compiler and taken by the browser.
 * `Map.get` is `| undefined` under `strict`, so the compiler sees the case.
 */
const MODULE_MARKS = new Map<string, ReactElement>([
  /* Moduł 0 · Start — a flag on a post. The starting line: the survey, the
     setup, and saving your work before anything else happens. */
  [
    "00-start",
    <>
      <path d="M14 43V5" />
      <path d="M14 9h22l-6 7 6 7H14" />
      <path d="M7 43h15" />
    </>,
  ],

  /* Moduł 1 · Jak dziś powstaje oprogramowanie — two speech bubbles, one
     holding a caret. Five reading lessons on talking to a model, from the
     first suggestion to an agent. */
  [
    "01-jak-powstaje-oprogramowanie",
    <>
      <rect x="4" y="6" width="27" height="19" rx="3" />
      <path d="M11 25v7l7-7" />
      <path d="M11 11.5v8" />
      <path d="M16 19.5h10" />
      <rect x="25" y="23" width="19" height="15" rx="3" data-bg />
      <path d="M38 38v6l-6-6" />
      <path d="M30 29h9M30 33h5" />
    </>,
  ],

  /* Moduł 2 · Warsztat — a screwdriver and a wrench crossed. The module is
     literally the workshop: the editor, the terminal, the project, the
     repository. */
  [
    "02-warsztat",
    <>
      {/* Both tools are drawn along the x axis and then turned onto their
          diagonal, which is the only way the jaw of a wrench stays a jaw. The
          screwdriver goes first so the wrench's handle, which is `data-bg`,
          occludes it where they cross — otherwise two outlines meeting in the
          middle read as a knot rather than as one tool over another. */}
      <g transform="rotate(45 24 24)">
        <path d="M18 21.5v5" />
        <path d="M18 24h16" />
        <path d="M34 22v4" />
        <rect x="5" y="19" width="13" height="10" rx="3" data-bg />
      </g>
      <g transform="rotate(-45 24 24)">
        <path d="M30 16h11v4.5h-6.5v7H41V32H30z" />
        <rect x="8" y="21.5" width="24" height="5" rx="2.5" data-bg />
      </g>
    </>,
  ],

  /* Moduł 3 · Budujemy — blocks stacking inside a window. Three builds, one
     after another, and an application at the end of each. */
  [
    "03-budujemy",
    <>
      <rect x="5" y="11" width="38" height="30" rx="2" />
      <path d="M5 18h38" />
      <circle cx="9.5" cy="14.5" r="1.2" />
      <circle cx="14" cy="14.5" r="1.2" />
      <rect x="11" y="30" width="12" height="7" />
      <rect x="25" y="30" width="12" height="7" />
      <rect x="18" y="22" width="12" height="7" />
    </>,
  ],

  /* Moduł 4 · Specyfikacja zamiast wibracji — a document inside a loop arrow.
     Spec, plan, tasks, code, and round again: "one loop, five wrappers". */
  [
    "04-specyfikacja",
    <>
      {/* 290° of arc, not 325°: a gap of 35° reads as a ring with a chip out
          of it, and the loop has to read as a loop. */}
      <path d="M41 24A17 17 0 1 1 29.8 8" />
      <path d="M24 9.3 29.8 8 26.2 3.3" />
      <rect x="16" y="15" width="16" height="19" rx="1.5" />
      <path d="M20 21h8M20 25h8M20 29h5" />
    </>,
  ],

  /* Moduł 5 · Twoja aplikacja — a lightbulb. Three ideas, one choice, and
     from there the student's own application. */
  [
    "05-twoja-aplikacja",
    <>
      <path d="M24 5a12.5 12.5 0 0 0-7.4 22.6c1.3 1 2.1 2.4 2.1 4V33h10.6v-1.4c0-1.6.8-3 2.1-4A12.5 12.5 0 0 0 24 5Z" />
      <path d="M19.5 37.5h9M21 42h6" />
      {/* A filament, zigzag. A single chevron here read as an arrow. */}
      <path d="m19.5 24.5 2.5-4.5 2 3.5 2-3.5 2.5 4.5" />
    </>,
  ],

  /* Moduł 6 · Pod maską — a window with a cogwheel behind it. The event loop,
     the controls built by hand, the state, the file: the machinery the
     application is standing on. */
  [
    "06-pod-maska",
    <>
      {/* A hub, and teeth that stop short: eight long spokes on a bare circle
          read as a sun. */}
      <circle cx="32" cy="16" r="6" />
      <circle cx="32" cy="16" r="2.3" />
      <path d="M38 16h2M36.24 20.24l1.42 1.42M32 22v2M27.76 20.24l-1.42 1.42M26 16h-2M27.76 11.76l-1.42-1.42M32 10V8M36.24 11.76l1.42-1.42" />
      <rect x="5" y="20" width="30" height="21" rx="2" data-bg />
      <path d="M5 26h30" />
      <circle cx="9.5" cy="23" r="1.1" />
      <circle cx="14" cy="23" r="1.1" />
      <path d="M10 32h14M10 36.5h9" />
    </>,
  ],

  /* Moduł 7 · Testy, jakość i przegląd kodu — a magnifier over a checklist.
     The test, the gate that will not let broken code through, and the model
     reading a diff that is not its own. */
  [
    "07-testy-i-jakosc",
    <>
      <rect x="5" y="6" width="26" height="33" rx="2" />
      <path d="m9.5 14.5 2 2 3.5-4" />
      <path d="M19 15h8" />
      <path d="m9.5 22.5 2 2 3.5-4" />
      <path d="M19 23h8" />
      <rect x="9.5" y="28.5" width="5" height="5" rx="1" />
      <circle cx="33" cy="29" r="9" data-bg />
      <path d="M28.5 27h9M28.5 31.5h5.5" />
      <path d="m39.5 35.5 4 4" />
    </>,
  ],
]);

/**
 * The course's own mark: a desktop application and a mobile one, which is the
 * course's name. Its own box, wider than a module's, because it is a pair.
 */
const COURSE_BOX = { width: 132, height: 100 };

/**
 * The drawing for one module — or the **empty box it would have filled**.
 *
 * The box, and not nothing. A module whose drawing has not been made renders an
 * ordinary card: number, title, lesson count, and this slot left blank. Adding
 * a module folder publishes it the same day; it does not wait on someone
 * drawing for it, and it does not fail the build (spec, criterion 7).
 *
 * The first version of this returned `null`, and the closing review caught what
 * that costs: a card with three children instead of four is 111px of content,
 * which `.moduleCard`'s `min-height: 11rem` rounds up to 176 — 11px short of
 * the 187.3 every other card in its row is, with a visibly short frame and a
 * short offset frame beside it. `/styleguide` could not show it, because both
 * of its specimen modules fall back and so agree with each other. Keeping the
 * box keeps the height by construction, the same way the drawn path does.
 */
export function ModuleMark({ slug }: { slug: string }) {
  return (
    <Mark className="moduleCardMark" width={MODULE_BOX} height={MODULE_BOX}>
      {MODULE_MARKS.get(slug)}
    </Mark>
  );
}

/** The course's mark, on the front door beside the course name. */
export function CourseMark() {
  return (
    <Mark
      className="heroMark"
      width={COURSE_BOX.width}
      height={COURSE_BOX.height}
    >
      {/* The desktop application: a window on a stand. */}
      <rect x="3" y="6" width="92" height="60" rx="3" />
      <path d="M3 17h92" />
      <circle cx="9" cy="11.5" r="1.6" />
      <circle cx="15" cy="11.5" r="1.6" />
      <circle cx="21" cy="11.5" r="1.6" />
      <path d="M12 28h38M12 36h52M12 44h28" />
      <path d="M49 66v12M34 79h30" />
      {/* The mobile one, in front of it — data-bg so the pair reads as two
          devices rather than as one tangle of outlines. */}
      <rect x="84" y="26" width="40" height="68" rx="7" data-bg />
      <path d="M97 34h14" />
      <path d="M92 46h24M92 54h17M92 62h24" />
      <path d="M96 87h16" />
    </Mark>
  );
}

/**
 * The wrapper every drawing shares, so the attributes that make a drawing
 * theme-safe and silent are written once instead of nine times.
 *
 * `aria-hidden` and no `<title>`: the card's link already says the module's
 * name, and a drawing that repeated it would make a screen reader read every
 * module twice (spec, criterion 9). `width` and `height` alongside `viewBox`
 * so the intrinsic ratio is known from the markup and nothing reflows when the
 * stylesheet arrives (criterion 8).
 */
function Mark({
  className,
  width,
  height,
  children,
}: {
  className: string;
  width: number;
  height: number;
  children: ReactNode;
}) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}
