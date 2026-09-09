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
 * The import is dynamic and stands behind the early return, and that is the
 * part that matters. A top-level import of a client module in a file the layout
 * imports puts that module into the route's client manifest, where it can be
 * preloaded on a production page even though it never renders — which is
 * exactly what this slice promised would not happen. Reached this way, the
 * client reference only comes into being if the line is ever executed.
 *
 * Note what that argument does NOT rest on: it is not enough that the branch is
 * unreachable in production, because a bundler is free to keep a lazy chunk for
 * an `import()` it cannot prove dead. The build was checked rather than
 * assumed. Turbopack inlines the environment, takes the early return and
 * eliminates the import: the compiled server chunk is `async function
 * k(){return null}`, no emitted client chunk carries this component, and no
 * request is made on return. Slice 015's criterion 7 and
 * `specs/015-content-dev-refresh/verification.md` hold that evidence. If that
 * elimination ever stops happening, the criterion is what catches it — not this
 * comment.
 */
export default async function DevContentRefresh() {
  if (process.env.NODE_ENV !== "development") return null;
  const { DevRefreshOnReturn } = await import("./dev-refresh-on-return");
  return <DevRefreshOnReturn />;
}
