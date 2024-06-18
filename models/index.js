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
  User: require('./user')(sequelize, Sequelize), // Adjust the path to your user model
};

// Synchronize all models
sequelize.sync({ force: false }) // force: true will drop the table if it already exists
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err.message);
    console.error('Stack:', err.stack);
    if (err.parent) {
      console.error('Parent Error:', err.parent.message);
      console.error('Parent Stack:', err.parent.stack);
    }
  });

// Authenticate to check the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err.message);
    console.error('Stack:', err.stack);
    if (err.parent) {
      console.error('Parent Error:', err.parent.message);
      console.error('Parent Stack:', err.parent.stack);
    }
  });

module.exports = db;
