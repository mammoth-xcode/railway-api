const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth'); // Adjust path as needed

const secret = process.env.JWT_SECRET || 'Abcd1234*';

router.post('/', authenticateToken, (req, res) => {
  const { cus_user, cus_pass } = req.body || {};

  if (typeof cus_user !== 'string' || typeof cus_pass !== 'string') {
    return res.status(400).json({ status: 'Error', message: 'Invalid input format !' });
  }

  if (!cus_user || !cus_pass) {
    const errMsg = !cus_user ? 'Invalid username input !' : 'Invalid password input !';
    console.log(errMsg);
    return res.status(400).json({ status: 'Error', message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน !' });
  }

  const query = 'SELECT * FROM `customers` WHERE cus_user = ? AND cus_pass = ?';
  db.query(query, [cus_user, cus_pass], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ status: 'Error', message: 'Server error' });
    }

    if (results.length === 0) {
      console.log('Request login by : ', cus_user , ', failed !');
      return res.status(401).json({ status: 'Error', message: 'ชื่อผู้ใช้หรือรหัสผ่านผิดพลาด !' });
    }

    const user = results[0];

    const token = jwt.sign({
      cus_id: user.cus_id,
      cus_user: user.cus_user,
      cus_name: user.cus_name,
      cus_email: user.cus_email,
      cus_type: user.cus_type
    }, secret, { expiresIn: '1h' });

    console.log('Login as : ', cus_user, ', successfully');

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
