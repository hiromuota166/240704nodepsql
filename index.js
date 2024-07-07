const express = require('express');
const app = express();
const port = 8080;

// JSONを返すGETエンドポイント
app.get('/api', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});