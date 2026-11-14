# nostalgia-ui: behaviour, motion and the ship checklist

`CLAUDE.md` covers the stack and the registry rules. This file covers how components **behave**: the primitive
layer, the motion vocabulary, and what a component has to pass before it ships. The visual system (bevels,
type, the menu look) is in the Learnings section of
`docs/plans/2026-03-28-003-feat-nostalgia-ui-master-completion-plan.md`.

## The bar

Mac OS 9 on the outside, modern craft on the inside. A component should feel **calm at rest, alive under the
hand, and honest about state**:

1. **Calm at rest.** Platinum, square, still. Nothing moves unless something changed.
2. **Alive under the hand.** Every press, hover, drag and keystroke gets an answer within 150ms.
3. **Honest about state.** Loading, empty, error, disabled, partial and done each look different.

Motion is borrowed from what OS 9 actually did (zoom rects, WindowShade, the menu blink, the two-frame
disclosure triangle, the barber pole) and refined, never from a generic UI kit. No rounded corners, no
blur, no soft shadows, no bounce, no overshoot, no spin-for-fun.

## Primitives: UI SDK

Behaviour (focus, keyboard, ARIA, dismissal, popups, selection, drag) comes from **UI SDK** (`@ui-sdk/react`
+ `@ui-sdk/core`, pinned to the exact version in `package.json`). Docs ship in the package:
`node_modules/@ui-sdk/react/docs/llms.txt` is the index, `docs/components/<name>.md` has one page per
component (composition, styling hooks, data attributes, CSS variables, API). `docs/core.md` is >300 KB, so
grep it by heading. Types are the API; don't read compiled `dist/*.js`. Don't hand-roll keyboard, focus or
pointer logic UI SDK already ships, and don't use Radix, Base UI, cmdk, vaul, sonner, input-otp,
embla, react-day-picker or react-resizable-panels.

- **Imports are per entry:** `import { Dialog, DialogContent } from "@ui-sdk/react/dialog"`.
  `mergeProps` / `renderElement` live in `@ui-sdk/react/primitive`.
- **Composition uses `render`, not `asChild`:** `<RetroDialogTrigger render={<RetroButton />}>Open</RetroDialogTrigger>`;
  a link is `render={<Link href="/x" />}`. A self-closing trigger is fine: `<RetroTooltipTrigger render={<Icon />} />`.
- **`render` with a client component must be used from a client component.** A Server Component that passes
  `render={<RetroButton />}` hands UI SDK a lazy element it can't render. Docs pages that need it are
  `"use client"` and keep their `metadata` in a sibling `layout.tsx` (see `app/components/dialog/`).
- **No Portal/Positioner parts.** Popups render in place in the browser's top layer. `side`, `align`,
  `sideOffset`, `alignOffset`, `anchor` go on the content part. Origin is `origin-(--transform-origin)`.
- **State attributes** are UI SDK's, not Radix's: `data-open` / `data-closed`, `data-checked` /
  `data-unchecked` / `data-indeterminate`, `data-highlighted`, `data-selected`, `data-disabled`,
  `data-pressed`, `data-side`, `data-orientation`, `data-starting-style` / `data-ending-style`. Never
  `data-[state=open]`. Tailwind v4: `data-open:` works as a variant.
- **Enter/exit** use transitions from `data-starting-style` and to `data-ending-style` (they reverse
  mid-flight), not keyframes.
- **Height morphs** read UI SDK's measured variables: `--collapsible-panel-height`, `--accordion-panel-height`,
  `--tree-group-height`, with `h-(--var) data-starting-style:h-0 data-ending-style:h-0`.
- **UI SDK owns `data-slot`** on its parts. Select on its slots or on roles, not on ours.
- **The popup reset.** UI SDK resets `inset, width, height, max-width, max-height, margin, padding, border,
  overflow, color, background` on top-layer popup parts (dialog/tooltip/toast/popover/select…) inside
  `@layer ui-sdk`. Apps should declare `@layer ui-sdk;` above `@import "tailwindcss"`, but many won't, and
  then that layer beats Tailwind. So **on every part that renders as a popup, mark those properties
  important** (`p-[2px]!`, `border!`, `border-os9-black!`, `bg-os9-white!`, `fixed! left-1/2! top-1/2!`,
  `w-…!`, `max-w-…!`, `overflow-visible!`, `text-os9-black!`, `m-0!`). See `retro-dropdown-menu.tsx`,
  `retro-dialog.tsx`, `retro-tooltip.tsx`. Merge the consumer's `className` with
  `popupClass(base, className)` from retro-motion, never `cn`: it promotes a consumer class that
  conflicts with a guarded default (`p-4` vs `p-[2px]!`) to `!`, so overrides still win.
- **Popups render in place**, so they inherit HTML nesting rules: a popup that commonly sits in running
  text (tooltip) renders its parts as `<span>` (`render={<span />}`), or a `<p>` around it breaks hydration.
- **Disabled but explained:** a trigger that needs a tooltip while disabled uses `aria-disabled`, not
  `disabled` (which removes it from focus and pointer events). `RetroButton` supports both.
- **Next.js `cacheComponents`:** UI SDK's Calendar and Date Picker read today's date while rendering, which
  fails the prerender. Consumers wrap them in `<Suspense>` (or pass Calendar a `today`). Fresh
  `create-next-app` projects have `cacheComponents` on.

## Component shape

- `"use client"`, plain function components with `React.ComponentProps<typeof Primitive>` (React 19 passes
  `ref` as a prop; no `forwardRef` for new code). `className` merged with `cn`.
- **Keep the public API**: same export names and the same props as before where UI SDK allows it (e.g.
  `value`/`defaultValue`/`onValueChange`, `open`/`onOpenChange`, `checked`/`onCheckedChange`, `disabled`).
  Wrappers absorb differences. Where UI SDK genuinely differs (`render` instead of `asChild`, an extra
  required `value` on menu checkbox items), follow UI SDK and update every usage.
- For the parts UI SDK types with function-valued `className`/`children`, narrow them to strings / nodes
  (`Omit<P, "className" | "children"> & { className?: string; children?: React.ReactNode }`).
- A short header comment names the component's **crafted moment** (one, at most two) and what it means.
- Shared motion lives in `registry/new-york/lib/retro-motion.ts` (registry item `retro-motion`). Import it as
  `@/registry/new-york/lib/retro-motion`. A component that imports it lists
  `https://nostalgia-ui.com/r/retro-motion.json` in `registryDependencies`.
- Small keyframes/CSS that a component needs go in a React 19 hoisted style:
  `<style href="os9-<name>" precedence="default">{CSS}</style>` (deduped by `href`). Unlayered CSS beats
  Tailwind utilities, which is useful for overriding row styles.

## Flair: modern and classic

`data-flair="classic"` on any ancestor (usually `<html>`) turns the modern refinements off; no attribute
means modern. `prefers-reduced-motion` always wins.

| | modern (default) | classic |
|---|---|---|
| CSS | the transition | `in-data-[flair=classic]:transition-none` (or `steps()` timing) |
| JS | the choreography | `motionOff(el)` / `getFlair(el)` from retro-motion, checked when it plays |
| reduced motion | — | `motion-reduce:transition-none`; JS checks `prefersReducedMotion()` |

Some moments are OS 9 itself and play in **both** flairs: the menu blink and the two-frame disclosure triangle.

## Motion vocabulary (reuse, don't reinvent)

| Moment | Where | How |
|---|---|---|
| Gliding highlight | menus, menubar, select, combobox, command, list box | `useGlide(ref)` + `<span data-glide-layer>`; row ink flips with `transition: color 0s 60ms` |
| Menu blink | any menu-like item that runs a command | `onSelect={(e) => blinkThen(() => onSelect?.(e))}` (UI SDK keeps it pending/open); CSS in `retro-dropdown-menu` |
| Zoom rects | dialog, alert dialog, sheet, windows opened from an icon | `useZoomRects()` + `ZOOM_CONTENT_CLASS` |
| Height morph | accordion, collapsible, tree groups, WindowShade | UI SDK height var, 220ms open / 180ms close, `cubic-bezier(0.23,1,0.32,1)` |
| Two-frame triangle | disclosure triangles everywhere | `transition-transform duration-[110ms] [transition-timing-function:steps(2,end)]`, both flairs |
| Sliding pressed slab | segmented control / toggle group, tabs | UI SDK indicator vars (`--segmented-control-indicator-*`, `--active-tab-*`), 180ms |
| Pop from trigger | popover, hover card, tooltip (Balloon Help) | `origin-(--transform-origin)`, scale .9–.95 + fade, 120–150ms; `data-instant:transition-none` |
| Eased fill | progress, slider fill, meters | `transition-[width] 500ms` ease-out-strong; classic jumps |
| Barber pole | indeterminate progress | 16px seamless stripe tile; modern linear, classic `steps(4)` |
| Act, then Undo | destructive-but-reversible actions | act at once, toast with an Undo action; no "Are you sure?" |

Timing scale: feedback ≤150ms, entrances 100–240ms, exits faster than entrances. Easing: `ease-out` or
`cubic-bezier(0.23,1,0.32,1)` for entrances. Scale tweens stay within .9–1.

## Ship checklist (every component)

- [ ] Built on UI SDK where UI SDK has the behaviour; no Radix or behaviour-library imports left.
- [ ] Popup parts guard reset properties with `!` and merge `className` with `popupClass`.
- [ ] Keyboard: everything reachable and operable; arrows inside composite widgets; Enter/Space act; Esc backs
      out; visible `os9-focus-ring`.
- [ ] States: disabled, empty, loading where relevant; long text truncates deliberately.
- [ ] Motion: one crafted moment, named in the header comment; classic flair and reduced motion handled.
- [ ] No border-radius (Balloon Help excepted), no blur, no soft shadows.
- [ ] Every usage updated (`grep -rn "<Name" app registry`), including code strings in docs pages.
- [ ] `node scripts/sync-registry-deps.mjs` (deps come from imports; `--check` in CI).
- [ ] `npx tsc --noEmit`, `pnpm lint`, and the docs page loads with no console errors or UI SDK warnings
      (it warns about unlabeled triggers; give every trigger a name).
