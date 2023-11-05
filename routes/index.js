//Router page
const express = require('express');

const app = express();

// set route for notes api
app.use('/notes', require('./notes'));

module.exports = app;