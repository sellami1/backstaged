const express = require('express');
const cors = require('cors');

const app = express();
const port = Number(process.env.PORT || 3000);
const usersUrl = process.env.USERS_SERVICE_URL || 'http://localhost:3001';
const tasksUrl = process.env.TASKS_SERVICE_URL || 'http://localhost:3002';

app.use(cors({
  origin: '*',
}));

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ service: 'api-gateway', status: 'ok' });
});

async function forward(req, res, serviceUrl, servicePath) {
  try {
    const upstreamUrl = new URL(servicePath, serviceUrl);
    const options = {
      method: req.method,
      headers: { 'content-type': 'application/json' },
      signal: AbortSignal.timeout(5000),
    };

    if (!['GET', 'HEAD'].includes(req.method)) {
      options.body = JSON.stringify(req.body ?? {});
    }

    const upstream = await fetch(upstreamUrl, options);
    const body = await upstream.text();
    res.status(upstream.status);

    const contentType = upstream.headers.get('content-type');
    if (contentType) res.set('content-type', contentType);
    return res.send(body);
  } catch (error) {
    console.error(`Upstream request failed: ${error.message}`);
    return res.status(502).json({
      error: 'Bad gateway',
      message: 'The requested service is currently unavailable',
    });
  }
}

app.all(['/api/users', '/api/users/:id'], (req, res) => {
  const suffix = req.params.id ? `/${encodeURIComponent(req.params.id)}` : '';
  return forward(req, res, usersUrl, `/users${suffix}`);
});

app.all(['/api/tasks', '/api/tasks/:id'], (req, res) => {
  const suffix = req.params.id ? `/${encodeURIComponent(req.params.id)}` : '';
  return forward(req, res, tasksUrl, `/tasks${suffix}`);
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(400).json({ error: 'Invalid request' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`TaskHub API Gateway listening on port ${port}`);
});
