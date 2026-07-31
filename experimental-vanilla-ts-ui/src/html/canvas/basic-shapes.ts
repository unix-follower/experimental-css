import "@/instrumentation"
import opentelemetry from "@opentelemetry/api"

const meter = opentelemetry.metrics.getMeter("html-canvas-page", "1.0.0")
const counter = meter.createCounter("shape_select_change_counter")

function getBackgroundColor(): string {
  const backgroundInput = document.getElementById("background") as HTMLInputElement
  return backgroundInput.value
}

function getStrokeColor(): string {
  const strokeInput = document.getElementById("stroke") as HTMLInputElement
  return strokeInput.value
}

function getCoordinates(): [number, number, number, number] {
  const xInput = document.getElementById("x") as HTMLInputElement
  const yInput = document.getElementById("y") as HTMLInputElement
  const widthInput = document.getElementById("width") as HTMLInputElement
  const heightInput = document.getElementById("height") as HTMLInputElement
  return [
    Number.parseInt(xInput.value),
    Number.parseInt(yInput.value),
    Number.parseInt(widthInput.value),
    Number.parseInt(heightInput.value),
  ]
}

function getCircleCoordinates(): [number, number, number, number, number] {
  const xInput = document.getElementById("x") as HTMLInputElement
  const yInput = document.getElementById("y") as HTMLInputElement
  const radiusInput = document.getElementById("radius") as HTMLInputElement
  const startAngleInput = document.getElementById("startAngle") as HTMLInputElement
  const endAngleInput = document.getElementById("endAngle") as HTMLInputElement
  return [
    Number.parseInt(xInput.value),
    Number.parseInt(yInput.value),
    Number.parseInt(radiusInput.value),
    Number.parseInt(startAngleInput.value),
    Number.parseInt(endAngleInput.value),
  ]
}

function drawRectangle(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = getBackgroundColor()
  const [x, y, width, height] = getCoordinates()
  ctx.fillRect(x, y, width, height)
}

function drawLines(ctx: CanvasRenderingContext2D) {
  ctx.beginPath()
  ctx.moveTo(50, 300)
  ctx.lineTo(300, 100)
  ctx.lineTo(400, 300)
  ctx.strokeStyle = getStrokeColor()
  ctx.stroke()
}

function drawCircle(ctx: CanvasRenderingContext2D) {
  const [x, y, radius, startAngle, endAngle] = getCircleCoordinates()
  ctx.beginPath()
  ctx.arc(x, y, radius, startAngle * (Math.PI / 180), endAngle * (Math.PI / 180), false)
  ctx.strokeStyle = getStrokeColor()
  ctx.stroke()
}

function drawCircles(ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < 100; i++) {
    const dx = Math.random() * window.innerWidth
    const dy = Math.random() * window.innerHeight
    ctx.beginPath()
    ctx.arc(dx, dy, 30, 0, Math.PI * 2, false)
    ctx.strokeStyle = getStrokeColor()
    ctx.stroke()
  }
}

function drawSelectedShapes(ctx: CanvasRenderingContext2D, shape?: string) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  switch (shape) {
    case "circle":
      drawCircle(ctx)
      break
    case "rectangle":
      drawRectangle(ctx)
      break
    case "lines":
      drawLines(ctx)
      break
    default:
      drawRectangle(ctx)
      drawLines(ctx)
      drawCircle(ctx)
      drawCircles(ctx)
  }
}

function initDimentions(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  console.info(canvas)
  const inputs = document.querySelectorAll("section#coords input") as NodeListOf<HTMLInputElement>
  inputs.forEach((input) => {
    switch (input.id) {
      case "x":
        input.max = window.innerWidth.toString()
        break
      case "y":
        input.max = window.innerHeight.toString()
        break
      case "width":
        input.max = window.innerWidth.toString()
        break
      case "height":
        input.max = window.innerHeight.toString()
        break
      case "radius":
        input.max = (window.innerWidth / 2).toString()
        break
    }
  })
}

function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement
  initDimentions(canvas)

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
  const shapeSelect = document.getElementById("select-shape") as HTMLSelectElement
  drawSelectedShapes(ctx, shapeSelect.value)
  shapeSelect.addEventListener("change", (event) => {
    const target = event.target as HTMLSelectElement
    drawSelectedShapes(ctx, target.value)
    counter.add(1)
  })
}

main()
