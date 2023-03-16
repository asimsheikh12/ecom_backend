const express = require('express');
const cors = require('cors');
const { envConfig } = require('./config');
const { restRouter } = require('./routes');
require('./config/db.config');

const app = express();
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(envConfig.baseURL, restRouter);
app.listen(envConfig.port, () =>
  console.log(`Server is listening on PORT:${envConfig.port}!`),
);
