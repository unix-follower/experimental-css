import { Component, OnInit, input, output } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-task-tracker-button",
  imports: [CommonModule],
  templateUrl: "./button.html",
  styleUrl: "./button.css",
})
export class Button implements OnInit {
  text = input<string>()
  color = input<string>()
  btnClick = output()

  ngOnInit(): void {
    console.log("Button component initialized")
  }

  onClick() {
    this.btnClick.emit()
  }
}
