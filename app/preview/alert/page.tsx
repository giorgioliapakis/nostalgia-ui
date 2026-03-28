import {
  RetroAlert,
  RetroAlertTitle,
  RetroAlertDescription,
} from "@/registry/new-york/ui/retro-alert"

function InfoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
    >
      <rect x="1" y="1" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1" />
      <rect x="7" y="7" width="2" height="5" fill="currentColor" />
      <rect x="7" y="4" width="2" height="2" fill="currentColor" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M8 1L15 14H1L8 1Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <rect x="7" y="6" width="2" height="4" fill="currentColor" />
      <rect x="7" y="11" width="2" height="2" fill="currentColor" />
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="4" y="7" width="8" height="2" fill="currentColor" />
    </svg>
  )
}

export default function AlertPreview() {
  return (
    <main className="min-h-screen bg-os9-gray-200 p-8">
      <h1 className="os9-heading text-[18px] mb-8">RetroAlert Preview</h1>

      {/* Default variant */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Default Variant</h2>
        <div className="max-w-[400px]">
          <RetroAlert>
            <div className="flex items-start gap-[8px]">
              <InfoIcon />
              <div>
                <RetroAlertTitle>System Notice</RetroAlertTitle>
                <RetroAlertDescription>
                  Your preferences have been saved to the System Folder.
                </RetroAlertDescription>
              </div>
            </div>
          </RetroAlert>
        </div>
      </section>

      {/* Warning variant */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Warning Variant</h2>
        <div className="max-w-[400px]">
          <RetroAlert variant="warning">
            <div className="flex items-start gap-[8px]">
              <WarningIcon />
              <div>
                <RetroAlertTitle>Low Disk Space</RetroAlertTitle>
                <RetroAlertDescription>
                  Your startup disk is almost full. You need to make more space
                  available on your startup disk by deleting files.
                </RetroAlertDescription>
              </div>
            </div>
          </RetroAlert>
        </div>
      </section>

      {/* Destructive variant */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Destructive Variant</h2>
        <div className="max-w-[400px]">
          <RetroAlert variant="destructive">
            <div className="flex items-start gap-[8px]">
              <ErrorIcon />
              <div>
                <RetroAlertTitle>Application Error</RetroAlertTitle>
                <RetroAlertDescription>
                  The application &quot;SimpleText&quot; has unexpectedly quit.
                  An error of type 2 occurred.
                </RetroAlertDescription>
              </div>
            </div>
          </RetroAlert>
        </div>
      </section>

      {/* All variants comparison */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">All Variants</h2>
        <div className="flex flex-col gap-4 max-w-[400px]">
          <RetroAlert>
            <div className="flex items-start gap-[8px]">
              <InfoIcon />
              <div>
                <RetroAlertTitle>Default</RetroAlertTitle>
                <RetroAlertDescription>
                  A standard informational alert message.
                </RetroAlertDescription>
              </div>
            </div>
          </RetroAlert>
          <RetroAlert variant="warning">
            <div className="flex items-start gap-[8px]">
              <WarningIcon />
              <div>
                <RetroAlertTitle>Warning</RetroAlertTitle>
                <RetroAlertDescription>
                  A cautionary alert that requires attention.
                </RetroAlertDescription>
              </div>
            </div>
          </RetroAlert>
          <RetroAlert variant="destructive">
            <div className="flex items-start gap-[8px]">
              <ErrorIcon />
              <div>
                <RetroAlertTitle>Destructive</RetroAlertTitle>
                <RetroAlertDescription>
                  A critical error alert indicating a problem.
                </RetroAlertDescription>
              </div>
            </div>
          </RetroAlert>
        </div>
      </section>
    </main>
  )
}
