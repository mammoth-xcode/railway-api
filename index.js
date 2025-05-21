const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/customers', require('./routes/customers'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
