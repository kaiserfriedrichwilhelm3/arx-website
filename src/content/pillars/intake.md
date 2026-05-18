---
number: "III"
title: "Intake"
subtitle: "The first three minutes of the patient relationship, structured."
status: "deploying"
statusLabel: "In deployment"
order: 3
summary: "A structured intake flow that captures clinical history, insurance, and consent in under three minutes, in either language, with EHR write-back on submission."
---

## What it is

The intake form, redone for a specialty practice. The patient sees a short, plain-language sequence — never more than six questions per screen — and the practice sees a structured, validated record by the time the patient sits down. The form adapts to the chief complaint; cardiology intake is not the same as orthopedic intake, and the system knows that.

## How it is configured

Question sets are configured per specialty and per practice. The clinical content is reviewed by the supervising physician. Insurance fields validate against a maintained list of accepted plans. Consent text is provided by the practice, not by ARX.

## What "complete" looks like

Complete means: under three minutes from start to submit on a phone; full English and Spanish support, switchable mid-flow; every field validates client-side and server-side; submissions write to the EHR as a structured patient record, not as a PDF attachment.

## Status in the reference deployment

In deployment. The cardiology intake question set is in final review with Dr. Cespedes.
