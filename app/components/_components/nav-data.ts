/* ------------------------------------------------------------------ */
/*  Component navigation data — single source of truth for the         */
/*  sidebar, overview page, /components/all index, and sitemap.        */
/*  Every entry must have a matching app/components/<slug>/page.tsx.   */
/* ------------------------------------------------------------------ */

export interface NavItem {
  name: string
  slug: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const NAV_GROUPS: NavGroup[] = [
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
      { name: "Calendar", slug: "calendar" },
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
    items: [
      { name: "Chart", slug: "chart" },
    ],
  },
]

export const TOTAL_COMPONENTS = NAV_GROUPS.reduce(
  (sum, group) => sum + group.items.length,
  0
)

/** Flat list of every component doc page, in nav order. */
export const NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((group) => group.items)
