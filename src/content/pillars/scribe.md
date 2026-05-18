---
number: "IV"
title: "Scribe"
subtitle: "The clinical note that writes itself, and waits to be signed."
status: "deploying"
statusLabel: "In deployment"
order: 4
summary: "An ambient clinical scribe that captures the encounter, produces a structured SOAP note, and pushes it to the EHR as unsigned — never auto-signed — awaiting one-click provider approval."
---

## What it is

An ambient scribe that runs during the encounter, listens to the conversation between provider and patient, and produces a structured SOAP note by the time the visit ends. The note is pushed to the EHR with a status of unsigned. The provider reviews it on the next screen, edits if needed, and signs. We do not auto-sign anything. Clinical liability stays where it belongs.

## How it is configured

The scribe is trained on the specialty's templates and the practice's note conventions. Output structure (subjective, objective, assessment, plan) is configurable; level of detail is configurable; ICD coding suggestions are configurable. The provider sees the note in the format they already use, not a generic transcript.

## What "complete" looks like

Complete means: the note is in the EHR within sixty seconds of the encounter ending; structure matches the provider's existing template; PHI is purged from local memory after EHR write-back; the document is unsigned and routes to the provider's review queue; every clinical claim in the note traces back to a transcript span the provider can verify.

## Status in the reference deployment

In deployment. The cardiology template is built; integration with the practice's EHR is in final testing.
