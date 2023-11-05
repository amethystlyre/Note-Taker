//Router page
const express = require('express');

const app = express();

// setup modular router for notes api
app.use('/notes', require('./notes'));

module.exports = app;