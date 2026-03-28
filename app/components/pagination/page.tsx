import {
  RetroPagination,
  RetroPaginationContent,
  RetroPaginationItem,
  RetroPaginationLink,
  RetroPaginationPrevious,
  RetroPaginationNext,
  RetroPaginationEllipsis,
} from "@/registry/new-york/ui/retro-pagination"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function PaginationPreview() {
  return (
    <ComponentDocLayout
      name="retro-pagination"
      title="RetroPagination"
      description="Page navigation controls with Mac OS 9 beveled page number links and prev/next buttons."
    >
      {/* Full pagination with ellipsis */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Pages 1-5 with Ellipsis</h2>
        <RetroPagination>
          <RetroPaginationContent>
            <RetroPaginationItem>
              <RetroPaginationPrevious href="#" />
            </RetroPaginationItem>
            <RetroPaginationItem>
              <RetroPaginationLink href="#">1</RetroPaginationLink>
            </RetroPaginationItem>
            <RetroPaginationItem>
              <RetroPaginationLink href="#">2</RetroPaginationLink>
            </RetroPaginationItem>
            <RetroPaginationItem>
              <RetroPaginationLink href="#" isActive>
                3
              </RetroPaginationLink>
            </RetroPaginationItem>
            <RetroPaginationItem>
              <RetroPaginationLink href="#">4</RetroPaginationLink>
            </RetroPaginationItem>
            <RetroPaginationItem>
              <RetroPaginationLink href="#">5</RetroPaginationLink>
            </RetroPaginationItem>
            <RetroPaginationItem>
              <RetroPaginationEllipsis />
            </RetroPaginationItem>
            <RetroPaginationItem>
              <RetroPaginationNext href="#" />
            </RetroPaginationItem>
          </RetroPaginationContent>
        </RetroPagination>
      </section>

      {/* First page active */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">First Page Active</h2>
        <RetroPagination>
          <RetroPaginationContent>
            <RetroPaginationItem>
              <RetroPaginationPrevious href="#" />
            </RetroPaginationItem>
            <RetroPaginationItem>
              <RetroPaginationLink href="#" isActive>
                1
              </RetroPaginationLink>
            </RetroPaginationItem>
            <RetroPaginationItem>
              <RetroPaginationLink href="#">2</RetroPaginationLink>
            </RetroPaginationItem>
            <RetroPaginationItem>
              <RetroPaginationLink href="#">3</RetroPaginationLink>
            </RetroPaginationItem>
            <RetroPaginationItem>
              <RetroPaginationEllipsis />
            </RetroPaginationItem>
            <RetroPaginationItem>
              <RetroPaginationLink href="#">10</RetroPaginationLink>
            </RetroPaginationItem>
            <RetroPaginationItem>
              <RetroPaginationNext href="#" />
            </RetroPaginationItem>
          </RetroPaginationContent>
        </RetroPagination>
      </section>

      {/* Minimal: just prev/next */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Prev / Next Only</h2>
        <RetroPagination>
          <RetroPaginationContent>
            <RetroPaginationItem>
              <RetroPaginationPrevious href="#" />
            </RetroPaginationItem>
            <RetroPaginationItem>
              <RetroPaginationNext href="#" />
            </RetroPaginationItem>
          </RetroPaginationContent>
        </RetroPagination>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Click page numbers to see the active/pressed bevel state.
      </p>
    </ComponentDocLayout>
  )
}
