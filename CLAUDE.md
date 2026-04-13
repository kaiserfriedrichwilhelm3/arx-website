# AIMS Alpha 1.0 — Project Memory (CLAUDE.md)

## SYSTEM STATUS
AIMS Alpha 1.0.4 — STABLE
Changelog:
  v1.0.4: Context hygiene + HIPAA audit pass
  v1.0.3: Scribe latency improvements
  v1.0.2: RCM denial pattern expansion
  v1.0.1: Cespedes Cardiology live deployment
  v1.0.0: Initial Alpha release

## PRODUCT CONTEXT
Company: ARX Systems | Product: AIMS Alpha 1.0
Brand: One Brain. Multiple Arms.
Model: Direct-to-Founder — no account managers, no ticket queues

TWO DEPLOYMENT SECTORS (never mix their pricing in the same view):

  SECTOR A — GENERAL AIMS (any professional service business)
    Starter  ($499/mo):   Arm 01 — Voice + Lead Qualification
    Growth   ($2,400/mo): Arms 01–03 — + Revenue Recovery + Outbound
    Scale    ($5,800/mo): Full Platform + Direct Integration Engineer

  SECTOR B — AIMS MEDICAL (clinical practices only)
    Single offering: Zero-Cost Clinical Pilot
    $0 upfront | First 30 days free | 40% lifetime discount on v2.0
    Modules: Insurance Defense, Prescription Guard, Live Session Scribe,
             FHIR R4 Memory, Claims Audit, Front Desk Triage
    Pilot partner: Cespedes Cardiology, MD, PA — Miami, FL

## SITE ARCHITECTURE
  / (index) — Business-first homepage with sector toggle
  /medical  — Dedicated medical sub-page (its own Next.js page)

## REPO & DEPLOYMENT
  GitHub: kaiserfriedrichwilhelm3/arx-website
  Live: https://arx-website-production.up.railway.app/
  Platform: Railway — auto-deploys on push to main
  Build: npm run build | Start: npm start (next start)
  Old stack: Node/Express static → REPLACED by Next.js Pages Router

## DESIGN SYSTEM

### Colors — CSS custom properties ONLY, never hardcode hex in JSX
  --obsidian:         #0A0A0A
  --surface:          #111111
  --surface-2:        #161616
  --border:           rgba(250,250,250,0.08)
  --border-gold:      rgba(212,175,55,0.3)
  --border-medical:   rgba(74,158,255,0.25)
  --white:            #FAFAFA
  --muted:            #666666
  --muted-2:          #444444
  --gold:             #D4AF37
  --gold-muted:       rgba(212,175,55,0.12)
  --medical:          #4A9EFF
  --medical-muted:    rgba(74,158,255,0.12)
  --danger:           #FF4444
  --success:          #22C55E
  --warning:          #F59E0B

### Typography
  Serif display: Playfair Display 400,700 → var(--font-serif)
  Monospace UI:  JetBrains Mono 400,500  → var(--font-mono)
  Loaded via Google Fonts link in _document.tsx (sandbox build constraint)
  FORBIDDEN: Inter, Roboto, Arial, system-ui, sans-serif

### Borders & Depth
  Border width: 1px only.
  NO box-shadow — border + bg contrast for depth
  Border radius: 8px cards | 4px badges | 2px dividers
  Glassmorphism: Nav ONLY — rgba(10,10,10,0.85) + backdrop-blur-xl

### Spacing
  Base unit: 4px
  Card padding: 24px
  Section vertical: 96px desktop / 56px mobile
  Grid gap: 16px mobile / 24px desktop

## ANIMATION SYSTEM
  Library: motion/react v12 — import from "motion/react"
  AIMS Spring: { type:'spring', stiffness:80, damping:18, mass:1.2 }
  Reduced motion: useReducedMotion() — if true, opacity only

## CODING STANDARDS
  1. No wrapper logic — every component self-contained, fully typed
  2. No TypeScript any
  3. Deterministic state only
  4. All colors via CSS vars — never hex in JSX
  5. Inline SVG only — never img src="*.svg"
  6. Pages Router (/pages directory) — NOT App Router
  7. All interactive components: use client at top
  8. Every component has TypeScript interface for props
  9. No form HTML tags — div wrappers with onClick

## COMPONENT LIST
Nav, Hero, SystemStatus, BentoCard, GeneralAIMS, Calculator, Pricing,
Changelog, FounderSection, Modal, Footer,
MedicalHero, CaseStudy, MedicalModules, MedicalCalculator, MedicalPricing
