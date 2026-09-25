import type { Metadata } from "next"

// page.tsx is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Tree View",
  description:
    "A Finder list view / Folder List tree with disclosure triangles, sortable column headers, multi-select and full keyboard navigation.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
