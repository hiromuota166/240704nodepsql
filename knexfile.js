require('dotenv').config(); // 環境変数を読み込む

module.exports = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  },
  migrations: {
    directory: './migrations'
  }
};
