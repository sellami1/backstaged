# TaskHub

TaskHub is a learning project that demonstrates a small multi-service Node.js application.

## Services

- **API Gateway** — the only public HTTP entry point, listening on port `3000`.
- **Users Service** — manages users inside the Compose network.
- **Tasks Service** — manages tasks inside the Compose network.

The backend services are not published directly to the host. Clients call the gateway, which forwards requests to the appropriate service.

## Run locally

```bash
docker compose up --build -d
docker compose ps
curl http://localhost:3000/health
```

See [Architecture](architecture.md) for request flow and API examples.
