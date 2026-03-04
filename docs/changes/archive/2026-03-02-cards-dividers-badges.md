# 2026-03-02 — Cards, Dividers, Badges

## Summary
Completes the Layout/Containment component group. Adds `Badge` and `Divider` as new components, extends `Card` with `CardFooter`, and adds a full showcase section to `/paper-playground` covering all four patterns.

## What changed

### New components (`akymic-app-template`)
- `src/components/ui/badge.tsx` — inline label component; 4 variants × 2 sizes
- `src/components/ui/divider.tsx` — separator; horizontal (plain + labeled) + vertical

### Extended components (`akymic-app-template`)
- `src/components/ui/card.tsx` — added `CardFooter` (was missing; `flex items-center p-6 pt-0`)

### Updated files (`akymic-app-template`)
- `src/app/paper-playground/page.tsx` — added Badge, Divider, Card showcase sections (stat card, list card, interactive card, login form divider pattern)
- `AGENT.md` — Badge + Divider APIs documented; Card import updated with CardFooter; new entries in common-mistakes table

### Updated files (`akymic-design-system`)
- `docs/components.md` — Card, Divider, Badge → stable; roadmap updated
- `AGENT.md` — component inventory updated

## Component APIs

### Badge
```tsx
<Badge variant="default | secondary | destructive | outline" size="sm | default" />
```

### Divider
```tsx
<Divider />                           // horizontal plain
<Divider label="or" />                // horizontal with centered label
<Divider orientation="vertical" />    // vertical (self-stretch)
```

### CardFooter (new export from card.tsx)
```tsx
import { ..., CardFooter } from "@/components/ui/card";
<CardFooter className="gap-2">
  <Button size="sm">Open</Button>
</CardFooter>
```

## No new tokens
All surfaces map to existing tokens:
- Badge backgrounds: `--primary`, `--secondary`, `--destructive`
- Badge outline: `--border`
- Divider line: `--border`
- Divider label text: `--muted-foreground`

## Verification steps
1. `cd akymic-app-template && npm run dev`
2. Open `/paper-playground` — verify Badge, Divider, Card sections render
3. Toggle light/dark — divider lines and badge colors must switch cleanly
4. Verify `CardFooter` aligns correctly below `CardContent` in the standard card example
