// In-memory rate limiter: 5 requests per hour per IP.
// Ported verbatim from the pre-rebuild server.js. Same window, same
// max, same single-process memory store. If the site ever scales to
// multiple instances, this needs to move to Redis — but a solo-founder
// pre-launch site on one Railway dyno does not.

const store = new Map();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQ = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = store.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    store.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= MAX_REQ) return false;
  entry.count++;
  return true;
}

module.exports = { checkRateLimit };
