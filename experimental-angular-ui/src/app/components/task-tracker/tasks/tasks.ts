import { Component, OnInit, inject, signal } from "@angular/core"
import { TaskService } from "@/app/services/task-tracker/task.service"
import { Task } from "@/app/common/task-tracker/Task"
import { TaskItem } from "@/app/components/task-tracker/task-item/task-item"
import { AddTask } from "@/app/components/task-tracker/add-task/add-task"

@Component({
  selector: "app-task-tracker-tasks",
  imports: [TaskItem, AddTask],
  templateUrl: "./tasks.html",
  styleUrl: "./tasks.css",
})
export class Tasks implements OnInit {
  private readonly taskService = inject(TaskService)

  tasks = signal<Task[]>([])

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks.set(tasks)
    })
  }

  addTask(task: Task) {
    this.taskService
      .addTask(task)
      .subscribe((newTask) => this.tasks.update((current) => [...current, newTask]))
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder
    this.taskService.updateTaskReminder(task).subscribe()
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(() => this.tasks.update((current) => current.filter((t) => t.id !== task.id)))
  }
}
