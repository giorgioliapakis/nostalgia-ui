import { ImageResponse } from "next/og"

export const alt = "nostalgia-ui — Mac OS 9 components for React"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const BLACK = "#262626"
const WHITE = "#ffffff"
const GRAY_200 = "#eeeeee"
const GRAY_300 = "#dddddd"
const GRAY_700 = "#808080"
const AZUL = "#333399"

/** Horizontal pinstripes used in the OS9 active title bar. */
function Stripes() {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 4 }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            height: 2,
            backgroundColor: GRAY_700,
            borderBottom: `2px solid ${WHITE}`,
          }}
        />
      ))}
    </div>
  )
}

function CloseBox() {
  return (
    <div
      style={{
        display: "flex",
        width: 30,
        height: 30,
        backgroundColor: GRAY_300,
        border: `2px solid ${BLACK}`,
        borderTopColor: GRAY_700,
        borderLeftColor: GRAY_700,
      }}
    />
  )
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: GRAY_200,
          backgroundImage: `radial-gradient(circle, #cccccc 2px, transparent 2px)`,
          backgroundSize: "16px 16px",
        }}
      >
        {/* Window */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 940,
            backgroundColor: GRAY_300,
            border: `3px solid ${BLACK}`,
            boxShadow: `8px 8px 0 ${GRAY_700}`,
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              height: 60,
              padding: "0 16px",
              borderBottom: `3px solid ${BLACK}`,
              backgroundColor: GRAY_300,
            }}
          >
            <CloseBox />
            <Stripes />
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 700,
                color: BLACK,
                padding: "0 12px",
              }}
            >
              nostalgia-ui
            </div>
            <Stripes />
            <CloseBox />
          </div>

          {/* Body */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 28,
              margin: 20,
              padding: "48px 56px",
              backgroundColor: WHITE,
              border: `2px solid ${BLACK}`,
              borderTopColor: GRAY_700,
              borderLeftColor: GRAY_700,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 96,
                fontWeight: 700,
                color: BLACK,
                letterSpacing: -2,
              }}
            >
              nostalgia-ui
            </div>
            <div style={{ display: "flex", fontSize: 36, color: BLACK }}>
              Mac OS 9 components for React + shadcn
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
              <div
                style={{
                  display: "flex",
                  padding: "12px 28px",
                  fontSize: 26,
                  color: WHITE,
                  backgroundColor: AZUL,
                  border: `3px solid ${BLACK}`,
                }}
              >
                Tailwind v4
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "12px 28px",
                  fontSize: 26,
                  color: BLACK,
                  backgroundColor: GRAY_300,
                  border: `3px solid ${BLACK}`,
                }}
              >
                Radix UI
              </div>
              <div
                style={{
                  display: "flex",
                  padding: "12px 28px",
                  fontSize: 26,
                  color: BLACK,
                  backgroundColor: GRAY_300,
                  border: `3px solid ${BLACK}`,
                }}
              >
                Zero images
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  )
}
