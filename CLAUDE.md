# ARX Systems — Project Memory (CLAUDE.md)
# Last updated: 2026-04-14

## PRODUCT TRUTH
Nothing is deployed. AIMS Alpha 1.0 is in active development.
The Galen medical pilot has not started. Write all copy in future-tense
or present-architecture-tense only. No proven results, no live stats.

## PRODUCTS
  AIMS  — Artificial Intelligence Management System
          Unified agentic operating layer for SMBs
          Status: Alpha 1.0, in development

  Galen — Clinical implementation of AIMS for private medical practices
          Status: In development, accepting inquiries
          Named after Galen of Pergamon

  Company: ARX Systems | Founder-led | Miami, FL

## SITE PAGES
  /         → AIMS homepage (general business, primary)
  /galen    → Galen medical sub-page (dedicated clinical)

## BANNED WORDS / PHRASES (never appear on any page)
  ✗ "AIVIS" — old brand name, fully retired
  ✗ "Deploy" on any CTA button
  ✗ "Live in 48 hours" or any deployment timeline
  ✗ "Cespedes Cardiology" as an active/clinical partner
  ✗ "In Active Clinical Development"
  ✗ "HIPAA" in any form (no compliance page exists)
  ✗ "1 Clinical Pilot" in system status
  ✗ Any proven metric presented as a result (%, $, uptime)
  ✗ "Direct Founder access" in any pricing tier
  ✗ Fixed pricing presented as "available now"

## CORRECT CTA LANGUAGE
  Primary:   "Join the Alpha" / "Request Early Access"
  Medical:   "Inquire About Galen" / "Request a Galen Demo"
  Secondary: "Learn More" / "Explore AIMS" / "See How It Works"
  Never:     "Deploy", "Buy Now", "Get Started Today", "Sign Up"

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
  --gold:             #D4AF37
  --gold-muted:       rgba(212,175,55,0.12)
  --galen:            #4A9EFF
  --galen-muted:      rgba(74,158,255,0.12)
  --danger:           #FF4444
  --success:          #22C55E
  --warning:          #F59E0B

Typography:
  NOTE: next/font/google causes 403 at build time in Railway sandbox.
  Fonts loaded via CDN link in _document.tsx.
  CSS vars: --font-serif, --font-mono set in _document.tsx <style> block.
  FORBIDDEN: Inter, Roboto, Arial, system-ui, sans-serif

## ANIMATION
  Library: motion/react v12 — import from "motion/react" ONLY
  AIMS Spring: { type:'spring', stiffness:80, damping:18, mass:1.2 }
  Reduced motion: useReducedMotion() in every animated component

## MODAL FIX (CRITICAL)
  Overlay: position:fixed; inset:0; display:flex; align-items:center;
    justify-content:center; z-index:9999
  Panel: width:100%; max-width:480px; margin:0 16px
  DO NOT use position:absolute or top/left on the panel.

## CODING STANDARDS
  1. No TypeScript any
  2. All colors via CSS vars — never hex in JSX
  3. CDN fonts via _document.tsx
  4. Inline SVG only
  5. Pages Router — NOT App Router
  6. 'use client' on every interactive component
  7. TypeScript interface for every component's props
  8. No HTML form tags
  9. scroll-margin-top via [id] global rule in globals.css
  10. Status dots: var(--warning) orange — NOT green
  11. Integration tiles: individual DOM elements, never concatenated string
