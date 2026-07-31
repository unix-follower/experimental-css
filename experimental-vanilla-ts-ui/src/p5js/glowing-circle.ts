import p5 from "p5"
import vertShader from "./glowing-circle.vert?raw"
import fragShader from "./glowing-circle.frag?raw"

function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement

  new p5((p: p5) => {
    let circleShader: p5.Shader

    p.setup = () => {
      p.createCanvas(canvas.width, canvas.height, p.WEBGL, canvas)
      circleShader = p.createShader(vertShader, fragShader)
    }

    p.draw = () => {
      p.shader(circleShader)
      circleShader.setUniform("uTime", p.millis() / 2000.0)
      p.ellipse(0, 0, p.width, p.height)
    }
  })
}

main()
