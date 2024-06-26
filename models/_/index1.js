const { Sequelize } = require('sequelize');
const config = require('../../config/config.js')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize (config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  dialectModule: require('mysql2')
})

const db = {
  sequelize,
  Sequelize,
  User: require('../user.js')(sequelize, Sequelize),
};

module.exports = db;
