require('dotenv').config();
const express = require('express');
const dataRoutes = require('./routes/data');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/api/data', dataRoutes);

app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);