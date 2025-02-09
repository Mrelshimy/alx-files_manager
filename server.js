const express = require('express');
const router = require('./routes/index');

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;
app.use('/', router);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

module.exports = app;
