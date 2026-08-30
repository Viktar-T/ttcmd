import type { ReactNode } from "react";
import styles from "./reference-list.module.css";

/**
 * The box the two reference lists share: bounded above and below, set at the
 * base size rather than the reading size, and marked with the attribute
 * `app/prose.css` uses to give it the rhythm of a block set apart.
 *
 * Two lists, one box, because they are the same kind of object on the page —
 * a run of short reference rows the reader scans rather than reads — and they
 * are told apart by what a row contains, not by a second frame (spec,
 * criterion 11). The `kind` decides which data attribute is written, which is
 * what `app/prose.css` keys the list reset and the rhythm on.
 *
 * THE BOUNDING RULES ARE `--rule-strong`, per ADR-0012: they are the only
 * things saying where the list begins and ends, so they are a component's
 * boundary rather than a decorative separator, and 1.47:1 is not enough for
 * that. The hairlines between rows inside the box stay `--rule` — those do sit
 * inside a block whose edges are already drawn, which is the exemption the ADR
 * states.
 */

export function ReferenceList({
  kind,
  children,
}: {
  kind: "sources" | "further-reading";
  children?: ReactNode;
}) {
  return (
    <section
      className={styles.block}
      data-sources={kind === "sources" ? "" : undefined}
      data-further-reading={kind === "further-reading" ? "" : undefined}
    >
      {children}
    </section>
  );
}
