const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

// JSONを返すGETエンドポイント
app.get('/api', cors(), (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});