import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const DISPLAY_FONT = "'Bangla MN', sans-serif";
const MONO_FONT = "'Courier Prime', 'Courier New', monospace";
const SANS_FONT = "'Fredoka', sans-serif";
const MUTED = "rgba(51,47,28,0.55)";

const DRAG_CLICK_THRESHOLD = 6; // px of pointer movement before a drag suppresses the click

const CARD_WIDTH = "min(420px, 78vw)"; // active-card width; the rest of the full-bleed track is peek space
const EDGE_INSET = `calc(50% - (${CARD_WIDTH}) / 2)`; // side padding that centers the first/last card

// Measures the live per-slide scroll step (slide width + gap) instead of assuming
// one slide == the container width, since slides no longer fill the track.
function getStep(el) {
  if (!el || !el.firstElementChild) return el ? el.clientWidth || 1 : 1;
  const gap = parseFloat(window.getComputedStyle(el).columnGap || "0") || 0;
  return el.firstElementChild.getBoundingClientRect().width + gap;
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

// Same look as ActionLink, but an internal route (no target=_blank/rel).
function CaseStudyLink({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.05em] transition-colors"
      style={{ color: "#000000", fontFamily: MONO_FONT, textDecoration: "none" }}
      onMouseEnter={e => (e.currentTarget.style.color = "#048BA8")}
      onMouseLeave={e => (e.currentTarget.style.color = "#000000")}
    >
      {children}
    </Link>
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

function SelectedWorkSlide({ project, active, expanded, onToggle }) {
  return (
    <div className="snap-center shrink-0" style={{ width: CARD_WIDTH, scrollSnapStop: "always" }}>
      <div
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onClick={() => onToggle(project.title)}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle(project.title);
          }
        }}
        className="block group"
        style={{
          position: "relative",
          backgroundColor: "#F2EEE1",
          border: "1px solid rgba(51,47,28,0.18)",
          boxShadow: "6px 7px 0 rgba(51,47,28,0.4)",
          cursor: "pointer",
          transform: active ? "scale(1)" : "scale(0.86)",
          opacity: active ? 1 : 0.4,
          transition: "transform 0.35s ease, opacity 0.35s ease",
        }}
      >
        <div
          className={project.image ? "halftone" : "flex items-center justify-center"}
          style={{
            height: expanded ? "230px" : "170px",
            backgroundColor: project.color,
            position: "relative",
            overflow: project.quip ? "visible" : "hidden",
            transition: "height 0.3s ease",
          }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              style={{
                width: "100%",
                height: "100%",
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
          {active && project.hireMe && (
            <SpeechHotspot
              text="Hire me!"
              hotspot={{ left: "61%", top: "39%", width: "24%", height: "61%" }}
            />
          )}
          {/*
          {active && project.quip && (
            <SpeechHotspot text={project.quip.text} hotspot={project.quip.hotspot} wrap />
          )}
          */}
        </div>

        <div className="px-5 pt-4 pb-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px]" style={{ fontFamily: MONO_FONT, color: MUTED }}>{project.number}</span>
            <span
              aria-hidden="true"
              className="text-[10px]"
              style={{
                fontFamily: MONO_FONT,
                color: MUTED,
                display: "inline-block",
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.25s ease",
              }}
            >
              ▾
            </span>
          </div>
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

          <div style={{ display: "grid", gridTemplateRows: expanded ? "1fr" : "0fr", transition: "grid-template-rows 0.3s ease" }}>
            <div style={{ overflow: "hidden", minHeight: 0 }}>
              <div style={{ opacity: expanded ? 1 : 0, transition: "opacity 0.25s ease 0.05s", paddingBottom: "12px" }}>
                <span className="text-[10px] uppercase tracking-[0.08em]" style={{ fontFamily: MONO_FONT, color: MUTED }}>
                  Role
                </span>
                <p className="text-[13px] mt-1" style={{ fontFamily: MONO_FONT, color: "#000000" }}>
                  {project.role || "Design & Development"}
                </p>
              </div>
            </div>
          </div>

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
            {project.caseStudyHref && <CaseStudyLink to={project.caseStudyHref}>Case study →</CaseStudyLink>}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniProjectSlide({ project, active }) {
  return (
    <div className="snap-center shrink-0" style={{ width: CARD_WIDTH, scrollSnapStop: "always" }}>
      <div
        className="flex flex-col px-4 py-4"
        style={{
          position: "relative",
          backgroundColor: "#F2EEE1",
          border: "1px solid rgba(51,47,28,0.18)",
          boxShadow: "4px 5px 0 rgba(51,47,28,0.4)",
          transform: active ? "scale(1)" : "scale(0.86)",
          opacity: active ? 1 : 0.4,
          transition: "transform 0.35s ease, opacity 0.35s ease",
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

// Placeholder slide appended after the real cards when a set only has one
// or two entries, so scrolling past the last card reads as "there's more
// coming" rather than the carousel just running out.
function MoreToComeSlide({ active }) {
  return (
    <div className="snap-center shrink-0" style={{ width: CARD_WIDTH, scrollSnapStop: "always" }}>
      <div
        className="flex flex-col items-center justify-center text-center px-6 py-14"
        style={{
          border: "1px dashed rgba(51,47,28,0.3)",
          transform: active ? "scale(1)" : "scale(0.86)",
          opacity: active ? 1 : 0.4,
          transition: "transform 0.35s ease, opacity 0.35s ease",
        }}
      >
        <span
          className="text-[11px] uppercase tracking-[0.08em]"
          style={{ fontFamily: MONO_FONT, color: MUTED }}
        >
          More to come
        </span>
      </div>
    </div>
  );
}

const TAB_SWITCH_MS = 200; // must match the track's fade transition duration below

export default function MiniLibrary({ selectedWork, miniProjects, comingSoon = false }) {
  const hasMiniProjects = Boolean(miniProjects && miniProjects.length);

  const [tab, setTab] = useState("selected"); // drives the tab pills — updates instantly on click
  const [visibleTab, setVisibleTab] = useState("selected"); // drives rendered cards — updates after the fade-out
  const [switching, setSwitching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedTitle, setExpandedTitle] = useState(null);
  const [trackMinHeight, setTrackMinHeight] = useState(null);
  const scrollRef = useRef(null);
  const dragRef = useRef({ dragging: false, startX: 0, startScroll: 0, moved: 0 });
  const switchTimeoutRef = useRef(null);

  const items = visibleTab === "selected" ? selectedWork : miniProjects || [];
  const showComingSoon = comingSoon && visibleTab === "selected";
  const slideCount = items.length + (showComingSoon ? 1 : 0);

  useEffect(() => () => clearTimeout(switchTimeoutRef.current), []);

  // The Mini Projects track should reserve the same height as the (taller)
  // Selected Work track rather than shrinking, so it's measured only while
  // viewing Selected Work in its collapsed state and reused for both tabs.
  useEffect(() => {
    if (visibleTab !== "selected" || expandedTitle) return;
    const el = scrollRef.current;
    if (!el) return;

    function measure() {
      const heights = Array.from(el.children).map(child => child.getBoundingClientRect().height);
      if (heights.length) setTrackMinHeight(Math.max(...heights));
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [visibleTab, expandedTitle]);

  const scrollToIndex = useCallback((index, behavior = "smooth") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * getStep(el), behavior });
  }, []);

  function handleTabChange(nextTab) {
    if (nextTab === tab) return;
    setTab(nextTab); // pill switches immediately for instant feedback
    setExpandedTitle(null);
    setSwitching(true); // cards fade out, then swap underneath while invisible
    clearTimeout(switchTimeoutRef.current);
    switchTimeoutRef.current = setTimeout(() => {
      setVisibleTab(nextTab);
      setActiveIndex(0);
      if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: "auto" });
      requestAnimationFrame(() => setSwitching(false));
    }, TAB_SWITCH_MS);
  }

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / getStep(el));
    if (index !== activeIndex) {
      setActiveIndex(index);
      setExpandedTitle(null); // the card that was expanded just scrolled out of view
    }
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
    if (state.moved <= DRAG_CLICK_THRESHOLD) return; // no real movement — this was a click, let onClick handle it
    const index = Math.round(el.scrollLeft / getStep(el));
    scrollToIndex(index);
    setActiveIndex(index);
    setExpandedTitle(null);
  }

  function handleCardToggle(title) {
    if (dragRef.current.moved > DRAG_CLICK_THRESHOLD) return; // this click was really a drag release
    setExpandedTitle(prev => (prev === title ? null : title));
  }

  const chromeStyle = { opacity: expandedTitle ? 0.45 : 1, transition: "opacity 0.25s ease" };

  return (
    <div>
      <div className="flex items-center gap-3 mb-5" style={chromeStyle}>
        <LibraryTab label="Selected Work" active={tab === "selected"} onClick={() => handleTabChange("selected")} />
        {hasMiniProjects && (
          <LibraryTab label="Mini Projects" active={tab === "mini"} onClick={() => handleTabChange("mini")} />
        )}
      </div>

      {/* Full-bleed track: breaks out of the page's px-8 gutters so off-screen
          cards can peek in at the very edge of the viewport. */}
      <div className="-mx-8">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4"
          style={{
            cursor: "grab",
            alignItems: "center",
            paddingLeft: EDGE_INSET,
            paddingRight: EDGE_INSET,
            minHeight: trackMinHeight || undefined,
            opacity: switching ? 0 : 1,
            transform: switching ? "translateY(8px)" : "translateY(0)",
            transition: `opacity ${TAB_SWITCH_MS}ms ease, transform ${TAB_SWITCH_MS}ms ease`,
            pointerEvents: switching ? "none" : "auto",
          }}
        >
          {items.map((project, i) =>
            visibleTab === "selected" ? (
              <SelectedWorkSlide
                key={project.title}
                project={project}
                active={i === activeIndex}
                expanded={expandedTitle === project.title}
                onToggle={handleCardToggle}
              />
            ) : (
              <MiniProjectSlide key={project.title} project={project} active={i === activeIndex} />
            )
          )}
          {showComingSoon && <MoreToComeSlide active={items.length === activeIndex} />}
        </div>
      </div>

      <div style={{ opacity: switching ? 0 : expandedTitle ? 0.45 : 1, transition: `opacity ${TAB_SWITCH_MS}ms ease` }}>
        <Dots
          count={slideCount}
          activeIndex={activeIndex}
          onSelect={i => {
            scrollToIndex(i);
            setActiveIndex(i);
            setExpandedTitle(null);
          }}
        />
      </div>
    </div>
  );
}
