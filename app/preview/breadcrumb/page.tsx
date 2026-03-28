import {
  RetroBreadcrumb,
  RetroBreadcrumbList,
  RetroBreadcrumbItem,
  RetroBreadcrumbLink,
  RetroBreadcrumbPage,
  RetroBreadcrumbSeparator,
  RetroBreadcrumbEllipsis,
} from "@/registry/new-york/ui/retro-breadcrumb"

export default function BreadcrumbPreview() {
  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      <h1 className="os9-heading text-[18px] mb-8">
        RetroBreadcrumb Preview
      </h1>

      {/* Finder-style file path */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Finder Path</h2>
        <RetroBreadcrumb>
          <RetroBreadcrumbList>
            <RetroBreadcrumbItem>
              <RetroBreadcrumbLink href="#">Macintosh HD</RetroBreadcrumbLink>
            </RetroBreadcrumbItem>
            <RetroBreadcrumbSeparator />
            <RetroBreadcrumbItem>
              <RetroBreadcrumbLink href="#">Applications</RetroBreadcrumbLink>
            </RetroBreadcrumbItem>
            <RetroBreadcrumbSeparator />
            <RetroBreadcrumbItem>
              <RetroBreadcrumbPage>SimpleText</RetroBreadcrumbPage>
            </RetroBreadcrumbItem>
          </RetroBreadcrumbList>
        </RetroBreadcrumb>
      </section>

      {/* Deeper path */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Deep Path</h2>
        <RetroBreadcrumb>
          <RetroBreadcrumbList>
            <RetroBreadcrumbItem>
              <RetroBreadcrumbLink href="#">Macintosh HD</RetroBreadcrumbLink>
            </RetroBreadcrumbItem>
            <RetroBreadcrumbSeparator />
            <RetroBreadcrumbItem>
              <RetroBreadcrumbLink href="#">System Folder</RetroBreadcrumbLink>
            </RetroBreadcrumbItem>
            <RetroBreadcrumbSeparator />
            <RetroBreadcrumbItem>
              <RetroBreadcrumbLink href="#">Extensions</RetroBreadcrumbLink>
            </RetroBreadcrumbItem>
            <RetroBreadcrumbSeparator />
            <RetroBreadcrumbItem>
              <RetroBreadcrumbPage>QuickTime</RetroBreadcrumbPage>
            </RetroBreadcrumbItem>
          </RetroBreadcrumbList>
        </RetroBreadcrumb>
      </section>

      {/* Collapsed path with ellipsis */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">
          Collapsed Path (Ellipsis)
        </h2>
        <RetroBreadcrumb>
          <RetroBreadcrumbList>
            <RetroBreadcrumbItem>
              <RetroBreadcrumbLink href="#">Macintosh HD</RetroBreadcrumbLink>
            </RetroBreadcrumbItem>
            <RetroBreadcrumbSeparator />
            <RetroBreadcrumbItem>
              <RetroBreadcrumbEllipsis />
            </RetroBreadcrumbItem>
            <RetroBreadcrumbSeparator />
            <RetroBreadcrumbItem>
              <RetroBreadcrumbLink href="#">Documents</RetroBreadcrumbLink>
            </RetroBreadcrumbItem>
            <RetroBreadcrumbSeparator />
            <RetroBreadcrumbItem>
              <RetroBreadcrumbPage>ReadMe</RetroBreadcrumbPage>
            </RetroBreadcrumbItem>
          </RetroBreadcrumbList>
        </RetroBreadcrumb>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        OS 9 Finder-style breadcrumb navigation with right-pointing triangle
        separators.
      </p>
    </main>
  )
}
