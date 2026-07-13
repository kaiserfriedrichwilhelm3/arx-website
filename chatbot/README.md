# ARX booking bot

Conversational appointment-booking chatbot for arxsystems.org. Replaces the intake
form: a visitor chats with the widget, the bot offers real Cal.com availability, and
books them onto an intake call. Its **only** job is scheduling — any other topic gets
a fixed redirect string.

## Architecture — thin LLM, thick backend

```
user message → POST /chat → Claude Haiku (parse to JSON only) → deterministic
state machine → Cal.com v2 (slots / booking) → templated reply
```

- The LLM (**`claude-haiku-4-5`**) has exactly two capabilities, both pure parsing:
  classify the message (`BOOK_INTENT | TIME_PREFERENCE | PROVIDE_DETAILS | CONFIRM |
  OFF_TOPIC`) and extract `{date_pref, time_pref, name, email, practice_name,
  specialty, reason}`. Structured outputs (`output_config.format`) force schema-valid
  JSON — the model **cannot** emit prose, call Cal.com, decide availability, or hold
  state. It is told all user text is untrusted data, not instructions.
- Everything else — slot windows, slot matching, the question order, the confirm gate,
  booking, retries — is plain code in `server.js`. Replies are deterministic templates,
  so the bot cannot be prompt-injected into saying or doing anything else.
- Off-topic messages get the hardcoded constant: *"I can only help schedule a call.
  What day works for you?"* — enforced in code, not by the model.
- Booking happens **only** after the explicit echo-back confirmation
  (*"Booking [day] [time] ET for [name] ([email]) — correct?"*) and a literal yes.

## Run

```bash
cd chatbot
npm install
cp .env.example .env    # fill in ANTHROPIC_API_KEY, CAL_API_KEY, CAL_EVENT_TYPE_ID, CAL_BOOKING_URL
npm start               # → http://localhost:3100
open http://localhost:3100/demo.html
```

## Embed on the site

Serve the bot (this Express app) somewhere public, then add to the page:

```html
<link rel="stylesheet" href="https://YOUR-BOT-HOST/widget.css">
<script src="https://YOUR-BOT-HOST/widget.js" defer
        data-endpoint="https://YOUR-BOT-HOST/chat"
        data-cal-link="https://cal.com/YOUR-HANDLE/intake"></script>
```

The widget talks **only** to your backend. No key ever reaches the browser.

## ⚠️ Before production — verify the Cal.com per-endpoint versions

Cal.com versions its v2 endpoints **individually** via the `cal-api-version` header,
and these change and break silently. The live docs were **not reachable from the build
environment**, so the shipped defaults are the spec's "as of last check" values:

| Endpoint | Header value | Env override |
|---|---|---|
| `GET /v2/slots` | `2024-09-04` | `CAL_API_VERSION_SLOTS` |
| `POST /v2/bookings` | `2024-08-13` | `CAL_API_VERSION_BOOKINGS` |

Check each endpoint's page at cal.com/docs/api-reference/v2 and correct the env vars
if they've moved. Then run the booking test (below) before pointing traffic at it.

Other Cal.com production notes baked into the code (`server.js` comments mark each):
- `/v2/slots` can return out-of-range or unbookable slots → results are hard-filtered
  to the requested range, and the chosen slot is **re-validated with a fresh
  `get_slots` call immediately before every POST**.
- A booking 200 is **not** success → the code requires `data.status === "accepted"`
  **and** non-empty `data.references`; anything else on a 2xx is treated as a soft
  failure (user told "we'll confirm shortly" + fallback link, full body logged).
- Required booking questions on the event type cause 400s (`error_required_field`;
  some versions also demand a root `title`). On any 400 the user gets the fallback
  link and the full error is logged — check the log, then either relax the event
  type's required questions or extend the payload per current docs.
- 429s retry with exponential backoff.
- **TODO(field-slugs):** `practice_name` / `specialty` / `reason` are collected in
  conversation but not yet written to the booking — set `FIELD_SLUGS` in `server.js`
  to the event type's exact booking-field slugs to enable `bookingFieldsResponses`.
  Until then bookings are created without custom fields (by design).

## Timezone

Everything is pinned to `BUSINESS_TZ` (default `America/New_York`): the slots query,
every label shown to the user ("all times ET"), and the booking attendee. The
browser's timezone is never consulted.

## Security

- The bot has **no capability** beyond `get_slots` and `create_booking` — no cancel,
  no listing others' bookings, no email sending, no DB. No code path exists for
  anything else.
- `ANTHROPIC_API_KEY` / `CAL_API_KEY` are server-side env vars only.
- `/chat` and `/book` are rate-limited 20/min per IP (`express-rate-limit`,
  `trust proxy = 1` so the Railway edge's client IP is what's limited).
- Every classification, slot lookup, and booking attempt is logged as one JSON line
  with timestamp, IP, and outcome; booking failures log the full API error. Emails
  are logged only as short SHA-256 hashes.
- User input is length-capped, delimited as untrusted data in the parser prompt, and
  rendered in the widget via `textContent` (no HTML injection).

## Test the full booking flow

```bash
TEST_ATTENDEE_EMAIL=you@example.com node test-booking.js
```

Creates a **real booking** on the configured event type (use a throwaway event type),
then verifies `status: accepted` + non-empty `references` before declaring success.
Cancel the test booking in the Cal.com dashboard afterwards.

## Deploying next to the site

This is a standalone Express service (own `package.json`). Simplest path: a second
Railway service pointed at the `chatbot/` directory with the env vars set. The
existing intake form stays live until this is configured and the test above passes —
then swap the form's `#contact` section for the embed snippet.
