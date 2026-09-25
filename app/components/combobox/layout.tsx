import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Combobox",
  description: "A searchable dropdown select with Mac OS 9 styling and typeahead filtering.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
