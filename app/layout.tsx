import type { Metadata } from "next"
import "./globals.css"

const SITE_URL = "https://nostalgia-ui.com"
const DESCRIPTION =
  "A shadcn-compatible component registry recreating Mac OS 9 UI components for React, built on Tailwind CSS v4 and Vercel's UI SDK. Pure CSS, zero image assets."

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
    "UI SDK",
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

const FLAIR_SCRIPT = `try{if(localStorage.getItem("os9-flair")==="classic")document.documentElement.dataset.flair="classic"}catch(e){}`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* apply the saved flair before first paint, so classic never flashes modern */}
        <script dangerouslySetInnerHTML={{ __html: FLAIR_SCRIPT }} />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
