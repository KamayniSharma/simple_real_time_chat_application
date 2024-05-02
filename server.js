const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

const io = require('socket.io')(server);


// const http = require('http').createServer(app);/
// http.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
// })

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//   Socket
io.on('connection', (socket) => {
    console.log('Socket Connected');

    socket.on('message', (msg) => {
        
        // send message to all connected browsers except the sender
        socket.broadcast.emit('message', msg)
    })
});

