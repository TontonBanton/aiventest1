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
    dialectModule: require('mysql2'),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000, // Max time (in ms) that pool will try to get connection before throwing error
      idle: 10000 // Max time (in ms) that a connection can be idle before being released
    },
    dialectOptions: {
      connectTimeout: 60000 // Connection timeout (in ms)
    },
    retry: {
      max: 5, // Maximum number of retry attempts
      match: [
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
        /ECONNREFUSED/,
        /ECONNRESET/,
        /ENOTFOUND/
      ],
      backoffBase: 1000, // Initial backoff duration (in ms)
      backoffExponent: 1.5 // Exponential backoff factor
    }
  },
};


