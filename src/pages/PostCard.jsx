import { Card } from "../components/ui";
import { fmtDate } from "../components/ui";

/* one Facebook post (from src/data/posts.json) */
export default function PostCard({ post }) {
  const date = fmtDate(post.date);
  return (
    <Card className="px-5 pb-5 pt-7 sm:px-6">
      {date && <p className="text-sm font-semibold text-[#8f0016]">{date}</p>}
      {post.text && <p className="mt-1 whitespace-pre-line break-words">{post.text}</p>}
      {post.image && <img src={post.image} alt="" loading="lazy" className="mt-4 block h-auto w-full rounded-xl" />}
      {post.link && (
        <a href={post.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-['Raleway',sans-serif] text-sm font-extrabold text-[#c8001e] hover:underline">
          VIEW ON FACEBOOK &rsaquo;
        </a>
      )}
    </Card>
  );
}
