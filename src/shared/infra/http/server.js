const app = require('./app');
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = 3333;

io.on('connection', (socket) => {
    console.log('A user connected!');

    socket.emit('message', 'user connected!');
});

server.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`));

module.exports = { io };