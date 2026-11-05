const express = require('express');
const { randomUUID } = require('node:crypto');

const app = express();
const port = Number(process.env.PORT || 3001);
const users = [
  { id: 'user-1', name: 'Ada Lovelace', email: 'ada@example.com' },
];

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ service: 'users-service', status: 'ok' });
});

app.get('/users', (_req, res) => {
  res.json({ items: users });
});

app.get('/users/:id', (req, res) => {
  const user = users.find((item) => item.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json(user);
});

app.post('/users', (req, res) => {
  const { name, email } = req.body ?? {};
  if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ error: 'Both name and email are required' });
  }

  const user = { id: randomUUID(), name: name.trim(), email: email.trim() };
  users.push(user);
  return res.status(201).json(user);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Users Service listening on port ${port}`);
});
