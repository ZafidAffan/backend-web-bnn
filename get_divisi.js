const express = require('express');
const router = express.Router();
const db = require('./db');   // koneksi MySQL

// === GET ALL DIVISI ===
router.get('/divisi', (req, res) => {

    const query = `
        SELECT 
            id_divisi,
            nama_divisi,
            singkatan
        FROM divisi
        ORDER BY nama_divisi ASC
    `;

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data divisi",
                error: err
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data divisi ditemukan",
            data: result
        });
    });

});

module.exports = router;
