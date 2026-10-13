import { useEffect } from "react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { Card, ICONS, IconTile, PAGE_MAIN } from "../components/ui";
import { BRAND, SOCIAL_LINKS } from "../data/homeData";

function Row({ icon, label, children }) {
  return (
    <div className="flex items-center gap-4">
      <IconTile>{icon}</IconTile>
      <div className="min-w-0">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#5c6670]">{label}</p>
        <div className="text-lg font-bold leading-snug text-[#4d000d] [overflow-wrap:anywhere]">{children}</div>
      </div>
    </div>
  );
}

/* /contact */
export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact | Alpha Science";
  }, []);
  return (
    <>
      <PageHero title="Contact" subtitle={BRAND.invite} crumbs={[{ label: "Contact" }]} />
      <main className={PAGE_MAIN}>
        <Reveal>
          <Card className="mx-auto max-w-[760px] space-y-7 px-6 pb-9 pt-11">
            <Row icon={ICONS.phone} label="Call us">
              <a href={`tel:${BRAND.phoneTel}`} className="hover:underline">{BRAND.phone}</a>
            </Row>
            <Row icon={ICONS.notice} label="Facebook">
              <a href={SOCIAL_LINKS.Facebook} target="_blank" rel="noopener noreferrer" className="hover:underline">Alpha Science on Facebook</a>
            </Row>
            <Row icon={ICONS.play} label="YouTube">
              <a href={SOCIAL_LINKS.YouTube} target="_blank" rel="noopener noreferrer" className="hover:underline">@AlphaScience-Ms</a>
            </Row>
            <a href={`tel:${BRAND.phoneTel}`} className="block rounded-lg bg-[#0a1a40] px-6 py-3.5 text-center font-['Raleway',sans-serif] text-sm font-extrabold text-[#ffb400] transition hover:bg-[#16285f]">
              CALL NOW &rsaquo;
            </a>
          </Card>
        </Reveal>
      </main>
    </>
  );
}
