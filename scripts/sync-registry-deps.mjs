#!/usr/bin/env node
/*
 * Rebuilds every registry.json item's `dependencies` (npm) and
 * `registryDependencies` (other items) from the imports in its files, so
 * they can't drift from the code.
 *
 *   node scripts/sync-registry-deps.mjs          # write registry.json
 *   node scripts/sync-registry-deps.mjs --check  # exit 1 if it would change
 *
 * npm versions come from package.json when they're pinned there exactly
 * (UI SDK is a beta, so installs must get the version we test against);
 * other packages are left unversioned, as before.
 */
import fs from "node:fs"

const BASE = "https://nostalgia-ui.com/r"
const THEME = `${BASE}/nostalgia-theme.json`
const check = process.argv.includes("--check")

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"))
const versions = { ...pkg.dependencies, ...pkg.devDependencies }
/* packages every consumer already has, or that ship inside another */
const IGNORE = new Set(["react", "react-dom", "next", "clsx", "tailwind-merge"])

const registry = JSON.parse(fs.readFileSync("registry.json", "utf8"))
const fileToItem = new Map()
for (const item of registry.items)
  for (const f of item.files ?? []) fileToItem.set(f.path.replace(/\.(tsx?|css)$/, ""), item.name)

const importRe = /(?:import|export)\s[^"']*?from\s+["']([^"']+)["']|import\s+["']([^"']+)["']/g

function pkgName(spec) {
  const parts = spec.split("/")
  return spec.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0]
}

let changed = 0
for (const item of registry.items) {
  if (!item.files?.length) continue
  const npm = new Set()
  const reg = new Set()
  for (const f of item.files) {
    const src = fs.readFileSync(f.path, "utf8")
    for (const m of src.matchAll(importRe)) {
      const spec = m[1] ?? m[2]
      if (spec.startsWith("@/registry/")) {
        const target = fileToItem.get(spec.replace(/^@\//, ""))
        if (!target) throw new Error(`${item.name}: ${spec} isn't a registry file`)
        if (target !== item.name) reg.add(`${BASE}/${target}.json`)
      } else if (spec.startsWith("@/") || spec.startsWith(".")) {
        continue // @/lib/utils comes with shadcn init
      } else {
        const name = pkgName(spec)
        if (IGNORE.has(name)) continue
        const v = versions[name]
        npm.add(v && /^\d/.test(v) ? `${name}@${v}` : name)
      }
    }
  }
  /* @ui-sdk/core is a peer of @ui-sdk/react: one shared copy must be installed */
  const sdk = [...npm].find((d) => d.startsWith("@ui-sdk/react"))
  if (sdk) {
    const v = versions["@ui-sdk/core"]
    npm.add(v && /^\d/.test(v) ? `@ui-sdk/core@${v}` : "@ui-sdk/core")
  }
  if (item.type !== "registry:theme") reg.add(THEME)
  const next = {
    dependencies: [...npm].sort(),
    registryDependencies: [...reg].sort((a, b) => (a === THEME ? -1 : b === THEME ? 1 : a.localeCompare(b))),
  }
  for (const key of ["dependencies", "registryDependencies"]) {
    const before = JSON.stringify(item[key] ?? [])
    if (before !== JSON.stringify(next[key])) {
      changed++
      if (next[key].length) item[key] = next[key]
      else delete item[key]
    }
  }
}

if (check) {
  if (changed) {
    console.error(`registry.json deps are stale (${changed} fields). Run node scripts/sync-registry-deps.mjs`)
    process.exit(1)
  }
  console.log("registry.json deps are in sync")
} else {
  fs.writeFileSync("registry.json", JSON.stringify(registry, null, 2) + "\n")
  console.log(`updated ${changed} fields`)
}
