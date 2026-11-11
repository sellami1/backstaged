const express = require('express');

const app = express();
const serviceName = ${{ values.name | dump }};
const port = Number(process.env.PORT || ${{ values.port }});

app.get('/health', (_req, res) => {
  res.json({ service: serviceName, status: 'ok' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`${serviceName} listening on port ${port}`);
});
