const { Sequelize } = require('sequelize');
const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  pool: config.pool,
  dialectOptions: config.dialectOptions,
  retry: config.retry,
  logging: console.log, // Enable logging for debugging purposes
});

const db = {
  sequelize,
  Sequelize,
  User: require('./user.js')(sequelize, Sequelize), // Adjust the path to your user model
};

module.exports = db;
