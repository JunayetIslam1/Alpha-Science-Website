import { useEffect } from "react";
import FacebookBox from "../components/FacebookBox";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { PAGE_MAIN } from "../components/ui";
import { POSTS } from "../data/homeData";
import PostCard from "./PostCard";

/* /posts — Facebook updates */
export default function PostsPage() {
  useEffect(() => {
    document.title = "Facebook Updates | Alpha Science";
  }, []);
  return (
    <>
      <PageHero title="Facebook Updates" subtitle="Alpha Science এর সর্বশেষ পোস্ট ও নোটিশ।" crumbs={[{ label: "Facebook Updates" }]} />
      <main className={PAGE_MAIN}>
        <div className={"grid items-start gap-6 " + (POSTS.length ? "lg:grid-cols-[1fr_420px]" : "")}>
          {POSTS.length > 0 && (
            <div className="space-y-5">
              {POSTS.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 50}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          )}
          <div className={POSTS.length ? "lg:sticky lg:top-28" : "mx-auto w-full max-w-[560px]"}>
            <FacebookBox height={760} />
          </div>
        </div>
      </main>
    </>
  );
}
