import { AfterViewInit, Component } from "@angular/core"
import { gsap } from "gsap"

@Component({
  selector: "app-example2",
  imports: [],
  templateUrl: "./example2.html",
  styleUrl: "./example2.css",
})
export class Example2 implements AfterViewInit {
  ngAfterViewInit() {
    gsap.to(".circle", {
      x: 200,
    })
  }
}
