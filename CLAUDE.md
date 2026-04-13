# AIMS Alpha 1.0 — Project Memory (CLAUDE.md)
# Last updated: April 2026

## SYSTEM STATUS
AIMS v1.2.0 — STABLE
Recent patches:
  v1.2: Multi-Voice Concurrent Scaling
  v1.1: Optimized RCM Denial Logic
  v1.0: Initial Alpha release — Cespedes Cardiology pilot deployment

## PRODUCT CONTEXT
Company: ARX Systems
Product: AIMS Alpha 1.0 (Artificial Intelligence Management System)
Brand logic: One Brain. Multiple Arms.
Founder: Direct-to-Founder integration support model

Two deployment arms:
  GENERAL AIMS — any professional service business
    Modules: Call Manager, Revenue Leak Detector, Lead Engine,
             CRM Aggregator, Analytics Dashboard, Client Closer
  AIMS MEDICAL — clinical practices only
    Modules: Insurance Defense Engine, Prescription Guard,
             Live Session Scribe, FHIR R4 Memory, Claims Audit,
             Front Desk Triage
Pilot partner: Cespedes Cardiology, MD, PA — Miami, FL (ACTIVE)

## REPO & DEPLOYMENT
GitHub: kaiserfriedrichwilhelm3/arx-website
Live: https://arx-website-production.up.railway.app/
Platform: Railway — auto-deploys on push to main
Build command: npm run build
Start command: npm start (next start)
Old stack: Node/Express static server — REPLACED by Next.js Pages Router

## DESIGN SYSTEM

### Colors (CSS custom properties — never hardcode hex in JSX)
  --obsidian:       #0A0A0A
  --surface:        #111111
  --surface-2:      #161616
  --border:         rgba(250,250,250,0.08)
  --border-gold:    rgba(212,175,55,0.3)
  --border-medical: rgba(74,158,255,0.25)
  --white:          #FAFAFA
  --muted:          #666666
  --muted-2:        #444444
  --gold:           #D4AF37
  --gold-muted:     rgba(212,175,55,0.12)
  --medical:        #4A9EFF
  --medical-muted:  rgba(74,158,255,0.12)
  --danger:         #FF4444
  --success:        #22C55E

### Typography
  Serif display: Playfair Display (400, 700) — var(--font-serif)
  Monospace UI:  JetBrains Mono (400, 500)  — var(--font-mono)
  Loaded via Google Fonts <link> in _document.tsx (sandbox build constraint)
  FORBIDDEN: Inter, Roboto, Arial, system-ui, sans-serif

### Borders & Depth
  Default border: 1px solid var(--border)
  NO box-shadow — border + bg contrast only
  Border radius: 8px (cards), 4px (badges), 2px (dividers)
  Glassmorphism: Nav ONLY

### Spacing
  Base unit: 4px
  Card padding: 24px
  Section padding: 96px vertical desktop / 56px mobile
  Grid gap: 16px mobile / 24px desktop

## ANIMATION SYSTEM
Library: motion/react v12 — import from "motion/react" NOT framer-motion
AIMS Spring: { type: 'spring', stiffness: 80, damping: 18, mass: 1.2 }
Reduced motion: useReducedMotion() — if true, opacity-only transitions

## PRICING
Growth:  $499 setup / $299 /mo
Scale:   $1,499 setup / $699 /mo
Medical: $0 down / TBD post-pilot — Q3 2026 intake

## CODING STANDARDS
1. No wrapper logic — every component self-contained, fully typed
2. No TypeScript any
3. Deterministic state — all UI state is pure function of inputs
4. No hardcoded colors in JSX
5. Inline SVG only — never img src="*.svg"
6. Pages Router (/pages directory) — NOT App Router
7. All interactive components: 'use client' at top
8. Every component has TypeScript interface for props

## COMPONENT LIST
Nav, Hero, SystemStatus, BentoCard, GeneralAIMS, MedicalAIMS,
Calculator, Pricing, Changelog, FounderSection, Modal, Footer
