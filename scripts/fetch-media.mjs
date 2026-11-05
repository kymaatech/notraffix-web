// Downloads any photo/video listed in lib/media.ts that isn't in public/media yet.
// Runs automatically before `npm run dev` and `npm run build`. Safe to re-run.
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "media");
const source = await readFile(join(root, "lib", "media.ts"), "utf8");

// Resolve the px(id) helper and literal URLs from the manifest.
const items = [];
for (const line of source.split("\n")) {
  const file = line.match(/file:\s*"([^"]+)"/)?.[1];
  if (!file) continue;
  let src = line.match(/src:\s*"([^"]+)"/)?.[1];
  const id = line.match(/src:\s*px\((\d+)/)?.[1];
  if (!src && id) src = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2000`;
  if (src) items.push({ file, src });
}

await mkdir(outDir, { recursive: true });
let fetched = 0;
for (const { file, src } of items) {
  const dest = join(outDir, file);
  try {
    if ((await stat(dest)).size > 1000) continue;
  } catch {}
  process.stdout.write(`  media  ${file} … `);
  try {
    const res = await fetch(src, { headers: { "User-Agent": "Mozilla/5.0 (notraffix-web media fetch)" }, redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    fetched++;
    console.log("ok");
  } catch (e) {
    console.log(`failed (${e.message}) — the page will show the colour fallback`);
  }
}
console.log(fetched ? `  media  ${fetched} file(s) downloaded to public/media` : "  media  all files present");
