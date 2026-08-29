"use client";

import { useEffect } from "react";

/**
 * The active-section highlight — the one piece of this slice that moves.
 *
 * Renders null, always: the panel and the disclosure are server-rendered and
 * complete without this. All this island does is move `aria-current="location"`
 * between the section links both housings already carry — one attribute is the
 * visual state (contents.css keys the inverted box off it) and the assistive
 * one, so they cannot diverge — and keep the panel's own scroller showing the
 * active entry. With scripting absent, none of this exists and nothing else
 * misses it.
 *
 * A scroll handler, not IntersectionObserver, because the spec defines the
 * behaviour and a handler computes the definitions directly (spec §3):
 *
 * - active = the last section heading whose top has passed the reading line;
 * - above the first heading, nothing is active;
 * - at the document's bottom, the last section is active unconditionally —
 *   otherwise a short final section could never light up;
 * - a followed link pins its target (plan, "Gaps in the spec"), and the pin
 *   releases on the reader's next real scroll.
 */

/** The reading line, in rem from the viewport top. Above the 2rem anchor
    landing offset on purpose: a just-followed heading has always passed it,
    so the geometric rule and the followed-link pin agree. */
const READING_LINE_REM = 6;

/** Fractional-pixel slack for "the viewport is at the document's bottom". */
const BOTTOM_TOLERANCE_PX = 2;

export function ScrollSpy() {
  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(".prose h2[id]")
    );
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("a[data-section]")
    );
    if (headings.length === 0 || links.length === 0) return;

    const panel = document.querySelector<HTMLElement>(".contentsPanel");

    let raf = 0;
    let activeId: string | null = null;
    let pinnedId: string | null = null;
    let pinnedScrollY = 0;

    const compute = (): string | null => {
      if (pinnedId !== null) {
        if (Math.abs(window.scrollY - pinnedScrollY) <= 1) return pinnedId;
        pinnedId = null; // the reader has really scrolled; geometry governs
      }

      const doc = document.documentElement;
      if (
        window.scrollY + window.innerHeight >=
        doc.scrollHeight - BOTTOM_TOLERANCE_PX
      ) {
        return headings[headings.length - 1].id;
      }

      const line =
        READING_LINE_REM * parseFloat(getComputedStyle(doc).fontSize);
      let current: string | null = null;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= line) current = heading.id;
        else break;
      }
      return current;
    };

    /* The panel scrolls ITSELF, by the minimum needed, hand-written on
       scrollTop — never scrollIntoView, which is allowed to scroll every
       ancestor including the page, and the page must never move because of
       the panel. */
    const keepVisibleInPanel = (id: string) => {
      if (!panel) return;
      const link = links.find(
        (candidate) =>
          candidate.dataset.section === id && panel.contains(candidate)
      );
      if (!link) return;
      const scroller = panel.getBoundingClientRect();
      const entry = link.getBoundingClientRect();
      if (entry.top < scroller.top) {
        panel.scrollTop += entry.top - scroller.top;
      } else if (entry.bottom > scroller.bottom) {
        panel.scrollTop += entry.bottom - scroller.bottom;
      }
    };

    const apply = () => {
      const id = compute();
      if (id === activeId) return;
      activeId = id;
      for (const link of links) {
        if (id !== null && link.dataset.section === id) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      }
      if (id !== null) keepVisibleInPanel(id);
    };

    const schedule = () => {
      if (raf !== 0) return;
      /* rAF is the throttle, not the mechanism — and a hidden document never
         fires one, so anything that scrolls a background tab (a restored
         session, an automated check) would wait forever on it. */
      if (document.hidden) {
        apply();
        return;
      }
      raf = requestAnimationFrame(() => {
        raf = 0;
        apply();
      });
    };

    /* Fires after the browser's own jump, so scrollY here is the landed
       position; the pin holds until that number changes. */
    const onHashChange = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (headings.some((heading) => heading.id === id)) {
        pinnedId = id;
        pinnedScrollY = window.scrollY;
      }
      apply();
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", onHashChange);

    /* Initial state — including arriving on a teacher's #cwiczenia link. */
    if (window.location.hash) onHashChange();
    else apply();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", onHashChange);
      if (raf !== 0) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
