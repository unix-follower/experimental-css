import { AfterViewInit, Component } from "@angular/core"
import { gsap } from "gsap"

@Component({
  selector: "app-example1",
  imports: [],
  templateUrl: "./example1.html",
  styleUrl: "./example1.css",
})
export class Example1 implements AfterViewInit {
  ngAfterViewInit() {
    gsap.to(".box", {
      x: 200,
    })
  }
}
