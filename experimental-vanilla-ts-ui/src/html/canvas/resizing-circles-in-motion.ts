import type { Vector2 } from "@/math/linear-algebra"

const minRadius = 2
const maxRadius = 40

const colorArray = ["#2C3E50", "#E74C3C", "#ECF0F1", "#3498DB", "#298089"]

class Circle {
  mousePosition: Vector2
  x: number
  y: number
  dx: number
  dy: number
  radius: number

  constructor(
    mousePosition: Vector2,
    x: number,
    y: number,
    dx: number,
    dy: number,
    radius: number,
  ) {
    this.mousePosition = mousePosition
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)]
    ctx.strokeStyle = "blue"
    ctx.stroke()
    ctx.fill()
  }

  update(ctx: CanvasRenderingContext2D) {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy
    }

    this.x += this.dx
    this.y += this.dy

    // Interactivity
    if (
      this.mousePosition.x - this.x < 50 &&
      this.mousePosition.x - this.x > -50 &&
      this.mousePosition.y - this.y < 50 &&
      this.mousePosition.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1
      }
    } else if (this.radius > minRadius) {
      this.radius -= 1
    }

    this.draw(ctx)
  }
}

function createCircles(mousePosition: Vector2) {
  const circles: Circle[] = []
  for (let i = 0; i < 100; i++) {
    const radius = Math.random()
    const x = Math.random() * (innerWidth - radius * 2) + radius
    const y = Math.random() * (innerHeight - radius * 2) + radius
    const dx = Math.random() - 0.5 // * 2
    const dy = Math.random() - 0.5 // * 2
    circles.push(new Circle(mousePosition, x, y, dx, dy, radius))
  }
  return circles
}

function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement

  const mousePosition = {
    x: 0,
    y: 0,
  }
  window.addEventListener("mousemove", (event) => {
    mousePosition.x = event.x
    mousePosition.y = event.y
  })

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

  const circles = createCircles(mousePosition)

  function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    for (const circle of circles) {
      circle.update(ctx)
    }
  }

  animate()
}

main()
