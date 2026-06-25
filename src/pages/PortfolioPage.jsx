import React, { useState } from "react";
import { Link } from "react-router-dom";
import FogWindow from "../components/FogWindow";
import StarRevealWindow from "../components/StarRevealWindow";
import Footer from "../components/Footer";
import InkBleedWord from "../components/InkBleedWord";
// import StampedImage from "../components/StampedImage";

const DISPLAY_FONT = "'Bangla MN', sans-serif";
const MONO_FONT = "'Courier Prime', 'Courier New', monospace";

function SkillTag({ children }) {
  return (
    <span
      className="text-[10px] font-bold uppercase tracking-[0.05em]"
      style={{
        backgroundColor: "#000000",
        color: "#F4EBBE",
        padding: "4px 8px",
        fontFamily: MONO_FONT,
        boxShadow: "2px 2px 0 #8BA6A9",
      }}
    >
      {children}
    </span>
  );
}

export default function PortfolioPage() {
  const [bunnyHover, setBunnyHover] = useState(false);
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
            <Link
              to="/work/busy-bunny"
              className="block group"
              style={{
                position: "relative",
                backgroundColor: "#F2EEE1",
                border: "1px solid rgba(51,47,28,0.18)",
                boxShadow: "6px 7px 0 rgba(51,47,28,0.4)",
                textDecoration: "none",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px) rotate(-1.5deg)";
                e.currentTarget.style.boxShadow = "8px 9px 0 rgba(51,47,28,0.4)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0) rotate(0deg)";
                e.currentTarget.style.boxShadow = "6px 7px 0 rgba(51,47,28,0.4)";
              }}
            >
              <div className="halftone" style={{ overflow: "hidden", position: "relative", height: "140px" }}>
                <img
                  src="/busy-bunny-main.png"
                  alt="Busy Bunny app screenshot"
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                    objectPosition: "top",
                    display: "block",
                    filter: "contrast(1.05) saturate(0.92)",
                  }}
                />
                <div
                  onMouseEnter={() => setBunnyHover(true)}
                  onMouseLeave={() => setBunnyHover(false)}
                  style={{ position: "absolute", left: "61%", top: "39%", width: "24%", height: "61%" }}
                >
                  <div
                    className="transition-opacity duration-200"
                    style={{
                      position: "absolute", left: "50%", top: "0%",
                      transform: "translate(-50%, calc(-100% - 8px))",
                      opacity: bunnyHover ? 1 : 0,
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
                      Hire me!
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
              </div>

              <div className="px-5 pt-5 pb-6">
                <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                  <SkillTag>Winner of Most Creative UI/UX</SkillTag>
                </div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: DISPLAY_FONT, fontWeight: 700,
                    fontSize: "1.5rem",
                    lineHeight: 1,
                    color: "#000000",
                  }}
                >
                  Busy Bunny
                </h3>
                <p
                  className="text-[12px] leading-[1.6] mb-4"
                  style={{ fontFamily: MONO_FONT, color: "#000000" }}
                >
                  Gamified productivity system. Built in 36 hours at HackKU26.
                </p>
                <span
                  className="text-[11px] uppercase tracking-[0.05em] transition-colors"
                  style={{ color: "#000000", fontFamily: MONO_FONT }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#048BA8")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#000000")}
                >
                  Read case study →
                </span>
              </div>
            </Link>

            <div
              className="flex flex-col items-center justify-center text-center px-5 py-10"
              style={{
                position: "relative",
                backgroundColor: "#D2DAC5",
                border: "1px dashed rgba(51,47,28,0.25)",
                boxShadow: "6px 7px 0 rgba(51,47,28,0.4)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px) rotate(-0.6deg)";
                e.currentTarget.style.boxShadow = "8px 9px 0 rgba(51,47,28,0.4)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0) rotate(0deg)";
                e.currentTarget.style.boxShadow = "6px 7px 0 rgba(51,47,28,0.4)";
              }}
            >
              <span
                className="text-[11px] font-bold uppercase tracking-[0.08em] px-2.5 py-1 border inline-block mb-3"
                style={{ borderColor: "rgba(51,47,28,0.3)", color: "#000000", fontFamily: MONO_FONT }}
              >
                Upcoming
              </span>
              <p className="text-[12px]" style={{ fontFamily: MONO_FONT, color: "#000000" }}>
                Case study in progress
              </p>
            </div>

            <div
              className="flex flex-col items-center justify-center text-center px-5 py-10"
              style={{
                position: "relative",
                backgroundColor: "#D2DAC5",
                border: "1px dashed rgba(51,47,28,0.25)",
                boxShadow: "6px 7px 0 rgba(51,47,28,0.4)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px) rotate(-0.6deg)";
                e.currentTarget.style.boxShadow = "8px 9px 0 rgba(51,47,28,0.4)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0) rotate(0deg)";
                e.currentTarget.style.boxShadow = "6px 7px 0 rgba(51,47,28,0.4)";
              }}
            >
              <span
                className="text-[11px] font-bold uppercase tracking-[0.08em] px-2.5 py-1 border inline-block mb-3"
                style={{ borderColor: "rgba(51,47,28,0.3)", color: "#000000", fontFamily: MONO_FONT }}
              >
                Upcoming
              </span>
              <p className="text-[12px]" style={{ fontFamily: MONO_FONT, color: "#000000" }}>
                Case study in progress
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ───────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
