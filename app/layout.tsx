import type { Metadata } from "next";
import { mono, sans } from "./fonts";
import { SiteHeader } from "@/components/site-header";
import "./tokens.css";
import "./globals.css";
import "./prose.css";
import "./nav.css";
import "./contents.css";
/* Last, and it is the only one here whose order matters: it overrides the
   reading treatment prose.css sets, and only while the mode is on. */
import "./presentation.css";

export const metadata: Metadata = {
  title: "ttcmd",
  description:
    "Materiały i zadania kursu aplikacji desktopowych i mobilnych.",
};

/**
 * Applied before the first paint. Dark is already in the server-rendered HTML
 * (ADR-0007, as amended), so this only ever flips to light — the common case
 * executes nothing. A flash of the wrong theme on every navigation would be
 * worse than having no toggle at all, which is why this is a classic
 * parser-blocking inline script and not next/script: beforeInteractive is a
 * strategy for external src scripts and explicitly does not block hydration.
 *
 * localStorage throws outright in some privacy modes, and a theme preference
 * is not worth a blank page — hence the try/catch.
 */
const applyStoredTheme = `try{if(localStorage.getItem('ttcmd-theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      data-theme="dark"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      {/* Required, not decorative: the script above mutates data-theme on the
          element React owns, and React would log a mismatch on every
          light-theme load without it. */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: applyStoredTheme }} />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
