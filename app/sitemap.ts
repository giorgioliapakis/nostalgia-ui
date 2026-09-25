import type { MetadataRoute } from "next"

import { BLOCKS } from "./blocks/_components/blocks-data"
import { NAV_ITEMS } from "./components/_components/nav-data"

const SITE_URL = "https://nostalgia-ui.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/components`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/components/all`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...NAV_ITEMS.map((item) => ({
      url: `${SITE_URL}/components/${item.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/blocks`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...BLOCKS.map((block) => ({
      url: `${SITE_URL}/blocks/${block.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
