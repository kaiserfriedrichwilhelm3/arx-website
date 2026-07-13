// End-to-end Cal.com booking test. Exercises the FULL flow the bot uses:
//   get_slots → range-filter → re-validate → create_booking → verify success.
//
// ⚠️ THIS CREATES A REAL BOOKING on the configured event type. Point
// CAL_EVENT_TYPE_ID at a throwaway event type, and TEST_ATTENDEE_EMAIL at an
// inbox you control. Cancel the booking afterwards in the Cal.com dashboard.
//
// Run: node test-booking.js   (reads the same .env vars as server.js)

const { getSlots, createBooking } = require('./server');

const die = (msg, extra) => { console.error(`\nFAIL: ${msg}`); if (extra) console.error(extra); process.exit(1); };

(async () => {
  for (const v of ['CAL_API_KEY', 'CAL_EVENT_TYPE_ID', 'TEST_ATTENDEE_EMAIL']) {
    if (!process.env[v]) die(`missing env ${v}`);
  }

  const day = 86400000;
  const iso = (d) => d.toISOString().slice(0, 10);
  const start = iso(new Date(Date.now() + day)); // tomorrow → +8d, avoids same-day notice rules
  const end = iso(new Date(Date.now() + 8 * day));

  console.log(`1) get_slots ${start} → ${end} (tz pinned to ${process.env.BUSINESS_TZ || 'America/New_York'})`);
  const slots = await getSlots(start, end).catch((e) => die('get_slots errored', e));
  if (!slots.length) die('no slots returned in window — open availability on the event type first');
  console.log(`   ${slots.length} in-range slots; first: ${slots[0]}`);

  // Use the LAST slot in the window — least likely to collide with a real
  // prospect grabbing the next available time while the test runs.
  const target = slots[slots.length - 1];

  console.log('2) re-validate target slot (never trust a stale list)');
  const fresh = await getSlots(start, end).catch((e) => die('re-validation get_slots errored', e));
  if (!fresh.includes(target)) die('target slot vanished between lookups — rerun the test');

  console.log(`3) create_booking ${target}`);
  const r = await createBooking(target, { name: 'ARX Test Booking (safe to cancel)', email: process.env.TEST_ATTENDEE_EMAIL }, {})
    .catch((e) => die('create_booking threw', e));

  console.log(`   http=${r.status} data.status=${r.body?.data?.status} references=${(r.body?.data?.references || []).length}`);

  // A 200 alone is NOT success: require status "accepted" AND non-empty
  // references (empty references = booking that never syncs / emails).
  if (!r.hard) die('booking did not hard-confirm (see body below) — check cal-api-version, required booking questions, or the root `title` trap', JSON.stringify(r.body, null, 2));

  console.log(`\nPASS: booking ${r.body.data.uid || r.body.data.id || ''} confirmed with ${r.body.data.references.length} reference(s).`);
  console.log('Remember to cancel the test booking in the Cal.com dashboard.');
})();
