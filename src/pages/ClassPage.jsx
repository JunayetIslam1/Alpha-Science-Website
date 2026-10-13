import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { Card, EmptyState, PAGE_MAIN, SearchBox, VideoCard } from "../components/ui";
import { CLASSES, SOCIAL_LINKS, videosOfClass } from "../data/homeData";
import NotFoundPage from "./NotFoundPage";

/* /classes/:no  (6 .. 12) */
export default function ClassPage() {
  const { no } = useParams();
  const cls = CLASSES.find((c) => String(c.no) === no);
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(24);

  useEffect(() => {
    setQ("");
    setShown(24);
    if (cls) document.title = `${cls.bn} | Alpha Science`;
  }, [no, cls]);

  if (!cls) return <NotFoundPage />;

  const all = videosOfClass(cls.no);
  const videos = all.filter((v) => v.title.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <>
      <PageHero title={cls.bn} subtitle={`Class ${cls.no}`} crumbs={[{ label: "Classes", to: "/classes" }, { label: cls.bn }]} />
      <main className={PAGE_MAIN}>
        <Card className="space-y-4 p-5 pt-6">
          {all.length > 0 && <SearchBox value={q} onChange={setQ} placeholder="Search videos of this class" />}
          <nav aria-label="Other classes" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
            {CLASSES.map((c) => (
              <Link
                key={c.no}
                to={`/classes/${c.no}`}
                className={
                  "shrink-0 rounded-full border-2 px-4 py-1.5 text-sm font-bold transition-colors duration-200 motion-reduce:transition-none " +
                  (c.no === cls.no ? "border-[#c8001e] bg-[#c8001e] text-white" : "border-[#c8001e] bg-white text-[#8f0016] hover:bg-[#fdecee]")
                }
              >
                Class {c.no}
              </Link>
            ))}
          </nav>
        </Card>

        {all.length === 0 ? (
          <div className="mt-8">
            <EmptyState title={`${cls.bn}-এর ভিডিও শীঘ্রই এখানে আসবে`}>
              এখন সব ভিডিও দেখতে{" "}
              <Link to="/videos" className="font-bold text-[#c8001e] hover:underline">Videos</Link> পেজে যাও অথবা{" "}
              <a href={SOCIAL_LINKS.YouTube} target="_blank" rel="noopener noreferrer" className="font-bold text-[#c8001e] hover:underline">YouTube চ্যানেলে</a> যাও।
            </EmptyState>
          </div>
        ) : videos.length === 0 ? (
          <div className="mt-8"><EmptyState title="No video found">Try another word.</EmptyState></div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.slice(0, shown).map((v, i) => (
              <Reveal key={v.id} delay={(i % 4) * 60}>
                <VideoCard video={v} className="h-full w-full" />
              </Reveal>
            ))}
          </div>
        )}

        {videos.length > shown && (
          <div className="mt-10 text-center">
            <button type="button" onClick={() => setShown((n) => n + 24)} className="rounded-lg border-2 border-[#c8001e] bg-white px-7 py-3 font-['Raleway',sans-serif] text-sm font-extrabold text-[#8f0016] transition-colors duration-200 hover:bg-[#c8001e] hover:text-white">
              LOAD MORE ({videos.length - shown} left)
            </button>
          </div>
        )}
      </main>
    </>
  );
}
