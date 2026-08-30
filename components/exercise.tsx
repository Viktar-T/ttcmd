import type { ReactNode } from "react";
import styles from "./exercise.module.css";

/**
 * An exercise — the one element a lesson writes by hand.
 *
 * Mapped into `compileMDX`'s components map under the name an author types,
 * `Zadanie` (`lib/exercises.ts`), the same way `pre` is mapped to the code
 * block: one wiring, every lesson, no lesson edited.
 *
 * **It does not know its own number and cannot work one out.** ADR-0003
 * numbers exercises `<module>.<n>` continuously across a whole module, so the
 * number arrives as a prop, stamped onto the node during the compile by a walk
 * that had the module in front of it. Everything here does with it is render it
 * as text — which is what puts it in the HTML the server sends, inside
 * find-in-page, inside a selection copy and inside what a screen reader reads.
 *
 * The number reads `Zadanie 1.7` and not `1.7`. It is one string in one text
 * node, so find-in-page for either half still lands on it, and a reader hears a
 * word before a decimal instead of a bare number with no noun.
 *
 * No heading element. An exercise is meant to sit inline in the lesson where
 * its concept was just explained, and a heading there would inject a level into
 * a document outline the author did not choose — and would put an entry in the
 * contents panel, which this slice does not touch.
 */

interface ExerciseProps {
  /** `1.7` — stamped by `rehypeExercises` in numbering mode, never written by
      an author (the plugin refuses an author-written one). */
  number?: string;
  /** `zadanie-1-7`, from the same derivation, so the string a teacher says out
      loud is also an address. */
  id?: string;
  title?: string;
  children?: ReactNode;
}

export function Exercise({ number, id, title, children }: ExerciseProps) {
  /* Unreachable through the pipeline: the plugin stamps both in numbering
     mode, and refuses an exercise outright in every other mode. It is here for
     the day somebody wires a compile without the plugin — an exercise labelled
     `Zadanie undefined` on a public page is the failure this slice exists to
     make impossible, and a build that stops is the cheap version of it. */
  if (!number || !id) {
    throw new Error(
      "Exercise: rendered with no number. An exercise is numbered by its " +
        "module when the site is built (ADR-0003); this body was compiled " +
        "without the numbering pass."
    );
  }

  return (
    <section className={styles.exercise} data-exercise="" id={id}>
      <p className={styles.label}>Zadanie {number}</p>
      <div className={styles.content}>
        {/* No title, no element — and nothing in its place. Twenty-nine of the
            corpus's thirty-three exercises were written without one. */}
        {title ? <p className={styles.title}>{title}</p> : null}
        {children}
      </div>
    </section>
  );
}
