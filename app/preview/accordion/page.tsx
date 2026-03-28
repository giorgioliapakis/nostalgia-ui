import {
  RetroAccordion,
  RetroAccordionItem,
  RetroAccordionTrigger,
  RetroAccordionContent,
} from "@/registry/new-york/ui/retro-accordion"

export default function AccordionPreview() {
  return (
    <main className="min-h-screen p-8 space-y-10">
      <h1 className="font-[family-name:var(--font-heading)] text-[14px] tracking-[0.42px]">
        retro-accordion
      </h1>

      {/* ---- Single-expand accordion ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          Single
        </h2>

        <RetroAccordion type="single" collapsible className="w-[400px]">
          <RetroAccordionItem value="general">
            <RetroAccordionTrigger>General Information</RetroAccordionTrigger>
            <RetroAccordionContent>
              This Macintosh computer is configured for a single user. To change
              your network identity, open the TCP/IP control panel.
            </RetroAccordionContent>
          </RetroAccordionItem>

          <RetroAccordionItem value="memory">
            <RetroAccordionTrigger>Memory</RetroAccordionTrigger>
            <RetroAccordionContent>
              Built-in Memory: 128 MB. Virtual Memory is currently turned on,
              using the startup disk &quot;Macintosh HD&quot;. RAM Disk is off.
            </RetroAccordionContent>
          </RetroAccordionItem>

          <RetroAccordionItem value="extensions">
            <RetroAccordionTrigger>Extensions Manager</RetroAccordionTrigger>
            <RetroAccordionContent>
              42 extensions are currently enabled. To disable an extension,
              uncheck it and restart. Hold the spacebar at startup to open
              Extensions Manager.
            </RetroAccordionContent>
          </RetroAccordionItem>
        </RetroAccordion>
      </section>

      {/* ---- Multiple-expand accordion ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          Multiple
        </h2>

        <RetroAccordion type="multiple" className="w-[400px]">
          <RetroAccordionItem value="appearance">
            <RetroAccordionTrigger>Appearance</RetroAccordionTrigger>
            <RetroAccordionContent>
              Highlight Color: Purple. System Font: Charcoal 12. Large System
              Font: Charcoal 14. Views Font: Geneva 10.
            </RetroAccordionContent>
          </RetroAccordionItem>

          <RetroAccordionItem value="sound">
            <RetroAccordionTrigger>Sound</RetroAccordionTrigger>
            <RetroAccordionContent>
              Alert Sound: Quack. Alert Volume: 5. Output: Built-in. Input:
              Built-in microphone.
            </RetroAccordionContent>
          </RetroAccordionItem>

          <RetroAccordionItem value="datetime">
            <RetroAccordionTrigger>Date &amp; Time</RetroAccordionTrigger>
            <RetroAccordionContent>
              Current Date: Sat, Mar 28, 2026. Time Zone: Eastern Standard Time.
              Menu bar clock is displayed.
            </RetroAccordionContent>
          </RetroAccordionItem>
        </RetroAccordion>
      </section>
    </main>
  )
}
