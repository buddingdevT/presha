---
description: Refresh AGENT_GUIDE.md with the latest session handoff and current project checkpoint
argument-hint: Optional short note about what changed this session
---

Update `AGENT_GUIDE.md` so it stays current as the canonical onboarding and handoff document for this project.

Use this workflow:

1. Read the current `AGENT_GUIDE.md`.
2. Inspect the live repo state before editing:
   - `git status --short --branch`
   - `git log --decorate --oneline -n 5`
   - any key files changed in this session
3. Refresh the `## 16. Session Handoff` block in `AGENT_GUIDE.md`.
4. If the session materially changed project reality, also update any relevant parts of `AGENT_GUIDE.md`, especially:
   - source of truth / current repo state
   - homepage structure
   - what has been built
   - current known issues
   - Shopify Admin work still needed
   - best next actions
5. Keep the file concise and practical. Do not turn it into a changelog.
6. Preserve stable project context unless the repo state truly changed.

When updating the handoff section, include:

- Date
- Agent
- What was done
- Files changed
- Shopify push status
- Git status / commit
- Remaining blockers
- Recommended next step

Optional session note from the user:

`$ARGUMENTS`
