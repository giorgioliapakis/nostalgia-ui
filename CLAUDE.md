# nostalgia-ui

A shadcn-compatible component registry that recreates Mac OS 9 UI components as modern React/Tailwind components.

## Project Status

**78 components + 12 blocks + `nostalgia-theme` built and working.**

**Completed plans:**
- `docs/plans/2026-03-28-001-feat-nostalgia-ui-registry-plan.md` — Phase 1 (11 components)
- `docs/plans/2026-03-28-002-feat-nostalgia-ui-complete-suite-plan.md` — Phase 2 (29 more components)
- `docs/plans/2026-03-28-003-feat-nostalgia-ui-master-completion-plan.md` — Phase 3 (19 more components + infrastructure)

## Quick Context

- **What:** Mac OS 9 styled components installable via `npx shadcn@latest add`
- **Stack:** Next.js 16 + Tailwind v4 + Radix UI (24 packages) + class-variance-authority
- **Template:** Based on the official `shadcn-ui/registry-template`
- **Components:** 78, prefixed with `retro-`, each with a doc page at `/components/<slug>` (nav data: `app/components/_components/nav-data.ts`)
- **Blocks:** 12 `registry:block` items in `registry/new-york/blocks/<slug>.tsx`, doc pages at `/blocks/<slug>` (data: `app/blocks/_components/blocks-data.ts`)
- **Theme:** `nostalgia-theme` (registry:theme) ships the `--os9-*` tokens and `os9-*` utilities; every component lists it in `registryDependencies`. There is no install-all item — `npx shadcn add https://nostalgia-ui.com/r` is invalid
- **Styling:** Pure CSS (box-shadows, borders, gradients) — zero image assets

## To Resume Work

The design system is complete. To extend or maintain:
1. Read the master plan at `docs/plans/2026-03-28-003-feat-nostalgia-ui-master-completion-plan.md`
2. It has the **Learnings & Patterns** section — 12 patterns covering forwardRef gotchas, bevel system, typography, focus rings, disabled states, and more
3. Follow existing component patterns when adding new components

## Figma Source

File key: `CJJW6Nbp2GpFfvz7oJZWv2` (Mac OS 9 UI Kit Community)

```
Tool: mcp__claude_ai_Figma__get_design_context
Params:
  fileKey: "CJJW6Nbp2GpFfvz7oJZWv2"
  nodeId: <see node ID table in the master plan>
  clientFrameworks: "react"
  clientLanguages: "typescript"
```

## Key Conventions

- **Fonts:** components use `var(--os9-font-sans|heading|mono)`, never `var(--font-*)` — consumers' Tailwind only emits `--font-*` theme vars they use, so those resolve to nothing in installed projects
- **No literal `asChild` JSX attributes in registry files:** use `{...AS_CHILD}` (see retro-combobox.tsx). The shadcn CLI rewrites literal `asChild` into Base UI `render` props for `base-*` projects (the default for `shadcn init`), which breaks Radix components
- **Registry deps:** `registryDependencies` use full URLs (`https://nostalgia-ui.com/r/<name>.json`) and always include `nostalgia-theme.json`
- All design tokens use `--os9-*` CSS custom properties (defined in `app/globals.css`)
- Components follow shadcn patterns: `React.forwardRef` (inline pattern), `cn()`, `cva()`, `className` prop
- **forwardRef gotcha:** Always use `const X = React.forwardRef<El, Props>(function X(...) {...})` — NOT the two-step pattern
- Radix UI primitives provide accessibility/behavior, OS9 CSS provides the visual layer
- Each component is a single `.tsx` file under `registry/new-york/ui/`
- Never use Figma image asset URLs in components (they expire in 7 days)
- `registry.json` is the source of truth for the registry build
- Docs nav/sitemap data lives in `app/components/_components/nav-data.ts` — add an entry there for every new `app/components/<slug>/page.tsx`
- Server-component doc pages export `metadata` (title = nav name); pages with state/handlers stay `"use client"`
- No border-radius anywhere (OS9 = square corners, except Balloon Help tooltips)
- Hover highlights: azul (#333399) for menu items, lavender (#ccccff) for generic items

## Commands

```bash
pnpm dev              # Start dev server (port 3000)
pnpm build            # Production build
pnpm registry:build   # Build registry JSON files to public/r/
npx tsc --noEmit      # TypeScript type check
pnpm lint             # ESLint (flat config, eslint.config.mjs)
```
