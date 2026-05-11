# ARX Systems — Website & Code Audit
**Date:** 2026-05-06
**Scope:** `kaiserfriedrichwilhelm3/arx-website` (live marketing site) + `kaiserfriedrichwilhelm3/arx-portal` (built, undeployed setup wizard)

---

## 1. Executive Summary

| Asset | State | Stack | Verdict |
|---|---|---|---|
| **Marketing site** | Live at `arx-website-production.up.railway.app` | Express + single static `public/index.html` | Polished, working, well-designed. Some documentation drift and a few small code-hygiene issues. No security blockers. |
| **`/setup` endpoint** | Live but **unlinked from homepage** (standing-by per your earlier decision) | Express + `public/setup.html` (single-page form, localStorage progress, Resend email) | Functional. Ready to re-link when you're ready to capture leads through it. |
| **Portal (Next.js wizard)** | Pushed to GitHub, **not deployed** | Next.js 16 App Router, Auth.js v5, Prisma + Postgres | Spec-compliant for §1–3 of `PORTAL_UI_SPEC.md`. Build green. Deployment guide in repo README. Stripe stays as a clean placeholder until you say go. |

**Top-3 priority items, in order:**

1. **Documentation drift in marketing repo.** `CLAUDE.md` and `README.md` both reference the long-deleted Next.js architecture. Anyone (human or AI) opening that repo cold will get wrong mental model. Cost to fix: 10 minutes.
2. **No analytics on the marketing site.** Conversion funnel is invisible. The contact form fires emails into a Gmail inbox with no aggregate visibility. Cost to fix: ~30 minutes (Plausible script + custom event tracking).
3. **`/setup` is dark inventory.** A working form sits at `arxsystems.org/setup` that no homepage CTA reaches. If you want to keep it standby, leave it; if you want to capture leads through it, three to seven hrefs need to point at it again.

---

## 2. Marketing Website Audit

### 2.1 Live behavior (verified in Chrome, 2026-05-06)

The site is a **single-page SPA-style experience over a single static HTML file.** All four "paths" (about / partners / galen / custom) are pre-rendered inside `public/index.html` and a JavaScript `selectPath(name)` function toggles which `<div id="path-{name}">` is `display:none` vs visible. Path switching scrolls to top + re-arms the IntersectionObserver-driven `.reveal` animations.

**Landing experience (default path = about):**
- Top nav: ARX Systems / Systems lockup left; nav links About, Partners, **Get Started** (gold-filled button) right. Mobile collapses to hamburger.
- Hero h1: *"We fix key problems with revolutions in technology."* + subhead.
- Hero CTAs: `Explore Galen →` (primary navy fill) + `Custom Project` (ghost outline).
- Reveal-on-scroll animations stagger every card and section as it enters viewport.
- Footer (dark navy, persistent across paths): "ARX SYSTEMS / Galen" lockup, copyright, How It Works · Pricing · Security · Contact · LinkedIn ↗ · Privacy · Terms.

**Galen path** (the actual product surface):
- Nav rewrites to `ARX SYSTEMS / Galen` lockup + extra links How It Works · Pricing · Security · **Request Analysis** (the latter is a gold-filled button that smooth-scrolls to the contact form after switching paths).
- Hero: *"Your front desk, answered. Every call, every time."* with a clean dashboard-mock card on the right showing simulated live call rows (AI/HUMAN tags, names like D. Wright / J. Park / R. Singh, status pills `ROUTED`/`RESOLVED`/`BOOKED`, timer values). KPIs tick subtly every 2.4s via `setInterval`.
- Hero CTAs: `Request Analysis →` + `See How It Works ↓` (smooth-scrolls to `#how`).
- 3 stat cards below hero meta line: `Zero-Retention Architecture` · `BAA Signed with every contract` · `24/7 Always answered`.
- Section `01 THE PROBLEM` → "Every unanswered call is a patient walking out the door." + 3 stats: `67%` of voicemail-reaches don't call back · `2-3 hrs` lost per provider per day to admin · `$150K+` annual revenue lost.
- Section `02 HOW IT WORKS` → "Three steps. No staff training." → three cards: Step 01 *Galen answers*, Step 02 *Galen books*, Step 03 *You see everything*.
- Section `03 MULTI-LANGUAGE` → "Language is no longer a barrier. *It is a pathway.*"
- Section `04 PRICING` → "Three tiers. Transparent pricing." → three pricing cards.
- Section `05 SECURITY` → dark navy block with BAA + zero-retention messaging, ending with the architecture-not-policy quote.
- Section `06 WHY ARX SYSTEMS` → "A direct line to engineers who know clinical environments." + 4-item bullet list (same-day Slack, healthcare experience, configuration in hours not release cycles, founding-tier pricing locked).
- Section `07 CONTACT` → "Request your free front desk audit" — form with practice / name / email / phone / specialty (select) / volume (select) / message (optional textarea) → `Request Your Free Front Desk Audit →`.

**Custom Project path:**
- Single contact form variant with name / email / business / website / call volume / current revenue / purpose / pain points fields.
- Submit label: `Submit Project Brief →`.

**Mobile (390×844 viewport, verified):** Layout collapses cleanly. Hamburger menu appears top-right. Cards stack to single column. Typography stays readable. No horizontal scroll. No overflow.

### 2.2 Pricing tiers (verified vs code)

| Display name | Monthly | Setup fee | Best for | CTA on card |
|---|---|---|---|---|
| The Receptionist | $400/mo | + $500 one-time | Single-provider | `Get Started →` (ghost) |
| The Command Center · *Most Popular* | $900/mo | + $1,500 one-time | Multi-provider | `Get Started →` (gold) |
| The Full Stack | $1,500–2,000/mo | + $3,000 one-time | Complete digital upgrade | `Request a Consultation →` (ghost) |

All three CTAs anchor to `#contact` (the Galen contact form). No self-serve path links from anywhere on the homepage today.

### 2.3 CTAs inventory

| Location | Label | Target | Style |
|---|---|---|---|
| Nav (default) | Get Started | `selectPath('galen')` | navy primary button |
| Nav (galen) | Request Analysis | switches path + smooth scroll to `#contact` | navy primary button |
| Hero (about) | Explore Galen → | `selectPath('galen')` | navy primary |
| Hero (about) | Custom Project | `selectPath('custom')` | ghost outline |
| Hero (galen) | Request Analysis → | `#contact` (in-page) | navy primary |
| Hero (galen) | See How It Works ↓ | `#how` | ghost outline |
| About footer block | Explore Galen → | `selectPath('galen')` | gold |
| About footer block | Custom Project | `selectPath('custom')` | ghost |
| Pricing × 3 | Get Started / Get Started / Request a Consultation | `#contact` | mixed |
| Galen contact submit | Request Your Free Front Desk Audit → | `POST /api/contact` | navy |
| Custom Project submit | Submit Project Brief → | `POST /api/contact` (`type: custom`) | navy |

**Conversion paths:** All visitor flows funnel into one of two destinations — the Galen contact form (`#contact` on the Galen path) or the Custom Project contact form (`#contact` on the Custom path). The setup-wizard wedge that previously existed is fully removed from the homepage; `/setup` is reachable only via direct URL.

### 2.4 Architecture

```
arx-website/                         # Railway-deployed Express service
├── server.js                        # 9.7KB — two POST endpoints + static
├── public/
│   ├── index.html                   # 81KB — entire site, one file
│   ├── setup.html                   # 18KB — standby setup-interest form
│   ├── favicon.ico, arx-mark.svg
│   └── {next,vercel,file,globe,window}.svg   # unused leftovers from old Next.js scaffold
├── package.json                     # express ^4.21.2 + resend ^4.0.1
├── railway.toml                     # nixpacks builder, npm start
├── nixpacks.toml                    # nodejs_20, npm install --omit=dev
├── .node-version                    # 20.19.0
├── AGENTS.md
├── CLAUDE.md                        # STALE — describes Next.js stack
└── README.md                        # STALE — default create-next-app boilerplate
```

**Backend (server.js):**
- Express 4 with two POST endpoints: `/api/contact` (handles `type: galen` and `type: custom`) and `/api/setup-interest` (the standby setup wizard's submit target).
- In-memory rate limiter: 5 requests per hour per IP, shared across both endpoints.
- Static middleware mounted at `/` with `{ extensions: ['html'] }` so `/setup` resolves to `public/setup.html` without the suffix.
- Resend integration with graceful no-op fallback when `RESEND_API_KEY` is unset (logs payload to stdout — useful in local dev, less useful in prod if the key gets unset accidentally).
- Email recipient defaults to `gabrielcespedes777@gmail.com` (overridable via `CONTACT_EMAIL` env var).
- Validation: required fields + email regex + tier whitelist (for setup-interest).

**Frontend (index.html):**
- 1649 lines including ~80KB of CSS-in-`<style>` + ~280 lines of inline `<script>` at the bottom.
- Self-contained — no external JS frameworks, no build step, no compile.
- IntersectionObserver-driven reveal animations on every `.reveal` element (threshold 0.08).
- Two HTML forms with client-side validation that POST to `/api/contact` via fetch.
- Path selector pattern: `selectPath(name)` mutates DOM visibility + scroll position + nav link visibility + footer link content.

**Frontend (setup.html):**
- 17.8KB standalone single-page form with full CSS + JS inline.
- 3-section flow: tier picker (3 cards) → practice info → contact.
- localStorage auto-save under key `arx-setup-progress-v1` (debounced 300ms), with a "Welcome back" resume banner on revisit.
- `?tier=` URL parameter pre-selects the tier (used to be sourced from Start Setup CTAs; today only useful for direct links).
- POST to `/api/setup-interest`. On success: localStorage cleared, success panel swaps in.

### 2.5 Issues found

**Severity legend:** 🔴 blocker · 🟠 important · 🟡 nice-to-fix · 🔵 cosmetic/cleanup

#### Documentation

🟠 **`CLAUDE.md` is wildly stale.** Describes the old Next.js architecture: `_document.tsx`, `next/font/google`, `motion/react v12`, `Pages Router — NOT App Router`, `'use client'` directives, etc. The repo is now plain Express + static HTML — none of this applies. An agent reading this file will produce wrong code suggestions. **Fix:** rewrite to describe the current Express + static HTML stack, the path-selector pattern, the IntersectionObserver reveal system, and the `/api/contact` + `/api/setup-interest` endpoints. ~10 min.

🟠 **`README.md` is the default create-next-app boilerplate.** "This is a Next.js project bootstrapped with `create-next-app`..." with links to `pages/index.tsx`. Nothing in the repo matches. **Fix:** replace with a short "this is the marketing site, here's how to run it locally, here's how it deploys to Railway" doc.

🟡 **`AGENTS.md` exists but was not reviewed in this audit.** Worth checking it's not similarly out of date.

#### Code hygiene

🟡 **Dead asset files** in `public/`: `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg` — leftovers from the original Next.js scaffold, never referenced from any HTML/CSS. Total ~3KB wasted but they confuse a cold reader. **Fix:** `rm public/{next,vercel,file,globe,window}.svg`.

🟡 **`setup.html` is unreachable from the site UI.** Per your "stand-by but remove from website" decision, this is intentional. Just be aware that any visitor who knows the URL can still submit the form and email you. Keep, drop, or password-gate as you prefer.

🟡 **Rate limit window is shared across endpoints.** A spam wave on `/api/contact` will also block `/api/setup-interest` requests from the same IP and vice versa. Acceptable for current traffic; revisit if either endpoint becomes high-volume.

🟡 **Email "Reply-To" footer in `emailShell` says `Reply-To: ${name}`** (the user's name, not the email). Cosmetic bug — the actual Resend `replyTo` header is set correctly to the email address; this is just the wrong label inside the email body footer. One-character fix.

🟡 **`navCtaCustom` and `navCtaDefault` always exist in HTML but visibility depends on the active path.** This is fine, but the IDs are referenced by the JS at line 1418-1419 even though they're never explicitly hidden in a way that drops the gold-button visual treatment. Behaviorally correct, just a bit verbose.

🔵 **`successHTML(title, body)` is XSS-vulnerable in principle** — it interpolates `title` and `body` directly into `innerHTML`. Today only static strings are passed, so it's safe. If you ever route user input through this helper, sanitize first.

#### Accessibility

🟡 **Path cards use `role="button"` + `tabindex="0"` + keydown handler** for Enter/Space — good. Each card has its own visible focus state. ✓

🟡 **Reveal-on-scroll animations might affect users with `prefers-reduced-motion`.** The current implementation just adds the `in` class on intersection; the actual fade is in CSS. No explicit `@media (prefers-reduced-motion: reduce)` rule disables the transition. Easy fix: wrap reveal transitions in a media query that turns them off for reduced-motion users.

🟡 **Form `<select>` elements** have no aria-described error messages — when validation fails, the error text is appended as a sibling `<div class="err">`. Screen readers may or may not pick it up. Adding `aria-describedby` on the input → error div would help.

#### SEO / Discovery

🟡 **No `<meta description>` matching the actual product** — the page title is "ARX Systems — AI Solutions for Modern Business" but the description is not visible to me from the audit. Worth verifying.

🟡 **No structured data** (`schema.org`). For a B2B medical-AI product, `Organization` + `Product` + `Offer` (with the three pricing tiers) would help search engines surface ARX better.

🟡 **No Open Graph image** in the audit — worth confirming. Social shares of `arxsystems.org` will be plain-text otherwise.

🟡 **`robots.txt` / `sitemap.xml`** — neither exists. For a single-page site this matters less, but a sitemap helps crawlers find the page faster.

#### Observability

🟠 **Zero analytics.** No way to see how many visitors hit the page, which path they pick (about vs galen vs custom), how far they scroll, or how many submit a form. Form submissions land in your Gmail; everything else is invisible. **Fix:** add Plausible (privacy-friendly, ~1KB script) or Umami. Custom events on path-selector clicks + form submits gives you the funnel.

🟠 **No error logging.** If a visitor hits a `/api/contact` failure (Resend down, validation bug, etc.), the error goes to Railway's container logs and you'll never know unless you check. **Fix:** ship Resend failures to an alerting webhook (Slack/Discord/email) so you find out about issues in real time.

#### Performance

🟢 **Page weight is small** — single HTML file at 81KB + a 26KB favicon + a 1KB SVG mark = ~108KB total for the homepage. Fast.

🟢 **No external fonts** — uses native system font stack. Zero font-loading flash.

🟢 **No third-party scripts.** Whole site loads from one origin. Excellent privacy posture.

🟡 **CSS is inlined** in `<style>` — fine for a single-file site, slightly slower for repeat visits (no cacheable separate stylesheet). Acceptable tradeoff for simplicity.

#### Security

🟢 **HTTPS enforced** by Railway by default.

🟢 **No secrets in client code.** Resend key lives in Railway env vars; client just calls `/api/contact`.

🟡 **No CSRF protection** on the two POST endpoints. For low-stakes contact forms this is acceptable; standard practice on any auth-bearing endpoint. Worth knowing if any endpoint ever returns sensitive data.

🟡 **In-memory rate limiter resets on every deploy/restart.** If you scale to multiple Railway instances, the limiter becomes per-instance (so an attacker hitting different containers can multiply the limit). Single-instance today, so it's fine.

🟡 **No CSP header** (Content-Security-Policy). Wouldn't add much for a single-origin static site, but `frame-ancestors 'none'` would prevent the site from being iframed.

---

## 3. Portal (`arx-portal`) Audit

### 3.1 Architecture

```
arx-portal/                          # Next.js 16, undeployed
├── app/
│   ├── (root)/ layout.tsx, page.tsx, globals.css   # Landing → redirect to /setup
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts             # Auth.js v5 handlers
│   │   ├── catalog/{route,cascade,price}/route.ts  # Catalog + pure-function endpoints
│   │   └── tenants/{route, [id]/route, [id]/{draft,generate-prompt,submit-pending,validate}/route}.ts
│   ├── setup/
│   │   ├── layout.tsx                              # Auth gate; redirect to /sign-in if unauthed
│   │   ├── page.tsx                                # Redirect to /setup/tier
│   │   ├── tier/{page,tier-picker}.tsx             # Step 1
│   │   ├── describe/{page,describe}.tsx            # Step 2
│   │   ├── prompt/{page,prompt-editor}.tsx         # Step 3
│   │   ├── modules/{page,module-grid}.tsx          # Step 4
│   │   ├── review/{page,review-screen}.tsx         # Step 5 (animated reveal)
│   │   ├── pay/page.tsx                            # Step 6 (Stripe placeholder)
│   │   └── done/page.tsx                           # Success after payment-pending
│   ├── sign-in/page.tsx                            # Google + magic-link
│   ├── verify/page.tsx                             # "Check your email"
│   └── dev/autosave/{page,harness}.tsx             # NODE_ENV-gated test harness
├── components/setup/
│   ├── TopBar.tsx, ProgressBar.tsx, StepFooter.tsx, Toast.tsx, PaymentPlaceholder.tsx
├── lib/
│   ├── catalog.ts, dependency-cascade.ts, pricing.ts   # Provisional pure functions
│   ├── prompt-generator.ts                              # Template stub
│   ├── tenant-state.ts                                  # State machine (atomic transitions)
│   ├── tenant-status.ts                                 # Status enum + type guard
│   ├── tenant-helpers.ts                                # findOrCreateActiveDraft, parseDraft
│   ├── auth-helpers.ts                                  # session + dev-bypass header
│   ├── rate-limit.ts                                    # in-memory sliding window per tenant
│   ├── use-debounced-auto-save.ts                       # 800ms debounce hook
│   ├── email.ts                                         # Resend wrapper (logs in dev)
│   └── db.ts                                            # Prisma singleton
├── prisma/
│   ├── schema.prisma                                    # Postgres, 5 models
│   └── migrations/0001_init/migration.sql
├── auth.ts                                              # Auth.js v5 config
├── docker-compose.yml                                   # Local Postgres
├── railway.toml, nixpacks.toml, .node-version           # Deploy config
└── README.md                                            # Up-to-date deploy doc
```

### 3.2 Stack versions (verified)

| Dependency | Version | Notes |
|---|---|---|
| `next` | 16.2.4 | App Router, Turbopack |
| `react` | 19.2.4 | |
| `next-auth` | 5.0.0-beta.31 | Auth.js v5 — still beta but widely used in production |
| `@auth/prisma-adapter` | 2.11.2 | |
| `prisma` / `@prisma/client` | 6.19.3 | Pinned to 6 because Prisma 7 changed schema config in a breaking way (see commit history) |
| `tailwindcss` | 4.x | CSS-first config via `@theme` in globals.css |
| `diff` | 9.0.0 | Word-level diff in Step 3 |
| `resend` | 6.12.2 | Email |
| Node | 20.19.0 (pinned) | Matches marketing repo |

### 3.3 Spec compliance vs `PORTAL_UI_SPEC.md`

| Spec section | Implemented | Notes |
|---|---|---|
| §1.1 Aesthetic Inheritance | ✅ | Obsidian/Gold/Playfair/JetBrains Mono via CDN, glassmorphism nav, 0.5px borders, no heavy shadows |
| §1.2 Color tokens | ✅ | All 9 tokens in `app/globals.css` under `:root` + Tailwind `@theme inline` |
| §1.3 Typography | ✅ | Playfair Display / Inter / JetBrains Mono via Google Fonts `<link>` (Railway-friendly) |
| §1.4 Layout constants | ✅ | `--max-content: 1200px`, `--max-card: 880px`, `--radius-card: 4px` |
| §2.0 Universal chrome | ✅ | `<TopBar>` + `<ProgressBar>` + `<StepFooter>` |
| §2.1 Step 1 — Tier picker | ✅ | 3 cards, recommended pill on Pro, click-to-select, auto-save, Custom routes to sales |
| §2.2 Step 2 — Describe | ✅ | Split layout, optional prompt pills, word counter (soft 500 / hard 2000), examples accordion, generating overlay |
| §2.3 Step 3 — Review prompt | ✅* | Side-by-side panes, word-level diff. **Deviation:** edit happens in `<textarea>` + a separate Diff Preview panel below (instead of inline highlighted contentEditable — pragmatic call to avoid cursor-management hell). |
| §2.4 Step 4 — Pick modules | ✅ | 6-card grid, toggle, cascade auto-enable with toast, blockers tooltip, sticky live price summary |
| §2.5 Step 5 — Animated reveal | ✅ | CSS keyframe stagger (120ms apart), gold-dot pulse on enabled modules, `prefers-reduced-motion` honored |
| §2.6 Step 6 — Stripe checkout | 🚧 placeholder | `<PaymentPlaceholder />` component swaps cleanly for `<StripePaymentElement />` later. Order summary + recurring disclosure already in place. |
| §3.1 Tenant state machine | ✅ | All six states + all seven transitions enforced via atomic `updateMany` in `lib/tenant-state.ts`. Smoke-tested. |
| §3.2 Auto-save persistence | ✅ | 800ms debounce, partial drafts allowed, validation gates only at Step 5 |
| §3.3 Auth | ✅ | Google + magic-link, database sessions (not JWT), session revocable |
| §3.4 API endpoints | ✅ | All eight spec endpoints implemented (plus the dev-only `submit-pending` placeholder for the Stripe slot) |
| §3.5 File structure | ✅ | Matches spec layout |
| §3.6 Catalog sharing (Python ↔ TS) | ⚠️ | Currently TS-only. Spec says canonical catalog lives in Python; portal hosts provisional stubs in `lib/catalog.ts` + `lib/prompt-generator.ts`. Swap point is a single route-handler change per spec. Documented in code comments. |
| §4.3 Risks — auto-save abuse | ✅ | 10 req/sec/tenant in `lib/rate-limit.ts` |
| §4.3 Risks — Stripe race | N/A | No real Stripe yet |
| §4.3 Risks — catalog drift | ⚠️ | No CI check yet (no CI configured at all). When Python catalog ships, add a build-time type-generation check. |
| §4.3 Risks — animated reveal too long | ✅ | Capped at ~1.3s total; skip button not implemented but `prefers-reduced-motion` is. |

### 3.4 Code quality

🟢 **TypeScript-strict throughout.** No `any` types. Every route handler uses typed params, every component has a `Props` interface.

🟢 **Pure functions are honestly pure.** `cascade()` and `price()` take their inputs and return their outputs with zero side effects. Easy to unit-test if you add tests.

🟢 **State machine assertions are atomic.** `transition()` uses Prisma's `updateMany` with `where: { id, status: from }` so a stale client cannot drag a tenant backwards under a race.

🟢 **Auth dev-bypass is properly NODE_ENV-gated** (`lib/auth-helpers.ts`). Production refuses the `x-arx-dev-user-id` header; dev accepts it and upserts a dev user.

🟢 **No hardcoded secrets.** `.env.example` documents every required variable. `.env` is gitignored.

### 3.5 Issues found

🟠 **No deployment.** The portal exists on GitHub but has never been deployed. Until it is, none of the work is reachable by real users. **Fix:** Railway service + Postgres addon + env vars (full instructions already in `README.md`). ~10 minutes once you decide to do it.

🟠 **No tests.** Zero. Not a single `*.test.ts` file. Pure functions (`cascade`, `price`, `validateForConfigured`) are perfect candidates for fast unit tests; the state machine `transition()` is perfect for integration testing. Without tests, refactors carry real risk. **Fix:** add Vitest, write ~30 tests covering the pure functions + state transitions. ~2 hours.

🟠 **No CI.** No GitHub Actions, no auto-build-on-PR. A broken build can land on main without anyone noticing until deploy. **Fix:** add a `.github/workflows/ci.yml` that runs `npm ci && npm run build` on every PR. ~10 minutes.

🟠 **Catalog and prompt generator are in-portal stubs.** Per spec §3.6 they should live in Python (`packages/module_catalog/`) and be called via API. Today the portal forwards to its own local code. This is documented in code comments but means changes to pricing/modules require a portal redeploy rather than a backend config change. **Fix:** when the backend Python catalog is built, swap the route handlers to forward HTTP calls. The shapes already match.

🟡 **No daily cron for `draft → abandoned`.** Spec §3.1 says drafts should flip to `abandoned` after 7 days of `lastActiveAt` idle. The column is there; the cron is not. Without it, dead drafts accumulate forever. **Fix:** Railway's cron or a daily GitHub Action that hits a protected endpoint.

🟡 **Step 3 diff editor deviates from spec ASCII.** The spec shows inline diff highlighting *inside* the editable right pane (contentEditable territory). Portal uses textarea + a separate Diff Preview panel below. Same intent, cleaner code, easier to maintain. Worth flagging because if you ever review against the literal spec you'll notice.

🟡 **`/dev/autosave` is reachable in dev only**, but it leaks the existence of the dev-bypass mechanism. Anyone reading the code learns that `x-arx-dev-user-id` works in dev. Acceptable — the gate is `NODE_ENV` not obscurity — but worth knowing.

🟡 **Auth.js v5 is still beta.** Pin to a specific `5.0.0-beta.31` version (already pinned via `^5.0.0-beta.31`, but the `^` could pull in a breaking beta upgrade). Consider pinning exact: `"next-auth": "5.0.0-beta.31"`. Same goes for `@auth/prisma-adapter`.

🟡 **No `robots.txt` or `noindex` meta** on the portal. When deployed at `app.arxsystems.org`, search engines could index `/sign-in`, `/setup/tier`, etc. **Fix:** add a `<meta name="robots" content="noindex">` to `/sign-in`, `/setup/*`, etc., or a `public/robots.txt` that disallows `/setup/*`.

🟡 **Error pages.** No `app/error.tsx` or `app/not-found.tsx`. Defaults are fine for now; brand them when you have a moment.

🔵 **`README.md` could note that Postgres is the dev DB now** (was SQLite earlier). Currently it correctly says docker-compose, but a sentence calling out the Postgres switch would orient cold readers.

🔵 **Several inline-styled components could use Tailwind utility classes** for consistency (e.g. `style={{ background: 'var(--obsidian)' }}` vs `className="bg-obsidian"`). Tailwind v4 `@theme` config exposes them. Cosmetic.

### 3.6 What's *not* in the portal (deliberate scope choices)

These are out-of-scope per spec discipline, not bugs:

- Real Stripe checkout (Week 4 work).
- Customer Portal / billing page (Week 4).
- Custom-module submission UI (Week 4 — Step 4 stubs it as "Coming soon").
- Real CRM OAuth (founder-assisted in v1 per spec).
- Real Vapi phone-number provisioning (lives in the Python backend, not the portal).
- Webhook receiver `/api/webhooks/stripe` (lands with real Stripe).

---

## 4. Cross-cutting Observations

### 4.1 Brand alignment

| Brand axis | Marketing site | Portal | Aligned? |
|---|---|---|---|
| Product name | "Galen" (clinical implementation of AIMS) | "The Receptionist" (internal) / "Galen Setup" (when fronted at `app.arxsystems.org`) | ✅ per spec |
| Pricing tier names | The Receptionist / The Command Center / The Full Stack | Starter / Pro / Custom (internal) — but both names stored in `lib/catalog.ts` | ✅ per Marketing Directive §1.2 split |
| Colors | Cream `#F7F6F2` bg, navy `#0A1628`, gold `#C8A35C` | Obsidian `#0A0A0A` bg, white text, gold `#D4AF37` | ✅ deliberate split per spec — light marketing, dark portal |
| Typography | System font stack | Playfair Display + Inter + JetBrains Mono | ✅ deliberate split |

### 4.2 The portal doesn't currently know about the marketing site

- The portal's `/setup/tier` shows "Starter / Pro / Custom" by default. Users who clicked "Get Started" on the marketing pricing tier would expect their selection carried over.
- Marketing CTAs *used to* carry `?tier=` query params; that's gone now that the homepage doesn't link to `/setup` at all.
- When you re-wire this (or proxy `/setup/*` to the portal), the marketing-side `?tier=starter|pro|custom` query param is already supported in the portal's tier picker.

### 4.3 The marketing site doesn't capture analytics from form CTAs

- The Galen contact form has no `data-cta` attributes today (those were on the Start Setup buttons that got reverted).
- Adding `data-cta-location="hero-galen"` etc. on the existing CTAs is a 2-minute change that pays off the moment you ship analytics.

---

## 5. Priority-Ordered Action List

If you have **30 minutes**, in order:

1. ⚡ Update `arx-website/CLAUDE.md` and `README.md` so they describe the current Express stack. (10 min)
2. ⚡ Delete the dead Next.js scaffold SVGs from `arx-website/public/`. (1 min, low-risk PR)
3. ⚡ Add `data-cta-location` attributes to the 5 active CTAs in `arx-website/public/index.html`. (5 min)
4. ⚡ Add a Plausible (or Umami) script tag to `arx-website/public/index.html`. (5 min, requires an account)
5. ⚡ Verify `RESEND_API_KEY` is set on the Railway service so contact form emails actually fire. (1 min)

If you have **1–2 hours**:

6. Add `@media (prefers-reduced-motion: reduce)` rule to disable the reveal animation transitions.
7. Add `<meta>` description, OG image, and basic JSON-LD structured data to `arx-website/public/index.html`.
8. Add a `public/robots.txt` and a `public/sitemap.xml` (one-line each — site is just `/`).
9. Write a 2-paragraph honest replacement for `arx-portal/README.md`'s deployment section, with screenshots of Railway setup if you want.

If you have **half a day** (post-AP-exams scope):

10. Deploy the portal to Railway (Postgres + env vars). Verify each wizard step renders + state machine transitions fire.
11. Decide: keep `/setup` as a standby form on the marketing site, OR proxy `/setup/*` through Express to the deployed portal. If proxying, ~15 lines in `server.js` using `http-proxy-middleware`.
12. Add a basic Vitest setup + write tests for the three pure functions (`cascade`, `price`, `validateForConfigured`).
13. Add the daily `draft → abandoned` cron (Railway cron job or GitHub Actions).
14. Wire Stripe when you're ready (`<PaymentPlaceholder>` → `<StripePaymentElement>`, two env vars, one new route handler).

---

## 6. Closing Note

The architecture, design discipline, and code quality across both repos are above-average for a pre-launch B2B product. The biggest single drag on velocity right now is **documentation drift on the marketing repo + zero observability on the live site** — both are cheap to fix and would meaningfully improve everything downstream.

Nothing in either codebase is broken, dangerous, or blocking. The portal is one Railway deploy + Postgres addon away from going live.

---

# PART II — BUSINESS AUDIT

**Date:** 2026-05-06
**Method:** filesystem search across `~/Downloads`, `~/Documents`, `~/Desktop`; live site fetch; test execution on the voice-agent codebase; cross-reference against three spec `.docx` files and three `AIMS_CLAUDE_CODE_PROMPT` revisions.

**Honesty mode:** anything I could not find is marked **MISSING**. I did not invent.

---

## A. The Voice Agent (`arx-alpha-1.0`)

**Located at:** `/Users/gabrielcespedes/Downloads/arx-alpha-1.0-claude-arx-alpha-backend-YOIPI/`
A sibling earlier snapshot lives at `arx-aivis-1.0-claude-medical-voice-intelligence-5hYwT` (March 26).
The "arx-alpha-v8" or "arx-optimized" the prompt hinted at — **does not exist on this machine.**

### A.1 Deployment state — is Alex at +1 866-786-3560 live?

**NO. Alex doesn't exist as a deployed system, and the phone number you cited is a sample.**

The brutal facts:
- The string `866-786-3560` appears in exactly **one** artifact: the `ARX_Receptionist_Modular_Build_Spec.docx` as an example `from_number` inside a sample Twilio module config for "cespedes_cardiology". It is not a real Twilio number, not in any code, not in any deployed system.
- The agent name "Alex" appears in **zero** files anywhere in `~/Downloads`, `~/Documents`, or `~/Desktop`.
- The voice-agent repo has **no entry point**: no `main.py`, no `app.py`, no `server.py`, no `Procfile`, no `Dockerfile`, no `railway.toml`, no `fly.toml`, no `pyproject.toml`. There is no way to start this process.
- It has **no transport layer**: zero imports of `twilio`, `fastapi`, `flask`, `aiortc`, `websockets`, `uvicorn`, or `vapi`. The doc strings *describe* a transport ("Twilio, SIP trunk, WebSocket, HTTP") but the code does not implement one.
- It has **no git repository**. The folder is a snapshot, not a tracked codebase. There is no commit history, no remote, no version control.
- Last "deploy" was **never**.

### A.2 Architecture integrity — Brain / Nervous System / Command Center

The three-layer model is **visible in code** but **functionally incomplete**:

| Layer | File(s) | Status |
|---|---|---|
| Brain (unified controller, intent classifier) | `src/agent/unified_controller.py` (304 LoC) | Implemented. Uses Bedrock for classification. |
| Nervous System (capability/business config) | `src/agent/capability_config.py`, `src/agent/business_setup.py` | Implemented as data classes. No mechanism to *load* a tenant's config from anywhere. |
| Command Center / arms | `src/agent/arms/booker.py`, `front_desk.py`, `universal_webhook.py` | Implemented as classes. Booker has 312 LoC, front_desk 224. Real code, not stubs. |
| Voice pipeline (TTS, transport) | `src/agent/voice_pipeline.py` (277 LoC) | Constructs an ElevenLabs `TTSPayload` dict, **does not actually call ElevenLabs**. No transport integration. |
| LLM (Bedrock) | `src/voice/bedrock_client.py` (316 LoC) | Real Bedrock client with fallback model + stream sanitization. Compiles, no test runs verified by me here. |

**Adapter pattern (EHR):** Five adapters exist as files — Athenahealth (149 LoC), Tebra (134), NextGen (133), Practice Suite (128), eClinicalWorks. They look real. **But:** `test_arx_schema` runs **0/9 PASS, 9 FAIL** — the universal ARX schema layer that every adapter depends on is broken. `test_translation_validator` runs **8/22 PASS, 14 FAIL** — schema translation is broken. So the adapter *pattern* is real; the *plumbing* between adapters and the schema is failing.

### A.3 Multi-tenancy

Architecturally: the `BusinessConfig` data class accepts a tenant name, industry, language, capability list. The system *would* be multi-tenant once a loader exists.

Operationally: **There is no tenant loader.** No code path takes a tenant ID and returns a `BusinessConfig`. You couldn't serve two clients today because you can't serve one. Multi-tenancy is a property of code that doesn't run.

### A.4 Cost monitoring — Cartesia / Deepgram / Vapi safeguards

**MISSING — but in a less-bad way than it sounds.** Cartesia, Deepgram, and Vapi are not integrated **anywhere**. No imports, no API calls, no client code. The runaway-loop scenario you fear is impossible because there is no loop. AWS Bedrock is integrated but used through an Anthropic-Bedrock contract; if you incur unexpected costs there, they'll show up on the AWS bill, and there is no in-code budget guard.

ElevenLabs is referenced as the intended TTS provider but, again, no actual API client. The voice pipeline builds a payload dict and stops.

### A.5 Observability — what happens when a call fails

`src/security/audit_logger.py` exists (242 LoC) — all 9 tests pass. It produces structured, PHI-free audit records. **Where those records go is not implemented**: no Datadog/Sentry/Honeycomb integration, no webhook, no on-call paging. If a real call ever fails mid-conversation in this system, the record exists in memory and disappears on process restart.

### A.6 Secrets

🟢 **Clean.** No `.env` files committed to either backend snapshot. No hardcoded API keys (`grep -E "sk-[a-zA-Z0-9]{20}"` in `src/` returns zero matches). `secrets_manager.py` uses an AWS Secrets Manager pattern with a 300-second cache TTL. `CLAUDE.md §3` mandates this. The discipline is real.

### A.7 Voice agent ↔ portal connection

**MISSING. They are two disconnected systems.**

The portal (`arx-portal`, Next.js + Postgres) writes draft tenant configs to its own `Tenant.draft` JSON column. The voice agent (`arx-alpha-1.0`, Python + Bedrock) has **no code path that reads from that Postgres table or any other shared store.** The architectural spec (Receptionist Modular Build Spec §2.4) says "The Receptionist portal NEVER contains business logic. It writes a tenant config file. AIMS reads the config and assembles the agent." That handoff layer **does not exist**. The portal is producing config nobody consumes.

### A.8 Contract → working agent: hours of work?

The question presumes a working baseline. There isn't one. Honest answer:

| Stage | Estimated effort (founder-only, AP-exam-constrained) |
|---|---|
| Fix `test_arx_schema` + `test_translation_validator` failures | 1–2 days |
| Pick a transport: Vapi (managed) vs. Twilio Media Streams (DIY) | 1 day to choose |
| Implement transport integration in `voice_pipeline.py` | 3–5 days for Vapi, 10–15 days for raw Twilio |
| Build the entry point (FastAPI app, websocket handler, env loader) | 2–3 days |
| Wire portal → backend handoff (read tenant config from Postgres, build `BusinessConfig`) | 2–3 days |
| Deploy infrastructure (Railway/Fly + AWS Bedrock IAM + Twilio number + secrets) | 1–2 days |
| End-to-end test with one real practice | 2–3 days |
| **Total minimum** | **~3–4 weeks of focused founder time** before the first paying client can be served. |

There is no scenario where a contract signed today results in a working agent in the same week.

---

## B. The Cardiology Pilot

**MISSING.** The pilot does not exist in any meaningful sense.

Evidence:
- **No signed agreement** found in `~/Downloads`, `~/Documents`, or `~/Desktop`. Zero PDFs matching `*contract*`, `*BAA*`, `*signed*`, `*agreement*`.
- **No BAA** stored anywhere on disk.
- **`AIMS_CLAUDE_CODE_PROMPT_v5.md` and `v6.md` both explicitly ban the phrase "Cespedes Cardiology as an active partner."** This is the project's *own* enforced position: the pilot is not real, and writing as if it were is a banned action.
- **`AIMS_CLAUDE_CODE_PROMPT_v6.md` states verbatim:** *"AIMS Alpha 1.0 is in active development. Nothing is deployed to any client. **The Galen pilot has not started.** Write all copy as pre-launch."*
- The only references to "cespedes_cardiology" in code are: (a) as a sample tenant_id in the spec doc, (b) as mock data in a test file (`name="Dr. Jones", department="Cardiology"`).
- **Success metrics: MISSING.** No tracker file, no dashboard, no spreadsheet.
- **Case study material: MISSING.** Nothing being captured because nothing is happening.
- **Pilot → paid contract path: MISSING.** No dated next step exists.

The phrase "cardiology pilot" — like "Alex at 1-866-786-3560" — is a piece of internal mythology that has been documented as a sample, then later banned, and now persists in conversation as if it were a real thing.

---

## C. Service Packages

The audit prompt named four: **Receptionist / Email Drone / Intake Specialist / Concierge**.

| Package | Artifact | Scope written? | Price written? | Deliverable today? |
|---|---|---|---|---|
| **The Receptionist** | `ARX_Receptionist_Modular_Build_Spec.docx` (master spec — 22KB, 200+ paragraphs) | ✅ Yes, detailed. | ✅ Yes: Starter $400/mo + $500 setup; Pro $900 + $1500; Custom $1500–2000 + $3000. | ❌ **No.** Voice agent unrunnable. Portal can capture config but nothing reads it. |
| **Email Drone** | **MISSING** | — | — | — |
| **Intake Specialist** | **MISSING** | — | — | — |
| **Concierge** | **MISSING** | — | — | — |
| **Call Analytics product** | **MISSING** | — | — | — |

Three of the four packages and the analytics product have **no defining artifact anywhere on this machine.** Not in any AIMS prompt (v1/v5/v6), not in the marketing site copy, not in the portal code, not in the voice agent code, not in any doc in `~/Downloads`. They are concepts, not products.

**Margin analysis on The Receptionist:** MISSING. The prices ($400/$900/$1500–2000) appear in spec docs and marketing copy, but no cost-of-goods doc, no Bedrock token-cost model, no Cartesia/ElevenLabs minute-cost model, no estimated COGS per active tenant. Whether $400/mo covers the unit economics is currently a guess.

**Receptionist onboarding sequence — signed contract → live agent:**
The spec describes a 5-step client-facing flow (pick tier → describe → review prompt → pick modules → deploy). The *portal* implements all 5 steps. **The deploy step at the end is a `payment_pending` placeholder that emails the founder.** There is no actual provisioning. So the onboarding sequence from "signed contract" to "live agent answering the phone" — **MISSING the last 60% of the pipeline.**

---

## D. Legal / Operational Foundation

Item-by-item, what I could find:

| Asset | Status |
|---|---|
| LLC formation docs | **MISSING** — no PDF, no scanned filing anywhere. The marketing site asserts "ARX Systems · Miami, FL" but I cannot verify the LLC exists. |
| EIN letter | **MISSING** |
| Operating agreement | **MISSING** |
| MSA template | **MISSING** |
| SOW template | **MISSING** |
| **BAA template** | **MISSING — this is the one that bites.** |
| Privacy Policy (source/draft) | Live site has `/privacy` link in footer — not audited for content. Source doc on disk: **MISSING.** |
| Terms of Service (source/draft) | Live site has `/terms` link in footer — same situation. Source doc on disk: **MISSING.** |
| E&O / cyber liability insurance | **MISSING — no policy doc, no quote, no carrier.** |

**The blocker is the BAA.** The live site's hero meta line reads `BAA — Signed with every contract`. The CLAUDE.md across both marketing repo and AIMS prompts repeatedly hammers "Never claim compliance without a BAA page" — yet the marketing copy *does* claim BAAs are signed with every contract. **Today, no BAA template exists to sign.** A healthcare prospect who asks "send me your BAA so my counsel can review" cannot be answered.

**Privacy policy on `arxsystems.org`** — defensibility unaudited. The live page footer links exist but no source doc on disk means there's no version-controlled record of what was promised to which visitor when.

---

## E. Sales / GTM Infrastructure

| Asset | Status |
|---|---|
| CRM / prospect list | **MISSING.** No CSV exports, no Notion/Airtable backup, no HubSpot/Salesforce data file. |
| Outreach templates | **MISSING** |
| Cold email sequences | **MISSING** |
| Demo script for The Receptionist | **MISSING** |
| Demo environment | **MISSING** — there is nothing to demo. The portal redirects to `/sign-in` and the wizard collects data that goes nowhere. |
| Pricing one-pager (prospect-facing) | **MISSING.** The three-tier pricing exists in the spec doc and on the marketing site, but no PDF/leave-behind exists. |
| Pitch deck for The Receptionist / Galen AI Agent | **MISSING.** |
| Pitch deck found on disk | **`Galen_Stethoscope_Pitch_Deck.pdf`** — but this is for a *different product*: a **physical AI stethoscope** for the CHIP-in-Florida 2026 / HS Innovation Challenge. Not the AI receptionist. Cannot be repurposed for medical-practice sales. |

**The /setup form on the marketing site** captures lead config + email and sends it to `gabrielcespedes777@gmail.com` via Resend. **After that: MISSING.** There is no automation, no CRM enrollment, no nurture sequence, no follow-up template. Leads land in your personal Gmail inbox and rely on your individual attention.

**Documented sales process from stranger → signed contract: MISSING.** Every conversation that happens is being improvised.

**How many prospects in active conversation: unknown** — there is no place to look. If you have prospects, they exist only in your head and your inbox.

---

## F. Financial Reality

| Item | Status / number |
|---|---|
| **Current MRR** | **$0.** Per AIMS_CLAUDE_CODE_PROMPT v5/v6: "Nothing is deployed to any client." No invoice files, no Stripe data, no Resend records of paid customers. |
| Stripe / payment processor | **Not configured.** No `STRIPE_SECRET_KEY` references in shipped code on either repo (only in `.env.example` as a future placeholder). |
| **Monthly burn (estimate, since I can't see your card)** | Only known costs are: Railway marketing-site hosting (~$5–$10/mo on hobby tier), domain registration (~$1/mo amortized), AWS Bedrock (likely under $5/mo at current development volume). **Estimated burn: < $25/mo.** |
| Cartesia/Deepgram/Vapi/Twilio bills | **$0** — none are integrated and provisioned. |
| Bookkeeping / expense tracking | **MISSING** |
| Runway calculation | **MISSING.** |

**Path to $8–10K MRR by Aug 31 — show the math:**

Target = 8 clients × $1000/mo average (mid-tier blend) = $8K MRR.
Time budget = today (May 6) → Aug 31 = **~17 weeks**, of which:
- May 6 – May 14: AP exams (~zero new product/sales work).
- May 14 – early June: school continues (~10–15 hrs/week founder availability).
- Early June – Aug 31: summer (~50–60 hrs/week available).

Sequence required to land 1 paying client, conservatively:
1. Fix voice agent (transport, entry point, deploy) → **3–4 weeks.**
2. BAA template + LLC verification + insurance + ToS/Privacy review → **1–2 weeks** (largely external — lawyer time).
3. End-to-end onboarding test with a friendly practice (the would-be pilot) → **1–2 weeks.**
4. Demo script, sales call rehearsal, first cold conversation → **1 week.**
5. Negotiation → close → contracted MRR start → **2–4 weeks.**

Minimum founder-effort path to **first paid client: 9–13 weeks** if everything goes well. That puts client #1 contracted between mid-July and mid-August.

To get from 1 → 8 clients in the remaining 2–6 weeks before Aug 31 would require a sales velocity that has no precedent in this company's history (which has zero clients). It's not impossible in a perfectly-executed world; it requires near-perfect execution against a backdrop where every supporting asset (CRM, demos, legal, observability, multi-tenancy) is currently MISSING.

**Plausible target instead: 1–2 design partners signed (paying or free with a published case study clause) by Aug 31, with $400–$2,000 MRR.** That is the credible version of the goal.

---

## G. Strategic Coherence

The audit prompt says: *"The pivot was: horizontal platform → services-first vertical agency."*

**The pivot is not visible in any artifact I can find.** What is visible:

- **Marketing site:** describes ARX as a productized SaaS — *"AI systems that absorb the operational weight... Galen is an AI call agent built exclusively for medical practices."* Tier-based pricing ($400/$900/$1500). Sounds like a vertical SaaS, not an agency.
- **Portal:** implements a self-serve setup wizard for the SaaS framing. Six wizard steps, three tiers, modules-as-toggles. The whole UX assumes the user buys a product, not retains an agency.
- **Voice agent code:** explicitly architected as a multi-tenant platform — `UnifiedController` + `BusinessConfig`-driven capabilities. Multi-tenant platform = horizontal platform play.
- **Pitch deck on disk** (`Galen_Stethoscope_Pitch_Deck.pdf`): a *hardware product pitch* for a digital stethoscope, submitted to a high-school innovation competition. Unrelated to the AI receptionist business.

**Four artifact families telling four different stories.** None of them say "services-first vertical agency." If that pivot has been decided, it has not been written down anywhere on this machine, and the existing assets have not been updated to reflect it.

**Biggest gap between external messaging and internal reality:**
- External (marketing site, public): *"BAA — Signed with every contract"*, *"Zero-Retention Architecture"*, *"24/7 Always answered"*, *"AI call agent built exclusively for medical practices"*, *"Galen is a product of ARX Systems"*.
- Internal reality: no BAA template, no deployed agent, no answered call ever, the agent code can't run, the portal can't provision anything, no clients, no compliance page.

A prospect who reads the marketing site, fills out the contact form, and asks "send me your BAA and a demo link" cannot be served today. The marketing posture and the operational reality are roughly **8 weeks of full-time founder work apart**.

---

## H. Ranked Business Problems (brutal version)

🔴 = existential. 🟠 = will hit you in 90 days. 🟡 = will hit you in 6–12 months. 🔵 = strategic noise.

1. 🔴 **The product doesn't work.** The voice agent has no transport, no entry point, no deploy, no portal-to-agent handoff. You cannot serve a client today even if one signed. Every other problem on this list is subordinate to this one.
2. 🔴 **No BAA template.** Healthcare prospects are gated by this single document. Until it exists, every Galen sales conversation has a known stopping point.
3. 🔴 **The "pilot" is a story, not a fact.** Your own project docs ban talking about Cespedes Cardiology as an active partner because it isn't one. The credibility moat you assume you have — *"we have a clinical pilot"* — does not exist.
4. 🟠 **Three of four named service packages have no defining doc.** Email Drone, Intake Specialist, Concierge: MISSING. If they're in the GTM plan, they exist only verbally.
5. 🟠 **No sales infrastructure of any kind.** No CRM, no demo, no script, no pipeline. The /setup form drops leads into a personal inbox.
6. 🟠 **Pitch deck on disk is for the wrong product.** A high-school-competition stethoscope pitch is not a tool for selling AI receptionists.
7. 🟠 **No LLC / EIN / insurance / operating agreement on disk.** Cannot verify the business exists as a legal entity. Worth confirming this is just "stored elsewhere" vs. "doesn't exist."
8. 🟡 **Voice agent has no git repository.** A 5,000-line codebase with no version control is one accidental `rm` away from gone.
9. 🟡 **Two test files fail outright** (`test_arx_schema` 0/9, `test_translation_validator` 8/22). The schema-translation layer that every EHR adapter relies on is broken.
10. 🟡 **Strategic incoherence.** Marketing says SaaS; portal says SaaS; voice agent code says platform; the only pitch deck is for hardware. There is no consistent story to tell a prospect, an investor, or a recruit.
11. 🟡 **Documentation drift on the marketing repo** (carried over from PART I, but it's the second-loudest signal that the project is moving faster than its own docs).
12. 🔵 **The horizontal-platform → services-agency pivot you mentioned is not reflected in any artifact.** Either it hasn't started, or it started in conversation and hasn't been written down.


---

# THE UNCOMFORTABLE SUMMARY

The single thing most likely to prevent ARX from hitting $8–10K MRR by Aug 31 is **not the code, not the marketing, not the legal docs.** It is the gap between what the public artifacts claim — a clinical pilot, a BAA, a deployable AI receptionist — and what actually exists, which is a beautifully architected but unrunnable codebase, a marketing site selling vaporware, and zero paying customers. Every founder hour spent polishing the portal or rewriting copy is an hour not spent on the one bottleneck: **a working agent that can answer a single real phone call for a single real practice with a signed BAA on file.**

What to do this week (before May 14 AP-exam crunch):
1. **Choose Vapi** (not raw Twilio). Decide in 15 minutes, not a week. It collapses 2 weeks of transport work to 2 days.
2. **Have a lawyer (or LegalZoom/Atticus) draft a HIPAA BAA template + a short MSA.** Cost: <$500. Without this you cannot legally close a healthcare client. Start it today; it runs in parallel while you study.
3. **Drop "BAA — Signed with every contract" from the live hero meta.** The promise is currently a lie that a single prospect's lawyer would catch. Replace with "BAA available upon request" until #2 is in hand.
4. **Stop polishing the portal. Stop adding to the marketing site.** Both are already 6 weeks ahead of where the actual product is.
5. **Pick one real practice** — not Cespedes Cardiology in spec docs, but a practice you can actually call this week — and offer them a free 60-day pilot in exchange for being the case study. That's the only way the Aug 31 number becomes credible: build for one real user, not eight imaginary ones.

Realistic Aug 31 target: **1 free pilot fully live + 1 paid client signed at $400–$900 MRR**, with a published case study. The $8–10K / 8-clients number requires miracles that nothing in the current artifacts supports.

---

# PART II — ERRATA AND GITHUB-STATE ADDENDUM (added 2026-05-06)

## ERRATUM 1 — Cardiology pilot framing was incorrect

The Part II audit characterized the cardiology pilot as "a story, not a fact." This framing was wrong and is hereby corrected.

**What's true:**
- The first-customer candidate is the founder's father's medical practice (Edgardo M. Cespedes, MD, FACC — Cardiovascular & Internal Medicine).
- A private repo `edgardo-m-cespedes-website` exists containing the practice's website.
- The relationship is real, established, and does not require cold sales motion.
- The founder also has access to 15–45 warm physician introductions through this network.

**What remains MISSING (unchanged):**
- Signed BAA
- Signed MSA / SOW / pilot agreement
- Documented success metrics
- Captured case-study material

**Correct framing going forward:** the pilot is an unformalized real customer relationship, not a hypothetical one. The work to convert it is legal/documentation work, not sales work.

This materially changes the Aug 31 outlook. A realistic target with the warm network is no longer "1 paid client signed" but plausibly **3–5 paid clients**, contingent on:
  (a) BAA template drafted by a healthcare-IT attorney
  (b) Voice agent transport layer (Vapi) actually integrated and live
  (c) A documented onboarding sequence from contract → live agent
  (d) EHR scoping per prospect (Tier 1 EHRs only for v1: DrChrono, Athena, Kareo/Tebra, anything with SMART on FHIR; defer Epic, eClinicalWorks for v2)

## ERRATUM 2 — Voice-agent source control is at risk

**GitHub state of `arx-alpha-1.0`:**
- `defaultBranch: null`, `pushedAt: null` — the repo root is empty.
- Code exists only in feature branches: `claude/arx-alpha-backend-YOIPI` and `kaiserfriedrichwilhelm3-legacy-arx`.
- Latest commit on either branch: **2026-03-28**.
- Local snapshot at `/Users/gabrielcespedes/Downloads/arx-alpha-1.0-...` contains 5+ weeks of unpushed work.

**Risk:** total loss of voice-agent codebase if the founder's laptop fails. This is the single most valuable code asset in the company and is not backed up to source control.

**Required action this week (target: before AP Lang on May 13):**
1. Initialize git in the local snapshot if not already initialized.
2. Push to a new clean branch on `arx-alpha-1.0` (e.g., `main` or `working-may-2026`).
3. Set that branch as the repo default.
4. Verify the push completed by visiting the repo on github.com.
5. Establish a habit: commit + push at end of every working session.

## Gaps the audit still has not closed (acknowledged)

- `edgardo-m-cespedes-website/index.html` was not audited for Galen integration readiness.
- Older feature branches of `arx-alpha-1.0` not yet inspected for hidden artifacts.
- Google Drive / iCloud Drive / any cloud-stored docs not inspected.
- No check for repos under alternate GitHub accounts.

These remain open and should be closed in a follow-up pass.
