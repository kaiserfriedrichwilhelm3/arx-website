const express = require('express');
const path = require('path');
const app = express();

// Serve all static files from current directory
app.use(express.static(path.join(__dirname)));

// Explicit routes for each page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/medical', (req, res) => res.sendFile(path.join(__dirname, 'medical.html')));
app.get('/business', (req, res) => res.sendFile(path.join(__dirname, 'business.html')));
app.get('/enterprise', (req, res) => res.sendFile(path.join(__dirname, 'enterprise.html')));
app.get('/pricing', (req, res) => res.sendFile(path.join(__dirname, 'pricing.html')));

// Fallback — send index for any unknown route
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ARX Systems v2 running on port ${PORT}`));
