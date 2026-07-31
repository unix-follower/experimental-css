import { Component, OnInit, inject, OnDestroy, signal } from "@angular/core"
import { Subscription } from "rxjs"
import { Router } from "@angular/router"
import { Button } from "@/app/components/task-tracker/button/button"
import { UiService } from "@/app/services/task-tracker/ui.service"

@Component({
  selector: "app-task-tracker-header",
  imports: [Button],
  templateUrl: "./header.html",
  styleUrl: "./header.css",
})
export class Header implements OnInit, OnDestroy {
  private readonly uiService = inject(UiService)
  private readonly router = inject(Router)

  title = "Task Tracker"
  showAddTask = signal(false)
  subscription: Subscription

  constructor() {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value: boolean) => this.showAddTask.set(value))
  }

  ngOnInit(): void {
    console.log("Header component initialized")
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  toggleAddTask() {
    this.uiService.toggleAddTask()
  }

  hasRoute(route: string) {
    return this.router.url === route
  }
}
