# nostalgia-ui

A shadcn-compatible component registry that recreates Mac OS 9 UI components as modern React/Tailwind components.

## Project Status

**86 components + 13 blocks + `nostalgia-theme` built and working.**

**Completed plans:**
- `docs/plans/2026-03-28-001-feat-nostalgia-ui-registry-plan.md` — Phase 1 (11 components)
- `docs/plans/2026-03-28-002-feat-nostalgia-ui-complete-suite-plan.md` — Phase 2 (29 more components)
- `docs/plans/2026-03-28-003-feat-nostalgia-ui-master-completion-plan.md` — Phase 3 (19 more components + infrastructure)

## Quick Context

- **What:** Mac OS 9 styled components installable via `npx shadcn@latest add`
- **Stack:** Next.js 16 + Tailwind v4 + UI SDK (`@ui-sdk/react`, pinned beta) + class-variance-authority
- **Template:** Based on the official `shadcn-ui/registry-template`
- **Components:** 86 (incl. an AI group sharing `registry/new-york/lib/retro-ai.ts` message types), prefixed with `retro-`, each with a doc page at `/components/<slug>` (nav data: `app/components/_components/nav-data.ts`)
- **Blocks:** 13 `registry:block` items in `registry/new-york/blocks/<slug>.tsx`, doc pages at `/blocks/<slug>` (data: `app/blocks/_components/blocks-data.ts`)
- **Theme:** `nostalgia-theme` (registry:theme) ships the `--os9-*` tokens and `os9-*` utilities; every component lists it in `registryDependencies`. There is no install-all item — `npx shadcn add https://nostalgia-ui.com/r` is invalid
- **Styling:** Pure CSS (box-shadows, borders, gradients) — zero image assets

## To Resume Work

The design system is complete. To extend or maintain:
1. Read `PATTERNS.md`: the UI SDK rules, the motion vocabulary (flair, glide, blink, zoom rects, height morphs) and the ship checklist
2. The visual system (bevels, typography, menu look, focus, disabled) is the **Learnings & Patterns** section of `docs/plans/2026-03-28-003-feat-nostalgia-ui-master-completion-plan.md`. Its Radix and forwardRef notes are superseded by `PATTERNS.md`
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
- **Composition is `render`, never `asChild`:** `<RetroDialogTrigger render={<RetroButton />}>`. A Server Component can't pass `render={<ClientComponent />}`; such doc pages are `"use client"` with `metadata` in a sibling `layout.tsx`
- **Popup parts guard UI SDK's reset** with `!` on box properties (see PATTERNS.md, "The popup reset")
- **Shared motion** (flair, glide, blink, zoom rects) lives in `registry/new-york/lib/retro-motion.ts`, registry item `retro-motion`
- **Registry deps:** generated from imports by `node scripts/sync-registry-deps.mjs`, never hand-edited. `registryDependencies` use full URLs (`https://nostalgia-ui.com/r/<name>.json`) and always include `nostalgia-theme.json`
- All design tokens use `--os9-*` CSS custom properties (defined in `app/globals.css`)
- Components follow shadcn patterns: plain function components (React 19 `ref` prop), `cn()`, `cva()`, `className` prop. Older files still use the inline `React.forwardRef(function X…)` pattern; that's fine to keep, never the two-step pattern
- UI SDK primitives provide accessibility/behavior, OS9 CSS provides the visual layer
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
node scripts/sync-registry-deps.mjs  # rebuild registry.json deps from imports (--check to verify)
```
