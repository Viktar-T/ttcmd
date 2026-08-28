import { Inter, JetBrains_Mono } from "next/font/google";

/**
 * The only place in the repository where a typeface is named.
 * Faces chosen in ADR-0005; everything else refers to the CSS variables below.
 *
 * `subsets` MUST include 'latin-ext'. Polish splits across two Unicode blocks:
 * ó lives in Latin-1, but ą ć ę ł ń ś ź ż live in Latin Extended-A. With
 * ['latin'] alone the build passes, ó renders, and ł silently falls back.
 * `scripts/check-design-invariants.mjs` fails the build if latin-ext is missing.
 *
 * These option objects are read by the compiler's static analysis, so the
 * arrays must stay literal here — they cannot be hoisted into a shared const.
 */

export const sans = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});

export const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-mono",
});
