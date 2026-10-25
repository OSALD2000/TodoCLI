---
name: todocli-development
description: Use TodoCLI through npx to plan and track a coding agent's multi-step development task before and during implementation.
license: MIT
---

# Development planning with TodoCLI

Before editing code, turn the agreed work into a short list of implementation and verification steps in the project's TodoCLI list. Run commands from the project root as `npx --yes --package=ts_todo_cli@1.1.0 todo-cli <command>`.

- Inspect the existing list with `--show`. If none exists, create one with `--create -ig`; in a Git project, confirm `.todo/` is ignored.
- Add concrete steps with `--add <text>` before starting them. Keep task text free of TodoCLI option flags. Preserve existing tasks.
- After each step is verified, read `--show` for its current index and mark it with `--done <index>`. Leave unfinished work open and show the final list when reporting progress.
- Keep `.todo/` local; follow the project's own rules for commits and publication.
