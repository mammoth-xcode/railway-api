const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/login', require('./routes/login'));

app.use('/api/customers', require('./routes/customers'));

app.use('/api/orders', require('./routes/orders'));
app.use('/api/sum_orders', require('./routes/sum_orders'));
app.use('/api/orders_product_detail', require('./routes/orders_product_detail'));

app.use('/api/prd_cus_orders', require('./routes/prd_cus_orders'));
app.use('/api/sum_prd_cus_orders', require('./routes/sum_prd_cus_orders'));

app.use('/api/cus_orders', require('./routes/cus_orders'));
app.use('/api/sum_cus_orders', require('./routes/sum_cus_orders'));

app.use('/api/products', require('./routes/products'));

// Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
