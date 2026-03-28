---
title: "feat: nostalgia-ui master completion plan — full design system"
type: feat
status: completed
date: 2026-03-28
origin: docs/plans/2026-03-28-002-feat-nostalgia-ui-complete-suite-plan.md
---

# feat: nostalgia-ui master completion plan — full design system

## Overview

This is the definitive plan to bring nostalgia-ui from a 40-component library to a **complete, app-ready Mac OS 9 design system**. It covers every remaining shadcn component (including the previously deferred ones), OS9-specific features (desktop layout, icons, spinner), and infrastructure (theme provider, form integration, typography system).

When this plan is complete, a developer should be able to build an **entire web application** using only nostalgia-ui components with zero unstyled gaps.

## What's Already Built (40 Components)

### Phase 1 Components (from Figma)
These were built by referencing the Figma Mac OS 9 UI Kit (`CJJW6Nbp2GpFfvz7oJZWv2`) via the MCP tool `mcp__claude_ai_Figma__get_design_context`.

| Component | Figma Node | Radix Primitive | Key Visual |
|---|---|---|---|
| retro-button | `45:185859` | @radix-ui/react-slot | Raised bevel, primary/secondary/default |
| retro-checkbox | `68:110082` | @radix-ui/react-checkbox | 12px inset box + SVG checkmark |
| retro-radio | `68:111221` | @radix-ui/react-radio-group | 13px 3D circular bevel + filled dot |
| retro-input | `68:128028` | native | Inset bevel + #66C focus ring |
| retro-tabs | `68:99467` | @radix-ui/react-tabs | Raised tab bar, large/small |
| retro-select | `69:110626` | @radix-ui/react-select | Dropdown with chevrons + azul highlight |
| retro-progress | `68:103634` | native | Candy-stripe azul fill |
| retro-slider | `69:113985` | @radix-ui/react-slider | Rectangular raised thumb |
| retro-title-bar | `68:98697` | native | Striped region + close/collapse/zoom |
| retro-window | `69:130300` | native | Title-bar + content + window shadow |
| retro-menu-bar | `68:129309` | @radix-ui/react-menubar | Horizontal menu + azul active |

### Phase 2 Components (Figma + Inferred)
These were either from remaining Figma frames or standard shadcn components restyled to match the established OS9 design language.

**From Figma:**
| Component | Figma Node | Notes |
|---|---|---|
| retro-scrollbar | `69:125817` | @radix-ui/react-scroll-area, 16px track, arrow buttons |
| retro-table | `69:115439` + `68:130074` | Column headers + list items |
| retro-chevron | `68:122573` | 8px SVG arrows, 4 directions |
| retro-nav-button | `69:116209` | 16px directional buttons |

**Inferred (shadcn components restyled for OS9):**
label, textarea, separator, badge, card, dialog, alert-dialog, tooltip, popover, sheet, hover-card, context-menu, dropdown-menu, navigation-menu, breadcrumb, pagination, toggle, toggle-group, switch, accordion, collapsible, alert, skeleton, avatar, toast

## Learnings & Patterns Established

These are critical for any new session implementing remaining components:

### Pattern 1: Component Structure
Every component follows this exact pattern:
```tsx
"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

// Optional: Radix primitive import
// Optional: cva import from "class-variance-authority"

const Component = React.forwardRef<HTMLElement, Props>(
  function Component({ className, ...props }, ref) {
    return <div ref={ref} className={cn("...", className)} {...props} />
  }
)
Component.displayName = "Component"
export { Component }
```

### Pattern 2: forwardRef Gotcha
When a forwardRef component is used as JSX _before_ its definition in the same file, TypeScript errors occur. **Always use the inline forwardRef pattern:**
```tsx
// DO THIS:
const MyComponent = React.forwardRef<HTMLDivElement, Props>(
  function MyComponent({ className, ...props }, ref) { ... }
)

// NOT THIS (causes TS errors when used as JSX before definition):
function MyComponent(props: Props, ref: Ref<HTMLDivElement>) { ... }
const Forwarded = React.forwardRef(MyComponent)
```

### Pattern 3: OS9 Bevel System
Three core CSS patterns power the entire visual system:
```css
/* Raised (buttons, title bar boxes, toggles, card headers) */
border: 1px solid var(--os9-black);
background: var(--os9-gray-300);
box-shadow: inset 1px 1px 0 var(--os9-white), inset -1px -1px 0 var(--os9-gray-700);

/* Pressed/Active (pressed buttons, active toggles, selected tabs) */
border: 1px solid var(--os9-black);
background: var(--os9-gray-700);
box-shadow: inset 1px 1px 0 var(--os9-gray-700), inset -1px -1px 0 var(--os9-white);

/* Inset (text fields, checkboxes, tracks, list boxes) */
border: 1px solid var(--os9-black);
background: var(--os9-white);
box-shadow: inset 1px 1px 0 var(--os9-gray-700), inset -1px -1px 0 var(--os9-white);
```

### Pattern 4: Window Shadow
Used on window, dialog, sheet, and dropdown content:
```css
border: 1px solid var(--os9-black);
box-shadow: 2px 2px 0 var(--os9-black),
  inset 2px 2px 0 rgba(255,255,255,0.6),
  inset -2px -2px 0 rgba(38,38,38,0.4);
```

### Pattern 5: Menu/Dropdown Styling
All menus (context-menu, dropdown-menu, menu-bar dropdowns, select dropdowns) share:
- White bg, 1px black border, 2px 2px 0 black drop shadow, 2px padding
- Items: 18px tall, Charcoal 12px, `data-[highlighted]` → azul bg + white text
- Separators: 2px bevel (dark top + light bottom)
- Shortcuts: right-aligned, gray-700, inherits white on highlight via `group-data-[highlighted]`

### Pattern 6: Typography
- **Headings:** `font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]` (Charcoal)
- **Body:** `font-[family-name:var(--font-sans)] text-[10px]` (Geneva)
- **Small:** Geneva 9px
- No border-radius anywhere (OS9 had square corners on everything except Balloon Help tooltips)

### Pattern 7: Focus Ring
```css
/* Focus visible */
focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--os9-focus)]
/* Or use the utility: focus-visible:os9-focus-ring */
```

### Pattern 8: Disabled State
```css
disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed
```

### Pattern 9: Color Highlights
- **Hover on list/menu items:** `var(--os9-azul)` (#333399) bg + white text
- **Hover on generic items:** `var(--os9-lavender)` (#ccccff) bg
- **Text selection:** `var(--os9-lavender)` bg (set globally in `::selection`)
- **Focus ring:** `var(--os9-focus)` (#6666cc)

### Pattern 10: Figma MCP Workflow
```
Tool: mcp__claude_ai_Figma__get_design_context
Params: { fileKey: "CJJW6Nbp2GpFfvz7oJZWv2", nodeId: "<ID>", clientFrameworks: "react", clientLanguages: "typescript" }

→ Study screenshot for visual target
→ Extract hex colors and spacing from style metadata
→ IGNORE const img* URLs (they expire)
→ Translate everything to CSS (border, box-shadow, background, gradient, inline SVG)
```

### Pattern 11: Registry Item Structure
```json
{
  "name": "retro-example",
  "type": "registry:ui",
  "title": "RetroExample",
  "description": "One-line description for humans and AI.",
  "dependencies": ["@radix-ui/react-example", "class-variance-authority"],
  "registryDependencies": ["retro-button"],
  "files": [{
    "path": "registry/new-york/ui/retro-example.tsx",
    "type": "registry:ui",
    "target": "components/ui/retro-example.tsx"
  }]
}
```

### Pattern 12: Preview Page Structure
```tsx
// app/preview/{name}/page.tsx
import { RetroComponent } from "@/registry/new-york/ui/retro-component"

export default function ComponentPreview() {
  return (
    <main className="min-h-screen bg-[var(--os9-gray-200)] p-8">
      <h1 className="os9-heading text-[12px] mb-6">Component Name / Preview</h1>
      {/* Demo sections */}
    </main>
  )
}
```

## Design Tokens Reference

```
Colors:
  --os9-black: #262626       --os9-white: #ffffff
  --os9-gray-200: #eeeeee    --os9-gray-300: #dddddd
  --os9-gray-400: #cccccc    --os9-gray-500: #bbbbbb
  --os9-gray-600: #999999    --os9-gray-700: #808080
  --os9-gray-800: #666666
  --os9-azul: #333399        --os9-lavender: #ccccff
  --os9-focus: #6666cc

Fonts:
  --font-heading: "Charcoal", "ChicagoFLF", "Geneva", Arial, sans-serif
  --font-sans: "Geneva", "Verdana", "Helvetica Neue", sans-serif
  --font-mono: "Monaco", "Courier New", monospace

Utility classes (defined in globals.css):
  os9-raised, os9-pressed, os9-inset, os9-window,
  os9-stripes, os9-focus-ring, os9-heading
```

## Figma Node ID Reference (Complete)

| Component | Node ID | Key Sub-nodes |
|---|---|---|
| Buttons | `68:101077` | Text: `45:185859`, Icon: `60:133050` |
| Title Bar | `68:98697` | — |
| Window Frame | `68:97933` | — |
| Window (composed) | `69:130300` | — |
| Checkbox | `68:110082` | Atom: `58:67488`, `58:67552` |
| Radio Button | `68:111221` | Atom: `66:95628`, `66:96157` |
| Text Field | `68:128028` | Atom: `60:134020`, `60:134022`, `60:134026` |
| Tabs | `68:99467` | Atom: `19:12920`, Molecule: `66:98717` |
| Dropdown | `69:110626` | — |
| Dropdown Menu | `69:105642` | Default: `53:50342`, Small: `56:136918` |
| Progress Bar | `68:103634` | — |
| Slider | `69:113985` | — |
| Scrollbar | `69:125817` | V: `63:115437`, H: `63:116188`, Size box: `63:125401` |
| Menu Bar | `68:129309` | — |
| Control Strip | `68:120833` | — |
| List Items | `68:130074` | Menu: `49:36950`, List: `51:22274`, Control: `56:60150` |
| Column List Header | `69:115439` | Atom: `63:98079` |
| Folder List | `69:117834` | — |
| Folder Tag | `69:117027` | — |
| Navigation Button | `69:116209` | Atom: `63:118140` |
| Chevron | `68:122573` | Atom: `60:67765`, Dropdown: `60:68188` |
| Colours | `67:95057` | — |
| Text Styles | `67:94132` | — |
| Building Blocks | `68:97932` | — |
| Icons | `68:94653` | — |
| Wallpapers | `68:94977` | — |
| Halftone Textures | `73:914` | — |

## Implementation Units — Remaining Work

### Phase A: Infrastructure (do first)

- [x] **Unit 46: RetroThemeProvider**

  **Goal:** A React provider component that injects all OS9 CSS variables so users don't need to manually set up globals.css.

  **Files:** Create `registry/new-york/ui/retro-theme-provider.tsx`, `app/preview/theme-provider/page.tsx`

  **Approach:**
  - Export `<NostalgiaProvider>` that wraps children in a `<div>` with all `--os9-*` CSS variables set as inline styles
  - Also injects the `@utility` classes via a `<style>` tag (os9-raised, os9-inset, etc.)
  - Accept optional `theme` prop for future theme variants
  - Register as `registry:base` type so `shadcn add` sets up everything
  - This should be the FIRST thing a user installs — it bootstraps the design system
  - No Radix dependency

- [x] **Unit 47: RetroTypography**

  **Goal:** A text component with semantic variants matching the Figma type system.

  **Files:** Create `registry/new-york/ui/retro-typography.tsx`, `app/preview/typography/page.tsx`

  **Approach:**
  - Export `<RetroText>` with `cva` variants:
    - `variant`: editorial (Apple Garamond 24pt), headline (Charcoal 12pt), smallHeadline (Charcoal 10pt), body (Geneva 10pt), bodySmall (Geneva 9pt), bodyBold (Geneva Bold 9pt), bodySlanted (Geneva Italic 9pt), mono (Monaco 10pt)
    - `as` prop: renders as p, span, h1-h6, label, etc. (polymorphic)
  - Each variant maps exactly to the Figma Text Styles frame (`67:94132`)
  - No Radix dependency, use `cva`

### Phase B: Form System

- [x] **Unit 48: RetroForm (React Hook Form integration)**

  **Goal:** Form component that wires up React Hook Form + Zod validation with OS9-styled error messages.

  **Files:** Create `registry/new-york/ui/retro-form.tsx`, `app/preview/form/page.tsx`

  **Approach:**
  - Follow shadcn's Form component pattern exactly — it's a thin wrapper around RHF
  - Export: RetroForm, RetroFormField, RetroFormItem, RetroFormLabel, RetroFormControl, RetroFormDescription, RetroFormMessage
  - RetroFormMessage: Geneva 10px, red text (#cc0000) for errors, with OS9-style alert icon
  - RetroFormDescription: Geneva 9px, --os9-gray-700 text
  - `registryDependencies: ["retro-label"]`
  - Dependencies: `react-hook-form`, `@hookform/resolvers`, `zod`
  - Preview page: a contact form with validation (name, email, message)

- [x] **Unit 49: RetroInputOTP**

  **Goal:** One-time password input with individual character slots.

  **Files:** Create `registry/new-york/ui/retro-input-otp.tsx`, `app/preview/input-otp/page.tsx`

  **Approach:**
  - Use `input-otp` library (same as shadcn)
  - Each slot: os9-inset bevel (same as retro-input), 32x40px
  - Active slot: os9-focus ring
  - Separator between groups: bevel line or dash
  - Dependencies: `input-otp`

### Phase C: Complex Composed Components

- [x] **Unit 50: RetroCombobox**

  **Goal:** Searchable select / autocomplete input.

  **Files:** Create `registry/new-york/ui/retro-combobox.tsx`, `app/preview/combobox/page.tsx`

  **Approach:**
  - Composed from RetroPopover + a Command-like filterable list
  - Trigger: retro-input styled with chevron indicator
  - Dropdown: os9 dropdown styling (white bg, black border, 2px shadow)
  - Items: azul highlight on hover, checkmark for selected
  - Filter input at top of dropdown
  - Can use `cmdk` library or build a simpler version with just Popover + filtered list
  - `registryDependencies: ["retro-popover", "retro-input"]`
  - Dependencies: `cmdk`

- [x] **Unit 51: RetroCommand**

  **Goal:** Command palette (⌘K search interface).

  **Files:** Create `registry/new-york/ui/retro-command.tsx`, `app/preview/command/page.tsx`

  **Approach:**
  - Use `cmdk` library (same as shadcn)
  - Wrap in retro-dialog styling (window chrome, title bar)
  - Search input: retro-input at top
  - Item list: same menu styling (18px items, azul highlight)
  - Groups with separator labels
  - Empty state: Geneva 10px "No results found."
  - Dependencies: `cmdk`

- [x] **Unit 52: RetroCalendar**

  **Goal:** Date selection calendar grid.

  **Files:** Create `registry/new-york/ui/retro-calendar.tsx`, `app/preview/calendar/page.tsx`

  **Approach:**
  - Use `react-day-picker` (same as shadcn)
  - OS9-style calendar inside a raised panel:
    - Month/year header: Charcoal 12px with left/right nav-button arrows
    - Day-of-week headers: Geneva 9px, gray-700, centered
    - Day cells: 28x28px, Geneva 10px, centered
    - Today: bold text
    - Selected day: azul bg + white text (like a pressed button)
    - Hover: lavender bg
    - Outside-month days: gray-600 text
    - Navigation arrows: retro-nav-button or inline chevrons
  - The whole thing sits in an os9-raised panel with 1px border
  - Dependencies: `react-day-picker`

- [x] **Unit 53: RetroDatePicker**

  **Goal:** Date input that opens a calendar in a popover.

  **Files:** Create `registry/new-york/ui/retro-date-picker.tsx`, `app/preview/date-picker/page.tsx`

  **Approach:**
  - Composed: RetroPopover + RetroCalendar + RetroButton trigger
  - Trigger button shows selected date or "Pick a date" placeholder
  - Clicking opens popover with calendar
  - Selected date formats to locale string
  - `registryDependencies: ["retro-popover", "retro-calendar", "retro-button"]`
  - Dependencies: `date-fns` for formatting

- [x] **Unit 54: RetroDataTable**

  **Goal:** Full-featured data table with sorting, filtering, pagination.

  **Files:** Create `registry/new-york/ui/retro-data-table.tsx`, `app/preview/data-table/page.tsx`

  **Approach:**
  - Use `@tanstack/react-table` (same as shadcn)
  - Built on RetroTable for rendering
  - Column headers: clickable with sort arrow indicators (up/down chevrons)
  - Toolbar: filter input + column visibility dropdown
  - Pagination: RetroButton previous/next + page info
  - Row selection: checkbox column with azul highlight on selected rows
  - `registryDependencies: ["retro-table", "retro-button", "retro-checkbox", "retro-input", "retro-select", "retro-dropdown-menu"]`
  - Dependencies: `@tanstack/react-table`

- [x] **Unit 55: RetroCarousel**

  **Goal:** Slideshow component for cycling through content.

  **Files:** Create `registry/new-york/ui/retro-carousel.tsx`, `app/preview/carousel/page.tsx`

  **Approach:**
  - Use `embla-carousel-react` (same as shadcn)
  - Container: os9-inset panel
  - Navigation: retro-nav-button arrows (left/right) positioned on sides
  - Dot indicators: small os9-raised squares at bottom, active one pressed/dark
  - Slides: full-width content panels
  - Dependencies: `embla-carousel-react`

- [x] **Unit 56: RetroChart**

  **Goal:** Charting components with OS9 styling.

  **Files:** Create `registry/new-york/ui/retro-chart.tsx`, `app/preview/chart/page.tsx`

  **Approach:**
  - Use `recharts` (same as shadcn)
  - Wrap chart components with OS9 styling:
    - Background: os9-gray-200
    - Grid lines: os9-gray-400
    - Axis text: Geneva 9px
    - Tooltip: os9 Balloon Help style (yellow bg, rounded, black border)
    - Colors: azul, lavender, gray-600, gray-800 as default color palette
    - Legend: Geneva 10px with badge-style color indicators
  - Export: RetroChartContainer, RetroChartTooltip, RetroChartTooltipContent, RetroChartLegend, RetroChartLegendContent
  - Dependencies: `recharts`

- [x] **Unit 57: RetroResizable**

  **Goal:** Resizable panel groups for split layouts.

  **Files:** Create `registry/new-york/ui/retro-resizable.tsx`, `app/preview/resizable/page.tsx`

  **Approach:**
  - Use `react-resizable-panels` (same as shadcn)
  - Resize handle: os9-raised thin bar (3px wide) with subtle grip dots
  - When dragging: cursor changes, handle darkens
  - Panels: optional os9-inset border
  - Dependencies: `react-resizable-panels`

- [x] **Unit 58: RetroDrawer**

  **Goal:** Bottom sheet / drawer component.

  **Files:** Create `registry/new-york/ui/retro-drawer.tsx`, `app/preview/drawer/page.tsx`

  **Approach:**
  - Use `vaul` library (same as shadcn)
  - OS9 window chrome on the visible edge
  - Pull handle: os9-raised horizontal bar (40px x 4px) centered at top
  - Background overlay: black/40%
  - Content: os9-gray-200 bg, padding
  - Dependencies: `vaul`

- [x] **Unit 59: RetroSidebar**

  **Goal:** App shell layout with collapsible sidebar.

  **Files:** Create `registry/new-york/ui/retro-sidebar.tsx`, `app/preview/sidebar/page.tsx`

  **Approach:**
  - Composed layout component (not a single Radix primitive)
  - Export: RetroSidebarProvider, RetroSidebar, RetroSidebarHeader, RetroSidebarContent, RetroSidebarFooter, RetroSidebarMenu, RetroSidebarMenuItem, RetroSidebarMenuButton, RetroSidebarGroup, RetroSidebarGroupLabel, RetroSidebarTrigger, RetroSidebarInset
  - Sidebar: os9-gray-300 bg, right border with bevel (dark line + white line)
  - Menu items: same menu styling (azul highlight on active)
  - Collapse: sidebar collapses to icon-only width
  - Mobile: opens as a Sheet from left
  - Uses React context for open/closed state
  - `registryDependencies: ["retro-button", "retro-separator", "retro-sheet", "retro-tooltip"]`

### Phase D: OS9-Specific Features

- [x] **Unit 60: RetroDesktop**

  **Goal:** Full-page OS9 desktop layout — the signature experience.

  **Files:** Create `registry/new-york/ui/retro-desktop.tsx`, `app/preview/desktop/page.tsx`

  **Approach:**
  - Export: RetroDesktop, RetroDesktopMenuBar, RetroDesktopArea, RetroDesktopIcon
  - RetroDesktop: full viewport, flex column
  - RetroDesktopMenuBar: pinned to top, full width, extends retro-menu-bar with Apple logo on far left, clock on far right
  - RetroDesktopArea: flex-1, bg: os9-gray-200 or optional wallpaper pattern, relative positioned for window dragging
  - RetroDesktopIcon: desktop shortcut icon with label below (64x64 icon area + Geneva 10px label, click to select with azul highlight)
  - Children (RetroWindows) render as floating, z-indexed windows within the desktop area
  - This is the "wow" component — makes any app look like Mac OS 9
  - `registryDependencies: ["retro-menu-bar", "retro-window"]`

- [x] **Unit 61: RetroIconSet**

  **Goal:** Classic Mac OS 9 system icons as SVG components.

  **Files:** Create `registry/new-york/ui/retro-icons.tsx`, `app/preview/icons/page.tsx`

  **Approach:**
  - Fetch from Figma: `get_design_context(nodeId: "68:94653")` for the Icons frame
  - Export individual icon components: RetroIconFolder, RetroIconDocument, RetroIconTrash, RetroIconHardDrive, RetroIconFloppy, RetroIconApplication, RetroIconAlert, RetroIconInfo, RetroIconQuestion, RetroIconStop, RetroIconNetwork, RetroIconPrinter, RetroIconCD, RetroIconSearch, RetroIconPreferences
  - Each icon: inline SVG, 32x32 default size, accepts `size` and `className` props
  - OS9 icons are distinctive — colorful 32x32 pixel art style with subtle gradients
  - Since Figma image assets expire, these must be recreated as pure SVG paths
  - Also export a `<RetroIcon name="folder" />` convenience wrapper
  - cva size variants: sm (16px), default (32px), lg (48px), xl (64px)

- [x] **Unit 62: RetroSpinner / Loading**

  **Goal:** OS9-style loading indicators.

  **Files:** Create `registry/new-york/ui/retro-spinner.tsx`, `app/preview/spinner/page.tsx`

  **Approach:**
  - Export two loading indicators:
    1. `RetroSpinner`: The classic Mac "watch cursor" — an animated SVG of a wristwatch with rotating hands (or simplified: spinning arrows)
    2. `RetroBeachBall`: The spinning beach ball (wait cursor) — a rotating circle with colored segments
  - Both: accept `size` (sm/default/lg) and `className`
  - CSS animation only, no JS animation frames
  - The watch cursor is THE iconic Mac loading indicator

- [x] **Unit 63: RetroToolbar**

  **Goal:** Horizontal strip with icon buttons and separators.

  **Files:** Create `registry/new-york/ui/retro-toolbar.tsx`, `app/preview/toolbar/page.tsx`

  **Approach:**
  - Export: RetroToolbar, RetroToolbarButton, RetroToolbarSeparator, RetroToolbarGroup
  - Toolbar: os9-gray-300 bg, bottom border, inner bevel (same as menu bar but visually for tools not menus)
  - ToolbarButton: 24x24 raised bevel square, icon content centered, pressed state on click
  - ToolbarSeparator: vertical bevel line
  - ToolbarGroup: groups related buttons
  - `registryDependencies: ["retro-toggle", "retro-separator"]`

- [x] **Unit 64: RetroAspectRatio**

  **Goal:** Content within a desired aspect ratio.

  **Files:** Create `registry/new-york/ui/retro-aspect-ratio.tsx`, `app/preview/aspect-ratio/page.tsx`

  **Approach:**
  - Use `@radix-ui/react-aspect-ratio`
  - Thin wrapper with optional os9-inset border
  - Trivial component — mainly for API parity with shadcn

### Phase E: Finalization

- [x] **Unit 65: Update home page with ALL components**

  **Goal:** Home page showcases every component with live demos, organized by category.

  **Files:** Modify `app/page.tsx`, `app/preview/page.tsx`

  **Approach:**
  - Group by category: Forms, Layout, Navigation, Overlays, Menus, Feedback, Data, OS9-Specific
  - Each category in its own RetroCard
  - Every new component gets a live demo
  - Preview index lists all components alphabetically
  - Hero section shows component count and install command

- [x] **Unit 66: Update registry.json, rebuild, final verification**

  **Goal:** All new components registered, build passes, docs updated.

  **Files:** Modify `registry.json`, rebuild `public/r/`

  **Approach:**
  - Add all new items to registry.json
  - Run `pnpm registry:build` — verify every JSON file exists
  - Run `npx tsc --noEmit` — verify zero errors
  - Run `pnpm build` — verify all pages render
  - Count: should be ~55-60 total components
  - Update CLAUDE.md with final component count
  - Update plan status to `completed`

- [x] **Unit 67: Commit, push, and update memory**

  **Goal:** Everything pushed to GitHub, memory files updated for future sessions.

## Dependency Graph

```
Independent (can be parallelized):
  typography, spinner, toolbar, aspect-ratio, input-otp,
  carousel, resizable, drawer

Depends on Phase A:
  form → label (already exists)

Depends on other new components:
  combobox → popover + input (exist) + cmdk (new)
  command → cmdk (new)
  calendar → react-day-picker (new)
  date-picker → calendar + popover + button (calendar is new)
  data-table → table + button + checkbox + input + select + dropdown-menu (all exist) + tanstack (new)
  sidebar → button + separator + sheet + tooltip (all exist)
  desktop → menu-bar + window (exist)
  chart → recharts (new)
  icon-set → (standalone, but fetch from Figma)
```

## Recommended Execution Order

**Batch 1 (infrastructure + simple, all parallel — 8 components):**
theme-provider, typography, spinner, toolbar, aspect-ratio, input-otp, carousel, resizable

**Batch 2 (medium complexity, all parallel — 5 components):**
form, command, calendar, chart, drawer

**Batch 3 (composed, depends on Batch 2 — 4 components):**
combobox (needs command), date-picker (needs calendar), data-table (needs tanstack), sidebar

**Batch 4 (OS9-specific features — 2 components):**
desktop, icon-set

**Batch 5 (finalization):**
home page update, registry rebuild, commit and push

## Commands Reference

```bash
pnpm dev              # Start dev server (port 3000)
pnpm build            # Production build
pnpm registry:build   # Build registry JSON to public/r/
npx tsc --noEmit      # TypeScript check

# Test a registry install in another project:
npx shadcn@latest add http://localhost:3000/r/retro-button.json
```

## Project Stats (as of Phase 2 completion)

- **Components:** 40
- **Lines of component code:** ~5,400
- **Radix packages:** 24
- **Preview pages:** 40
- **Registry JSON files:** 40
- **TypeScript errors:** 0
- **Image assets used:** 0 (all CSS)
