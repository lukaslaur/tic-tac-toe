const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);
    socket.on('create-room', () => {
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    socket.join(roomCode);
    socket.emit('room-created', roomCode);
    console.log(`Room created: ${roomCode} by ${socket.id}`);
  });

  socket.on('join-room', (roomCode) => {
    socket.join(roomCode);
    socket.emit('room-joined', roomCode);
    console.log(`${socket.id} joined room ${roomCode}`);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
