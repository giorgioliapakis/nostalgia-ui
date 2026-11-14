"use client"

/*
 * RetroCommand: a Mac OS 9 styled command palette on UI SDK's Command.
 *
 * Crafted moments:
 *  - Gliding azul highlight (modern flair): one highlight layer slides
 *    between commands as you arrow, type or point, and the row's ink flips to
 *    white as it arrives, exactly like the menus. Classic flair snaps.
 *  - Menu blink (both flairs): the chosen command flashes three times, then
 *    runs, as a chosen menu item always did.
 */

import * as React from "react"
import {
  Command as CommandPrimitive,
  CommandEmpty as CommandEmptyPrimitive,
  CommandGroup as CommandGroupPrimitive,
  CommandGroupLabel as CommandGroupLabelPrimitive,
  CommandInput as CommandInputPrimitive,
  CommandItem as CommandItemPrimitive,
  CommandList as CommandListPrimitive,
  CommandSeparator as CommandSeparatorPrimitive,
  CommandShortcut as CommandShortcutPrimitive,
} from "@ui-sdk/react/command"
import {
  Dialog as DialogPrimitive,
  DialogBackdrop as DialogBackdropPrimitive,
  DialogContent as DialogContentPrimitive,
  DialogDescription as DialogDescriptionPrimitive,
  DialogTitle as DialogTitlePrimitive,
} from "@ui-sdk/react/dialog"

import { cn } from "@/lib/utils"
import {
  BLINK_COUNT,
  BLINK_CYCLE_MS,
  blinkThen,
  useGlide,
  useMergedRef,
} from "@/registry/new-york/lib/retro-motion"

/* string class names and plain children, as shadcn-style parts take */
type WithClassName<P> = Omit<P, "className" | "children"> & {
  className?: string
  children?: React.ReactNode
}

/* ------------------------------------------------------------------ */
/*  Glide + blink CSS                                                  */
/* ------------------------------------------------------------------ */

/* Unlayered, so it beats the row utilities without !important; the blink
 * animation in turn beats both. React hoists it and dedupes it by href. */
const COMMAND_CSS = `
.os9-command:not([data-glide-off]) [role="option"][data-highlighted] {
  background-color: transparent;
}
.os9-command[data-glide-off] > [data-glide-layer],
.os9-command:has([data-pending]) > [data-glide-layer] {
  opacity: 0 !important;
  transition: none !important;
}
.os9-command [role="option"] { transition: color 0s linear 60ms; }
.os9-command[data-glide-off] [role="option"] { transition: none; }
@keyframes os9-command-blink {
  0%, 49.9% { background-color: transparent; color: var(--os9-black); }
  50%, 100% { background-color: var(--os9-azul); color: var(--os9-white); }
}
.os9-command [data-pending] {
  animation: os9-command-blink ${BLINK_CYCLE_MS}ms steps(1, end) ${BLINK_COUNT};
}
.os9-command [data-pending] * { color: inherit !important; }
`

/* ------------------------------------------------------------------ */
/*  RetroCommand (root)                                                */
/* ------------------------------------------------------------------ */

function RetroCommand({
  className,
  style,
  ...props
}: WithClassName<React.ComponentProps<typeof CommandPrimitive>> & { style?: React.CSSProperties }) {
  return (
    <CommandPrimitive
      className={cn("flex flex-col overflow-hidden", "bg-os9-gray-200", "border border-os9-black", className)}
      style={{
        boxShadow:
          "2px 2px 0 var(--os9-black), inset 2px 2px 0 rgba(255,255,255,0.6), inset -2px -2px 0 rgba(38,38,38,0.4)",
        ...style,
      }}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  RetroCommandDialog                                                 */
/* ------------------------------------------------------------------ */

type RetroCommandDialogProps = Omit<React.ComponentProps<typeof DialogPrimitive>, "children"> & {
  children?: React.ReactNode
  /** Accessible (visually hidden) dialog title. Defaults to "Command Palette". */
  title?: string
  /** Accessible (visually hidden) dialog description. */
  description?: string
  /** Props for the RetroCommand inside, like `onAction` or `filter`. */
  commandProps?: React.ComponentProps<typeof RetroCommand>
}

/* The palette pops in from 95% with a 120ms fade (modern flair); classic
 * flair shows it at once. Box properties carry `!` against the popup reset. */
function RetroCommandDialog({
  children,
  title = "Command Palette",
  description = "Search for a command to run...",
  commandProps,
  ...props
}: RetroCommandDialogProps) {
  return (
    <DialogPrimitive {...props}>
      <DialogBackdropPrimitive
        className={cn(
          "fixed! inset-0! z-50 bg-black/40!",
          "transition-opacity duration-150 ease-out data-starting-style:opacity-0 data-ending-style:opacity-0",
          "in-data-[flair=classic]:transition-none motion-reduce:transition-none"
        )}
      />
      <DialogContentPrimitive
        className={cn(
          "fixed! inset-auto! left-1/2! top-1/2! z-50 m-0! p-0! h-auto! w-[calc(100%-2rem)]! max-w-[450px]!",
          "border-0! bg-transparent! overflow-visible! text-os9-black!",
          "-translate-x-1/2 -translate-y-1/2 outline-none",
          "transition-[opacity,scale] duration-[120ms] ease-out",
          "data-starting-style:scale-95 data-starting-style:opacity-0",
          "data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-75",
          "in-data-[flair=classic]:transition-none motion-reduce:transition-none"
        )}
      >
        <DialogTitlePrimitive className="sr-only">{title}</DialogTitlePrimitive>
        <DialogDescriptionPrimitive className="sr-only">{description}</DialogDescriptionPrimitive>
        <RetroCommand {...commandProps}>{children}</RetroCommand>
      </DialogContentPrimitive>
    </DialogPrimitive>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroCommandInput                                                  */
/* ------------------------------------------------------------------ */

function RetroCommandInput({
  className,
  placeholder,
  ...props
}: WithClassName<React.ComponentProps<typeof CommandInputPrimitive>>) {
  return (
    <div className="flex items-center gap-2 px-2 pt-2 pb-1">
      {/* magnifying glass */}
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden>
        <circle cx="6.5" cy="6.5" r="5" stroke="var(--os9-gray-700)" strokeWidth="2" />
        <line
          x1="10.5"
          y1="10.5"
          x2="15"
          y2="15"
          stroke="var(--os9-gray-700)"
          strokeWidth="2"
          strokeLinecap="square"
        />
      </svg>
      <CommandInputPrimitive
        aria-label={placeholder ?? "Search commands"}
        placeholder={placeholder}
        className={cn(
          "min-w-0 flex-1 bg-os9-white text-os9-black",
          "font-[family-name:var(--os9-font-sans)] text-[10px] leading-normal",
          "placeholder:text-os9-gray-600",
          "border border-os9-black",
          "px-[5px] py-[3px]",
          "outline-none",
          "shadow-[inset_1px_1px_0_var(--os9-gray-700),inset_-1px_-1px_0_var(--os9-white)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroCommandList                                                   */
/* ------------------------------------------------------------------ */

function RetroCommandList({
  className,
  children,
  ref,
  ...props
}: WithClassName<React.ComponentProps<typeof CommandListPrimitive>>) {
  const glideRef = useGlide(ref)
  return (
    <CommandListPrimitive
      ref={glideRef}
      className={cn(
        "os9-command relative max-h-[300px] overflow-y-auto overflow-x-hidden p-1",
        className
      )}
      {...props}
    >
      <style href="os9-command" precedence="default">
        {COMMAND_CSS}
      </style>
      <span
        aria-hidden
        data-glide-layer
        className="pointer-events-none absolute top-0 left-0 bg-os9-azul opacity-0"
      />
      {children}
    </CommandListPrimitive>
  )
}

/* ------------------------------------------------------------------ */
/*  RetroCommandEmpty                                                  */
/* ------------------------------------------------------------------ */

/* Place it next to RetroCommandList, not inside it. */
function RetroCommandEmpty({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof CommandEmptyPrimitive>>) {
  return (
    <CommandEmptyPrimitive
      className={cn(
        /* stays mounted as a live region; only takes room while empty */
        "text-center data-empty:py-6 data-loading:py-6",
        "font-[family-name:var(--os9-font-sans)] text-[10px] leading-normal",
        "text-os9-gray-700",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  RetroCommandGroup                                                  */
/* ------------------------------------------------------------------ */

const groupLabelClass = cn(
  "px-2 py-1.5 select-none",
  "font-[family-name:var(--os9-font-heading)] text-[10px] tracking-[0.42px] leading-[0.98]",
  "text-os9-gray-700"
)

function RetroCommandGroup({
  className,
  heading,
  children,
  ...props
}: WithClassName<React.ComponentProps<typeof CommandGroupPrimitive>> & {
  /** The group's label. Or put a RetroCommandGroupLabel inside. */
  heading?: React.ReactNode
}) {
  return (
    <CommandGroupPrimitive className={cn("overflow-hidden", className)} {...props}>
      {heading != null && (
        <CommandGroupLabelPrimitive className={groupLabelClass}>{heading}</CommandGroupLabelPrimitive>
      )}
      {children}
    </CommandGroupPrimitive>
  )
}

function RetroCommandGroupLabel({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof CommandGroupLabelPrimitive>>) {
  return <CommandGroupLabelPrimitive className={cn(groupLabelClass, className)} {...props} />
}

/* ------------------------------------------------------------------ */
/*  RetroCommandItem                                                   */
/* ------------------------------------------------------------------ */

type RetroCommandItemProps = WithClassName<
  Omit<React.ComponentProps<typeof CommandItemPrimitive>, "onSelect">
> & {
  /** Runs the command, with its `value` (or its text when it has none), after the blink. */
  onSelect?: (value: string) => unknown
  /** Skip the selection blink for this command. */
  noBlink?: boolean
}

function RetroCommandItem({
  className,
  value,
  onSelect,
  noBlink,
  ref,
  ...props
}: RetroCommandItemProps) {
  const node = React.useRef<HTMLDivElement | null>(null)
  const run = () => onSelect?.(value ?? node.current?.textContent?.trim() ?? "")
  return (
    <CommandItemPrimitive
      ref={useMergedRef(ref, node)}
      value={value}
      /* blink, then run; UI SDK marks the row pending until this resolves */
      onSelect={() => (noBlink ? run() : blinkThen(run))}
      className={cn(
        "group relative z-[1] flex items-center gap-2 cursor-pointer select-none",
        "h-[18px] px-2",
        "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px] leading-[0.98]",
        "text-os9-black",
        "outline-none",
        "data-highlighted:bg-os9-azul data-highlighted:text-os9-white",
        "data-disabled:text-os9-gray-600 data-disabled:pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  RetroCommandSeparator                                              */
/* ------------------------------------------------------------------ */

function RetroCommandSeparator({
  className,
  ...props
}: WithClassName<React.ComponentProps<typeof CommandSeparatorPrimitive>>) {
  return (
    <CommandSeparatorPrimitive
      className={cn("h-[2px] mx-1 my-1", "border-t border-os9-gray-700", "border-b border-b-os9-white", className)}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  RetroCommandShortcut                                               */
/* ------------------------------------------------------------------ */

/* With children, shows them as given. Without, shows the item's `shortcut`
 * formatted for the platform (⌘P on a Mac, Ctrl+P elsewhere). */
function RetroCommandShortcut({ className, children, ...props }: React.ComponentProps<"span">) {
  const classes = cn(
    "ml-auto",
    "font-[family-name:var(--os9-font-sans)] text-[9px] leading-normal",
    "text-os9-gray-700",
    "group-data-highlighted:text-os9-white",
    className
  )
  if (children != null) {
    return (
      <span className={classes} {...props}>
        {children}
      </span>
    )
  }
  return <CommandShortcutPrimitive className={classes} {...props} />
}

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export type { RetroCommandDialogProps, RetroCommandItemProps }

export {
  RetroCommand,
  RetroCommandDialog,
  RetroCommandInput,
  RetroCommandList,
  RetroCommandEmpty,
  RetroCommandGroup,
  RetroCommandGroupLabel,
  RetroCommandItem,
  RetroCommandSeparator,
  RetroCommandShortcut,
}
