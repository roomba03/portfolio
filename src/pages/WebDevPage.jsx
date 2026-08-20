import React, { useEffect, useRef, useState } from "react";
import FogWindow from "../components/FogWindow";
import StarRevealWindow from "../components/StarRevealWindow";
import Footer from "../components/Footer";
import InkBleedWord from "../components/InkBleedWord";
import MiniLibrary from "../components/MiniLibrary";
// import StampedImage from "../components/StampedImage";

const MONO_FONT = "'Courier Prime', 'Courier New', monospace";

function RoleTag({ children }) {
  return (
    <span
      className="text-[11px] font-bold uppercase tracking-[0.08em]"
      style={{
        display: "inline-block",
        border: "1.5px solid #000000",
        color: "#000000",
        backgroundColor: "transparent",
        padding: "4px 10px",
        fontFamily: MONO_FONT,
        boxShadow: "2px 2px 0 #8BA6A9",
      }}
    >
      {children}
    </span>
  );
}

const SELECTED_WORK = [
  {
    number: "01",
    title: "Busy Bunny",
    href: "https://buns-green.vercel.app/",
    github: "https://github.com/roomba03/busy_bunny",
    image: "/busy-bunny-main.png",
    hireMe: true,
    color: "#D2DAC5",
    badge: "Winner of Most Creative UI/UX",
    description: "A gamified productivity app that pairs task management with platformer gameplay. Built at HackKU26.",
    role: "Design & Development — HackKU26 (36 hrs)",
    tags: ["Next.js", "Phaser", "Zustand"],
  },
  {
    number: "02",
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
    number: "03",
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
    role: "Design & Development — HackKU25",
    tags: ["Vanilla JS", "Phaser", "Canvas API"],
  },
  {
    number: "04",
    title: "Two Dish",
    href: "https://two-dish.vercel.app/",
    github: "https://github.com/roomba03/Two_Dish",
    image: "/two-dish.png",
    color: "#B8A9C9",
    description: "A catering ordering site for a small Hyderabadi kitchen, built around a day-by-day weekly menu and a live delivery-zone checker.",
    role: "Design & Development — Client Project",
    tags: ["Next.js", "Leaflet", "Client Work"],
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
  const heroRef = useRef(null);

  // Snaps the hero <-> Mini Library transition to the viewport, so a scroll
  // down from the hero lands with the library filling the screen instead of
  // stopping mid-transition. Implemented as a manual "settle" check rather
  // than native CSS scroll-snap-type, which proved unpredictable here (small
  // scrolls sometimes wouldn't release in either direction). This only acts
  // within the single hero-to-library transition zone; everything past the
  // library (footer) scrolls completely unmodified.
  useEffect(() => {
    let settleTimer = null;

    function handleScroll() {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        const heroHeight = heroRef.current?.offsetHeight;
        if (!heroHeight) return;
        const y = window.scrollY;
        if (y <= 0 || y >= heroHeight) return; // already settled, or past the transition zone
        window.scrollTo({ top: y > heroHeight / 2 ? heroHeight : 0, behavior: "smooth" });
      }, 120);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(settleTimer);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ position: "relative", zIndex: 1 }}
    >
      {/* ── Hero ─────────────────────────────────────────── */}
      <div ref={heroRef} className="w-full min-h-screen px-8 md:px-16 flex flex-col items-start justify-center text-left" style={{ position: "relative" }}>
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
            onMouseLeave={e => { e.currentTarget.style.color = "#332F1C"; e.currentTarget.style.fontSize = "12px"; }}
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
            onMouseLeave={e => { e.currentTarget.style.color = "#332F1C"; e.currentTarget.style.fontSize = "12px"; }}
          >
            GitHub
          </a>
          <a
            href="mailto:reemfatima1@gmail.com"
            className="transition-all hit-area-btn"
            style={{ color: "inherit", textDecoration: "none", fontSize: "12px" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#048BA8"; e.currentTarget.style.fontSize = "13px"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#332F1C"; e.currentTarget.style.fontSize = "12px"; }}
          >
            Email
          </a>
        </nav>
        </header>

        {/* halftone field bleeding off the right edge — temporarily disabled
        <div
          aria-hidden="true"
          className="hidden md:block"
          style={{
            position: "absolute",
            top: "6%",
            right: "-8%",
            width: "48%",
            height: "82%",
            backgroundImage: "radial-gradient(circle, #332F1C 2.2px, transparent 2.6px)",
            backgroundSize: "7px 7px",
            opacity: 0.08,
            maskImage: "radial-gradient(ellipse 65% 65% at 55% 40%, black 35%, transparent 88%)",
            WebkitMaskImage: "radial-gradient(ellipse 65% 65% at 55% 40%, black 35%, transparent 88%)",
          }}
        />
        */}

        <h1
          className="mt-3 -ml-[13px] font-bold text-[clamp(32px,5.2vw,68px)] leading-[1.15] tracking-tight"
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

        {/*
        <div className="flex flex-wrap items-center gap-2" style={{ marginTop: "-8px", marginLeft: "-3px" }}>
          <span className="caption-box">UX Engineer</span>
          <span className="caption-box">Product Designer</span>
        </div>
        */}

        {/*
        <div className="mt-6 max-w-sm">
          <StampedImage src="/stamp-test.jpg" alt="Stamp test" blend="color-burn" />
        </div>
        */}
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
