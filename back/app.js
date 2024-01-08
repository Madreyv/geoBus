const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io')(server)
const PORT = process.env.port || 3000;

// io.listen(server);


io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id);

    // Eventos para lidar com mensagens recebidas do cliente
    socket.on('chat message', (msg) => {
        console.log('Mensagem recebida:', msg);
        io.emit('chat message', msg); // Envia a mensagem para todos os clientes
    });

    // Evento para desconectar
    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

server.listen(PORT, () => {
  console.log('server rodando na porta '+ PORT)
})
  
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })





