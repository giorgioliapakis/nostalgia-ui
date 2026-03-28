import { RetroWindow } from "@/registry/new-york/ui/retro-window"

const components = [
  { name: "accordion", description: "Expandable sections with disclosure triangles" },
  { name: "alert", description: "Inline notification banners with variants" },
  { name: "alert-dialog", description: "Confirmation dialog with caution icon" },
  { name: "avatar", description: "User image with beveled frame and fallback" },
  { name: "badge", description: "Small status label with bevel" },
  { name: "breadcrumb", description: "Finder-style path navigation" },
  { name: "button", description: "Raised bevel buttons with primary/secondary variants" },
  { name: "card", description: "Content container panel with bevel" },
  { name: "checkbox", description: "Inset bevel checkbox with SVG checkmark" },
  { name: "chevron", description: "Directional arrows in 4 orientations" },
  { name: "collapsible", description: "Simple expand/collapse with disclosure triangle" },
  { name: "context-menu", description: "Right-click menu with sub-menus and shortcuts" },
  { name: "dialog", description: "Modal window with OS9 title bar chrome" },
  { name: "dropdown-menu", description: "Click-triggered menu with sub-menus" },
  { name: "hover-card", description: "Preview card on hover with window shadow" },
  { name: "input", description: "Inset bevel text input with OS9 focus ring" },
  { name: "label", description: "Form label in Geneva font" },
  { name: "menu-bar", description: "Horizontal menu bar with dropdown menus" },
  { name: "nav-button", description: "Directional navigation buttons (back/forward)" },
  { name: "navigation-menu", description: "Site navigation with dropdown panels" },
  { name: "pagination", description: "Page navigation with OS9-style buttons" },
  { name: "popover", description: "Floating panel with window shadow" },
  { name: "progress", description: "Candy-stripe progress bar with azul fill" },
  { name: "radio", description: "3D circular radio buttons with filled dot" },
  { name: "scrollbar", description: "OS9 scrollbar with arrow buttons and thumb" },
  { name: "select", description: "Dropdown select with chevron arrows" },
  { name: "separator", description: "Beveled horizontal/vertical divider" },
  { name: "sheet", description: "Slide-in panel with OS9 window chrome" },
  { name: "skeleton", description: "Dithered loading placeholder" },
  { name: "slider", description: "Slider with rectangular raised thumb" },
  { name: "switch", description: "Binary toggle with sliding rectangular thumb" },
  { name: "table", description: "Data table with beveled column headers" },
  { name: "tabs", description: "Raised tab bar with large/small sizes" },
  { name: "textarea", description: "Multi-line input with inset bevel" },
  { name: "title-bar", description: "Striped title bar with control boxes" },
  { name: "toast", description: "Mini-window notification that auto-dismisses" },
  { name: "toggle", description: "Pressable on/off button with bevel swap" },
  { name: "toggle-group", description: "Row of mutually exclusive toggle buttons" },
  { name: "tooltip", description: "OS9 Balloon Help in yellow" },
  { name: "window", description: "Window frame composing title bar + content" },
]

export default function PreviewIndex() {
  return (
    <main className="min-h-screen bg-[var(--os9-gray-200)] p-8">
      <RetroWindow title="Component Preview — 40 Components" className="max-w-xl mx-auto">
        <div className="p-4">
          <ul className="space-y-1">
            {components.map((c) => (
              <li key={c.name}>
                <a
                  href={`/preview/${c.name}`}
                  className="flex items-baseline gap-2 hover:bg-[var(--os9-lavender)] px-2 py-1"
                >
                  <span className="os9-heading text-[10px] text-[var(--os9-azul)] underline min-w-[100px]">
                    {c.name}
                  </span>
                  <span className="text-[9px] text-[var(--os9-gray-800)]">
                    {c.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </RetroWindow>
    </main>
  )
}
