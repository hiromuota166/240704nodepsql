const express = require('express');
const router = express.Router();
const pool = require('../db/pool');


// ユーザー一覧を取得するエンドポイント
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500).json(err);
  }
});

module.exports = router;