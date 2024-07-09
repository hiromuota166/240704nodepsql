const { Pool } = require('pg');

const pool = new Pool({
  user: 'ootakeiyume',
  host: 'two40704nodepsql.onrender.com',
  database: 'linedb',
  password: 'hiromu166',
  port: 5432,
});

module.exports = pool;