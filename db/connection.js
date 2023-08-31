const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE or DATABASE_URL not set');
}

const config = {};

if (ENV === 'production') {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
} else if (ENV === 'devcon') {
  config.user = 'postgres';
  config.host = 'localhost';
  config.database = 'postgres';
  config.password = 'postgres';
  config.port = 5432;
}

module.exports = new Pool(config);
