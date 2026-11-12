# Accepted risks

Findings that were reviewed and deliberately left in place. Audits (people, scripts or AI tools) should
treat these as known and decided, and raise them again only if one of the listed revisit conditions
happens. Open work belongs in `docs/backlog.md`, not here.

## React Router moderate advisories (`npm audit`)

**Decided:** 2026-10-19 by Jeff Bliss. Stay on `react-router-dom` 6.30.x; do not run
`npm audit fix --force` and do not add an audit allowlist tool for these.

**What `npm audit` reports:** 2 moderate vulnerabilities in `react-router` 6.0.0 to 7.17.0, fixed only
in 7.18.0 and later (a breaking upgrade; no 6.x patch exists).

| Advisory                                                                                                                                                      | What it needs to be exploitable                                              | Why CREST is not affected                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [GHSA-wrjc-x8rr-h8h6](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6) open redirect via a backslash in `<Link>` / `useNavigate` (bypass of CVE-2025-68470) | An attacker-controlled path passed to `<Link to>` or `navigate()`            | Every navigation target is a hardcoded literal: the nav tabs, Home cards (`tabLocation` is only ever set to literal tab names in `src/components/Home/TabCallToActions.jsx`), region cards, the help popup's Examples link, and `navigate("/AnalyzeProjectSites")` in `ExampleCard.jsx`. No URL parameter, share-link field or user input ever reaches a link target. |
| [GHSA-337j-9hxr-rhxg](https://github.com/advisories/GHSA-337j-9hxr-rhxg) constructor injection via `deserializeErrors()` during SSR hydration                 | Framework mode, or data mode with manual server-side rendering and hydration | CREST is a client-only Vite app using declarative `<BrowserRouter>` with `<Routes>` (`src/main.jsx`, `src/App.jsx`); there is no server rendering or hydration. Declarative mode is not affected, per the advisory.                                                                                                                                                   |

**Expected `npm audit` output until this changes:** exactly these two moderate findings. Anything
else is new and needs a look.

**Revisit when any of these happens:**

- A new React Router advisory appears that is not one of the two above.
- Code starts passing anything not hardcoded (URL parameters, share-link state, search results, user
  input) to `<Link to>`, `navigate()` or `<Navigate>`.
- CREST adopts a data router (`createBrowserRouter`), loaders/actions, or server rendering.
- The app moves to React Router 7 for another reason (the upgrade notes for that are in the 2026-10-19
  audit discussion: declarative mode, `v7_startTransition` timing around the `shareUrl` handling in
  `src/pages/AnalyzeProjectSites.jsx` is the one area to test).
