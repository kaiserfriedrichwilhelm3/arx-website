# ARX Systems Marketing Site — CLAUDE.md

Project memory for Claude Code working on this repo. Keep this file accurate; stale memory has cost real money here before.

## Stack

- Node.js (≥20.9) + Express 4
- One static HTML file at `public/index.html` (~81KB) with inlined CSS and JS
- Resend API for transactional email (server-side only)
- Hosted on Railway, auto-deploys from `main`

**No React. No Next.js. No bundler. No TypeScript.** If you find any doc claiming otherwise, that doc is wrong and should be corrected. The repo was a Next.js app earlier in its life; commits `b145a7c` (feb 2026) and `fa0959f` removed the framework. Stray Next.js icons in `public/` (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`) and any `pages/` references in tooling are dead leftovers and safe to delete.

## File map

```
arx-website/
├── server.js                  # Express — 2 POST endpoints + static middleware
├── public/
│   ├── index.html             # Entire marketing site (4 paths: about / partners / galen / custom)
│   ├── setup.html             # Standalone "reserve your spot" form — currently unlinked from homepage
│   ├── favicon.ico
│   ├── arx-mark.svg
│   └── {next,vercel,...}.svg  # dead Next.js scaffold leftovers
├── package.json               # express + resend only
├── railway.toml               # nixpacks builder, `npm start` startCommand
├── nixpacks.toml              # nodejs_20 phase
├── .node-version              # 20.19.0
├── AGENTS.md
├── CLAUDE.md                  # this file
└── README.md
```

## Forms and endpoints

| Endpoint | Triggered by | Behavior |
|---|---|---|
| `POST /api/contact` | Galen contact form (Galen path) **and** Custom Project form (Custom path) — discriminated by `type: "galen"` vs `type: "custom"` in body | Validates required fields + email format, builds an HTML email, sends to `CONTACT_EMAIL` via Resend, rate-limited 5/hour per IP. |
| `POST /api/setup-interest` | `public/setup.html` form (unlinked from homepage but still reachable via direct URL) | Validates tier + practice + name + email, emails founder + sends visitor a confirmation. Same rate-limit window as `/api/contact`. |

Static middleware uses `{ extensions: ['html'] }` so `/setup` resolves to `public/setup.html` without the suffix.

## Environment variables

| Name | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | Yes in production | If unset, the server logs payloads to stdout — useful in local dev, dangerous in prod (silent dropped emails). |
| `CONTACT_EMAIL` | No | Founder's inbox; defaults to `gabrielcespedes777@gmail.com`. |
| `PORT` | No | Defaults to 3000. Railway sets this automatically. |

## Deploy

Push to `main` → Railway auto-deploys via nixpacks. Domain `arxsystems.org` points at the Railway service. The current ephemeral URL is `arx-website-production.up.railway.app`. There is no staging environment — `main` is production.

## Reveal animations (gotcha)

`.reveal` elements fade in via an IntersectionObserver (threshold `0.08`) in the inline `<script>`. On first load, anything below the fold is invisible until scrolled into view. If you screenshot the page right after navigation, sections will look blank — that's a render quirk, not a bug. Don't add `display:none` to a `.reveal` element unless you also remove the class.

## Path selector

The site is one HTML file with four "paths" pre-rendered inside it:

```
about → partners → galen → custom
```

`selectPath(name)` toggles `display` on each `#path-{name}` div and rewrites nav + footer link visibility. Default visible path on load is `about`. If you add a fifth path, also update the `paths` array at the top of `selectPath`, the `labels`/`footLabels` maps, and the path-card grid in the path selector.

## What NOT to touch without asking

Copy changes in the following areas carry legal, financial, or strategic weight. Pause and surface the proposed edit before pushing:

1. **Pricing tiers** — `The Receptionist $400`, `The Command Center $900`, `The Full Stack $1,500–2,000`, and their setup fees. Changing a number here without aligning the portal (`kaiserfriedrichwilhelm3/arx-portal`, `lib/catalog.ts`) and the spec docs (`~/Downloads/ARX_Receptionist_Modular_Build_Spec.docx`) creates a contradiction a prospect's lawyer will catch.
2. **BAA / HIPAA copy.** As of 2026-05-06, every BAA reference uses forward-looking *"required before clinical deployment"* language (commit `cc524a9`). Do **not** revert to present-tense fulfillment claims (*"signed with every contract"*, *"executed before a single call routes"*) until a lawyer-drafted BAA template is actually on file.
3. **Anything in the Security or "Why ARX Systems" sections** that asserts compliance, certifications, or operational guarantees (zero-retention, 24/7 answered, BAA-backed).
4. **Clinical-pilot / partners section** copy referencing Dr. Edgardo M. Cespedes or other named providers. The current framing is deliberate.
5. **The banned-phrases list** in `~/Downloads/AIMS_CLAUDE_CODE_PROMPT_v6.md` — project-wide constraints (e.g. *"Cespedes Cardiology as an active partner"*, *"HIPAA-compliant"*, *"Deploy" on any CTA*). These apply here even though the file lives elsewhere.

## Conventions

- **No build step.** Don't add Webpack/Vite/esbuild/Next. The point of this repo is that it boots in ~50ms.
- **No third-party scripts in `public/index.html`.** Strong privacy posture is part of the medical brand promise.
- **All colors / fonts as CSS custom properties** (`--navy`, `--gold`, etc.) — never hardcode hex.
- **Inline SVG only** for icons. No icon-font CDNs.
