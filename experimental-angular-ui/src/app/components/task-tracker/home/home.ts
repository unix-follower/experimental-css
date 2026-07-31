import { Component, ViewEncapsulation } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { Header } from "@/app/components/task-tracker/header/header"
import { Footer } from "@/app/components/task-tracker/footer/footer"
import { Tasks } from "@/app/components/task-tracker/tasks/tasks"

@Component({
  selector: "app-task-tracker-home",
  imports: [RouterOutlet, Header, Footer, Tasks],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
  encapsulation: ViewEncapsulation.None,
})
export class Home {}
