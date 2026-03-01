# 2026-03-01 — Navigation Shell

## Summary
Implements the navigation shell (Topbar + Sidebar + AppShell layout) in `akymic-app-template`. Replaces the minimal placeholder home page with a working dashboard view: greeting, 4 KPI stat cards, and a recent activity list.

## What changed

### New components (`akymic-app-template`)
- `src/components/ui/nav-sidebar.tsx` — sidebar with logo, two nav sections (General / Workspace), and a user footer with settings link. Active state driven by `usePathname`.
- `src/components/ui/topbar.tsx` — 60px header with page title, search/bell icon buttons, theme toggle, and user avatar.
- `src/components/app-shell.tsx` — server-compatible layout wrapper combining sidebar + topbar.

### Updated files (`akymic-app-template`)
- `src/app/page.tsx` — full dashboard page (greeting, stat cards, activity feed) wrapped in `AppShell`.
- `src/app/layout.tsx` — reverted to ThemeProvider only; AppShell is opt-in per page so `paper-playground` is unaffected.

## Tokens used (no new tokens required)
All navigation shell surfaces map to existing tokens:

| Surface | Token |
|---|---|
| Sidebar background | `--muted` |
| Content background | `--background` |
| Sidebar/topbar border | `--border` |
| Nav item text (inactive) | `--muted-foreground` |
| Nav item hover bg | `--accent` |
| Nav item hover text | `--accent-foreground` |
| Nav item active bg | `--primary` |
| Nav item active text | `--primary-foreground` |
| Section labels | `--muted-foreground` |
| User avatar bg | `--primary` |

## No breaking changes
No tokens renamed or removed. The `paper-playground` route is unaffected.

## Verification steps
1. `cd akymic-app-template && npm run dev`
2. Open `http://localhost:3000` — should show sidebar + topbar + dashboard content
3. Toggle light/dark — all surfaces should switch cleanly
4. Active state: Dashboard nav item should be highlighted in primary blue
5. Open `/paper-playground` — should render without shell (own header intact)

## Paper artboards
Deferred — Paper MCP weekly tool limit reached. Artboards ("Navigation Shell — Light" and "Navigation Shell — Dark") to be created in the next session.
