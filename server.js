// ARX Systems Express wrapper for the v2 Astro build.
//   1. Serves dist/ (Astro static output) at site root.
//   2. Mounts /api/memo (v2 editorial site) and /api/contact (legacy, kept
//      until DNS cutover so any in-flight v1 traffic does not 404).
//
// The Galen-era /setup form and its /api/setup-interest endpoint were removed
// — they contradicted the current position (no pricing, no "reserve a tier").
//
// extensions:['html'] lets any future passthrough HTML files (if any) resolve
// without the .html suffix.
//
// In production, `npm prune --omit=dev` runs after `astro build`, so
// astro is not present in node_modules at runtime. This file only
// requires express + the routes — both production dependencies.

const express = require('express');
const path = require('path');

const { contactHandler } = require('./server/routes/contact');
const { memoHandler } = require('./server/routes/memo');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '64kb' }));
app.use(express.static(path.join(__dirname, 'dist'), { extensions: ['html'] }));

// v2 (editorial site)
app.post('/api/memo', memoHandler);

// v1 (Galen-era) contact endpoint — kept until DNS cutover so legacy traffic does not 404.
app.post('/api/contact', contactHandler);

app.listen(PORT, () => console.log(`ARX Systems → http://localhost:${PORT}`));
