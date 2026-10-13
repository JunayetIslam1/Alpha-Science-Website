# Alpha Science — React + Tailwind website

```
npm install
npm run dev            # http://localhost:5173
npm run sync           # pulls the latest YouTube videos and sorts them into Class 6..12
```

**All videos (not just the latest 15):**
```
yt-dlp --flat-playlist -J "https://www.youtube.com/@AlphaScience-Ms/videos" > all.json
npm run sync -- all.json
```

**Facebook posts:** the Facebook timeline box on `/posts` and the home page works automatically.
To also show posts as cards, paste them into `src/data/posts.json`:
`[{ "id": "1", "date": "2026-10-01", "text": "…", "image": "https://…", "link": "https://facebook.com/…" }]`
If the timeline box stays empty, set `FB_PAGE_URL` in `src/data/homeData.js` to the page's direct address (facebook.com/yourpagename).

Pages: `/`, `/classes`, `/classes/:no` (6..12), `/videos`, `/watch/:id`, `/posts`, `/about`, `/contact`
Logo + banner: `public/logo.jpg`, `public/banner.png`
For a live server make every URL open `index.html` (SPA fallback).
