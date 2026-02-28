# Migrations & Deprecations

This document tracks token renames, removals, and deprecations.
Each entry includes the deprecation date, replacement, and compatibility window.

---

## Active Deprecations

_None at this time._

---

## Completed Migrations

_None at this time._

---

## Migration Policy

1. **Prefer adding over renaming.** New token role? Add a new token; don't rename the old one.
2. **Deprecation window.** If renaming is unavoidable, keep the old token for at least one iteration with a deprecation comment in `tokens.css`:
   ```css
   /* DEPRECATED: use --new-token-name. Will be removed in next iteration. */
   --old-token-name: var(--new-token-name);
   ```
3. **Document here.** Add an entry to this file when deprecating.
4. **Consumer communication.** Include migration notes in the change note (`docs/changes/`).

---

## Template

```md
### `--old-token-name` → `--new-token-name`
- **Deprecated:** YYYY-MM-DD
- **Removal target:** next iteration (YYYY-MM-DD)
- **Reason:** [why the rename was needed]
- **Migration:** replace all usages of `--old-token-name` with `--new-token-name`
- **Compatibility shim:** old token aliased to new token until removal date
```
