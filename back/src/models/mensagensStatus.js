import { DataTypes } from "sequelize";
import sequelize from "../utils/connection.js";


const MensagensStatus = sequelize.define('Mensagem',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    texto:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

export default MensagensStatus;