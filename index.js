const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

const userRoutes = require('./routes/users');
const facultiesRoutes = require('./routes/faculties');
const yearsRoutes = require('./routes/years');
const campusesRoutes = require('./routes/campuses');

app.use(cors());

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/faculties', facultiesRoutes);
app.use('/api/years', yearsRoutes);
app.use('/api/campuses', campusesRoutes);

// JSONを返すGETエンドポイント
app.get('/api', (req, res) => {
  const name = req.query.name || 'World';
  res.json({ message: 'Hello, ${name}!' });
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