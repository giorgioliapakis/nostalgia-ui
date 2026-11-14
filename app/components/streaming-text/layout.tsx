import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Streaming Text",
  description:
    "Text that arrives behind a blinking Mac OS 9 insertion caret, for streamed AI replies.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
