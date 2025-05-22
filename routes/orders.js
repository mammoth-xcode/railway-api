const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/auth'); // Adjust path as needed

// Protected route
router.get('/', authenticateToken, (req, res) => {
  db.query('SELECT * FROM orders ORDER BY orders_id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const db = require('../db');

// router.get('/', (req, res) => {
//   db.query('SELECT * FROM orders ORDER BY orders_id DESC', (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

// module.exports = router;
