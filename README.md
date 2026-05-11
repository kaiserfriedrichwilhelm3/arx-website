# arx-website

Marketing site for ARX Systems — [arxsystems.org](https://arxsystems.org).

## Stack

Node.js + Express, single static HTML file at `public/index.html`. No build step, no framework.

## Local development

```bash
npm install
npm start
# → http://localhost:3000
```

The server reads `RESEND_API_KEY` from the environment for transactional email. Without it, contact-form submissions log payloads to stdout instead of sending — useful in local dev, do not run prod that way.

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx npm start
```

## Files worth knowing about

| Path | What it is |
|---|---|
| `public/index.html` | The entire marketing site — four "paths" (about / partners / galen / custom) toggled by inline JS |
| `public/setup.html` | Standalone "reserve your spot" form (auto-saves to localStorage, submits to `/api/setup-interest`) |
| `server.js` | Express server: static middleware + `POST /api/contact` + `POST /api/setup-interest` |
| `railway.toml`, `nixpacks.toml` | Railway deploy config (nixpacks builder, `npm start` start command) |
| `CLAUDE.md` | Conventions, gotchas, and the list of copy areas that need approval before edits |

## Deploy

Push to `main` → Railway auto-deploys. Site is at [arxsystems.org](https://arxsystems.org). There is no staging branch — `main` is live.

## Environment variables

| Name | Required | Default |
|---|---|---|
| `RESEND_API_KEY` | Yes in production | unset → logs to stdout |
| `CONTACT_EMAIL` | No | `gabrielcespedes777@gmail.com` |
| `PORT` | No | `3000` (Railway sets this) |

## Before editing copy

See `CLAUDE.md` for the list of areas where edits need approval (pricing tiers, BAA/HIPAA claims, clinical-pilot framing). Everything else is fair game.
