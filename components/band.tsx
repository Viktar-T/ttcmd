import type { ReactNode } from "react";

/**
 * The accent band at the top of a module or a lesson page.
 *
 * A **stripe, not a panel** — tall enough for the breadcrumb and its breathing
 * room, and no taller. The design reference explains why in as many words: the
 * reference site's band is around 450px because it is holding a commissioned
 * illustration, and copying that height without the drawing leaves a large
 * empty coloured rectangle above every lesson, pushing the lesson below the
 * fold.
 *
 * `data-full-bleed` is what `app/globals.css` reads to put this in the frame's
 * full-width lane; the inner box puts its contents back on the same left edge
 * as everything below. `data-band` is what `app/nav.css` reads to change the
 * colours of what is inside — including the focus ring, which in the site's
 * usual accent would be the band's own colour and therefore invisible.
 */
export function Band({ children }: { children: ReactNode }) {
  return (
    <div className="band" data-band data-full-bleed>
      <div className="bandInner">{children}</div>
    </div>
  );
}
