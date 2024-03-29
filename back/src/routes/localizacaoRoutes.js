import express from 'express';
import { salvarLocalizacao } from '../controllers/localizacaoController.js';

const rotasLocalizacao = express.Router()

rotasLocalizacao.post('/salvarLocalizacao', salvarLocalizacao)

export default rotasLocalizacao;