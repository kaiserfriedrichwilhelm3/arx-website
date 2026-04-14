# ARX Systems — Project Memory (CLAUDE.md)
# Last updated: 2026-04-14 (v6)

## PRODUCT TRUTH
Pre-launch. Nothing deployed to any client.
Write as: "Here is what we are building. Here is what it will do.
Join early — before public launch."

## BRAND
  ARX Systems → Company (Founder-led, Miami FL)
  AIMS → Artificial Intelligence Management System (general business)
  Galen → Clinical implementation of AIMS (medical practices)
  Atlas → Real estate implementation of AIMS (coming soon, teaser only)

  "AIVIS" → DELETED. Never appears anywhere.
  "HIPAA-compliant / HIPAA-ready" → DELETED. No compliance page exists.
    Replace with: "Built with zero-retention architecture"
                  "Designed for clinical data security"
                  (Never claim compliance without a BAA page)

## SITE ARCHITECTURE
  /       → Landing selector (choose AIMS or Galen)
  /aims   → AIMS full product page (general business)
  /galen  → Galen full product page (clinical medicine)

## BANNED PHRASES (Zero Tolerance)
  ✗ "AIVIS" anywhere
  ✗ "Deploy" on any CTA
  ✗ "Live in 48 hours" / any deployment timeline
  ✗ "Available for Immediate Deployment"
  ✗ "Cespedes Cardiology" as an active partner
  ✗ "In Active Clinical Development"
  ✗ "EHR Write-Back (In-Testing)"
  ✗ "HIPAA-compliant" / "HIPAA-ready" / "HIPAA Architecture"
  ✗ Any hard stat presented as a proven result
  ✗ "Direct Founder access" in pricing tiers
  ✗ "In Development" on arm/module cards
    → Use: "Alpha Stage · Limited Access"

## CORRECT CTA LANGUAGE
  Primary:   "Apply for Early Access" / "Join the Alpha"
  Galen:     "Inquire About Galen" / "Request Galen Access"
  Neutral:   "Learn More" / "Explore" / "See How It Works"
  Never:     "Deploy" / "Buy Now" / "Sign Up" / "Subscribe"

## DESIGN SYSTEM

Colors (CSS custom properties — NEVER hardcode hex in JSX):
  --obsidian:         #0A0A0A
  --surface:          #111111
  --surface-2:        #161616
  --border:           rgba(250,250,250,0.08)
  --border-gold:      rgba(212,175,55,0.3)
  --border-galen:     rgba(74,158,255,0.25)
  --white:            #FAFAFA
  --muted:            #666666
  --muted-2:          #444444
  --gold:             #D4AF37   AIMS accent
  --gold-muted:       rgba(212,175,55,0.12)
  --galen:            #4A9EFF   Galen accent
  --galen-muted:      rgba(74,158,255,0.12)
  --danger:           #FF4444
  --success:          #22C55E
  --warning:          #F59E0B   in-development status dots

Typography:
  NOTE: next/font/google causes 403 at build time in Railway sandbox.
  Fonts loaded via CDN <link> in _document.tsx.
  CSS vars: --font-serif, --font-mono set in _document.tsx <style> block.
  FORBIDDEN: Inter, Roboto, Arial, system-ui, sans-serif

Borders: 1px only. No box-shadow. Glassmorphism: Nav only.
Radius: 8px cards (--radius-card) | 4px badges (--radius-badge)
Anchor offset: scroll-margin-top 80px on all [id] elements

## ANIMATION
  Library: motion/react v12 — import from "motion/react" ONLY
  AIMS Spring: { type:'spring', stiffness:80, damping:18, mass:1.2 }
  Reduced motion: useReducedMotion() in every animated component

## MODAL / FORM FIX (CRITICAL)
  AIMSForm and GalenForm each include their own overlay.
  Overlay: position:fixed; inset:0; display:flex;
           align-items:center; justify-content:center; z-index:9999
  Panel: flex child of overlay — centered by flexbox
  NO position:absolute on panel. NO explicit top/left centering.

## ALPHA STAGE LANGUAGE
  Never on module/arm cards: "In Development"
  Always: "Alpha Stage · Limited Access"
  Rationale: "Alpha" signals exclusive early access.
             "Development" signals it might not work.

## INTEGRATION TILES
  Each tile is its own DOM element — NEVER a concatenated string.
  <span className="integration-tile">SF</span>  ← correct
  "SFHBZDGSQKSL"  ← never again

## CODING STANDARDS
  1. No TypeScript any
  2. All colors via CSS vars — never hex in JSX
  3. CDN fonts via _document.tsx (Railway blocks next/font/google)
  4. Inline SVG only
  5. Pages Router — NOT App Router
  6. 'use client' on every interactive component
  7. TypeScript interface for every component's props
  8. No HTML form tags — div containers + onClick handlers
  9. scroll-margin-top via [id] global rule in globals.css
  10. Status dots: var(--warning) orange — NOT green
  11. Integration tiles: individual DOM elements, never concatenated string
  12. No dropdowns in forms — typed text inputs only
