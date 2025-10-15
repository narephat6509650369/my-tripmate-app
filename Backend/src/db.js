// Backend/src/db.js
require('dotenv').config({ path: __dirname + "/../.env" }); // ชี้ไปที่ไฟล์ .env จริง
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,         // ต้องไม่ว่าง
  password: process.env.DB_PASSWORD, // ต้องไม่ว่าง
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("DB_USER:", process.env.DB_USER); // ทดสอบว่า env โหลดถูกต้อง
module.exports = pool;
