import React from "react";

export default function ImagePlaceholder({ label, aspect = "aspect-video" }) {
  return (
    <div
      className={`${aspect} w-full halftone flex items-center justify-center`}
      style={{ position: "relative", backgroundColor: "#A8A8A8", border: "1.5px solid #000000", boxShadow: "4px 4px 0 0 #000000" }}
    >
      <span
        className="text-[11px] font-bold uppercase tracking-[0.08em]"
        style={{ color: "#000000", fontFamily: "'Courier Prime', 'Courier New', monospace", position: "relative" }}
      >
        {label}
      </span>
    </div>
  );
}
