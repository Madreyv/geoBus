import MensagensStatus from "../models/mensagensStatus.js";

export const listarMensagens = async (req, res)=>{
    try{
        const mensagens = await MensagensStatus.findAll()
        return res.json(mensagens)
    }catch(error){
        console.log('error mensagen back', error)
        return res.status(500).json({error:'Erro interno do servidor'})
    }
}