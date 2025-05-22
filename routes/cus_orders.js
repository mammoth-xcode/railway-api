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

  const query = `
    SELECT 
      orders.*, 
      (SELECT SUM(net_price) FROM orders WHERE cus_id = ?) AS total_net_price 
    FROM orders 
    WHERE cus_id = ?
  `;

  db.query(query, [cus_id, cus_id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ status: 'Error', message: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ status: 'Error', message: "User's orders not found!" });
    }

    return res.json({
      status: 'OK',
      message: 'Get orders success.',
      orders: results
    });
  });
});

module.exports = router;
