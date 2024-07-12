const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { v4: uuidv4 } = require('uuid');

// ユーザー一覧を取得するエンドポイント
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// ユーザーを作成するエンドポイント
router.post('/', async (req, res) => {
  const {
    name, email, ruby, sex, faculty_id, number, year_id, campus_id,
    birthday, tell, post, address
  } = req.body;

  // UUIDをサーバー側で生成
  const uuid = uuidv4();

  try {
    const result = await pool.query(
      `INSERT INTO users 
      (uuid, name, email, ruby, sex, faculty_id, number, year_id, campus_id, birthday, tell, post, address) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
      RETURNING *`,
      [uuid, name, email, ruby, sex, faculty_id, number, year_id, campus_id, birthday, tell, post, address]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ユーザーを更新するエンドポイント
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name, email, ruby, sex, faculty, number, year, campus,
    birthday, tell, post, address
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users SET 
      name = $1, email = $2, ruby = $3, sex = $4, faculty = $5, number = $6, 
      year = $7, campus = $8, birthday = $9, tell = $10, post = $11, address = $12 
      WHERE id = $13 RETURNING *`,
      [name, email, ruby, sex, faculty, number, year, campus, birthday, tell, post, address, id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// ユーザーを削除するエンドポイント
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
