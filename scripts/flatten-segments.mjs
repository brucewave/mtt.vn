/**
 * Works around a Windows-only bug in Next's static export.
 *
 * The client router prefetches each route's segment payload from a flat file:
 *
 *   /san-pham/__next.san-pham.__PAGE__.txt
 *
 * The exporter builds that name with
 * `segmentPath.replace(/\//g, '.')` (next/dist/shared/lib/segment-cache/
 * segment-value-encoding.js), but feeds it a path that came from
 * `path.relative` — which on Windows uses backslashes. They survive the
 * replace, and `path.join` then reads them as directory separators, so the
 * payload lands at
 *
 *   /san-pham/__next.san-pham/__PAGE__.txt
 *
 * and every prefetch 404s. Navigation still works — it falls back to a full
 * page load — but the whole point of the payloads is lost.
 *
 * On Linux (the cPanel server, CI, Vercel) the paths are already flat and this
 * script finds nothing to do. Running it keeps a Windows build byte-comparable
 * with a server build.
 */
import { readdir, rename, rm, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const OUT = path.join(process.cwd(), 'out')

/** Every file inside `dir`, as paths relative to it. */
async function filesUnder(dir, prefix = '') {
  const found = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name
    if (entry.isDirectory()) found.push(...(await filesUnder(path.join(dir, entry.name), rel)))
    else found.push(rel)
  }
  return found
}

let moved = 0

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue

    const full = path.join(dir, entry.name)

    // A `__next.…` *directory* is the bug; a `__next.….txt` file is correct.
    if (entry.name.startsWith('__next')) {
      for (const rel of await filesUnder(full)) {
        await rename(full + '/' + rel, path.join(dir, `${entry.name}.${rel.replace(/\//g, '.')}`))
        moved++
      }
      await rm(full, { recursive: true, force: true })
      continue
    }

    await walk(full)
  }
}

if (!existsSync(OUT) || !(await stat(OUT)).isDirectory()) {
  console.log('flatten-segments: no out/ — nothing to do')
} else {
  await walk(OUT)
  console.log(
    moved ? `flatten-segments: flattened ${moved} segment payloads` : 'flatten-segments: nothing to flatten',
  )
}
