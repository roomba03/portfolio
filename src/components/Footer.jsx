import React from "react";

const MONO_FONT = "'Courier Prime', 'Courier New', monospace";

const linkStyle = { color: "#000000", textDecoration: "none" };
const handleEnter = (e) => { e.currentTarget.style.color = "#048BA8"; };
const handleLeave = (e) => { e.currentTarget.style.color = "#332F1C"; };

// `contained` narrows the inner row to match a case-study page's reading
// width; the home page footer stays full-bleed.
export default function Footer({ contained = false }) {
  return (
    <footer
      className={contained ? "py-10" : "py-9"}
      style={{ borderTop: "1px solid rgba(51,47,28,0.18)", backgroundColor: "#FAF8EF", position: "relative", zIndex: 1 }}
    >
      <div
        className={`${contained ? "max-w-4xl mx-auto px-6" : "px-8"} flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] uppercase tracking-[0.05em]`}
        style={{ color: "#000000", fontFamily: MONO_FONT }}
      >
        <span style={{ color: "#000000" }}>
          Reem Fatima
        </span>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/reem-fatima-856288238/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={linkStyle}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/roomba03"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            style={linkStyle}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            GitHub
          </a>
          <a
            href="mailto:reemfatima1@gmail.com"
            className="transition-colors"
            style={linkStyle}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            reemfatima1@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
