const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'web', 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'web', 'pages'));

module.exports = app;