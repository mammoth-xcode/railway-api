const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/auth'); // Adjust path as needed

router.post('/', authenticateToken, (req, res) => {
  const { cus_id } = req.body;

  if (!cus_id) {
    return res.status(400).json({
      status: 'Error',
      message: 'Missing cus_id in request body.'
    });
  }

  const query = `SELECT SUM(net_price) AS total_net_price FROM orders WHERE cus_id = ?`;

  db.query(query, [cus_id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ status: 'Error', message: err.message });
    }

    if (result.length === 0 || result[0].total_net_price === null) {
      return res.status(404).json({
        status: 'Error',
        message: "User's orders not found!"
      });
    }

    return res.json({
      status: 'OK',
      message: 'Get orders price success.',
      total_net_price: result[0].total_net_price
    });
  });
});

module.exports = router;
