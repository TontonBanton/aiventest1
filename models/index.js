const { Sequelize } = require('sequelize');
const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];

console.log('Database configuration:', config);

  const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    logging: console.log, // Enable logging for debugging purposes
  });

const db = {
  sequelize,
  Sequelize,
  Users: require('./Users.js')(sequelize, Sequelize), // Adjust the path to your user model
};

module.exports = db;
