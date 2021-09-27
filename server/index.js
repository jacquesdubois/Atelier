const express = require('express');
const router = require('./routes.js');

const PORT = 5000;
const app = express();

app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});
