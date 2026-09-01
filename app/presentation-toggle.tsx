"use client";

import styles from "./presentation-toggle.module.css";

/**
 * The presentation-mode control — slice 013. The slice's only client component.
 *
 * It sits beside the theme control in the header (Viktar's call), and it is
 * built the way that one is and for the reasons written in app/theme-toggle.tsx:
 * no React state and no useEffect, because state would have to be initialised to
 * something on the server and that something is wrong for every visitor who
 * chose the other value — the classic toggle hydration mismatch. Reading the DOM
 * on click sidesteps it, and everything the button LOOKS like is decided in CSS
 * off :root[data-mode], so its appearance never waits for hydration.
 *
 * TWO THINGS IT DOES DIFFERENTLY FROM THE THEME CONTROL, both deliberate.
 *
 * 1. Its accessible name names the direction it will move the site — "Włącz…" /
 *    "Wyłącz…" — rather than being one direction-free label. The theme control
 *    cannot do that, because naming a state needs the state, which needs
 *    hydration. This one can, without any of that: both phrases are always in
 *    the DOM, both are clipped so neither is drawn, and CSS hides the inactive
 *    one with display: none, which removes it from the accessibility tree. The
 *    button's computed name is therefore exactly one phrase, it is right before
 *    hydration, and it is right with scripting disabled. aria-pressed would be
 *    the conventional answer and it is the one that cannot work here: it is an
 *    attribute, and CSS cannot set it.
 *
 * 2. One icon, and the button FILLS when the mode is on, rather than swapping
 *    between two icons. The theme control shows what it offers, which is right
 *    for a state a visitor can see on the page around it. This mode may change
 *    nothing visible at all — a page with no marked fragments is untouched by it
 *    — so the control has to show what is IN FORCE. On such a page it is the
 *    only evidence the mode is on.
 *
 * `delete root.dataset.mode` rather than setting "reading": reading mode is the
 * absence of the attribute, so after two presses the element is exactly as
 * served. localStorage still stores both words, mirroring the theme key.
 */
export function PresentationToggle() {
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => {
        const root = document.documentElement;
        const next =
          root.dataset.mode === "presentation" ? "reading" : "presentation";
        if (next === "presentation") root.dataset.mode = "presentation";
        else delete root.dataset.mode;
        try {
          localStorage.setItem("ttcmd-mode", next);
        } catch {
          // A private-mode browser can refuse storage. The mode still changes
          // for this page; it simply is not remembered.
        }
      }}
    >
      {/* A screen on a stand. Drawn in the theme control's exact idiom — same
          box, same stroke width, same weight — so the two read as one pair
          rather than as two controls that happen to be adjacent. */}
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <rect x="2.75" y="3.75" width="18.5" height="12.5" rx="1.5" />
        <path d="M12 16.25v3M8.5 19.25h7" />
      </svg>
      {/* The button's accessible name. Exactly one of these is in the
          accessibility tree at a time — see the note above. */}
      <span className={`${styles.name} ${styles.nameWhenReading}`}>
        Włącz tryb prezentacji
      </span>
      <span className={`${styles.name} ${styles.nameWhenPresenting}`}>
        Wyłącz tryb prezentacji
      </span>
    </button>
  );
}
