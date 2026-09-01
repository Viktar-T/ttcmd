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
 *
 * Slice 013 added the mode to this same script rather than beside it. Both
 * preferences have to land before the same first paint and both come out of the
 * same store; two scripts would be two things to keep in step for no gain.
 *
 * The mode line only ever ADDS an attribute. Reading mode is the absence of
 * data-mode — which is what the served HTML says, so a visitor who has never
 * chosen executes nothing here either, and a visitor with scripting disabled
 * gets reading mode because that is what was already sent to them.
 */
const applyStoredPreferences =
  `try{var d=document.documentElement;` +
  `if(localStorage.getItem('ttcmd-theme')==='light')d.dataset.theme='light';` +
  `if(localStorage.getItem('ttcmd-mode')==='presentation')d.dataset.mode='presentation'}` +
  `catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      data-theme="dark"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      {/* Required, not decorative: the script above mutates data-theme and
          data-mode on the element React owns, and React would log a mismatch on
          every light-theme or presentation-mode load without it. */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: applyStoredPreferences }} />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
