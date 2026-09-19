// Generates the nostalgia-ui favicon from a single pixel-art source of truth.
// Draws an OS 9 window (pinstriped title bar, close box, selected row) and
// emits app/icon.svg, app/favicon.ico (16+32) and app/apple-icon.png (180).
// Run with: node scripts/generate-favicon.mjs
import { deflateSync } from "node:zlib"
import { writeFileSync } from "node:fs"

const K = "#262626" // os9-black
const W = "#ffffff" // os9-white
const L = "#dddddd" // os9-gray-300
const G = "#999999" // os9-gray-600
const A = "#333399" // os9-azul

function grid(size) {
  const px = Array.from({ length: size }, () => Array(size).fill(null))
  const fill = (x, y, w, h, color) => {
    for (let j = y; j < y + h; j++) {
      for (let i = x; i < x + w; i++) {
        if (i >= 0 && j >= 0 && i < size && j < size) px[j][i] = color
      }
    }
  }
  const box = (x, y, w, h, border, inner) => {
    fill(x, y, w, h, border)
    if (inner) fill(x + 1, y + 1, w - 2, h - 2, inner)
  }
  return { px, fill, box }
}

// 32x32 artwork
function draw32() {
  const { px, fill, box } = grid(32)
  fill(4, 6, 26, 24, K) // drop shadow (OS9 windows cast a hard 2px shadow)
  box(2, 4, 26, 24, K, L) // window frame
  for (const y of [6, 8, 10]) fill(3, y, 24, 1, G) // title bar pinstripes
  fill(3, 5, 8, 8, L) // clear stripes behind the close box
  box(4, 6, 5, 5, K, L) // close box
  fill(3, 13, 24, 1, K) // title bar separator
  fill(3, 14, 24, 13, W) // content area
  fill(5, 16, 20, 3, A) // selected row
  fill(5, 21, 20, 1, G) // text lines
  fill(5, 24, 16, 1, G)
  return px
}

// 16x16 artwork, hand-tuned (downscaling 32px loses the 1px details)
function draw16() {
  const { px, fill, box } = grid(16)
  fill(2, 3, 14, 13, K) // drop shadow
  box(1, 2, 14, 13, K, L) // window frame
  for (const y of [4, 6]) fill(2, y, 12, 1, G) // pinstripes
  fill(2, 3, 5, 5, L) // clear behind close box
  box(2, 3, 4, 4, K, L) // close box
  fill(2, 8, 12, 1, K) // separator
  fill(2, 9, 12, 5, W) // content area
  fill(3, 10, 10, 2, A) // selected row
  fill(3, 13, 8, 1, G) // text line
  return px
}

// ---- PNG encoding -----------------------------------------------------------
const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})
const crc32 = (buf) => {
  let c = 0xffffffff
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
const chunk = (type, data) => {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, "ascii"), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}
const rgba = (hex) =>
  hex === null
    ? [0, 0, 0, 0]
    : [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16), 255]

function toPng(px, scale = 1) {
  const size = px.length * scale
  const raw = Buffer.alloc(size * (size * 4 + 1))
  let o = 0
  for (let y = 0; y < size; y++) {
    raw[o++] = 0 // filter: none
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = rgba(px[(y / scale) | 0][(x / scale) | 0])
      raw[o++] = r
      raw[o++] = g
      raw[o++] = b
      raw[o++] = a
    }
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ])
}

// ---- ICO encoding (PNG-compressed entries) ----------------------------------
function toIco(images) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(images.length, 4)
  let offset = 6 + images.length * 16
  const dir = []
  for (const { size, png } of images) {
    const e = Buffer.alloc(16)
    e[0] = size === 256 ? 0 : size
    e[1] = size === 256 ? 0 : size
    e[4] = 1 // color planes
    e[6] = 32 // bits per pixel
    e.writeUInt32LE(png.length, 8)
    e.writeUInt32LE(offset, 12)
    dir.push(e)
    offset += png.length
  }
  return Buffer.concat([header, ...dir, ...images.map((i) => i.png)])
}

// ---- SVG (run-length encoded rows, keeps the pixel grid crisp at any size) ---
function toSvg(px) {
  const size = px.length
  const rects = []
  for (let y = 0; y < size; y++) {
    let x = 0
    while (x < size) {
      const color = px[y][x]
      let run = 1
      while (x + run < size && px[y][x + run] === color) run++
      if (color) rects.push(`<rect x="${x}" y="${y}" width="${run}" height="1" fill="${color}"/>`)
      x += run
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges">\n${rects.join("\n")}\n</svg>\n`
}

const px32 = draw32()
const px16 = draw16()

writeFileSync("app/icon.svg", toSvg(px32))
writeFileSync(
  "app/favicon.ico",
  toIco([
    { size: 16, png: toPng(px16) },
    { size: 32, png: toPng(px32) },
  ])
)
// Apple touch icons are composited on a solid tile, so give this one an opaque
// desktop-gray background and a 2px margin: 36 * 5 = 180x180.
const appleGrid = grid(36)
appleGrid.fill(0, 0, 36, 36, "#cccccc")
for (let y = 0; y < 32; y++) {
  for (let x = 0; x < 32; x++) {
    if (px32[y][x]) appleGrid.px[y + 2][x + 2] = px32[y][x]
  }
}
writeFileSync("app/apple-icon.png", toPng(appleGrid.px, 5))

console.log("wrote app/icon.svg, app/favicon.ico, app/apple-icon.png")
