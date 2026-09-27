import { useState } from "react";
import StarRevealWindow from "../components/StarRevealWindow";
import Footer from "../components/Footer";
import InkBleedWord from "../components/InkBleedWord";
import MiniLibrary from "../components/MiniLibrary";
import useCopyEmail from "../hooks/useCopyEmail";

const EMAIL = "reemfatima1@gmail.com";
const MONO_FONT = "'Courier Prime', 'Courier New', monospace";

function RoleTag({ children }) {
  return (
    <span
      className="text-[11px] font-bold uppercase tracking-[0.08em] cursor-default shadow-[0_0_6px_rgba(139,166,169,0.7)]"
      style={{
        display: "inline-block",
        border: "1.5px solid #000000",
        color: "#000000",
        backgroundColor: "transparent",
        padding: "4px 10px",
        fontFamily: MONO_FONT,
      }}
    >
      {children}
    </span>
  );
}

const SELECTED_WORK = [
  {
    number: "01",
    title: "Two Dish",
    href: "https://two-dish.vercel.app/",
    github: "https://github.com/roomba03/Two_Dish",
    image: "/two-dish.webp",
    color: "#B8A9C9",
    description: "An ordering site for a home catering kitchen, built around a day-by-day menu, a drawn delivery zone, and a real headcount per dish.",
    role: "Client Project: Design & Development",
    tags: ["Next.js", "Supabase", "Leaflet"],
  },
  {
    number: "02",
    title: "Busy Bunny",
    href: "https://buns-green.vercel.app/",
    github: "https://github.com/roomba03/busy_bunny",
    image: "/busy-bunny-main.webp",
    hireMe: true,
    color: "#D2DAC5",
    badge: "Winner of Most Creative UI/UX",
    description: "A gamified productivity app that pairs task management with platformer gameplay. Built at HackKU26.",
    role: "HackKU26 (36 hrs): Design & Development",
    tags: ["Next.js", "Phaser", "Zustand"],
  },
  {
    number: "03",
    title: "Side Quest",
    href: "https://eecs582-sidequest.vercel.app",
    github: "https://github.com/roomba03/SideQuest",
    image: "/sidequest.png",
    color: "#A7CECB",
    description: "A campus exploration game with quests, achievements, and a live leaderboard.",
    role: "Design & Development",
    tags: ["Next.js", "Supabase", "Framer Motion"],
  },
  {
    number: "04",
    title: "Gnometastic Gnomular Quest",
    href: "https://thegnomefour.vercel.app",
    github: "https://github.com/roomba03/thegnomefour",
    image: "/gnomular_quest.png",
    color: "#CACC90",
    quip: {
      text: "Are you a slave to capitalism?",
      hotspot: { left: "58%", top: "25%", width: "42%", height: "75%" },
    },
    description: "A pixel-art arcade game starring a gnome on a quest of his own. Built at HackKU25.",
    role: "HackKU25: Design & Development",
    tags: ["Vanilla JS", "Phaser", "Canvas API"],
  },
];

const MINI_PROJECTS = [
  {
    title: "Design Sandbox",
    subtitle: "Animation playground · Three.js + GSAP",
    href: "https://design-sandbox-chi.vercel.app/",
    github: "https://github.com/roomba03/design_sandbox",
    image: "/design_sandbox.png",
    color: "#D2DAC5",
  },
  {
    title: "Shahi Chai Cart",
    subtitle: "Client site · React + Framer Motion",
    href: "https://shahi-chai-cart.vercel.app/",
    github: "https://github.com/roomba03/shahi_chai_cart",
    image: "/shahi.png",
    color: "#F4EBBE",
  },
];

export default function WebDevPage() {
  const [nameHover, setNameHover] = useState(false);
  const { copied: emailCopied, handleClick: handleEmailClick } = useCopyEmail(EMAIL);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ position: "relative", zIndex: 1 }}
    >
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="w-full min-h-screen px-8 md:px-16 flex flex-col items-start justify-center text-left" style={{ position: "relative" }}>
        <header>
        <span
          className="text-[15px]"
          style={{ position: "absolute", top: "2rem", left: "2rem", fontFamily: "'Lao MN', sans-serif", fontWeight: 700, color: "#000000" }}
          onMouseEnter={() => setNameHover(true)}
          onMouseLeave={() => setNameHover(false)}
        >
          Reem Fatima
          <div
            className="transition-opacity duration-200"
            style={{
              position: "absolute", left: "50%", top: "100%",
              transform: "translate(-50%, 8px)",
              opacity: nameHover ? 1 : 0,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "relative",
                backgroundColor: "#F4EBBE",
                border: "1.5px solid #332F1C",
                borderRadius: "10px",
                padding: "3px 10px",
                fontSize: "11px",
                fontWeight: 700,
                fontFamily: MONO_FONT,
                color: "#000000",
                whiteSpace: "nowrap",
                boxShadow: "2px 2px 0 #8BA6A9",
              }}
            >
              hi :)
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  left: "50%",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#F4EBBE",
                  borderLeft: "1.5px solid #332F1C",
                  borderTop: "1.5px solid #332F1C",
                  transform: "translateX(-50%) rotate(45deg)",
                }}
              />
            </div>
          </div>
        </span>

        <nav
          aria-label="Social links"
          className="flex items-center gap-6 text-[12px] uppercase tracking-[0.05em]"
          style={{ position: "absolute", top: "2rem", right: "2rem", color: "#000000", fontFamily: MONO_FONT }}
        >
          <a
            href="https://www.linkedin.com/in/reem-fatima-856288238/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all hit-area-btn"
            style={{ color: "inherit", textDecoration: "none", fontSize: "12px" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#048BA8"; e.currentTarget.style.fontSize = "13px"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#000000"; e.currentTarget.style.fontSize = "12px"; }}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/roomba03"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all hit-area-btn"
            style={{ color: "inherit", textDecoration: "none", fontSize: "12px" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#048BA8"; e.currentTarget.style.fontSize = "13px"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#000000"; e.currentTarget.style.fontSize = "12px"; }}
          >
            GitHub
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="transition-all hit-area-btn"
            style={{ color: "inherit", textDecoration: "none", fontSize: "12px" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#048BA8"; e.currentTarget.style.fontSize = "13px"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#000000"; e.currentTarget.style.fontSize = "12px"; }}
            onClick={handleEmailClick}
            aria-live="polite"
          >
            {emailCopied ? "Copied!" : "Email"}
          </a>
        </nav>
        </header>

        <h1
          className="mt-3 -ml-[13px] text-[clamp(32px,5.2vw,68px)] leading-[1.15] tracking-tight"
          style={{ color: "#000000", fontFamily: "'Apple SD Gothic Neo', sans-serif", fontWeight: 500, letterSpacing: "0.045em" }}
        >
          Designed with <InkBleedWord text="intention" after="." /><br />
          Built with <InkBleedWord text="understanding" after="." />
        </h1>

        <div className="flex flex-wrap items-center gap-2" style={{ marginTop: "10px", marginLeft: "-6px" }}>
          <RoleTag>Web Developer</RoleTag>
          <RoleTag>UX Engineer</RoleTag>
        </div>

        <div
          className="hidden md:block w-[clamp(70px,11vw,140px)] h-[clamp(70px,11vw,140px)]"
          style={{ position: "absolute", right: "20%", top: "50%", transform: "translateY(-50%)" }}
        >
          <StarRevealWindow layout="cluster" />
        </div>
      </div>

      <main className="flex-1 w-full min-h-screen px-8 pb-4 flex flex-col justify-center">

        {/* ── Mini Library ─────────────────────────────────── */}
        <section>
          <MiniLibrary selectedWork={SELECTED_WORK} miniProjects={MINI_PROJECTS} />
        </section>

      </main>

      {/* ── Footer ───────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
