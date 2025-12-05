const express = require('express');
const router = express.Router();
const db = require('./db');  // <-- PENTING

// === API TRACKING SURAT ===
router.get('/tracking/:id_surat', (req, res) => {
    const { id_surat } = req.params;

    const query = `
        SELECT 
            t.id_tracking,
            t.status,
            t.keterangan,
            t.tanggal
        FROM surat_tracking t
        WHERE t.id_surat = ?
        ORDER BY t.tanggal ASC
    `;

    db.query(query, [id_surat], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil tracking surat",
                error: err
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Tracking tidak ditemukan atau surat belum diproses"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tracking surat ditemukan",
            data: result
        });
    });
});

module.exports = router;
