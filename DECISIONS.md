# DECISIONS.md

Architecture decisions for the ARX Systems public website rebuild. One paragraph each, plain English. Sign-off required before further code lands.

---

## 0. Honest read of the starting state

The brief describes a current shipped single-page `index.html` with the editorial structure **Thesis → Authorship → Method → Engagement → Apply**, Fraunces + Inter + JetBrains Mono type, deep forest green on warm paper, § 01–05 section numbering. That file does not exist on disk. What is shipped at `_legacy/index.html` (and built into `dist/`) is the **Galen-era** site — Newsreader + navy/gold, four user paths (about / partners / galen / custom), explicit pricing tiers, "AI receptionist" framing, the retired Galen product name throughout. The brief explicitly retires Galen, removes pricing from public pages, and re-registers the brand as a productized services firm selling The Cespedes Method. The two are not reconcilable as a port. Treating the brief as the spec for V0 and preserving the Galen-era code as reference (not deletion). If a different editorial V0 exists in a draft the founder has not committed, point me at it and I'll diff against this build.

## 1. Stack — Astro 5 + MDX + content collections + plain CSS with design tokens

Astro for three reasons: ships near-zero JS by default (the brief sets 200KB-on-first-paint as a hard ceiling, which a Next.js bundle will not meet without aggressive surgery); supports the native View Transitions API via `<ClientRouter />` (which is what the brief asks for); and MDX + content collections give the founder a writing surface (`.md` files with frontmatter) that does not require a CMS service. Next.js was rejected because its baseline runtime cost is wasted on a site with one form endpoint and no auth — the brief explicitly excludes Vercel-specific patterns. Eleventy was rejected because the founder will want shared-element view transitions between `/method` and pillar pages, and that workflow is better-supported in Astro 5 than in Eleventy without bolt-ons. **No Tailwind.** Tailwind utility classes are loud in markup and bias toward a generic SaaS aesthetic; the brief wants an editorial register where typography, whitespace, and one accent color carry the design. Plain CSS with custom properties (`--ink`, `--paper`, `--forest`, `--rule`) is more legible to read, easier to keep restrained, and matches the convention already established in `_legacy/index.html`. The total CSS surface for a site this size fits in one tokens file plus per-page styles — Tailwind's tradeoff (utility velocity vs. design discipline) flips the wrong way here.

## 2. Deployment target — Railway

Railway already runs `arxsystems.org` (per the existing `railway.toml` and the legacy `CLAUDE.md`). Cutting over to Cloudflare Pages or Netlify for the sake of it adds a DNS migration, a new account, and a new build pipeline the founder has to maintain — for no engineering gain on a static-with-one-form site. Astro builds to a `dist/` directory that Railway's nixpacks pipeline serves via a tiny Express front-door (which is also where the one serverless function for the memo PDF lives). Cloudflare Pages or Netlify Functions would also work; Railway wins because it is already wired and the founder already understands the deploy. If Railway costs become a problem at zero traffic, Cloudflare Pages is the cheap fallback — that migration is a half-day's work, not a rebuild.

## 3. Content layer — Astro content collections, no external CMS

Markdown files under `src/content/pillars/*.md` and `src/content/pages/*.md`, each with typed frontmatter validated by a Zod schema in `src/content/config.ts`. The founder edits these files directly in his editor, commits, Railway redeploys. No Sanity, no Contentful, no Decap. Those services solve a problem (non-technical authors editing content) that does not exist here — the founder is the author and is comfortable in a code editor. They also impose a runtime dependency on a third-party API for content that should never be that fragile. Five pillar pages plus a handful of marketing pages do not need a CMS; they need a `git log`.

## 4. View transitions — sparingly, page-to-page only

The native View Transitions API via Astro's `<ClientRouter />` directive. Used in exactly two places: (1) page-to-page navigation inside the site, with a 200ms cross-fade; (2) a shared-element transition where the pillar title text on `/method` morphs into the page heading on each pillar deep-dive (`view-transition-name: pillar-{slug}`). Not used for in-page accordions, hover states, scroll-tied animation, or anything else. Respects `prefers-reduced-motion` — when set, transitions are disabled, navigation is instant. The reveal-on-scroll IntersectionObserver from the legacy file is kept; it is the only motion the brief explicitly preserves. Everything else is type and rule.

## 5. Interactive surface — closed list, no exceptions

The only client-side JS shipped: (a) the nav toggle for the mobile menu; (b) the reveal observer; (c) a single play/pause audio element on `/method/voice` with a placeholder MP3 until the founder records real samples; (d) a `<dialog>` element on `/apply` that holds a Cal.com iframe; (e) the memo request form on `/memo` posting to a serverless endpoint. No carousels, no parallax, no custom cursor, no chat widget, no "try our agent" demo. The brief lists these as known failure modes and I will refuse them if asked.

## 6. Forms and email

The memo form posts to `POST /api/memo` (an Express handler in `server.js`), which validates input (name, practice, email), rate-limits 5/hour per IP, and sends two emails via Resend: a notification to the founder so the request can be triaged, and a confirmation to the requester containing a **permanent** link to the memo PDF. No signing, no expiry, no time-limited tokens — the link is normal HTTPS and stays valid as long as the file is hosted. The PDF is hosted at a stable URL configured via the `MEMO_URL` env var (typically a public path served by Express, or an S3/R2 object URL). The lead-capture is the value of the form, not access control; if a recipient forwards the link, that is the same as forwarding the email — fine. No client-side data storage. **Missing-env behavior is strict, not silent.** In production (`NODE_ENV === 'production'`), if `RESEND_API_KEY` is unset, the endpoint returns `503` with an error body and logs loudly to stderr where Railway will surface it. Silently swallowing form submissions is unacceptable for an inbound channel that may be a cold-pitched physician's only way to reach the firm — that was the legacy convention and the legacy convention is wrong. In local development (`NODE_ENV !== 'production'` and no key set), the endpoint behaves as a stub: prints the payload to stdout and returns `200`, so the form can be exercised without a Resend account. The stub mode is logged explicitly on boot so it cannot be confused for prod.

## 7. Fonts — self-hosted, three families

Inter Variable and JetBrains Mono Variable are already in `public/fonts/` from the legacy build. Fraunces Variable will be added the same way (downloaded from Google Fonts' static export, served as woff2, preloaded in `<head>`). No Google Fonts CDN call — that's a CLS risk, a privacy issue, and an unnecessary third-party request. `font-display: swap` everywhere; the Inter fallback is system sans during the swap window. This is what keeps the first-paint budget under 200KB.

## 8. What I'm deferring until sign-off

Until you sign off on the above, I am not deleting `_legacy/`, not changing `arxsystems.org` DNS, and not removing the `/api/contact` or `/api/setup-interest` endpoints from `server.js` (those still answer prod traffic for the live Galen-era site). The scaffold lands beside the existing code; the old site keeps serving until you flip the routes. Cutover is a single commit when you say go.

---

## Sign-off

Read all of the above. If any of the eight calls is wrong, say which and why. If they're all fine, reply "approved" and I will proceed with the home page port and the rest of the build plan in `README.md`.
