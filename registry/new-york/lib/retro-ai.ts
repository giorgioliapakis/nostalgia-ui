/*
 * retro-ai: the shared message shapes for nostalgia-ui's AI components.
 *
 * They match the Vercel AI SDK's UIMessage parts structurally, so messages
 * from `useChat` render as-is, but nothing here imports the AI SDK: the
 * components are presentation-only and work with any data source.
 */

export type RetroChatRole = "user" | "assistant" | "system"

/** Lifecycle of a streamed text or reasoning part. */
export type RetroPartState = "streaming" | "done"

export interface RetroTextPart {
  type: "text"
  text: string
  state?: RetroPartState
}

export interface RetroReasoningPart {
  type: "reasoning"
  text: string
  state?: RetroPartState
}

export interface RetroFilePart {
  type: "file"
  mediaType: string
  url: string
  filename?: string
}

/** Where a tool call is in its life, as the AI SDK names it. */
export type RetroToolState =
  | "input-streaming"
  | "input-available"
  | "approval-requested"
  | "approval-responded"
  | "output-available"
  | "output-error"
  | "output-denied"

export interface RetroToolPart {
  /** `tool-<name>`, e.g. `tool-searchFiles`, or `dynamic-tool` with `toolName`. */
  type: `tool-${string}` | "dynamic-tool"
  toolName?: string
  toolCallId: string
  state: RetroToolState
  input?: unknown
  output?: unknown
  errorText?: string
  approval?: { id: string; approved?: boolean; reason?: string }
}

export type RetroMessagePart = RetroTextPart | RetroReasoningPart | RetroFilePart | RetroToolPart

export interface RetroChatMessage {
  id: string
  role: RetroChatRole
  parts: RetroMessagePart[]
}

/** Chat status, as `useChat` reports it. */
export type RetroChatStatus = "ready" | "submitted" | "streaming" | "error"

export function isToolPart(part: RetroMessagePart): part is RetroToolPart {
  return part.type === "dynamic-tool" || part.type.startsWith("tool-")
}

/** `tool-searchFiles` → `searchFiles`. */
export function toolNameOf(part: RetroToolPart): string {
  return part.type === "dynamic-tool" ? (part.toolName ?? "tool") : part.type.slice(5)
}

/** All the text in a message, for copy actions. */
export function messageText(message: RetroChatMessage): string {
  return message.parts
    .filter((p): p is RetroTextPart => p.type === "text")
    .map((p) => p.text)
    .join("\n\n")
}
