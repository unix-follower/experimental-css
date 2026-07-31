import { Component, OnInit, input, output } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Task } from "@/app/common/task-tracker/Task"
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: "app-task-tracker-task-item",
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: "./task-item.html",
  styleUrl: "./task-item.css",
})
export class TaskItem implements OnInit {
  task = input.required<Task>()
  deleteTask = output<Task>()
  toggleReminder = output<Task>()
  faTimes = faTimes

  ngOnInit(): void {
    console.log("TaskItem component initialized")
  }

  onDelete(task: Task) {
    this.deleteTask.emit(task)
  }

  onToggle(task: Task) {
    this.toggleReminder.emit(task)
  }
}
