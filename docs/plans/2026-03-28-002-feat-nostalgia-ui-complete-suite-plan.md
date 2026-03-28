---
title: "feat: Complete nostalgia-ui component suite - full OS9 design system"
type: feat
status: completed
date: 2026-03-28
origin: docs/plans/2026-03-28-001-feat-nostalgia-ui-registry-plan.md
---

# feat: Complete nostalgia-ui component suite - full OS9 design system

## Overview

Expand nostalgia-ui from 11 components to a comprehensive ~30+ component design system. This covers all remaining Figma kit components AND standard shadcn components restyled to fit the Mac OS 9 visual language. The goal is parity with the shadcn component catalog — every commonly-used shadcn component should have a nostalgia-ui equivalent.

## Problem Frame

Phase 1 established the foundation (design tokens, CSS utilities, registry infrastructure) and 11 core components. But a usable design system needs more — scrollbars, dialogs, tooltips, tables, context menus, labels, textareas, separators, and more. Users who adopt nostalgia-ui shouldn't need to fall back to unstyled shadcn components for common patterns.

## Requirements Trace

- R1. **Figma coverage** — Build every remaining component from the Mac OS 9 Figma kit
- R2. **shadcn parity** — Restyle standard shadcn components to fit OS9 seamlessly
- R3. **Consistent design language** — All new components use the same `--os9-*` tokens, `os9-raised`/`os9-inset`/`os9-window` utilities, and `cva`/`forwardRef`/`cn` patterns from Phase 1
- R4. **Registry completeness** — Every component is a `registry:ui` item in `registry.json` with correct dependencies
- R5. **Preview pages** — Every component has a preview page at `/preview/{name}`

## Scope Boundaries

- **In scope:** All components listed below, preview pages, registry items
- **Not in scope:** Calendar, Date Picker, Chart, Carousel, Form (React Hook Form), Command palette, Resizable panels, Sidebar — these are complex composed patterns better left for a Phase 3
- **Not in scope:** Input OTP, Sonner (toast library), Drawer (Vaul) — these have hard third-party dependencies that don't match OS9

## Context & Research

### Existing Components (Phase 1 — already built)

1. retro-button
2. retro-checkbox
3. retro-radio
4. retro-input
5. retro-tabs
6. retro-select
7. retro-progress
8. retro-slider
9. retro-title-bar
10. retro-window
11. retro-menu-bar

### Figma Components Not Yet Built

| Component | Node ID | Key Sub-nodes | What it provides |
|---|---|---|---|
| Scrollbar | `69:125817` | Vertical: `63:115437`, Horizontal: `63:116188`, Size box: `63:125401` | 16px wide track, raised thumb, arrow buttons at ends, active/disabled/no-scroll states |
| Dropdown Menu | `69:105642` | Default menu: `53:50342`, Small menu: `56:136918` | Context/right-click menu with items, separators, sub-menus, icons, shortcuts |
| List Items | `68:130074` | Menu items: `49:36950`, List items: `51:22274`, Control strip items: `56:60150` | Checked, dropdown, single, shortcut types; default/hover/disabled; with/without icons and separators |
| Column List Header | `69:115439` | Header atom: `63:98079` | Sortable column headers with left/right align, first column, icon, reorder arrows |
| Folder List | `69:117834` | — | Tree view / hierarchical list with expand/collapse |
| Folder Tag | `69:117027` | — | Folder label/badge elements |
| Navigation Button | `69:116209` | Atom: `63:118140` | 16x16px directional buttons (left/right/up/down) with default/active/disabled |
| Control Strip | `68:120833` | — | System control strip (volume, screen, etc.) |
| Chevron | `68:122573` | Atom: `60:67765`, Dropdown: `60:68188` | 8x8px directional arrows (up/down/left/right), default and purple variants |

### shadcn Components to Restyle for OS9

These don't exist in the Figma kit but are standard shadcn components that should be restyled:

| Component | Radix Primitive | OS9 Treatment |
|---|---|---|
| **Label** | `@radix-ui/react-label` | Geneva 10pt, pairs with inputs/checkboxes |
| **Textarea** | native | Multi-line retro-input with os9-inset bevel |
| **Separator** | `@radix-ui/react-separator` | 1px line with bevel highlight (dark + light line pair) |
| **Dialog** | `@radix-ui/react-dialog` | OS9 alert box — window frame with title bar, icon area, buttons |
| **Alert Dialog** | `@radix-ui/react-alert-dialog` | OS9 system alert with caution icon, message, OK/Cancel buttons |
| **Tooltip** | `@radix-ui/react-tooltip` | OS9 "Balloon Help" — yellow rounded tooltip with black border |
| **Popover** | `@radix-ui/react-popover` | OS9 popup panel with window shadow |
| **Context Menu** | `@radix-ui/react-context-menu` | Right-click menu using list item styling from Figma |
| **Dropdown Menu** | `@radix-ui/react-dropdown-menu` | Click-triggered menu using list item styling from Figma |
| **Toggle** | `@radix-ui/react-toggle` | OS9 pressed/unpressed button (reuse button bevel) |
| **Toggle Group** | `@radix-ui/react-toggle-group` | Row of OS9 toggle buttons |
| **Switch** | `@radix-ui/react-switch` | OS9-style on/off toggle (checkbox-like or custom) |
| **Table** | native HTML | OS9 list view with column headers, alternating rows, selection highlight |
| **Badge** | native | Small OS9-styled label/tag |
| **Card** | native | OS9 panel with inset bevel and optional header |
| **Scroll Area** | `@radix-ui/react-scroll-area` | Wraps content with retro-scrollbar styling |
| **Skeleton** | native | OS9 loading placeholder (striped/hatched pattern) |
| **Avatar** | `@radix-ui/react-avatar` | OS9-style user icon with bevel frame |
| **Accordion** | `@radix-ui/react-accordion` | OS9 disclosure triangles with collapsible sections |
| **Collapsible** | `@radix-ui/react-collapsible` | Simple expand/collapse with OS9 chevron |
| **Sheet** | `@radix-ui/react-dialog` | OS9 slide-in panel with window chrome |
| **Hover Card** | `@radix-ui/react-hover-card` | OS9 popup card on hover |
| **Alert** | native | OS9 system notification bar |
| **Breadcrumb** | native | OS9 path breadcrumb (similar to Finder path) |
| **Pagination** | native | OS9-styled page navigation |
| **Navigation Menu** | `@radix-ui/react-navigation-menu` | OS9 horizontal nav with dropdowns |
| **Toast** | native (custom) | OS9 notification toast |

## Key Technical Decisions

- **Same patterns as Phase 1** — every component uses `cva`, `forwardRef`, `cn()`, `--os9-*` tokens
- **Figma-first for kit components** — fetch from Figma MCP, study screenshot, translate to CSS
- **Design-inference for non-Figma components** — apply the established OS9 visual language (raised bevel, inset bevel, window shadow, azul highlight, Charcoal/Geneva fonts) consistently
- **Prioritize by usage frequency** — high-use components (Label, Textarea, Dialog, Tooltip, Table) come first
- **Skip extreme complexity** — Calendar, Command palette, Data Table (TanStack), Sidebar are Phase 3

## Implementation Units

### Phase A: Essential Form & Layout (Quick Wins)

- [x] **Unit 15: retro-label**

  **Goal:** Simple label component for form controls.
  **Radix:** `@radix-ui/react-label`
  **Files:** Create `registry/new-york/ui/retro-label.tsx`, `app/preview/label/page.tsx`
  **Approach:** Geneva 10pt, `--os9-black` text, cursor pointer, disabled state grayed. Pairs with checkbox/radio/input.
  **Figma:** Not in kit — infer from existing text styles.

- [x] **Unit 16: retro-textarea**

  **Goal:** Multi-line text input with OS9 inset bevel.
  **Radix:** None (native `<textarea>`)
  **Files:** Create `registry/new-york/ui/retro-textarea.tsx`, `app/preview/textarea/page.tsx`
  **Approach:** Same styling as retro-input (inset bevel, focus ring, sizes) but multi-line. Min-height, resize handle.
  **Figma:** Not in kit — extend retro-input pattern.

- [x] **Unit 17: retro-separator**

  **Goal:** Horizontal/vertical divider with OS9 bevel.
  **Radix:** `@radix-ui/react-separator`
  **Files:** Create `registry/new-york/ui/retro-separator.tsx`, `app/preview/separator/page.tsx`
  **Approach:** 2px total: top 1px `--os9-gray-700`, bottom 1px `--os9-white` for classic beveled line. Horizontal and vertical orientations.
  **Figma:** The separator is visible in List Items (`69:110389`) — a 2px beveled horizontal rule.

- [x] **Unit 18: retro-badge**

  **Goal:** Small status label/tag.
  **Radix:** None (native span)
  **Files:** Create `registry/new-york/ui/retro-badge.tsx`, `app/preview/badge/page.tsx`
  **Approach:** `os9-raised` bevel, small padding, Geneva 9pt, variants: default (gray), accent (lavender), azul (blue).
  **Figma:** Infer from Folder Tag (`69:117027`).

- [x] **Unit 19: retro-card**

  **Goal:** Content container panel.
  **Radix:** None (native div)
  **Files:** Create `registry/new-york/ui/retro-card.tsx`, `app/preview/card/page.tsx`
  **Approach:** OS9 inset panel or raised panel variants. Card, CardHeader, CardContent, CardFooter subcomponents. Uses `os9-inset` or `os9-window` depending on variant.
  **Figma:** Infer from Window content area pattern.

### Phase B: Overlays & Dialogs

- [x] **Unit 20: retro-dialog**

  **Goal:** Modal dialog with OS9 window chrome.
  **Radix:** `@radix-ui/react-dialog`
  **Files:** Create `registry/new-york/ui/retro-dialog.tsx`, `app/preview/dialog/page.tsx`
  **Approach:** OS9 alert-style dialog — renders as a retro-window with title bar, centered on screen, dimmed backdrop. DialogContent gets window shadow, DialogTitle uses heading font, DialogFooter has button row. `registryDependencies: ["retro-button"]`.
  **Figma:** Infer from Window (`69:130300`) chrome patterns.

- [x] **Unit 21: retro-alert-dialog**

  **Goal:** Confirmation dialog (OK/Cancel) with OS9 alert styling.
  **Radix:** `@radix-ui/react-alert-dialog`
  **Files:** Create `registry/new-york/ui/retro-alert-dialog.tsx`, `app/preview/alert-dialog/page.tsx`
  **Approach:** Same as retro-dialog but non-dismissable, with action/cancel buttons. Classic OS9 caution icon (inline SVG triangle with exclamation).
  **Figma:** Infer from Window patterns + OS9 alert conventions.

- [x] **Unit 22: retro-tooltip**

  **Goal:** Hover tooltip with OS9 "Balloon Help" style.
  **Radix:** `@radix-ui/react-tooltip`
  **Files:** Create `registry/new-york/ui/retro-tooltip.tsx`, `app/preview/tooltip/page.tsx`
  **Approach:** Classic OS9 balloon help: yellow (`#ffffcc`) background, 1px black border, rounded corners (yes, OS9 balloon help was rounded!), small tail/arrow. Geneva 10pt text.
  **Figma:** Not in kit — this is a well-known OS9 pattern.

- [x] **Unit 23: retro-popover**

  **Goal:** Generic floating panel triggered by click.
  **Radix:** `@radix-ui/react-popover`
  **Files:** Create `registry/new-york/ui/retro-popover.tsx`, `app/preview/popover/page.tsx`
  **Approach:** OS9 popup panel with `os9-window` shadow, white background, 1px black border. No title bar (unlike dialog).
  **Figma:** Infer from dropdown menu shadow patterns.

- [x] **Unit 24: retro-sheet**

  **Goal:** Slide-in panel from screen edge.
  **Radix:** `@radix-ui/react-dialog` (Sheet is Dialog variant)
  **Files:** Create `registry/new-york/ui/retro-sheet.tsx`, `app/preview/sheet/page.tsx`
  **Approach:** Full-height panel with OS9 window chrome on the visible edge. Slides from left/right/top/bottom. Background overlay.
  **Figma:** Infer from Window chrome.

- [x] **Unit 25: retro-hover-card**

  **Goal:** Card that appears on hover for preview content.
  **Radix:** `@radix-ui/react-hover-card`
  **Files:** Create `registry/new-york/ui/retro-hover-card.tsx`, `app/preview/hover-card/page.tsx`
  **Approach:** OS9 popup panel (similar to popover) with window shadow. Appears on hover with delay.
  **Figma:** Infer from Window/popover patterns.

### Phase C: Menus & Navigation

- [x] **Unit 26: retro-context-menu**

  **Goal:** Right-click context menu with OS9 styling.
  **Radix:** `@radix-ui/react-context-menu`
  **Files:** Create `registry/new-york/ui/retro-context-menu.tsx`, `app/preview/context-menu/page.tsx`
  **Approach:** White bg, 1px black border, `2px 2px 0` drop shadow. Items 18px tall, Charcoal 12pt. Hover: azul bg + white text. Separators: 2px bevel line. Sub-menus with right chevron. Keyboard shortcuts right-aligned in gray.
  **Figma:** Dropdown Menu (`69:105642`) — the list item styling at `51:22274` applies directly. Items have checked/dropdown/single/shortcut types.

- [x] **Unit 27: retro-dropdown-menu**

  **Goal:** Click-triggered dropdown menu (different from Select — more flexible).
  **Radix:** `@radix-ui/react-dropdown-menu`
  **Files:** Create `registry/new-york/ui/retro-dropdown-menu.tsx`, `app/preview/dropdown-menu/page.tsx`
  **Approach:** Same visual styling as context-menu but triggered by button click. Supports checkboxes, radio items, sub-menus.
  **Figma:** Same Dropdown Menu frame (`69:105642`).

- [x] **Unit 28: retro-navigation-menu**

  **Goal:** Horizontal navigation with dropdown sub-menus.
  **Radix:** `@radix-ui/react-navigation-menu`
  **Files:** Create `registry/new-york/ui/retro-navigation-menu.tsx`, `app/preview/navigation-menu/page.tsx`
  **Approach:** Similar to menu-bar but for site navigation. Gray bar, Charcoal font triggers, dropdown panels with OS9 shadow.
  **Figma:** Infer from Menu Bar (`68:129309`).

- [x] **Unit 29: retro-breadcrumb**

  **Goal:** File path breadcrumb navigation.
  **Radix:** None (native)
  **Files:** Create `registry/new-york/ui/retro-breadcrumb.tsx`, `app/preview/breadcrumb/page.tsx`
  **Approach:** OS9 Finder-style path: items separated by right chevron (`>`), Geneva 10pt, last item bold. Clickable ancestors.
  **Figma:** Infer from Chevron (`68:122573`) for separator arrows.

- [x] **Unit 30: retro-pagination**

  **Goal:** Page navigation controls.
  **Radix:** None (native)
  **Files:** Create `registry/new-york/ui/retro-pagination.tsx`, `app/preview/pagination/page.tsx`
  **Approach:** Previous/Next as retro-button, page numbers as flat items, current page with azul highlight. Uses Navigation Button arrows from Figma.
  **Figma:** Navigation Button (`69:116209`) for arrow icons.

### Phase D: Figma Kit Components

- [x] **Unit 31: retro-scrollbar**

  **Goal:** OS9-style scrollbar for scroll areas.
  **Radix:** `@radix-ui/react-scroll-area`
  **Files:** Create `registry/new-york/ui/retro-scrollbar.tsx`, `app/preview/scrollbar/page.tsx`
  **Approach:** 16px wide track with `os9-inset` styling. Raised thumb (draggable). Arrow buttons at top/bottom (or left/right for horizontal). States: default, active (thumb pressed), no-scroll (disabled), out-of-focus. Size box (16x16 corner square) where H and V scrollbars meet.
  **Figma:** Scrollbar (`69:125817`), atoms at `63:115437` (vertical), `63:116188` (horizontal), `63:125401` (size box).

- [x] **Unit 32: retro-table**

  **Goal:** Data table with OS9 column headers and list rows.
  **Radix:** None (native HTML table)
  **Files:** Create `registry/new-york/ui/retro-table.tsx`, `app/preview/table/page.tsx`
  **Approach:** Column List Header (`69:115439`) for `<th>` — raised bevel cells with sort arrows. List Items (`68:130074`) for `<td>` — 18px rows, hover highlights with azul, alternating subtle bg. Table, TableHeader, TableBody, TableRow, TableHead, TableCell subcomponents.
  **Figma:** Column List Header + List Items combined.

- [x] **Unit 33: retro-chevron**

  **Goal:** Disclosure triangle / directional arrow icon.
  **Radix:** None (native)
  **Files:** Create `registry/new-york/ui/retro-chevron.tsx`, `app/preview/chevron/page.tsx`
  **Approach:** 8x8px SVG arrows in 4 directions (up/down/left/right). Two color variants: default (black) and purple (azul). Used by accordion, breadcrumb, select, and tree views.
  **Figma:** Chevron (`68:122573`), atoms at `60:67765`.

- [x] **Unit 34: retro-nav-button**

  **Goal:** Directional navigation button (back/forward/up/down).
  **Radix:** None (native button)
  **Files:** Create `registry/new-york/ui/retro-nav-button.tsx`, `app/preview/nav-button/page.tsx`
  **Approach:** 16x16px button with raised bevel and centered arrow SVG. 4 directions, 3 states (default/active/disabled).
  **Figma:** Navigation Button (`69:116209`), atoms at `63:118140`.

### Phase E: Interactive Patterns

- [x] **Unit 35: retro-toggle**

  **Goal:** Pressable toggle button (on/off).
  **Radix:** `@radix-ui/react-toggle`
  **Files:** Create `registry/new-york/ui/retro-toggle.tsx`, `app/preview/toggle/page.tsx`
  **Approach:** Reuses button bevel. Unpressed: `os9-raised`. Pressed/active: `os9-pressed` (inverted shadows, dark bg). Toggle state via `data-state="on"`.
  **Figma:** Infer from Button active state.

- [x] **Unit 36: retro-toggle-group**

  **Goal:** Row of mutually exclusive or multi-select toggle buttons.
  **Radix:** `@radix-ui/react-toggle-group`
  **Files:** Create `registry/new-york/ui/retro-toggle-group.tsx`, `app/preview/toggle-group/page.tsx`
  **Approach:** Horizontal group of retro-toggle buttons with shared borders (adjacent buttons share a border edge). Type: single or multiple.
  **Figma:** Infer from Button + Tab patterns.

- [x] **Unit 37: retro-switch**

  **Goal:** On/off toggle switch.
  **Radix:** `@radix-ui/react-switch`
  **Files:** Create `registry/new-york/ui/retro-switch.tsx`, `app/preview/switch/page.tsx`
  **Approach:** OS9 didn't have modern switches — interpret as a small rectangular track (inset bevel) with a sliding rectangular thumb (raised bevel), similar to the slider but binary. Or: two adjacent labeled buttons ("On" / "Off") where the active one is pressed.
  **Figma:** Infer from Slider thumb + Checkbox patterns.

- [x] **Unit 38: retro-accordion**

  **Goal:** Expandable/collapsible content sections.
  **Radix:** `@radix-ui/react-accordion`
  **Files:** Create `registry/new-york/ui/retro-accordion.tsx`, `app/preview/accordion/page.tsx`
  **Approach:** OS9 disclosure triangle (right-pointing chevron rotates to down when expanded). Trigger row with Charcoal heading. Content area with separator between items. `registryDependencies: ["retro-chevron"]`.
  **Figma:** Chevron (`68:122573`) for the disclosure triangle.

- [x] **Unit 39: retro-collapsible**

  **Goal:** Simple expand/collapse container.
  **Radix:** `@radix-ui/react-collapsible`
  **Files:** Create `registry/new-york/ui/retro-collapsible.tsx`, `app/preview/collapsible/page.tsx`
  **Approach:** Disclosure triangle trigger + collapsible content. Simpler than accordion (no multiple items).
  **Figma:** Same chevron pattern.

### Phase F: Feedback & Status

- [x] **Unit 40: retro-alert**

  **Goal:** Inline callout/notification banner.
  **Radix:** None (native)
  **Files:** Create `registry/new-york/ui/retro-alert.tsx`, `app/preview/alert/page.tsx`
  **Approach:** OS9-style alert panel with inset bevel, left icon area (info/warning/error SVG), title + description text. Variants: default (gray), warning (yellow tint), error (red tint).
  **Figma:** Infer from Window + OS9 alert conventions.

- [x] **Unit 41: retro-skeleton**

  **Goal:** Loading placeholder.
  **Radix:** None (native div)
  **Files:** Create `registry/new-york/ui/retro-skeleton.tsx`, `app/preview/skeleton/page.tsx`
  **Approach:** OS9-style hatched/dithered pattern as loading placeholder. Uses `repeating-linear-gradient` with thin diagonal lines in gray. Pulse animation optional.
  **Figma:** Halftone Textures (`73:914`) for pattern reference.

- [x] **Unit 42: retro-avatar**

  **Goal:** User image with fallback.
  **Radix:** `@radix-ui/react-avatar`
  **Files:** Create `registry/new-york/ui/retro-avatar.tsx`, `app/preview/avatar/page.tsx`
  **Approach:** Circular or square image with 1px black border and raised bevel frame. Fallback shows initials on `--os9-gray-300` background.
  **Figma:** Infer from control box bevel patterns.

- [x] **Unit 43: retro-toast**

  **Goal:** Temporary notification message.
  **Radix:** None (custom implementation or lightweight)
  **Files:** Create `registry/new-york/ui/retro-toast.tsx`, `app/preview/toast/page.tsx`
  **Approach:** OS9 notification panel — small window-styled toast with title bar and message, auto-dismisses. Appears bottom-right. Uses window shadow + title bar stripe.
  **Figma:** Infer from Window chrome at small scale.

### Phase G: Finalization

- [x] **Unit 44: Update registry.json, rebuild, and verify**

  **Goal:** All new components registered, build passes, preview index updated.
  **Files:** Modify `registry.json`, `app/preview/page.tsx`, `app/page.tsx`
  **Approach:** Add all new items to registry.json, run `shadcn build`, verify every JSON file exists. Update preview index with all ~30+ components. Update home page showcase.

- [x] **Unit 45: Commit and push**

  **Goal:** All work committed to GitHub.

## Figma Node ID Reference (for remaining kit components)

| Component | Node ID | Key Sub-nodes |
|---|---|---|
| Scrollbar | `69:125817` | V-Default: `63:115437`, V-Active: `63:125356`, H-Default: `63:116188`, H-Active: `63:125039`, Size box: `63:125401` |
| Dropdown Menu | `69:105642` | Default: `53:50342`, Small: `56:136918`, Example Apple: `69:109928` |
| List Items | `68:130074` | Menu items: `49:36950`, List atom: `51:22274`, Control strip: `56:60150`, Separator: `69:110389` |
| Column List Header | `69:115439` | Atom: `63:98079` (left-aligned), `63:98081` (right-aligned), `63:98116` (first column), `63:98173` (icon) |
| Folder List | `69:117834` | — |
| Folder Tag | `69:117027` | — |
| Navigation Button | `69:116209` | Atom: `63:118140` with 4 directions x 3 states |
| Control Strip | `68:120833` | — |
| Chevron | `68:122573` | Atom: `60:67765` (16 variants: 4 directions x 2 states x 2 types) |
| Halftone Textures | `73:914` | For skeleton loading pattern reference |

## Execution Guide

### Component Count Summary

| Category | Count | Components |
|---|---|---|
| Phase 1 (done) | 11 | button, checkbox, radio, input, tabs, select, progress, slider, title-bar, window, menu-bar |
| Phase A: Form & Layout | 5 | label, textarea, separator, badge, card |
| Phase B: Overlays | 6 | dialog, alert-dialog, tooltip, popover, sheet, hover-card |
| Phase C: Menus & Nav | 5 | context-menu, dropdown-menu, navigation-menu, breadcrumb, pagination |
| Phase D: Figma Kit | 4 | scrollbar, table, chevron, nav-button |
| Phase E: Interactive | 5 | toggle, toggle-group, switch, accordion, collapsible |
| Phase F: Feedback | 4 | alert, skeleton, avatar, toast |
| Phase G: Finalize | — | registry rebuild + docs |
| **Total** | **~40** | |

### Dependency Graph

```
Independent (can be parallelized):
  label, textarea, separator, badge, card, tooltip, popover,
  hover-card, toggle, switch, skeleton, avatar, alert, chevron,
  nav-button, breadcrumb, pagination, toast

Depends on other new components:
  accordion → chevron
  collapsible → chevron
  toggle-group → toggle
  context-menu → (standalone but shares list item styling)
  dropdown-menu → (standalone but shares list item styling)
  scrollbar → (standalone)
  table → (uses column-header pattern internally)

Depends on existing Phase 1 components:
  dialog → retro-button, retro-title-bar
  alert-dialog → retro-button
  sheet → retro-title-bar
  navigation-menu → retro-menu-bar patterns
```

### Recommended Execution Order

**Batch 1 (18 independent components — all parallelizable):**
Units 15-19 (label, textarea, separator, badge, card), Unit 22 (tooltip), Unit 23 (popover), Unit 25 (hover-card), Unit 33 (chevron), Unit 34 (nav-button), Unit 35 (toggle), Unit 37 (switch), Unit 40 (alert), Unit 41 (skeleton), Unit 42 (avatar), Unit 43 (toast), Unit 29 (breadcrumb), Unit 30 (pagination)

**Batch 2 (depends on Batch 1):**
Units 26-27 (context-menu, dropdown-menu), Unit 28 (navigation-menu), Unit 31 (scrollbar), Unit 32 (table), Unit 36 (toggle-group), Unit 38 (accordion), Unit 39 (collapsible)

**Batch 3 (depends on Phase 1 components):**
Units 20-21 (dialog, alert-dialog), Unit 24 (sheet)

**Batch 4 (finalization):**
Units 44-45

### Per-Component Workflow

Same as Phase 1 — see the Execution Guide in the Phase 1 plan. For Figma-sourced components, fetch from MCP. For inferred components, apply the established OS9 design language using the existing CSS utilities and tokens.

## Risks & Dependencies

- **Scrollbar complexity** — Custom scrollbar styling is notoriously tricky cross-browser. Radix ScrollArea helps but the visual thumb/track may need extra CSS.
- **Toast without Sonner** — We're building a custom toast rather than using Sonner, since Sonner's styling doesn't match OS9. This is more work but gives us full control.
- **Volume of components** — 29 new components is a lot. Parallelizing via subagents (as in Phase 1) makes this tractable.

## Sources & References

- **Phase 1 plan:** `docs/plans/2026-03-28-001-feat-nostalgia-ui-registry-plan.md`
- **Figma source:** `CJJW6Nbp2GpFfvz7oJZWv2`
- **shadcn component catalog:** ~50 components total, we're covering the most useful ~30
- **Radix UI primitives:** https://www.radix-ui.com/primitives
