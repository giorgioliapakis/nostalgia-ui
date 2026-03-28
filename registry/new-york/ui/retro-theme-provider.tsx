"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  OS9 Design Tokens                                                  */
/* ------------------------------------------------------------------ */

const os9Tokens: Record<string, string> = {
  /* Primary colors */
  "--os9-black": "#262626",
  "--os9-white": "#ffffff",

  /* Gray scale */
  "--os9-gray-200": "#eeeeee",
  "--os9-gray-300": "#dddddd",
  "--os9-gray-400": "#cccccc",
  "--os9-gray-500": "#bbbbbb",
  "--os9-gray-600": "#999999",
  "--os9-gray-700": "#808080",
  "--os9-gray-800": "#666666",

  /* Accent colors */
  "--os9-azul": "#333399",
  "--os9-lavender": "#ccccff",
  "--os9-focus": "#6666cc",

  /* Typography */
  "--font-heading": '"Charcoal", "ChicagoFLF", "Geneva", "Arial", sans-serif',
  "--font-sans": '"Geneva", "Verdana", "Helvetica Neue", sans-serif',
  "--font-mono": '"Monaco", "Courier New", monospace',

  /* Bevel shadow tokens */
  "--os9-shadow-raised":
    "inset 1px 1px 0 var(--os9-white), inset -1px -1px 0 var(--os9-gray-700)",
  "--os9-shadow-pressed":
    "inset 1px 1px 0 var(--os9-gray-700), inset -1px -1px 0 var(--os9-white)",
  "--os9-shadow-inset":
    "inset 1px 1px 0 var(--os9-gray-700), inset -1px -1px 0 var(--os9-white)",
  "--os9-shadow-window":
    "2px 2px 0 var(--os9-black), inset 2px 2px 0 rgba(255,255,255,0.6), inset -2px -2px 0 rgba(38,38,38,0.4)",
}

/* ------------------------------------------------------------------ */
/*  OS9 Utility Classes (injected via <style>)                         */
/* ------------------------------------------------------------------ */

const os9UtilityCSS = `
.os9-raised {
  border: 1px solid var(--os9-black);
  background-color: var(--os9-gray-300);
  box-shadow: inset 1px 1px 0 var(--os9-white), inset -1px -1px 0 var(--os9-gray-700);
}
.os9-pressed {
  border: 1px solid var(--os9-black);
  background-color: var(--os9-gray-700);
  box-shadow: inset 1px 1px 0 var(--os9-gray-700), inset -1px -1px 0 var(--os9-white);
}
.os9-inset {
  border: 1px solid var(--os9-black);
  background-color: var(--os9-white);
  box-shadow: inset 1px 1px 0 var(--os9-gray-700), inset -1px -1px 0 var(--os9-white);
}
.os9-window {
  border: 1px solid var(--os9-black);
  background-color: var(--os9-gray-200);
  box-shadow: 2px 2px 0 var(--os9-black), inset 2px 2px 0 rgba(255,255,255,0.6), inset -2px -2px 0 rgba(38,38,38,0.4);
}
.os9-stripes {
  background-image: repeating-linear-gradient(to bottom, transparent, transparent 1px, var(--os9-gray-600) 1px, var(--os9-gray-600) 2px);
  background-color: var(--os9-gray-300);
}
.os9-focus-ring {
  outline: none;
  box-shadow: 0 0 0 2px var(--os9-focus);
}
.os9-heading {
  font-family: var(--font-heading);
  letter-spacing: 0.42px;
  line-height: 0.98;
}
`.trim()

/* ------------------------------------------------------------------ */
/*  Theme type (extensible for future variants)                        */
/* ------------------------------------------------------------------ */

type NostalgiaTheme = "classic"

interface NostalgiaProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Theme variant. Currently only "classic" is supported. */
  theme?: NostalgiaTheme
}

/* ------------------------------------------------------------------ */
/*  NostalgiaProvider                                                   */
/* ------------------------------------------------------------------ */

const NostalgiaProvider = React.forwardRef<HTMLDivElement, NostalgiaProviderProps>(
  function NostalgiaProvider({ className, theme = "classic", children, ...props }, ref) {
    /* Build the inline style object from the token map */
    const tokenStyles = React.useMemo(() => {
      const styles: Record<string, string> = {}
      for (const [key, value] of Object.entries(os9Tokens)) {
        styles[key] = value
      }
      return styles
    }, [])

    return (
      <>
        {/* Inject utility classes so consumers don't need globals.css */}
        <style
          dangerouslySetInnerHTML={{ __html: os9UtilityCSS }}
          data-nostalgia-ui
        />

        <div
          ref={ref}
          className={cn("font-[family-name:var(--font-sans)] text-[10px]", className)}
          style={tokenStyles as React.CSSProperties}
          data-nostalgia-theme={theme}
          {...props}
        >
          {children}
        </div>
      </>
    )
  }
)
NostalgiaProvider.displayName = "NostalgiaProvider"

export { NostalgiaProvider }
export type { NostalgiaTheme, NostalgiaProviderProps }
