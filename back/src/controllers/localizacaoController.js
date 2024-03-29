import Localizacao from "../models/localizacao.js";


//funcao para colcoar uma localização

export const salvarLocalizacao = async(req, res) => {
    try{
        const {latitude, longitude, idVeiculo} = req.body;

        const novaLocalizacao = new Localizacao({
            latitude,
            longitude,
            idVeiculo
        })

        await novaLocalizacao.save();
        res.status(201).json({message:'Localização registrada com sucesso'});
    }catch(error){
        res.status(500).json({message: 'Erro ao registrar Localização'})
    }
}