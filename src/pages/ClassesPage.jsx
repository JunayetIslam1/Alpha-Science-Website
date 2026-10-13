import { useEffect } from "react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { PAGE_MAIN } from "../components/ui";
import { CLASSES } from "../data/homeData";
import { ClassTile } from "./HomePage";

/* /classes */
export default function ClassesPage() {
  useEffect(() => {
    document.title = "Classes | Alpha Science";
  }, []);
  return (
    <>
      <PageHero title="Classes" subtitle="৬ষ্ঠ থেকে দ্বাদশ শ্রেণি — তোমার শ্রেণি বেছে নাও।" crumbs={[{ label: "Classes" }]} />
      <main className={PAGE_MAIN}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CLASSES.map((c, i) => (
            <Reveal key={c.no} delay={(i % 3) * 60}>
              <ClassTile c={c} />
            </Reveal>
          ))}
        </div>
      </main>
    </>
  );
}
