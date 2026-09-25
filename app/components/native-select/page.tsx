import type { Metadata } from "next"
import {
  RetroNativeSelect,
  RetroNativeSelectOptGroup,
  RetroNativeSelectOption,
} from "@/registry/new-york/ui/retro-native-select"
import { RetroLabel } from "@/registry/new-york/ui/retro-label"
import { ComponentDocLayout } from "../_components/component-doc-layout"

const DESCRIPTION =
  "A native <select> styled as a Mac OS 9 pop-up menu button, with the raised bevel and double-arrow box. Keeps the browser's own menu, keyboard and form behaviour."

export const metadata: Metadata = {
  title: "Native Select",
  description: DESCRIPTION,
}

const USAGE = `
<RetroNativeSelect defaultValue="geneva">
  <RetroNativeSelectOption value="charcoal">Charcoal</RetroNativeSelectOption>
  <RetroNativeSelectOption value="geneva">Geneva</RetroNativeSelectOption>
</RetroNativeSelect>
`

export default function NativeSelectPage() {
  return (
    <ComponentDocLayout
      name="retro-native-select"
      title="RetroNativeSelect"
      description={DESCRIPTION}
      usage={USAGE}
    >
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Default</h2>
        <div className="flex items-center gap-3">
          <RetroLabel htmlFor="ns-font">Large System Font:</RetroLabel>
          <RetroNativeSelect id="ns-font" defaultValue="charcoal" className="w-[160px]">
            <RetroNativeSelectOption value="charcoal">Charcoal</RetroNativeSelectOption>
            <RetroNativeSelectOption value="chicago">Chicago</RetroNativeSelectOption>
            <RetroNativeSelectOption value="geneva">Geneva</RetroNativeSelectOption>
            <RetroNativeSelectOption value="sand">Sand</RetroNativeSelectOption>
            <RetroNativeSelectOption value="techno">Techno</RetroNativeSelectOption>
          </RetroNativeSelect>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Small</h2>
        <div className="flex items-center gap-3">
          <RetroLabel htmlFor="ns-size">Size:</RetroLabel>
          <RetroNativeSelect id="ns-size" size="sm" defaultValue="12" className="w-[80px]">
            {[9, 10, 12, 14, 18, 24].map((pt) => (
              <RetroNativeSelectOption key={pt} value={String(pt)}>
                {pt} pt
              </RetroNativeSelectOption>
            ))}
          </RetroNativeSelect>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Option Groups</h2>
        <RetroNativeSelect defaultValue="appleshare" className="w-[200px]" aria-label="Connect via">
          <RetroNativeSelectOptGroup label="Network">
            <RetroNativeSelectOption value="appleshare">AppleShare</RetroNativeSelectOption>
            <RetroNativeSelectOption value="appletalk">AppleTalk</RetroNativeSelectOption>
          </RetroNativeSelectOptGroup>
          <RetroNativeSelectOptGroup label="Internet">
            <RetroNativeSelectOption value="tcpip">TCP/IP</RetroNativeSelectOption>
            <RetroNativeSelectOption value="ppp">Remote Access (PPP)</RetroNativeSelectOption>
          </RetroNativeSelectOptGroup>
        </RetroNativeSelect>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Disabled</h2>
        <div className="flex items-center gap-4">
          <RetroNativeSelect disabled defaultValue="a" className="w-[160px]" aria-label="Disabled">
            <RetroNativeSelectOption value="a">Not Available</RetroNativeSelectOption>
          </RetroNativeSelect>
          <RetroNativeSelect size="sm" disabled defaultValue="a" className="w-[120px]" aria-label="Disabled small">
            <RetroNativeSelectOption value="a">Not Available</RetroNativeSelectOption>
          </RetroNativeSelect>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Invalid</h2>
        <RetroNativeSelect aria-invalid defaultValue="" className="w-[200px]" aria-label="Printer">
          <RetroNativeSelectOption value="" disabled>
            Choose a printer…
          </RetroNativeSelectOption>
          <RetroNativeSelectOption value="laserwriter">LaserWriter 8</RetroNativeSelectOption>
          <RetroNativeSelectOption value="stylewriter">StyleWriter</RetroNativeSelectOption>
        </RetroNativeSelect>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        <code className="font-mono">className</code> is applied to the wrapper,
        so width utilities size the whole pop-up button. Use{" "}
        <code className="font-mono">RetroSelect</code> when you need a fully
        custom OS9 menu instead of the platform one.
      </p>
    </ComponentDocLayout>
  )
}
