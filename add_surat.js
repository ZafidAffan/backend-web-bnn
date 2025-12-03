const express = require('express');
const router = express.Router();
const db = require('./db_connect'); // file koneksi MySQL

router.post('/', (req, res) => {
    const {
        tanggal_terima,
        dari,
        nomor_surat,
        tanggal_surat,
        perihal,
        arsip_surat
    } = req.body;

    if (!tanggal_terima || !dari || !nomor_surat || !tanggal_surat || !perihal) {
        return res.status(400).json({
            success: false,
            message: "Semua field wajib diisi"
        });
    }

    const sql = `
        INSERT INTO surat_masuk 
        (tanggal_terima, dari, nomor_surat, tanggal_surat, perihal, arsip_surat, status)
        VALUES (?, ?, ?, ?, ?, ?, 'diterima resepsionis')
    `;

    db.query(sql, [
        tanggal_terima,
        dari,
        nomor_surat,
        tanggal_surat,
        perihal,
        arsip_surat
    ], (err, result) => {

        if (err) {
            console.log(err);
            return res.json({
                success: false,
                message: "Gagal menambahkan surat"
            });
        }

        res.json({
            success: true,
            message: "Surat berhasil ditambahkan",
            id_surat: result.insertId
        });
    });
});

module.exports = router;
