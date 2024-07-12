const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// 学部一覧を取得するエンドポイント
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM faculties');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 学部を作成するエンドポイント
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO faculties (name) VALUES ($1) RETURNING *`,
      [name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 学部を更新するエンドポイント
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await pool.query(
      `UPDATE faculties SET name = $1 WHERE id = $2 RETURNING *`,
      [name, id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Faculty not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 学部を削除するエンドポイント
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM faculties WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Faculty not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;