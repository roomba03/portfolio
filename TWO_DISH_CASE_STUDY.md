# Two Dish: Ordering Around a Kitchen's Real Limits
A product study in designing scarcity as a promise rather than an apology

## Overview
Two Dish is an ordering site for a small home catering kitchen cooking Hyderabadi food. The kitchen already ran on a very specific rhythm: one dish a day, cooked fresh in small batches to match exactly that day's headcount, ordered by midnight the night before, delivered in one of two evening slots inside a radius the cook could actually drive.

Every one of those is a constraint that ordinary food-ordering software treats as a problem to work around. The design premise here was the opposite: build the interface out of the constraints, so the thing the kitchen is good at is the first thing the customer sees.

## My Role
Solo project, designed and built over roughly eleven weeks for a real client kitchen.
- Product definition and ordering-flow design
- Design system — palette, type, shape, and photography rules
- Interaction design across storefront, checkout, and cook dashboard
- Frontend implementation (Next.js, React, Tailwind)
- Data model and server-side ordering logic (Supabase/Postgres)

## The Problem
Off-the-shelf ordering patterns are built for restaurants with a standing menu, elastic inventory, and a delivery network. A one-person kitchen has none of those. Dropping this business into a generic storefront would let customers do things the kitchen physically cannot honor.

> Every limit hidden until checkout becomes a rejection. Every limit shown up front becomes a reason to trust the food.

Where generic patterns break:
- A browsable catalog implies anything can be cooked today
- Open quantity fields oversell a fixed batch
- Address entry fails only after the cart is full
- Any-time delivery ignores a two-slot evening route
- Nothing communicates the order-by-midnight cutoff

What the kitchen actually needed:
- A schedule customers read as a menu
- A hard headcount per cooking day
- A delivery boundary drawn, not typed
- Tools to plan ingredients against real orders

Central design question:
How might we design an ordering experience where a kitchen's limits are the first thing a customer understands, instead of the last thing they discover?

## Design Approach
Instead of starting from a menu page and bolting on restrictions, I started from the kitchen's weekly rhythm and asked what the customer needed to see at each step:
- What does the customer need to know before they get attached to an order?
- Which limits can be shown as information rather than enforced as errors?
- What does the cook need on a Tuesday morning to cook the right amount?

That produced two surfaces designed together rather than in sequence: a storefront built around a seven-day schedule, and a cook dashboard where the schedule, the headcount, the ingredient math, and the delivery boundary are all editable by the person doing the cooking.

## Core Design Decisions

### 1. The Schedule Is the Menu
Customers browse dates, not a catalog. Each date carries exactly one dish — a rule enforced all the way down in the data model, where one kitchen can hold only one scheduled dish per delivery date. The homepage leads with the next few days so the first impression is "here is what's cooking", not "here is everything we could make".

### 2. Draw the Boundary, Don't Type It
The cook draws her real delivery zone as a polygon on a map; customers check their address against it on the homepage before they ever reach a cart. Geocoding plus a point-in-polygon test answers a yes/no question honestly, with a ZIP-code list kept as a fallback for when lookup fails.

### 3. Capacity as a Visible Idea
Each cooking day carries a maximum headcount and a running count against it. Low-stock and slot-full states surface while the customer is still choosing, and the final claim on a spot happens in a single locked database operation so two people checking out at once can't both take the last portion.

### 4. One Accent Doing All the Work
The system landed on two tones and nothing else: ivory carrying every surface and every line of text, amber-gold reserved for headings, prices, links, active states, and the single primary action per view. Hairline borders separate cards from the ground instead of a second fill. Anything that would normally claim its own color earns hierarchy from type and spacing instead.

## Designing in the Real Thing
The visual system did not land on the first attempt. An early sage-and-terracotta palette was applied across the whole app and then judged in context — where it read cluttered, with too many colors competing for the same job. Rather than argue it out in static mockups, I put alternate palettes behind a keyboard toggle on the live site so entire versions could be compared in real use, on real content, with the client watching.

That let the system get simpler in public. The winning version started with three pale tones that turned out to be indistinguishable at text size — making the hierarchy look arbitrary — and was cut down to two: one neutral for everything, gold for the things that matter.

Key insight:
A palette can only be evaluated at full scale. Two tones that read as distinct in a swatch can read as the same off-white in a paragraph.

## Outcome
Two Dish shipped as a complete two-sided product — a storefront and the kitchen tools behind it — rather than a marketing site with a form attached.

Customer side:
- Seven-day schedule with next-days preview and add-to-cart on hover
- Address check against the live delivery zone before ordering
- Accounts with saved, zone-validated delivery addresses
- Cart that catches mixing dishes from two different days
- Checkout with delivery-slot choice and order history

Kitchen side:
- Schedule a dish and headcount per date
- Dish management with real photo uploads
- Ingredient ratios that scale to the day's orders
- Production run view with per-dish subtotals
- Map editor for redrawing the delivery zone

## Reflection
I started this project trying to fit a kitchen into an ordering pattern, and spent most of it doing the reverse. The interface got better every time I stopped treating a limitation as something to soften — the single dish, the midnight cutoff, the drawn boundary, the fixed headcount — and let it be the structure the customer navigates.

The other pattern I noticed in my own decisions: nearly all the ones I'd defend were subtractive. A filter tab removed from the production view. A redundant heading pulled off the empty cart. Three tones cut to two. A duplicate login path collapsed into one. The system got more legible every time something came out of it.

If I extended it further, I would explore:
- A standing-order flow for regulars
- A way for the cook to see demand shape before committing a dish to a date
- Delivery routing built from the zone polygon rather than left as a manual evening drive

Most importantly, this project left me with a question I keep coming back to:
What if the limits of a business are the most honest thing you can show a customer?
