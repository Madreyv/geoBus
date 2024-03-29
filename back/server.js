import http from 'http';
import { Server } from 'socket.io';
import app from './src/app.js';
import Eventos from './src/models/eventos.js';
import { salvarEvento, listarVeiculos, eventoPorId } from './src/controllers/eventosController.js';


const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    let contador = 0;
    let veiculoSolicitado = null;
    let rotaSelecionada = null;
    // console.log('Novo cliente conectado:', socket.id);

    // Eventos para lidar com mensagens recebidas do cliente
    socket.on('setLocalizacaoVeiculo', async (dadosVeiculos) => {
        console.log('dadosVeiculos', dadosVeiculos)
        salvarEvento(dadosVeiculos)
        
    })

    socket.on('getListaVeiculos', async () => {
        const listaVeiculos = await listarVeiculos()
        socket.emit('listaDeVeiculos', {listaVeiculos:Object.values(listaVeiculos)})
    })

    socket.on('selecionarVeiculo', async (veiculoId) => {
        console.log("veiculo id", veiculoId)
        const evento = await eventoPorId(veiculoId)
        console.log("evento", evento)
        let contador = 0;
        const intervalo = setInterval(() => {
            // console.log('rotavselecionada', rotaSelecionada.length)
            console.log('emiting', Object.values(evento))
            socket.emit('localizacaoVeiculo', evento);
            
            contador++;
            if(contador == 3) clearInterval(intervalo)
        }, 15000);
        // if(veiculoId !== veiculoSolicitado){
        //     veiculoSolicitado = veiculoId
        //     contador = 0
        // }
        // console.log('veiculo selecionado', veiculoId)
        // console.log('contador', contador)
        // Determine a localização do veículo com base no ID fornecido
        // const localizacao = obterLocalizacaoVeiculo(veiculoId);
        
        // if(veiculoSolicitado == 'T-11'){
        //     rotaSelecionada = rotaUm;
        // }else{
        //     rotaSelecionada = rotaDois;
        // }

        // const intervalo = setInterval(() => {
        //     console.log('rotavselecionada', rotaSelecionada.length)
        //     if(contador < rotaSelecionada.length){
        //         socket.emit('localizacaoVeiculo', rotaSelecionada[contador]);
        //         console.log('emiting', rotaSelecionada[contador])
        //     }else{
        //         clearInterval(intervalo)
        //     }

        //     contador++;

        // }, 1000);
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
