import  express  from "express";
import { listarVeiculos } from "../controllers/veiculosControler.js";

const veiculosRouter = express.Router();

veiculosRouter.get('/listar', listarVeiculos);

export default veiculosRouter;