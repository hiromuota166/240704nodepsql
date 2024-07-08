const { Pool } = require('pg');

const pool = new Pool({
  user: 'ootakeiyume',
  host: 'localhost',
  database: 'linedb',
  password: 'hiromu166',
  port: 5432,
});

module.exports = pool;