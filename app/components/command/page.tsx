"use client"

import {
  RetroCommand,
  RetroCommandInput,
  RetroCommandList,
  RetroCommandEmpty,
  RetroCommandGroup,
  RetroCommandItem,
  RetroCommandSeparator,
  RetroCommandShortcut,
} from "@/registry/new-york/ui/retro-command"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function CommandPreview() {
  return (
    <ComponentDocLayout
      name="retro-command"
      title="RetroCommand"
      description="A command palette and search interface with Mac OS 9 styling, keyboard navigation, and shortcuts."
    >
      <p className="text-os9-gray-700 text-[10px] mb-6">
        A command palette / search interface styled for OS9. Built on cmdk.
        Supports keyboard navigation, grouped items, shortcuts, and filtering.
      </p>

      {/* Full command palette */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Command Palette</h2>
        <div className="w-[400px]">
          <RetroCommand>
            <RetroCommandInput placeholder="Type a command or search..." />
            <RetroCommandList>
              <RetroCommandEmpty>No results found.</RetroCommandEmpty>

              <RetroCommandGroup heading="File">
                <RetroCommandItem>
                  New Folder
                  <RetroCommandShortcut>&#8984;N</RetroCommandShortcut>
                </RetroCommandItem>
                <RetroCommandItem>
                  Open...
                  <RetroCommandShortcut>&#8984;O</RetroCommandShortcut>
                </RetroCommandItem>
                <RetroCommandItem>
                  Get Info
                  <RetroCommandShortcut>&#8984;I</RetroCommandShortcut>
                </RetroCommandItem>
                <RetroCommandItem>
                  Close Window
                  <RetroCommandShortcut>&#8984;W</RetroCommandShortcut>
                </RetroCommandItem>
              </RetroCommandGroup>

              <RetroCommandSeparator />

              <RetroCommandGroup heading="Edit">
                <RetroCommandItem>
                  Undo
                  <RetroCommandShortcut>&#8984;Z</RetroCommandShortcut>
                </RetroCommandItem>
                <RetroCommandItem>
                  Cut
                  <RetroCommandShortcut>&#8984;X</RetroCommandShortcut>
                </RetroCommandItem>
                <RetroCommandItem>
                  Copy
                  <RetroCommandShortcut>&#8984;C</RetroCommandShortcut>
                </RetroCommandItem>
                <RetroCommandItem>
                  Paste
                  <RetroCommandShortcut>&#8984;V</RetroCommandShortcut>
                </RetroCommandItem>
              </RetroCommandGroup>

              <RetroCommandSeparator />

              <RetroCommandGroup heading="Special">
                <RetroCommandItem>Empty Trash...</RetroCommandItem>
                <RetroCommandItem>Restart</RetroCommandItem>
                <RetroCommandItem>Shut Down</RetroCommandItem>
              </RetroCommandGroup>
            </RetroCommandList>
          </RetroCommand>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Type in the search field to filter commands. Use arrow keys to navigate
        and Enter to select. Keyboard shortcuts are displayed on the right.
      </p>
    </ComponentDocLayout>
  )
}
