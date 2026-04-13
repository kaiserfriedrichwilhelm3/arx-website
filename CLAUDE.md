# AIMS Agentic Hub — Project Memory (CLAUDE.md)

## What This Repo Is
A Next.js Pages Router app replacing a vanilla Express/HTML static site.
Deployed on Railway. GitHub repo: kaiserfriedrichwilhelm3/arx-website
Live URL: https://arx-website-production.up.railway.app/

## Product Context
Company: ARX Systems
Product: AIMS (Artificial Intelligence Management System)
Brand logic: One Brain. Multiple Arms.
Two deployment arms:
  1. General AIMS — for any professional service business
     (calls, revenue, leads, CRM aggregation, analytics)
  2. Medical AIMS — clinical-grade, for medical practices
     (insurance defense, Rx guardrails, live session scribe,
      FHIR R4 memory, claims audit, front desk triage)
Pilot partner: Cespedes Cardiology, MD, PA — Miami, FL

## Design System
Colors:
  --obsidian: #0A0A0A
  --surface: #111111
  --border: rgba(250,250,250,0.08)
  --white: #FAFAFA
  --muted: #888888
  --gold: #D4AF37
  --gold-muted: rgba(212,175,55,0.15)
  --medical-blue: #4A9EFF
  --danger: #FF4444

Typography:
  Headlines: Playfair Display (400, 700) — loaded via next/font/google
  UI/Labels/Data: JetBrains Mono (400, 500) — loaded via next/font/google
  Never use Inter, Roboto, Arial, or system fonts

Spacing: base 4px, card padding 24px, section padding 80px/48px
Borders: 1px only, no box-shadow
Glassmorphism: Nav only — rgba(10,10,10,0.8) + blur(20px)
Border radius: 8px cards, 4px badges

## Alpha 1.0 Coding Standards
1. NO wrapper logic — every component self-contained, fully typed
2. NO `any` in TypeScript
3. Deterministic state only — no unpredictable async UI state
4. Animation library: `motion/react` v12 — import from "motion/react"
   NOT from "framer-motion" (deprecated package name)
5. AIMS Spring: { type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }
6. All colors via CSS custom properties defined in globals.css
7. next/font/google for all fonts — zero CDN font requests
8. next/image with blur placeholder for all raster images
9. Inline SVG only (no <img> for SVG files)
10. Pages Router — /pages directory, NOT /app directory

## Railway Deployment
Old: node server.js (Express static server)
New: next start (Next.js production server)
Railway start command must be updated to: npm start
package.json start script must be: "start": "next start"
PORT is provided by Railway via process.env.PORT — Next.js reads this automatically.

## Project Roadmap
- [x] CLAUDE.md written
- [x] Existing files read and catalogued
- [x] Old HTML/CSS/JS files deleted after content extracted
- [x] Next.js scaffold initialized in-place
- [x] Design tokens in globals.css
- [x] Glassmorphic Nav component
- [x] Hero section + SVG Deconstruction Animation
- [x] General AIMS section (Bento grid)
- [x] Medical AIMS section (Bento grid)
- [x] Revenue Recovery Calculator
- [x] Pricing section
- [x] Application modal
- [x] Footer
- [ ] Mobile audit (320px to 2560px)
- [ ] npm run build passes clean
- [ ] Railway config verified
