"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { RetroButton } from "@/registry/new-york/ui/retro-button"
import { RetroIconFinder, RetroIconUser } from "@/registry/new-york/ui/retro-icons"
import { RetroInput } from "@/registry/new-york/ui/retro-input"
import { RetroLabel } from "@/registry/new-york/ui/retro-label"
import { RetroWindow } from "@/registry/new-york/ui/retro-window"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface LoginUser {
  id: string
  name: string
  /** Custom 32px icon. Defaults to the RetroIconUser portrait. */
  icon?: React.ReactNode
  /** Set to false for accounts without a password (e.g. Guest). Defaults to true. */
  requiresPassword?: boolean
}

/**
 * Return `false` (or a Promise resolving to `false`) to reject the password;
 * the block then shows an error and clears the field.
 */
type LoginHandler = (
  user: LoginUser,
  password: string
) => void | boolean | Promise<void | boolean>

interface LoginBlockProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RetroWindow>, "children" | "title" | "onSubmit"> {
  users: LoginUser[]
  onLogin?: LoginHandler
  /** Shown in the welcome line. Defaults to "Macintosh". */
  computerName?: string
  /** Window title. Defaults to "Welcome". */
  title?: string
  /** Initially selected user id. */
  defaultUserId?: string
  /** Error message shown when onLogin returns false. */
  errorMessage?: string
}

/* ------------------------------------------------------------------ */
/*  LoginBlock                                                         */
/* ------------------------------------------------------------------ */

const LoginBlock = React.forwardRef<HTMLDivElement, LoginBlockProps>(
  function LoginBlock(
    {
      users,
      onLogin,
      computerName = "Macintosh",
      title = "Welcome",
      defaultUserId,
      errorMessage = "The password you entered is incorrect. Please try again.",
      className,
      ...props
    },
    ref
  ) {
    const baseId = React.useId()
    const listRef = React.useRef<HTMLUListElement>(null)
    const passwordRef = React.useRef<HTMLInputElement>(null)

    const [selectedId, setSelectedId] = React.useState<string | undefined>(
      defaultUserId
    )
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState(false)
    const [pending, setPending] = React.useState(false)

    const selectedIndex = users.findIndex((u) => u.id === selectedId)
    const selected = selectedIndex >= 0 ? users[selectedIndex] : undefined
    const needsPassword = selected ? selected.requiresPassword !== false : false
    const optionId = (id: string) => `${baseId}-user-${id}`

    const select = (user: LoginUser | undefined) => {
      if (!user || user.id === selectedId) return
      setSelectedId(user.id)
      setPassword("")
      setError(false)
    }

    // Keep the active option scrolled into view (only the list, never the page)
    React.useEffect(() => {
      const list = listRef.current
      if (!list || !selectedId) return
      const el = list.querySelector<HTMLElement>(
        `[data-user-id="${CSS.escape(selectedId)}"]`
      )
      if (!el) return
      if (el.offsetTop < list.scrollTop) list.scrollTop = el.offsetTop
      else if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight)
        list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight
    }, [selectedId])

    const handleListKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
      if (users.length === 0) return
      let next: number | undefined
      switch (e.key) {
        case "ArrowDown":
          next = selectedIndex < 0 ? 0 : Math.min(users.length - 1, selectedIndex + 1)
          break
        case "ArrowUp":
          next = selectedIndex < 0 ? users.length - 1 : Math.max(0, selectedIndex - 1)
          break
        case "Home":
          next = 0
          break
        case "End":
          next = users.length - 1
          break
        case "Enter":
          if (selected) {
            e.preventDefault()
            if (needsPassword) passwordRef.current?.focus()
            else void submit()
          }
          return
        default:
          // Type-ahead: jump to the next user starting with the typed letter
          if (e.key.length === 1 && /\S/.test(e.key) && !e.metaKey && !e.ctrlKey) {
            const letter = e.key.toLowerCase()
            const start = selectedIndex + 1
            for (let i = 0; i < users.length; i++) {
              const idx = (start + i) % users.length
              if (users[idx].name.toLowerCase().startsWith(letter)) {
                next = idx
                break
              }
            }
          }
      }
      if (next !== undefined) {
        e.preventDefault()
        select(users[next])
      }
    }

    async function submit() {
      if (!selected || pending) return
      setPending(true)
      try {
        const result = await onLogin?.(selected, needsPassword ? password : "")
        if (result === false) {
          setError(true)
          setPassword("")
          passwordRef.current?.focus()
        }
      } finally {
        setPending(false)
      }
    }

    return (
      <RetroWindow
        ref={ref}
        title={title}
        className={cn("w-full max-w-[400px]", className)}
        {...props}
      >
        <form
          className="flex flex-col gap-3 p-1"
          onSubmit={(e) => {
            e.preventDefault()
            void submit()
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <RetroIconFinder size="lg" className="shrink-0" />
            <div className="min-w-0">
              <p className="os9-heading text-[12px] text-os9-black">
                Welcome to {computerName}
              </p>
              <p
                id={`${baseId}-hint`}
                className="mt-1 font-[family-name:var(--os9-font-sans)] text-[10px] leading-[1.4] text-os9-gray-800"
              >
                Select your name from the list, then click Log In.
              </p>
            </div>
          </div>

          {/* User list */}
          <ul
            ref={listRef}
            role="listbox"
            tabIndex={0}
            aria-label="Users"
            aria-describedby={`${baseId}-hint`}
            aria-activedescendant={selected ? optionId(selected.id) : undefined}
            onKeyDown={handleListKeyDown}
            className="os9-inset relative max-h-[204px] overflow-y-auto p-[2px] outline-none focus-visible:os9-focus-ring"
          >
            {users.map((user) => {
              const isSelected = user.id === selectedId
              return (
                <li
                  key={user.id}
                  id={optionId(user.id)}
                  data-user-id={user.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    select(user)
                    listRef.current?.focus()
                  }}
                  onDoubleClick={() => {
                    if (user.requiresPassword === false) void submit()
                    else passwordRef.current?.focus()
                  }}
                  className={cn(
                    "flex h-[40px] cursor-default select-none items-center gap-2 px-2",
                    "font-[family-name:var(--os9-font-heading)] text-[12px] tracking-[0.42px]",
                    isSelected
                      ? "bg-os9-azul text-os9-white"
                      : "text-os9-black hover:bg-os9-lavender"
                  )}
                >
                  <span className="flex size-8 shrink-0 items-center justify-center">
                    {user.icon ?? <RetroIconUser />}
                  </span>
                  <span className="truncate">{user.name}</span>
                </li>
              )
            })}
          </ul>

          {/* Password */}
          {selected && needsPassword && (
            <div className="flex flex-col gap-1">
              <RetroLabel htmlFor={`${baseId}-password`}>
                Password for {selected.name}:
              </RetroLabel>
              <RetroInput
                ref={passwordRef}
                id={`${baseId}-password`}
                type="password"
                autoComplete="current-password"
                value={password}
                aria-invalid={error || undefined}
                aria-describedby={error ? `${baseId}-error` : undefined}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (error) setError(false)
                }}
              />
              {error && (
                <p
                  id={`${baseId}-error`}
                  role="alert"
                  className="font-[family-name:var(--os9-font-sans)] text-[10px] font-bold text-os9-black"
                >
                  {errorMessage}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end">
            <RetroButton
              type="submit"
              isDefault
              disabled={!selected || pending}
              className="min-w-[80px]"
            >
              {pending ? "Logging In…" : "Log In"}
            </RetroButton>
          </div>
        </form>
      </RetroWindow>
    )
  }
)
LoginBlock.displayName = "LoginBlock"

export { LoginBlock }
export type { LoginBlockProps, LoginUser, LoginHandler }
