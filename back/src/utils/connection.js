import Sequelize from 'sequelize';
// const { Sequelize } = require('sequelize');
import { databaseConfig } from './config.js';
// const config = require('./config');

const config = databaseConfig;
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password,{
    host:config.development.host,
    dialect:config.development.dialect
});

export default sequelize;