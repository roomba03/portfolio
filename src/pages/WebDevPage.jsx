import React, { useState } from "react";
import FogWindow from "../components/FogWindow";
import StarRevealWindow from "../components/StarRevealWindow";
import Footer from "../components/Footer";
import InkBleedWord from "../components/InkBleedWord";
// import StampedImage from "../components/StampedImage";

const DISPLAY_FONT = "'Bangla MN', sans-serif";
const MONO_FONT = "'Courier Prime', 'Courier New', monospace";
const SANS_FONT = "'Fredoka', sans-serif";
const MUTED = "rgba(51,47,28,0.55)";

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
      hotspot: { left: "58%", top: "0%", width: "42%", height: "100%" },
    },
    description: "A pixel-art arcade game starring a gnome on a quest of his own. Built at HackKU25.",
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

function HoverCard({ children, style, ...rest }) {
  const sharedProps = {
    style: {
      position: "relative",
      backgroundColor: "#F2EEE1",
      border: "1px solid rgba(51,47,28,0.18)",
      boxShadow: "6px 7px 0 rgba(51,47,28,0.4)",
      display: "block",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      ...style,
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = "translateY(-4px) rotate(-0.6deg)";
      e.currentTarget.style.boxShadow = "8px 9px 0 rgba(51,47,28,0.4)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "translateY(0) rotate(0deg)";
      e.currentTarget.style.boxShadow = "6px 7px 0 rgba(51,47,28,0.4)";
    },
    ...rest,
  };

  return <div {...sharedProps}>{children}</div>;
}

function ActionLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.05em] transition-colors"
      style={{ color: "#000000", fontFamily: MONO_FONT, textDecoration: "none" }}
      onMouseEnter={e => (e.currentTarget.style.color = "#048BA8")}
      onMouseLeave={e => (e.currentTarget.style.color = "#000000")}
    >
      {children}
    </a>
  );
}

function SpeechHotspot({ text, hotspot, wrap = false }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: "absolute", ...hotspot }}
    >
      <div
        className="transition-opacity duration-200"
        style={{
          position: "absolute", left: "50%", top: "0%",
          transform: "translate(-50%, calc(-100% - 8px))",
          opacity: hover ? 1 : 0,
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
            whiteSpace: wrap ? "normal" : "nowrap",
            width: wrap ? "150px" : "auto",
            textAlign: wrap ? "center" : "left",
            boxShadow: "2px 2px 0 #8BA6A9",
          }}
        >
          {text}
          <span
            style={{
              position: "absolute",
              bottom: "-6px",
              left: "50%",
              width: "10px",
              height: "10px",
              backgroundColor: "#F4EBBE",
              borderRight: "1.5px solid #332F1C",
              borderBottom: "1.5px solid #332F1C",
              transform: "translateX(-50%) rotate(45deg)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function WorkCard({ project }) {
  return (
    <HoverCard>
      <div
        className={project.image ? "halftone" : "flex items-center justify-center"}
        style={{ height: "140px", backgroundColor: project.color, position: "relative", overflow: project.quip ? "visible" : "hidden" }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            style={{
              width: "100%",
              height: "140px",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
              filter: "contrast(1.05) saturate(0.92)",
            }}
          />
        ) : (
          <span style={{ fontSize: "2.75rem" }}>{project.emoji}</span>
        )}
        {project.badge && (
          <span
            className="text-[9px] font-bold uppercase tracking-[0.04em]"
            style={{
              position: "absolute",
              bottom: "0",
              right: "8px",
              whiteSpace: "nowrap",
              backgroundColor: "#000000",
              color: "#F4EBBE",
              padding: "5px 8px",
              fontFamily: MONO_FONT,
              boxShadow: "2px 2px 0 #8BA6A9",
            }}
          >
            {project.badge}
          </span>
        )}
        {project.hireMe && (
          <SpeechHotspot
            text="Hire me!"
            hotspot={{ left: "61%", top: "39%", width: "24%", height: "61%" }}
          />
        )}
        {project.quip && (
          <SpeechHotspot text={project.quip.text} hotspot={project.quip.hotspot} wrap />
        )}
      </div>

      <div className="px-5 pt-4 pb-5">
        <span className="text-[11px]" style={{ fontFamily: MONO_FONT, color: MUTED }}>{project.number}</span>
        <h3
          className="mt-1 mb-3"
          style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: "1.4rem", lineHeight: 1.1, color: "#000000" }}
        >
          {project.title}
        </h3>
        {project.description && (
          <p className="text-[13px] leading-[1.5] mb-3" style={{ fontFamily: SANS_FONT, fontWeight: 400, color: MUTED }}>
            {project.description}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-[11px]"
              style={{
                fontFamily: MONO_FONT,
                color: "#000000",
                border: "1px solid rgba(51,47,28,0.3)",
                padding: "3px 11px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          <ActionLink href={project.href}>Visit site ↗</ActionLink>
          {project.github && <ActionLink href={project.github}>GitHub ↗</ActionLink>}
        </div>
      </div>
    </HoverCard>
  );
}

function MiniProjectCard({ project }) {
  return (
    <HoverCard
      style={{ boxShadow: "4px 5px 0 rgba(51,47,28,0.4)", display: "flex" }}
      className="flex-col px-4 py-4"
    >
      <div className="flex items-center gap-4">
        <span
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: "44px",
            height: "44px",
            backgroundColor: project.color,
            border: "1px solid rgba(51,47,28,0.18)",
            fontSize: "1.2rem",
            overflow: "hidden",
          }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            project.emoji
          )}
        </span>
        <div className="flex-1">
          <h3 style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: "1rem", lineHeight: 1, color: "#000000" }}>
            {project.title}
          </h3>
          <p className="text-[11px] mt-1" style={{ fontFamily: MONO_FONT, color: MUTED }}>
            {project.subtitle}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-3">
        <ActionLink href={project.href}>Visit site ↗</ActionLink>
        {project.github && <ActionLink href={project.github}>GitHub ↗</ActionLink>}
      </div>
    </HoverCard>
  );
}

export default function WebDevPage() {
  const [nameHover, setNameHover] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ position: "relative", zIndex: 1 }}
    >
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="w-full min-h-screen px-8 md:px-16 flex flex-col items-start justify-center text-left" style={{ position: "relative", overflowX: "hidden", overflowY: "visible" }}>
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

        <div
          className="flex items-center gap-6 text-[12px] uppercase tracking-[0.05em]"
          style={{ position: "absolute", top: "2rem", right: "2rem", color: "#000000", fontFamily: MONO_FONT }}
        >
          <a
            href="https://www.linkedin.com/in/reem-fatima-856288238/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all"
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
            className="transition-all"
            style={{ color: "inherit", textDecoration: "none", fontSize: "12px" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#048BA8"; e.currentTarget.style.fontSize = "13px"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#332F1C"; e.currentTarget.style.fontSize = "12px"; }}
          >
            GitHub
          </a>
          <a
            href="mailto:reemfatima1@gmail.com"
            className="transition-all"
            style={{ color: "inherit", textDecoration: "none", fontSize: "12px" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#048BA8"; e.currentTarget.style.fontSize = "13px"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#332F1C"; e.currentTarget.style.fontSize = "12px"; }}
          >
            Email
          </a>
        </div>

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
          Designed with <InkBleedWord text="intention" />.<br />
          Built with <InkBleedWord text="understanding" />.
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

      <main className="flex-1 w-full px-8 pb-4">

        {/* ── Selected Work ────────────────────────────────── */}
        <section>
          <span className="caption-box caption-box--cyan mb-4" style={{ display: "inline-block" }}>
            Selected Work
          </span>

          {/*
          <div style={{ width: 220, height: 55 }}>
            <StarRevealWindow />
          </div>
          */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
            {SELECTED_WORK.map(project => (
              <WorkCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        {/* ── Mini Projects ────────────────────────────────── */}
        <section className="mt-12">
          <span className="caption-box caption-box--cyan mb-4" style={{ display: "inline-block" }}>
            Mini Projects
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 max-w-2xl">
            {MINI_PROJECTS.map(project => (
              <MiniProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

      </main>

      {/* ── Footer ───────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
