# This Portfolio: One Codebase, Two Audiences
A case study about the site you're reading it on, and what changed when I started testing my own interactions instead of just designing them

## Overview
This site is my own portfolio, and also the longest-running project I own end to end. It started as a single static page in June 2026 and has been rebuilt in place ever since — the same repository now ships two different portfolios from one component library: a product-design-focused version for recruiters and a code-focused version for engineers, toggled by which URL you land on.

Because I'm both the designer and the only user I can watch in real time, this project became less about drafting a layout once and more about noticing where my own first version was wrong — a hard-cut tab switch that read as broken, a modal that felt heavier than the content deserved, a scroll transition that stopped short of where it should land — and rebuilding until it wasn't.

## My Role
Solo project. Every commit in this repository is mine, spanning design and implementation together rather than in separate passes.
- Product definition — deciding the site needed two audiences, not one
- Interaction and motion design for the project carousel
- Visual design system — type, color, shadow, and shape language
- Frontend implementation (React, Vite, Tailwind, React Router)
- Accessibility and performance auditing against Lighthouse and WCAG 2.2

## The Problem
A portfolio has to convince two different readers with two different jobs. A recruiter or hiring manager wants to feel the work — visual craft, the story behind a decision, whether the taste is theirs. An engineer wants to see the work — the actual repo, the stack, whether the code behind the polish is real. Most portfolios pick one reader and make the other one dig.

> Maintaining two separate sites means every project update happens twice, or one version quietly goes stale. Neither is acceptable for a portfolio meant to be current.

What a single version costs:
- A product-design framing buries the GitHub links engineers want first
- A code-first framing buries the narrative recruiters want first
- One card format can't serve both a case study and a repo link equally well
- Updating one project means remembering to update it twice

What stayed constant either way:
- The same project data and screenshots
- The same carousel, motion language, and type system
- The same accessibility and performance bar

Central design question:
How might we show the same body of work to two different readers without maintaining two different portfolios?

## Design Approach
Rather than design each project card twice, I kept one shared component library and let the data feeding it — and a couple of conditionals — do the work of speaking to each audience differently:
- What can stay exactly the same across both versions?
- What's the smallest data difference that changes the reader's experience?
- When my own first attempt at an interaction feels off, what specifically is wrong with it?

That question about my own reaction to an interaction ended up doing the most work. A large share of this project's history is one round of shipping something, using it for real, and rebuilding the part that felt wrong — not redesigning from scratch, but replacing one mechanism with another closer one.

## Core Design Decisions

### 1. One Component, Two Data Sets
Both portfolio variants render through the same Mini Library carousel component. The product-design version's cards carry a caseStudyHref and expand to show role/process detail; the web-dev version's cards carry href and github fields and skip the case-study link entirely. A build-time env var picks the default route, and a global "9" keyboard shortcut lets anyone toggle between them live — the same visit, either audience.

### 2. Expand-in-Place, Not a Modal
The first version of the project carousel opened a full modal overlay per card. After using it, the modal felt like more ceremony than a short case-study blurb warranted — it interrupted the scroll instead of extending it. It was replaced with cards that grow in place: a taller preview image and a revealed role block, with only one card ever expanded at a time.

### 3. Motion That Earns Its Keep
Tab switches fade the card track out, swap its content while invisible, then fade it back in, instead of hard-cutting content mid-click. The hero-to-carousel scroll transition settles into a full view of one section or the other via a debounced scroll-check, because native CSS scroll-snap proved unpredictable in testing and was swapped out for JS that behaves the same way every time.

### 4. Accessibility as a Pass, Not an Afterthought
A dedicated sweep fixed a skipped heading level, added visible focus rings site-wide, grew touch targets to WCAG 2.2 minimums, corrected an ARIA role misuse on the carousel dots, and made faded peek cards inert so keyboard users can't tab into cards that are only 40% visible. Paired with a Lighthouse pass for contrast, font-loading strategy, and a robots.txt the SPA's catch-all rewrite had been silently swallowing.

## Designing in the Real Thing
The same bug shape bit this project twice, in two different components, months apart, and both times it was the same root cause: setting overflow-x on a container silently forces its overflow-y to auto per the CSS spec, not the value I'd intended. The first time it broke the hero section's sticky positioning. The second time it clipped a hover tooltip anchored to the top edge of a carousel card, because the carousel track's horizontal scroll had quietly done the same thing to its vertical overflow.

A second bug only showed up through use, not code review: clicking a card's outbound link intermittently did nothing. The carousel's drag-to-scroll handler was calling setPointerCapture() on every pointerdown — including ones that started on a link — which made the browser retarget the resulting click to the scroll container instead of the anchor. Neither of these would have surfaced from reading the component in isolation; both only showed up from clicking through the actual carousel the way a visitor would.

Key insight:
The bugs worth remembering weren't caught by looking at the code — they were caught by using the thing I built the way a visitor actually would, and noticing when it didn't behave the way it looked like it should.

## Outcome
The site now runs as two live deployments from one codebase — a product-design portfolio and a web-dev portfolio — sharing every component, project screenshot, and motion pattern between them, and passing a full Lighthouse accessibility, performance, and SEO sweep.

What shipped along the way:
- A full-bleed, scroll-snap project carousel with peeking side cards and expand-in-place detail
- A shared component library serving two audience-specific data sets from one build
- A site-wide accessibility pass — landmarks, focus states, touch targets, inert peek cards
- A one-click copy-to-clipboard email link with a hover tooltip, replacing a plain mailto:

## Reflection
Building my own portfolio taught me something that no client project could, because I'm the only person who has used every version of it: a design isn't finished when it looks right in a static frame, it's finished when I've clicked through it enough times to trust it. Almost everything I'd point to as a real improvement in this repo's history came from that second pass — from using the thing, not from planning it better the first time.

It also reframed what "the same project, two audiences" means. It's tempting to think of that as two designs. In practice it was one design and two small, deliberate differences in what data reaches it — which meant almost everything I built for one audience, the other got for free.

If I extended it further, I would explore:
- Real analytics on which variant visitors actually land on and how far they scroll
- A third variant testing a hiring-manager-specific entry point
- A way to write a new case study without hand-building a whole page component for it each time

Most importantly, this project left me with a question I keep coming back to:
What does this project look like the third time I use it, not the first time I ship it?
