"use client"

import * as React from "react"

import { LoginBlock, type LoginUser } from "@/registry/new-york/blocks/login"
import { RetroIconApplication } from "@/registry/new-york/ui/retro-icons"

const USERS: LoginUser[] = [
  { id: "owner", name: "Giorgio" },
  { id: "susan", name: "Susan" },
  { id: "steve", name: "Steve" },
  { id: "kids", name: "Kids", icon: <RetroIconApplication /> },
  { id: "guest", name: "Guest", requiresPassword: false },
]

export function LoginDemo() {
  const [status, setStatus] = React.useState<string | null>(null)

  return (
    <div className="flex flex-col items-center gap-3">
      <LoginBlock
        users={USERS}
        computerName="Giorgio’s Mac"
        onLogin={async (user, password) => {
          await new Promise((r) => setTimeout(r, 400))
          if (user.requiresPassword !== false && password !== "macos9") {
            setStatus(null)
            return false
          }
          setStatus(`Logged in as ${user.name}.`)
        }}
      />
      <p
        aria-live="polite"
        className="font-[family-name:var(--font-sans)] text-[10px] text-os9-black"
      >
        {status ?? "Hint: the password is “macos9”. Guest needs none."}
      </p>
    </div>
  )
}
