import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ttcmd",
  description:
    "Materiały i zadania kursu aplikacji desktopowych i mobilnych.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
