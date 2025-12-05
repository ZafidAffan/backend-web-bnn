const express = require('express');
const router = express.Router();
const db = require('./db');   // koneksi MySQL

// === GET SUB DIVISI BERDASARKAN DIVISI ===
router.get('/subdivisi/:id_divisi', (req, res) => {
    const { id_divisi } = req.params;

    const query = `
        SELECT 
            id_subdivisi,
            id_divisi,
            nama_subdivisi,
            keterangan
        FROM sub_divisi
        WHERE id_divisi = ?
        ORDER BY nama_subdivisi ASC
    `;

    db.query(query, [id_divisi], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data sub divisi",
                error: err
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data sub divisi ditemukan",
            data: result
        });
    });

});

module.exports = router;
