const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

router.post('/', (req, res) => {
  const { cus_user, cus_pass } = req.body;

  console.log('Body:', req.body);

  if (!cus_user || !cus_pass) {
    return res.status(400).json({ status: 'Error', message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
  }

  const query = 'SELECT * FROM `customers` WHERE cus_user = ? AND cus_pass = ?';
  db.query(query, [cus_user, cus_pass], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ status: 'Error', message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ status: 'Error', message: 'ไม่พบผู้ใช้งานนี้' });
    }

    const user = results[0];

    const token = jwt.sign({
      cus_id: user.cus_id,
      cus_user: user.cus_user,
      cus_name: user.cus_name,
      cus_email: user.cus_email,
      cus_type: user.cus_type
    }, secret, { expiresIn: '1h' });

    return res.json({
      status: 'OK',
      message: 'เข้าสู่ระบบสำเร็จ',
      token,
      cus_id: user.cus_id,
      cus_user: user.cus_user,
      cus_name: user.cus_name,
      cus_email: user.cus_email,
      cus_type: user.cus_type
    });
  });
});

module.exports = router;
