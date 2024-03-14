import {io, Socket} from 'socket.io-client';

let socket : Socket;

export const initializeSocket = (serverUrl : string) => {
    console.log('server', serverUrl)
    socket = io(serverUrl, {autoConnect: true});
    // console.log(socket)
    // socket.connect()

    socket.on('connect', () => {
        console.log('conectado ao server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnect to server');
    });


    
    const ws = new WebSocket(serverUrl);
    ws.onopen = () => {
        console.log('conectado ao server');
    }
    
    return socket;
    // return ws
}

export const getSocket = () => {
    if(!socket){
        throw new Error ('Socket não inicializado. Por favor chame a função initializeSocket primeiro.')
    }

    return socket
}