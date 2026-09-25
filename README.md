# nostalgia-ui

A shadcn-compatible component registry that recreates Mac OS 9 UI components as modern React/Tailwind components.

60 components plus a theme item (`nostalgia-theme`). Zero image assets: every bevel and shadow is pure CSS.

## Prerequisites

- A React project already set up with shadcn: run `npx shadcn@latest init` first.
- Tailwind CSS v4.
- `tw-animate-css`, imported in your global CSS (`@import "tw-animate-css";`). `shadcn init` sets this up for new projects.

## Install

There is no "install everything" command. Add components one at a time with their registry URL:

```bash
npx shadcn@latest add https://nostalgia-ui.com/r/retro-button.json
```

Each component is available at `https://nostalgia-ui.com/r/<name>.json`, for example `retro-window`, `retro-dialog` or `retro-menu-bar`. The [components page](https://nostalgia-ui.com/components) has the command for each one.

## Theme and setup

Every component lists `nostalgia-theme` in its `registryDependencies`, so installing any component also installs the theme. The theme adds:

- the `--os9-*` design tokens (colours, bevel shadows, heading font), and
- the `os9-*` utilities (`os9-raised`, `os9-inset`, `os9-window`, `os9-stripes`, `os9-focus-ring`).

To install only the theme:

```bash
npx shadcn@latest add https://nostalgia-ui.com/r/nostalgia-theme.json
```

## Development

```bash
pnpm install
pnpm dev              # docs site on http://localhost:3000
pnpm build            # production build
pnpm registry:build   # build registry JSON into public/r/
pnpm lint             # ESLint (flat config)
npx tsc --noEmit      # type check
```

Components live in `registry/new-york/ui/`. `registry.json` is the source of truth for the registry build.

## Links

- [Website](https://nostalgia-ui.com)
- [Components](https://nostalgia-ui.com/components)

## Attribution

Visual design based on the [Mac OS 9 UI Kit](https://www.figma.com/community/file/966779730364082883) by [Michael Feeney](https://www.figma.com/@feeneymichael), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
