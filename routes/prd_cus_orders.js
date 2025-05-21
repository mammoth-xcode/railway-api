const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { prd_cus_id } = req.body;

  if (!prd_cus_id) {
    return res.status(400).json({
      status: 'Error',
      message: 'Missing prd_cus_id in request body.'
    });
  }

  const query = `
    SELECT 
      orders.*, 
      (SELECT SUM(net_price) FROM orders WHERE prd_cus_id = ?) AS total_net_price 
    FROM orders 
    WHERE prd_cus_id = ?
  `;

  db.query(query, [prd_cus_id, prd_cus_id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ status: 'Error', message: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ status: 'Error', message: "Shop User's orders not found!" });
    }

    return res.json({
      status: 'OK',
      message: 'Get orders success.',
      orders: results
    });
  });
});

module.exports = router;
