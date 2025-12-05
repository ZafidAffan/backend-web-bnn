const express = require('express');
const router = express.Router();
const db = require('./db'); // koneksi MySQL

// === API KIRIM KE DIVISI ===
router.post('/kirim-divisi', (req, res) => {
    const { id_surat, id_divisi, keterangan } = req.body;

    if (!id_surat || !id_divisi) {
        return res.status(400).json({
            success: false,
            message: "id_surat dan id_divisi wajib diisi"
        });
    }

    const query = `
        INSERT INTO surat_tracking 
        (id_surat, id_divisi, status, keterangan, tanggal)
        VALUES (?, ?, 'dikirim ke divisi', ?, NOW())
    `;

    db.query(
        query,
        [id_surat, id_divisi, keterangan],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Gagal mengirim surat ke divisi",
                    error: err
                });
            }

            return res.status(200).json({
                success: true,
                message: "Surat berhasil dikirim ke divisi",
                id_tracking: result.insertId
            });
        }
    );
});

module.exports = router;
