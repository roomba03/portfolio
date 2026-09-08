import React, { useState } from "react";
import useCopyEmail from "../hooks/useCopyEmail";

const EMAIL = "reemfatima1@gmail.com";
const MONO_FONT = "'Courier Prime', 'Courier New', monospace";

const linkStyle = { color: "#000000", textDecoration: "none" };
const handleEnter = (e) => { e.currentTarget.style.color = "#048BA8"; };
const handleLeave = (e) => { e.currentTarget.style.color = "#332F1C"; };

// `contained` narrows the inner row to match a case-study page's reading
// width; the home page footer stays full-bleed.
export default function Footer({ contained = false }) {
  const { copied, handleClick } = useCopyEmail(EMAIL);
  const [emailHover, setEmailHover] = useState(false);
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
          <span style={{ position: "relative", display: "inline-block" }}>
            <a
              href={`mailto:${EMAIL}`}
              className="transition-colors"
              style={linkStyle}
              onMouseEnter={(e) => { handleEnter(e); setEmailHover(true); }}
              onMouseLeave={(e) => { handleLeave(e); setEmailHover(false); }}
              onClick={handleClick}
              aria-live="polite"
            >
              {copied ? "Copied!" : EMAIL}
            </a>
            <span
              role="tooltip"
              aria-hidden={!emailHover}
              className="transition-opacity duration-200"
              style={{
                position: "absolute",
                left: "50%",
                bottom: "100%",
                transform: "translate(-50%, -8px)",
                opacity: emailHover ? 1 : 0,
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  backgroundColor: "#F4EBBE",
                  border: "1.5px solid #332F1C",
                  borderRadius: "10px",
                  padding: "3px 10px",
                  fontSize: "11px",
                  fontWeight: 700,
                  fontFamily: MONO_FONT,
                  color: "#000000",
                  textTransform: "none",
                  letterSpacing: "normal",
                  whiteSpace: "nowrap",
                  boxShadow: "2px 2px 0 #8BA6A9",
                }}
              >
                reach out!
                <span
                  aria-hidden="true"
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
              </span>
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
