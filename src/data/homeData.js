import synced from "./synced.json";
import posts from "./posts.json";
import { classify } from "./classify";

/* ---------- brand ---------- */
export const BRAND = {
  name: "Alpha Science",
  bn: "Alpha Science",
  tagline: "Follow excellence, success will chase you",
  invite: "তুমি যদি তোমার ব্যাচের আলফা হতে চাও, আজই চলে এসো Alpha Science ভুবনে!",
  phone: "01823-981778",
  phoneTel: "01823981778",
};

export const SOCIAL_LINKS = {
  Facebook: "https://www.facebook.com/share/1Er74L7AK2/",
  Twitter: "#",
  Instagram: "#",
  YouTube: "https://www.youtube.com/@AlphaScience-Ms",
};

/* YouTube: the channel's "all uploads" list can always be embedded, no sync needed */
export const CHANNEL_ID = "UC39XFa7Q8RKjU6Ktw2FfqvQ";
export const UPLOADS_PLAYLIST = "UU39XFa7Q8RKjU6Ktw2FfqvQ";

/* Facebook page (timeline box on /posts). If the box stays empty, put the page's
   direct address here, e.g. https://www.facebook.com/yourpagename */
export const FB_PAGE_URL = SOCIAL_LINKS.Facebook;

/* Full-width banner(s) at the top of the home page. Add more objects for a slider. */
export const BANNERS = [{ img: "/banner.png", to: "/contact", title: "আলফা সায়েন্স শিক্ষক পরিষদ" }];

/* ---------- classes 6 .. 12 ---------- */
const BN_LABELS = { 6: "৬ষ্ঠ শ্রেণি", 7: "৭ম শ্রেণি", 8: "৮ম শ্রেণি", 9: "৯ম শ্রেণি", 10: "১০ম শ্রেণি", 11: "একাদশ শ্রেণি", 12: "দ্বাদশ শ্রেণি" };

export const CLASSES = [6, 7, 8, 9, 10, 11, 12].map((no) => ({
  no,
  bn: BN_LABELS[no],
  en: `Class ${no}`,
}));

export const CLASS_OPTIONS = CLASSES.map((c) => `${c.bn} (Class ${c.no})`);

/* ---------- videos (from `npm run sync`) ---------- */
export const ALL_VIDEOS = (synced.videos || []).map((v) => ({
  ...v,
  classNo: v.classNo ?? classify(v.title),
}));

export const videosOfClass = (no) => ALL_VIDEOS.filter((v) => v.classNo === Number(no));
export const findVideo = (id) => ALL_VIDEOS.find((v) => v.id === id);

/* ---------- Facebook posts (src/data/posts.json) ---------- */
export const POSTS = posts;
