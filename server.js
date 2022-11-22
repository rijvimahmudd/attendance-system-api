const express = require('express');

const app = express();
const cors = require('cors');
const routes = require('./routes');
const connectDB = require('./db');

app.use(express.json());
app.use(routes);
app.use(cors);

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const message = err.message ?? 'internal server error';
  const status = err.status ?? 500;
  res.status(status).json({
    message,
    err,
  });
});

connectDB('mongodb+srv://rijvi:rijvi003c@cluster0.e1wvsmp.mongodb.net/?retryWrites=true&w=majority').then(() => {
  console.log('database connected');
  app.listen(8000, () => {
    console.log('server connected on port 8000');
  });
}).catch((e) => {
  console.log(e);
});
