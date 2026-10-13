/*
  npm run sync            -> latest ~15 videos from the channel's public RSS feed
  npm run sync -- all.json -> EVERY video, using a yt-dlp export (see README)

  Writes src/data/synced.json. Each video gets a class (6..12) from its title
  (e.g. "৯ম শ্রেণি ...", "Class 10 ..."). Videos with no class stay in "All videos".
  Needs Node 18+ and internet access.
*/
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { classify } from "../src/data/classify.js";

const CHANNEL_ID = "UC39XFa7Q8RKjU6Ktw2FfqvQ";
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../src/data/synced.json");

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();

/* YouTube RSS feed -> [{ id, title, published }] */
export function parseRss(xml) {
  const out = [];
  for (const m of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const e = m[1];
    const id = e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = e.match(/<title>([^<]*)<\/title>/)?.[1];
    const published = e.match(/<published>([^<]+)<\/published>/)?.[1];
    if (id && title) out.push({ id, title: decode(title), published });
  }
  return out;
}

/* yt-dlp --flat-playlist -J export -> same shape */
export function parseYtDlp(json) {
  return (json.entries || [])
    .filter((e) => e && e.id && e.title)
    .map((e) => {
      const d = e.upload_date; // YYYYMMDD (not always present in flat mode)
      return {
        id: e.id,
        title: e.title,
        published: d ? `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}` : undefined,
      };
    });
}

async function main() {
  const file = process.argv[2];
  let list;
  if (file) {
    list = parseYtDlp(JSON.parse(await readFile(file, "utf8")));
    console.log(`Read ${list.length} videos from ${file}`);
  } else {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);
    if (!res.ok) throw new Error(`RSS feed -> HTTP ${res.status}`);
    list = parseRss(await res.text());
    console.log(`RSS feed: ${list.length} latest videos`);
  }
  const videos = list.map((v) => ({ ...v, classNo: classify(v.title) }));
  const per = {};
  videos.forEach((v) => (per[v.classNo ?? "no class"] = (per[v.classNo ?? "no class"] || 0) + 1));
  console.log("Per class:", per);
  await writeFile(OUT, JSON.stringify({ syncedAt: new Date().toISOString(), videos }, null, 2), "utf8");
  console.log("Saved", OUT);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error("FAILED:", e.message);
    process.exit(1);
  });
}
