import type { Metadata } from "next"
import "./globals.css"

const SITE_URL = "https://nostalgia-ui.com"
const DESCRIPTION =
  "A shadcn-compatible component registry recreating Mac OS 9 UI components for React, Tailwind CSS v4 and Radix UI. Pure CSS, zero image assets."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "nostalgia-ui",
    template: "%s — nostalgia-ui",
  },
  description: DESCRIPTION,
  applicationName: "nostalgia-ui",
  authors: [{ name: "Giorgio Liapakis" }],
  keywords: [
    "Mac OS 9",
    "retro UI",
    "shadcn",
    "shadcn registry",
    "React components",
    "Tailwind CSS",
    "Radix UI",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "nostalgia-ui",
    title: "nostalgia-ui",
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "nostalgia-ui",
    description: DESCRIPTION,
  },
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
