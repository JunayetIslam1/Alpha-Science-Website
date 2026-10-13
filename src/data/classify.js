/* Finds the class (6..12) a video title talks about. Works with Bengali and English titles. */

const BN = "০১২৩৪৫৬৭৮৯";
const normDigits = (s) => s.replace(/[০-৯]/g, (d) => String(BN.indexOf(d)));

const WORDS = [
  [10, /দশম|(?:10|১০)\s*ম/],
  [11, /একাদশ|(?:11|১১)\s*শ|HSC\s*(?:1st|first|১ম|1)/i],
  [12, /দ্বাদশ|(?:12|১২)\s*শ|HSC\s*(?:2nd|second|২য়|2)/i],
  [6, /ষষ্ঠ|(?:6|৬)\s*ষ্ঠ/],
  [7, /সপ্তম|(?:7|৭)\s*ম/],
  [8, /অষ্টম|(?:8|৮)\s*ম/],
  [9, /নবম|(?:9|৯)\s*ম/],
];

export function classify(title = "") {
  for (const [n, re] of WORDS) if (re.test(title)) return n;
  const t = normDigits(title);
  const m = t.match(/(?:class|cls|শ্রেণি|শ্রেণী|ক্লাস)\s*[-:]?\s*(\d{1,2})\b/i);
  if (m) {
    const n = Number(m[1]);
    if (n >= 6 && n <= 12) return n;
  }
  return null;
}
