const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// 学年一覧を取得するエンドポイント
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM years');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 学年を作成するエンドポイント
router.post('/', async (req, res) => {
  const { year } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO years (year) VALUES ($1) RETURNING *`,
      [year]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 学年を更新するエンドポイント
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { year } = req.body;

  try {
    const result = await pool.query(
      `UPDATE years SET year = $1 WHERE id = $2 RETURNING *`,
      [year, id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Year not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 学年を削除するエンドポイント
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM years WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Year not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;