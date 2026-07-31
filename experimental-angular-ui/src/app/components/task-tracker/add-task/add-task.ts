import { Component, OnInit, output, OnDestroy, inject, signal } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { Subscription } from "rxjs"
import { UiService } from "@/app/services/task-tracker/ui.service"
import { Task } from "@/app/common/task-tracker/Task"

@Component({
  selector: "app-task-tracker-add-task",
  imports: [FormsModule],
  templateUrl: "./add-task.html",
  styleUrl: "./add-task.css",
})
export class AddTask implements OnInit, OnDestroy {
  private readonly uiService = inject(UiService)

  addTask = output<Task>()
  text = ""
  day = ""
  reminder = false
  showAddTask = signal(false)
  subscription: Subscription

  constructor() {
    this.subscription = this.uiService.onToggle().subscribe((value) => this.showAddTask.set(value))
  }

  ngOnInit(): void {
    console.log("AddTask component initialized")
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onSubmit() {
    if (!this.text) {
      alert("Please add a task!")
      return
    }

    const newTask: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    }

    this.addTask.emit(newTask)

    this.text = ""
    this.day = ""
    this.reminder = false
  }
}
