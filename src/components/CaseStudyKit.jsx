import { ACCENT, DISPLAY_FONT, MONO_FONT } from "./caseStudyTheme";

// Building blocks shared by the case study pages (Two Dish, Busy Bunny, This Portfolio).

export function SectionHeading({ children }) {
  return (
    <h2
      className="mb-4"
      style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: "2rem", lineHeight: 0.95, color: "#000000" }}
    >
      {children}
    </h2>
  );
}

export function Tag({ children }) {
  return (
    <span
      className="text-[10px] font-bold uppercase tracking-[0.05em]"
      style={{
        display: "inline-block",
        backgroundColor: "#000000",
        color: "#F4EBBE",
        padding: "4px 8px",
        fontFamily: MONO_FONT,
        boxShadow: `2px 2px 0 ${ACCENT}`,
      }}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children }) {
  return (
    <span className="caption-box mb-3" style={{ display: "inline-block" }}>
      {children}
    </span>
  );
}

export function Prose({ children }) {
  return (
    <p style={{ color: "#000000", fontFamily: MONO_FONT }} className="text-[13px] leading-[1.8]">{children}</p>
  );
}

export function Card({ children, className = "" }) {
  return <div className={`py-6 ${className}`}>{children}</div>;
}

export function Bullet() {
  return (
    <span
      className="mt-[7px] flex-shrink-0"
      style={{
        width: "6px",
        height: "6px",
        backgroundColor: ACCENT,
      }}
    />
  );
}

export function ActionButton({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-5 py-2.5 border-2 text-[12px] font-bold uppercase tracking-[0.08em]"
      style={{ borderColor: "#000000", color: "#000000", backgroundColor: "transparent", fontFamily: MONO_FONT, boxShadow: "4px 4px 0 0 #000000", transform: "translate(0, 0)", transition: "transform 0.12s ease, box-shadow 0.12s ease, background-color 0.12s ease, color 0.12s ease" }}
      onMouseEnter={e => { e.currentTarget.style.backgroundColor = ACCENT; e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = "#F4EBBE"; e.currentTarget.style.transform = "translate(2px, 2px)"; e.currentTarget.style.boxShadow = "2px 2px 0 0 #000000"; }}
      onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "#000000"; e.currentTarget.style.color = "#000000"; e.currentTarget.style.transform = "translate(0, 0)"; e.currentTarget.style.boxShadow = "4px 4px 0 0 #000000"; }}
    >
      {children}
    </a>
  );
}
