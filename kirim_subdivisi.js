const express = require('express');
const router = express.Router();
const db = require('./db');

// === API KIRIM SURAT KE SUB DIVISI ===
router.post('/kirim-subdivisi', (req, res) => {
    const { id_surat, id_subdivisi, keterangan } = req.body;

    if (!id_surat || !id_subdivisi) {
        return res.status(400).json({
            success: false,
            message: "id_surat dan id_subdivisi wajib diisi"
        });
    }

    // 1. Update tabel surat
    const updateQuery = `
        UPDATE surat_masuk 
        SET status = 'dikirim ke sub divisi'
        WHERE id_surat = ?
    `;

    db.query(updateQuery, [id_surat], (err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal update status surat",
                error: err
            });
        }

        // 2. Insert ke tracking
        const trackingQuery = `
            INSERT INTO surat_tracking (id_surat, status, keterangan, tanggal)
            VALUES (?, 'dikirim ke sub divisi', ?, NOW())
        `;

        db.query(trackingQuery, [id_surat, keterangan], (err2) => {
            if (err2) {
                return res.status(500).json({
                    success: false,
                    message: "Gagal menambahkan tracking surat",
                    error: err2
                });
            }

            return res.status(200).json({
                success: true,
                message: "Surat berhasil dikirim ke sub divisi"
            });
        });
    });

});

module.exports = router;
