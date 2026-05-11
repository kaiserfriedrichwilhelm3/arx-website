// ARX Systems Express wrapper for the v2 Astro build.
//   1. Serves dist/ (Astro static output) at site root.
//   2. Mounts /api/contact and /api/setup-interest, both ported verbatim
//      from the pre-rebuild server.js into server/routes/*. Behavior is
//      identical to the endpoints live on production today.
//
// extensions:['html'] preserves /setup → dist/setup.html (Astro copies
// public/setup.html through unchanged), and lets future passthrough
// HTML files (if any) resolve without the .html suffix.
//
// In production, `npm prune --omit=dev` runs after `astro build`, so
// astro is not present in node_modules at runtime. This file only
// requires express + the routes — both production dependencies.

const express = require('express');
const path = require('path');

const { contactHandler } = require('./server/routes/contact');
const { setupInterestHandler } = require('./server/routes/setup-interest');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist'), { extensions: ['html'] }));

app.post('/api/contact', contactHandler);
app.post('/api/setup-interest', setupInterestHandler);

app.listen(PORT, () => console.log(`ARX Systems → http://localhost:${PORT}`));
