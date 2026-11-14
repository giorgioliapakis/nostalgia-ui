import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Message",
  description:
    "Mac OS 9 chat transcript parts: a scrolling message thread, user and assistant messages built from AI SDK-style parts, and copy/retry actions.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
