import React from "react";
import { Link } from "react-router-dom";
import ImagePlaceholder from "../components/ImagePlaceholder";
import Footer from "../components/Footer";

const ACCENT = "#75979A";
const CALLOUT = "#D2DAC5";
const DISPLAY_FONT = "'Bangla MN', sans-serif";
const MONO_FONT = "'Courier Prime', 'Courier New', monospace";

function SectionHeading({ children }) {
  return (
    <h2
      className="mb-4"
      style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: "2rem", lineHeight: 0.95, color: "#000000" }}
    >
      {children}
    </h2>
  );
}

function Tag({ children }) {
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

function Eyebrow({ children }) {
  return (
    <span className="caption-box mb-3" style={{ display: "inline-block" }}>
      {children}
    </span>
  );
}

function Prose({ children }) {
  return (
    <p style={{ color: "#000000", fontFamily: MONO_FONT }} className="text-[13px] leading-[1.8]">{children}</p>
  );
}

function Card({ children, className = "" }) {
  return <div className={`py-6 ${className}`}>{children}</div>;
}

function Bullet() {
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

function ActionButton({ href, children }) {
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

export default function PortfolioSitePage() {
  return (
    <div className="min-h-screen" style={{ position: "relative", zIndex: 1 }}>
      {/* Nav */}
      <nav className="max-w-4xl mx-auto px-6 pt-8 pb-4">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.06em] transition-colors"
          style={{ color: "#000000", fontFamily: MONO_FONT }}
          onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
          onMouseLeave={e => (e.currentTarget.style.color = "#000000")}
        >
          <span aria-hidden="true">←</span> All work
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pb-24 space-y-10">
        {/* Header card */}
        <Card>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-6">
            {["Product Design", "Interaction Design", "Accessibility", "Personal Project"].map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <h1
            className="mb-5"
            style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: "clamp(2.6rem, 6vw, 4.2rem)", lineHeight: 1.1, color: "#000000" }}
          >
            This Portfolio — One Codebase, Two Audiences
          </h1>
          <span
            className="text-[18px] font-bold uppercase tracking-[0.1em] inline-block mb-3"
            style={{ color: ACCENT, fontFamily: MONO_FONT }}
          >
            Personal project — ongoing since June 2026
          </span>
          <p className="text-[14px] leading-[1.8] mb-6 max-w-2xl" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            A case study about the site you're reading it on, and what changed when I started
            testing my own interactions instead of just designing them.
          </p>
          <div className="flex flex-wrap gap-3">
            <ActionButton href="https://reemfatimaportfolio.vercel.app/">Live Site</ActionButton>
            <ActionButton href="https://github.com/roomba03">GitHub</ActionButton>
          </div>
        </Card>

        <div className="halftone" style={{ position: "relative", border: "1px solid rgba(51,47,28,0.16)" }}>
          <img
            src="/portfolio-site-main.png"
            alt="This portfolio's homepage — hero headline reading 'Designed with intention. Built with understanding.'"
            className="w-full"
            style={{ display: "block" }}
          />
          <span style={{ position: "absolute", bottom: "12px", left: "12px" }}>
            <Tag>Fig. 01 — Homepage</Tag>
          </span>
        </div>

        {/* Overview */}
        <Card>
          <SectionHeading>Overview</SectionHeading>
          <Prose>
            This site is my own portfolio, and also the longest-running project I own end to end.
            It started as a single static page in June 2026 and has been rebuilt in place ever
            since — the same repository now ships two different portfolios from one component
            library: a product-design-focused version for recruiters and a code-focused version
            for engineers, toggled by which URL you land on.
          </Prose>
          <p className="leading-[1.8] mt-4 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            Because I'm both the designer and the only user I can watch in real time, this project
            became less about drafting a layout once and more about noticing where my own first
            version was wrong — a hard-cut tab switch that read as broken, a modal that felt
            heavier than the content deserved, a scroll transition that stopped short of where it
            should land — and rebuilding until it wasn't.
          </p>
        </Card>

        {/* My Role */}
        <Card>
          <SectionHeading>My Role</SectionHeading>
          <Prose>
            Solo project. Every commit in this repository is mine, spanning design and
            implementation together rather than in separate passes.
          </Prose>
          <ul className="mt-4 space-y-2">
            {[
              "Product definition — deciding the site needed two audiences, not one",
              "Interaction and motion design for the project carousel",
              "Visual design system — type, color, shadow, and shape language",
              "Frontend implementation (React, Vite, Tailwind, React Router)",
              "Accessibility and performance auditing against Lighthouse and WCAG 2.2",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[13px] leading-[1.7]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
                <Bullet />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        {/* The Problem */}
        <Card>
          <SectionHeading>The Problem</SectionHeading>
          <Prose>
            A portfolio has to convince two different readers with two different jobs. A recruiter
            or hiring manager wants to feel the work — visual craft, the story behind a decision,
            whether the taste is theirs. An engineer wants to see the work — the actual repo, the
            stack, whether the code behind the polish is real. Most portfolios pick one reader and
            make the other one dig.
          </Prose>
          <blockquote className="my-6 pl-5 border-l-2" style={{ borderColor: "#332F1C" }}>
            <p className="italic leading-[1.7] text-[16px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              Maintaining two separate sites means every project update happens twice, or one
              version quietly goes stale. Neither is acceptable for a portfolio meant to be
              current.
            </p>
          </blockquote>
          <div className="grid sm:grid-cols-2 gap-6 mt-4">
            <div>
              <Eyebrow>What a single version costs</Eyebrow>
              <ul className="space-y-2 mt-3">
                {[
                  "A product-design framing buries the GitHub links engineers want first",
                  "A code-first framing buries the narrative recruiters want first",
                  "One card format can't serve both a case study and a repo link equally well",
                  "Updating one project means remembering to update it twice",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] leading-[1.7]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
                    <Bullet />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>What stayed constant either way</Eyebrow>
              <ul className="space-y-2 mt-3">
                {[
                  "The same project data and screenshots",
                  "The same carousel, motion language, and type system",
                  "The same accessibility and performance bar",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] leading-[1.7]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
                    <Bullet />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-7 px-6 py-5" style={{ backgroundColor: CALLOUT }}>
            <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              Central design question
            </span>
            <p className="font-medium leading-[1.7] mt-2 text-[14px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              How might we show the same body of work to two different readers without
              maintaining two different portfolios?
            </p>
          </div>
        </Card>

        {/* Design Approach */}
        <Card>
          <SectionHeading>Design Approach</SectionHeading>
          <Prose>
            Rather than design each project card twice, I kept one shared component library and
            let the data feeding it — and a couple of conditionals — do the work of speaking to
            each audience differently:
          </Prose>
          <ul className="mt-5 space-y-3">
            {[
              "What can stay exactly the same across both versions?",
              "What's the smallest data difference that changes the reader's experience?",
              "When my own first attempt at an interaction feels off, what specifically is wrong with it?",
            ].map((q) => (
              <li key={q} className="flex items-start gap-3 leading-[1.7] text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
                <span className="font-bold" style={{ color: ACCENT }}>→</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
          <p className="leading-[1.8] mt-5 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            That question about my own reaction to an interaction ended up doing the most work.
            A large share of this project's history is one round of shipping something, using it
            for real, and rebuilding the part that felt wrong — not redesigning from scratch, but
            replacing one mechanism with another closer one.
          </p>
        </Card>

        {/* Core Design Decisions */}
        <section>
          <Eyebrow>Core Design Decisions</Eyebrow>
          <div className="grid sm:grid-cols-2 gap-6 mt-5">
            {[
              {
                number: "01",
                title: "One Component, Two Data Sets",
                body: "Both portfolio variants render through the same Mini Library carousel component. The product-design version's cards carry a caseStudyHref and expand to show role/process detail; the web-dev version's cards carry href and github fields and skip the case-study link entirely. A build-time env var picks the default route, and a global '9' keyboard shortcut lets anyone toggle between them live — the same visit, either audience.",
              },
              {
                number: "02",
                title: "Expand-in-Place, Not a Modal",
                body: "The first version of the project carousel opened a full modal overlay per card. After using it, the modal felt like more ceremony than a short case-study blurb warranted — it interrupted the scroll instead of extending it. It was replaced with cards that grow in place: a taller preview image and a revealed role block, with only one card ever expanded at a time.",
              },
              {
                number: "03",
                title: "Motion That Earns Its Keep",
                body: "Tab switches fade the card track out, swap its content while invisible, then fade it back in, instead of hard-cutting content mid-click. The hero-to-carousel scroll transition settles into a full view of one section or the other via a debounced scroll-check, because native CSS scroll-snap proved unpredictable in testing and was swapped out for JS that behaves the same way every time.",
              },
              {
                number: "04",
                title: "Accessibility as a Pass, Not an Afterthought",
                body: "A dedicated sweep fixed a skipped heading level, added visible focus rings site-wide, grew touch targets to WCAG 2.2 minimums, corrected an ARIA role misuse on the carousel dots, and made faded peek cards inert so keyboard users can't tab into cards that are only 40% visible. Paired with a Lighthouse pass for contrast, font-loading strategy, and a robots.txt the SPA's catch-all rewrite had been silently swallowing.",
              },
            ].map(({ number, title, body }) => (
              <Card key={number}>
                <span style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: "3.4rem", lineHeight: 1, color: ACCENT }}>{number}</span>
                <h3
                  className="mt-1 mb-3"
                  style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: "1.5rem", lineHeight: 1, color: "#000000" }}
                >
                  {title}
                </h3>
                <p className="text-[13px] leading-[1.7]" style={{ color: "#000000", fontFamily: MONO_FONT }}>{body}</p>
              </Card>
            ))}
          </div>
        </section>

        <ImagePlaceholder label="Selected Work carousel — collapsed and expanded card states" />

        {/* Shadows as Affordance */}
        <Card>
          <SectionHeading>Shadows as Affordance</SectionHeading>
          <Prose>
            On this site, a hard offset shadow is shorthand for &ldquo;you can press this.&rdquo; Once
            I started treating it as a promise rather than decoration, I found three places where
            the shadows were saying the wrong thing:
          </Prose>
          <ul className="mt-5 space-y-4">
            {[
              {
                label: "Role tags",
                body: "The Web Developer and UX Engineer tags in the hero carried the same crisp offset shadow as real buttons, so they invited clicks they couldn't answer. I tried softening it into a glow, and briefly a hover state that flattened the shadow — but any hover response still says \"interactive.\" They ended up with a soft, centered teal shadow and no hover at all, so they read as printed labels.",
              },
              {
                label: "Project tabs",
                body: "The active tab had the raised shadow and the inactive one had none — exactly backwards, since the tab you're already on looked like the thing to click. Swapping them fixed the hierarchy, but a shadowless active tab looked unfinished; an inset shadow on the black fill rendered as a gray bevel; and nudging the tab down into its own shadow knocked the labels out of line. The version that stuck keeps a teal shadow on both, smaller and muted on the active tab, with both tabs matched to the same height.",
              },
              {
                label: "Carousel arrows",
                body: "The carousel relied on drag, swipe, and the dots, none of which announce themselves at a glance. Small prev/next arrows now sit beside the active card, borrowing the inactive tab's raised teal shadow so they read as clickable. They live outside the scroll container, so native scrolling is untouched, and they fade out at either end of the track.",
              },
            ].map(({ label, body }) => (
              <li key={label} className="flex items-start gap-3 leading-[1.7] text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
                <span className="font-bold" style={{ color: ACCENT }}>→</span>
                <span>
                  <span className="font-bold uppercase tracking-[0.05em]">{label}:</span> {body}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-7 px-6 py-5" style={{ backgroundColor: CALLOUT }}>
            <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              Key Insight
            </span>
            <p className="leading-[1.7] mt-2 text-[14px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              A visual style only works as a signal if it means the same thing everywhere. Each fix
              here was less about how a shadow looked and more about whether it was telling the
              truth about what the element does.
            </p>
          </div>
        </Card>

        {/* Designing in the Real Thing */}
        <Card>
          <SectionHeading>Designing in the Real Thing</SectionHeading>
          <Prose>
            The same bug shape bit this project twice, in two different components, months apart,
            and both times it was the same root cause: setting overflow-x on a container silently
            forces its overflow-y to auto per the CSS spec, not the value I'd intended. The first
            time it broke the hero section's sticky positioning. The second time it clipped a
            hover tooltip anchored to the top edge of a carousel card, because the carousel
            track's horizontal scroll had quietly done the same thing to its vertical overflow.
          </Prose>
          <p className="leading-[1.8] mt-4 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            A second bug only showed up through use, not code review: clicking a card's outbound
            link intermittently did nothing. The carousel's drag-to-scroll handler was calling
            setPointerCapture() on every pointerdown — including ones that started on a link —
            which made the browser retarget the resulting click to the scroll container instead
            of the anchor. Neither of these would have surfaced from reading the component in
            isolation; both only showed up from clicking through the actual carousel the way a
            visitor would.
          </p>
          <div className="mt-7 px-6 py-5" style={{ backgroundColor: CALLOUT }}>
            <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              Key Insight
            </span>
            <p className="leading-[1.7] mt-2 text-[14px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              The bugs worth remembering weren't caught by looking at the code — they were caught
              by using the thing I built the way a visitor actually would, and noticing when it
              didn't behave the way it looked like it should.
            </p>
          </div>
        </Card>

        {/* Outcome */}
        <Card>
          <SectionHeading>Outcome</SectionHeading>
          <Prose>
            The site now runs as two live deployments from one codebase — a product-design
            portfolio and a web-dev portfolio — sharing every component, project screenshot, and
            motion pattern between them, and passing a full Lighthouse accessibility, performance,
            and SEO sweep.
          </Prose>
          <p className="leading-[1.8] mt-4 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            What shipped along the way:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "A full-bleed, scroll-snap project carousel with peeking side cards and expand-in-place detail",
              "A shared component library serving two audience-specific data sets from one build",
              "A site-wide accessibility pass — landmarks, focus states, touch targets, inert peek cards",
              "A one-click copy-to-clipboard email link with a hover tooltip, replacing a plain mailto:",
              "A consistent shadow language — raised means clickable — plus prev/next arrows on the carousel",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 leading-[1.7] text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
                <Bullet />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <ImagePlaceholder label="Product-design vs. web-dev variant, side by side" />

        {/* Reflection */}
        <Card>
          <SectionHeading>Reflection</SectionHeading>
          <Prose>
            Building my own portfolio taught me something that no client project could, because
            I'm the only person who has used every version of it: a design isn't finished when it
            looks right in a static frame, it's finished when I've clicked through it enough times
            to trust it. Almost everything I'd point to as a real improvement in this repo's
            history came from that second pass — from using the thing, not from planning it better
            the first time.
          </Prose>
          <p className="leading-[1.8] mt-4 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            It also reframed what "the same project, two audiences" means. It's tempting to think
            of that as two designs. In practice it was one design and two small, deliberate
            differences in what data reaches it — which meant almost everything I built for one
            audience, the other got for free.
          </p>
          <p className="leading-[1.8] mt-4 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            If I extended it further, I'd want real analytics on which variant visitors actually
            land on and how far they scroll, a third variant testing a hiring-manager-specific
            entry point, and a way to write a new case study without hand-building a whole page
            component for it each time.
          </p>
          <blockquote className="mt-6 pl-5 border-l-2" style={{ borderColor: "#332F1C" }}>
            <p className="italic leading-[1.7] text-[16px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              What does this project look like the third time I use it, not the first time I ship it?
            </p>
          </blockquote>
        </Card>

        {/* Back link */}
        <div className="pt-4">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.06em] transition-colors"
            style={{ color: "#000000", fontFamily: MONO_FONT }}
            onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
            onMouseLeave={e => (e.currentTarget.style.color = "#000000")}
          >
            <span aria-hidden="true">←</span> Back to all work
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer contained />
    </div>
  );
}
