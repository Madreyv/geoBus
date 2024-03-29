import express from 'express';
import sequelize from './utils/connection.js';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes.js';
import rotasLocalizacao from './routes/localizacaoRoutes.js';
import mensagensRouter from './routes/mensagensStatusRoutes.js';
import veiculosRouter from './routes/veiculoRoutes.js';
import eventosRouter from './routes/eventosRouter.js'


const app = express();

async function syncDatabase(){
    try{
        await sequelize.sync();
        console.log('Modelos sincronizados com o banco de dados.');
    }catch(error){
        // console.log('error => ', error)
        console.log('Erro ao sincronizar modelos com o banco de dados', error)
    }
}

syncDatabase();
app.use(bodyParser.json());

//Rotas para usuários e veiculos
app.use('/user', userRouter)

//Rotas para localizacao
app.use('/localizacao', rotasLocalizacao)

//Rotas para mensagnes
app.use('/mensagens', mensagensRouter)

//Rotas para veoculos
app.use('/veiculos', veiculosRouter)

//rota eventos
app.use('/eventos', eventosRouter)

export default app

