# Mock server

## Format/Lint code

```sh
uv tool run ruff format
uv tool run ruff check --fix
```

## Run

```bash
uv sync
source .venv/bin/activate
uv run fastapi dev
```
