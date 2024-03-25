import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import app from './src/app.js';

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    let contador = 0;
    let veiculoSolicitado = null;
    let rotaSelecionada = null;
    console.log('Novo cliente conectado:', socket.id);

    // Eventos para lidar com mensagens recebidas do cliente
    socket.on('chat message', (msg) => {
        console.log('Mensagem recebida:', msg);
        io.emit('chat message', msg); // Envia a mensagem para todos os clientes
    });

    socket.on('selecionarVeiculo', (veiculoId) => {
        if(veiculoId !== veiculoSolicitado){
            veiculoSolicitado = veiculoId
            contador = 0
        }
        console.log('veiculo selecionado', veiculoId)
        console.log('contador', contador)
        // Determine a localização do veículo com base no ID fornecido
        // const localizacao = obterLocalizacaoVeiculo(veiculoId);
        
        if(veiculoSolicitado == 'T-11'){
            rotaSelecionada = rotaUm;
        }else{
            rotaSelecionada = rotaDois;
        }

        const intervalo = setInterval(() => {
            console.log('rotavselecionada', rotaSelecionada.length)
            if(contador < rotaSelecionada.length){
                socket.emit('localizacaoVeiculo', rotaSelecionada[contador]);
                console.log('emiting', rotaSelecionada[contador])
            }else{
                clearInterval(intervalo)
            }

            contador++;

        }, 1000);
        // Envie a localização do veículo de volta para o frontend
    });

    // Evento para desconectar
    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
    // Lógica para lidar com a conexão do WebSocket
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
