const { Sequelize } = require('sequelize');
const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    connectTimeout: 60000
  },
  retry: {
    max: 5,
    match: [
      /ETIMEDOUT/,
      /EHOSTUNREACH/,
      /ECONNREFUSED/,
      /ECONNRESET/,
      /ENOTFOUND/
    ],
    backoffBase: 1000,
    backoffExponent: 1.5
  },
  logging: console.log // Add this line to log Sequelize operations
});

const db = {
  sequelize,
  Sequelize,
  User: require('./user')(sequelize, Sequelize),
};

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
