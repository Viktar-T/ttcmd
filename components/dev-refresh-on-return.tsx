"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Slice 015. Re-renders the current route when the browser regains the
 * reader's attention, so that a lesson saved in an editor is on screen the
 * moment the writer looks back at the browser.
 *
 * This exists only in development, and only because of how content is read.
 * A lesson is a file read from disk when the page is requested (ADR-0002), not
 * a module imported into the bundle, so the development server has no link
 * from a route to a lesson and hot reloading never fires for a content edit.
 * The server does re-read the file on the next request — which is why a manual
 * reload has always shown the change, and why one request is the whole fix.
 *
 * `router.refresh()` is that request. It re-renders the Server Components in
 * place and merges the result, keeping scroll position and client state, so
 * the writer keeps the paragraph being edited. A document reload would throw
 * both away, which is the manual step this removes.
 *
 * TWO EVENTS, because "the window came to the front" and "this tab became the
 * visible one" are different facts and either can be the return. One alt-tab
 * back to a browser whose tab was already current fires both, hence the
 * suppression window — 300 ms swallows the pair and is far below any interval
 * at which a person deliberately returns twice. If a single return is ever seen
 * to produce two requests, raise this rather than lengthening it silently.
 *
 * Nothing runs on mount, so opening a page does not refresh it and there is no
 * loop. Nothing runs while the document is hidden: the first line returns, which
 * also covers `focus` arriving at a window that is in front while showing some
 * other tab.
 *
 * It renders nothing. Mounting it cannot change what a page looks like.
 */
export function DevRefreshOnReturn() {
  const router = useRouter();

  useEffect(() => {
    let last = 0;

    const onReturn = () => {
      if (document.visibilityState !== "visible") return;
      const now = Date.now();
      if (now - last < 300) return;
      last = now;
      router.refresh();
    };

    window.addEventListener("focus", onReturn);
    document.addEventListener("visibilitychange", onReturn);
    return () => {
      window.removeEventListener("focus", onReturn);
      document.removeEventListener("visibilitychange", onReturn);
    };
  }, [router]);

  return null;
}
