import json
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = Path("data/task-tracker/db.json")
SNAPSHOT_PATH = Path("data/task-tracker/db-snapshot.json")
TASK_NOT_FOUND_MSG = "Task not found"

with DB_PATH.open() as file:
    task_tracker_db = json.load(file)


def save_snapshot() -> None:
    with SNAPSHOT_PATH.open("w") as file:
        json.dump(task_tracker_db, file, indent=2)


@app.get("/task-tracker/tasks")
def get_tasks():
    return task_tracker_db


@app.get("/task-tracker/tasks/{task_id}")
def get_task(task_id: int):
    for task in task_tracker_db:
        if task["id"] == task_id:
            return task

    raise HTTPException(status_code=404, detail=TASK_NOT_FOUND_MSG)


@app.post("/task-tracker/tasks")
def create_task(task: dict):
    next_id = max((t["id"] for t in task_tracker_db), default=0) + 1

    new_task = {
        "id": next_id,
        **task,
    }

    task_tracker_db.append(new_task)
    save_snapshot()

    return new_task


@app.put("/task-tracker/tasks/{task_id}")
def update_task(task_id: int, task: dict):
    for index, existing in enumerate(task_tracker_db):
        if existing["id"] == task_id:
            updated = {
                "id": task_id,
                **task,
            }

            task_tracker_db[index] = updated
            save_snapshot()

            return updated

    raise HTTPException(status_code=404, detail=TASK_NOT_FOUND_MSG)


@app.delete("/task-tracker/tasks/{task_id}")
def delete_task(task_id: int):
    for index, task in enumerate(task_tracker_db):
        if task["id"] == task_id:
            deleted = task_tracker_db.pop(index)
            save_snapshot()

            return deleted

    raise HTTPException(status_code=404, detail=TASK_NOT_FOUND_MSG)
