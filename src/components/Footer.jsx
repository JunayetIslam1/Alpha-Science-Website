import { Link } from "react-router-dom";
import { BRAND, CLASSES, SOCIAL_LINKS } from "../data/homeData";

function IconBox({ children }) {
  return (
    <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[10px] bg-[#0a1a40]">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
      </svg>
    </span>
  );
}

function FooterBox({ icon, title, children }) {
  return (
    <div className="rounded-2xl border border-white/[0.22] bg-white/10 px-[18px] pb-6 pt-[22px] backdrop-blur-[2px] sm:px-6 sm:pb-7 sm:pt-[26px]">
      <div className="relative mb-[18px] flex items-center gap-3 border-b-2 border-white/25 pb-4">
        <IconBox>{icon}</IconBox>
        <h4 className="font-['Raleway',sans-serif] text-xl font-bold leading-[1.2]">{title}</h4>
        <span className="absolute -bottom-0.5 left-0 h-0.5 w-[52px] bg-[#ffb400]" />
      </div>
      {children}
    </div>
  );
}

const linkCls = "inline-block transition-transform duration-150 hover:translate-x-1 motion-reduce:transition-none";

const SOCIALS = [
  {
    name: "Facebook",
    svg: <path fill="#1877F2" d="M13.5 22v-8.5h2.9l.5-3.4h-3.4V8c0-1 .3-1.7 1.8-1.7H17V3.3c-.3 0-1.3-.2-2.5-.2-2.5 0-4.1 1.5-4.1 4.2v2.8H7.5v3.4h2.9V22h3.1z" />,
  },
  {
    name: "YouTube",
    svg: (
      <>
        <rect x="1.5" y="5" width="21" height="14" rx="4.2" fill="#FF0000" />
        <polygon points="10,9 16,12 10,15" fill="#fff" />
      </>
    ),
  },
];

export default function Footer() {
  return (
    <>
      <footer className="bg-[linear-gradient(180deg,#c8001e_0%,#8f0016_100%)] px-6 pb-14 pt-[60px] text-white">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FooterBox title="Navigation" icon={<polygon points="3 11 22 2 13 21 11 13 3 11" />}>
            <ul className="list-none">
              {[
                ["Home", "/"],
                ["Classes", "/classes"],
                ["Videos", "/videos"],
                ["Facebook Updates", "/posts"],
                ["About Us", "/about"],
                ["Contact", "/contact"],
              ].map(([label, to]) => (
                <li key={label} className="mb-[9px] text-[15px] leading-normal">
                  <Link to={to} className={linkCls}>
                    <span className="opacity-80">&raquo;&nbsp;</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterBox>

          <FooterBox title="Our Classes" icon={<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>}>
            <ul className="list-none">
              {CLASSES.map((c) => (
                <li key={c.no} className="mb-[9px] text-[15px] leading-normal">
                  <Link to={`/classes/${c.no}`} className={linkCls}>
                    <span className="opacity-80">&raquo;&nbsp;</span>
                    {c.bn}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterBox>

          <FooterBox title="Contact" icon={<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />}>
            <p className="text-[15px] leading-[1.75]">
              <span className="opacity-80">Call us :</span>
              <br />
              <a href={`tel:${BRAND.phoneTel}`} className="text-lg font-bold hover:underline">
                {BRAND.phone}
              </a>
            </p>
            <p className="mt-4 text-[15px] leading-[1.75] opacity-90">{BRAND.invite}</p>
          </FooterBox>

          <FooterBox title="Follow Us" icon={<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><circle cx="17.5" cy="9" r="2.5" /><path d="M17.5 14c2.4 0 4 1.7 4 4.5" /></>}>
            <div className="flex flex-nowrap gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={SOCIAL_LINKS[s.name]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid aspect-square max-w-[46px] flex-1 place-items-center rounded-full bg-white shadow-[0_5px_14px_rgba(0,0,0,.22)] transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.06] motion-reduce:transition-none"
                >
                  <svg viewBox="0 0 24 24" className="h-[52%] w-[52%]" aria-hidden="true">{s.svg}</svg>
                </a>
              ))}
            </div>
            <p className="mt-4 text-[15px] opacity-90">{BRAND.tagline}</p>
          </FooterBox>
        </div>
      </footer>

      <div className="bg-[#0a1a40] px-6 py-[22px] font-['Raleway','Hind_Siliguri',sans-serif] text-[15px] text-white">
        <div className="mx-auto max-w-[1180px]">© 2026 {BRAND.name}. All Rights Reserved.     ||        Developed by Junayet Islam</div>

      </div>
    </>
  );
}
