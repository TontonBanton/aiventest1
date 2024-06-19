require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  development: {
    username: "root",
    password: "13ulas43",
    database: "aiventest",
    host: "localhost",
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: require('mysql2')
  },
};

