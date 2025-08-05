const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  res.json({ user: { name: 'DemoUser', plan: 'Pro' } });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
