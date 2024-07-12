const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// キャンパス一覧を取得するエンドポイント
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM campuses');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// キャンパスを作成するエンドポイント
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO campuses (name) VALUES ($1) RETURNING *`,
      [name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// キャンパスを更新するエンドポイント
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await pool.query(
      `UPDATE campuses SET name = $1 WHERE id = $2 RETURNING *`,
      [name, id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Campus not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// キャンパスを削除するエンドポイント
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM campuses WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Campus not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;