import type { Metadata } from "next";
import { getRankings } from "@/lib/ai-rankings";

export const metadata: Metadata = {
  title: "Ranking modeli AI — ttcmd",
};

/**
 * Where AI models are compared — slice 026.
 *
 * Links to public rankings and says what each one measures. It never shows a
 * position, a score or a model name from them: those change weekly and would
 * be claims this page cannot keep true. The list itself is content
 * (`content/ai-rankings.json`); the title and the two column headers are UI.
 *
 * A Server Component with no params, no hook and no fetch, so the validation
 * in `lib/ai-rankings.ts` runs while the page is prerendered and a malformed
 * list fails `npm run build`, as the schedule does on `/postep`.
 *
 * `prose lane` rather than a stylesheet of its own: a title, a sentence and a
 * table of sentences is what a lesson renders, and `app/prose.css` already
 * styles all three. `lane` puts the title on the left edge `/postep` and
 * `/moduly` share. Do not add `overflow-wrap: anywhere` to the cells — it
 * makes every column's minimum one character wide, and the first column then
 * breaks names letter by letter.
 *
 * The links are plain anchors that open in the same tab, unmarked (spec §5,
 * criterion 5) — deliberately not `ProseLink`, which gives a lesson's link to
 * another site a new tab and a ↗ (slice 010 §6), and not `next/link`, whose
 * prefetch is for routes inside the app.
 */
export default async function AiRankingsPage() {
  const { lede, rankings } = await getRankings();

  return (
    <div className="prose lane">
      <h1>Ranking modeli AI</h1>
      <p>{lede}</p>
      <table>
        <thead>
          <tr>
            <th scope="col">Ranking</th>
            <th scope="col">Co mierzy</th>
          </tr>
        </thead>
        <tbody>
          {/* Keyed by position: the list is static, never reorders on a
              client, and a duplicated address is not this page's to refuse. */}
          {rankings.map((ranking, position) => (
            <tr key={position}>
              <td>
                <a href={ranking.url}>{ranking.name}</a>
              </td>
              <td>{ranking.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
