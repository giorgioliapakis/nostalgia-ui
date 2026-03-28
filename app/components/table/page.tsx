import {
  RetroTable,
  RetroTableHeader,
  RetroTableBody,
  RetroTableRow,
  RetroTableHead,
  RetroTableCell,
  RetroTableCaption,
  RetroTableFooter,
} from "@/registry/new-york/ui/retro-table"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const files = [
  {
    name: "SimpleText",
    dateModified: "Thu, Oct 7, 1999, 3:22 PM",
    size: "284 KB",
    kind: "Application",
  },
  {
    name: "ReadMe",
    dateModified: "Mon, Sep 13, 1999, 10:04 AM",
    size: "12 KB",
    kind: "SimpleText Document",
  },
  {
    name: "System Folder",
    dateModified: "Fri, Nov 5, 1999, 9:48 AM",
    size: "--",
    kind: "Folder",
  },
  {
    name: "Sherlock 2",
    dateModified: "Thu, Oct 7, 1999, 3:30 PM",
    size: "1.2 MB",
    kind: "Application",
  },
  {
    name: "AppleScript",
    dateModified: "Thu, Oct 7, 1999, 3:18 PM",
    size: "640 KB",
    kind: "Application",
  },
  {
    name: "Desktop",
    dateModified: "Sat, Nov 6, 1999, 11:15 AM",
    size: "--",
    kind: "Folder",
  },
]

export default function TablePreview() {
  return (
    <ComponentDocLayout
      name="retro-table"
      title="RetroTable"
      description="A data table with Mac OS 9 Finder list view styling, beveled headers, and row selection."
    >
      {/* ---- Default table ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          Finder list view
        </h2>

        <RetroTable className="w-[600px]">
          <RetroTableCaption>Macintosh HD &mdash; 6 items</RetroTableCaption>
          <RetroTableHeader>
            <RetroTableRow>
              <RetroTableHead>Name</RetroTableHead>
              <RetroTableHead>Date Modified</RetroTableHead>
              <RetroTableHead>Size</RetroTableHead>
              <RetroTableHead>Kind</RetroTableHead>
            </RetroTableRow>
          </RetroTableHeader>
          <RetroTableBody>
            {files.map((file) => (
              <RetroTableRow key={file.name}>
                <RetroTableCell>{file.name}</RetroTableCell>
                <RetroTableCell>{file.dateModified}</RetroTableCell>
                <RetroTableCell>{file.size}</RetroTableCell>
                <RetroTableCell>{file.kind}</RetroTableCell>
              </RetroTableRow>
            ))}
          </RetroTableBody>
        </RetroTable>
      </section>

      {/* ---- Table with selected row ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          With selected row
        </h2>

        <RetroTable className="w-[600px]">
          <RetroTableHeader>
            <RetroTableRow>
              <RetroTableHead>Name</RetroTableHead>
              <RetroTableHead>Date Modified</RetroTableHead>
              <RetroTableHead>Size</RetroTableHead>
              <RetroTableHead>Kind</RetroTableHead>
            </RetroTableRow>
          </RetroTableHeader>
          <RetroTableBody>
            {files.map((file, i) => (
              <RetroTableRow
                key={file.name}
                data-state={i === 1 ? "selected" : undefined}
              >
                <RetroTableCell>{file.name}</RetroTableCell>
                <RetroTableCell>{file.dateModified}</RetroTableCell>
                <RetroTableCell>{file.size}</RetroTableCell>
                <RetroTableCell>{file.kind}</RetroTableCell>
              </RetroTableRow>
            ))}
          </RetroTableBody>
        </RetroTable>
      </section>

      {/* ---- Table with footer ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          With footer
        </h2>

        <RetroTable className="w-[600px]">
          <RetroTableHeader>
            <RetroTableRow>
              <RetroTableHead>Name</RetroTableHead>
              <RetroTableHead>Date Modified</RetroTableHead>
              <RetroTableHead>Size</RetroTableHead>
              <RetroTableHead>Kind</RetroTableHead>
            </RetroTableRow>
          </RetroTableHeader>
          <RetroTableBody>
            {files
              .filter((f) => f.kind === "Application")
              .map((file) => (
                <RetroTableRow key={file.name}>
                  <RetroTableCell>{file.name}</RetroTableCell>
                  <RetroTableCell>{file.dateModified}</RetroTableCell>
                  <RetroTableCell>{file.size}</RetroTableCell>
                  <RetroTableCell>{file.kind}</RetroTableCell>
                </RetroTableRow>
              ))}
          </RetroTableBody>
          <RetroTableFooter>
            <RetroTableRow>
              <RetroTableCell>Total</RetroTableCell>
              <RetroTableCell />
              <RetroTableCell>2.1 MB</RetroTableCell>
              <RetroTableCell />
            </RetroTableRow>
          </RetroTableFooter>
        </RetroTable>
      </section>
    </ComponentDocLayout>
  )
}
