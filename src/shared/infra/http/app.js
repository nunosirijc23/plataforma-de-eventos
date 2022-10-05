require('dotenv').config();
require('reflect-metadata');
require('../typeorm');
const express = require('express');
require('express-async-errors');
const path = require('path');

const indexPage = require('./routes/index.route');
const usersPages = require('./routes/user.route');
const producersPages = require('./routes/producer.route');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'web', 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'web', 'pages'));

app.use('/', indexPage);
app.use('/users', usersPages);
app.use('/producers', producersPages);

module.exports = app;