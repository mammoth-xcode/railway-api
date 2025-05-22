const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/auth'); // Adjust path as needed

// Replace the query below with your actual aggregation logic
const sumQuery = `
  SELECT SUM(net_price) AS total_net_price FROM orders
`;

router.get('/', authenticateToken, (req, res) => {
  db.query(sumQuery, (err, results) => {
    if (err) {
      return res.status(500).json({ status: 'Error', message: err.message });
    }

    res.json({
      orders: results,
      total_net_price: results.length > 0 ? results[0].total_net_price || 0 : 0
    });
  });
});

module.exports = router;
