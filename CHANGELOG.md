# Design Changelog

A running record of design changes and iterations on this site, newest first. Built from the commit history, `DESIGN.md`, and the case study pages. A "Why" line only appears where the reasoning was written down at the time; entries without one say what changed but not why.

New entries go at the top whenever a visible change ships.

---

## 2026-09-27: Performance, agent readability, and cleanup

- **Images compressed.** The Two Dish, Busy Bunny, and portfolio card screenshots moved from PNG to resized WebP, taking the page from about 3 MB to about 250 KB.
  - Why: they were the main thing slowing the mobile Lighthouse score (87).
- **Fonts self-hosted.** Fredoka and Courier Prime now load from the site itself, with the two Courier Prime weights preloaded. The unused Switzer font was dropped.
  - Why: the Google Fonts and Fontshare stylesheets blocked first paint by about 1.1s on mobile.
  - Result: mobile performance 99, desktop 100; first paint on mobile went from 2.9s to 1.5s.
- **Added `llms.txt`** and stopped the SPA rewrite from answering `/.well-known/*` with the HTML page.
  - Why: Lighthouse's Agentic Browsing checks were reading the HTML page instead of real files (score 50, now 100).
- **Removed the hero-to-carousel scroll snap** from the web-dev page.
  - Why: only the web-dev version had it, and keeping both versions behaving the same mattered more than the snap.
- **Nav links go back to black after hover.** They had been turning dark brown (`#332F1C`) after hover instead of returning to their starting black.
- **Two Dish card copy now matches on both portfolios** (description and tags: Next.js, Supabase, Leaflet).
- **Cleanup:** removed unused components, starter-template assets, six unused background images, commented-out experiments (halftone field, stamp test, paper texture overlay), and the "More to come" slide code. Shared case study building blocks moved into `CaseStudyKit.jsx`.
- **Case study copy:** updated Lighthouse scores, reworded the solo-project line to credit Claude Code as a pair programmer, and rewrote Decision 03 to reflect the snap removal. `PORTFOLIO_SITE_CASE_STUDY.md` was renamed to `DESIGN.md`.
- **Known issue, deferred:** the hero headline, name, and case study headings use Mac-only system fonts (Apple SD Gothic Neo, Lao MN, Bangla MN), so other platforms see a generic sans-serif fallback.

## 2026-09-23: Signifiers pass and case study rewrites

- **Carousel arrows added** beside the active card.
  - Why: the carousel relied on drag, swipe, and the dots, none of which announce themselves at a glance. The arrows borrow the inactive tab's raised teal shadow so they read as clickable, and sit outside the scroll container so native scrolling is untouched.
- **Tab shadows swapped.** The inactive tab now gets the larger teal shadow and the active tab a smaller muted one, with both tabs matched in height.
  - Why: the active tab had the raised shadow, so the tab you were already on looked like the thing to click. Along the way, a shadowless active tab looked unfinished, an inset shadow rendered as a gray bevel, and nudging the tab into its shadow knocked the labels out of line.
- **Hero role tags lost their offset shadow** in favor of a soft, centered teal glow with no hover state.
  - Why: a hard offset shadow on this site means "you can press this," and the tags couldn't answer a click. Any hover response still read as interactive.
- **Added the "Shadows as Signifiers" section** to the portfolio case study, documenting the three fixes above.
- **Busy Bunny case study rewritten:** leads with the award, introduces Anya the bunny companion, adds whiteboard sketches, a mood grid (three moods across three poses), and a Hoppenheimer figure, names teammates, and trims the problem section.
- **Two Dish case study rewritten:** frames the client as a family home catering kitchen, adds real storefront and cook-dashboard screenshots, and replaces the outcome lists with a launch-status summary.
- **Em dashes removed** from all three case studies and the web-dev card role lines.
- **Two Dish now leads both Selected Work carousels.**
- **Role tags added to the portfolio hero** (Product Designer, UX Engineer). **The "More to come" card was dropped.**
- **Case study images framed** with a border and offset shadow.

## 2026-09-16 to 09-18: Case studies arrive

- **Two Dish and Portfolio Site case studies added** alongside Busy Bunny. All three share one teal/sage palette rather than each inventing its own accent.
- **Case study tiles became whole-tile links** with a hover lift. "Visit site" moved into the case study page itself. Cards without a case study (the web-dev set) keep expand-in-place.
- **Fixed two shadow rendering bugs:**
  - Dimmed peek cards rendered their shadow at 0.4 × 0.4 = 0.16 opacity, because the card's opacity multiplies with the shadow's own alpha. Inactive cards now boost their shadow alpha to compensate.
  - The tallest card's shadow was clipped, because the track's `overflow-x: auto` forces `overflow-y: auto` and the height measurement ignored the shadow. Added fixed clearance.
- **Portfolio case study cover and tile updated.** The tile uses a close-up of the hero's star cluster instead of a cropped screenshot, matching the playful feel of the other tiles.

## 2026-09-08: Copy-to-clipboard email

- **Email links copy the address** instead of opening a mail client, with a "Copied!" confirmation. The footer email gained a speech-bubble tooltip matching the site's hotspot style.

## 2026-08-19 to 08-20: The Mini Library redesign

The biggest iteration so far: the grid of project cards became a carousel, prototyped on the web-dev page first and then brought to the portfolio page.

- **Prototype:** duplicated the Selected Work section on the web-dev page and built the new interaction in the copy, keeping the original for reference.
- **Mini Library carousel:** a tabbed, scroll-snap horizontal carousel (Selected Work / Mini Projects) with dots, wheel/touch swipe, and click-drag. The first version opened a modal per card.
- **Modal replaced with expand-in-place cards** (taller image, revealed role block, one card expanded at a time).
  - Why: the modal felt like more ceremony than a short case-study blurb warranted; it interrupted the scroll instead of extending it.
- **Full-bleed track with peeking side cards,** scaled to 0.86× and faded to 40%.
- **Both tabs share one track height,** with cards vertically centered.
  - Why: switching to the shorter Mini Projects tab was shifting the dots and section height.
- **Tab switches crossfade** (the pill updates instantly, the cards fade out, swap, and fade back in).
  - Why: swapping cards, index, and scroll in the same frame as the click read as an abrupt hard cut.
- **Hero-to-library scroll snap added** as a JS scroll-check (later removed on 2026-09-27).
  - Why: scrolling down stopped mid-transition; native CSS scroll-snap proved unpredictable in testing.
- **Hover speech bubbles restored** on the active card (Busy Bunny's "Hire me!", the gnome's quip), then the gnome quip was commented out.
- **Carousel brought to the portfolio page** for consistency, with a single-tab mode and a "More to come" placeholder.
  - Why for the placeholder: with one project, scrolling past it should read as "more on the way," not the carousel running out.
- **Case study links restored** on portfolio cards via an optional `caseStudyHref`, then made the only link on those cards.
- **Two Dish card added.**
- **Bugs found by using it:**
  - Cards could expand but never collapse, because the drag handler reset expand state on every plain click.
  - Card links intermittently did nothing, because `setPointerCapture()` on every pointerdown retargeted the click to the scroll container.
  - A tooltip anchored at the top of a card was clipped by the same overflow-x/overflow-y rule that had already bitten the hero.
- **Accessibility sweep:** fixed a skipped heading level, added site-wide focus rings, grew touch targets to WCAG 2.2 minimums, added header/nav landmarks, and hid the decorative canvas from screen readers.
- **Lighthouse pass:**
  - Fonts moved from CSS `@import` to preconnect plus stylesheet links; the `@import` chain was render-blocking.
  - Muted text darkened to clear 4.5:1 contrast.
  - Carousel dots changed from `tablist` to `group`, since they're position indicators, not tabs.
  - Added `robots.txt` and a meta description; the SPA rewrite had been swallowing `/robots.txt`.
- **Peek cards made inert.**
  - Why: they looked out of reach but keyboard users could still tab into them, and Lighthouse was flagging contrast on dimmed text never meant to be read.
- **Old grid-based Selected Work removed** once the carousel was accepted.

## 2026-07-06 to 08-19: Small fixes

- Added a wireframes / early explorations image to the Busy Bunny case study.
- **Fixed the ink-bleed hover eating the trailing period** on "intention." and "understanding."
  - Why: the reveal font renders wider than the base text, and its shadow painted over the period. The period now fades with the word.
- Removed the yellow sparkle accent from the favicon.

## 2026-06-22 to 06-24: First version and the web-dev variant

- **Initial site** with a "hi :)" hover tooltip on the name.
- **Busy Bunny page polish:** matched button styles with a press-down hover shadow, and made the firework hover bigger, brighter, and gold/pink.
- **`/web-dev` variant added** with a catch-all route so unknown URLs redirect instead of rendering blank.
- **Web-dev cards redesigned** as case-study-style cards with real screenshots, tech tags, blurbs, and a winner badge. Card shadows were softened, card bodies recolored cream, and the favicon became a star, matching the site's star motif.
- **Web-dev extras:** GitHub links on every card, role tags in the hero, hover quips, sans-serif descriptions, and a global "9" key to switch between versions.
- **Separate web-dev deployment** via `VITE_DEFAULT_ROUTE`, so a second Vercel project from the same repo defaults to `/web-dev`.
  - Why: a dedicated link for the web-dev focused version.
- Added `vercel.json` with the SPA rewrite rule.
