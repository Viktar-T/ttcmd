/**
 * Slice 015. The gate that keeps the refresh-on-return behaviour out of every
 * page a student loads. A Server Component, mounted once in the root layout;
 * `components/dev-refresh-on-return.tsx` says what the behaviour is and why.
 *
 * Two things here are doing work.
 *
 * The guard is `!== "development"` rather than `=== "production"`, so that any
 * other environment — a test run, a preview harness — also gets nothing. A
 * production build inlines `process.env.NODE_ENV` as `"production"`, so this
 * whole component is a constant `return null` there.
 *
 * The import is dynamic AND inside the guard, and that is the part that matters.
 * A top-level import of a client module in a file the layout imports puts that
 * module into the route's client manifest, where it can be preloaded on a
 * production page even though it never renders — which is exactly what this
 * slice promised would not happen. Reached this way, the client reference only
 * comes into being when the branch runs, and the branch never runs in
 * production. Slice 015's criterion 7 checks that promise against a real
 * production build's network record, not against this comment.
 */
export default async function DevContentRefresh() {
  if (process.env.NODE_ENV !== "development") return null;
  const { DevRefreshOnReturn } = await import("./dev-refresh-on-return");
  return <DevRefreshOnReturn />;
}
