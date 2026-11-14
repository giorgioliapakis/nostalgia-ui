import type { Metadata } from "next"

import { BlockDocLayout } from "../_components/block-doc-layout"
import { AiChatDemo } from "./demo"

const description =
  "A Mac OS 9 chat window for an AI assistant: streaming replies behind an insertion caret, the watch while it thinks, tool calls with Show Details, approval alerts, suggested prompts and a model picker. Drive it from the AI SDK's useChat, or leave the messages out to run a scripted demo."

export const metadata: Metadata = {
  title: "AI Chat",
  description,
}

const USAGE = `"use client"
import { useChat } from "@ai-sdk/react"
import { AiChatBlock } from "@/components/ai-chat"

export function Chat() {
  const { messages, status, sendMessage, stop, addToolApprovalResponse } = useChat()
  return (
    <AiChatBlock
      messages={messages}
      status={status}
      onSubmit={(text) => sendMessage({ text })}
      onStop={stop}
      onToolApproval={(part, approved) =>
        addToolApprovalResponse({ id: part.approval!.id, approved })
      }
    />
  )
}`

export default function AiChatPage() {
  return (
    <BlockDocLayout name="ai-chat" title="AI Chat" description={description} exportName="AiChatBlock">
      <AiChatDemo />
      <section className="mt-8 max-w-[720px]">
        <h2 className="os9-heading mb-2 text-[12px]">With the AI SDK</h2>
        <p className="mb-2 font-[family-name:var(--os9-font-sans)] text-[10px] leading-[1.5] text-os9-gray-700">
          Messages use the AI SDK&apos;s part shapes (text, reasoning, tool calls), so useChat plugs straight in.
          Try the demo: ask it to tidy your desktop, write a Read Me, or why your Mac is slow.
        </p>
        <pre className="overflow-x-auto border border-os9-black bg-os9-white p-3 font-[family-name:var(--os9-font-mono)] text-[10px] leading-[1.6] text-os9-black">
          {USAGE}
        </pre>
      </section>
    </BlockDocLayout>
  )
}
