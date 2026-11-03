# Architecture

```text
Client
  |
  v
API Gateway :3000
  |                     |
  v                     v
Users Service :3001   Tasks Service :3002
```

Docker Compose provides service-name DNS on its default network. The gateway reaches the backend services at `users-service:3001` and `tasks-service:3002`.

## Example requests

List users:

```bash
curl http://localhost:3000/api/users
```

Create a user:

```bash
curl -X POST http://localhost:3000/api/users \
  -H 'content-type: application/json' \
  -d '{"name":"Grace Hopper","email":"grace@example.com"}'
```

List tasks:

```bash
curl http://localhost:3000/api/tasks
```

Create a task:

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H 'content-type: application/json' \
  -d '{"title":"Add persistent storage"}'
```

Update a task:

```bash
curl -X PATCH http://localhost:3000/api/tasks/task-1 \
  -H 'content-type: application/json' \
  -d '{"status":"in-progress"}'
```

## Data storage limitation

The services currently store records in memory. This is intentional for the first learning milestone; records reset when the relevant container restarts. Persistent storage and service-owned databases can be introduced in a later iteration.
