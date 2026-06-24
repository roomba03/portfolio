import React from "react";
import { Link } from "react-router-dom";
import ImagePlaceholder from "../components/ImagePlaceholder";
import Footer from "../components/Footer";

const ACCENT = "#75979A";
const DISPLAY_FONT = "'Bangla MN', sans-serif";
const MONO_FONT = "'Courier Prime', 'Courier New', monospace";

const FIREWORK_SPARKS_TR = [
  { dx: "34px", dy: "-30px", color: "#FFD24A", delay: "0s" },
  { dx: "10px", dy: "-46px", color: "#FFEFC2", delay: "0.04s" },
  { dx: "46px", dy: "-4px", color: "#FF6FA5", delay: "0.02s" },
  { dx: "26px", dy: "-4px", color: "#FFD24A", delay: "0.06s" },
  { dx: "20px", dy: "-40px", color: "#FFA73C", delay: "0.01s" },
  { dx: "40px", dy: "-18px", color: "#FF9FC2", delay: "0.08s" },
];

const FIREWORK_SPARKS_BL = [
  { dx: "-34px", dy: "-30px", color: "#FFA73C", delay: "0.01s" },
  { dx: "-10px", dy: "-46px", color: "#FF6FA5", delay: "0.05s" },
  { dx: "-46px", dy: "-4px", color: "#FFEFC2", delay: "0.03s" },
  { dx: "-26px", dy: "-4px", color: "#FF9FC2", delay: "0.07s" },
  { dx: "-20px", dy: "-40px", color: "#FFD24A", delay: "0.02s" },
  { dx: "-40px", dy: "-18px", color: "#FFEFC2", delay: "0.09s" },
];

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

export default function BusyBunnyPage() {
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
            {["UX Design", "Interaction Design", "Hackathon", "Frontend"].map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <h1
            className="mb-5"
            style={{ fontFamily: "'Bangla MN', sans-serif", fontWeight: 700, fontSize: "clamp(2.6rem, 6vw, 4.2rem)", lineHeight: 1.1, color: "#000000" }}
          >
            Busy Bunny — Gamified Productivity System
          </h1>
          <span
            className="firework-trigger text-[18px] font-bold uppercase tracking-[0.1em] inline-block mb-3"
            style={{ color: ACCENT, fontFamily: MONO_FONT }}
          >
            ★ Most Creative UI/UX — HackKU26
            {FIREWORK_SPARKS_TR.map((spark, i) => (
              <span
                key={`tr-${i}`}
                className="firework-spark firework-spark--tr"
                style={{ "--dx": spark.dx, "--dy": spark.dy, color: spark.color, animationDelay: spark.delay }}
              />
            ))}
            {FIREWORK_SPARKS_BL.map((spark, i) => (
              <span
                key={`bl-${i}`}
                className="firework-spark firework-spark--bl"
                style={{ "--dx": spark.dx, "--dy": spark.dy, color: spark.color, animationDelay: spark.delay }}
              />
            ))}
          </span>
          <p className="text-[14px] leading-[1.8] mb-6 max-w-2xl" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            A UX exploration of motivation, emotional feedback loops, and behavioral design.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://buns-green.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 text-[12px] font-bold uppercase tracking-[0.08em]"
              style={{ borderColor: "#000000", color: "#000000", backgroundColor: "transparent", fontFamily: MONO_FONT, boxShadow: "4px 4px 0 0 #000000", transform: "translate(0, 0)", transition: "transform 0.12s ease, box-shadow 0.12s ease, background-color 0.12s ease, color 0.12s ease" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = ACCENT; e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = "#F4EBBE"; e.currentTarget.style.transform = "translate(2px, 2px)"; e.currentTarget.style.boxShadow = "2px 2px 0 0 #000000"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "#000000"; e.currentTarget.style.color = "#000000"; e.currentTarget.style.transform = "translate(0, 0)"; e.currentTarget.style.boxShadow = "4px 4px 0 0 #000000"; }}
            >
              Live Demo
            </a>
            <a
              href="https://github.com/alesan99/buns"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 text-[12px] font-bold uppercase tracking-[0.08em]"
              style={{ borderColor: "#000000", color: "#000000", backgroundColor: "transparent", fontFamily: MONO_FONT, boxShadow: "4px 4px 0 0 #000000", transform: "translate(0, 0)", transition: "transform 0.12s ease, box-shadow 0.12s ease, background-color 0.12s ease, color 0.12s ease" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = ACCENT; e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = "#F4EBBE"; e.currentTarget.style.transform = "translate(2px, 2px)"; e.currentTarget.style.boxShadow = "2px 2px 0 0 #000000"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "#000000"; e.currentTarget.style.color = "#000000"; e.currentTarget.style.transform = "translate(0, 0)"; e.currentTarget.style.boxShadow = "4px 4px 0 0 #000000"; }}
            >
              GitHub
            </a>
            <a
              href="https://devpost.com/software/bunny-bulletin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border-2 text-[12px] font-bold uppercase tracking-[0.08em]"
              style={{ borderColor: "#000000", color: "#000000", backgroundColor: "transparent", fontFamily: MONO_FONT, boxShadow: "4px 4px 0 0 #000000", transform: "translate(0, 0)", transition: "transform 0.12s ease, box-shadow 0.12s ease, background-color 0.12s ease, color 0.12s ease" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = ACCENT; e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = "#F4EBBE"; e.currentTarget.style.transform = "translate(2px, 2px)"; e.currentTarget.style.boxShadow = "2px 2px 0 0 #000000"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.borderColor = "#000000"; e.currentTarget.style.color = "#000000"; e.currentTarget.style.transform = "translate(0, 0)"; e.currentTarget.style.boxShadow = "4px 4px 0 0 #000000"; }}
            >
              Devpost
            </a>
          </div>
        </Card>

        <div className="halftone" style={{ position: "relative", border: "1px solid rgba(51,47,28,0.16)" }}>
          <img
            src="/busy-bunny-main.png"
            alt="Busy Bunny app — task list on the left, bunny companion on the right"
            className="w-full"
            style={{ display: "block" }}
          />
          <span style={{ position: "absolute", bottom: "12px", left: "12px" }}>
            <Tag>Fig. 01 — App Screenshot</Tag>
          </span>
        </div>

        {/* Overview */}
        <Card>
          <SectionHeading>Overview</SectionHeading>
          <Prose>
            Busy Bunny is a gamified productivity web application that combines task management
            with lightweight platformer gameplay. It was designed during a 36-hour hackathon at
            HackKU26 as an exploration into how productivity systems can sustain long-term
            engagement through emotional feedback rather than discipline alone.
          </Prose>
          <p className="leading-[1.8] mt-4 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            Instead of treating productivity and entertainment as separate systems competing
            for attention, Busy Bunny merges them into a unified loop where real-world actions
            directly shape a responsive game environment.
          </p>
        </Card>

        {/* My Role */}
        <Card>
          <SectionHeading>My Role</SectionHeading>
          <Prose>
            This project was built in a 4-person team during a 36-hour hackathon sprint.
          </Prose>
          <ul className="mt-4 space-y-2">
            {[
              "UX/UI direction and interaction design",
              "Game-system design and reward logic",
              "Frontend implementation support",
              "Visual design and interface polish",
              "Designing progression and feedback systems",
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
            Most productivity tools assume that users fail due to poor organization or lack of
            discipline. As a result, they focus heavily on task structuring, lists, and reminders.
            However, the deeper issue is different:
          </Prose>
          <blockquote className="my-6 pl-5 border-l-2" style={{ borderColor: "#332F1C" }}>
            <p className="italic leading-[1.7] text-[16px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              Users do not disengage from productivity systems because they are disorganized —
              they disengage because the emotional experience of using them is exhausting.
            </p>
          </blockquote>
          <div className="grid sm:grid-cols-2 gap-6 mt-4">
            <div>
              <Eyebrow>Patterns we identified</Eyebrow>
              <ul className="space-y-2 mt-3">
                {[
                  "Apps feel overwhelming after initial use",
                  "Task lists accumulate emotional weight over time",
                  "Breaks turn into untracked distraction loops",
                  "Gamification relies on streak pressure, not motivation",
                  "No meaningful feedback when users fall behind",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] leading-[1.7]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
                    <Bullet />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>Why games work</Eyebrow>
              <ul className="space-y-2 mt-3">
                {[
                  "Immediate feedback on every action",
                  "Clear progression systems",
                  "Emotional responsiveness to player behavior",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] leading-[1.7]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
                    <Bullet />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-7 px-6 py-5" style={{ backgroundColor: "#D2DAC5" }}>
            <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              Central design question
            </span>
            <p className="font-medium leading-[1.7] mt-2 text-[14px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              How might we design a productivity system that feels emotionally engaging
              instead of emotionally draining?
            </p>
          </div>
          <p className="leading-[1.8] mt-6 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            <span className="font-bold" style={{ color: "#000000" }}>Our working hypothesis:</span>{" "}
            if productivity tasks are connected to immediate, emotionally responsive feedback
            systems, users will feel more engaged and less likely to fall into avoidance cycles.
          </p>
        </Card>

        <ImagePlaceholder label="Wireframes / early explorations" />

        {/* Design Approach */}
        <Card>
          <SectionHeading>Design Approach</SectionHeading>
          <Prose>
            We approached this project by focusing on emotional systems rather than functional
            efficiency. Instead of asking "How do we organize tasks better?", we asked:
          </Prose>
          <ul className="mt-5 space-y-3">
            {[
              "What makes progress feel satisfying?",
              "What makes avoidance feel visible without creating shame?",
              "How can productivity feel like a living system rather than a static list?",
            ].map((q) => (
              <li key={q} className="flex items-start gap-3 leading-[1.7] text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
                <span className="font-bold" style={{ color: ACCENT }}>→</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
          <p className="leading-[1.8] mt-5 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            This led us toward a hybrid system combining task management, reward loops,
            environmental storytelling, and light narrative feedback.
          </p>
        </Card>

        {/* Core Design Decisions */}
        <section>
          <Eyebrow>Core Design Decisions</Eyebrow>
          <div className="grid sm:grid-cols-2 gap-6 mt-5">
            {[
              {
                number: "01",
                title: "Productivity as a Living System",
                body: "Each task contributes to a dynamic system rather than a static checklist. Completing tasks generates rewards, while neglecting tasks affects the system state over time — reframing productivity as something the user participates in.",
              },
              {
                number: "02",
                title: "Emotional Feedback Instead of Punishment",
                body: "The game world reflects user behavior. Completed tasks generate 'carrots', progress advances the player experience, and neglected tasks gradually shift the environment state — creating awareness without shame-based mechanics.",
              },
              {
                number: "03",
                title: "Environmental Storytelling",
                body: "Rather than showing failure through explicit messages, the system communicates through environmental change: visual tone shifts, increased chaos in the environment, and the bunny's emotional state reflecting user consistency.",
              },
              {
                number: "04",
                title: "Immediate Reward Loops",
                body: "Each completed task provides instant feedback through reward points, gameplay access, and visual confirmation of progress — intentionally designed to feel satisfying and reinforce task completion behavior.",
              },
            ].map(({ number, title, body }, i) => (
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

        <ImagePlaceholder label="Core interaction flows / UI screens" />

        {/* Research Insights */}
        <Card>
          <SectionHeading>Research Insights</SectionHeading>
          <Prose>
            Due to hackathon constraints, research was lightweight and exploratory. We analyzed
            existing productivity tools and their retention patterns, game reward systems and
            progression loops, and gathered peer feedback from rapid prototyping sessions.
          </Prose>
          <div className="mt-7 px-6 py-5" style={{ backgroundColor: "#D2DAC5" }}>
            <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              Key Insight
            </span>
            <p className="leading-[1.7] mt-2 text-[14px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              Productivity tools optimize for structure, while games optimize for emotional
              continuity. This gap became the foundation for Busy Bunny.
            </p>
          </div>
        </Card>

        {/* Outcome */}
        <Card>
          <SectionHeading>Outcome</SectionHeading>
          <Prose>
            Busy Bunny was successfully built as a functional MVP during a 36-hour hackathon
            sprint and received the{" "}
            <span className="font-bold" style={{ color: ACCENT }}>Most Creative UI/UX award at HackKU26</span>.
          </Prose>
          <p className="leading-[1.8] mt-4 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            Despite its short development time, the project demonstrated that:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "Productivity systems can be emotionally engaging",
              "Gamification can go beyond streak mechanics",
              "Behavioral feedback systems increase user awareness without requiring punishment",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 leading-[1.7] text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
                <Bullet />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <ImagePlaceholder label="Final UI — task view + game world" />

        {/* Reflection */}
        <Card>
          <SectionHeading>Reflection</SectionHeading>
          <Prose>
            This project shifted my perspective on productivity design. I originally approached
            it as a motivation problem — how to make users "do more." But through design and
            iteration, it became clear that the real challenge is emotional: users don't lack
            systems. They lack systems that respond to their behavior in a meaningful,
            non-punitive way.
          </Prose>
          <p className="leading-[1.8] mt-4 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            If extended further, I would explore long-term progression systems, deeper
            personalization of the game world, more nuanced emotional states beyond binary
            success/failure, and reduced reliance on extrinsic rewards toward intrinsic motivation.
          </p>
          <blockquote className="mt-6 pl-5 border-l-2" style={{ borderColor: "#332F1C" }}>
            <p className="italic leading-[1.7] text-[16px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              How do we design systems that reflect human behavior without shaming it?
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
