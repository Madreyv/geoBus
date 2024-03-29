import express from 'express';
import { cadastrarUsuario, logarUsuario, listarVeiculos } from '../controllers/userController.js';

const userRouter = express.Router();

// Rota para registrar um novo usuário
userRouter.post('/cadastrar', cadastrarUsuario);

// Rota para fazer login
userRouter.post('/logar', logarUsuario);

//Rota para pegar todos os veículos
userRouter.get('/getVeiculos', listarVeiculos);

export default userRouter;