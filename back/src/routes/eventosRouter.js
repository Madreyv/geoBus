import express from 'express'
import { cadastrarEvento, listarEventos } from '../controllers/eventosController.js';

const eventosRouter = express.Router();

eventosRouter.post('/cadastrar', cadastrarEvento)

eventosRouter.get('/listar', listarEventos);

export default eventosRouter