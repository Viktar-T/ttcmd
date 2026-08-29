import Link from "next/link";

export default function HomePage() {
  return (
    /* The landing page is a heading and two paragraphs today, so it takes the
       reading column like every other page — without it, a student walking
       / → /moduly → a module → a lesson sees the text jump left and right at
       every step. The design reference gives this page a composition of its
       own (headline, bordered button, module grid three across); the slice
       that builds it replaces this wrapper along with everything inside it. */
    <div className="prose">
      <h1>ttcmd</h1>
      <p>
        Materiały i zadania kursu aplikacji desktopowych i mobilnych.
      </p>
      <p>
        <Link href="/moduly">Zobacz moduły</Link>
      </p>
    </div>
  );
}
