import React, { useState } from "react";
import { Link } from "react-router-dom";
import FogWindow from "../components/FogWindow";
import StarRevealWindow from "../components/StarRevealWindow";
import Footer from "../components/Footer";
import InkBleedWord from "../components/InkBleedWord";
// import StampedImage from "../components/StampedImage";

const DISPLAY_FONT = "'Bangla MN', sans-serif";
const MONO_FONT = "'Courier Prime', 'Courier New', monospace";

export default function WebDevPage() {
  const [nameHover, setNameHover] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ position: "relative", zIndex: 1 }}
    >
      <span
        className="caption-box"
        style={{ position: "fixed", bottom: "1rem", right: "1rem", zIndex: 50 }}
      >
        Web Dev Build
      </span>

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
          <span className="caption-box mb-4" style={{ display: "inline-block" }}>
            Selected Work
          </span>

          <div style={{ width: 220, height: 55 }}>
            <StarRevealWindow />
          </div>

          <div className="flex flex-col mt-6 max-w-xl" style={{ borderTop: "1px solid rgba(51,47,28,0.18)" }}>
            {[
              { title: "Busy Bunny", to: "/work/busy-bunny", internal: true },
              { title: "Side Quest", href: "https://eecs582-sidequest.vercel.app" },
              { title: "Gnometastic Gnomular Quest", href: "https://thegnomefour.vercel.app" },
            ].map((project) => {
              const content = (
                <>
                  <h3
                    style={{
                      fontFamily: DISPLAY_FONT, fontWeight: 700,
                      fontSize: "1.4rem",
                      lineHeight: 1,
                      color: "#000000",
                    }}
                  >
                    {project.title}
                  </h3>
                  <span
                    className="text-[18px] transition-colors"
                    style={{ color: "#000000", fontFamily: MONO_FONT }}
                  >
                    →
                  </span>
                </>
              );

              const sharedProps = {
                className: "flex items-center justify-between py-5 group",
                style: { borderBottom: "1px solid rgba(51,47,28,0.18)", textDecoration: "none" },
                onMouseEnter: e => { e.currentTarget.style.color = "#048BA8"; },
                onMouseLeave: e => { e.currentTarget.style.color = "#000000"; },
              };

              return project.internal ? (
                <Link key={project.title} to={project.to} {...sharedProps}>
                  {content}
                </Link>
              ) : (
                <a
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...sharedProps}
                >
                  {content}
                </a>
              );
            })}
          </div>
        </section>

      </main>

      {/* ── Footer ───────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
