---
title: "feat: Build nostalgia-ui shadcn registry - Mac OS 9 component library"
type: feat
status: completed
date: 2026-03-28
---

# feat: Build nostalgia-ui shadcn registry - Mac OS 9 component library

## Overview

Build a shadcn-compatible component registry called **nostalgia-ui** that recreates Mac OS 9 UI components as modern React/Tailwind components. The library will be installable via the shadcn CLI (`npx shadcn@latest add`) and follow all current best practices for the shadcn registry system. The visual design is sourced from the [Mac OS 9 UI Kit (Figma Community)](https://www.figma.com/design/CJJW6Nbp2GpFfvz7oJZWv2/Mac-OS-9--UI-Kit--Community-).

## Problem Frame

There is no shadcn-compatible Mac OS 9 / retro design system. The Figma kit exists as a visual reference, but its components use pixel-level image assets that don't translate to maintainable code. We need to interpret the design system's visual language (beveled borders, system grays, pixel shadows, striped title bars) and express it as composable CSS/Tailwind utilities that work within the shadcn ecosystem.

## Requirements Trace

- R1. **shadcn CLI compatibility** - Users can install components via `npx shadcn@latest add https://nostalgia-ui.com/r/<component>.json`
- R2. **Registry schema compliance** - `registry.json` follows `https://ui.shadcn.com/schema/registry.json`, items follow `registry-item.json` schema
- R3. **CSS-based styling** - All Mac OS 9 visual effects (bevels, shadows, gradients, stripes) are achieved with CSS/Tailwind, not raster images
- R4. **Design token fidelity** - Colors, typography, and effects match the Figma kit's defined design tokens
- R5. **Variant support** - Components support relevant state variants (default, active, disabled, selected) via `cva`
- R6. **Accessible** - Components use semantic HTML, proper ARIA attributes, and keyboard navigation
- R7. **Composable** - Components follow shadcn patterns (forwarded refs, `className` prop, `cn()` utility)
- R8. **Preview site** - Next.js app serves as documentation and live preview, plus hosts the built registry JSON
- R9. **Core component coverage** - At minimum: Button, Window/TitleBar, Checkbox, Radio, Input, Tabs, Select/Dropdown, Progress Bar, Slider, Menu Bar

## Scope Boundaries

- **In scope:** Core UI components, design tokens, registry infrastructure, preview/docs site, `registry:base` item for full design system install
- **Not in scope:** Complex composed patterns (file browser, Finder), wallpapers/textures as components, animation/transitions, dark mode (Mac OS 9 didn't have one), submitting to the public shadcn registry index (future milestone)
- **Not in scope:** Pixel-perfect reproduction of every Figma detail - we interpret the design language into maintainable CSS

## Context & Research

### Figma Design Source

**File:** `CJJW6Nbp2GpFfvz7oJZWv2` (Mac OS 9 UI Kit Community)

**Figma MCP Strategy:** The Figma file contains 28 component categories. Each category is a top-level frame.

**How to reference Figma designs during implementation (step-by-step):**

1. **Find the node ID** from the Component Node ID Reference Map below
2. **Call the MCP tool:** `mcp__claude_ai_Figma__get_design_context` with parameters:
   - `fileKey`: `"CJJW6Nbp2GpFfvz7oJZWv2"` (always this value)
   - `nodeId`: the node ID from the table (e.g., `"68:110082"` for Checkbox)
   - `clientFrameworks`: `"react"`
   - `clientLanguages`: `"typescript"`
3. **If the response says "design was too large"**, you'll get sparse metadata with child node IDs. Drill into specific sub-nodes by calling `get_design_context` again with the child `nodeId`.
4. **From the response, extract:**
   - The **screenshot** (output_image) — use as the visual target for your CSS implementation
   - The **style metadata** at the bottom — exact hex colors, font specs, effect definitions
   - The **code output** — reference for spacing values, sizing, and layout structure
   - **Ignore** the `const img*` asset URLs — they expire in 7 days and must NOT be used in components
5. **Translate to CSS:** Convert all visual details into Tailwind classes and CSS custom properties. Every visual effect must be achievable with `border`, `box-shadow`, `background`, `linear-gradient`, or inline SVG.

**Example MCP call for implementing the Checkbox:**
```
Tool: mcp__claude_ai_Figma__get_design_context
Params: { fileKey: "CJJW6Nbp2GpFfvz7oJZWv2", nodeId: "68:110082", clientFrameworks: "react", clientLanguages: "typescript" }
```
If too large, drill into atoms: `nodeId: "58:67488"` (unchecked state) or `nodeId: "58:67552"` (checked state).

**Component Node ID Reference Map:**

| Component | Node ID | Key Sub-nodes |
|---|---|---|
| Buttons (Text + Icon) | `68:101077` | Text: `45:185859`, Icon: `60:133050` |
| Title Bar | `68:98697` | - |
| Window Frame | `68:97933` | - |
| Window (composed) | `69:130300` | - |
| Checkbox | `68:110082` | Atom: `58:67488` (unchecked), `58:67552` (checked) |
| Radio Button | `68:111221` | Atom: `66:95628` (off), `66:96157` (on) |
| Text Field | `68:128028` | Atom: `60:134020` (default), `60:134022` (active), `60:134026` (highlighted) |
| Tabs | `68:99467` | Atom/Tab: `19:12920`, Molecule/TabBar: `66:98717` |
| Dropdown | `69:110626` | - |
| Dropdown Menu | `69:105642` | - |
| Progress Bar | `68:103634` | - |
| Slider | `69:113985` | - |
| Scrollbar | `69:125817` | - |
| Menu Bar | `68:129309` | - |
| Control Strip | `68:120833` | - |
| List Items | `68:130074` | - |
| Chevron | `68:122573` | - |
| Colours | `67:95057` | - |
| Text Styles | `67:94132` | - |
| Building Blocks | `68:97932` | - |

### Design Tokens (from Figma)

**Colors:**
```
Primary:
  black: #262626     (--os9-black)
  white: #FFFFFF     (--os9-white)

Grays:
  200: #EEEEEE      (--os9-gray-200)
  300: #DDDDDD      (--os9-gray-300)
  400: #CCCCCC      (--os9-gray-400)
  500: #BBBBBB      (--os9-gray-500)
  600: #999999      (--os9-gray-600)
  700: #808080      (--os9-gray-700)
  800: #666666      (--os9-gray-800)

Accent:
  azul: #333399      (--os9-azul)
  lavender: #CCCCFF  (--os9-lavender)

Derived (from component analysis):
  focus-ring: #6666CC  (--os9-focus)  - used for active text field borders
  highlight-bg: #CCCCFF (same as lavender) - used for text selection
```

**Typography:**
```
Editorial Headlines: Apple Garamond Light, 24pt, -2% letter-spacing
Headlines:          Charcoal, 12pt, 3.5% letter-spacing, 0.98 line-height
Small Headlines:    Charcoal, 10pt, 3.5% letter-spacing, 0.98 line-height
Body Text:          Geneva, 10pt (mapped to 9pt CSS), normal line-height
Small Body Text:    Geneva, 9pt (mapped to 8pt CSS), normal line-height
Body Bold:          Geneva Bold, 9pt, 0.8px letter-spacing
Body Slanted:       Geneva Italic, 9pt
```

**Web Font Strategy:** Charcoal and Geneva are Apple system fonts not freely available on the web. Use a bitmap/pixel font stack as fallback:
- Headlines: `"Charcoal", "ChicagoFLF", "Geneva", Arial, sans-serif`
- Body: `"Geneva", "Verdana", "Helvetica Neue", sans-serif`
- Register a `registry:font` item pointing users to download Charcoal/Geneva or use the CSS fallback

**Effects:**
```
Window Shadow:
  - drop-shadow: 2px 2px 0px #262626
  - inner-shadow light: inset 2px 2px 0px rgba(255,255,255,0.6)
  - inner-shadow dark: inset -2px -2px 0px rgba(38,38,38,0.4)

Bevel (raised - buttons, title bar boxes):
  - border: 1px solid #262626
  - background: linear-gradient(135deg, #9A9A9A 0%, #F1F1F1 100%)
  - inner highlight (top-left): white/60%
  - inner shadow (bottom-right): black/40%

Bevel (inset - checkboxes, text fields):
  - border: 1px solid #262626
  - top/left shadow: #808080
  - bottom/right highlight: white
  - inner shadow: 0.5px

Title Bar Stripes:
  - Background: #DDDDDD
  - 1px horizontal lines at ~7.69% intervals: #999999
  - Left edge highlight: #EEEEEE
  - Right edge shadow: #C5C5C5
```

### shadcn Registry Architecture

**Template:** Based on `github.com/shadcn-ui/registry-template` (Next.js + Tailwind v4)

**Project structure:**
```
nostalgia-ui/
├── app/                          # Next.js app (docs + preview)
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css               # OS9 design tokens as CSS vars
├── registry/
│   └── new-york/
│       ├── ui/                   # registry:ui items (primitives)
│       │   ├── retro-button.tsx
│       │   ├── retro-checkbox.tsx
│       │   ├── retro-radio.tsx
│       │   ├── retro-input.tsx
│       │   ├── retro-tabs.tsx
│       │   ├── retro-select.tsx
│       │   ├── retro-slider.tsx
│       │   ├── retro-progress.tsx
│       │   ├── retro-window.tsx
│       │   ├── retro-title-bar.tsx
│       │   ├── retro-menu-bar.tsx
│       │   └── retro-scrollbar.tsx
│       └── lib/
│           └── utils.ts          # cn() utility
├── lib/
│   └── utils.ts
├── public/
│   └── r/                        # Built registry output (generated)
├── registry.json                 # Registry manifest
├── components.json               # shadcn project config
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

**Registry item types used:**
- `registry:ui` - Each component (Button, Checkbox, etc.)
- `registry:lib` - Shared utilities (`cn()`)
- `registry:base` - Full design system install (CSS vars + config + font)
- `registry:font` - OS9 font configuration

**Build pipeline:** `shadcn build` reads `registry.json`, inlines file contents, outputs `public/r/{name}.json`. Served by Next.js at `https://nostalgia-ui.com/r/{name}.json`.

### CSS Approach for Mac OS 9 Bevels

The signature Mac OS 9 look is achieved with layered box-shadows and borders rather than images:

```css
/* Raised bevel (buttons, window chrome) */
.os9-raised {
  border: 1px solid var(--os9-black);
  background: var(--os9-gray-300);
  box-shadow:
    inset 1px 1px 0 var(--os9-white),
    inset -1px -1px 0 var(--os9-gray-700);
}

/* Inset bevel (text fields, checkboxes) */
.os9-inset {
  border: 1px solid var(--os9-black);
  background: var(--os9-white);
  box-shadow:
    inset 1px 1px 0 var(--os9-gray-700),
    inset -1px -1px 0 var(--os9-white);
}

/* Window frame */
.os9-window {
  border: 1px solid var(--os9-black);
  box-shadow:
    2px 2px 0 var(--os9-black),
    inset 2px 2px 0 rgba(255,255,255,0.6),
    inset -2px -2px 0 rgba(38,38,38,0.4);
}
```

These patterns will be expressed as Tailwind v4 utilities via `@utility` directives or inline via `cssVars` in the registry items.

## Key Technical Decisions

- **Next.js + Tailwind v4:** Matches the official shadcn registry template and current ecosystem expectations. Tailwind v4 uses CSS-first configuration which aligns well with our CSS variables approach.
- **CSS box-shadows over images:** The Figma kit uses pixel-level constructions for bevels. We abstract these into repeatable CSS patterns. This is more maintainable, theme-able, and doesn't require hosting image assets.
- **`cva` for variants:** Each component uses class-variance-authority for type-safe variant props (size, state, type), matching shadcn conventions.
- **`retro-` prefix:** All components are prefixed with `retro-` to avoid naming collisions with base shadcn components and make the theming intent clear.
- **Radix UI primitives where applicable:** For Checkbox, Radio, Select, Tabs, Slider - use Radix UI as the accessibility/behavior layer, skinned with OS9 styles. This matches shadcn's own approach.
- **Single-file components:** Each `registry:ui` item is a single `.tsx` file to keep the registry simple. Internal helpers stay within the same file.
- **No image assets in the registry:** Everything is CSS. The checkmark, radio dot, and chevron icons are inline SVGs or CSS shapes.

## Open Questions

### Resolved During Planning

- **Font licensing:** Charcoal and Geneva are proprietary Apple fonts. Resolution: Ship a CSS fallback font stack and provide a `registry:font` item that documents how users can source and install the authentic fonts. The components work fine with fallback fonts.
- **Tailwind v4 vs v3:** Resolution: Use Tailwind v4 as the registry template requires it and it's the current standard. CSS variable-based tokens work natively.
- **Component granularity:** Resolution: Ship atomic components (Button, Checkbox) as individual `registry:ui` items. Composed components (Window = TitleBar + content area) are also individual items with `registryDependencies` linking them.

### Deferred to Implementation

- **Title bar stripe pattern:** Whether to use a CSS `repeating-linear-gradient` or a dedicated SVG pattern. Will determine during implementation based on visual fidelity.
- **Exact Tailwind utility names:** Whether to use `@utility` directives or inline styles for the bevel patterns. Depends on Tailwind v4 utility API specifics.
- **Registry namespace:** The short namespace for the public registry index (e.g., `@nostalgia-ui`) will be decided when we're ready to submit.

## High-Level Technical Design

> *This illustrates the intended approach and is directional guidance for review, not implementation specification. The implementing agent should treat it as context, not code to reproduce.*

```
Component Architecture:

  registry:base (nostalgia-ui-base)
    ├── CSS Variables (--os9-*)
    ├── Font configuration
    ├── Base Tailwind utilities (@utility os9-raised, os9-inset, os9-window)
    └── shadcn config (style, iconLibrary)

  registry:ui (individual components)
    ├── retro-button     → uses cva, os9-raised/os9-inset patterns
    ├── retro-checkbox   → Radix Checkbox + os9-inset + SVG checkmark
    ├── retro-radio      → Radix Radio + circular os9 bevel + SVG dot
    ├── retro-input      → native input + os9-inset + focus ring (#66c)
    ├── retro-tabs       → Radix Tabs + os9 tab styling
    ├── retro-select     → Radix Select + os9 dropdown chrome
    ├── retro-slider     → Radix Slider + os9 track/thumb
    ├── retro-progress   → native progress + os9 track + candy-stripe fill
    ├── retro-window     → composed (title-bar + content frame)
    ├── retro-title-bar  → stripe pattern + close/collapse/zoom boxes
    ├── retro-menu-bar   → horizontal menu strip + item highlights
    └── retro-scrollbar  → os9 scrollbar with arrow buttons

  Dependency graph:
    retro-window → retro-title-bar
    retro-select → retro-button (trigger styling)
    All components → base CSS variables (via registry:base)
```

## Implementation Units

### Phase 1: Foundation

- [x] **Unit 1: Scaffold project from shadcn registry template**

  **Goal:** Initialize the Next.js project with Tailwind v4, shadcn CLI, and the registry build pipeline.

  **Requirements:** R1, R2, R8

  **Dependencies:** None

  **Files:**
  - Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `components.json`, `registry.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `lib/utils.ts`, `registry/new-york/lib/utils.ts`

  **Approach:**
  - Clone or replicate the structure from `shadcn-ui/registry-template`
  - Configure `components.json` with `style: "new-york"`, `tailwind.cssVariables: true`
  - Set up `registry.json` with `name: "nostalgia-ui"`, `homepage`, and empty `items: []` array
  - Add `"registry:build": "shadcn build"` script to `package.json`
  - Configure `cn()` utility using `clsx` + `tailwind-merge`

  **Patterns to follow:**
  - [shadcn registry template](https://github.com/shadcn-ui/registry-template)

  **Test scenarios:**
  - Happy path: `pnpm dev` starts without errors, renders the app shell
  - Happy path: `pnpm registry:build` runs without errors (empty items is fine)
  - Happy path: `components.json` validates against shadcn schema

  **Verification:**
  - Dev server runs, build succeeds, `public/r/` directory is created by `shadcn build`

- [x] **Unit 2: Define OS9 design tokens and base CSS**

  **Goal:** Establish all Mac OS 9 design tokens as CSS custom properties and define reusable Tailwind utilities for the bevel/shadow patterns.

  **Requirements:** R3, R4

  **Dependencies:** Unit 1

  **Files:**
  - Modify: `app/globals.css`
  - Create: `registry/new-york/ui/os9-base.tsx` (exports nothing - exists as a CSS injection point for the registry:base item)
  - Modify: `registry.json` (add base item)

  **Approach:**
  - Define all `--os9-*` CSS variables under `:root` in `globals.css`
  - Define Tailwind v4 `@utility` rules for `os9-raised`, `os9-inset`, `os9-window`, `os9-pressed`
  - Define font-face declarations or font-family variables for the OS9 font stack
  - Create a `registry:base` item in `registry.json` that includes the CSS vars via `cssVars` field
  - Register a `registry:font` item for the OS9 font configuration

  **Patterns to follow:**
  - shadcn `registry:base` and `cssVars` schema from registry-item.json docs

  **Test scenarios:**
  - Happy path: CSS variables are accessible in browser dev tools when the preview site loads
  - Happy path: A test div with `class="os9-raised"` renders with visible bevel borders
  - Edge case: Variables render correctly when no OS9 fonts are installed (fallback stack kicks in)

  **Verification:**
  - All tokens from the Figma design system are represented as CSS variables
  - The `registry:base` item builds successfully via `shadcn build`

### Phase 2: Core Components

- [x] **Unit 3: Build retro-button component**

  **Goal:** Create the Button component with Primary/Secondary types and Default/Active/Disabled states.

  **Requirements:** R3, R5, R6, R7

  **Dependencies:** Unit 2

  **Files:**
  - Create: `registry/new-york/ui/retro-button.tsx`
  - Modify: `registry.json` (add button item)
  - Create: `app/preview/button/page.tsx` (preview page)

  **Approach:**
  - Use `cva` for variants: `variant` (default/primary), `size` (default/sm/lg), `state` (for visual states)
  - Primary button: `os9-raised` bevel with the thicker border treatment from Figma (double border lines)
  - Secondary button: simpler flat style with top/bottom 1px borders
  - Disabled: gray out text to `--os9-gray-600`, reduce bevel contrast
  - Active/pressed: swap highlight/shadow directions (invert the bevel)
  - Extend `ButtonHTMLAttributes`, forward ref
  - Figma reference: `get_design_context(nodeId: "45:185859", fileKey: "CJJW6Nbp2GpFfvz7oJZWv2")`

  **Patterns to follow:**
  - shadcn's own `button.tsx` component pattern (cva, forwardRef, cn)

  **Test scenarios:**
  - Happy path: Primary button renders with raised bevel, black text
  - Happy path: Secondary button renders with flat borders
  - Happy path: Disabled button shows muted colors and is not clickable (`pointer-events-none`)
  - Happy path: Active state inverts the bevel shadow direction
  - Edge case: Button with long text wraps or truncates gracefully
  - Integration: Button accepts `asChild` prop for composition (Slot pattern)

  **Verification:**
  - Visual comparison with Figma screenshot shows matching bevel style
  - Button works with keyboard (Enter/Space to activate)
  - Registry item builds to `public/r/retro-button.json`

- [x] **Unit 4: Build retro-checkbox component**

  **Goal:** Create the Checkbox component with checked/unchecked states and default/active variants.

  **Requirements:** R3, R5, R6, R7

  **Dependencies:** Unit 2

  **Files:**
  - Create: `registry/new-york/ui/retro-checkbox.tsx`
  - Modify: `registry.json`
  - Create: `app/preview/checkbox/page.tsx`

  **Approach:**
  - Use Radix UI `@radix-ui/react-checkbox` as the behavior primitive
  - 12x12px box with `os9-inset` bevel (white highlight top-left, gray shadow bottom-right)
  - Checked state: inline SVG checkmark (extracted from Figma design - simple path)
  - Active/pressed state: darker background (`--os9-gray-700`)
  - Companion `<label>` support via standard `htmlFor` pattern
  - Figma reference: `get_design_context(nodeId: "68:110082", fileKey: "CJJW6Nbp2GpFfvz7oJZWv2")`

  **Patterns to follow:**
  - shadcn's `checkbox.tsx` (Radix + custom styling)

  **Test scenarios:**
  - Happy path: Unchecked renders as empty inset box
  - Happy path: Checked renders with checkmark SVG inside
  - Happy path: Clicking toggles checked state
  - Happy path: Associated label clicks also toggle
  - Edge case: Disabled state grays out and prevents interaction
  - Integration: Works within a form, `onCheckedChange` fires correctly

  **Verification:**
  - Matches Figma checkbox visual (12px inset box, checkmark style)
  - Keyboard accessible (Space to toggle when focused)

- [x] **Unit 5: Build retro-radio component**

  **Goal:** Create the Radio Button component with selected/unselected states.

  **Requirements:** R3, R5, R6, R7

  **Dependencies:** Unit 2

  **Files:**
  - Create: `registry/new-york/ui/retro-radio.tsx`
  - Modify: `registry.json`
  - Create: `app/preview/radio/page.tsx`

  **Approach:**
  - Use Radix UI `@radix-ui/react-radio-group` for behavior
  - 13x13px circular element with radial gradient bevel (the OS9 radio is distinctively 3D-looking)
  - Selected state: filled inner circle
  - The circular bevel uses `border-radius: 50%` with careful gradient/shadow to simulate the Figma design's pixel-shaded sphere
  - Figma reference: `get_design_context(nodeId: "68:111221", fileKey: "CJJW6Nbp2GpFfvz7oJZWv2")`

  **Patterns to follow:**
  - shadcn's `radio-group.tsx`

  **Test scenarios:**
  - Happy path: Unselected shows empty circle with 3D bevel
  - Happy path: Selected shows filled dot in center
  - Happy path: Only one radio in a group can be selected
  - Edge case: Radio group with single option still works
  - Integration: Works within forms, keyboard arrow keys switch selection

  **Verification:**
  - Circular bevel matches Figma's distinctive 3D radio button appearance

- [x] **Unit 6: Build retro-input component**

  **Goal:** Create the text input component with default, active (focused), and highlighted (selected text) states.

  **Requirements:** R3, R5, R6, R7

  **Dependencies:** Unit 2

  **Files:**
  - Create: `registry/new-york/ui/retro-input.tsx`
  - Modify: `registry.json`
  - Create: `app/preview/input/page.tsx`

  **Approach:**
  - Native `<input>` element with `os9-inset` bevel styling
  - Two sizes: Large (Charcoal 12pt) and Small (Geneva 10pt)
  - Default: white bg, inset bevel with gray top-left shadow
  - Active/focused: add `--os9-focus` (#66C) ring (2px solid around the input, matching Figma's blue outline)
  - Highlighted: lavender background (`--os9-lavender`) for text selection (CSS `::selection`)
  - Figma reference: `get_design_context(nodeId: "68:128028", fileKey: "CJJW6Nbp2GpFfvz7oJZWv2")`

  **Patterns to follow:**
  - shadcn's `input.tsx`

  **Test scenarios:**
  - Happy path: Renders with inset bevel, white background
  - Happy path: Focus shows blue ring matching OS9 active field style
  - Happy path: Text selection uses lavender highlight color
  - Happy path: Large and small size variants render at correct font sizes
  - Edge case: Placeholder text renders in gray
  - Edge case: Disabled input is visually muted

  **Verification:**
  - Focus ring color and weight match Figma's active text field style

- [x] **Unit 7: Build retro-tabs component**

  **Goal:** Create the Tabs component with large/small sizes and active/inactive/selected states.

  **Requirements:** R3, R5, R6, R7

  **Dependencies:** Unit 2

  **Files:**
  - Create: `registry/new-york/ui/retro-tabs.tsx`
  - Modify: `registry.json`
  - Create: `app/preview/tabs/page.tsx`

  **Approach:**
  - Use Radix UI `@radix-ui/react-tabs` for behavior
  - Two sizes: Large (22px height) and Small (16px height)
  - Active tab: raised bevel with connected bottom edge (no bottom border, flows into content)
  - Inactive tab: flat/recessed appearance, sits behind active tab
  - Selected (clicked) tab: darker fill (`--os9-gray-800`), white text
  - Tab bar molecule: horizontal flex container with proper overlap/z-indexing
  - Figma reference: `get_design_context(nodeId: "68:99467", fileKey: "CJJW6Nbp2GpFfvz7oJZWv2")`, drill into `19:12920` for atom, `66:98717` for molecule

  **Patterns to follow:**
  - shadcn's `tabs.tsx`

  **Test scenarios:**
  - Happy path: Multiple tabs render horizontally, active tab is visually raised
  - Happy path: Clicking tab switches content panel
  - Happy path: Large and small variants render at correct heights
  - Edge case: Many tabs overflow gracefully
  - Integration: Keyboard Left/Right arrows navigate between tabs

  **Verification:**
  - Tab shape matches OS9's distinctive raised-tab-with-beveled-edges look

### Phase 3: Advanced Components

- [x] **Unit 8: Build retro-select (dropdown) component**

  **Goal:** Create the dropdown/select component with trigger button and dropdown menu.

  **Requirements:** R3, R5, R6, R7

  **Dependencies:** Unit 2, Unit 3 (button styling)

  **Files:**
  - Create: `registry/new-york/ui/retro-select.tsx`
  - Modify: `registry.json`
  - Create: `app/preview/select/page.tsx`

  **Approach:**
  - Use Radix UI `@radix-ui/react-select` for behavior
  - Trigger: `os9-raised` button with inline chevron arrows (up/down, matching Figma's `Atom / Dropdown`)
  - Dropdown content: white background with `os9-window` shadow, 1px black border
  - Items: highlight with `--os9-azul` background and white text on hover
  - Figma reference: `get_design_context(nodeId: "69:110626", fileKey: "CJJW6Nbp2GpFfvz7oJZWv2")` for trigger, `69:105642` for menu

  **Patterns to follow:**
  - shadcn's `select.tsx`

  **Test scenarios:**
  - Happy path: Trigger renders as OS9-style raised button with chevrons
  - Happy path: Clicking opens dropdown with item list
  - Happy path: Hovering item highlights with azul blue
  - Happy path: Selecting item closes dropdown and updates trigger text
  - Edge case: Long option text truncates with ellipsis
  - Integration: Works in forms, value is accessible

  **Verification:**
  - Dropdown menu shadow and highlight color match OS9 conventions

- [x] **Unit 9: Build retro-progress component**

  **Goal:** Create the progress bar with the OS9 candy-stripe fill pattern.

  **Requirements:** R3, R5, R7

  **Dependencies:** Unit 2

  **Files:**
  - Create: `registry/new-york/ui/retro-progress.tsx`
  - Modify: `registry.json`
  - Create: `app/preview/progress/page.tsx`

  **Approach:**
  - Track: `os9-inset` recessed container
  - Fill: `--os9-azul` (#339) with diagonal candy-stripe pattern via `repeating-linear-gradient`
  - Accept `value` prop (0-100), render width as percentage
  - Optional `indeterminate` variant with animated stripe
  - Figma reference: `get_design_context(nodeId: "68:103634", fileKey: "CJJW6Nbp2GpFfvz7oJZWv2")`

  **Patterns to follow:**
  - shadcn's `progress.tsx`

  **Test scenarios:**
  - Happy path: 50% value renders half-filled bar with stripe pattern
  - Happy path: 0% shows empty track, 100% shows full fill
  - Edge case: Values above 100 clamp to 100, below 0 clamp to 0
  - Happy path: Indeterminate shows animated stripe

  **Verification:**
  - Stripe pattern and azul color match OS9 progress bar appearance

- [x] **Unit 10: Build retro-slider component**

  **Goal:** Create the slider component with OS9-style track and thumb.

  **Requirements:** R3, R5, R6, R7

  **Dependencies:** Unit 2

  **Files:**
  - Create: `registry/new-york/ui/retro-slider.tsx`
  - Modify: `registry.json`
  - Create: `app/preview/slider/page.tsx`

  **Approach:**
  - Use Radix UI `@radix-ui/react-slider` for behavior
  - Track: thin `os9-inset` horizontal line
  - Thumb: small `os9-raised` rectangle (not circular - OS9 used rectangular thumbs)
  - Optional tick marks along the track
  - Figma reference: `get_design_context(nodeId: "69:113985", fileKey: "CJJW6Nbp2GpFfvz7oJZWv2")`

  **Patterns to follow:**
  - shadcn's `slider.tsx`

  **Test scenarios:**
  - Happy path: Dragging thumb changes value
  - Happy path: Track shows filled portion
  - Edge case: Min equals max (degenerate range)
  - Integration: Keyboard arrows adjust value

  **Verification:**
  - Rectangular thumb with bevel matches OS9 slider appearance

### Phase 4: Window Chrome & Composition

- [x] **Unit 11: Build retro-title-bar component**

  **Goal:** Create the Mac OS 9 title bar with striped drag region, close/collapse/zoom boxes, and title text.

  **Requirements:** R3, R4, R6, R7

  **Dependencies:** Unit 2

  **Files:**
  - Create: `registry/new-york/ui/retro-title-bar.tsx`
  - Modify: `registry.json`
  - Create: `app/preview/title-bar/page.tsx`

  **Approach:**
  - 19px height, `--os9-gray-400` background
  - Horizontal stripe pattern: `repeating-linear-gradient` with `--os9-gray-600` lines every 2px
  - Left: close box (13x13 square with gradient bevel)
  - Right: collapse box (13x13 square with horizontal line icon)
  - Center: title text in Charcoal 12pt
  - Optional: zoom box (13x13 square with nested squares icon)
  - Optional: Apple logo icon next to title
  - Active vs inactive states (inactive = no stripes, muted colors)
  - Figma reference: `get_design_context(nodeId: "68:98697", fileKey: "CJJW6Nbp2GpFfvz7oJZWv2")`

  **Patterns to follow:**
  - Figma's own composition: `Molecule / Title Bar` wraps `AtomTitleBarBarPicker`, `AtomTitleBarCloseBox`, etc.

  **Test scenarios:**
  - Happy path: Title bar renders with stripes, title text, and window control boxes
  - Happy path: Active state shows full stripes, inactive shows flat gray
  - Happy path: Close/collapse/zoom buttons fire onClick handlers
  - Edge case: Very long title text truncates with ellipsis between stripe regions

  **Verification:**
  - Stripe pattern, control box bevels, and layout match Figma title bar

- [x] **Unit 12: Build retro-window component**

  **Goal:** Create the composed Window component that wraps title bar + content area with OS9 window chrome.

  **Requirements:** R3, R7

  **Dependencies:** Unit 2, Unit 11

  **Files:**
  - Create: `registry/new-york/ui/retro-window.tsx`
  - Modify: `registry.json` (with `registryDependencies: ["retro-title-bar"]`)
  - Create: `app/preview/window/page.tsx`

  **Approach:**
  - Container div with `os9-window` shadow treatment
  - Renders `retro-title-bar` at top
  - Content area with `--os9-gray-200` background, inset shadow
  - Accepts `title`, `onClose`, `onCollapse`, `onZoom` props passed through to title bar
  - Children rendered inside content area
  - Variants: active (full chrome), background (muted chrome)

  **Patterns to follow:**
  - shadcn's `card.tsx` composition pattern (Card, CardHeader, CardContent)

  **Test scenarios:**
  - Happy path: Window renders with title bar, content area, and window shadow
  - Happy path: Children render inside the content area
  - Happy path: Background variant shows muted title bar
  - Edge case: Window with no children renders title bar + empty content
  - Integration: Close button fires onClose callback

  **Verification:**
  - Window frame matches Figma's window shadow and chrome patterns

- [x] **Unit 13: Build retro-menu-bar component**

  **Goal:** Create the horizontal menu bar component (File, Edit, View, etc.).

  **Requirements:** R3, R5, R6, R7

  **Dependencies:** Unit 2

  **Files:**
  - Create: `registry/new-york/ui/retro-menu-bar.tsx`
  - Modify: `registry.json`
  - Create: `app/preview/menu-bar/page.tsx`

  **Approach:**
  - Horizontal bar with `--os9-gray-300` background and bottom border
  - Menu items in Charcoal 12pt
  - Active menu item: `--os9-azul` background with white text
  - Dropdown menus use same styling as `retro-select` dropdown
  - Use Radix `@radix-ui/react-menubar` for behavior
  - Figma reference: `get_design_context(nodeId: "68:129309", fileKey: "CJJW6Nbp2GpFfvz7oJZWv2")`

  **Patterns to follow:**
  - shadcn's `menubar.tsx`

  **Test scenarios:**
  - Happy path: Menu items render horizontally with OS9 styling
  - Happy path: Clicking a menu item opens dropdown
  - Happy path: Active item highlights with azul blue
  - Integration: Keyboard navigation (Left/Right between menus, Up/Down within menus)

  **Verification:**
  - Menu bar matches OS9 horizontal menu appearance

### Phase 5: Registry Finalization

- [x] **Unit 14: Complete registry.json and build pipeline**

  **Goal:** Finalize all registry items in `registry.json`, verify `shadcn build` produces valid output, and create the preview/docs site.

  **Requirements:** R1, R2, R8

  **Dependencies:** Units 2-13

  **Files:**
  - Modify: `registry.json` (all items with correct metadata)
  - Modify: `app/page.tsx` (component showcase/docs page)
  - Create: `app/preview/page.tsx` (index of all preview pages)

  **Approach:**
  - Each item in `registry.json` must have: `name`, `type`, `title`, `description`, `dependencies`, `registryDependencies`, `files`, `cssVars` (where relevant)
  - Run `shadcn build` and verify each `public/r/{name}.json` is valid
  - Test installation: `npx shadcn@latest add http://localhost:3000/r/retro-button.json` in a fresh project
  - Build a simple showcase page that demonstrates all components

  **Test scenarios:**
  - Happy path: `shadcn build` produces a `.json` file for every registry item
  - Happy path: Each JSON file validates against the registry-item schema
  - Happy path: Installing a component in a fresh Next.js project works end-to-end
  - Happy path: Installing the `registry:base` item sets up all CSS variables
  - Edge case: Installing a component with `registryDependencies` automatically pulls in dependencies
  - Integration: `npx shadcn@latest add <url> --dry-run` shows the files that would be created

  **Verification:**
  - Full end-to-end test: fresh project -> install base -> install button -> button renders correctly

## System-Wide Impact

- **No existing system to impact** - This is a greenfield project
- **External contract surface:** The `registry.json` schema and the URL structure (`/r/{name}.json`) become the public API. Changes to item names are breaking.
- **Dependency chain:** Components that depend on `retro-title-bar` (like `retro-window`) must declare `registryDependencies` so the CLI resolves them automatically.

## Risks & Dependencies

- **Font availability:** Users may not have Charcoal/Geneva fonts. Mitigated by the fallback font stack. The visual effect degrades gracefully.
- **Tailwind v4 maturity:** Tailwind v4's `@utility` API is relatively new. If issues arise, fall back to inline Tailwind classes or standard CSS utility classes.
- **Figma MCP asset expiry:** Figma asset URLs expire in 7 days. We must extract all visual information (colors, sizes, patterns) during planning and implementation, not rely on re-fetching assets later. This plan captures all needed design tokens.
- **Bevel fidelity:** The Figma kit's bevels use pixel-level constructions. Our CSS approximation will be close but not pixel-identical. This is acceptable - we're building a usable component library, not a museum piece.

## Sources & References

- **Figma source:** [Mac OS 9 UI Kit (Community)](https://www.figma.com/design/CJJW6Nbp2GpFfvz7oJZWv2/Mac-OS-9--UI-Kit--Community-)
- **shadcn Registry docs:** https://ui.shadcn.com/docs/registry
- **Registry Getting Started:** https://ui.shadcn.com/docs/registry/getting-started
- **registry.json schema:** https://ui.shadcn.com/schema/registry.json
- **registry-item.json schema:** https://ui.shadcn.com/docs/registry/registry-item-json
- **Official registry template:** https://github.com/shadcn-ui/registry-template
- **shadcn CLI v4 (March 2026):** https://ui.shadcn.com/docs/changelog/2026-03-cli-v4
- **Radix UI primitives:** https://www.radix-ui.com/primitives
- **class-variance-authority:** https://cva.style/docs

## Execution Guide (for new sessions)

This section ensures any agent session can pick up implementation without context loss.

### Before Starting Work

1. **Read this plan** in full — it contains all design tokens, architecture decisions, and Figma references
2. **Check progress** — look at which Implementation Units have `[x]` vs `[ ]` checkboxes
3. **Check project state** — run `ls` on the project root to see what's been scaffolded
4. **Resume from the first unchecked unit** — units are dependency-ordered, work top to bottom

### Per-Component Implementation Workflow

For each component unit (Units 3-13), follow this exact workflow:

1. **Fetch the Figma design** using `mcp__claude_ai_Figma__get_design_context` with the node ID from the reference map in this plan. Study the screenshot and style metadata.
2. **Create the component file** at `registry/new-york/ui/retro-{name}.tsx`
3. **Follow shadcn component patterns:**
   - Import `React`, `cva`, `cn` from `@/lib/utils`
   - Import Radix primitive if applicable (Checkbox, Radio, Select, Tabs, Slider, MenuBar)
   - Define variants with `cva()` — always include `variant`, `size` where applicable
   - Use `React.forwardRef` and extend the appropriate HTML/Radix element attributes
   - Accept and merge `className` prop via `cn()`
4. **Style with OS9 design tokens** — use the CSS variables defined in Unit 2 (`var(--os9-*)`) and the utility classes (`os9-raised`, `os9-inset`, etc.)
5. **Add to registry.json** — add the item with `name`, `type: "registry:ui"`, `title`, `description`, `dependencies` (npm packages like Radix), `registryDependencies` (other registry items), and `files` array
6. **Create a preview page** at `app/preview/{name}/page.tsx` showing all variants
7. **Verify** — run `pnpm dev`, check the preview page renders correctly, compare visually with the Figma screenshot
8. **Mark the unit as complete** — update the checkbox in this plan from `[ ]` to `[x]`

### Key npm Dependencies Per Component

| Component | npm dependency | Radix package |
|---|---|---|
| retro-button | `class-variance-authority` | `@radix-ui/react-slot` (for asChild) |
| retro-checkbox | `class-variance-authority` | `@radix-ui/react-checkbox` |
| retro-radio | `class-variance-authority` | `@radix-ui/react-radio-group` |
| retro-input | `class-variance-authority` | (none - native input) |
| retro-tabs | `class-variance-authority` | `@radix-ui/react-tabs` |
| retro-select | `class-variance-authority` | `@radix-ui/react-select` |
| retro-slider | `class-variance-authority` | `@radix-ui/react-slider` |
| retro-progress | `class-variance-authority` | (none - native/div) |
| retro-title-bar | `class-variance-authority` | (none) |
| retro-window | `class-variance-authority` | (none) |
| retro-menu-bar | `class-variance-authority` | `@radix-ui/react-menubar` |

### registry.json Item Template

When adding a component to `registry.json`, use this structure:
```json
{
  "name": "retro-button",
  "type": "registry:ui",
  "title": "Retro Button",
  "description": "A Mac OS 9 styled button with raised bevel, supporting primary/secondary variants and default/active/disabled states.",
  "dependencies": ["class-variance-authority", "@radix-ui/react-slot"],
  "registryDependencies": [],
  "files": [
    {
      "path": "registry/new-york/ui/retro-button.tsx",
      "type": "registry:ui"
    }
  ]
}
```

### How to Test a Registry Install

After building (`pnpm registry:build`), test installation in a separate project:
```bash
# In a fresh Next.js project with shadcn initialized:
npx shadcn@latest add http://localhost:3000/r/retro-button.json

# Verify the file was copied to components/ui/retro-button.tsx
# Verify dependencies were added to package.json
# Verify the component renders correctly
```
