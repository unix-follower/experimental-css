import p5 from "p5"
import vertShader from "./moving-blurred-tiles.vert?raw"
import fragShader from "./moving-blurred-tiles.frag?raw"

function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement

  new p5((p: p5) => {
    let movingBlurredTilesShader: p5.Shader

    p.setup = () => {
      p.createCanvas(canvas.width, canvas.height, p.WEBGL, canvas)
      movingBlurredTilesShader = p.createShader(vertShader, fragShader)
      p.pixelDensity(1)
    }

    p.draw = () => {
      p.shader(movingBlurredTilesShader)
      movingBlurredTilesShader.setUniform("uResolution", [p.width, p.height])
      p.rect(-p.width / 2, -p.height / 2, p.width, p.height)
    }
  })
}

main()
