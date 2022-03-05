const express = require('express');
const socket = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}...`);
});

const io = socket(server);

io.on('connection', (socket) => {
  socket.on('clicked', () => {
    console.log(socket.id + 'has clicked the button');
    io.sockets.emit('clicked2');
  });

  socket.on('sendMessage', (message) => {
    // console.log(message);
    io.sockets.emit('sendMessageBack', message);
  });
});
