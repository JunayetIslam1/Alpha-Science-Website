import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { Card, PAGE_MAIN } from "../components/ui";
import { BRAND, CLASSES, SOCIAL_LINKS } from "../data/homeData";

/* /about */
export default function AboutPage() {
  useEffect(() => {
    document.title = "About Us | Alpha Science";
  }, []);
  return (
    <>
      <PageHero title={`About ${BRAND.name}`} subtitle={BRAND.tagline} crumbs={[{ label: "About Us" }]} />
      <main className={PAGE_MAIN}>
        <Card className="px-6 pb-9 pt-11 text-center sm:px-12">
          <p className="text-lg font-semibold text-[#8f0016]">বিসমিল্লাহির রহমানির রহিম</p>
          <h2 className="mt-3 text-[clamp(26px,4.5vw,44px)] font-black leading-tight text-[#4d000d]">{BRAND.bn}</h2>
          <p className="mt-1 font-['Raleway',sans-serif] text-lg font-bold text-[#c8001e]">{BRAND.tagline}</p>
          <div className="mx-auto mt-6 h-[5px] w-[90px] rounded bg-[#ffb400]" />
          <p className="mx-auto mt-6 max-w-[760px]">
            Alpha Science-এ রয়েছে {CLASSES[0].bn} থেকে {CLASSES[CLASSES.length - 1].bn} পর্যন্ত শিক্ষার্থীদের জন্য ক্লাস। {BRAND.invite}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/classes" className="rounded-lg bg-[#0a1a40] px-6 py-3 font-['Raleway',sans-serif] text-sm font-extrabold text-[#ffb400] transition hover:bg-[#16285f]">OUR CLASSES &rsaquo;</Link>
            <a href={SOCIAL_LINKS.YouTube} target="_blank" rel="noopener noreferrer" className="rounded-lg border-2 border-[#c8001e] px-6 py-[10px] font-['Raleway',sans-serif] text-sm font-extrabold text-[#8f0016] transition-colors hover:bg-[#c8001e] hover:text-white">YOUTUBE</a>
            <a href={SOCIAL_LINKS.Facebook} target="_blank" rel="noopener noreferrer" className="rounded-lg border-2 border-[#c8001e] px-6 py-[10px] font-['Raleway',sans-serif] text-sm font-extrabold text-[#8f0016] transition-colors hover:bg-[#c8001e] hover:text-white">FACEBOOK</a>
          </div>
        </Card>
        <div className="mt-8 overflow-hidden rounded-[20px] border-4 border-white shadow-[0_18px_50px_rgba(143,0,22,.25)]">
          <img src="/banner.png" alt="আলফা সায়েন্স শিক্ষক পরিষদ" className="block h-auto w-full" />
        </div>
      </main>
    </>
  );
}
