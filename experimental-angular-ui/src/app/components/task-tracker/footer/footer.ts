import { Component, OnInit } from "@angular/core"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-task-tracker-footer",
  imports: [RouterLink],
  templateUrl: "./footer.html",
  styleUrl: "./footer.css",
})
export class Footer implements OnInit {
  private readonly year: number = new Date().getFullYear()

  getYear(): number {
    return this.year
  }

  ngOnInit(): void {
    console.log("Footer component initialized")
  }
}
