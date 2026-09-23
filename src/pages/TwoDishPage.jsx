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

export default function TwoDishPage() {
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
            {["Product Design", "Design Systems", "Client Work", "Full-Stack"].map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <h1
            className="mb-5"
            style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: "clamp(2.6rem, 6vw, 4.2rem)", lineHeight: 1.1, color: "#000000" }}
          >
            Two Dish: Ordering Around a Kitchen's Real Limits
          </h1>
          <span
            className="text-[18px] font-bold uppercase tracking-[0.1em] inline-block mb-3"
            style={{ color: ACCENT, fontFamily: MONO_FONT }}
          >
            Client project: solo design & build, 11 weeks
          </span>
          <p className="text-[14px] leading-[1.8] mb-6 max-w-2xl" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            A product study in designing scarcity as a promise rather than an apology.
          </p>
          <div className="flex flex-wrap gap-3">
            <ActionButton href="https://two-dish.vercel.app/">Live Site</ActionButton>
            <ActionButton href="https://github.com/roomba03/Two_Dish">GitHub</ActionButton>
          </div>
        </Card>

        <div className="halftone" style={{ position: "relative", border: "1px solid rgba(51,47,28,0.16)" }}>
          <img
            src="/two-dish.png"
            alt="Two Dish homepage: gold pan line-art mark and wordmark on a deep plum ground, above the kitchen's one-dish-a-day explanation"
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
            Two Dish is an ordering site built for a real client, my family's home catering
            kitchen. The kitchen already ran on a very specific rhythm. It cooked one dish a day,
            fresh and in small batches matched to that day's headcount. Orders closed at midnight
            the night before, and deliveries went out in one of two evening slots within a radius
            the cook could actually drive.
          </Prose>
          <p className="leading-[1.8] mt-4 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            Ordinary food-ordering software treats every one of those constraints as a problem to
            work around. I did the opposite and built the interface out of them, so the thing the
            kitchen does best is the first thing a customer sees.
          </p>
        </Card>

        {/* My Role */}
        <Card>
          <SectionHeading>My Role</SectionHeading>
          <Prose>
            Solo project, designed and built over roughly eleven weeks for a real client kitchen.
          </Prose>
          <ul className="mt-4 space-y-2">
            {[
              "Product definition and ordering-flow design",
              "Design system: palette, type, shape, and photography rules",
              "Interaction design across storefront, checkout, and cook dashboard",
              "Frontend implementation (Next.js, React, Tailwind)",
              "Data model and server-side ordering logic (Supabase/Postgres)",
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
            Off-the-shelf ordering patterns are built for restaurants with a standing menu,
            elastic inventory, and a delivery network. A one-person kitchen has none of those.
            Dropping this business into a generic storefront would let customers do things the
            kitchen physically cannot honor.
          </Prose>
          <blockquote className="my-6 pl-5 border-l-2" style={{ borderColor: "#332F1C" }}>
            <p className="italic leading-[1.7] text-[16px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              Every limit hidden until checkout becomes a rejection. Every limit shown up front
              becomes a reason to trust the food.
            </p>
          </blockquote>
          <div className="grid sm:grid-cols-2 gap-6 mt-4">
            <div>
              <Eyebrow>Where generic patterns break</Eyebrow>
              <ul className="space-y-2 mt-3">
                {[
                  "A browsable catalog implies anything can be cooked today",
                  "Open quantity fields oversell a fixed batch",
                  "Address entry fails only after the cart is full",
                  "Any-time delivery ignores a two-slot evening route",
                  "Nothing communicates the order-by-midnight cutoff",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] leading-[1.7]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
                    <Bullet />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>What the kitchen actually needed</Eyebrow>
              <ul className="space-y-2 mt-3">
                {[
                  "A schedule customers read as a menu",
                  "A hard headcount per cooking day",
                  "A delivery boundary drawn, not typed",
                  "Tools to plan ingredients against real orders",
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
              How might we design an ordering experience where a kitchen's limits are the
              first thing a customer understands, instead of the last thing they discover?
            </p>
          </div>
        </Card>

        {/* Design Approach */}
        <Card>
          <SectionHeading>Design Approach</SectionHeading>
          <Prose>
            Instead of starting from a menu page and bolting on restrictions, I started from the
            kitchen's weekly rhythm and asked what the customer needed to see at each step:
          </Prose>
          <ul className="mt-5 space-y-3">
            {[
              "What does the customer need to know before they get attached to an order?",
              "Which limits can be shown as information rather than enforced as errors?",
              "What does the cook need on a Tuesday morning to cook the right amount?",
            ].map((q) => (
              <li key={q} className="flex items-start gap-3 leading-[1.7] text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
                <span className="font-bold" style={{ color: ACCENT }}>→</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
          <p className="leading-[1.8] mt-5 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            That produced two surfaces designed together rather than in sequence: a storefront
            built around a seven-day schedule, and a cook dashboard where the schedule, the
            headcount, the ingredient math, and the delivery boundary are all editable by the
            person doing the cooking.
          </p>
        </Card>

        {/* Core Design Decisions */}
        <section>
          <Eyebrow>Core Design Decisions</Eyebrow>
          <div className="grid sm:grid-cols-2 gap-6 mt-5">
            {[
              {
                number: "01",
                title: "The Schedule Is the Menu",
                body: "Customers browse dates, not a catalog. Each date carries exactly one dish. That rule is enforced all the way down in the data model, where one kitchen can hold only one scheduled dish per delivery date. The homepage leads with the next few days so the first impression is what's cooking this week, not everything the kitchen could make.",
              },
              {
                number: "02",
                title: "Draw the Boundary, Don't Type It",
                body: "The cook draws her real delivery zone as a polygon on a map; customers check their address against it on the homepage before they ever reach a cart. Geocoding plus a point-in-polygon test answers a yes/no question honestly, with a ZIP-code list kept as a fallback for when lookup fails.",
              },
              {
                number: "03",
                title: "Show Capacity Before Checkout",
                body: "Each cooking day carries a maximum headcount and a running count against it. Low-stock and slot-full states surface while the customer is still choosing, and the final claim on a spot happens in a single locked database operation so two people checking out at once can't both take the last portion.",
              },
              {
                number: "04",
                title: "One Accent Doing All the Work",
                body: "The system landed on two tones and nothing else: ivory carrying every surface and every line of text, amber-gold reserved for headings, prices, links, active states, and the single primary action per view. Hairline borders separate cards from the ground instead of a second fill. Anything that would normally claim its own color earns hierarchy from type and spacing instead.",
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

        <ImagePlaceholder label="Weekly schedule + delivery-zone checker" />

        {/* Iteration */}
        <Card>
          <SectionHeading>Designing in the Real Thing</SectionHeading>
          <Prose>
            The visual system did not land on the first attempt. An early sage-and-terracotta
            palette was applied across the whole app and then judged in context. It read
            cluttered, with too many colors competing for the same job. Rather than argue it out
            in static mockups, I put alternate palettes behind a keyboard toggle on the live
            site so entire versions could be compared in real use, on real content, with the
            client watching.
          </Prose>
          <p className="leading-[1.8] mt-4 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            That let the system get simpler in public. The winning version started with three
            pale tones. At text size they were indistinguishable, which made the hierarchy look
            arbitrary, so it was cut down to two: one neutral for everything, gold for the
            things that matter.
          </p>
          <div className="mt-7 px-6 py-5" style={{ backgroundColor: CALLOUT }}>
            <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              Key Insight
            </span>
            <p className="leading-[1.7] mt-2 text-[14px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              A palette can only be evaluated at full scale. Two tones that read as distinct in a
              swatch can read as the same off-white in a paragraph.
            </p>
          </div>
        </Card>

        {/* Outcome */}
        <Card>
          <SectionHeading>Outcome</SectionHeading>
          <Prose>
            Two Dish is built and ready for launch, waiting on the kitchen to start taking orders.
            It shipped as a complete two-sided product rather than a marketing site with a form
            attached. Customers can check their address against the delivery zone, browse the
            week, order for a specific date and slot, and save validated addresses to an account.
            The cook can schedule dishes and headcounts, scale ingredient ratios to the day's
            orders, see a production run for each day, and redraw her delivery zone on a map.
          </Prose>
          <p className="leading-[1.8] mt-4 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            The real test hasn't happened yet. Once orders start coming in, I'll be watching
            whether customers actually read the schedule as a menu and whether the cutoff and
            capacity limits cut down on orders the kitchen can't fill.
          </p>
        </Card>

        <ImagePlaceholder label="Cook dashboard: schedule, production run, zone editor" />

        {/* Reflection */}
        <Card>
          <SectionHeading>Reflection</SectionHeading>
          <Prose>
            I started this project trying to fit a kitchen into an ordering pattern, and spent
            most of it doing the reverse. The interface got better every time I stopped treating
            a limitation as something to soften and let it be the structure the customer
            navigates: the single dish, the midnight cutoff, the drawn boundary, the fixed
            headcount.
          </Prose>
          <p className="leading-[1.8] mt-4 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            The other pattern I noticed in my own decisions: nearly all the ones I'd defend were
            subtractive. A filter tab removed from the production view. A redundant heading
            pulled off the empty cart. Three tones cut to two. A duplicate login path collapsed
            into one. The system got more legible every time something came out of it.
          </p>
          <p className="leading-[1.8] mt-4 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            If I extended it further, I'd want a standing-order flow for regulars, a way for the
            cook to see demand shape before committing a dish to a date, and delivery routing
            built from the zone polygon rather than left as a manual evening drive.
          </p>
          <blockquote className="mt-6 pl-5 border-l-2" style={{ borderColor: "#332F1C" }}>
            <p className="italic leading-[1.7] text-[16px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              What if the limits of a business are the most honest thing you can show a customer?
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
