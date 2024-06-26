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
    port: process.env.DB_PORT || 3306, // Default to 3306 if DB_PORT is not set
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      connectTimeout: 60000, // 60 seconds
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
      backoffBase: 1000, // Initial backoff duration in ms
      backoffExponent: 1.5, // Exponential backoff factor
    },
  },
};
