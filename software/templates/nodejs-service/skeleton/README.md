# ${{ values.name }}

${{ values.description }}

## Run locally

```bash
npm install
npm start
```

The service listens on port `${{ values.port }}` by default. Override it with
the `PORT` environment variable. Check the health endpoint at
`http://localhost:${{ values.port }}/health`.

## Run with Docker

```bash
docker build -t ${{ values.name }} .
docker run --rm -p ${{ values.port }}:${{ values.port }} ${{ values.name }}
```

The Backstage component descriptor is in `catalog-info.yaml`.
