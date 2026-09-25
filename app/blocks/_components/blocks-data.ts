/* ------------------------------------------------------------------ */
/*  Block data — single source of truth for the /blocks index, sidebar, */
/*  and sitemap. Every entry must have app/blocks/<slug>/page.tsx and   */
/*  registry/new-york/blocks/<slug>.tsx.                                */
/* ------------------------------------------------------------------ */

export interface BlockItem {
  name: string
  slug: string
  description: string
}

export const BLOCKS: BlockItem[] = [
  { name: "About This Computer", slug: "about-this-computer", description: "Memory usage window with per-application bars." },
  { name: "Boot Screen", slug: "boot-screen", description: "Happy Mac startup screen with extension icon parade and progress." },
  { name: "Control Panel", slug: "control-panel", description: "Appearance-style settings panel with tabs, group boxes and controls." },
  { name: "Copy Progress", slug: "copy-progress", description: "The Finder “Copying…” progress dialog." },
  { name: "Desktop Shell", slug: "desktop-shell", description: "Menu bar, desktop icons, overlapping windows and Control Strip." },
  { name: "Finder Window", slug: "finder-window", description: "Finder list view with disclosure triangles, toolbar and placard." },
  { name: "Get Info", slug: "get-info", description: "File Get Info window with general information and sharing panes." },
  { name: "Installer", slug: "installer", description: "Multi-step installer wizard with license, destination and progress." },
  { name: "Login", slug: "login", description: "Multiple Users welcome screen with user list and password." },
  { name: "Open / Save Dialog", slug: "open-save-dialog", description: "Navigation Services file picker with location pop-up and file list." },
  { name: "Sad Mac 404", slug: "sad-mac-404", description: "Not-found page with a Sad Mac and error code." },
  { name: "Unexpectedly Quit", slug: "unexpectedly-quit", description: "The classic “unexpectedly quit” error and bomb alerts." },
]
