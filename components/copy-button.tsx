"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./code-block.module.css";

/**
 * The copy control — the only client component slice 005 adds, and the only
 * reason any of this block is interactive.
 *
 * It is present at rest rather than revealed on hover. Every block on this site
 * exists to be typed or pasted, hover does not exist on the phones half the
 * class reads this on, and the design reference asks for a *muted* label, not a
 * hidden one.
 *
 * WHAT IT COPIES is the whole point (spec 005 criterion 12). It reads the
 * `<code>` element's `textContent`, which is exactly the block's source: the
 * highlighter emits one `<span class="line">` per line with literal newlines
 * between them and nothing after the last one, and the trailing newline was
 * stripped before tokenising. The filename header and this control are outside
 * the `<pre>`, and a marked line is an attribute rather than content — so none
 * of them can reach the clipboard. A copied command that ends in a newline runs
 * the moment it is pasted, before the student has read it.
 *
 * The visible labels are all six characters or fewer so the corner does not
 * move between states; the precise sentence goes to the live region instead,
 * where length costs nothing.
 */

type CopyState = "idle" | "copied" | "failed";

const LABEL: Record<CopyState, string> = {
  idle: "kopiuj",
  copied: "gotowe",
  failed: "błąd",
};

const ANNOUNCEMENT: Record<CopyState, string> = {
  idle: "",
  copied: "Skopiowano kod do schowka.",
  failed: "Nie udało się skopiować. Zaznacz kod i skopiuj ręcznie.",
};

const RESET_AFTER_MS = 2500;

export function CopyButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [state, setState] = useState<CopyState>("idle");

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  async function copy() {
    const code =
      buttonRef.current?.closest("figure")?.querySelector("code")?.textContent ??
      "";

    try {
      /* Rejects on an insecure origin and when a browser denies the permission,
         and an unhandled rejection on a lesson page is worse than a failed copy
         the student can see. `clipboard` itself is absent on http origins. */
      await navigator.clipboard.writeText(code);
      setState("copied");
    } catch {
      setState("failed");
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setState("idle"), RESET_AFTER_MS);
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={styles.copy}
        onClick={copy}
        /* Stable, so a screen reader is not told the button renamed itself.
           The change is announced through the live region below instead. */
        aria-label="Kopiuj kod do schowka"
      >
        <span aria-hidden="true">{LABEL[state]}</span>
      </button>
      <span role="status" className={styles.announcement}>
        {ANNOUNCEMENT[state]}
      </span>
    </>
  );
}
