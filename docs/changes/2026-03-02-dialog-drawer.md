# Dialog + Drawer Components (AKYD-011)

**Date:** 2026-03-02

---

## Summary

Added `Dialog` and `Drawer` as composable, zero-dependency overlay primitives built on `react-dom` portals. Shared infrastructure: `useFocusTrap` and `useLockBodyScroll` hooks.

---

## Files Added

```
src/hooks/use-lock-body-scroll.ts
src/hooks/use-focus-trap.ts
src/components/ui/dialog.tsx
src/components/ui/drawer.tsx
```

---

## API

Both components follow identical patterns — controlled or uncontrolled, with composable anatomy parts.

```tsx
// Dialog
<Dialog>
  <DialogTrigger><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <DialogBody>…</DialogBody>
    <DialogFooter>
      <DialogClose><Button variant="ghost">Cancel</Button></DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Drawer (side: "right" | "left" | "bottom" | "top")
<Drawer>
  <DrawerTrigger><Button>Open</Button></DrawerTrigger>
  <DrawerContent side="right">
    <DrawerHeader>…</DrawerHeader>
    <DrawerBody>…</DrawerBody>
    <DrawerFooter>…</DrawerFooter>
  </DrawerContent>
</Drawer>
```

---

## Accessibility

| Feature | Implementation |
|---|---|
| Focus trap | `useFocusTrap` — Tab/Shift+Tab cycle within panel |
| Scroll lock | `useLockBodyScroll` — `overflow: hidden` on body |
| Keyboard dismiss | Escape key closes |
| Overlay click | Click outside closes |
| ARIA | `role="dialog"`, `aria-modal="true"` on panel |
| Focus on open | First focusable element receives focus |

---

## Token Mapping

| Element | Token |
|---|---|
| Overlay | `bg-foreground/40 backdrop-blur-sm` |
| Panel bg | `bg-background` |
| Panel border | `border-border` |
| Close button hover | `hover:bg-accent hover:text-foreground` |
| Focus ring | `ring-2 ring-ring ring-offset-1` |

---

## Animation

- **Dialog**: opacity + scale (`opacity-0 scale-95` → `opacity-100 scale-100`), 200ms
- **Drawer**: translate off-screen → `translate-x-0 / translate-y-0`, 300ms ease-in-out
- No `tailwindcss-animate` plugin required — standard Tailwind `transition` classes only

---

## Migration Notes

No breaking changes. Pure addition.

---

## Verification Steps

1. `npx tsc --noEmit` — passes
2. `/paper-playground` — Dialog + Drawer sections visible
3. Basic / destructive / form dialogs open and close
4. Right panel + bottom sheet drawers open and slide in
5. Escape key closes; overlay click closes; X button closes; Cancel button closes
6. Tab key cycles focus within panel
7. Body scroll locked while open
8. Light + dark mode both render correctly
