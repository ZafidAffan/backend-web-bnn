const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const path = require('path');

app.use(express.json());

// ===== ROUTES SURAT =====
app.use('/surat', require('./add_surat'));
app.use('/surat', require('./tracking_surat'));
app.use('/surat', require('./disposisi'));
app.use('/surat', require('./update_status'));
app.use('/surat', require('./konfirmasi'));
app.use('/surat', require('./kirim_divisi'));

// Serve static (kalau perlu)
app.use(express.static(path.join(__dirname, 'public')));

// Export ke Vercel
module.exports = app;
