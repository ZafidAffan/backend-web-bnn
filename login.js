const express = require('express');
const router = express.Router();
const db = require('../config/db'); // koneksi MySQL
const bcrypt = require('bcryptjs'); // untuk hash password

// === LOGIN USER (PEGAWAI BNN) ===
router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email dan password tidak boleh kosong"
        });
    }

    const query = "SELECT * FROM users WHERE email = ? LIMIT 1";

    db.query(query, [email], (err, results) => {
        if (err) {
            console.error("Error MySQL:", err);
            return res.status(500).json({ success: false, message: "Server error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "Akun tidak ditemukan" });
        }

        const user = results[0];

        // Cek password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (!isMatch) {
                return res.status(401).json({ success: false, message: "Password salah" });
            }

            // Jika sukses
            return res.json({
                success: true,
                message: "Login berhasil",
                data: {
                    id_user: user.id,
                    nama: user.nama,
                    email: user.email,
                    id_divisi: user.id_divisi,
                    role: user.role
                }
            });
        });
    });
});

module.exports = router;
