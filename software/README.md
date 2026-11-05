# TaskHub — Backstage + Node.js microservices starter

A small multi-service Node.js application intended for learning Backstage's Software Catalog, API Catalog, and Software Templates.

## Requirements

- Docker Engine
- Docker Compose plugin
- Git

## Start the application

```bash
docker compose up --build -d
docker compose ps
```

Check the gateway:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/users
curl http://localhost:3000/api/tasks
```

Create test records:

```bash
curl -X POST http://localhost:3000/api/users \
  -H 'content-type: application/json' \
  -d '{"name":"Grace Hopper","email":"grace@example.com"}'

curl -X POST http://localhost:3000/api/tasks \
  -H 'content-type: application/json' \
  -d '{"title":"Build the first TaskHub milestone"}'
```

Stop the application:

```bash
docker compose down
```

## Repository structure

```text
.
├── catalog/
│   ├── system.yaml
│   └── taskhub-api.yaml
├── services/
│   ├── api-gateway/
│   │   ├── catalog-info.yaml
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── src/index.js
│   ├── users-service/
│   │   ├── catalog-info.yaml
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── src/index.js
│   └── tasks-service/
│       ├── catalog-info.yaml
│       ├── Dockerfile
│       ├── package.json
│       └── src/index.js
├── docs/
├── docker-compose.yml
├── mkdocs.yml
└── README.md
```

## Registering in Backstage

The catalog descriptors are included in this repository:

- `catalog/system.yaml` — the TaskHub System
- `catalog/taskhub-api.yaml` — the gateway's OpenAPI API entity
- `services/api-gateway/catalog-info.yaml` — API Gateway Component
- `services/users-service/catalog-info.yaml` — Users Service Component
- `services/tasks-service/catalog-info.yaml` — Tasks Service Component

After pushing the repository to GitHub, register each descriptor in Backstage using **Create → Register Existing Component** and its GitHub URL. The `user:default/sellami1` owner is a starter assumption; change it in these YAML files if your Backstage catalog uses a different owner entity.

## Important first-version limitations

- Services use in-memory arrays, not a database.
- The API Gateway is the only host-published service; backend services are reachable only on the Compose network.
- Authentication, authorization, automated tests, CI/CD, and production observability are not included yet.
