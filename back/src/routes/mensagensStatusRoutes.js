import  express from "express";
import { listarMensagens } from "../controllers/mensagensStatusControler.js";

const mensagensRouter = express.Router();

//rota para listar as mensagens
mensagensRouter.get('/listar', listarMensagens);

export default mensagensRouter;