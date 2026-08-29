import Link from "next/link";

export interface Crumb {
  label: string;
  /** Absent on the last step: the page you are already on is not a link. */
  href?: string;
}

/**
 * The chevron trail — the signature element `docs/design-reference.md` says
 * carries most of the character: connected arrow-shaped segments, earlier steps
 * outlined, the current step filled.
 *
 * The steps are short on purpose — the module listing, `Moduł N`, and the
 * lesson's identity string. The page's own heading is directly beneath this
 * carrying the full title, so a trail that repeated it would spend the width
 * twice and wrap into a stack on a phone.
 *
 * `role="list"` is not redundant with `<ol>`: Safari drops list semantics from
 * a list whose `list-style` is `none`, which this one's is.
 */
export function Breadcrumb({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Ścieżka nawigacji" className="breadcrumb">
      <ol className="breadcrumbList" role="list">
        {trail.map((crumb, index) => {
          const shape = index === 0 ? "chev" : "chev chevNotched";
          return (
            <li key={crumb.label} className="breadcrumbItem">
              {crumb.href ? (
                <Link href={crumb.href} className={shape}>
                  {crumb.label}
                </Link>
              ) : (
                <span className={`${shape} chevCurrent`} aria-current="page">
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
