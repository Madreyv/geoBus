import Eventos from './src/models/eventos.js';
import http from 'http';
import { Server } from 'socket.io';
import app from './src/app.js';
import { salvarEvento, listarVeiculosPorEventos, eventoPorIdVeiculo } from './src/controllers/eventosController.js';


const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = new Server(server);

io.on('connection', (socket) => {
    
    socket.on('setLocalizacaoVeiculo', async (dadosVeiculos) => {
        // console.log('dadosVeiculos', dadosVeiculos)
        salvarEvento(dadosVeiculos)  
    })
    socket.on('getListaVeiculos', async () => {
        const listaVeiculos = await listarVeiculosPorEventos()
        
        if(listaVeiculos != null) socket.emit('listaDeVeiculos', {listaVeiculos:Object.values(listaVeiculos)})
    })

    socket.on('selecionarVeiculo', async (veiculoId) => {
        let contador = 0;
        const intervalo = setInterval(async () => {
            const evento = await eventoPorIdVeiculo(veiculoId)
            console.log('evento', evento)
            socket.emit('localizacaoVeiculo', evento);
            
            contador++;
            if(contador == 5) clearInterval(intervalo)
        }, 15000);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
