import { Component, input } from "@angular/core"

@Component({
  selector: "app-shape",
  standalone: true,
  template: `<div [id]="shape()"></div>`,
  styleUrls: ["./shape.css"],
})
export class Shape {
  readonly shape = input.required<string>()
}
