import Eventos from "../models/eventos.js";
import Veiculo from "../models/veiculo.js";
import { QueryTypes } from "sequelize";
import sequelize from "../utils/connection.js";

export const cadastrarEvento = async (req, res) => {
    try {
        salvarEvento(req.body)
        await newEvento.save();
        res.status(201).json({ message: 'Evento registrado com sucesso',evento: newEvento });

    } catch (error) {
        console.error('Erro ao registrar evento:', error);
        res.status(500).json({ message: 'Erro ao registrar localização' });
    }
};

export const listarEventos = async(req, res) =>{
    try {
        const eventos = await Eventos.findAll({limit: 30})
        return res.json(eventos)
    } catch (error) {
        console.log('erro ao localizar eventos', error);
        return res.status(500).json({error:'Erro interno do servidor'});
    }
}

export const salvarEvento = async (dadosVeiculos) =>{
    try {
        // Cria um Evento no banco de dados
        const newEvento = new Eventos({
            latitude: dadosVeiculos.localizacao.latitude, 
            longitude: dadosVeiculos.localizacao.longitude, 
            idVeiculo: dadosVeiculos.user.idVeiculo, 
            idUsuario: dadosVeiculos.user.id, 
            status:dadosVeiculos.status ? dadosVeiculos.status.mensage : null
        });
        await newEvento.save();

    } catch (error) {
        console.error('Erro ao registrar evento:', error);
    }
}

export const listarVeiculos = async() => {
    try {
        const query = `
            SELECT v.trajeto, v.id
            FROM "Eventos" AS e
            JOIN "Veiculos" AS v ON e."idVeiculo" = v."id"
            WHERE e."id" = (
                SELECT MAX("id")
                FROM "Eventos" AS "e2"
                WHERE "e2"."idVeiculo" = e."idVeiculo"
            );
            `;
        const veiculos = await sequelize.query(query, {
            type: QueryTypes.SELECT
        });
        return veiculos;
    } catch (error) {
        console.log("erros ao listar veiculos", error)
        throw new Error(error)
    }
}

export const eventoPorId = async(idVeiculo) => {
    try {
        // const query = `
        //     SELECT v.trajeto, v.id
        //     FROM "Eventos" AS e
        //     JOIN "Veiculos" AS v ON e."idVeiculo" = v."id"
        //     WHERE e."id" = (
        //         SELECT MAX("id")
        //         FROM "Eventos" AS "e2"
        //         WHERE "e2"."idVeiculo" = e."idVeiculo"
        //     );
        //     `;
        const eventos = await  Eventos.findOne({
            attributes: ['latitude', 'longitude'],
            where: { idVeiculo: idVeiculo },
            order: [['id', 'DESC']]
          });

        return eventos.dataValues       
        
    } catch (error) {
        console.log("erros ao listar veiculos", error)
        throw new Error(error)
    }
}