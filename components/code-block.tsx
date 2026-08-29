import type { ComponentPropsWithoutRef } from "react";
import styles from "./code-block.module.css";
import { CopyButton } from "./copy-button";

/**
 * A fenced code block.
 *
 * Mapped onto `pre` through `compileMDX`'s components map in `lib/content.ts`,
 * so every fenced block in every lesson and every module index gets it with no
 * lesson edited. `children` is the highlighter's `<code>` subtree, untouched.
 *
 * The wrapper is not decoration. The copy control has to stay pinned while the
 * code scrolls under it, so the scroller cannot be the outermost element:
 * `<pre>` scrolls, and the wrapper holds the surface, the filename header and
 * the control. `data-code-block` on the wrapper is what `app/prose.css` targets
 * for the vertical rhythm, since the wrapper is the flow child now and the
 * `<pre>` no longer is.
 *
 * The highlighter's own class and inline style are dropped: the class is
 * replaced by this module's, and the style is stripped in `lib/code-highlight.ts`
 * because a `<pre>` painting its own background pokes out of the wrapper's
 * rounded corners. `tabIndex` is kept and set here — a horizontally scrollable
 * region has to be reachable from a keyboard, and on this site some blocks
 * scroll and some do not.
 */
export function CodeBlock({ children }: ComponentPropsWithoutRef<"pre">) {
  return (
    <figure className={styles.block} data-code-block="">
      <pre className={styles.pre} tabIndex={0}>
        {children}
      </pre>
      <CopyButton />
    </figure>
  );
}
