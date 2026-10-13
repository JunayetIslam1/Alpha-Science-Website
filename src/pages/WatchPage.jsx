import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { Card, PAGE_MAIN, VideoCard, fmtDate } from "../components/ui";
import { ALL_VIDEOS, findVideo } from "../data/homeData";

/* /watch/:id — plays the YouTube video inside the site */
export default function WatchPage() {
  const { id } = useParams();
  const video = findVideo(id);

  useEffect(() => {
    document.title = `${video ? video.title : "Video"} | Alpha Science`;
  }, [video]);

  if (!/^[\w-]{11}$/.test(id)) {
    return (
      <main className="mx-auto flex w-full max-w-[700px] flex-1 flex-col items-center justify-center px-5 py-24 text-center">
        <h1 className="text-2xl font-bold text-[#4d000d]">Video not found</h1>
        <Link to="/videos" className="mt-6 rounded-lg bg-[#0a1a40] px-6 py-3 font-['Raleway',sans-serif] text-sm font-extrabold text-[#ffb400]">ALL VIDEOS &rsaquo;</Link>
      </main>
    );
  }

  const related = ALL_VIDEOS.filter((v) => v.id !== id && (!video?.classNo || v.classNo === video.classNo)).slice(0, 4);

  return (
    <>
      <PageHero
        title={video ? video.title : "Video"}
        crumbs={[{ label: "Videos", to: "/videos" }, ...(video?.classNo ? [{ label: `Class ${video.classNo}`, to: `/classes/${video.classNo}` }] : []), { label: "Watch" }]}
      />
      <main className={PAGE_MAIN}>
        <Card className="mx-auto max-w-[960px] p-3 pt-5">
          <iframe
            title={video ? video.title : "YouTube video"}
            src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="block aspect-video w-full rounded-xl border-0 bg-black"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-2 pt-4">
            <p className="text-sm text-[#5c6670]">{fmtDate(video?.published)}</p>
            <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#0a1a40] px-5 py-2.5 font-['Raleway',sans-serif] text-sm font-extrabold text-[#ffb400] transition hover:bg-[#16285f]">
              OPEN ON YOUTUBE &rsaquo;
            </a>
          </div>
        </Card>

        {related.length > 0 && (
          <>
            <h2 className="mb-5 mt-12 flex items-center gap-3 text-[clamp(20px,3vw,26px)] font-bold text-[#4d000d]">
              <span className="h-7 w-1.5 rounded bg-[#ffb400]" />
              More videos
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((v) => (
                <VideoCard key={v.id} video={v} className="h-full w-full" />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
