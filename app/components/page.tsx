import Link from "next/link"

import { RetroWindow } from "@/registry/new-york/ui/retro-window"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import {
  RetroCard,
  RetroCardHeader,
  RetroCardTitle,
  RetroCardContent,
} from "@/registry/new-york/ui/retro-card"
import { RetroBadge } from "@/registry/new-york/ui/retro-badge"
import { RetroSeparator } from "@/registry/new-york/ui/retro-separator"

/* ------------------------------------------------------------------ */
/*  Navigation data (duplicated from layout to keep this a server      */
/*  component — layout.tsx is "use client" for sidebar context)        */
/* ------------------------------------------------------------------ */

const NAV_GROUPS = [
  {
    label: "Getting Started",
    items: [
      { name: "Theme Provider", slug: "theme-provider" },
      { name: "Typography", slug: "typography" },
    ],
  },
  {
    label: "Form Controls",
    items: [
      { name: "Button", slug: "button" },
      { name: "Checkbox", slug: "checkbox" },
      { name: "Combobox", slug: "combobox" },
      { name: "Date Picker", slug: "date-picker" },
      { name: "Form", slug: "form" },
      { name: "Input", slug: "input" },
      { name: "Input OTP", slug: "input-otp" },
      { name: "Label", slug: "label" },
      { name: "Radio", slug: "radio" },
      { name: "Select", slug: "select" },
      { name: "Slider", slug: "slider" },
      { name: "Switch", slug: "switch" },
      { name: "Textarea", slug: "textarea" },
      { name: "Toggle", slug: "toggle" },
      { name: "Toggle Group", slug: "toggle-group" },
    ],
  },
  {
    label: "Layout",
    items: [
      { name: "Accordion", slug: "accordion" },
      { name: "Aspect Ratio", slug: "aspect-ratio" },
      { name: "Card", slug: "card" },
      { name: "Carousel", slug: "carousel" },
      { name: "Collapsible", slug: "collapsible" },
      { name: "Resizable", slug: "resizable" },
      { name: "Separator", slug: "separator" },
      { name: "Skeleton", slug: "skeleton" },
      { name: "Tabs", slug: "tabs" },
    ],
  },
  {
    label: "Navigation",
    items: [
      { name: "Breadcrumb", slug: "breadcrumb" },
      { name: "Chevron", slug: "chevron" },
      { name: "Menu Bar", slug: "menu-bar" },
      { name: "Nav Button", slug: "nav-button" },
      { name: "Navigation Menu", slug: "navigation-menu" },
      { name: "Pagination", slug: "pagination" },
      { name: "Sidebar", slug: "sidebar" },
      { name: "Toolbar", slug: "toolbar" },
    ],
  },
  {
    label: "Data Display",
    items: [
      { name: "Avatar", slug: "avatar" },
      { name: "Badge", slug: "badge" },
      { name: "Data Table", slug: "data-table" },
      { name: "Progress", slug: "progress" },
      { name: "Scrollbar", slug: "scrollbar" },
      { name: "Table", slug: "table" },
    ],
  },
  {
    label: "Overlays",
    items: [
      { name: "Alert Dialog", slug: "alert-dialog" },
      { name: "Context Menu", slug: "context-menu" },
      { name: "Dialog", slug: "dialog" },
      { name: "Drawer", slug: "drawer" },
      { name: "Dropdown Menu", slug: "dropdown-menu" },
      { name: "Hover Card", slug: "hover-card" },
      { name: "Popover", slug: "popover" },
      { name: "Sheet", slug: "sheet" },
      { name: "Tooltip", slug: "tooltip" },
    ],
  },
  {
    label: "Feedback",
    items: [
      { name: "Alert", slug: "alert" },
      { name: "Command", slug: "command" },
      { name: "Spinner", slug: "spinner" },
      { name: "Toast", slug: "toast" },
    ],
  },
  {
    label: "OS9 Special",
    items: [
      { name: "Desktop", slug: "desktop" },
      { name: "Icons", slug: "icons" },
      { name: "Title Bar", slug: "title-bar" },
      { name: "Window", slug: "window" },
    ],
  },
  {
    label: "Visualization",
    items: [{ name: "Chart", slug: "chart" }],
  },
]

/* ------------------------------------------------------------------ */
/*  Overview page                                                      */
/* ------------------------------------------------------------------ */

export default function ComponentsOverview() {
  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      {/* Hero */}
      <RetroWindow title="Components" active className="max-w-[640px] mb-8">
        <div className="flex flex-col gap-3">
          <h1 className="os9-heading text-[16px]">nostalgia-ui Components</h1>
          <p className="font-[family-name:var(--font-sans)] text-[11px] leading-[1.5] text-os9-black">
            59 Mac OS 9 styled components built with Radix UI and Tailwind CSS.
            Each component is a drop-in replacement installable via the shadcn
            CLI. Zero image assets — every bevel, stripe, and shadow is pure
            CSS.
          </p>
        </div>
      </RetroWindow>

      {/* Install */}
      <section className="max-w-[640px] mb-8">
        <h2 className="os9-heading text-[13px] mb-3">Installation</h2>
        <p className="font-[family-name:var(--font-sans)] text-[11px] leading-[1.5] text-os9-black mb-3">
          Install any component with a single command:
        </p>
        <pre
          className="p-3 font-mono text-[11px] text-os9-black leading-[1.6] mb-3 overflow-x-auto"
          style={{
            backgroundColor: "var(--os9-white)",
            border: "1px solid var(--os9-black)",
            boxShadow: "var(--os9-shadow-inset)",
          }}
        >
          npx shadcn@latest add &quot;https://nostalgia-ui.vercel.app/r/retro-button.json&quot;
        </pre>
        <p className="font-[family-name:var(--font-sans)] text-[11px] leading-[1.5] text-os9-black mb-3">
          Or add multiple components at once using the registry root:
        </p>
        <pre
          className="p-3 font-mono text-[11px] text-os9-black leading-[1.6] overflow-x-auto"
          style={{
            backgroundColor: "var(--os9-white)",
            border: "1px solid var(--os9-black)",
            boxShadow: "var(--os9-shadow-inset)",
          }}
        >
          npx shadcn@latest add &quot;https://nostalgia-ui.vercel.app/r&quot;
        </pre>
      </section>

      {/* Usage */}
      <section className="max-w-[640px] mb-8">
        <h2 className="os9-heading text-[13px] mb-3">Usage</h2>
        <p className="font-[family-name:var(--font-sans)] text-[11px] leading-[1.5] text-os9-black mb-3">
          Import and use components just like shadcn/ui — same API patterns,
          same <code className="font-mono">className</code> prop, same
          composability:
        </p>
        <pre
          className="p-3 font-mono text-[10px] text-os9-black leading-[1.6] overflow-x-auto"
          style={{
            backgroundColor: "var(--os9-white)",
            border: "1px solid var(--os9-black)",
            boxShadow: "var(--os9-shadow-inset)",
          }}
        >
{`import { RetroButton } from "@/components/ui/retro-button"
import { RetroWindow } from "@/components/ui/retro-window"

export function MyApp() {
  return (
    <RetroWindow title="Hello" active>
      <RetroButton variant="primary">Click me</RetroButton>
    </RetroWindow>
  )
}`}
        </pre>
      </section>

      <RetroSeparator className="max-w-[640px] mb-8" />

      {/* Component categories */}
      <section className="max-w-[640px] mb-8">
        <h2 className="os9-heading text-[13px] mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {NAV_GROUPS.map((group) => (
            <RetroCard key={group.label}>
              <RetroCardHeader>
                <RetroCardTitle>
                  {group.label}
                  <RetroBadge className="ml-2">{group.items.length}</RetroBadge>
                </RetroCardTitle>
              </RetroCardHeader>
              <RetroCardContent>
                <ul className="flex flex-col gap-[3px]">
                  {group.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/components/${item.slug}`}
                        className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black underline hover:text-os9-azul"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </RetroCardContent>
            </RetroCard>
          ))}
        </div>
      </section>

      {/* Browse all */}
      <section className="max-w-[640px]">
        <RetroButton variant="primary" asChild>
          <Link href="/components/all">View all 59 components on one page</Link>
        </RetroButton>
      </section>
    </main>
  )
}
