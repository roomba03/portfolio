import React from "react";
import { Link } from "react-router-dom";
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

function Sketch({ src, alt, label, className = "", style }) {
  return (
    <div className={`halftone ${className}`} style={{ position: "relative", border: "1.5px solid #000000", boxShadow: "4px 4px 0 0 #000000", ...style }}>
      <img src={src} alt={alt} className="w-full" style={{ display: "block" }} />
      <span style={{ position: "absolute", bottom: "12px", left: "12px", right: "12px" }}>
        <Tag>{label}</Tag>
      </span>
    </div>
  );
}

const MOODS = [
  { key: "happy", label: "Happy", detail: "nothing overdue" },
  { key: "annoyed", label: "Annoyed", detail: "1 to 2 overdue" },
  { key: "frazzled", label: "Unhinged", detail: "3 or more overdue" },
];
const POSES = [
  { key: "coffee", label: "Idle" },
  { key: "rest", label: "Sitting" },
  { key: "hop", label: "Jumping" },
];

function GridLabel({ children, className = "" }) {
  return (
    <span
      className={`text-[11px] font-bold uppercase tracking-[0.08em] ${className}`}
      style={{ color: "#000000", fontFamily: MONO_FONT }}
    >
      {children}
    </span>
  );
}

function FigCaption({ number, stacked = false, children }) {
  return (
    <figcaption className={`flex flex-col gap-2 ${stacked ? "" : "mt-5 sm:flex-row sm:items-start sm:gap-3"}`}>
      <span className="flex-shrink-0"><Tag>Fig. {number}</Tag></span>
      <span className="text-[12px] leading-[1.6]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
        {children}
      </span>
    </figcaption>
  );
}

// Moods as rows, poses as columns: the pink drains out of the bunny as you read down.
function MoodGrid({ className = "" }) {
  return (
    <figure className={`p-5 sm:p-6 ${className}`} style={{ border: "1.5px solid #000000", boxShadow: "4px 4px 0 0 #000000" }}>
      <div
        className="grid items-center gap-x-2 gap-y-1"
        style={{ gridTemplateColumns: "auto repeat(3, minmax(0, 1fr))" }}
      >
        <span />
        {POSES.map(({ key, label }) => (
          <GridLabel key={key} className="text-center">{label}</GridLabel>
        ))}
        {MOODS.map((mood) => (
          <React.Fragment key={mood.key}>
            <div className="flex flex-col pr-2">
              <GridLabel>{mood.label}</GridLabel>
              <span className="text-[11px] leading-[1.4] mt-0.5" style={{ color: "#000000", fontFamily: MONO_FONT }}>
                {mood.detail}
              </span>
            </div>
            {POSES.map(({ key, label }) => (
              <img
                key={key}
                src={`/busy-bunny-moods/${key}-${mood.key}.png`}
                alt={`${mood.label} bunny (${mood.detail}), ${label.toLowerCase()}`}
                className="w-full"
                loading="lazy"
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <FigCaption number="05">
        Anya's mood tracks overdue tasks. Her color fades from pink to gray as she goes from
        happy to unhinged, and recovers as soon as tasks are done.
      </FigCaption>
    </figure>
  );
}

function HoppenheimerFigure() {
  return (
    <figure
      className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8"
      style={{ border: "1.5px solid #000000", boxShadow: "4px 4px 0 0 #000000" }}
    >
      <img
        src="/busy-bunny-moods/hoppenheimer.png"
        alt="Hoppenheimer: a grey bunny in a black fedora, scowling"
        className="w-full max-w-[160px] self-center flex-shrink-0"
        loading="lazy"
      />
      <FigCaption number="07" stacked>
        Hoppenheimer, drawn for a planned mode where he chases you through the backrooms. We cut
        it for time, so he now lives in the empty state.
      </FigCaption>
    </figure>
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
          <span
            className="firework-trigger text-[18px] font-bold uppercase tracking-[0.1em] inline-block mb-5"
            style={{ color: ACCENT, fontFamily: MONO_FONT }}
          >
            ★ Most Creative UI/UX: HackKU26
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
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-6">
            {["UX Design", "Interaction Design", "Hackathon"].map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <h1
            className="mb-5"
            style={{ fontFamily: "'Bangla MN', sans-serif", fontWeight: 700, fontSize: "clamp(2.6rem, 6vw, 4.2rem)", lineHeight: 1.1, color: "#000000" }}
          >
            Busy Bunny: A Gamified Productivity System
          </h1>
          <p className="text-[14px] leading-[1.8] mb-6 max-w-2xl" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            A productivity app that reacts to how you're doing instead of punishing you for falling behind.
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

        <div className="halftone" style={{ position: "relative", border: "1.5px solid #000000", boxShadow: "4px 4px 0 0 #000000" }}>
          <img
            src="/busy-bunny-main.png"
            alt="Busy Bunny app: task list on the left, bunny companion on the right"
            className="w-full"
            style={{ display: "block" }}
          />
          <span style={{ position: "absolute", bottom: "12px", left: "12px" }}>
            <Tag>Fig. 01: App Screenshot</Tag>
          </span>
        </div>

        {/* Overview */}
        <Card>
          <SectionHeading>Overview</SectionHeading>
          <Prose>
            Busy Bunny is a productivity web app where finishing real tasks earns you time in a
            small platformer game. Our team of four built it in 36 hours at HackKU26 to test one
            idea: people abandon productivity tools because they feel bad to use, not because
            they're disorganized. Instead of keeping tasks and rewards in separate places, Busy
            Bunny ties them into one loop, so what you do in real life shows up in how Anya, your
            bunny companion, feels.
          </Prose>
        </Card>

        {/* My Role */}
        <Card>
          <SectionHeading>My Role</SectionHeading>
          <Prose>
            I led UX and interaction design and illustrated all 10 bunny states, including Anya's
            mood system and Hoppenheimer.
          </Prose>
          <p className="leading-[1.8] mt-4 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            My teammates worked on:
          </p>
          <ul className="mt-2 space-y-2">
            {[
              { who: "Bella", did: "Level generation" },
              { who: "Pashia", did: "Frontend development" },
              { who: "Alejandro", did: "Implementing the hopping game and integrating the assets" },
            ].map(({ who, did }) => (
              <li key={who} className="flex items-start gap-3 text-[13px] leading-[1.7]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
                <Bullet />
                <span>
                  <span className="font-bold">{who}:</span> {did}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* The Problem */}
        <Card>
          <SectionHeading>The Problem</SectionHeading>
          <Prose>
            Most productivity tools assume people fail because they're disorganized, so they keep
            adding structure: more lists, more reminders. We think the real reason people quit is
            that these tools become emotionally exhausting.
          </Prose>
          <div className="mt-6">
            <Eyebrow>What we noticed going in</Eyebrow>
            <p className="mt-2 text-[13px] leading-[1.7]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              Drawn from our own team's habits and conversations with peers.
            </p>
            <ul className="space-y-2 mt-3">
              {[
                "Task lists pile up and start to feel heavy → opening the app becomes something to avoid.",
                "Gamified apps mostly rely on streaks → one missed day becomes a reason to give up.",
                "When you fall behind → most tools either say nothing or show you a wall of overdue items.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13px] leading-[1.7]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
                  <Bullet />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-7 px-6 py-5" style={{ backgroundColor: "#D2DAC5" }}>
            <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              Key Insight
            </span>
            <p className="leading-[1.7] mt-2 text-[14px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
              Productivity tools optimize for structure, while games optimize for emotional
              continuity. This gap became the foundation for Busy Bunny.
            </p>
          </div>
          <div className="mt-4 px-6 py-5" style={{ backgroundColor: "#D2DAC5" }}>
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

        {/* Sketches: notebook on top, whiteboards below. Top is slightly wider than one column; the bottom
            pair's flex-grow is each image's aspect ratio so both share one height. */}
        <div className="space-y-6">
          <Sketch
            src="/busy-bunny-wireframes.jpeg"
            alt="Hand-drawn notebook sketches of the calendar/task view and the game view with a bunny companion"
            label="Fig. 02: Wireframes / early explorations"
            className="sm:w-[65%] sm:mx-auto"
          />
          <div className="flex flex-col sm:flex-row gap-6">
            {[
              {
                src: "/busy-bunny-whiteboard-profile.jpg",
                ratio: 1170 / 718,
                alt: "Whiteboard sketch of the to-do/profile screen: a task list with done, overdue, and on-time counts next to the bunny Anya sitting in a garden with her level and coin count",
                label: "Fig. 03: Whiteboard Ver 1",
              },
              {
                src: "/busy-bunny-whiteboard-game.jpg",
                ratio: 1066 / 739,
                alt: "Whiteboard sketch of the to-do list with a weekly day picker and done/overdue/total counts beside the game panel showing plays left, the bunny Anya, her level, and caffeine needed to reach the next level",
                label: "Fig. 04: Whiteboard Ver 2",
              },
            ].map(({ src, ratio, alt, label }) => (
              <Sketch
                key={src}
                src={src}
                alt={alt}
                label={label}
                className="min-w-0 sm:[flex:var(--ratio)_1_0%]"
                style={{ "--ratio": ratio }}
              />
            ))}
          </div>
          <p className="text-[12px] leading-[1.6]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            Ver 1 had a single currency: coins, sitting next to Anya's level. In Ver 2 we split it
            in two. Finished tasks earn plays (the "3 plays left" row, which became carrots), and
            caffeine collected inside the game fills the bar to Anya's next level. Ver 2 also
            added a weekly day picker and a direct "Go to game" link.
          </p>
        </div>

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
            This led us toward a system combining task management, reward loops, and a character
            who reacts to how you're doing.
          </p>
        </Card>

        {/* Core Design Decisions */}
        <section>
          <Eyebrow>Core Design Decisions</Eyebrow>
          <div className="grid sm:grid-cols-2 gap-6 mt-5">
            {[
              {
                number: "01",
                title: "Rewards You Can't Lose",
                body: "Streaks wipe out weeks of progress over one bad day, which is exactly when people quit. We used carrots instead. Carrots drop the moment a task is checked off, and each one is a game play. Inside the game, you collect caffeine to level Anya up. Nothing you've earned in either currency gets taken away.",
              },
              {
                number: "02",
                title: "Feedback Without Shame",
                body: "We didn't want red warnings or lost progress. Instead, Anya reacts. One overdue task makes her annoyed, three make her unhinged, and her color drains from pink to gray along the way. Anya's mood is the app's feedback system, so falling behind is something you see, not something you're told. We rejected penalties because they trigger the avoidance we were designing against: people stop opening apps that punish them.",
              },
              {
                number: "03",
                title: "Breaks You Earn",
                body: "Breaks usually turn into untracked scrolling. Making playtime the reward gives the break a clear start and end, and it's tied to something you actually finished.",
              },
              {
                number: "04",
                title: "Grumpy, Not Sad",
                body: "We could have made Anya sad when tasks slipped, but sadness puts the weight back on the user. We made her grumpy and unhinged instead, so falling behind reads as a joke you're in on, not a disappointment.",
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
                  <div className="sm:col-span-2">
                    <MoodGrid className="sm:max-w-[640px] sm:mx-auto" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-4">
            <Prose>
              A fair question is whether an upset bunny is still a guilt trip. Humor and
              reversibility were our answer: finish one task and she starts recovering. Whether
              that feels different to users over time is something we didn't get to test.
            </Prose>
          </div>
        </section>

        <Sketch
          src="/busy-bunny-flow.png"
          alt="Core interaction flow: starting screen, user adds a task, complete the task to receive a carrot, then play the game. If the task is incomplete, gameplay is denied and the user is sent back to finish it."
          label="Fig. 06: Core interaction flow"
        />

        <HoppenheimerFigure />

        {/* Outcome */}
        <Card>
          <SectionHeading>Outcome</SectionHeading>
          <Prose>
            Busy Bunny was built as a functional MVP during a 36-hour hackathon
            sprint and received the{" "}
            <span className="font-bold" style={{ color: ACCENT }}>Most Creative UI/UX award at HackKU26</span>, out of 241 participants.
          </Prose>
          <p className="leading-[1.8] mt-4 text-[13px]" style={{ color: "#000000", fontFamily: MONO_FONT }}>
            What we couldn't test in a weekend is whether the loop keeps people engaged over
            weeks, which is the question the project really raises.
          </p>
        </Card>

        {/* Reflection */}
        <Card>
          <SectionHeading>Reflection</SectionHeading>
          <Prose>
            The biggest tension I'd work on next is that Busy Bunny still runs on extrinsic
            rewards. Carrots work in the short term, but external rewards can crowd out a person's
            own reasons for doing something. The next version would need to shift from rewarding
            tasks to reflecting progress back to the user, so the motivation eventually comes from
            them instead of the game.
          </Prose>
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
