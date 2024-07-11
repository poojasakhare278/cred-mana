const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

let credentials = [];

app.get('/api/credentials', (req, res) => {
  res.json(credentials);
});

app.post('/api/credentials', (req, res) => {
  const newCredential = req.body;
  credentials.push(newCredential);
  res.json(newCredential);
});

app.delete('/api/credentials/:id', (req, res) => {
  const { id } = req.params;
  credentials = credentials.filter((credential) => credential.id !== id);
  res.sendStatus(204);
});

app.put('/api/credentials/:id', (req, res) => {
  const { id } = req.params;
  const updatedCredential = req.body;
  const index = credentials.findIndex((credential) => credential.id === id);
  if (index !== -1) {
    credentials[index] = updatedCredential;
    res.json(updatedCredential);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
