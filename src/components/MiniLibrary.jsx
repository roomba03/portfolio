import React, { useCallback, useEffect, useRef, useState } from "react";

const DISPLAY_FONT = "'Bangla MN', sans-serif";
const MONO_FONT = "'Courier Prime', 'Courier New', monospace";
const SANS_FONT = "'Fredoka', sans-serif";
const MUTED = "rgba(51,47,28,0.55)";

const DRAG_CLICK_THRESHOLD = 6; // px of pointer movement before a drag suppresses the click

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

function LibraryTab({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`caption-box caption-box--cyan${active ? "" : " caption-box--outline"}`}
      style={{ cursor: "pointer" }}
    >
      {label}
    </button>
  );
}

function Dots({ count, activeIndex, onSelect }) {
  if (count <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-4" role="tablist" aria-label="Card position">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to item ${i + 1}`}
          aria-current={i === activeIndex}
          onClick={() => onSelect(i)}
          style={{
            width: i === activeIndex ? "18px" : "6px",
            height: "6px",
            borderRadius: "3px",
            backgroundColor: i === activeIndex ? "#000000" : "rgba(51,47,28,0.25)",
            border: "none",
            padding: 0,
            cursor: "pointer",
            transition: "width 0.2s ease, background-color 0.2s ease",
          }}
        />
      ))}
    </div>
  );
}

function SelectedWorkSlide({ project, onOpen }) {
  return (
    <div className="snap-center shrink-0 w-full px-1" style={{ scrollSnapStop: "always" }}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => onOpen(project)}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(project);
          }
        }}
        className="block group"
        style={{
          position: "relative",
          backgroundColor: "#F2EEE1",
          border: "1px solid rgba(51,47,28,0.18)",
          boxShadow: "6px 7px 0 rgba(51,47,28,0.4)",
          cursor: "pointer",
        }}
      >
        <div
          className={project.image ? "halftone" : "flex items-center justify-center"}
          style={{ height: "170px", backgroundColor: project.color, position: "relative", overflow: "hidden" }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              style={{
                width: "100%",
                height: "170px",
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
          <div className="flex flex-wrap gap-4" onClick={e => e.stopPropagation()}>
            <ActionLink href={project.href}>Visit site ↗</ActionLink>
            {project.github && <ActionLink href={project.github}>GitHub ↗</ActionLink>}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniProjectSlide({ project }) {
  return (
    <div className="snap-center shrink-0 w-full px-1" style={{ scrollSnapStop: "always" }}>
      <div
        className="flex flex-col px-4 py-4"
        style={{
          position: "relative",
          backgroundColor: "#F2EEE1",
          border: "1px solid rgba(51,47,28,0.18)",
          boxShadow: "4px 5px 0 rgba(51,47,28,0.4)",
        }}
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
              <img src={project.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
      </div>
    </div>
  );
}

function CaseStudyModal({ project, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!project) return;
    setVisible(false);
    const raf = requestAnimationFrame(() => setVisible(true));

    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        backgroundColor: "rgba(51,47,28,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          backgroundColor: "#F2EEE1",
          border: "1px solid rgba(51,47,28,0.18)",
          boxShadow: "8px 9px 0 rgba(51,47,28,0.4)",
          maxWidth: "560px",
          width: "100%",
          maxHeight: "88vh",
          overflowY: "auto",
          transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.98)",
          transition: "transform 0.2s ease",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 2,
            width: "28px",
            height: "28px",
            backgroundColor: "#000000",
            color: "#F4EBBE",
            border: "none",
            fontFamily: MONO_FONT,
            fontSize: "14px",
            lineHeight: "28px",
            cursor: "pointer",
            boxShadow: "2px 2px 0 #8BA6A9",
          }}
        >
          ✕
        </button>

        {project.image && (
          <div className="halftone" style={{ height: "220px", backgroundColor: project.color, overflow: "hidden" }}>
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                objectPosition: "top",
                display: "block",
                filter: "contrast(1.05) saturate(0.92)",
              }}
            />
          </div>
        )}

        <div className="px-6 pt-5 pb-6">
          {project.badge && (
            <span
              className="text-[9px] font-bold uppercase tracking-[0.04em] inline-block mb-3"
              style={{ backgroundColor: "#000000", color: "#F4EBBE", padding: "5px 8px", fontFamily: MONO_FONT, boxShadow: "2px 2px 0 #8BA6A9" }}
            >
              {project.badge}
            </span>
          )}

          <h2 style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: "1.9rem", lineHeight: 1.05, color: "#000000", marginBottom: "12px" }}>
            {project.title}
          </h2>

          {project.description && (
            <p className="text-[13px] leading-[1.6] mb-5" style={{ fontFamily: SANS_FONT, color: MUTED }}>
              {project.description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.08em]" style={{ fontFamily: MONO_FONT, color: MUTED }}>
                Role
              </span>
              <p className="text-[13px] mt-1" style={{ fontFamily: MONO_FONT, color: "#000000" }}>
                {project.role || "Design & Development"}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.08em]" style={{ fontFamily: MONO_FONT, color: MUTED }}>
                Tools
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[11px]"
                    style={{ fontFamily: MONO_FONT, color: "#000000", border: "1px solid rgba(51,47,28,0.3)", padding: "2px 8px" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <ActionLink href={project.href}>Visit site ↗</ActionLink>
            {project.github && <ActionLink href={project.github}>GitHub ↗</ActionLink>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MiniLibrary({ selectedWork, miniProjects }) {
  const [tab, setTab] = useState("selected");
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalProject, setModalProject] = useState(null);
  const scrollRef = useRef(null);
  const dragRef = useRef({ dragging: false, startX: 0, startScroll: 0, moved: 0 });

  const items = tab === "selected" ? selectedWork : miniProjects;

  const scrollToIndex = useCallback((index, behavior = "smooth") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior });
  }, []);

  function handleTabChange(nextTab) {
    if (nextTab === tab) return;
    setTab(nextTab);
    setActiveIndex(0);
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: "auto" });
    });
  }

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const width = el.clientWidth || 1;
    const index = Math.round(el.scrollLeft / width);
    setActiveIndex(prev => (prev === index ? prev : index));
  }

  function onPointerDown(e) {
    if (e.pointerType === "touch") return; // native touch scrolling already handles swipe
    const el = scrollRef.current;
    if (!el) return;
    dragRef.current = { dragging: true, startX: e.clientX, startScroll: el.scrollLeft, moved: 0 };
    el.setPointerCapture(e.pointerId);
    el.style.scrollSnapType = "none";
    el.style.cursor = "grabbing";
  }

  function onPointerMove(e) {
    const state = dragRef.current;
    const el = scrollRef.current;
    if (!state.dragging || !el) return;
    const dx = e.clientX - state.startX;
    state.moved = Math.max(state.moved, Math.abs(dx));
    el.scrollLeft = state.startScroll - dx;
  }

  function endDrag(e) {
    const state = dragRef.current;
    const el = scrollRef.current;
    if (!state.dragging || !el) return;
    state.dragging = false;
    el.style.scrollSnapType = "x mandatory";
    el.style.cursor = "grab";
    try { el.releasePointerCapture(e.pointerId); } catch { /* pointer already released */ }
    const width = el.clientWidth || 1;
    const index = Math.round(el.scrollLeft / width);
    scrollToIndex(index);
    setActiveIndex(index);
  }

  function handleCardOpen(project) {
    if (dragRef.current.moved > DRAG_CLICK_THRESHOLD) return; // this click was really a drag release
    setModalProject(project);
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <LibraryTab label="Selected Work" active={tab === "selected"} onClick={() => handleTabChange("selected")} />
        <LibraryTab label="Mini Projects" active={tab === "mini"} onClick={() => handleTabChange("mini")} />
      </div>

      <div className="w-full max-w-md mx-auto">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
          style={{ cursor: "grab" }}
        >
          {items.map(project =>
            tab === "selected" ? (
              <SelectedWorkSlide key={project.title} project={project} onOpen={handleCardOpen} />
            ) : (
              <MiniProjectSlide key={project.title} project={project} />
            )
          )}
        </div>

        <Dots
          count={items.length}
          activeIndex={activeIndex}
          onSelect={i => {
            scrollToIndex(i);
            setActiveIndex(i);
          }}
        />
      </div>

      <CaseStudyModal project={modalProject} onClose={() => setModalProject(null)} />
    </div>
  );
}
