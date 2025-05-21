const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/customers', require('./routes/customers'));
app.use('/api/orders', require('./routes/orders'));

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
