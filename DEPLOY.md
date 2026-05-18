# DEPLOY.md

Step-by-step deploy guide. Target host: **Railway** (already in use for `arxsystems.org`). Rationale in [`DECISIONS.md`](./DECISIONS.md) §2.

---

## Today: holding-page deploy

The current state of `main` builds a single-page holding notice at `/`, replacing the retired Galen-era site. All other editorial pages are `_`-prefixed in `src/pages/` so Astro skips them. To ship the holding page:

```bash
git status                       # confirm the renames + new src/pages/index.astro are staged
git push origin main             # Railway picks up the push, deploys in ~60s
```

After Railway shows the new deploy live, verify:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://arxsystems.org/   # → 200
curl -s https://arxsystems.org/ | grep -c "under refresh"           # → 1
curl -s -o /dev/null -w "%{http_code}\n" https://arxsystems.org/method  # → 404 (correct)
```

If `/method` returns 200, the `_`-prefix rename did not take effect — check `src/pages/` and confirm no editorial page is named without a leading underscore. Re-deploy.

The strategy memo form is not on the holding page, so `RESEND_API_KEY` is not needed for the holding-page deploy to function. Set it anyway before re-enabling the editorial pages.

---

---

## 0. One-time setup, if Railway is not already configured

You can skip this section if `arxsystems.org` is currently serving on Railway (it is, as of this writing).

1. Create a Railway account at <https://railway.app>. Sign in with GitHub.
2. Click **New Project → Deploy from GitHub repo**. Select `kaiserfriedrichwilhelm3/arx-website`. Railway auto-detects the `nixpacks.toml` and `railway.toml`.
3. Set environment variables (Project → Variables):
   - `RESEND_API_KEY` — generate at <https://resend.com/api-keys>. **Required in production. If missing, `/api/memo` returns 503 and logs loudly.**
   - `NODE_ENV` — set to `production`. Railway sets this by default on production environments, but verify it: with `NODE_ENV` unset, the memo endpoint falls into dev stub mode and would silently swallow submissions.
   - `MEMO_URL` — permanent download URL for the strategy memo PDF. Optional. If unset, requesters get a confirmation that says the memo will arrive within one business day.
   - `CONTACT_EMAIL` — `gabrielcespedes777@gmail.com` (default; override only if routing changes).
   - `PUBLIC_CAL_LINK` — your Cal.com handle, e.g. `arxsystems/intake`. Default placeholder works but won't book.
4. Settings → Networking → **Generate Domain** if you don't already have an `*.up.railway.app` URL.
5. Settings → Networking → **Add Custom Domain** → `arxsystems.org` and `www.arxsystems.org`. Railway will show DNS records. Add them at your registrar (a CNAME to Railway's edge for `www`, an A record for the apex).

## 1. Local verification before pushing

From the repo root:

```bash
npm install
npm run build             # Astro builds dist/. Should complete with 0 errors.
RESEND_API_KEY=re_xxx PUBLIC_CAL_LINK=arxsystems/intake npm start
# → http://localhost:3000
```

Visit every route and click every link. Confirm:
- [ ] Home loads with the editorial structure (§ 01 Thesis → § 05 Apply).
- [ ] `/method` lists five pillars; Voice shows "Live in reference", others show "In deployment".
- [ ] Each pillar deep-dive renders. Voice has the audio player placeholder near the bottom.
- [ ] `/authorship` loads. The Cespedes portrait frame shows "Portrait pending" until the real photo lands.
- [ ] `/engagement` shows the four-week calendar and the FAQ.
- [ ] `/memo` form submits (check stdout for the logged payload if `RESEND_API_KEY` is unset).
- [ ] `/apply` opens the Cal.com modal. Iframe loads if `PUBLIC_CAL_LINK` is configured.
- [ ] Mobile menu opens and closes; Escape closes it; focus returns to the toggle.
- [ ] All routes return 200 with no console errors.

## 2. The memo PDF

The `/api/memo` endpoint emails requesters a **permanent** `MEMO_URL` (a plain HTTPS link — no signing, no expiry). Two practical hosting options:

1. **Cloudflare R2 / AWS S3 with public read** — upload the PDF, copy the public object URL, set `MEMO_URL` in Railway to that URL. Cheapest, simplest. The URL stays valid until you delete the object. Replace the file in place to issue an update; the URL doesn't change.
2. **Serve from the Railway app itself** — put the PDF under `public/files/strategy-memo.pdf`, set `MEMO_URL=https://arxsystems.org/files/strategy-memo.pdf`. Note that committing the PDF to the repo defeats any access boundary; treat the link as public regardless. If you want it kept out of git, drop it into `private/memo/` (gitignored) and add a small Express static mount for that directory in `server.js` — pointing `MEMO_URL` at the resulting route.

If `MEMO_URL` is unset, the confirmation email tells the requester the memo will arrive within one business day, and you send it manually from the founder notification email. That is the recommended state until you decide on hosting.

## 3. Deploying

```bash
git push origin main
```

Railway picks up the push, runs `nixpacks` (Node 20 → `npm install` → `npm run build` → `npm prune --omit=dev` → `npm start`). Build typically completes in 60–90 seconds. Watch the deploy log in the Railway dashboard.

If the deploy fails:
- **`astro: command not found`** during build → `package.json` is missing `astro` in `devDependencies`. Re-add and push.
- **`Cannot find module './server/routes/memo'`** at boot → check that `server/routes/memo.js` exists and is committed. The Galen-era `_legacy_src/` and `_legacy/` directories are not required at runtime; only `server/` and `dist/` are.
- **404 on all routes** → `dist/` did not build. Check the Railway build log; usually a content schema validation error.

## 4. DNS cutover (only when ready)

The current production site is the Galen-era `_legacy/index.html`. The editorial rebuild is in `dist/` from the new Astro build. They can co-exist on Railway during testing because the new build replaces `dist/` cleanly on every deploy.

**To cut over:**

1. Push the new build to `main`.
2. Watch the Railway deploy complete.
3. Hit `arxsystems.org` — you should see the new editorial home.
4. If anything looks wrong, you can roll back in Railway → Deployments → previous → Redeploy. Rollback takes about 30 seconds.

There is no DNS change required for the cutover itself — same domain, same Railway service, new code. The DNS section above (§0) is only relevant if you are setting up Railway from scratch.

## 5. Post-cutover smoke test

After Railway shows the new deploy as live, run from any machine:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://arxsystems.org/
curl -s -o /dev/null -w "%{http_code}\n" https://arxsystems.org/method
curl -s -o /dev/null -w "%{http_code}\n" https://arxsystems.org/method/voice
curl -s -o /dev/null -w "%{http_code}\n" https://arxsystems.org/authorship
curl -s -o /dev/null -w "%{http_code}\n" https://arxsystems.org/engagement
curl -s -o /dev/null -w "%{http_code}\n" https://arxsystems.org/memo
curl -s -o /dev/null -w "%{http_code}\n" https://arxsystems.org/apply
```

All seven should return `200`. If any return `404`, the build did not include that page — check `dist/` locally and re-deploy.

## 6. Lighthouse

Run from Chrome DevTools → Lighthouse, in incognito, on mobile profile. Target: **95+ on all four scores** (Performance, Accessibility, Best Practices, SEO). If any score falls below 95, treat it as a build regression and fix before declaring the deploy complete.

## 7. Fallback host (if Railway breaks)

Cloudflare Pages is the cheapest fallback for a static-only deploy:

```bash
# Cloudflare Pages picks up the dist/ output. Configure:
#   Build command: npm run build
#   Build output:  dist
#   Node version:  20
```

The `/api/memo` endpoint will not run on Cloudflare Pages without converting to a Cloudflare Worker. That migration is a half-day if Railway becomes unworkable; until then, Railway stays.
