import React from "react";
import { Link } from "react-router-dom";

const DISPLAY_FONT = "'Bangla MN', sans-serif";
const MONO_FONT = "'Courier Prime', 'Courier New', monospace";

export default function CaseStudyCard({
  title,
  tags,
  description,
  award,
  href,
}) {
  return (
    <Link
      to={href}
      className="block p-8"
      style={{
        position: "relative",
        backgroundColor: "#A7CECB",
        border: "1px solid rgba(51,47,28,0.18)",
        boxShadow: "6px 7px 0 rgba(51,47,28,0.92)",
        textDecoration: "none",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px) rotate(-1.5deg)";
        e.currentTarget.style.boxShadow = "8px 9px 0 rgba(51,47,28,0.92)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0) rotate(0deg)";
        e.currentTarget.style.boxShadow = "6px 7px 0 rgba(51,47,28,0.92)";
      }}
    >
      <span className="corner-bracket corner-bracket--tl" aria-hidden="true" />
      <span className="corner-bracket corner-bracket--br" aria-hidden="true" />

      <h3
        className="mb-4"
        style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: "2.4rem", lineHeight: 0.95, color: "#000000" }}
      >
        {title}
      </h3>

      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-bold uppercase tracking-[0.08em] px-0.5 py-1 border-b-2"
            style={{ color: "#000000", borderColor: "#8BA6A9", fontFamily: MONO_FONT }}
          >
            {tag}
          </span>
        ))}
      </div>

      <p style={{ color: "#000000", fontFamily: MONO_FONT }} className="text-[13px] leading-[1.75] mb-5 max-w-[34rem]">
        {description}
      </p>

      {award && (
        <span
          className="text-[11px] font-bold uppercase tracking-[0.05em] px-2.5 py-1 border inline-block"
          style={{ borderColor: "#332F1C", color: "#000000", fontFamily: MONO_FONT }}
        >
          {award}
        </span>
      )}
    </Link>
  );
}
