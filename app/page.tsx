import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <h1>ttcmd</h1>
      <p>
        Materiały i zadania kursu aplikacji desktopowych i mobilnych.
      </p>
      <p>
        <Link href="/moduly">Zobacz moduły</Link>
      </p>
    </>
  );
}
