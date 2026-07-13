# arx-website

The public website for ARX Systems — [arxsystems.org](https://arxsystems.org).

ARX Systems installs The Cespedes Method, a five-pillar operating infrastructure engagement,
into independent specialty physician practices. The Method is co-developed with
Edgardo M. Cespedes, MD. The site is editorial, restrained, and by application only.

## Stack

- **Astro 5** (`output: 'static'`) + MDX + content collections
- Plain CSS with design tokens (no Tailwind, no UI framework)
- Native View Transitions via Astro's `<ClientRouter />`
- Express front-door for the one form endpoint and to serve `dist/`
- Resend for transactional email

The rationale for every architectural choice is in [`DECISIONS.md`](./DECISIONS.md). Read that first.

## Current deploy state

**The site is in holding-page mode.** The Galen-era single-page index has been retired; the new editorial pages are scaffolded but not yet routed. Only `/` resolves; it shows a one-screen notice with a mailto link. Background: founder gated the editorial homepage behind a pixel-match against a V0 reference file, so the deeper IA was hidden to keep the holding-page deploy minimal.

The editorial pages are parked in the source tree with `_`-prefixed filenames (Astro's "skip routing" convention):

```
src/pages/_editorial-home.astro   ← will become src/pages/index.astro after sign-off
src/pages/_method/                ← /method and /method/[slug]
src/pages/_authorship.astro
src/pages/_engagement.astro
src/pages/_memo.astro
src/pages/_apply.astro
```

Restoring is `git mv` on each file; the content collection, layouts, components, styles, and `/api/memo` handler are all still wired and unchanged.

## Target information architecture (once homepage sign-off lands)

| Route | What it is |
|---|---|
| `/` | The editorial home: Thesis → Authorship → Method → Engagement → Apply |
| `/method` | The Method index — all five pillars |
| `/method/{voice,storefront,intake,scribe,funnel}` | Pillar deep-dives (content lives in `src/content/pillars/*.md`) |
| `/authorship` | Long-form Cespedes co-authorship treatment |
| `/engagement` | 8–12 week engagement calendar + FAQ |
| `/memo` | Strategy memo request form |
| `/apply` | Cal.com booking modal |

Every pillar deep-dive page surfaces its honest status: **Pillar I is live in reference, II–V are in deployment.**
That status pattern is enforced by the content schema (`src/content/config.ts`) — you cannot ship a pillar without a `status` value.

## Local development

```bash
npm install
npm run dev          # Astro dev server, hot reload, → http://localhost:4321
```

To run the full Express + dist pipeline locally:

```bash
npm run build
RESEND_API_KEY=re_xxx npm start   # → http://localhost:3000
```

Without `RESEND_API_KEY`, the memo endpoint logs the payload and returns 200. Useful in dev, dangerous in prod.

## Editing content

The five pillar pages are markdown files with typed frontmatter:

```
src/content/pillars/voice.md
src/content/pillars/storefront.md
src/content/pillars/intake.md
src/content/pillars/scribe.md
src/content/pillars/funnel.md
```

Edit the markdown, commit, push. Railway redeploys. The frontmatter is validated by Zod at build time — if you set `status: "live"` for a pillar that is not live, build is fine; if you spell `status: "shipping"`, build fails. That is on purpose.

## What lives where

```
arx-website/
├── DECISIONS.md             # Architectural decisions — read this first
├── DEPLOY.md                # Step-by-step deploy guide
├── astro.config.mjs
├── server.js                # Express front-door + memo endpoint
├── server/routes/memo.js    # /api/memo handler
├── server/routes/contact.js # Legacy Galen-era endpoint, kept until DNS cutover
├── server/routes/setup-interest.js   # Legacy
├── src/
│   ├── content/
│   │   ├── config.ts         # Zod schemas for pillars and pages
│   │   └── pillars/*.md      # Pillar content
│   ├── layouts/BaseLayout.astro
│   ├── components/{Nav,Footer}.astro
│   ├── pages/                # Routes
│   │   ├── index.astro       # Home (editorial V0)
│   │   ├── method/           # /method + /method/[slug]
│   │   ├── authorship.astro
│   │   ├── engagement.astro
│   │   ├── memo.astro
│   │   └── apply.astro
│   └── styles/{tokens,fonts,reset,global}.css
├── public/
│   ├── fonts/                # Fraunces, Inter, JetBrains Mono (self-hosted woff2)
│   ├── audio/                # Voice sample placeholder (replace once recorded)
│   └── arx-mark.svg, favicon.ico
├── private/                  # Gitignored. Drop ARX_Strategy_Memo.pdf here.
│   └── memo/ARX_Strategy_Memo.pdf
└── _legacy/                  # The Galen-era single-page index, kept for reference
    └── _legacy_src/          # The Galen-era Astro components, kept for reference
```

## What NOT to add

The brief retired the following patterns. They will not be re-introduced without an explicit, written exception:

- Pricing on public pages
- Testimonials, client logos, or social proof beyond the Cespedes Cardiology reference
- An "About" or "Team" page; a founder bio above the fold
- A chat widget, "try our agent" demo, or any in-page AI playground
- An AI-written blog
- Stock photography of doctors, hospitals, or stethoscopes
- Cookie banners or third-party tracking pixels
- Tailwind, glassmorphism, gradients, or motion-for-its-own-sake

See [`DECISIONS.md`](./DECISIONS.md) §1 and §8 and the project brief for the full rationale.

## Environment variables

| Name | Required | Default | Used by |
|---|---|---|---|
| `RESEND_API_KEY` | **Required in production.** Missing in prod = `/api/memo` **and** `/api/contact` return `503` and log the payload to stderr. Missing in dev = stub mode (logs payload to stdout, returns `200`). | unset | `/api/memo`, `/api/contact` |
| `MEMO_URL` | No | unset → confirmation email omits the link and says the memo will arrive within one business day | `/api/memo` |
| `CONTACT_EMAIL` | No | `gabrielcespedes777@gmail.com` | All form endpoints |
| `PUBLIC_CAL_LINK` | No | `arxsystems/intake` | `/apply` Cal.com iframe |
| `NODE_ENV` | No | unset (= dev / stub mode) | Strict env checks in `/api/memo` and `/api/contact` |
| `PORT` | No | `3000` | Express, set by Railway |

## Missing-env behavior (not silent)

A form submission is potentially the only channel a cold-pitched physician has into the firm. Silently swallowing submissions when `RESEND_API_KEY` is unconfigured is unacceptable. The hardened behavior — applying to **both** `/api/memo` and `/api/contact` — by environment:

- **`NODE_ENV=production` + no `RESEND_API_KEY`** → endpoint returns `503` with an error body pointing the user to `gabriel@arxsystems.co`. The failure is logged to stderr with the request body, surfaced in Railway logs (search `UNDELIVERED SUBMISSION`).
- **`NODE_ENV=production` + key set** → emails sent normally.
- **Dev (any `NODE_ENV` ≠ `production`) + no key** → stub mode. Payload printed to stdout, `200` returned. Stub mode is announced on boot via a `console.warn` so it cannot be confused for prod.
- **Dev + key set** → emails sent (useful for testing the real flow).
