import type { Metadata } from "next";
import { mono, sans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "ttcmd",
  description:
    "Materiały i zadania kursu aplikacji desktopowych i mobilnych.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
