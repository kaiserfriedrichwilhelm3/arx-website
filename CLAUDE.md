# ARX Systems Marketing Site — CLAUDE.md

Project memory for Claude Code working on this repo. Keep this file accurate; stale memory has cost real money here before.

## Stack

- Node.js (≥20.9) + Express 4 front door (`server.js`) serving Astro's static `dist/`
- **Astro 5** (+ `@astrojs/mdx`), `output: 'static'` — the whole public site is one page: `src/pages/index.astro`
- Plain CSS with custom properties. **No Tailwind** (see `DECISIONS.md` §1)
- Resend API for transactional email (server-side only)
- Hosted on Railway, auto-deploys from `main`

**No React. No Next.js. No bundler config. No TypeScript in the site itself.** The repo was a Next.js app early in its life; that was removed. `AGENTS.md` still carries a Next.js rules block — it is a dead leftover and does not apply.

**There IS an Astro build.** `npm start` runs `node server.js`, which serves `dist/`. You must run `npx astro build` after editing `src/` or the served site will not change. Railway runs the build for you on deploy.

## File map

```
arx-website/
├── server.js                     # Express — serves dist/ + 2 POST endpoints
├── server/
│   ├── routes/contact.js         # POST /api/contact  (Galen + Custom inquiries)
│   ├── routes/memo.js            # POST /api/memo
│   └── lib/{rate-limit,email-templates}.js
├── src/
│   ├── pages/index.astro         # THE SITE — one self-contained document
│   ├── pages/_*.astro            # parked editorial scaffold (underscore = not routed)
│   ├── layouts/BaseLayout.astro  # used ONLY by the parked _*.astro pages
│   ├── components/{Nav,Footer}.astro   # ditto — index.astro does not use these
│   ├── content/pillars/*.md      # parked content collection
│   └── styles/{tokens,global,fonts,reset}.css   # used ONLY by BaseLayout
├── public/
│   ├── fonts/{display,body,mono}/*.woff2        # self-hosted variable fonts
│   ├── arx-mark.svg, favicon.ico
├── dist/                         # Astro build output (gitignored) — what Express serves
├── chatbot/                      # separate Cal.com booking bot, own package.json
└── {DECISIONS,DEPLOY,README,AGENTS,CLAUDE}.md
```

`index.astro` is deliberately **one self-contained document** — its own `<!DOCTYPE html>`, with `<style is:inline>` and `<script is:inline>` so nothing is extracted to `/_astro/*.css`. That means zero render-blocking requests. It does **not** use `BaseLayout`, `Nav.astro`, `Footer.astro`, or `src/styles/*`. Editing those files changes nothing on the live site.

## The page

One page, anchor-navigated:

```
hero → #problem → #how → (co-developer credit) → #services → #pricing → #faq → #contact
```

Nav labels are reframed (`The Bottleneck / Galen / Acquisition / Investment / Questions`) but the anchor IDs are the originals — don't rename them, the footer and any external links depend on them.

### Fonts — self-hosted, no CDN

Fraunces (display), Inter (body), JetBrains Mono (micro-labels), all variable woff2 in `public/fonts/`. No Google Fonts request (privacy posture + no third-party DNS; `DECISIONS.md` §7). Two gotchas:

1. **Fraunces' variable default weight is 900.** Always set `font-weight` explicitly wherever the serif is used or it renders Black.
2. **Fraunces has no `ital` axis.** A real italic face is self-hosted at `public/fonts/display/Fraunces-Italic-Variable.woff2` (latin subset). Without it browsers fake an oblique by skewing, which wrecks a high-contrast serif. Don't remove it.

The canonical `@font-face` set lives in `src/styles/fonts.css` **and** is duplicated inline in `index.astro` — the inline copy is the one that's actually live. Change both.

### Motion — hand-written, zero dependencies

No GSAP, no Lenis, no Framer Motion. One `requestAnimationFrame` loop drives lerped scroll + parallax + the progress rail; everything else is transform/opacity only. Things that will bite you:

- **A CSS `@keyframes` transform beats an inline-style transform in the cascade.** The parallax writes `el.style.transform`, so a `[data-par]` element must never also run a transform animation, and must never rely on a CSS `transform` for its own positioning (e.g. `translateX(-50%)` centring). Parallax the *wrapper*, animate/position the *child*. This is why `.field .layer` and `.reference .qm-wrap` exist.
- **Reveal classes are scoped to the element's own `.is-in`** (`.split.is-in .wi`, `.rv.is-in`). Don't loosen these to a descendant selector — an ancestor section going `is-in` would fire every heading and card inside it at once.
- **The lerped scroll must yield to external scrolls.** The `scroll` listener adopts any position more than 2px from ours *and* cancels the pending rAF. Without the cancel, a converged-but-not-yet-finished glide writes its old target back and yanks the user out of a scrollbar drag or a programmatic `scrollTo`.
- `.nav` must outrank `.drawer` in z-index. `.nav` creates a stacking context, so the burger's z-index is scoped inside it; if the drawer paints above the bar the close button becomes untappable.
- Everything is gated on `prefers-reduced-motion`. The Galen terminal renders its *finished* state (full transcript, filled rail, commit badge) rather than nothing.

### Contrast

The grey ramp (`--steel`, `--steel-2`, `--steel-3`) and the three accent weights (`--clay` for fills, `--clay-ink` for small text on bone, `--clay-lift` for text on obsidian) are tuned so even the 9px mono micro-labels clear WCAG AA on every surface they appear on. **Darkening any of them needs a re-check.** The nav inverts to a bone bar over `.on-bone` sections for the same reason — a translucent obsidian wash over a light surface resolves to mid-grey and drops every label in the bar below 4.5:1.

`.on-bone` carries all light-surface text overrides; `.on-bone-2` only swaps the background, so a section using it must carry **both** classes.

## Forms and endpoints

| Endpoint | Triggered by | Behavior |
|---|---|---|
| `POST /api/contact` | The intake form in `#contact` posts `type: "galen"`. The handler also still accepts `type: "custom"` from the retired Custom Project form. | Validates required fields + email format, builds an HTML email, sends to `CONTACT_EMAIL` via Resend, rate-limited 5/hour per IP. |
| `POST /api/memo` | Nothing on the live page — kept for the parked editorial scaffold. | Validates name/practice/email, emails founder + a confirmation with a memo link. |

The Galen field contract is **`practice, name, email, phone, specialty, volume, message`** — unchanged since the pre-rebuild server. Do not rename fields or add validation without explicit direction (see the header of `server/routes/contact.js`).

Missing-env behavior is strict: in production a missing `RESEND_API_KEY` returns 503 and logs the full payload (`UNDELIVERED SUBMISSION`) so the lead stays recoverable from Railway logs. In dev it stubs to stdout and returns 200.

## Environment variables

| Name | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | Yes in production | Unset in prod = 503 + loud log (not a silent drop). Unset in dev = stdout stub. |
| `CONTACT_EMAIL` | No | Founder's inbox; defaults to `gabrielcespedes777@gmail.com`. |
| `MEMO_URL` | No | Memo PDF link used by `/api/memo`. |
| `PORT` | No | Defaults to 3000. Railway sets this automatically. |

## Deploy

Push to `main` → Railway auto-deploys via nixpacks (`astro build`, then `npm prune --omit=dev`, then `npm start`). Domain `arxsystems.org` points at the Railway service. There is no staging environment — `main` is production.

## What NOT to touch without asking

Copy changes in the following areas carry legal, financial, or strategic weight. Pause and surface the proposed edit before pushing:

1. **Pricing figures** — `$3,500` setup, `$899` per 4-week cycle, `1,000` included minutes then `$0.15/min`, and the "13 cycles per year" note. Changing a number here without aligning the portal (`kaiserfriedrichwilhelm3/arx-portal`, `lib/catalog.ts`) and the spec docs creates a contradiction a prospect's lawyer will catch. The pricing section has two panes (structure / literal figures) — both carry the same protected note.
2. **BAA / HIPAA copy.** Every BAA reference uses forward-looking *"built for HIPAA compliance"* / *"signed before clinical deployment"* language. Do **not** revert to present-tense fulfillment claims (*"signed with every contract"*, *"executed before a single call routes"*) until a lawyer-drafted BAA template is actually on file.
3. **Anything asserting compliance, certifications, or operational guarantees** (zero-retention, 24/7 answered, BAA-backed).

**Do NOT build or publish a `/security` page yet.** As of the last founder-confirmed
facts block: the relay has not migrated to AWS, and the Vapi, AWS, and first-practice
BAAs are all unsigned. A security page implies those protections are active. It becomes
publishable only after, in order: (1) relay migrated to AWS, (2) AWS BAA accepted,
(3) Vapi HIPAA BAA signed, (4) first-practice BAA signed. Until then the FAQ keeps its
current posture — a BAA is signed before clinical deployment, and the data path will be
published before the first live patient call. Do not upgrade that wording.

**Scope of the base engagement** ($3,500 setup + $899 per 4-week cycle): Galen the AI
phone agent, the practice website, brand and identity, and search discoverability setup.
Paid advertising is explicitly OUT — separate, at the practice's discretion. Never imply
ads are included, and never promise a search ranking (discoverability setup only).

**Pricing figures are shown openly.** The show/gate toggle was removed deliberately —
transparency is the position. Do not reintroduce a gate.
4. **Clinical-pilot / reference-deployment copy** referencing Dr. Edgardo M. Cespedes. The current framing — *"Co-developer & first deployment"* — is deliberate.
5. **The banned-phrases list** in `~/Downloads/AIMS_CLAUDE_CODE_PROMPT_v6.md` — project-wide constraints (e.g. *"Cespedes Cardiology as an active partner"*, *"HIPAA-compliant"* as an adjective, *"Deploy"* on any CTA). These apply here even though the file lives elsewhere.

The stat ledger in `#problem` (18–30 / ~80% / 100%) is explicitly labelled as illustrative industry ranges. Keep that disclaimer attached to those numbers.

## Conventions

- **No third-party scripts, fonts, or analytics in the page.** Strong privacy posture is part of the medical brand promise.
- **All colors / fonts as CSS custom properties** (`--obsidian`, `--bone`, `--clay`, …) — never hardcode hex in rules.
- **Inline SVG only** for icons. No icon-font CDNs.
- **One accent color.** The palette is obsidian + bone + clay in three weights. Adding a second hue breaks the design language.
- Run `npx astro build` before testing anything through `server.js`.
