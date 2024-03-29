import { DataTypes }  from 'sequelize';
import sequelize from '../utils/connection.js';

const Veiculo = sequelize.define('Veiculo', {
    trajeto:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"Users",
            key:'id'
        }
    }
    
});

export default Veiculo;