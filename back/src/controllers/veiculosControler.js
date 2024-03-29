import Veiculo from "../models/veiculo.js";


export const listarVeiculos = async (req,res) => {
    try{
        const veiculos = await Veiculo.findAll()
        return res.json(veiculos);
    }catch(error){
        console.log('error bando de dados ao pegar veiculos', error)
        return res.status(500).json({error:'Erro interno do servidor'});
    }
}