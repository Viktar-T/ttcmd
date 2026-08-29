"use client";

import styles from "./theme-toggle.module.css";

/**
 * Slice 003 pinned this to the corner of the viewport and recorded, here, that
 * the navigation slice would move it into a header. Slice 006 built the header
 * and moved it; nothing about its behaviour changed, which is why slice 003's
 * theme criteria are re-checked rather than re-derived.
 *
 * No React state and no useEffect, deliberately. State would have to be
 * initialised to something on the server, and that something is wrong for every
 * visitor who chose light — the classic toggle hydration mismatch. Reading the
 * DOM on click sidesteps it. For the same reason the icon is swapped in CSS
 * off :root[data-theme] and the label does not name the current theme.
 */
export function ThemeToggle() {
  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label="Przełącz motyw"
      onClick={() => {
        const root = document.documentElement;
        const next = root.dataset.theme === "light" ? "dark" : "light";
        root.dataset.theme = next;
        try {
          localStorage.setItem("ttcmd-theme", next);
        } catch {
          // A private-mode browser can refuse storage. The theme still changes
          // for this page; it simply is not remembered.
        }
      }}
    >
      {/* Shown on dark, because it offers light — design-reference.md */}
      <svg
        className={styles.sun}
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M19.8 4.2l-2.1 2.1M6.3 17.7l-2.1 2.1" />
      </svg>
      <svg
        className={styles.moon}
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
      </svg>
    </button>
  );
}
