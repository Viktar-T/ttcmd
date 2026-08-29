import Link from "next/link";
import { ThemeToggle } from "@/app/theme-toggle";

/**
 * The site header: a way home, and the theme control.
 *
 * It does not move, shrink or stick. The design reference's shrinking logo and
 * its pinned logo mark are scroll behaviour, and scroll behaviour arrives with
 * the contents panel and the back-to-top control that need the same machinery
 * (slice 007). A header that does not move is a header that cannot be wrong.
 *
 * The theme control lives here rather than pinned to the corner of the
 * viewport, which is where slice 003 left it with a note in its own file saying
 * the navigation slice would move it. That is now more than tidiness: the
 * accent band runs across the top of every module and lesson page, and a muted
 * control with a 1.47:1 border sitting on top of it would be a control nobody
 * can see.
 */
export function SiteHeader() {
  return (
    <header className="siteHeader">
      <div className="siteHeaderInner">
        <Link href="/" className="wordmark">
          ttcmd
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
