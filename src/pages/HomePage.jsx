import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthModals } from "../components/AuthModals";
import FacebookBox from "../components/FacebookBox";
import Reveal from "../components/Reveal";
import { Card, ICONS, IconTile, SectionHead, VideoCard } from "../components/ui";
import { ALL_VIDEOS, BANNERS, BRAND, CLASSES, POSTS, UPLOADS_PLAYLIST, videosOfClass } from "../data/homeData";
import PostCard from "./PostCard";

/* ---------- full-width banner (shown in full size, never cropped) ---------- */
function BannerSlider() {
  const [index, setIndex] = useState(0);
  const count = BANNERS.length;
  useEffect(() => {
    if (count < 2) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => clearInterval(t);
  }, [count]);
  const b = BANNERS[index];

  return (
    <section aria-label="Banner" className="w-full bg-[#4d000d]">
      <div className="relative">
        <Link to={b.to} className="block w-full">
          <img key={index} src={b.img} alt={b.title} className="block h-auto w-full" />
        </Link>
        {count > 1 && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
            {BANNERS.map((_, i) => (
              <button key={i} type="button" aria-label={`Banner ${i + 1}`} onClick={() => setIndex(i)}
                className={"h-2.5 rounded-full transition-all " + (i === index ? "w-7 bg-[#ffb400]" : "w-2.5 bg-white/70")} />
            ))}
          </div>
        )}
      </div>
      <Link to="/contact" className="flex items-center justify-between gap-3 bg-[#0a1a40] px-5 py-2.5 text-white sm:px-8">
        <span className="font-['Raleway',sans-serif] text-base font-bold sm:text-xl">{b.title}</span>
        <span className="flex-none font-['Raleway',sans-serif] text-xs font-extrabold text-[#ffb400] sm:text-sm">CALL {BRAND.phone} &rsaquo;</span>
      </Link>
    </section>
  );
}

/* ---------- welcome band ---------- */
function Hero() {
  const { openRegister } = useAuthModals();
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#c8001e_0%,#8f0016_55%,#4d000d_100%)] px-5 pb-[120px] pt-12 text-center sm:pt-[60px]">
      <span className="pointer-events-none absolute -left-[110px] -top-[170px] h-[380px] w-[380px] rounded-full bg-white/[0.07]" />
      <span className="pointer-events-none absolute -bottom-[150px] -right-[70px] h-[300px] w-[300px] rounded-full bg-white/[0.07]" />
      <span className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative z-[1] mx-auto max-w-[900px]">
        <img src="/logo.jpg" alt="Alpha Science" className="mx-auto h-28 w-28 rounded-full border-4 border-white/70 object-cover shadow-[0_14px_34px_rgba(0,0,0,.4)] sm:h-32 sm:w-32" />
        <h1 className="mt-5 break-words text-[clamp(38px,8vw,76px)] font-black leading-[1.08] text-white [text-shadow:0_4px_0_rgba(0,0,0,.28),0_14px_34px_rgba(0,0,0,.35)] [text-wrap:balance]">
          {BRAND.bn}
        </h1>
        <p className="mt-2 font-['Raleway',sans-serif] text-[clamp(16px,2.6vw,26px)] font-bold leading-snug text-white">{BRAND.tagline}</p>
        <div className="mx-auto mt-5 h-[7px] w-[130px] rounded bg-[linear-gradient(90deg,#ffb400,#fff,#0a1a40)]" />
        <p className="mx-auto mt-5 max-w-[640px] text-lg text-white/90">{BRAND.invite}</p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={openRegister} className="rounded-lg bg-[#0a1a40] px-6 py-3 font-['Raleway',sans-serif] text-sm font-extrabold text-[#ffb400] transition duration-200 hover:-translate-y-px hover:bg-white hover:text-[#0a1a40] motion-reduce:transition-none">
            REGISTER NOW &rsaquo;
          </button>
          <Link to="/videos" className="rounded-lg border-2 border-white px-6 py-[10px] font-['Raleway',sans-serif] text-sm font-extrabold text-white transition duration-200 hover:bg-white hover:text-[#8f0016] motion-reduce:transition-none">
            WATCH VIDEOS
          </Link>
          <a href={`tel:${BRAND.phoneTel}`} className="rounded-lg border-2 border-[#ffb400] px-6 py-[10px] font-['Raleway',sans-serif] text-sm font-extrabold text-[#ffb400] transition duration-200 hover:bg-[#ffb400] hover:text-[#0a1a40] motion-reduce:transition-none">
            CALL {BRAND.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { title: "৬ষ্ঠ – দ্বাদশ শ্রেণি", text: "প্রতিটি শ্রেণির জন্য আলাদা ক্লাস", icon: ICONS.grid, to: "/classes" },
  { title: "YouTube ক্লাস", text: "ভিডিও দেখুন এই সাইটেই", icon: ICONS.play, to: "/videos" },
  { title: "Facebook আপডেট", text: "সর্বশেষ পোস্ট ও নোটিশ", icon: ICONS.notice, to: "/posts" },
  { title: "যোগাযোগ", text: BRAND.phone, icon: ICONS.phone, to: "/contact" },
];

function Features() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {FEATURES.map((f, i) => (
        <Reveal key={f.title} delay={i * 80}>
          <Link to={f.to} className="relative flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-[#f0dcde] bg-white px-5 py-5 shadow-[0_10px_30px_rgba(143,0,22,.16)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(200,0,30,.28)] motion-reduce:transition-none">
            <span className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#c8001e,#8f0016)]" />
            <IconTile big>{f.icon}</IconTile>
            <span className="min-w-0">
              <span className="block text-lg font-bold leading-tight text-[#8f0016]">{f.title}</span>
              <span className="mt-1 block text-[14px] leading-snug text-[#5c6670]">{f.text}</span>
            </span>
          </Link>
        </Reveal>
      ))}
    </section>
  );
}

export function ClassTile({ c }) {
  const n = videosOfClass(c.no).length;
  return (
    <Link to={`/classes/${c.no}`} className="group relative block overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#c8001e,#4d000d)] px-5 py-6 text-white shadow-[0_10px_30px_rgba(143,0,22,.25)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(200,0,30,.4)] motion-reduce:transition-none">
      <span aria-hidden="true" className="pointer-events-none absolute -right-3 -top-6 font-['Raleway',sans-serif] text-[110px] font-black leading-none text-white/15">{c.no}</span>
      <span className="relative block font-['Raleway',sans-serif] text-sm font-extrabold tracking-wider text-[#ffb400]">CLASS {c.no}</span>
      <span className="relative mt-1 block text-2xl font-bold leading-tight">{c.bn}</span>
      <span className="relative mt-3 flex items-center justify-between text-sm text-white/80">
        <span>{n ? `${n} videos` : "Videos"}</span>
        <span className="font-['Raleway',sans-serif] font-extrabold text-[#ffb400] transition-transform duration-200 group-hover:translate-x-1">OPEN &rsaquo;</span>
      </span>
    </Link>
  );
}

export default function HomePage() {
  useEffect(() => {
    document.title = "Alpha Science | আলফা সায়েন্স";
  }, []);

  return (
    <>
      <BannerSlider />
      <Hero />

      <main className="relative z-[2] mx-auto -mt-[70px] w-full max-w-[1180px] flex-1 px-5 pb-[50px]">
        <Features />

        <SectionHead id="classes">Classes</SectionHead>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CLASSES.map((c, i) => (
            <Reveal key={c.no} delay={(i % 4) * 60}>
              <ClassTile c={c} />
            </Reveal>
          ))}
        </div>

        <SectionHead id="videos">Latest Videos</SectionHead>
        {ALL_VIDEOS.length > 0 ? (
          <Reveal>
            <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-4 pt-1 [scrollbar-width:thin]">
              {ALL_VIDEOS.slice(0, 12).map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link to="/videos" className="rounded-lg bg-[#0a1a40] px-6 py-3 font-['Raleway',sans-serif] text-sm font-extrabold text-[#ffb400] transition hover:bg-[#16285f]">SEE ALL VIDEOS &rsaquo;</Link>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <Card className="p-3 pt-5">
              <iframe
                title="Alpha Science videos"
                src={`https://www.youtube-nocookie.com/embed/videoseries?list=${UPLOADS_PLAYLIST}`}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="block aspect-video w-full rounded-xl border-0 bg-black"
              />
            </Card>
          </Reveal>
        )}

        <SectionHead id="facebook">From Facebook</SectionHead>
        <Reveal className="grid items-start gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            {POSTS.slice(0, 3).map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
            {POSTS.length === 0 && (
              <Card className="px-6 pb-7 pt-9 text-center">
                <p className="text-lg font-bold text-[#4d000d]">আলফা সায়েন্সের সর্বশেষ আপডেট আমাদের Facebook পেজে</p>
                <Link to="/posts" className="mt-4 inline-block rounded-lg bg-[#0a1a40] px-6 py-3 font-['Raleway',sans-serif] text-sm font-extrabold text-[#ffb400] transition hover:bg-[#16285f]">ALL UPDATES &rsaquo;</Link>
              </Card>
            )}
          </div>
          <FacebookBox height={560} />
        </Reveal>
      </main>
    </>
  );
}
