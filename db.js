const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'monitoring_surat'
});

db.connect((err) => {
    if (err) {
        console.error("Database error:", err);
        return;
    }
    console.log("MySQL connected.");
});

module.exports = db;
