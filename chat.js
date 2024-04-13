const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors({ origin: 'http://localhost:5000' }));


io.on('connection', (socket) => {
    console.log('A user connected');

});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
    
});


module.exports = io;