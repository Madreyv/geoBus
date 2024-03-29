import { DataTypes } from "sequelize";
import sequelize from "../utils/connection.js";

const Localizacao = sequelize.define( 'Localizacao', {
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
        allowNull:false,
        references:{
            model:'Users',
            key:'id'
        }
    },
    
});

export default Localizacao;