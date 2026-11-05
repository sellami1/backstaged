const express = require('express');
const { randomUUID } = require('node:crypto');

const app = express();
const port = Number(process.env.PORT || 3002);
const tasks = [
  {
    id: 'task-1',
    title: 'Explore the TaskHub API',
    status: 'todo',
    createdAt: new Date().toISOString(),
  },
];

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ service: 'tasks-service', status: 'ok' });
});

app.get('/tasks', (_req, res) => {
  res.json({ items: tasks });
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find((item) => item.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  return res.json(task);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body ?? {};
  if (typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'A non-empty title is required' });
  }

  const task = {
    id: randomUUID(),
    title: title.trim(),
    status: 'todo',
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return res.status(201).json(task);
});

app.patch('/tasks/:id', (req, res) => {
  const task = tasks.find((item) => item.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const allowedStatuses = ['todo', 'in-progress', 'done'];
  const { title, status } = req.body ?? {};

  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }
    task.title = title.trim();
  }

  if (status !== undefined) {
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${allowedStatuses.join(', ')}` });
    }
    task.status = status;
  }

  return res.json(task);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Tasks Service listening on port ${port}`);
});
