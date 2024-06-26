import { DataTypes }  from 'sequelize';
import sequelize from '../utils/connection.js';

const User = sequelize.define('User', {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    
});

export default User;