import type { Metadata } from "next"

// page.tsx is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "All Components",
  description:
    "Every nostalgia-ui component on one page: Mac OS 9 buttons, windows, menus, dialogs, tables, charts and more.",
  alternates: { canonical: "/components/all" },
}

export default function AllComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
