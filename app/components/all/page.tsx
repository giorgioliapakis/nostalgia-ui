"use client"

import * as React from "react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { type ColumnDef } from "@tanstack/react-table"

/* ------------------------------------------------------------------ */
/*  Component Imports                                                  */
/* ------------------------------------------------------------------ */

// Form Controls
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { RetroCheckbox } from "@/registry/new-york/ui/retro-checkbox"
import { RetroRadioGroup, RetroRadioGroupItem } from "@/registry/new-york/ui/retro-radio"
import { RetroInput } from "@/registry/new-york/ui/retro-input"
import { RetroTextarea } from "@/registry/new-york/ui/retro-textarea"
import { RetroLabel } from "@/registry/new-york/ui/retro-label"
import {
  RetroSelect, RetroSelectTrigger, RetroSelectValue,
  RetroSelectContent, RetroSelectItem,
} from "@/registry/new-york/ui/retro-select"
import { RetroSwitch } from "@/registry/new-york/ui/retro-switch"
import { RetroToggle } from "@/registry/new-york/ui/retro-toggle"
import { RetroToggleGroup, RetroToggleGroupItem } from "@/registry/new-york/ui/retro-toggle-group"
import { RetroSlider } from "@/registry/new-york/ui/retro-slider"
import {
  RetroInputOTP, RetroInputOTPGroup,
  RetroInputOTPSlot, RetroInputOTPSeparator,
} from "@/registry/new-york/ui/retro-input-otp"
import {
  RetroCombobox, RetroComboboxTrigger, RetroComboboxContent,
  RetroComboboxInput, RetroComboboxList, RetroComboboxItem,
  RetroComboboxEmpty,
} from "@/registry/new-york/ui/retro-combobox"
import { RetroDatePicker } from "@/registry/new-york/ui/retro-date-picker"
import { RetroDateRangePicker } from "@/registry/new-york/ui/retro-date-range-picker"

// Layout & Structure
import { RetroCard, RetroCardHeader, RetroCardTitle, RetroCardContent } from "@/registry/new-york/ui/retro-card"
import { RetroSeparator } from "@/registry/new-york/ui/retro-separator"
import { RetroTabs, RetroTabsList, RetroTabsTrigger, RetroTabsContent } from "@/registry/new-york/ui/retro-tabs"
import {
  RetroAccordion, RetroAccordionItem,
  RetroAccordionTrigger, RetroAccordionContent,
} from "@/registry/new-york/ui/retro-accordion"
import {
  RetroCollapsible, RetroCollapsibleTrigger, RetroCollapsibleContent,
} from "@/registry/new-york/ui/retro-collapsible"
import { RetroAspectRatio } from "@/registry/new-york/ui/retro-aspect-ratio"
import {
  RetroResizablePanelGroup, RetroResizablePanel, RetroResizableHandle,
} from "@/registry/new-york/ui/retro-resizable"
import {
  RetroCarousel, RetroCarouselContent, RetroCarouselItem,
  RetroCarouselPrevious, RetroCarouselNext,
} from "@/registry/new-york/ui/retro-carousel"
import {
  RetroSidebarProvider, RetroSidebar, RetroSidebarHeader,
  RetroSidebarContent, RetroSidebarMenu, RetroSidebarMenuItem,
  RetroSidebarMenuButton, RetroSidebarGroup, RetroSidebarGroupLabel,
  RetroSidebarTrigger, RetroSidebarInset,
} from "@/registry/new-york/ui/retro-sidebar"
import { RetroSkeleton } from "@/registry/new-york/ui/retro-skeleton"

// Navigation
import {
  RetroBreadcrumb, RetroBreadcrumbList, RetroBreadcrumbItem,
  RetroBreadcrumbLink, RetroBreadcrumbPage, RetroBreadcrumbSeparator,
} from "@/registry/new-york/ui/retro-breadcrumb"
import {
  RetroPagination, RetroPaginationContent, RetroPaginationItem,
  RetroPaginationLink, RetroPaginationPrevious, RetroPaginationNext,
  RetroPaginationEllipsis,
} from "@/registry/new-york/ui/retro-pagination"
import {
  RetroNavigationMenu, RetroNavigationMenuList, RetroNavigationMenuItem,
  RetroNavigationMenuTrigger, RetroNavigationMenuContent, RetroNavigationMenuLink,
} from "@/registry/new-york/ui/retro-navigation-menu"
import {
  RetroMenuBar, RetroMenuBarMenu, RetroMenuBarTrigger,
  RetroMenuBarContent, RetroMenuBarItem, RetroMenuBarSeparator,
} from "@/registry/new-york/ui/retro-menu-bar"
import { RetroChevron } from "@/registry/new-york/ui/retro-chevron"
import { RetroNavButton } from "@/registry/new-york/ui/retro-nav-button"

// Data Display
import {
  RetroTable, RetroTableHeader, RetroTableBody,
  RetroTableRow, RetroTableHead, RetroTableCell,
} from "@/registry/new-york/ui/retro-table"
import { RetroDataTable } from "@/registry/new-york/ui/retro-data-table"
import { RetroBadge } from "@/registry/new-york/ui/retro-badge"
import { RetroAvatar, RetroAvatarFallback } from "@/registry/new-york/ui/retro-avatar"
import { RetroProgress } from "@/registry/new-york/ui/retro-progress"

// Overlays & Popups
import {
  RetroDialog, RetroDialogTrigger, RetroDialogContent,
  RetroDialogHeader, RetroDialogTitle, RetroDialogDescription,
  RetroDialogFooter, RetroDialogClose,
} from "@/registry/new-york/ui/retro-dialog"
import {
  RetroAlertDialog, RetroAlertDialogTrigger, RetroAlertDialogContent,
  RetroAlertDialogHeader, RetroAlertDialogTitle, RetroAlertDialogDescription,
  RetroAlertDialogBody, RetroAlertDialogFooter, RetroAlertDialogAction,
  RetroAlertDialogCancel,
} from "@/registry/new-york/ui/retro-alert-dialog"
import {
  RetroSheet, RetroSheetTrigger, RetroSheetContent,
  RetroSheetHeader, RetroSheetTitle, RetroSheetDescription,
} from "@/registry/new-york/ui/retro-sheet"
import {
  RetroDrawer, RetroDrawerTrigger, RetroDrawerContent,
  RetroDrawerHeader, RetroDrawerTitle, RetroDrawerDescription,
  RetroDrawerFooter, RetroDrawerClose,
} from "@/registry/new-york/ui/retro-drawer"
import {
  RetroPopover, RetroPopoverTrigger, RetroPopoverContent,
} from "@/registry/new-york/ui/retro-popover"
import { RetroHoverCard, RetroHoverCardTrigger, RetroHoverCardContent } from "@/registry/new-york/ui/retro-hover-card"
import {
  RetroTooltipProvider, RetroTooltip, RetroTooltipTrigger, RetroTooltipContent,
} from "@/registry/new-york/ui/retro-tooltip"
import {
  RetroContextMenu, RetroContextMenuTrigger, RetroContextMenuContent,
  RetroContextMenuItem, RetroContextMenuSeparator,
} from "@/registry/new-york/ui/retro-context-menu"
import {
  RetroDropdownMenu, RetroDropdownMenuTrigger, RetroDropdownMenuContent,
  RetroDropdownMenuItem, RetroDropdownMenuSeparator,
} from "@/registry/new-york/ui/retro-dropdown-menu"

// Feedback
import { RetroAlert, RetroAlertTitle, RetroAlertDescription } from "@/registry/new-york/ui/retro-alert"
import { RetroToastProvider, useRetroToast } from "@/registry/new-york/ui/retro-toast"
import { RetroSpinner, RetroBeachBall } from "@/registry/new-york/ui/retro-spinner"
import {
  RetroCommand, RetroCommandInput, RetroCommandList,
  RetroCommandEmpty, RetroCommandGroup, RetroCommandItem,
  RetroCommandSeparator,
} from "@/registry/new-york/ui/retro-command"

// OS9 Special
import { RetroWindow } from "@/registry/new-york/ui/retro-window"
import { RetroTitleBar } from "@/registry/new-york/ui/retro-title-bar"
import { RetroDesktop, RetroDesktopMenuBar, RetroDesktopArea, RetroDesktopIcon } from "@/registry/new-york/ui/retro-desktop"
import {
  RetroIconFolder, RetroIconDocument, RetroIconTrash,
  RetroIconHardDrive, RetroIconFloppy, RetroIconApplication,
  RetroIconAlert, RetroIconInfo, RetroIconQuestion,
  RetroIconStop, RetroIconNetwork, RetroIconPrinter,
  RetroIconSearch, RetroIconPreferences,
} from "@/registry/new-york/ui/retro-icons"
import { RetroToolbar, RetroToolbarButton, RetroToolbarSeparator, RetroToolbarGroup } from "@/registry/new-york/ui/retro-toolbar"
import { RetroScrollArea } from "@/registry/new-york/ui/retro-scrollbar"

// Infrastructure
import { RetroText } from "@/registry/new-york/ui/retro-typography"
import { RetroChartContainer, type RetroChartConfig } from "@/registry/new-york/ui/retro-chart"

/* ------------------------------------------------------------------ */
/*  Chart config                                                       */
/* ------------------------------------------------------------------ */

const chartConfig = {
  value: {
    label: "Usage",
    color: "#333399",
  },
} satisfies RetroChartConfig

const chartData = [
  { name: "Finder", value: 42 },
  { name: "SimpleText", value: 28 },
  { name: "Netscape", value: 35 },
  { name: "Sherlock", value: 18 },
]

/* ------------------------------------------------------------------ */
/*  Data Table column defs                                             */
/* ------------------------------------------------------------------ */

type FileRow = { name: string; size: string; kind: string; modified: string }

const dataTableColumns: ColumnDef<FileRow>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "size", header: "Size" },
  { accessorKey: "kind", header: "Kind" },
  { accessorKey: "modified", header: "Modified" },
]

const dataTableData: FileRow[] = [
  { name: "System Folder", size: "--", kind: "Folder", modified: "Jan 1, 2000" },
  { name: "SimpleText", size: "264 KB", kind: "Application", modified: "Feb 15, 2000" },
  { name: "ReadMe", size: "4 KB", kind: "Document", modified: "Mar 10, 2000" },
  { name: "Scrapbook", size: "32 KB", kind: "Desk Accessory", modified: "Apr 5, 2000" },
]

/* ------------------------------------------------------------------ */
/*  Toast trigger (needs to be inside provider)                        */
/* ------------------------------------------------------------------ */

function ToastDemo() {
  const { toast } = useRetroToast()
  return (
    <RetroButton
      onClick={() =>
        toast({
          title: "File Saved",
          description: "Your document has been saved to the Desktop.",
        })
      }
    >
      Show Toast
    </RetroButton>
  )
}

/* ------------------------------------------------------------------ */
/*  Section wrapper                                                    */
/* ------------------------------------------------------------------ */

function Section({ title, children, fullWidth }: { title: string; children: React.ReactNode; fullWidth?: boolean }) {
  return (
    <div className={fullWidth ? "col-span-1 md:col-span-2" : ""}>
      <RetroCard>
        <RetroCardHeader>
          <RetroCardTitle>{title}</RetroCardTitle>
        </RetroCardHeader>
        <RetroCardContent>{children}</RetroCardContent>
      </RetroCard>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Home Page                                                          */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [collapsibleOpen, setCollapsibleOpen] = React.useState(false)

  return (
    <RetroTooltipProvider>
      <RetroToastProvider>
        <main className="min-h-screen bg-[var(--os9-gray-200)] p-8 space-y-6">

          {/* ============================================================ */}
          {/* Hero                                                         */}
          {/* ============================================================ */}
          <RetroWindow title="nostalgia-ui" className="max-w-4xl mx-auto">
            <div className="p-6 space-y-4">
              <p className="os9-heading text-[12px]">
                Mac OS 9 UI Components for React
              </p>
              <p className="text-[10px] leading-normal">
                A shadcn-compatible component registry with 59 Mac OS 9 styled components.
                Every visual effect is pure CSS — zero image assets.
              </p>
              <p className="text-[10px] leading-normal font-mono bg-white border border-[var(--os9-black)] p-2">
                npx shadcn@latest add https://nostalgia-ui.com/r/retro-button.json
              </p>
              <div className="flex items-center gap-4">
                <RetroBadge variant="accent">59 Components</RetroBadge>
                <RetroBadge variant="azul">Tailwind v4</RetroBadge>
                <RetroBadge>Radix UI</RetroBadge>
              </div>
            </div>
          </RetroWindow>

          {/* ============================================================ */}
          {/* Component Demos Grid                                         */}
          {/* ============================================================ */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ---------------------------------------------------------- */}
            {/* FORM CONTROLS                                              */}
            {/* ---------------------------------------------------------- */}

            {/* Buttons */}
            <Section title="Button">
              <div className="space-y-2">
                <div className="flex gap-2 flex-wrap">
                  <RetroButton>Default</RetroButton>
                  <RetroButton variant="primary">Primary</RetroButton>
                  <RetroButton variant="secondary">Secondary</RetroButton>
                  <RetroButton disabled>Disabled</RetroButton>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <RetroButton size="sm">Small</RetroButton>
                  <RetroButton size="default">Default</RetroButton>
                  <RetroButton size="lg">Large</RetroButton>
                </div>
              </div>
            </Section>

            {/* Checkbox, Radio, Switch, Label */}
            <Section title="Checkbox, Radio, Switch">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <RetroCheckbox id="demo-cb" defaultChecked />
                  <RetroLabel htmlFor="demo-cb">Enable nostalgia</RetroLabel>
                </div>
                <RetroRadioGroup defaultValue="a">
                  <div className="flex items-center gap-2">
                    <RetroRadioGroupItem value="a" id="demo-ra" />
                    <RetroLabel htmlFor="demo-ra">System 9.2.2</RetroLabel>
                  </div>
                  <div className="flex items-center gap-2">
                    <RetroRadioGroupItem value="b" id="demo-rb" />
                    <RetroLabel htmlFor="demo-rb">System 9.1</RetroLabel>
                  </div>
                </RetroRadioGroup>
                <div className="flex items-center gap-2">
                  <RetroSwitch id="demo-sw" />
                  <RetroLabel htmlFor="demo-sw">Enable Sounds</RetroLabel>
                </div>
              </div>
            </Section>

            {/* Input & Textarea */}
            <Section title="Input & Textarea">
              <div className="space-y-2">
                <RetroLabel>Filename</RetroLabel>
                <RetroInput placeholder="Enter filename..." />
                <RetroLabel>Notes</RetroLabel>
                <RetroTextarea placeholder="Write a note..." className="min-h-[50px]" />
              </div>
            </Section>

            {/* Select */}
            <Section title="Select">
              <RetroSelect defaultValue="apple">
                <RetroSelectTrigger className="w-[180px]">
                  <RetroSelectValue placeholder="Pick a fruit" />
                </RetroSelectTrigger>
                <RetroSelectContent>
                  <RetroSelectItem value="apple">Apple</RetroSelectItem>
                  <RetroSelectItem value="banana">Banana</RetroSelectItem>
                  <RetroSelectItem value="grape">Grape</RetroSelectItem>
                  <RetroSelectItem value="orange">Orange</RetroSelectItem>
                </RetroSelectContent>
              </RetroSelect>
            </Section>

            {/* Toggle & Toggle Group */}
            <Section title="Toggle & Toggle Group">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <RetroToggle aria-label="Bold">B</RetroToggle>
                  <RetroToggle aria-label="Italic">I</RetroToggle>
                  <RetroToggle aria-label="Underline">U</RetroToggle>
                </div>
                <RetroToggleGroup type="multiple">
                  <RetroToggleGroupItem value="bold" aria-label="Bold">B</RetroToggleGroupItem>
                  <RetroToggleGroupItem value="italic" aria-label="Italic">I</RetroToggleGroupItem>
                  <RetroToggleGroupItem value="underline" aria-label="Underline">U</RetroToggleGroupItem>
                </RetroToggleGroup>
              </div>
            </Section>

            {/* Slider */}
            <Section title="Slider">
              <div className="space-y-3">
                <RetroLabel>Volume</RetroLabel>
                <RetroSlider defaultValue={[50]} max={100} step={1} />
              </div>
            </Section>

            {/* Input OTP */}
            <Section title="Input OTP">
              <RetroInputOTP maxLength={6}>
                <RetroInputOTPGroup>
                  <RetroInputOTPSlot index={0} />
                  <RetroInputOTPSlot index={1} />
                  <RetroInputOTPSlot index={2} />
                </RetroInputOTPGroup>
                <RetroInputOTPSeparator />
                <RetroInputOTPGroup>
                  <RetroInputOTPSlot index={3} />
                  <RetroInputOTPSlot index={4} />
                  <RetroInputOTPSlot index={5} />
                </RetroInputOTPGroup>
              </RetroInputOTP>
            </Section>

            {/* Combobox */}
            <Section title="Combobox">
              <RetroCombobox>
                <RetroComboboxTrigger placeholder="Select application..." />
                <RetroComboboxContent>
                  <RetroComboboxInput placeholder="Search..." />
                  <RetroComboboxList>
                    <RetroComboboxItem value="simpletext">SimpleText</RetroComboboxItem>
                    <RetroComboboxItem value="finder">Finder</RetroComboboxItem>
                    <RetroComboboxItem value="sherlock">Sherlock</RetroComboboxItem>
                    <RetroComboboxItem value="netscape">Netscape Navigator</RetroComboboxItem>
                    <RetroComboboxItem value="appleworks">AppleWorks</RetroComboboxItem>
                    <RetroComboboxEmpty />
                  </RetroComboboxList>
                </RetroComboboxContent>
              </RetroCombobox>
            </Section>

            {/* Date Picker */}
            <Section title="Date Picker">
              <div className="flex flex-col gap-4">
                <RetroDatePicker />
                <RetroDateRangePicker />
              </div>
            </Section>

            {/* ---------------------------------------------------------- */}
            {/* LAYOUT & STRUCTURE                                         */}
            {/* ---------------------------------------------------------- */}

            {/* Tabs */}
            <Section title="Tabs">
              <RetroTabs defaultValue="general">
                <RetroTabsList>
                  <RetroTabsTrigger value="general">General</RetroTabsTrigger>
                  <RetroTabsTrigger value="sharing">Sharing</RetroTabsTrigger>
                  <RetroTabsTrigger value="memory">Memory</RetroTabsTrigger>
                </RetroTabsList>
                <RetroTabsContent value="general">
                  <p className="text-[10px] p-2">General settings panel content.</p>
                </RetroTabsContent>
                <RetroTabsContent value="sharing">
                  <p className="text-[10px] p-2">File sharing options and AppleTalk settings.</p>
                </RetroTabsContent>
                <RetroTabsContent value="memory">
                  <p className="text-[10px] p-2">Memory allocation: 256 MB built-in.</p>
                </RetroTabsContent>
              </RetroTabs>
            </Section>

            {/* Accordion */}
            <Section title="Accordion">
              <RetroAccordion type="single" collapsible>
                <RetroAccordionItem value="item-1">
                  <RetroAccordionTrigger>What is Mac OS 9?</RetroAccordionTrigger>
                  <RetroAccordionContent>
                    Mac OS 9 was released in 1999 and was the last major release of the classic Mac OS.
                  </RetroAccordionContent>
                </RetroAccordionItem>
                <RetroAccordionItem value="item-2">
                  <RetroAccordionTrigger>What was Sherlock?</RetroAccordionTrigger>
                  <RetroAccordionContent>
                    Sherlock was a search tool that could search the local disk and the internet simultaneously.
                  </RetroAccordionContent>
                </RetroAccordionItem>
                <RetroAccordionItem value="item-3">
                  <RetroAccordionTrigger>What is AppleTalk?</RetroAccordionTrigger>
                  <RetroAccordionContent>
                    AppleTalk was Apple&apos;s proprietary networking protocol suite for local area networks.
                  </RetroAccordionContent>
                </RetroAccordionItem>
              </RetroAccordion>
            </Section>

            {/* Collapsible */}
            <Section title="Collapsible">
              <RetroCollapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
                <RetroCollapsibleTrigger>System Extensions</RetroCollapsibleTrigger>
                <RetroCollapsibleContent>
                  <div className="space-y-1 pt-2">
                    <p className="text-[10px]">AppleScript</p>
                    <p className="text-[10px]">ColorSync</p>
                    <p className="text-[10px]">Open Transport</p>
                  </div>
                </RetroCollapsibleContent>
              </RetroCollapsible>
            </Section>

            {/* Aspect Ratio */}
            <Section title="Aspect Ratio">
              <RetroAspectRatio ratio={16 / 9} bordered>
                <div className="flex h-full w-full items-center justify-center bg-[var(--os9-gray-300)]">
                  <p className="text-[10px] text-[var(--os9-gray-700)]">16:9 Aspect Ratio</p>
                </div>
              </RetroAspectRatio>
            </Section>

            {/* Resizable */}
            <Section title="Resizable">
              <RetroResizablePanelGroup direction="horizontal" className="min-h-[100px] border border-[var(--os9-black)]">
                <RetroResizablePanel defaultSize={50}>
                  <div className="flex h-full items-center justify-center p-2">
                    <p className="text-[10px]">Panel A</p>
                  </div>
                </RetroResizablePanel>
                <RetroResizableHandle />
                <RetroResizablePanel defaultSize={50}>
                  <div className="flex h-full items-center justify-center p-2">
                    <p className="text-[10px]">Panel B</p>
                  </div>
                </RetroResizablePanel>
              </RetroResizablePanelGroup>
            </Section>

            {/* Carousel */}
            <Section title="Carousel">
              <RetroCarousel className="w-full">
                <RetroCarouselContent>
                  {[
                    { bg: "bg-[#333399]", text: "text-white", label: "Slide 1: Extensions Manager" },
                    { bg: "bg-[#cc9900]", text: "text-white", label: "Slide 2: Control Panels" },
                    { bg: "bg-[#339933]", text: "text-white", label: "Slide 3: Chooser" },
                  ].map((slide, i) => (
                    <RetroCarouselItem key={i}>
                      <div className={`flex h-[80px] items-center justify-center ${slide.bg}`}>
                        <p className={`text-[10px] ${slide.text}`}>{slide.label}</p>
                      </div>
                    </RetroCarouselItem>
                  ))}
                </RetroCarouselContent>
                <RetroCarouselPrevious />
                <RetroCarouselNext />
              </RetroCarousel>
            </Section>

            {/* Skeleton */}
            <Section title="Skeleton">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <RetroSkeleton className="h-10 w-10" />
                  <div className="space-y-2">
                    <RetroSkeleton className="h-3 w-[150px]" />
                    <RetroSkeleton className="h-3 w-[100px]" />
                  </div>
                </div>
                <RetroSkeleton className="h-[60px] w-full" />
              </div>
            </Section>

            {/* Card & Separator */}
            <Section title="Card & Separator">
              <p className="text-[10px] mb-2">
                This entire section is rendered inside a RetroCard. The line below is a RetroSeparator.
              </p>
              <RetroSeparator />
              <p className="text-[10px] mt-2">Content below the separator.</p>
            </Section>

            {/* ---------------------------------------------------------- */}
            {/* NAVIGATION                                                 */}
            {/* ---------------------------------------------------------- */}

            {/* Breadcrumb */}
            <Section title="Breadcrumb">
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
                    <RetroBreadcrumbPage>Preferences</RetroBreadcrumbPage>
                  </RetroBreadcrumbItem>
                </RetroBreadcrumbList>
              </RetroBreadcrumb>
            </Section>

            {/* Pagination */}
            <Section title="Pagination">
              <RetroPagination>
                <RetroPaginationContent>
                  <RetroPaginationItem>
                    <RetroPaginationPrevious href="#" />
                  </RetroPaginationItem>
                  <RetroPaginationItem>
                    <RetroPaginationLink href="#" isActive>1</RetroPaginationLink>
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
                    <RetroPaginationLink href="#">5</RetroPaginationLink>
                  </RetroPaginationItem>
                  <RetroPaginationItem>
                    <RetroPaginationNext href="#" />
                  </RetroPaginationItem>
                </RetroPaginationContent>
              </RetroPagination>
            </Section>

            {/* Navigation Menu */}
            <Section title="Navigation Menu" fullWidth>
              <RetroNavigationMenu>
                <RetroNavigationMenuList>
                  <RetroNavigationMenuItem>
                    <RetroNavigationMenuTrigger>Getting Started</RetroNavigationMenuTrigger>
                    <RetroNavigationMenuContent>
                      <div className="grid gap-1 w-[300px]">
                        <RetroNavigationMenuLink href="#">Introduction</RetroNavigationMenuLink>
                        <RetroNavigationMenuLink href="#">Installation</RetroNavigationMenuLink>
                        <RetroNavigationMenuLink href="#">Quick Start</RetroNavigationMenuLink>
                      </div>
                    </RetroNavigationMenuContent>
                  </RetroNavigationMenuItem>
                  <RetroNavigationMenuItem>
                    <RetroNavigationMenuTrigger>Components</RetroNavigationMenuTrigger>
                    <RetroNavigationMenuContent>
                      <div className="grid gap-1 w-[300px]">
                        <RetroNavigationMenuLink href="#">Buttons</RetroNavigationMenuLink>
                        <RetroNavigationMenuLink href="#">Forms</RetroNavigationMenuLink>
                        <RetroNavigationMenuLink href="#">Layout</RetroNavigationMenuLink>
                      </div>
                    </RetroNavigationMenuContent>
                  </RetroNavigationMenuItem>
                </RetroNavigationMenuList>
              </RetroNavigationMenu>
            </Section>

            {/* Menu Bar */}
            <Section title="Menu Bar" fullWidth>
              <RetroMenuBar>
                <RetroMenuBarMenu>
                  <RetroMenuBarTrigger>File</RetroMenuBarTrigger>
                  <RetroMenuBarContent>
                    <RetroMenuBarItem>New</RetroMenuBarItem>
                    <RetroMenuBarItem>Open...</RetroMenuBarItem>
                    <RetroMenuBarSeparator />
                    <RetroMenuBarItem>Save</RetroMenuBarItem>
                    <RetroMenuBarItem>Save As...</RetroMenuBarItem>
                  </RetroMenuBarContent>
                </RetroMenuBarMenu>
                <RetroMenuBarMenu>
                  <RetroMenuBarTrigger>Edit</RetroMenuBarTrigger>
                  <RetroMenuBarContent>
                    <RetroMenuBarItem>Undo</RetroMenuBarItem>
                    <RetroMenuBarSeparator />
                    <RetroMenuBarItem>Cut</RetroMenuBarItem>
                    <RetroMenuBarItem>Copy</RetroMenuBarItem>
                    <RetroMenuBarItem>Paste</RetroMenuBarItem>
                  </RetroMenuBarContent>
                </RetroMenuBarMenu>
                <RetroMenuBarMenu>
                  <RetroMenuBarTrigger>View</RetroMenuBarTrigger>
                  <RetroMenuBarContent>
                    <RetroMenuBarItem>as Icons</RetroMenuBarItem>
                    <RetroMenuBarItem>as List</RetroMenuBarItem>
                    <RetroMenuBarSeparator />
                    <RetroMenuBarItem>Clean Up</RetroMenuBarItem>
                  </RetroMenuBarContent>
                </RetroMenuBarMenu>
              </RetroMenuBar>
            </Section>

            {/* Chevrons & Nav Buttons */}
            <Section title="Nav Button & Chevron">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-[10px] mb-1 font-bold">Chevrons</p>
                  <div className="flex gap-1">
                    <RetroChevron direction="up" />
                    <RetroChevron direction="down" />
                    <RetroChevron direction="left" />
                    <RetroChevron direction="right" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] mb-1 font-bold">Nav Buttons</p>
                  <div className="flex gap-1">
                    <RetroNavButton direction="left" />
                    <RetroNavButton direction="right" />
                    <RetroNavButton direction="up" />
                    <RetroNavButton direction="down" />
                  </div>
                </div>
              </div>
            </Section>

            {/* Dropdown Menu */}
            <Section title="Dropdown Menu">
              <RetroDropdownMenu>
                <RetroDropdownMenuTrigger asChild>
                  <RetroButton>Open Menu</RetroButton>
                </RetroDropdownMenuTrigger>
                <RetroDropdownMenuContent>
                  <RetroDropdownMenuItem>New Folder</RetroDropdownMenuItem>
                  <RetroDropdownMenuItem>Get Info</RetroDropdownMenuItem>
                  <RetroDropdownMenuSeparator />
                  <RetroDropdownMenuItem>Move to Trash</RetroDropdownMenuItem>
                </RetroDropdownMenuContent>
              </RetroDropdownMenu>
            </Section>

            {/* ---------------------------------------------------------- */}
            {/* DATA DISPLAY                                               */}
            {/* ---------------------------------------------------------- */}

            {/* Table */}
            <Section title="Table" fullWidth>
              <RetroTable>
                <RetroTableHeader>
                  <RetroTableRow>
                    <RetroTableHead>Name</RetroTableHead>
                    <RetroTableHead>Size</RetroTableHead>
                    <RetroTableHead>Kind</RetroTableHead>
                  </RetroTableRow>
                </RetroTableHeader>
                <RetroTableBody>
                  <RetroTableRow>
                    <RetroTableCell>SimpleText</RetroTableCell>
                    <RetroTableCell>264 KB</RetroTableCell>
                    <RetroTableCell>Application</RetroTableCell>
                  </RetroTableRow>
                  <RetroTableRow>
                    <RetroTableCell>ReadMe</RetroTableCell>
                    <RetroTableCell>4 KB</RetroTableCell>
                    <RetroTableCell>Document</RetroTableCell>
                  </RetroTableRow>
                  <RetroTableRow>
                    <RetroTableCell>System Folder</RetroTableCell>
                    <RetroTableCell>--</RetroTableCell>
                    <RetroTableCell>Folder</RetroTableCell>
                  </RetroTableRow>
                </RetroTableBody>
              </RetroTable>
            </Section>

            {/* Data Table */}
            <Section title="Data Table" fullWidth>
              <RetroDataTable
                columns={dataTableColumns}
                data={dataTableData}
                filterColumn="name"
                filterPlaceholder="Filter files..."
                pageSize={5}
              />
            </Section>

            {/* Badge */}
            <Section title="Badge">
              <div className="flex gap-2 flex-wrap">
                <RetroBadge>Default</RetroBadge>
                <RetroBadge variant="accent">Accent</RetroBadge>
                <RetroBadge variant="azul">Azul</RetroBadge>
              </div>
            </Section>

            {/* Avatar */}
            <Section title="Avatar">
              <div className="flex items-center gap-3">
                <RetroAvatar>
                  <RetroAvatarFallback>SJ</RetroAvatarFallback>
                </RetroAvatar>
                <RetroAvatar>
                  <RetroAvatarFallback>JI</RetroAvatarFallback>
                </RetroAvatar>
                <RetroAvatar>
                  <RetroAvatarFallback>AK</RetroAvatarFallback>
                </RetroAvatar>
              </div>
            </Section>

            {/* Progress */}
            <Section title="Progress">
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] mb-1">Determinate (65%)</p>
                  <RetroProgress value={65} />
                </div>
                <div>
                  <p className="text-[10px] mb-1">Indeterminate</p>
                  <RetroProgress indeterminate />
                </div>
              </div>
            </Section>

            {/* ---------------------------------------------------------- */}
            {/* OVERLAYS & POPUPS                                          */}
            {/* ---------------------------------------------------------- */}

            {/* Dialog */}
            <Section title="Dialog">
              <RetroDialog>
                <RetroDialogTrigger asChild>
                  <RetroButton>Open Dialog</RetroButton>
                </RetroDialogTrigger>
                <RetroDialogContent>
                  <RetroDialogHeader>
                    <RetroDialogTitle>About This Mac</RetroDialogTitle>
                  </RetroDialogHeader>
                  <div className="p-4 space-y-2">
                    <RetroDialogDescription>
                      Welcome to the nostalgia-ui dialog component.
                    </RetroDialogDescription>
                    <p className="text-[10px]">Mac OS 9.2.2 — Built-in Memory: 256 MB</p>
                  </div>
                  <RetroDialogFooter className="p-4">
                    <RetroDialogClose asChild>
                      <RetroButton variant="primary">OK</RetroButton>
                    </RetroDialogClose>
                  </RetroDialogFooter>
                </RetroDialogContent>
              </RetroDialog>
            </Section>

            {/* Alert Dialog */}
            <Section title="Alert Dialog">
              <RetroAlertDialog>
                <RetroAlertDialogTrigger asChild>
                  <RetroButton>Empty Trash</RetroButton>
                </RetroAlertDialogTrigger>
                <RetroAlertDialogContent>
                  <RetroAlertDialogHeader>
                    <RetroAlertDialogTitle>Confirm</RetroAlertDialogTitle>
                  </RetroAlertDialogHeader>
                  <RetroAlertDialogBody>
                    <RetroAlertDialogDescription>
                      Are you sure you want to permanently erase the items in the Trash?
                      You cannot undo this action.
                    </RetroAlertDialogDescription>
                  </RetroAlertDialogBody>
                  <RetroAlertDialogFooter>
                    <RetroAlertDialogCancel>Cancel</RetroAlertDialogCancel>
                    <RetroAlertDialogAction>OK</RetroAlertDialogAction>
                  </RetroAlertDialogFooter>
                </RetroAlertDialogContent>
              </RetroAlertDialog>
            </Section>

            {/* Sheet */}
            <Section title="Sheet">
              <RetroSheet>
                <RetroSheetTrigger asChild>
                  <RetroButton>Open Sheet</RetroButton>
                </RetroSheetTrigger>
                <RetroSheetContent>
                  <RetroSheetHeader>
                    <RetroSheetTitle>Inspector</RetroSheetTitle>
                  </RetroSheetHeader>
                  <div className="p-4">
                    <RetroSheetDescription>
                      This is a sheet panel sliding in from the right, OS9 style.
                    </RetroSheetDescription>
                  </div>
                </RetroSheetContent>
              </RetroSheet>
            </Section>

            {/* Drawer */}
            <Section title="Drawer">
              <RetroDrawer>
                <RetroDrawerTrigger asChild>
                  <RetroButton>Open Drawer</RetroButton>
                </RetroDrawerTrigger>
                <RetroDrawerContent>
                  <RetroDrawerHeader>
                    <RetroDrawerTitle>System Information</RetroDrawerTitle>
                    <RetroDrawerDescription>
                      A bottom drawer with OS9 styling.
                    </RetroDrawerDescription>
                  </RetroDrawerHeader>
                  <div className="p-4">
                    <p className="text-[10px]">Processor: PowerPC G3 — Memory: 256 MB</p>
                  </div>
                  <RetroDrawerFooter>
                    <RetroDrawerClose asChild>
                      <RetroButton>Done</RetroButton>
                    </RetroDrawerClose>
                  </RetroDrawerFooter>
                </RetroDrawerContent>
              </RetroDrawer>
            </Section>

            {/* Popover */}
            <Section title="Popover">
              <RetroPopover>
                <RetroPopoverTrigger asChild>
                  <RetroButton>Show Popover</RetroButton>
                </RetroPopoverTrigger>
                <RetroPopoverContent className="w-[200px]">
                  <p className="text-[10px]">This is a popover with OS9 styling. It appears near its trigger.</p>
                </RetroPopoverContent>
              </RetroPopover>
            </Section>

            {/* Hover Card */}
            <Section title="Hover Card">
              <RetroHoverCard>
                <RetroHoverCardTrigger asChild>
                  <span className="text-[10px] text-[var(--os9-azul)] underline cursor-pointer">
                    Hover over me
                  </span>
                </RetroHoverCardTrigger>
                <RetroHoverCardContent>
                  <p className="text-[10px]">
                    This is a hover card. It appears when you hover the trigger, just like OS9 balloon help.
                  </p>
                </RetroHoverCardContent>
              </RetroHoverCard>
            </Section>

            {/* Tooltip */}
            <Section title="Tooltip">
              <RetroTooltip>
                <RetroTooltipTrigger asChild>
                  <RetroButton>Hover for Balloon Help</RetroButton>
                </RetroTooltipTrigger>
                <RetroTooltipContent>
                  <p>This is OS9 Balloon Help!</p>
                </RetroTooltipContent>
              </RetroTooltip>
            </Section>

            {/* Context Menu */}
            <Section title="Context Menu">
              <RetroContextMenu>
                <RetroContextMenuTrigger>
                  <div className="flex h-[60px] items-center justify-center border border-dashed border-[var(--os9-gray-700)] bg-[var(--os9-gray-300)]">
                    <p className="text-[10px] text-[var(--os9-gray-700)]">Right-click here</p>
                  </div>
                </RetroContextMenuTrigger>
                <RetroContextMenuContent>
                  <RetroContextMenuItem>New Folder</RetroContextMenuItem>
                  <RetroContextMenuItem>Get Info</RetroContextMenuItem>
                  <RetroContextMenuSeparator />
                  <RetroContextMenuItem>Clean Up</RetroContextMenuItem>
                  <RetroContextMenuItem>View as List</RetroContextMenuItem>
                </RetroContextMenuContent>
              </RetroContextMenu>
            </Section>

            {/* ---------------------------------------------------------- */}
            {/* FEEDBACK                                                   */}
            {/* ---------------------------------------------------------- */}

            {/* Alert */}
            <Section title="Alert" fullWidth>
              <div className="space-y-2">
                <RetroAlert>
                  <RetroAlertTitle>Notice</RetroAlertTitle>
                  <RetroAlertDescription>This is a default alert notification.</RetroAlertDescription>
                </RetroAlert>
                <RetroAlert variant="warning">
                  <RetroAlertTitle>Warning</RetroAlertTitle>
                  <RetroAlertDescription>The startup disk is almost full.</RetroAlertDescription>
                </RetroAlert>
                <RetroAlert variant="destructive">
                  <RetroAlertTitle>Error</RetroAlertTitle>
                  <RetroAlertDescription>The application has unexpectedly quit.</RetroAlertDescription>
                </RetroAlert>
              </div>
            </Section>

            {/* Toast */}
            <Section title="Toast">
              <ToastDemo />
            </Section>

            {/* Spinner */}
            <Section title="Spinner">
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] mb-2 font-bold">RetroSpinner (Watch)</p>
                  <div className="flex items-center gap-3">
                    <RetroSpinner size="sm" />
                    <RetroSpinner size="default" />
                    <RetroSpinner size="lg" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] mb-2 font-bold">RetroBeachBall</p>
                  <div className="flex items-center gap-3">
                    <RetroBeachBall size="sm" />
                    <RetroBeachBall size="default" />
                    <RetroBeachBall size="lg" />
                  </div>
                </div>
              </div>
            </Section>

            {/* Command */}
            <Section title="Command" fullWidth>
              <RetroCommand className="max-w-[350px]">
                <RetroCommandInput placeholder="Type a command..." />
                <RetroCommandList>
                  <RetroCommandEmpty>No results found.</RetroCommandEmpty>
                  <RetroCommandGroup heading="Applications">
                    <RetroCommandItem>SimpleText</RetroCommandItem>
                    <RetroCommandItem>Finder</RetroCommandItem>
                    <RetroCommandItem>Sherlock</RetroCommandItem>
                  </RetroCommandGroup>
                  <RetroCommandSeparator />
                  <RetroCommandGroup heading="System">
                    <RetroCommandItem>Control Panels</RetroCommandItem>
                    <RetroCommandItem>Extensions Manager</RetroCommandItem>
                  </RetroCommandGroup>
                </RetroCommandList>
              </RetroCommand>
            </Section>

            {/* ---------------------------------------------------------- */}
            {/* OS9 SPECIAL                                                */}
            {/* ---------------------------------------------------------- */}

            {/* Window */}
            <Section title="Window">
              <RetroWindow title="About This Mac" className="max-w-[260px]">
                <div className="p-3">
                  <p className="text-[10px]">Mac OS 9.2.2</p>
                  <p className="text-[10px] text-[var(--os9-gray-700)]">Built-in Memory: 256 MB</p>
                </div>
              </RetroWindow>
            </Section>

            {/* Title Bar */}
            <Section title="Title Bar">
              <div className="space-y-2">
                <RetroTitleBar title="Active Window" active />
                <RetroTitleBar title="Inactive Window" active={false} />
              </div>
            </Section>

            {/* Toolbar */}
            <Section title="Toolbar" fullWidth>
              <RetroToolbar>
                <RetroToolbarGroup>
                  <RetroToolbarButton aria-label="Back">
                    <RetroChevron direction="left" />
                  </RetroToolbarButton>
                  <RetroToolbarButton aria-label="Forward">
                    <RetroChevron direction="right" />
                  </RetroToolbarButton>
                </RetroToolbarGroup>
                <RetroToolbarSeparator />
                <RetroToolbarGroup>
                  <RetroToolbarButton aria-label="Folder">
                    <RetroIconFolder size="sm" />
                  </RetroToolbarButton>
                  <RetroToolbarButton aria-label="Search">
                    <RetroIconSearch size="sm" />
                  </RetroToolbarButton>
                  <RetroToolbarButton aria-label="Trash">
                    <RetroIconTrash size="sm" />
                  </RetroToolbarButton>
                </RetroToolbarGroup>
                <RetroToolbarSeparator />
                <RetroToolbarButton disabled aria-label="Disabled">
                  <RetroIconPrinter size="sm" />
                </RetroToolbarButton>
              </RetroToolbar>
            </Section>

            {/* Scrollbar */}
            <Section title="Scrollbar">
              <RetroScrollArea className="h-[100px] w-full border border-[var(--os9-black)]">
                <div className="p-2 space-y-1">
                  {Array.from({ length: 20 }, (_, i) => (
                    <p key={i} className="text-[10px]">
                      Line {i + 1}: Welcome to Mac OS 9 scroll area content.
                    </p>
                  ))}
                </div>
              </RetroScrollArea>
            </Section>

            {/* Desktop (small preview) */}
            <Section title="Desktop" fullWidth>
              <div className="w-[400px] h-[300px] border border-[var(--os9-black)] overflow-hidden mx-auto">
                <RetroDesktop className="!h-full !w-full">
                  <RetroDesktopMenuBar showClock>
                    <span>File</span>
                    <span>Edit</span>
                    <span>View</span>
                  </RetroDesktopMenuBar>
                  <RetroDesktopArea wallpaper="pattern">
                    <div className="flex flex-wrap gap-2 p-4">
                      <RetroDesktopIcon
                        icon={<RetroIconHardDrive size="default" />}
                        label="Macintosh HD"
                      />
                      <RetroDesktopIcon
                        icon={<RetroIconTrash size="default" />}
                        label="Trash"
                      />
                      <RetroDesktopIcon
                        icon={<RetroIconFolder size="default" />}
                        label="Documents"
                      />
                    </div>
                  </RetroDesktopArea>
                </RetroDesktop>
              </div>
            </Section>

            {/* Icons */}
            <Section title="Icons" fullWidth>
              <div className="grid grid-cols-7 gap-4">
                {[
                  { Icon: RetroIconFolder, name: "Folder" },
                  { Icon: RetroIconDocument, name: "Document" },
                  { Icon: RetroIconTrash, name: "Trash" },
                  { Icon: RetroIconHardDrive, name: "Hard Drive" },
                  { Icon: RetroIconFloppy, name: "Floppy" },
                  { Icon: RetroIconApplication, name: "Application" },
                  { Icon: RetroIconAlert, name: "Alert" },
                  { Icon: RetroIconInfo, name: "Info" },
                  { Icon: RetroIconQuestion, name: "Question" },
                  { Icon: RetroIconStop, name: "Stop" },
                  { Icon: RetroIconNetwork, name: "Network" },
                  { Icon: RetroIconPrinter, name: "Printer" },
                  { Icon: RetroIconSearch, name: "Search" },
                  { Icon: RetroIconPreferences, name: "Preferences" },
                ].map(({ Icon, name }) => (
                  <div key={name} className="flex flex-col items-center gap-1">
                    <Icon size="default" />
                    <span className="text-[9px] text-center">{name}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* ---------------------------------------------------------- */}
            {/* INFRASTRUCTURE                                             */}
            {/* ---------------------------------------------------------- */}

            {/* Typography */}
            <Section title="Typography" fullWidth>
              <div className="space-y-2">
                <RetroText variant="editorial">Editorial (24px serif)</RetroText>
                <RetroText variant="headline">Headline (12px Charcoal)</RetroText>
                <RetroText variant="smallHeadline">Small Headline (10px Charcoal)</RetroText>
                <RetroText variant="body">Body (10px Geneva)</RetroText>
                <RetroText variant="bodySmall">Body Small (9px Geneva)</RetroText>
                <RetroText variant="bodyBold">Body Bold (9px Geneva bold)</RetroText>
                <RetroText variant="bodySlanted">Body Slanted (9px Geneva italic)</RetroText>
                <RetroText variant="mono">Mono (10px Monaco)</RetroText>
              </div>
            </Section>

            {/* Chart */}
            <Section title="Chart" fullWidth>
              <RetroChartContainer config={chartConfig} className="h-[200px] w-full max-w-[400px]">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill="var(--color-value)" />
                </BarChart>
              </RetroChartContainer>
            </Section>

            {/* Sidebar */}
            <Section title="Sidebar" fullWidth>
              <div className="h-[250px] border border-[var(--os9-black)] overflow-hidden">
                <RetroSidebarProvider defaultOpen>
                  <RetroSidebar contained>
                    <RetroSidebarHeader>
                      <span className="os9-heading text-[10px]">Finder</span>
                    </RetroSidebarHeader>
                    <RetroSidebarContent>
                      <RetroSidebarGroup>
                        <RetroSidebarGroupLabel>Favorites</RetroSidebarGroupLabel>
                        <RetroSidebarMenu>
                          <RetroSidebarMenuItem>
                            <RetroSidebarMenuButton>Desktop</RetroSidebarMenuButton>
                          </RetroSidebarMenuItem>
                          <RetroSidebarMenuItem>
                            <RetroSidebarMenuButton>Documents</RetroSidebarMenuButton>
                          </RetroSidebarMenuItem>
                          <RetroSidebarMenuItem>
                            <RetroSidebarMenuButton isActive>Applications</RetroSidebarMenuButton>
                          </RetroSidebarMenuItem>
                        </RetroSidebarMenu>
                      </RetroSidebarGroup>
                    </RetroSidebarContent>
                  </RetroSidebar>
                  <RetroSidebarInset>
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <p className="text-[10px]">Main content area</p>
                        <RetroSidebarTrigger className="mt-2" />
                      </div>
                    </div>
                  </RetroSidebarInset>
                </RetroSidebarProvider>
              </div>
            </Section>

            {/* Theme Provider note */}
            <Section title="Theme Provider">
              <p className="text-[10px]">
                The <code className="font-mono bg-white border border-[var(--os9-black)] px-1">RetroThemeProvider</code> is
                an infrastructure component that provides the OS9 design tokens and theme context.
                It wraps your application and is not rendered visually.
              </p>
            </Section>

            {/* Form note */}
            <Section title="Form">
              <p className="text-[10px] mb-2">
                The <code className="font-mono bg-white border border-[var(--os9-black)] px-1">RetroForm</code> component
                integrates with react-hook-form for validation. Here is a simplified example:
              </p>
              <div className="space-y-2 border border-[var(--os9-black)] p-3 bg-[var(--os9-gray-300)]">
                <div className="space-y-1">
                  <RetroLabel htmlFor="form-name">Name</RetroLabel>
                  <RetroInput id="form-name" placeholder="Enter your name" />
                </div>
                <RetroButton variant="primary" size="sm">Submit</RetroButton>
              </div>
            </Section>

          </div>

          {/* ============================================================ */}
          {/* Full Component Index                                         */}
          {/* ============================================================ */}
          <RetroWindow title="All 59 Components" className="max-w-4xl mx-auto">
            <div className="p-4">
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {[
                  "accordion", "alert", "alert-dialog", "aspect-ratio", "avatar",
                  "badge", "breadcrumb", "button", "calendar", "card", "carousel",
                  "chart", "checkbox", "chevron", "collapsible", "combobox",
                  "command", "context-menu", "data-table", "date-picker",
                  "desktop", "dialog", "drawer", "dropdown-menu", "form",
                  "hover-card", "icons", "input", "input-otp", "label",
                  "menu-bar", "nav-button", "navigation-menu", "pagination",
                  "popover", "progress", "radio", "resizable", "scrollbar",
                  "select", "separator", "sheet", "sidebar", "skeleton",
                  "slider", "spinner", "switch", "table", "tabs", "textarea",
                  "theme-provider", "title-bar", "toast", "toggle",
                  "toggle-group", "toolbar", "tooltip", "typography", "window",
                ].map((name) => (
                  <a
                    key={name}
                    href={`/preview/${name}`}
                    className="text-[10px] text-[var(--os9-azul)] underline hover:bg-[var(--os9-lavender)] px-1"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </RetroWindow>

        </main>
      </RetroToastProvider>
    </RetroTooltipProvider>
  )
}
