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
