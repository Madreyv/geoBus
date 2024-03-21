import argon2  from 'argon2';
import { hashPassword } from './utils/passwordUtils.js';
import jwt from 'jsonwebtoken';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import sequelize from './utils/connection.js';
import User from './models/user.js';

// const express = require('express');
const app = express();
// const server = require("http").createServer(app);
const server = createServer(app);
// const io = require('socket.io')(server)
const io = new Server(server);
const PORT = process.env.port || 3000;

// const sequelize = require('./utils/connection');
// const User = require('./models/user.js')

async function syncDatabase(){
    try{
        await sequelize.sync({force:true});
        console.log('Modelos sincronizados com o banco de dados.');
    }catch(error){
        console.log('error => ', error)
        console.log('Erro ao sincronizar modelos com o banco de dados')
    }
}

syncDatabase();
// const router = express.Router();

const rotaUm = [
    {latitude:-22.390813620378786, longitude: -41.80612593885},
    {latitude:-22.388789934220892, longitude: -41.8026068805007},
    {latitude:-22.388789934220892, longitude: -41.8026068805007},
    {latitude:-22.386219842605087, longitude: -41.80111795938432},
    {latitude:-22.381815165934366, longitude: -41.801461282124876},
    {latitude:-22.377727818670934, longitude: -41.80184752021558},
    {latitude:-22.374949941424706, longitude: -41.80197626625276},
    {latitude:-22.374949941424706, longitude: -41.80197626625276},
    {latitude:-22.37098144918271, longitude: -41.802405419709984},
    {latitude:-22.37098144918271, longitude: -41.80322081127872},
    {latitude:-22.37129893272327, longitude: -41.80412203346911},
    {latitude:-22.372132323578388, longitude: -41.804379525543446},
    {latitude:-22.372767284690543, longitude: -41.80493742503786},
    {latitude:-22.372806969663884, longitude: -41.80498034038357},
    {latitude:-22.373243503623883, longitude: -41.80592447798949},
    {latitude:-22.37328318846145, longitude: -41.80716902301546},
    // {latitude:-22.373243503617672, longitude: -41.8081989912742},
    // {latitude:-22.37296570943789, longitude: -41.80927187491728},    
]

const rotaDois = [
    {latitude:-22.357805243468945, longitude: -41.807211938071625},
    {latitude:-22.35562231798486, longitude: -41.81244761024987},
    {latitude:-22.356614561081656, longitude: -41.81008726623508},
    {latitude:-22.35709083525782, longitude: -41.80914312862918},
    {latitude:-22.3578449327066, longitude: -41.80819899102326},
    {latitude:-22.358519648016255, longitude: -41.807426514800255},
    {latitude:-22.36022626627026, longitude: -41.80463701732824},
    {latitude:-22.361271131675135, longitude: -41.8027058267707},
    {latitude:-22.362471590029056, longitude: -41.801607456154976},
    {latitude:-22.36277170300076, longitude: -41.80106659183663},
    {latitude:-22.363156462274816, longitude: -41.800975060951984},
    {latitude:-22.363156462274816, longitude: -41.800975060951984},
    {latitude:-22.36372590404958, longitude: -41.80101666589955},
    {latitude:-22.36464162314084, longitude: -41.801166443709945},
    {latitude:-22.366434568244113, longitude: -41.801374468448344},
    {latitude:-22.36836599830582, longitude: -41.80164074011016},
    {latitude:-22.36836599830582, longitude: -41.80164074011016},
    {latitude:-22.36988188283258, longitude: -41.802206567374036},
    {latitude:-22.37096684585292, longitude: -41.80359617262271},
    {latitude:-22.371390056086113, longitude: -41.80424520980473},
    {latitude:-22.37178248626534, longitude: -41.80440330859832},
    {latitude:-22.37203641107185, longitude: -41.804419950577355},
    {latitude:-22.372875129124402, longitude: -41.804977456863476},
    {latitude:-22.37329675154488, longitude: -41.8106944418705},
]

// io.listen(server);


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
});

server.listen(PORT, () => {
  console.log('server rodando na porta '+ PORT)
})
 

app.post('/cadastro', async(req, res) => {
    try{
        const {username, email, password} = req.body;

        //verificar se o usuario já existe no banco de dados
        // const exiteUsuario = await UserActivation.findOne({email});
        // if(exiteUsuario) {
        //     return res.status(400).json({mensage: 'Este email já esta em uso'});
        // }

        //cria hash para o password
        const hashedPassword = await hashPassword(password);

        //cria um novo usuario no banco;
        const newUser = new User({
            username, email, password:hashedPassword
        })

        await newUser.save(); // Salva o novo usuário no banco de dados

        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    }catch(error){
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
})

app.post('/login', async(req,res) => {
    const{email, senha} = req.body;

    //verificar se tem o usuário no banco
    const user = await User.findOne({username});

    if(!user){
        return res.status(401).json({error: 'Usuário não encontrado'});
    }

    try{
        if(await argon2.verify(user.passwordHash, password)){
            const token = jwt.sign({userId: user._id}, 'seu_segredo');

            return res.json({token});
        }else{
            //caso a senha esteja errada
            return res.status(401).json({error:'Senha incorreta.'});
        }
    }catch(error){
        console.error('Error ao verificar a senha,', error);

        return res.status(500).json({error:'Erro interno do servidor no endpoint de login.'});
    }
})
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })





