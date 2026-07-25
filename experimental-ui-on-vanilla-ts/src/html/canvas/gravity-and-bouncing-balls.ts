import { randomIntFromRange, randomColor } from "./utils"

interface CircleParams {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
  color: string
  gravity: number
  friction: number
}

class Circle {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
  color: string
  gravity: number
  friction: number

  constructor({ x, y, dx, dy, radius, color, gravity, friction }: CircleParams) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color
    this.gravity = gravity
    this.friction = friction
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  }

  update(ctx: CanvasRenderingContext2D) {
    const { canvas } = ctx
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy
      this.dy = this.dy * this.friction
      this.dx = this.dx * this.friction
    } else {
      this.dy += this.gravity
    }

    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
      this.dx = -this.dx * this.friction
    }

    this.x += this.dx
    this.y += this.dy
    this.draw(ctx)
  }
}

function createCircles(
  canvas: HTMLCanvasElement,
  colors: string[],
  gravity: number,
  friction: number,
) {
  const circles = []

  for (let i = 0; i < 100; i++) {
    const radius = randomIntFromRange(8, 20)
    const x = randomIntFromRange(radius, canvas.width - radius)
    const y = randomIntFromRange(0, canvas.height - radius)
    const dx = randomIntFromRange(-3, 3)
    const dy = randomIntFromRange(-2, 2)
    circles.push(
      new Circle({ x, y, dx, dy, radius, color: randomColor(colors), gravity, friction }),
    )
  }

  return circles
}

function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement

  canvas.width = innerWidth
  canvas.height = innerHeight

  const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"]

  const gravity = 0.2
  const friction = 0.98

  let circles = createCircles(canvas, colors, gravity, friction)

  addEventListener("resize", () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    circles = createCircles(canvas, colors, gravity, friction)
  })

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

  function animate() {
    requestAnimationFrame(animate)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const circle of circles) {
      circle.update(ctx)
    }
  }

  animate()
}

main()
