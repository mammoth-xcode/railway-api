const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/auth'); // Adjust path as needed

router.get('/:id', authenticateToken, (req, res) => {
  const id = req.params.id;

  const sql = `
    SELECT
      od.ordersdetail_id,
      od.orders_id,
      od.prd_id,
      p.prd_name,
      p.prd_image,
      od.order_amount,
      od.order_price
    FROM ordersdetail od
    LEFT JOIN product p ON od.prd_id = p.prd_id
    WHERE od.orders_id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Database query error: ', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

module.exports = router;
