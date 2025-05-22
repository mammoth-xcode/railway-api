const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/auth'); // Adjust path as needed

router.get('/', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM `product` WHERE `prd_status` = "1"';

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
    res.json(results);
  });
});

module.exports = router;
