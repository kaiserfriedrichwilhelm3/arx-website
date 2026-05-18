---
number: "I"
title: "Voice"
subtitle: "The bilingual front desk that does not miss a call."
status: "live"
statusLabel: "Live in reference"
order: 1
summary: "A medical-grade voice agent that answers every incoming call, handles scheduling and refill requests in English and Spanish, and escalates to a human on the patterns that matter."
---

## What it is

A voice agent built for the patterns of a specialty practice — scheduling, prescription refills, intake, and the short clinical questions that should not become a same-day appointment. Bilingual by default. Hard-coded triage on emergency keywords in both languages. Every conversation is summarized, structured, and written back to the EHR as an unsigned note awaiting provider review.

## How it is configured

The agent is configured per practice — not per industry. Provider names, hours, accepted insurance, scheduling rules, refill policy, and escalation thresholds are loaded from a practice configuration file maintained jointly by ARX and the practice manager. Changes ship same-day. The voice itself is consistent across calls; the script is not.

## What "complete" looks like

Complete for this pillar means: (1) the agent picks up every inbound call within two rings; (2) ninety-five percent of routine scheduling and refill calls resolve without a human transfer; (3) every escalation lands in the right hands with a one-line summary; (4) every clinical signal is captured as an unsigned EHR note in under sixty seconds of the call ending; (5) emergency keywords trigger a 911 script without an LLM call.

## Status in the reference deployment

Live in prototype at Cespedes Cardiology since the first quarter of this engagement. Iterating on edge cases weekly. The escalation logic and bilingual triage are stable; the refill workflow is mid-tuning against the practice's actual call mix.
