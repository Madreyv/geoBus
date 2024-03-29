import { DataTypes } from "sequelize";
import sequelize from "../utils/connection.js";
import Veiculo from "./veiculo.js";

const Eventos = sequelize.define( 'Eventos', {
    latitude:{
        type: DataTypes.DOUBLE,
        allowNull:false,
    },
    longitude:{
        type: DataTypes.DOUBLE,
        allowNull:false,
    },
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    idVeiculo:{
        type: DataTypes.INTEGER,
        allowNull:true,
        references:{
            model:'Veiculos',
            key:'id'
        }
    },
    idUsuario:{
        type:DataTypes.INTEGER,
        allowNull:true,
        references:{
            model:'Users',
            key:'id'
        }
    },
    status:{
        type:DataTypes.STRING,
        allowNull:true
    },
    dataHora: {
        type: DataTypes.DATE, 
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
});

Eventos.hasMany(Veiculo, {foreignKey:'idVeiculo'})
export default Eventos;