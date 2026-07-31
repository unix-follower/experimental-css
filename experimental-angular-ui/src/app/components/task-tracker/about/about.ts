import { Component, OnInit } from "@angular/core"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-task-tracker-about",
  imports: [RouterLink],
  templateUrl: "./about.html",
  styleUrl: "./about.css",
})
export class About implements OnInit {
  ngOnInit(): void {
    console.log("About component initialized")
  }
}
