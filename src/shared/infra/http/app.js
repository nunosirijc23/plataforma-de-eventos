require('dotenv').config();
require('../sequelize/config');
const express = require('express');
require('express-async-errors');
const session = require('express-session');
const Redis = require('ioredis');
const connectRedis = require('connect-redis');
const path = require('path');
const { Server } = require('socket.io');
const http = require('http');

const indexPage = require('./routes/index.route');
const usersPages = require('./routes/user.route');
const producersPages = require('./routes/producer.route');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3333;

// socket connection
io.on('connect', socket => {
    socket.emit('message', "user connected!");
});

// config redis
const RedisStore = connectRedis(session);
const redisClient = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);

redisClient.on('connect', _ => {
    console.log("CONNECTED WITH REDIS!");
});

redisClient.on('error', _ => {
    console.log("DOES NOT FIND ANY REDIS CONNECTION!")
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'web', 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'web', 'pages'));

// socket middleware
app.use((req, res, next) => {
    req.io = io;
    next();
})

// config redis as express session 
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 10 
    }
}))

app.use('/', indexPage);
app.use('/users', usersPages);
app.use('/producers', producersPages);


server.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`));