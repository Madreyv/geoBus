import {io, Socket} from 'socket.io-client';
import axios, { AxiosResponse } from 'axios';
import { LoginForm, LoginResponse, UserData } from './tipos/tipos'


let socket : Socket;

export const initializeSocket = (serverUrl : string) => {
    // console.log('server', serverUrl)
    socket = io(serverUrl, {autoConnect: true});
    // console.log(socket)
    // socket.connect()

    socket.on('connect', () => {
        console.log('conectado ao server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnect to server');
    });

    return socket;
    // return ws
}

export const getSocket = () => {
    if(!socket){
        throw new Error ('Socket não inicializado. Por favor chame a função initializeSocket primeiro.')
    }

    return socket
}

export const login = async (formData: LoginForm): Promise<LoginResponse> => {
    try {
      const response = await axios.post<UserData>('http://192.168.18.29:3000/login', formData);
      return response;
    } catch (error) {
      throw new Error('Erro ao fazer login. Por favor, tente novamente.');
    }
};
