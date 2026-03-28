import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "nostalgia-ui",
  description: "A shadcn-compatible component registry recreating Mac OS 9 UI components",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
