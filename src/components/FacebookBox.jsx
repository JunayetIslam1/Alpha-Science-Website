import { Card } from "./ui";
import { FB_PAGE_URL, SOCIAL_LINKS } from "../data/homeData";

/* Live Facebook page timeline (official Facebook Page plugin) */
export default function FacebookBox({ height = 700 }) {
  const src =
    "https://www.facebook.com/plugins/page.php?href=" +
    encodeURIComponent(FB_PAGE_URL) +
    `&tabs=timeline&width=500&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;
  return (
    <Card className="p-3 pt-5">
      <iframe
        title="Alpha Science on Facebook"
        src={src}
        loading="lazy"
        scrolling="no"
        allow="encrypted-media"
        style={{ height }}
        className="block w-full rounded-xl border-0 bg-white"
      />
      <div className="px-1 pb-1 pt-3 text-center">
        <a
          href={SOCIAL_LINKS.Facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-[#0a1a40] px-5 py-2.5 font-['Raleway',sans-serif] text-sm font-extrabold text-[#ffb400] transition hover:bg-[#16285f]"
        >
          OPEN FACEBOOK PAGE &rsaquo;
        </a>
      </div>
    </Card>
  );
}
