"use client";

import { useEffect, useState } from "react";

/**
 * The back-to-top control — lesson pages only, mounted there and nowhere
 * else. Server-rendered as nothing and null until the reader has scrolled
 * past roughly a viewport, so with scripting absent it simply never exists:
 * no dead button, no empty furniture (spec §6, §7).
 *
 * Activation returns the viewport AND the keyboard: focus moves to the top
 * of the page's content, so a keyboard user who invokes the control and
 * presses Tab is at the top, not back at the bottom where the button was.
 * The scroll is instant — nothing on this site scrolls smoothly.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!visible) return null;

  const activate = () => {
    window.scrollTo(0, 0);
    const main = document.querySelector("main");
    if (main instanceof HTMLElement) {
      main.tabIndex = -1;
      main.focus({ preventScroll: true });
    }
  };

  return (
    <button
      type="button"
      className="backToTop"
      aria-label="Wróć na początek"
      onClick={activate}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
