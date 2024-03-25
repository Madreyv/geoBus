// import argon2  from 'argon2';
// import { hashPassword } from './utils/passwordUtils.js';
// import jwt from 'jsonwebtoken';
import express from 'express';
// import { createServer } from 'http';
// import { Server } from 'socket.io';
import sequelize from './utils/connection.js';
// import User from './models/user.js';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes.js';
const app = express();

// const server = createServer(app);

// const io = new Server(server);
// const PORT = process.env.port || 3000;

async function syncDatabase(){
    try{
        await sequelize.sync();
        console.log('Modelos sincronizados com o banco de dados.');
    }catch(error){
        // console.log('error => ', error)
        console.log('Erro ao sincronizar modelos com o banco de dados')
    }
}

syncDatabase();

// io.on('connection', (socket) => {
//     let contador = 0;
//     let veiculoSolicitado = null;
//     let rotaSelecionada = null;
//     console.log('Novo cliente conectado:', socket.id);

//     // Eventos para lidar com mensagens recebidas do cliente
//     socket.on('chat message', (msg) => {
//         console.log('Mensagem recebida:', msg);
//         io.emit('chat message', msg); // Envia a mensagem para todos os clientes
//     });

//     socket.on('selecionarVeiculo', (veiculoId) => {
//         if(veiculoId !== veiculoSolicitado){
//             veiculoSolicitado = veiculoId
//             contador = 0
//         }
//         console.log('veiculo selecionado', veiculoId)
//         console.log('contador', contador)
//         // Determine a localização do veículo com base no ID fornecido
//         // const localizacao = obterLocalizacaoVeiculo(veiculoId);
        
//         if(veiculoSolicitado == 'T-11'){
//             rotaSelecionada = rotaUm;
//         }else{
//             rotaSelecionada = rotaDois;
//         }

//         const intervalo = setInterval(() => {
//             console.log('rotavselecionada', rotaSelecionada.length)
//             if(contador < rotaSelecionada.length){
//                 socket.emit('localizacaoVeiculo', rotaSelecionada[contador]);
//                 console.log('emiting', rotaSelecionada[contador])
//             }else{
//                 clearInterval(intervalo)
//             }

//             contador++;

//         }, 1000);
//         // Envie a localização do veículo de volta para o frontend
//     });

//     // Evento para desconectar
//     socket.on('disconnect', () => {
//         console.log('Cliente desconectado:', socket.id);
//     });
// });

// server.listen(PORT, () => {
//   console.log('server rodando na porta '+ PORT)
// })
 

// app.post('/cadastro', async(req, res) => {
//     try{
//         const {username, email, password} = req.body;

//         //verificar se o usuario já existe no banco de dados
//         // const exiteUsuario = await UserActivation.findOne({email});
//         // if(exiteUsuario) {
//         //     return res.status(400).json({mensage: 'Este email já esta em uso'});
//         // }

//         //cria hash para o password
//         const hashedPassword = await hashPassword(password);

//         //cria um novo usuario no banco;
//         const newUser = new User({
//             username, email, password:hashedPassword
//         })

//         await newUser.save(); // Salva o novo usuário no banco de dados

//         res.status(201).json({ message: 'Usuário registrado com sucesso' });
//     }catch(error){
//         console.error('Erro ao registrar usuário:', error);
//         res.status(500).json({ message: 'Erro ao registrar usuário' });
//     }
// })

// app.post('/login', async(req,res) => {
//     const{email, senha} = req.body;

//     //verificar se tem o usuário no banco
//     const user = await User.findOne({username});

//     if(!user){
//         return res.status(401).json({error: 'Usuário não encontrado'});
//     }

//     try{
//         if(await argon2.verify(user.passwordHash, password)){
//             const token = jwt.sign({userId: user._id}, 'seu_segredo');

//             return res.json({token});
//         }else{
//             //caso a senha esteja errada
//             return res.status(401).json({error:'Senha incorreta.'});
//         }
//     }catch(error){
//         console.error('Error ao verificar a senha,', error);

//         return res.status(500).json({error:'Erro interno do servidor no endpoint de login.'});
//     }
// })

app.use(bodyParser.json());

//Rotas para usuários

app.use('/user', userRouter)


export default app

