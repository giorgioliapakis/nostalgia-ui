import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The old /preview/* pages were replaced by the /components docs.
      { source: "/preview", destination: "/components", permanent: true },
      {
        source: "/preview/:slug",
        destination: "/components/:slug",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
