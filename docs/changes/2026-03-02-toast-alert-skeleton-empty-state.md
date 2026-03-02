# Toast, Alert, Skeleton/Spinner, EmptyState (AKYD-012)

**Date:** 2026-03-02

---

## Summary

Four utility components completing the feedback and loading pattern layer of the DS.

---

## Files Added

```
src/components/ui/toast.tsx
src/components/ui/alert.tsx
src/components/ui/skeleton.tsx
src/components/ui/empty-state.tsx
```

`src/app/layout.tsx` updated to mount `<Toaster />` globally.

---

## Toast

Module-level pub/sub store — no Provider required.

```tsx
// Imperative API (works anywhere, even outside React)
toast("Profile saved", { description: "Changes applied." });
toast.info("Deploy started", { description: "~2 minutes." });
toast.error("Build failed", { description: "Module not found." });
toast("Action required", { duration: 0 }); // persistent

// Dismiss programmatically
const id = toast("...");
toast.dismiss(id);
```

Auto-dismiss default: 4000ms. Max 5 toasts stacked. Enter animation: slide up + fade in.

---

## Alert

Inline, stays in document flow. No state management needed.

```tsx
<Alert variant="default" title="Heads up">Message content.</Alert>
<Alert variant="info" title="Success">Deploy complete.</Alert>
<Alert variant="destructive" title="Error" onDismiss={() => setVisible(false)}>
  Payment failed.
</Alert>
```

Variants: `default` | `info` | `destructive`

---

## Skeleton + Spinner

```tsx
<Skeleton className="h-36 w-full" />          // pulse animation by default
<Skeleton animate={false} className="h-4 w-32" />

<Spinner />                                    // default size
<Spinner size="sm" />
<Spinner size="lg" label="Loading content…" />
```

---

## EmptyState

```tsx
<EmptyState
  icon={<Inbox className="h-5 w-5" />}
  title="No notifications"
  description="New notifications will appear here."
  action={<Button size="sm">Refresh</Button>}
/>
```

---

## Token Mapping

| Element | Token |
|---|---|
| Toast/Alert default | `border-border bg-muted/50 text-foreground` |
| Toast/Alert info | `border-primary/20 bg-primary/10 text-primary` |
| Toast/Alert destructive | `border-destructive/20 bg-destructive/10 text-destructive` |
| Skeleton | `bg-muted` + `animate-pulse` |
| Spinner track | `border-border` |
| Spinner head | `border-t-foreground` |
| EmptyState border | `border-dashed border-border` |
| EmptyState icon bg | `bg-muted text-muted-foreground` |

---

## Migration Notes

No breaking changes. Pure addition.
`<Toaster />` is now mounted in `app/layout.tsx` — no per-page setup needed.

---

## Verification

1. `npx tsc --noEmit` + `npm run build` — clean
2. Clicking toast trigger buttons shows stacked toasts at bottom-right
3. Toasts auto-dismiss after 4s; persistent toast stays until manually closed
4. Alert dismiss button hides alert (Reset button restores in playground)
5. Skeleton pulse animation visible
6. Spinner spins in all 3 sizes
7. Empty state renders icon + title + description + action in 3 variants
8. All components adapt correctly to light + dark mode
