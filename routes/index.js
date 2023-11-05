const express = require('express');

const app = express();

app.use('/notes', require('./notes'));

module.exports = app;