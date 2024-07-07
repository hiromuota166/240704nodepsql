const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(cors());

app.use(bodyParser.json());

// JSONを返すGETエンドポイント
app.get('/api', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// JSONを返すPOSTエンドポイント
app.post('/api', (req, res) => {
  const value = req.body.value; //expressの書き方

  if (value === 'a') {
    res.json({ message: 'value is a' });
  } else if (value === 'b') {
    res.json({ message: 'value is b' });
  } else {
    res.json({ message: 'value is neither a nor b' });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});