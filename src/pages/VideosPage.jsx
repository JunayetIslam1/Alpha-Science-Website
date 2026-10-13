import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { Card, EmptyState, PAGE_MAIN, SearchBox, SectionHead, VideoCard } from "../components/ui";
import { ALL_VIDEOS, CLASSES, SOCIAL_LINKS, UPLOADS_PLAYLIST } from "../data/homeData";

/* /videos — every upload of the YouTube channel */
export default function VideosPage() {
  const [q, setQ] = useState("");
  const [cls, setCls] = useState(0);
  const [shown, setShown] = useState(24);

  useEffect(() => {
    document.title = "Videos | Alpha Science";
  }, []);
  useEffect(() => setShown(24), [q, cls]);

  const list = ALL_VIDEOS.filter(
    (v) => (!cls || v.classNo === cls) && v.title.toLowerCase().includes(q.trim().toLowerCase())
  );
  const chip = (active) =>
    "shrink-0 rounded-full border-2 px-4 py-1.5 text-sm font-bold transition-colors duration-200 motion-reduce:transition-none " +
    (active ? "border-[#c8001e] bg-[#c8001e] text-white" : "border-[#c8001e] bg-white text-[#8f0016] hover:bg-[#fdecee]");

  return (
    <>
      <PageHero title="Videos" subtitle="আলফা সায়েন্সের সব ক্লাস ভিডিও — এক জায়গায়।" crumbs={[{ label: "Videos" }]} />
      <main className={PAGE_MAIN}>
        <Card className="p-3 pt-5">
          <iframe
            title="All uploads"
            src={`https://www.youtube-nocookie.com/embed/videoseries?list=${UPLOADS_PLAYLIST}`}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="block aspect-video w-full rounded-xl border-0 bg-black"
          />
          <div className="px-1 pb-1 pt-3 text-center">
            <a href={SOCIAL_LINKS.YouTube} target="_blank" rel="noopener noreferrer" className="inline-block rounded-lg bg-[#0a1a40] px-5 py-2.5 font-['Raleway',sans-serif] text-sm font-extrabold text-[#ffb400] transition hover:bg-[#16285f]">
              SUBSCRIBE ON YOUTUBE &rsaquo;
            </a>
          </div>
        </Card>

        {ALL_VIDEOS.length > 0 && (
          <>
            <SectionHead>Class-wise Videos</SectionHead>
            <Card className="space-y-4 p-5 pt-6">
              <SearchBox value={q} onChange={setQ} placeholder="Search videos" />
              <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
                <button type="button" onClick={() => setCls(0)} className={chip(cls === 0)}>All</button>
                {CLASSES.map((c) => (
                  <button key={c.no} type="button" onClick={() => setCls(c.no)} className={chip(cls === c.no)}>Class {c.no}</button>
                ))}
              </div>
            </Card>
            {list.length === 0 ? (
              <div className="mt-8"><EmptyState title="No video found">Try another word or class.</EmptyState></div>
            ) : (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {list.slice(0, shown).map((v, i) => (
                  <Reveal key={v.id} delay={(i % 4) * 60}>
                    <VideoCard video={v} className="h-full w-full" />
                  </Reveal>
                ))}
              </div>
            )}
            {list.length > shown && (
              <div className="mt-10 text-center">
                <button type="button" onClick={() => setShown((n) => n + 24)} className="rounded-lg border-2 border-[#c8001e] bg-white px-7 py-3 font-['Raleway',sans-serif] text-sm font-extrabold text-[#8f0016] transition-colors duration-200 hover:bg-[#c8001e] hover:text-white">
                  LOAD MORE ({list.length - shown} left)
                </button>
              </div>
            )}
          </>
        )}
        <p className="mt-10 text-center text-[#5c6670]">
          Class অনুযায়ী ভিডিও দেখতে <Link to="/classes" className="font-bold text-[#c8001e] hover:underline">Classes</Link> পেজে যাও।
        </p>
      </main>
    </>
  );
}
