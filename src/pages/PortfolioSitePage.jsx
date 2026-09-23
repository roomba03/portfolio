import React from "react";
import { Link } from "react-router-dom";
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
            This Portfolio: Designing by Using
          </h1>
          <span
            className="text-[18px] font-bold uppercase tracking-[0.1em] inline-block mb-3"
            style={{ color: ACCENT, fontFamily: MONO_FONT }}
          >
            Personal project: ongoing since June 2026
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

        <div className="halftone" style={{ position: "relative", border: "1.5px solid #000000", boxShadow: "4px 4px 0 0 #000000" }}>
          <img
            src="/portfolio-site-main.png"
            alt="This portfolio's homepage: hero headline reading 'Designed with intention. Built with understanding.'"
            className="w-full"
            style={{ display: "block" }}
          />
          <span style={{ position: "absolute", bottom: "12px", left: "12px" }}>
            <Tag>Fig. 01: Homepage</Tag>
          </span>
        </div>

        {/* Overview */}
        <Card>
          <SectionHeading>Overview</SectionHeading>
          <Prose>
            This site is my own portfolio, and also the longest-running project I own end to end.
            It started as a single static page in June 2026 and has been rebuilt in place ever
            since. It now runs as two deployments from one codebase, each defaulting to its own
            version: a product-design version for recruiters and a code-focused version for
            engineers.
          </Prose>
          <p className="leading-[1.8] mt-4 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            I'm also the only user I can watch in real time, and most of its history is fixing my
            own first versions: a hard-cut tab switch that read as broken, a modal that felt
            heavier than the content deserved, and a scroll transition that stopped short of where
            it should land.
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
              "Product definition: deciding the site needed two audiences, not one",
              "Interaction and motion design for the project carousel",
              "Visual design system: type, color, shadow, and shape language",
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
            or hiring manager wants to feel the work: visual craft, the story behind a decision,
            whether the taste is theirs. An engineer wants to see the work: the actual repo, the
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
          <div className="mt-6">
            <Eyebrow>What a single version costs</Eyebrow>
            <ul className="space-y-2 mt-3">
              {[
                "A product-design framing buries the GitHub links engineers want first",
                "A code-first framing buries the narrative recruiters want first",
                "One card format can't serve both a case study and a repo link equally well",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13px] leading-[1.7]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
                  <Bullet />
                  {item}
                </li>
              ))}
            </ul>
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
            let the data feeding it and a couple of conditionals do the work of speaking to each
            audience differently:
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
            That last question ended up doing the most work. Most of the decisions below started
            there.
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
                body: "Both versions use the same carousel. Only the project data feeding it changes. Design cards open a case study and expand to show my role and process. Dev cards skip the case study and link straight to the live site and GitHub. Everything else, from the motion to the type to the layout, is shared, so an improvement to one version lands in both.",
              },
              {
                number: "02",
                title: "Expand-in-Place, Not a Modal",
                body: "The first version of the project carousel opened a full modal overlay per card. After using it, the modal felt like more ceremony than a short case-study blurb warranted. It interrupted the scroll instead of extending it. I replaced it with cards that grow in place: a taller preview image and a revealed role block, with only one card ever expanded at a time.",
              },
              {
                number: "03",
                title: "Motion as Feedback",
                body: "Tab switches fade the card track out, swap its content while invisible, then fade it back in, instead of hard-cutting content mid-click. The carousel itself still uses CSS scroll-snap to settle each card in place. The page-level scroll from the hero down to the carousel is different: native scroll-snap proved unpredictable there in testing, so I swapped it for a short JS scroll-check that settles into a full view of one section or the other the same way every time.",
              },
              {
                number: "04",
                title: "One Accessibility Sweep",
                body: "A dedicated sweep fixed a skipped heading level, added visible focus rings site-wide, grew touch targets to WCAG 2.2 minimums, and corrected an ARIA role misuse on the carousel dots. I paired it with a Lighthouse pass for contrast, font-loading strategy, and a robots.txt the SPA's catch-all rewrite had been silently swallowing.",
              },
            ].map(({ number, title, body }) => (
              <React.Fragment key={number}>
                <Card>
                  <span style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: "3.4rem", lineHeight: 1, color: ACCENT }}>{number}</span>
                  <h3
                    className="mt-1 mb-3"
                    style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: "1.5rem", lineHeight: 1, color: "#000000" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[13px] leading-[1.7]" style={{ color: "#000000", fontFamily: MONO_FONT }}>{body}</p>
                </Card>
                {number === "02" && (
                  <div className="halftone sm:col-span-2" style={{ position: "relative", border: "1.5px solid #000000", boxShadow: "4px 4px 0 0 #000000" }}>
                    <img
                      src="/portfolio-site-carousel.jpg"
                      alt="Selected Work carousel: the Busy Bunny card in focus with its award badge, tech tags, and site links, a prev/next arrow beside it, the next card faded at the edge, and progress dots below"
                      className="w-full"
                      style={{ display: "block" }}
                      loading="lazy"
                    />
                    <span style={{ position: "absolute", bottom: "12px", left: "12px" }}>
                      <Tag>Fig. 02: Selected Work carousel</Tag>
                    </span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Shadows as Signifiers */}
        <Card>
          <SectionHeading>Shadows as Signifiers</SectionHeading>
          <Prose>
            A peer went through the site and flagged that some shadows promised clicks the
            elements couldn't deliver. On this site, a hard offset shadow is shorthand for{" "}
            <em>you can press this</em>. Once I started treating the shadow as a promise rather
            than decoration, I found three places where it was saying the wrong thing:
          </Prose>
          <ul className="mt-5 space-y-4">
            {[
              {
                label: "Role tags",
                body: (
                  <>
                    The Web Developer and UX Engineer tags in the hero carried the same crisp offset
                    shadow as real buttons, so they invited clicks they couldn't answer. I tried
                    softening it into a glow, and briefly a hover state that flattened the shadow.
                    But any hover response still says <em>interactive</em>. They ended up with a
                    soft, centered teal shadow and no hover at all, so they read as printed labels.
                  </>
                ),
              },
              {
                label: "Project tabs",
                body: "The active tab had the raised shadow and the inactive one had none. That was exactly backwards, since the tab you're already on looked like the thing to click. Swapping them fixed the hierarchy, but a shadowless active tab looked unfinished; an inset shadow on the black fill rendered as a gray bevel; and nudging the tab down into its own shadow knocked the labels out of line. The version that stuck keeps a teal shadow on both, smaller and muted on the active tab, with both tabs matched to the same height.",
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
          <p className="leading-[1.8] mt-5 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            The same problem showed up without a shadow. The carousel's side cards peek in at 40%
            visibility, which signals they're reachable, but keyboard users could tab into them
            before they were in view. I made every card except the active one inert, so a card
            that looks out of reach actually is.
          </p>
          <div className="mt-7 px-6 py-5" style={{ backgroundColor: CALLOUT }}>
            <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              Key Insight
            </span>
            <p className="leading-[1.7] mt-2 text-[14px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              A visual style only works as a signal if it means the same thing everywhere. Each fix
              here was less about how an element looked and more about whether it was telling the
              truth about what it does.
            </p>
          </div>
        </Card>

        {/* Bugs You Only Find by Clicking */}
        <Card>
          <SectionHeading>Bugs You Only Find by Clicking</SectionHeading>
          <Prose>
            The same bug shape bit this project twice, in two different components, months apart,
            and both times it was the same root cause: setting overflow-x on a container silently
            forces its overflow-y to auto per the CSS spec, not the value I'd intended. The first
            time it broke the hero section's sticky positioning. The second time it clipped a
            hover tooltip anchored to the top edge of a carousel card, because the carousel
            track's horizontal scroll had quietly done the same thing to its vertical overflow.
          </Prose>
          <p className="leading-[1.8] mt-4 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            A second bug: clicking a card's outbound link intermittently did nothing. The carousel's drag-to-scroll handler was calling
            setPointerCapture() on every pointerdown, even ones that started on a link. That made
            the browser retarget the resulting click to the scroll container instead of the
            anchor.
          </p>
          <div className="mt-7 px-6 py-5" style={{ backgroundColor: CALLOUT }}>
            <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              Key Insight
            </span>
            <p className="leading-[1.7] mt-2 text-[14px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              A design isn't finished when it looks right in a static frame or reads right in code
              review. It's finished when I've clicked through it the way a visitor would, enough
              times to trust it. Both of these bugs, and most of the real improvements in this
              project's history, came from that pass, not from planning better the first time.
            </p>
          </div>
        </Card>

        {/* Outcome */}
        <Card>
          <SectionHeading>Outcome</SectionHeading>
          <Prose>
            On Lighthouse, the site scores 96 in each of accessibility, performance, and best
            practices, and 100 in SEO.
          </Prose>
        </Card>

        {/* Reflection */}
        <Card>
          <SectionHeading>Reflection</SectionHeading>
          <Prose>
            Building this reframed what <em>the same project, two audiences</em> means. It's tempting to
            think of that as two designs. In practice it was one design and two small, deliberate
            differences in what data reaches it. That meant almost everything I built for one
            audience, the other got for free.
          </Prose>
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
