# CREST v2 project notes

## Model roles

- **Architect: Fable 5.2 (`claude-fable-5-2`).** Fable owns the design of this project: planning,
  architecture decisions, specs, task breakdown and review of finished work.
- **Coding: Opus 5.5 (`claude-opus-5-5`).** Opus handles all coding tasks. When Fable is the
  session model, it hands every coding task to an Opus 5.5 subagent (Agent tool with
  `model: "opus"`) with exact scope and a definition of done, then reviews the result. Fable does
  not write the code itself.

## After a pull request merges

- Once a pull request is merged into `develop` and the working tree is clean, bring the local
  checkout back to `origin/develop` without being asked:
  `git checkout develop && git pull --ff-only`.
- Then delete the merged feature branch, both the local branch and the one on GitHub.

## Working rules

- Ask first, showing the exact command, before any write to AWS (S3, CloudFront, Lambda,
  CloudFormation, IAM) or `master`. A push to `develop` deploys the dev site.
- Work on a feature branch and open a PR into `develop` with an empty description. Merge with a
  merge commit.
- Planning docs (specs, plans, data files) stay local and untracked. `docs/backlog.md` is tracked;
  update it in the PR that closes an item.
- After a deploy, confirm the Actions run and stop. No browser checks on the live site; they create
  real share links.
- Show GDAL and raster findings with the exact command that proves them.
- Comments: one sentence at most, none when the code is clear.
- Leave the 3.4 MB chunk and Vite's 500 kB warning alone: no lazy routes or `manualChunks`.
- The two react-router advisories are accepted (`docs/accepted-risks.md`): no v7 upgrade, no audit
  allowlist.
- `docs/removed-commented-code.md` holds every removed commented-out block. Check it before
  restoring old UI, and add to it when removing more.

## Backend decisions (do not reopen)

- AWS SAM, python3.13 on x86_64, pip wheels, no Docker.
- Lambda function URLs, no API Gateway.
- API region key is `north_atlantic`, not `continental_us`.
- Land cover is NOAA C-CAP 2021, not NLCD.
- The prod stack and cutover wait for the owner's go-ahead. The v1 sites retire at cutover, not
  before.

## Browser preview

- Start the `crest` server from `.claude/launch.json` (port 8081; Docker holds 8080).
- MapLibre never loads in a hidden pane. Run this in the page first, then check through the DOM and
  map API: `window.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 16)`.
- Terra Draw only commits a vertex after a pointer move: hover, wait 0.4 s, then click.
