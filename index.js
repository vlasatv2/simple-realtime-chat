const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/style.css');
});

io.on('connection', (socket) => {
    socket.on('chat message from', msg => {
      socket.emit('chat message to', msg)
    });
    socket.on('chat message to', msg => {
      socket.broadcast.emit('chat message from', msg)
    });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

io.on('connection', (socket) => {
  console.log('1 user connected');
});
