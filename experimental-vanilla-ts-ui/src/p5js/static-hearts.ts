import p5 from "p5"
import vertShader from "./static-hearts.vert?raw"
import fragShader from "./static-hearts.frag?raw"

function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement

  new p5((p: p5) => {
    let figureShader: p5.Shader

    p.setup = () => {
      p.createCanvas(canvas.width, canvas.height, p.WEBGL, canvas)
      figureShader = p.createShader(vertShader, fragShader)
      p.pixelDensity(1)
    }

    p.draw = () => {
      p.shader(figureShader)
      figureShader.setUniform("uResolution", [p.width, p.height])
      figureShader.setUniform("uTime", p.millis() / 1000.0)
      p.rect(-p.width / 2, -p.height / 2, p.width, p.height)
    }
  })
}

main()
